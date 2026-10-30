import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Teams() {
  const { teams, createTeam, deleteTeam, removePokemonFromTeam } = useApp()
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')

  function handleCreate() {
    if (!newName.trim()) return
    createTeam(newName.trim())
    setNewName('')
    setShowCreate(false)
  }

  return (
    <main className="main-content">
      <div className="container teams-page">
        {/* Header */}
        <div className="teams-page__header">
          <div>
            <h1 className="page-title">⚔️ Mijn Teams</h1>
            <p className="page-subtitle">Beheer je Pokémon teams — max. 6 Pokémon per team</p>
          </div>
          <button
            className="btn btn--blue"
            onClick={() => setShowCreate(true)}
            id="btn-create-team"
          >
            + Nieuw team
          </button>
        </div>

        {/* Geen teams */}
        {teams.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">🎮</div>
            <h2 className="empty-state__title">Nog geen teams aangemaakt</h2>
            <p className="empty-state__desc">
              Maak je eerste team aan en voeg Pokémon toe via de lijst of detailpagina!
            </p>
            <button className="btn btn--blue" onClick={() => setShowCreate(true)} id="btn-create-first-team">
              🎉 Eerste team maken
            </button>
          </div>
        ) : (
          <div className="teams-grid">
            {teams.map(team => (
              <TeamCard
                key={team.id}
                team={team}
                onDelete={() => deleteTeam(team.id)}
                onRemoveMember={(pokemonId) => removePokemonFromTeam(team.id, pokemonId)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create team modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal__header">
              <h2 className="modal__title">Nieuw team aanmaken</h2>
              <button className="modal__close" onClick={() => setShowCreate(false)} id="modal-close">✕</button>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="team-name-input">Teamnaam</label>
              <input
                id="team-name-input"
                className="form-input"
                type="text"
                placeholder="bijv. Brand Dream Team 🔥"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                autoFocus
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="btn btn--outline btn--full"
                onClick={() => setShowCreate(false)}
                id="btn-cancel-create"
              >
                Annuleren
              </button>
              <button
                className="btn btn--blue btn--full"
                onClick={handleCreate}
                disabled={!newName.trim()}
                id="btn-confirm-create"
              >
                Team aanmaken 🎉
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

// ── TeamCard sub-component ──────────────────────────────────
function TeamCard({ team, onDelete, onRemoveMember }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div className="team-card" id={`team-card-${team.id}`}>
      <div className="team-card__header">
        <h2 className="team-card__name">{team.name}</h2>
        <span className="team-card__count">{team.members.length}/6</span>
      </div>

      {/* Pokémon leden */}
      <div className="team-card__pokemon-list">
        {team.members.length === 0 ? (
          <div className="team-card__empty">
            Nog geen Pokémon — voeg ze toe via de lijst!
          </div>
        ) : (
          team.members.map(member => (
            <div key={member.id} className="team-card__member" title={member.name}>
              <img
                src={member.image}
                alt={member.name}
                className="team-card__member-img"
              />
              <button
                className="team-card__member-remove"
                onClick={() => onRemoveMember(member.id)}
                id={`remove-${member.name}-from-${team.id}`}
                aria-label={`${member.name} uit team verwijderen`}
              >
                ✕
              </button>
              <span className="team-card__member-name">{member.name}</span>
            </div>
          ))
        )}
      </div>

      {/* Acties */}
      <div className="team-card__actions">
        <Link
          to="/list"
          className="btn btn--outline btn--sm"
          style={{ flex: 1, textAlign: 'center' }}
          id={`btn-add-pokemon-team-${team.id}`}
        >
          + Pokémon toevoegen
        </Link>

        {confirmDelete ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn btn--danger btn--sm"
              onClick={onDelete}
              id={`btn-confirm-delete-${team.id}`}
            >
              Ja, verwijder
            </button>
            <button
              className="btn btn--outline btn--sm"
              onClick={() => setConfirmDelete(false)}
              id={`btn-cancel-delete-${team.id}`}
            >
              Annuleer
            </button>
          </div>
        ) : (
          <button
            className="btn btn--danger btn--sm"
            onClick={() => setConfirmDelete(true)}
            id={`btn-delete-team-${team.id}`}
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  )
}
