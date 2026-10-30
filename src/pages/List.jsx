import { useEffect, useState, useCallback } from 'react'
import PokemonCard from '../components/PokemonCard'
import AddToTeamModal from '../components/AddToTeamModal'

const PAGE_SIZE = 9
const ALL_TYPES = ['Alle', 'grass', 'fire', 'water', 'electric', 'normal', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'fighting', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'steel']

export default function List() {
  const [allPokemon, setAllPokemon] = useState([])       // alle namen+urls
  const [displayed, setDisplayed] = useState([])          // huidige pagina (met detail data)
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('Alle')
  const [page, setPage] = useState(1)
  const [filtered, setFiltered] = useState([])
  const [addModal, setAddModal] = useState(null)

  // Stap 1: Haal alle Pokémon namen op (limit 151 = Kanto)
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
      .then(r => r.json())
      .then(data => {
        setAllPokemon(data.results)
      })
      .catch(err => console.error('Fout bij ophalen lijst:', err))
  }, [])

  // Stap 2: Filter op zoekterm (naam)
  useEffect(() => {
    const q = search.trim().toLowerCase()
    const result = allPokemon.filter(p => p.name.includes(q))
    setFiltered(result)
    setPage(1)
  }, [search, allPokemon])

  // Stap 3: Haal detail-data op voor de huidige pagina
  const fetchPageDetails = useCallback(async (pokemonList, currentPage) => {
    setDetailLoading(true)
    const start = (currentPage - 1) * PAGE_SIZE
    const slice = pokemonList.slice(start, start + PAGE_SIZE)

    try {
      const details = await Promise.all(
        slice.map(p => fetch(p.url).then(r => r.json()))
      )

      let result = details.map(p => ({
        id: p.id,
        name: p.name,
        image: p.sprites.other['official-artwork'].front_default || p.sprites.front_default,
        types: p.types.map(t => t.type.name),
      }))

      // Filter op type (client-side na ophalen details)
      if (activeType !== 'Alle') {
        result = result.filter(p => p.types.includes(activeType))
      }

      setDisplayed(result)
    } catch (err) {
      console.error('Fout bij ophalen details:', err)
    } finally {
      setDetailLoading(false)
      setLoading(false)
    }
  }, [activeType])

  useEffect(() => {
    if (filtered.length > 0 || allPokemon.length > 0) {
      const list = filtered.length > 0 || search ? filtered : allPokemon
      fetchPageDetails(list, page)
    }
  }, [filtered, page, fetchPageDetails, allPokemon, search])

  // Type filter: reset naar pagina 1
  function handleTypeFilter(type) {
    setActiveType(type)
    setPage(1)
  }

  const totalPages = Math.ceil((search ? filtered.length : allPokemon.length) / PAGE_SIZE)

  function renderPagination() {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, page - 2)
    let end = Math.min(totalPages, start + maxVisible - 1)
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return (
      <div className="pagination">
        <button
          className="pagination__btn"
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          id="btn-prev-page"
          aria-label="Vorige pagina"
        >‹</button>

        {start > 1 && (
          <>
            <button className="pagination__btn" onClick={() => setPage(1)}>1</button>
            {start > 2 && <span style={{ color: 'var(--text-muted)', padding: '0 4px' }}>…</span>}
          </>
        )}

        {pages.map(n => (
          <button
            key={n}
            className={`pagination__btn${n === page ? ' active' : ''}`}
            onClick={() => setPage(n)}
            id={`btn-page-${n}`}
          >{n}</button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span style={{ color: 'var(--text-muted)', padding: '0 4px' }}>…</span>}
            <button className="pagination__btn" onClick={() => setPage(totalPages)}>{totalPages}</button>
          </>
        )}

        <button
          className="pagination__btn"
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          id="btn-next-page"
          aria-label="Volgende pagina"
        >›</button>
      </div>
    )
  }

  return (
    <main className="main-content">
      <div className="container" style={{ paddingTop: 32 }}>
        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Pokémon</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
              Blader door alle geregistreerde soorten in de Kanto-regio
            </p>
          </div>

          {/* Search */}
          <div className="search-input-wrapper" style={{ maxWidth: 320 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              id="pokemon-search"
              className="search-input"
              type="text"
              placeholder="Zoek een Pokémon…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Zoek Pokémon op naam"
            />
          </div>
        </div>

        {/* Type filters */}
        <div className="type-filters" role="group" aria-label="Filter op type">
          {ALL_TYPES.map(type => (
            <button
              key={type}
              className={`type-filter-btn${activeType === type ? ' active' : ''}`}
              onClick={() => handleTypeFilter(type)}
              id={`filter-${type}`}
              style={{ textTransform: 'capitalize' }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading || detailLoading ? (
          <div className="loading-wrapper">
            <div className="pokeball-spinner" />
            <p>Pokémon laden…</p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">🔍</div>
            <p className="empty-state__title">Geen Pokémon gevonden</p>
            <p className="empty-state__desc">Probeer een andere naam of filter.</p>
          </div>
        ) : (
          <div className="pokemon-grid pokemon-grid--3">
            {displayed.map(p => (
              <PokemonCard
                key={p.id}
                {...p}
                onAddToTeam={() => setAddModal(p)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && renderPagination()}

        {/* Status bar */}
        <div className="status-bar" style={{ marginTop: 32 }}>
          <div className="status-bar__left">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
              </svg>
              Kanto Pokédex Weergave
            </div>
            <span>Totaal {allPokemon.length} monsters geïndexeerd • Pagina {page}/{totalPages}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="status-bar__dot" />
            Gegevens bijgewerkt
          </div>
        </div>
      </div>

      {addModal && (
        <AddToTeamModal pokemon={addModal} onClose={() => setAddModal(null)} />
      )}
    </main>
  )
}
