import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { formatMlnRub } from '../lib/formatPrice'
import { useCart } from '../hooks/useCart'
import { getProductById, mockProducts } from '../data/mockProducts'

export function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  const productId = Number(id)
  const product = useMemo(() => (Number.isFinite(productId) ? getProductById(productId) : undefined), [productId])

  if (!product) {
    return (
      <div className="page page--center">
        <h1 className="title">Товар не найден</h1>
        <p className="muted">Проверьте ссылку или вернитесь на витрину.</p>
        <Link className="button button--primary" to="/">
          На витрину
        </Link>
      </div>
    )
  }

  const price = formatMlnRub(product.price)

  const related = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="page product">
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <Link to="/">Витрина</Link>
        <span aria-hidden> / </span>
        <span>{product.name}</span>
      </nav>

      <div className="product-layout">
        <div className="product__media">
          <img src={product.image} alt="" width={960} height={960} />
        </div>
        <div className="product__info">
          <p className="product__meta">{product.category}</p>
          <h1 className="product__title">{product.name}</h1>
          <p className="product__subtitle">{product.shortDescription}</p>
          <p className="product__price">{price}</p>
          <p className="product__text">{product.description}</p>

          <div className="buybar">
            <label className="field" htmlFor="product-qty">
              <span className="field__label">Количество</span>
              <input
                id="product-qty"
                className="field__input"
                type="number"
                inputMode="numeric"
                min={1}
                max={99}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
              />
            </label>
            <button
              type="button"
              className="button button--primary"
              onClick={() => {
                add(product.id, qty)
                navigate('/cart')
              }}
            >
              В корзину
            </button>
            <Link className="button button--ghost" to="/">
              Витрина
            </Link>
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="section" aria-labelledby="related-title">
          <h2 id="related-title" className="section__title">
            Из той же категории
          </h2>
          <div className="grid grid--compact">
            {related.map((p) => (
              <Link key={p.id} className="mini-card" to={`/product/${p.id}`}>
                <img src={p.image} alt="" loading="lazy" width={320} height={320} />
                <div className="mini-card__body">
                  <p className="mini-card__title">{p.name}</p>
                  <p className="mini-card__meta">{p.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
