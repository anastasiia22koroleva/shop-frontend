import { useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { useCategories } from '../hooks/useCategories'
import { mockProducts } from '../data/mockProducts'

export function CatalogPage() {
  const categories = useCategories()
  const [category, setCategory] = useState('Все')

  const filtered = useMemo(() => {
    if (category === 'Все') return mockProducts
    return mockProducts.filter((p) => p.category === category)
  }, [category])

  return (
    <div className="page catalog">
      <header className="intro">
        <h1 className="intro__title">Витрина болидов</h1>
        <p className="intro__text">
          Статические лоты Формулы-1: шасси и шоу-кары. Цены — условные млн ₽. Без сервера и без трека.
        </p>
      </header>

      <section className="section" aria-labelledby="filters-title">
        <h2 id="filters-title" className="sr-only">
          Категории
        </h2>
        <div className="chips" role="tablist" aria-label="Категории">
          {categories.map((c) => {
            const selected = c === category
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`chip${selected ? ' chip--active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            )
          })}
        </div>
      </section>

      <section className="section" aria-labelledby="grid-title">
        <div className="section__head">
          <h2 id="grid-title" className="section__title">
            Модели
          </h2>
          <p className="section__meta">{filtered.length}</p>
        </div>

        <div className="grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
