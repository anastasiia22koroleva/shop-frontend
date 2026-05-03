import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatMlnRub } from '../lib/formatPrice'
import { useCart } from '../hooks/useCart'

type FormState = {
  fullName: string
  email: string
  phone: string
  address: string
  comment: string
}

export function CheckoutPage() {
  const navigate = useNavigate()
  const { linesDetailed, subtotal, clear } = useCart()
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    comment: '',
  })
  const [error, setError] = useState<string | null>(null)

  const formattedSubtotal = useMemo(() => formatMlnRub(subtotal), [subtotal])

  if (!linesDetailed.length) {
    return (
      <div className="page page--center">
        <h1 className="title">Нечего оформлять</h1>
        <p className="muted">Сначала добавьте товары в корзину.</p>
      </div>
    )
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (form.fullName.trim().length < 2) {
      setError('Укажите имя и фамилию.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('Укажите корректный email.')
      return
    }
    if (form.phone.replace(/\D/g, '').length < 10) {
      setError('Укажите телефон (не меньше 10 цифр).')
      return
    }
    if (form.address.trim().length < 6) {
      setError('Укажите адрес доставки.')
      return
    }

    const orderId = `DEMO-${Math.random().toString(16).slice(2, 10).toUpperCase()}`
    const snapshot = linesDetailed.map((l) => ({
      productId: l.productId,
      name: l.product.name,
      quantity: l.quantity,
      unitPrice: l.product.price,
    }))

    clear()

    navigate('/confirmation', {
      replace: true,
      state: {
        orderId,
        customer: {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          comment: form.comment.trim(),
        },
        lines: snapshot,
        subtotal,
      },
    })
  }

  return (
    <div className="page checkout">
      <div className="section__head">
        <h1 className="page-title">Оформление заказа</h1>
        <p className="section__meta">Демо</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={onSubmit} noValidate>
          <fieldset className="fieldset">
            <legend className="fieldset__legend">Получатель</legend>
            <label className="field">
              <span className="field__label">ФИО</span>
              <input
                className="field__input"
                name="fullName"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
              />
            </label>
            <div className="field-row">
              <label className="field">
                <span className="field__label">Email</span>
                <input
                  className="field__input"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                />
              </label>
              <label className="field">
                <span className="field__label">Телефон</span>
                <input
                  className="field__input"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+7 …"
                  value={form.phone}
                  onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset__legend">Доставка</legend>
            <label className="field">
              <span className="field__label">Адрес</span>
              <textarea
                className="field__textarea"
                name="address"
                rows={3}
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))}
              />
            </label>
            <label className="field">
              <span className="field__label">Комментарий курьеру (необязательно)</span>
              <textarea
                className="field__textarea"
                name="comment"
                rows={3}
                value={form.comment}
                onChange={(e) => setForm((s) => ({ ...s, comment: e.target.value }))}
              />
            </label>
          </fieldset>

          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="form-actions">
            <button type="submit" className="button button--primary">
              Подтвердить заказ
            </button>
          </div>
        </form>

        <aside className="checkout-aside" aria-label="Состав заказа">
          <div className="panel">
            <h2 className="panel__title">Ваш заказ</h2>
            <ul className="mini-lines">
              {linesDetailed.map((l) => (
                <li key={l.productId} className="mini-lines__row">
                  <span>
                    {l.product.name} × {l.quantity}
                  </span>
                  <span>
                    {formatMlnRub(l.product.price * l.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="panel__row panel__row--strong">
              <span>К оплате</span>
              <strong>{formattedSubtotal}</strong>
            </div>
            <p className="panel__hint">После отправки — экран подтверждения.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
