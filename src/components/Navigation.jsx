import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        {/* Logo */}
        <NavLink to="/" className="navbar__logo">
          <div className="navbar__logo-icon">⚡</div>
          <span>Pokédex</span>
        </NavLink>

        {/* Nav links */}
        <div className="navbar__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
            id="nav-home"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/list"
            className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
            id="nav-list"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
            <span>Lijst</span>
          </NavLink>

          <NavLink
            to="/teams"
            className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
            id="nav-teams"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            <span>Teams</span>
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
            id="nav-favorites"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
            </svg>
            <span>Favorieten</span>
          </NavLink>
        </div>

        {/* User icon */}
        <div className="navbar__actions">
          <button className="navbar__user-btn" id="btn-user-profile" aria-label="Gebruikersprofiel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
