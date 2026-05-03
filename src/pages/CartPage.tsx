import { Link } from 'react-router-dom'
import { formatMlnRub } from '../lib/formatPrice'
import { useCart } from '../hooks/useCart'

export function CartPage() {
  const { linesDetailed, setQty, remove, subtotal, totalItems } = useCart()

  const formattedSubtotal = formatMlnRub(subtotal)

  if (!linesDetailed.length) {
    return (
      <div className="page page--center">
        <h1 className="title">Корзина пуста</h1>
        <p className="muted">Корзина хранится в браузере.</p>
        <Link className="button button--primary" to="/">
          На витрину
        </Link>
      </div>
    )
  }

  return (
    <div className="page cart">
      <div className="section__head">
        <h1 className="page-title">Корзина</h1>
        <p className="section__meta">
          {totalItems} {pluralizeRu(totalItems, 'товар', 'товара', 'товаров')}
        </p>
      </div>

      <div className="cart-layout">
        <ul className="cart-list" aria-label="Список товаров в корзине">
          {linesDetailed.map((line) => {
            const lineTotal = line.product.price * line.quantity
            const lineFmt = formatMlnRub(lineTotal)
            const unitFmt = formatMlnRub(line.product.price)

            return (
              <li key={line.productId} className="cart-row">
                <Link to={`/product/${line.productId}`} className="cart-row__media">
                  <img src={line.product.image} alt="" width={160} height={160} />
                </Link>
                <div className="cart-row__main">
                  <div>
                    <Link className="cart-row__title" to={`/product/${line.productId}`}>
                      {line.product.name}
                    </Link>
                    <p className="cart-row__meta">
                      {line.product.category} · {unitFmt} за шт.
                    </p>
                  </div>
                  <div className="cart-row__controls">
                    <label className="sr-only" htmlFor={`qty-${line.productId}`}>
                      Количество для {line.product.name}
                    </label>
                    <input
                      id={`qty-${line.productId}`}
                      className="field__input field__input--narrow"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={99}
                      value={line.quantity}
                      onChange={(e) => setQty(line.productId, Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                    />
                    <button type="button" className="link-button" onClick={() => remove(line.productId)}>
                      Удалить
                    </button>
                  </div>
                </div>
                <div className="cart-row__total">{lineFmt}</div>
              </li>
            )
          })}
        </ul>

        <aside className="cart-summary" aria-label="Итого">
          <div className="panel">
            <h2 className="panel__title">Итого</h2>
            <div className="panel__row">
              <span>Сумма</span>
              <strong>{formattedSubtotal}</strong>
            </div>
            <p className="panel__hint">Доставка не считается.</p>
            <Link className="button button--primary button--block" to="/checkout">
              Оформить заказ
            </Link>
            <Link className="button button--ghost button--block" to="/">
              Витрина
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}

function pluralizeRu(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}
