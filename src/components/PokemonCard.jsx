import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

// Type kleuren voor de achtergrond van de kaart
const TYPE_GRADIENTS = {
  grass: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
  fire: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
  water: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
  electric: 'linear-gradient(135deg, #fefce8, #fef9c3)',
  psychic: 'linear-gradient(135deg, #fdf4ff, #fae8ff)',
  ice: 'linear-gradient(135deg, #ecfeff, #cffafe)',
  dragon: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
  dark: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
  fairy: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
  normal: 'linear-gradient(135deg, #fafaf9, #f5f5f4)',
  fighting: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
  poison: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
  ground: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
  flying: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
  bug: 'linear-gradient(135deg, #f7fee7, #ecfccb)',
  rock: 'linear-gradient(135deg, #fafaf9, #f5f5f4)',
  ghost: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
  steel: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
}

function padId(id) {
  return `#${String(id).padStart(3, '0')}`
}

export default function PokemonCard({ id, name, image, types = [], onAddToTeam }) {
  const { toggleFavorite, isFavorite } = useApp()
  const primaryType = types[0] || 'normal'
  const gradient = TYPE_GRADIENTS[primaryType] || TYPE_GRADIENTS.normal
  const favorite = isFavorite(id)

  function handleFavorite(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite({ id, name, image, types })
  }

  function handleAddToTeam(e) {
    e.preventDefault()
    e.stopPropagation()
    onAddToTeam?.({ id, name, image, types })
  }

  return (
    <Link to={`/pokemon/${name}`} className="pokemon-card" id={`card-${name}`}>
      {/* Header: nummer + favoriet knop */}
      <div className="pokemon-card__header">
        <span className="pokemon-card__number">{padId(id)}</span>
        <button
          className={`pokemon-card__fav-btn${favorite ? ' active' : ''}`}
          onClick={handleFavorite}
          id={`fav-btn-${name}`}
          aria-label={favorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Pokémon afbeelding */}
      <div className="pokemon-card__image-wrapper" style={{ background: gradient }}>
        <img
          src={image}
          alt={name}
          className="pokemon-card__image"
          loading="lazy"
        />
      </div>

      {/* Naam */}
      <p className="pokemon-card__name">{name}</p>

      {/* Type badges */}
      <div className="pokemon-card__types">
        {types.map(type => (
          <span key={type} className={`type-badge type-badge--${type}`}>
            {type}
          </span>
        ))}
      </div>

      {/* Voeg toe aan team (optioneel) */}
      {onAddToTeam && (
        <button
          className="btn btn--outline btn--sm"
          onClick={handleAddToTeam}
          id={`add-team-btn-${name}`}
          style={{ marginTop: 4 }}
        >
          + Team
        </button>
      )}
    </Link>
  )
}
