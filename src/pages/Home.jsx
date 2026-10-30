import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PokemonCard from '../components/PokemonCard'
import AddToTeamModal from '../components/AddToTeamModal'

const POPULAR_IDS = [25, 1, 4, 7, 6, 150, 133, 39]

const FUN_FACTS = [
  'Er zijn meer dan 1.000 verschillende Pokémon soorten!',
  'Pikachu is de meest herkenbare Pokémon ter wereld.',
  'Magikarp evolueert naar de krachtige Gyarados!',
  'Eevee heeft de meeste evoluties van alle Pokémon.',
  'Mewtwo werd gecreëerd door genetische manipulatie.',
]

export default function Home() {
  const [popular, setPopular] = useState([])
  const [heroPokemon, setHeroPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [factIndex, setFactIndex] = useState(0)
  const [addModal, setAddModal] = useState(null)

  useEffect(() => {
    async function fetchPopular() {
      try {
        const results = await Promise.all(
          POPULAR_IDS.slice(0, 4).map(id =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json())
          )
        )
        const mapped = results.map(p => ({
          id: p.id,
          name: p.name,
          image: p.sprites.other['official-artwork'].front_default || p.sprites.front_default,
          types: p.types.map(t => t.type.name),
        }))
        setPopular(mapped)
        setHeroPokemon(mapped[0])
      } catch (err) {
        console.error('Fout bij ophalen populaire Pokémon:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPopular()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex(i => (i + 1) % FUN_FACTS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="main-content">
      <div className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__content">
            <div className="hero__badge">⚡ AVONTUUR WACHT</div>
            <h1 className="hero__title" id="hero-title">
              Welkom bij de Pokédex!
            </h1>
            <p className="hero__subtitle">
              Ontdek, verzamel en beheer jouw favoriete Pokémon en bouw het ultieme team.
            </p>
            <Link to="/list" className="btn btn--primary" id="hero-cta-btn">
              Bekijk de Pokémon →
            </Link>
          </div>

          {heroPokemon && (
            <div className="hero__image">
              <img
                src={heroPokemon.image}
                alt={heroPokemon.name}
                className="hero__pokemon-img"
              />
            </div>
          )}
        </section>

        <section aria-labelledby="popular-title">
          <div className="section-header">
            <h2 className="section-title" id="popular-title">Populaire Pokémon</h2>
            <Link to="/list" className="section-link" id="view-all-link">
              Bekijk alles →
            </Link>
          </div>

          {loading ? (
            <div className="loading-wrapper">
              <div className="pokeball-spinner" />
              <p>Pokémon laden…</p>
            </div>
          ) : (
            <div className="pokemon-grid">
              {popular.map(p => (
                <PokemonCard
                  key={p.id}
                  {...p}
                  onAddToTeam={() => setAddModal(p)}
                />
              ))}
            </div>
          )}
        </section>

        <div className="fact-card" role="note" aria-live="polite">
          <div className="fact-card__icon" />
          <div className="fact-card__content">
            <p className="fact-card__title">Wist je dat? ✨</p>
            <p className="fact-card__subtitle">{FUN_FACTS[factIndex]}</p>
          </div>
          <span className="fact-card__arrow">›</span>
        </div>

        <section style={{ marginTop: 40 }}>
          <div className="section-header">
            <h2 className="section-title" id="quick-links-title">Snel navigeren</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { to: '/list', emoji: '🔍', label: 'Pokédex doorzoeken', desc: 'Vind elke Pokémon' },
              { to: '/teams', emoji: '⚔️', label: 'Mijn Teams', desc: 'Beheer je teams' },
              { to: '/favorites', emoji: '⭐', label: 'Favorieten', desc: 'Je favoriete Pokémon' },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                id={`quicklink-${item.to.replace('/', '')}`}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: '20px 24px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                className="quick-link-card"
              >
                <span style={{ fontSize: '2rem' }}>{item.emoji}</span>
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.925rem' }}>{item.label}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 2 }}>{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {addModal && (
        <AddToTeamModal pokemon={addModal} onClose={() => setAddModal(null)} />
      )}
    </main>
  )
}
