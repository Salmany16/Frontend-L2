import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import PokemonCard from '../components/PokemonCard'
import AddToTeamModal from '../components/AddToTeamModal'

const ALL_TYPES = ['Alle', 'grass', 'fire', 'water', 'electric', 'normal', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'fighting', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'steel']

export default function Favorites() {
  const { favorites, toggleFavorite } = useApp()
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('Alle')
  const [addModal, setAddModal] = useState(null)

  // Filter op zoekterm + type
  const filtered = favorites.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.trim().toLowerCase())
    const matchType = activeType === 'Alle' || p.types.includes(activeType)
    return matchSearch && matchType
  })

  return (
    <main className="main-content">
      <div className="container favorites-page">
        {/* Header */}
        <div className="favorites-header">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <h1 className="page-title">⭐ Favorieten</h1>
              <p className="page-subtitle">
                {favorites.length === 0
                  ? 'Je hebt nog geen favorieten opgeslagen.'
                  : `${favorites.length} favoriete Pokémon opgeslagen`}
              </p>
            </div>
          </div>

          {/* Search (alleen als er favorieten zijn) */}
          {favorites.length > 0 && (
            <>
              <div className="search-filter-bar" style={{ marginTop: 16 }}>
                <div className="search-input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    id="fav-search"
                    className="search-input"
                    type="text"
                    placeholder="Zoek in favorieten…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    aria-label="Zoek in favorieten"
                  />
                </div>
              </div>

              <div className="type-filters" role="group" aria-label="Filter op type">
                {ALL_TYPES.map(type => (
                  <button
                    key={type}
                    className={`type-filter-btn${activeType === type ? ' active' : ''}`}
                    onClick={() => setActiveType(type)}
                    id={`fav-filter-${type}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Leeg */}
        {favorites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">💔</div>
            <h2 className="empty-state__title">Nog geen favorieten</h2>
            <p className="empty-state__desc">
              Klik op het hartje op een Pokémon-kaart of detailpagina om hem als favoriet op te slaan.
            </p>
            <Link to="/list" className="btn btn--blue" id="btn-go-to-list">
              Pokémon ontdekken
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">🔍</div>
            <h2 className="empty-state__title">Geen resultaten</h2>
            <p className="empty-state__desc">Probeer een andere zoekterm of type.</p>
          </div>
        ) : (
          <div className="pokemon-grid">
            {filtered.map(p => (
              <PokemonCard
                key={p.id}
                {...p}
                onAddToTeam={() => setAddModal(p)}
              />
            ))}
          </div>
        )}

        {/* Tip onderaan */}
        {favorites.length > 0 && (
          <div style={{
            marginTop: 32,
            background: 'white',
            borderRadius: 12,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
          }}>
            <span style={{ fontSize: '1.2rem' }}>💡</span>
            <p>
              <strong>Tip:</strong> Klik op &quot;+ Team&quot; op een kaart om snel een favoriete Pokémon aan een team toe te voegen!
            </p>
          </div>
        )}
      </div>

      {addModal && (
        <AddToTeamModal pokemon={addModal} onClose={() => setAddModal(null)} />
      )}
    </main>
  )
}
