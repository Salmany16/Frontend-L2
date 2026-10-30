import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import AddToTeamModal from '../components/AddToTeamModal'

const STAT_COLORS = {
  hp: '#4ade80',
  attack: '#f97316',
  defense: '#60a5fa',
  'special-attack': '#e879f9',
  'special-defense': '#facc15',
  speed: '#a78bfa',
}

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Aanval',
  defense: 'Verdediging',
  'special-attack': 'Sp. Aanval',
  'special-defense': 'Sp. Verdediging',
  speed: 'Snelheid',
}

function padId(id) {
  return `#${String(id).padStart(3, '0')}`
}

export default function Detail() {
  const { name } = useParams()
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite, addPokemonToTeam, teams } = useApp()

  const [pokemon, setPokemon] = useState(null)
  const [species, setSpecies] = useState(null)
  const [evolution, setEvolution] = useState([])
  const [loading, setLoading] = useState(true)
  const [addModal, setAddModal] = useState(false)
  const [animateStats, setAnimateStats] = useState(false)

  useEffect(() => {
    setLoading(true)
    setAnimateStats(false)
    setPokemon(null)
    setSpecies(null)
    setEvolution([])

    async function fetchAll() {
      try {
        // 1. Basis Pokémon data
        const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const pokeData = await pokeRes.json()
        setPokemon(pokeData)

        // 2. Species (voor beschrijving + evolutie URL)
        const specRes = await fetch(pokeData.species.url)
        const specData = await specRes.json()
        setSpecies(specData)

        // 3. Evolutieketen
        const evoRes = await fetch(specData.evolution_chain.url)
        const evoData = await evoRes.json()
        const chain = flattenChain(evoData.chain)
        const evoDetails = await Promise.all(
          chain.map(n => fetch(`https://pokeapi.co/api/v2/pokemon/${n}`).then(r => r.json()))
        )
        setEvolution(evoDetails.map(p => ({
          id: p.id,
          name: p.name,
          image: p.sprites.other['official-artwork'].front_default || p.sprites.front_default,
        })))
      } catch (err) {
        console.error('Fout bij laden detail:', err)
      } finally {
        setLoading(false)
        setTimeout(() => setAnimateStats(true), 100)
      }
    }
    fetchAll()
  }, [name])

  function flattenChain(chain) {
    const names = []
    let current = chain
    while (current) {
      names.push(current.species.name)
      current = current.evolves_to?.[0] ?? null
    }
    return names
  }

  function getDescription() {
    if (!species) return ''
    const dutch = species.flavor_text_entries?.find(e => e.language.name === 'nl')
    const english = species.flavor_text_entries?.find(e => e.language.name === 'en')
    const entry = dutch || english
    return entry ? entry.flavor_text.replace(/\f/g, ' ') : ''
  }

  function getGeneration() {
    if (!species) return ''
    return species.generation?.name?.replace('generation-', 'Generatie ').toUpperCase() || ''
  }

  if (loading) {
    return (
      <main className="main-content">
        <div className="container">
          <div className="loading-wrapper">
            <div className="pokeball-spinner" />
            <p>Pokémon laden…</p>
          </div>
        </div>
      </main>
    )
  }

  if (!pokemon) return null

  const primaryType = pokemon.types[0]?.type.name || 'normal'
  const image = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
  const favorite = isFavorite(pokemon.id)
  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)

  const pokemonObj = {
    id: pokemon.id,
    name: pokemon.name,
    image,
    types: pokemon.types.map(t => t.type.name),
  }

  return (
    <main className="main-content">
      <div className="container detail-page">
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <Link
            to="/list"
            className="detail-back"
            id="btn-back"
          >
            ← Terug naar lijst
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              id="btn-favorite-detail"
              onClick={() => toggleFavorite(pokemonObj)}
              aria-label={favorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
              style={{
                background: favorite ? '#fef2f2' : '#f8fafc',
                border: `1px solid ${favorite ? '#fecaca' : '#e2e8f0'}`,
                borderRadius: '50%',
                width: 40, height: 40,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {favorite ? '❤️' : '🤍'}
            </button>
            <span style={{
              background: 'var(--color-primary-bg)',
              color: 'var(--color-primary)',
              padding: '4px 12px',
              borderRadius: 999,
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>
              🌍 Kanto Regio
            </span>
          </div>
        </div>

        {/* Main grid */}
        <div className="detail-grid">
          {/* LEFT: Pokémon card */}
          <div className="detail-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="detail-card__number">{padId(pokemon.id)}</span>
              <span className="detail-card__gen-badge">{getGeneration()}</span>
            </div>

            {/* Image */}
            <div
              className="detail-card__image-wrapper"
              style={{ background: `linear-gradient(135deg, var(--type-${primaryType}-bg, #f8fafc), white)` }}
            >
              <img
                src={image}
                alt={pokemon.name}
                className="detail-card__image"
              />
            </div>

            <h1 className="detail-card__name">{pokemon.name}</h1>

            <div className="detail-card__types">
              {pokemon.types.map(t => (
                <span key={t.type.name} className={`type-badge type-badge--${t.type.name}`}>
                  {t.type.name}
                </span>
              ))}
            </div>

            {/* Beschrijving */}
            {getDescription() && (
              <p className="detail-card__description">{getDescription()}</p>
            )}

            {/* Hoogte & Gewicht */}
            <div className="detail-card__stats-grid">
              <div className="detail-card__stat">
                <span className="detail-card__stat-icon">📏</span>
                <div className="detail-card__stat-info">
                  <p className="detail-card__stat-value">{(pokemon.height / 10).toFixed(1)} m</p>
                  <p className="detail-card__stat-label">Hoogte</p>
                </div>
              </div>
              <div className="detail-card__stat">
                <span className="detail-card__stat-icon">⚖️</span>
                <div className="detail-card__stat-info">
                  <p className="detail-card__stat-value">{(pokemon.weight / 10).toFixed(1)} kg</p>
                  <p className="detail-card__stat-label">Gewicht</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Stats + Evolution + Add to team */}
          <div className="detail-right">
            {/* Basis stats */}
            <div className="detail-panel">
              <div className="detail-panel__header">
                <h2 className="detail-panel__title">📊 Basis stats</h2>
                <span className="detail-panel__total">Totaal: {totalStats}</span>
              </div>

              <div className="stat-bar-wrapper">
                {pokemon.stats.map(stat => {
                  const statName = stat.stat.name
                  const val = stat.base_stat
                  const pct = Math.min(100, (val / 255) * 100)
                  const color = STAT_COLORS[statName] || '#60a5fa'
                  const label = STAT_LABELS[statName] || statName

                  return (
                    <div key={statName} className="stat-bar">
                      <span className="stat-bar__label">{label}</span>
                      <div className="stat-bar__track">
                        <div
                          className="stat-bar__fill"
                          style={{
                            width: animateStats ? `${pct}%` : '0%',
                            background: color,
                            transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
                          }}
                        />
                      </div>
                      <span className="stat-bar__value">{val}/255</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Evolutieketen */}
            {evolution.length > 1 && (
              <div className="detail-panel">
                <h2 className="detail-panel__title" style={{ marginBottom: 20 }}>🔄 Evolutie</h2>
                <div className="evolution-chain">
                  {evolution.map((evo, i) => (
                    <div key={evo.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Link
                        to={`/pokemon/${evo.name}`}
                        className={`evo-item${evo.name === name ? ' active' : ''}`}
                        id={`evo-${evo.name}`}
                      >
                        {evo.name === name && (
                          <span className="evo-item__badge">Actief</span>
                        )}
                        <div className="evo-item__image-wrapper">
                          <img
                            src={evo.image}
                            alt={evo.name}
                            className="evo-item__image"
                          />
                        </div>
                        <span className="evo-item__name">{evo.name}</span>
                        <span className="evo-item__number">{padId(evo.id)}</span>
                      </Link>

                      {i < evolution.length - 1 && (
                        <div className="evo-arrow">
                          <span>→</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Abilities */}
            <div className="detail-panel">
              <h2 className="detail-panel__title" style={{ marginBottom: 16 }}>⚡ Vaardigheden</h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {pokemon.abilities.map(a => (
                  <span
                    key={a.ability.name}
                    style={{
                      background: a.is_hidden ? '#faf5ff' : 'var(--color-primary-bg)',
                      color: a.is_hidden ? '#9333ea' : 'var(--color-primary)',
                      padding: '4px 12px',
                      borderRadius: 999,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}
                  >
                    {a.ability.name} {a.is_hidden ? '(verborgen)' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Voeg toe aan team */}
            <button
              className="btn btn--blue btn--full"
              onClick={() => setAddModal(true)}
              id="btn-add-to-team"
              style={{ padding: '14px', fontSize: '1rem', borderRadius: 16 }}
            >
              ❤️ Voeg toe aan mijn team
            </button>
          </div>
        </div>
      </div>

      {addModal && (
        <AddToTeamModal pokemon={pokemonObj} onClose={() => setAddModal(false)} />
      )}
    </main>
  )
}
