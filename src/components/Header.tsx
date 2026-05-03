import { NavLink } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`

export function Header() {
  const { totalItems } = useCart()

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="logo" end>
          <span className="logo__name">Болиды</span>
          <span className="logo__tag">F1</span>
        </NavLink>

        <nav className="nav" aria-label="Основная навигация">
          <NavLink to="/" className={linkClass} end>
            Витрина
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Корзина
            {totalItems > 0 ? <span className="nav__count">{totalItems}</span> : null}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
