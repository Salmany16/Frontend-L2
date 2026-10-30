import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function AddToTeamModal({ pokemon, onClose }) {
  const { teams, addPokemonToTeam, createTeam } = useApp()
  const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.id || '')
  const [newTeamName, setNewTeamName] = useState('')
  const [mode, setMode] = useState('select')

  function handleAdd() {
    if (!selectedTeamId) return
    addPokemonToTeam(Number(selectedTeamId), pokemon)
    onClose()
  }

  function handleCreateAndAdd() {
    if (!newTeamName.trim()) return
    const team = createTeam(newTeamName.trim())
    addPokemonToTeam(team.id, pokemon)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Voeg toe aan team</h2>
          <button className="modal__close" onClick={onClose} id="modal-close-btn">✕</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '12px 16px', background: '#f8fafc', borderRadius: 12 }}>
          <img src={pokemon.image} alt={pokemon.name} style={{ width: 56, height: 56, objectFit: 'contain' }} />
          <div>
            <p style={{ fontWeight: 700, textTransform: 'capitalize', fontSize: '1rem' }}>{pokemon.name}</p>
            <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
              {pokemon.types.map(t => (
                <span key={t} className={`type-badge type-badge--${t}`}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <button
            className={`btn btn--sm ${mode === 'select' ? 'btn--blue' : 'btn--outline'}`}
            onClick={() => setMode('select')}
            id="mode-select-btn"
          >
            Bestaand team
          </button>
          <button
            className={`btn btn--sm ${mode === 'create' ? 'btn--blue' : 'btn--outline'}`}
            onClick={() => setMode('create')}
            id="mode-create-btn"
          >
            Nieuw team
          </button>
        </div>

        {mode === 'select' ? (
          teams.length === 0 ? (
            <div className="empty-state" style={{ padding: 24 }}>
              <p className="empty-state__title">Nog geen teams</p>
              <p className="empty-state__desc">Maak eerst een team aan.</p>
              <button className="btn btn--blue btn--sm" onClick={() => setMode('create')}>
                Nieuw team maken
              </button>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="team-select">Kies een team</label>
                <select
                  id="team-select"
                  className="form-select"
                  value={selectedTeamId}
                  onChange={e => setSelectedTeamId(e.target.value)}
                >
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>
                      {team.name} ({team.members.length}/6)
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn--blue btn--full" onClick={handleAdd} id="confirm-add-btn">
                ✅ Toevoegen aan team
              </button>
            </>
          )
        ) : (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="new-team-name">Naam nieuw team</label>
              <input
                id="new-team-name"
                className="form-input"
                type="text"
                placeholder="bijv. Mijn droomteam"
                value={newTeamName}
                onChange={e => setNewTeamName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreateAndAdd()}
                autoFocus
              />
            </div>
            <button
              className="btn btn--blue btn--full"
              onClick={handleCreateAndAdd}
              disabled={!newTeamName.trim()}
              id="create-and-add-btn"
            >
              🎉 Team aanmaken en toevoegen
            </button>
          </>
        )}
      </div>
    </div>
  )
}
