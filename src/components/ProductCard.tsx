import { Link } from 'react-router-dom'
import { formatMlnRub } from '../lib/formatPrice'
import type { Product } from '../types/product'

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  const formatted = formatMlnRub(product.price)

  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="card__media">
        <img src={product.image} alt="" loading="lazy" width={640} height={640} />
      </Link>
      <div className="card__body">
        <p className="card__category">{product.category}</p>
        <h2 className="card__title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h2>
        <p className="card__desc">{product.shortDescription}</p>
        <div className="card__row">
          <span className="card__price">{formatted}</span>
          <Link className="card__cta" to={`/product/${product.id}`}>
            Открыть
          </Link>
        </div>
      </div>
    </article>
  )
}
