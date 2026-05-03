import { Link, Navigate, useLocation } from 'react-router-dom'
import { formatMlnRub } from '../lib/formatPrice'

type Line = {
  productId: number
  name: string
  quantity: number
  unitPrice: number
}

type ConfirmationState = {
  orderId: string
  customer: {
    fullName: string
    email: string
    phone: string
    address: string
    comment: string
  }
  lines: Line[]
  subtotal: number
}

function isState(x: unknown): x is ConfirmationState {
  if (!x || typeof x !== 'object') return false
  const o = x as Record<string, unknown>
  return (
    typeof o.orderId === 'string' &&
    typeof o.subtotal === 'number' &&
    Array.isArray(o.lines) &&
    typeof o.customer === 'object' &&
    o.customer !== null
  )
}

export function ConfirmationPage() {
  const location = useLocation()
  const state = location.state

  if (!isState(state)) {
    return <Navigate to="/" replace />
  }

  const money = (n: number) => formatMlnRub(n)

  return (
    <div className="page confirmation">
      <div className="notice" role="status">
        <h1 className="notice__title">Заказ принят</h1>
        <p className="notice__id">
          Номер: <span className="mono">{state.orderId}</span>
        </p>
        <p className="muted">Почта и оплата не выполняются — только демо-интерфейс.</p>
      </div>

      <section className="section" aria-labelledby="sum-title">
        <h2 id="sum-title" className="section__title">
          Данные
        </h2>
        <div className="two-col">
          <div className="panel">
            <h3 className="panel__title">Получатель</h3>
            <dl className="kv">
              <div>
                <dt>ФИО</dt>
                <dd>{state.customer.fullName}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{state.customer.email}</dd>
              </div>
              <div>
                <dt>Телефон</dt>
                <dd>{state.customer.phone}</dd>
              </div>
              <div>
                <dt>Адрес</dt>
                <dd>{state.customer.address}</dd>
              </div>
              {state.customer.comment ? (
                <div>
                  <dt>Комментарий</dt>
                  <dd>{state.customer.comment}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="panel">
            <h3 className="panel__title">Состав</h3>
            <ul className="mini-lines">
              {state.lines.map((l) => (
                <li key={l.productId} className="mini-lines__row">
                  <span>
                    {l.name} × {l.quantity}
                  </span>
                  <span>{money(l.unitPrice * l.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="panel__row panel__row--strong">
              <span>Итого</span>
              <span>{money(state.subtotal)}</span>
            </div>
          </div>
        </div>

        <div className="section__actions">
          <Link className="button button--primary" to="/">
            Витрина
          </Link>
          <Link className="button button--ghost" to="/cart">
            Корзина
          </Link>
        </div>
      </section>
    </div>
  )
}
