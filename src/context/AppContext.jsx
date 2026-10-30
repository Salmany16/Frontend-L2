import React, { createContext, useContext, useState, useEffect } from 'react'

// -----------------------------------------------
// AppContext — global state voor teams & favorieten
// -----------------------------------------------

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // --- Favorieten ---
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('poke-favorites') || '[]')
    } catch {
      return []
    }
  })

  // --- Teams ---
  const [teams, setTeams] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('poke-teams') || '[]')
    } catch {
      return []
    }
  })

  // --- Toast notifications ---
  const [toasts, setToasts] = useState([])

  // Sync met localStorage wanneer state verandert
  useEffect(() => {
    localStorage.setItem('poke-favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('poke-teams', JSON.stringify(teams))
  }, [teams])

  // --- Favorieten functies ---
  function toggleFavorite(pokemon) {
    setFavorites(prev => {
      const exists = prev.find(p => p.id === pokemon.id)
      if (exists) {
        showToast(`${pokemon.name} verwijderd uit favorieten`, 'info')
        return prev.filter(p => p.id !== pokemon.id)
      } else {
        showToast(`${pokemon.name} toegevoegd aan favorieten ⭐`, 'success')
        return [...prev, pokemon]
      }
    })
  }

  function isFavorite(id) {
    return favorites.some(p => p.id === id)
  }

  // --- Teams functies ---
  function createTeam(name) {
    const newTeam = {
      id: Date.now(),
      name,
      members: [],
      createdAt: new Date().toISOString(),
    }
    setTeams(prev => [...prev, newTeam])
    showToast(`Team "${name}" aangemaakt! 🎉`, 'success')
    return newTeam
  }

  function deleteTeam(teamId) {
    const team = teams.find(t => t.id === teamId)
    setTeams(prev => prev.filter(t => t.id !== teamId))
    showToast(`Team "${team?.name}" verwijderd`, 'info')
  }

  function addPokemonToTeam(teamId, pokemon) {
    setTeams(prev => prev.map(team => {
      if (team.id !== teamId) return team
      if (team.members.find(m => m.id === pokemon.id)) {
        showToast(`${pokemon.name} zit al in dit team!`, 'error')
        return team
      }
      if (team.members.length >= 6) {
        showToast('Een team mag maximaal 6 Pokémon bevatten!', 'error')
        return team
      }
      showToast(`${pokemon.name} toegevoegd aan team! ✅`, 'success')
      return { ...team, members: [...team.members, pokemon] }
    }))
  }

  function removePokemonFromTeam(teamId, pokemonId) {
    setTeams(prev => prev.map(team => {
      if (team.id !== teamId) return team
      return { ...team, members: team.members.filter(m => m.id !== pokemonId) }
    }))
    showToast('Pokémon uit team verwijderd', 'info')
  }

  // --- Toast functies ---
  function showToast(message, type = 'info') {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  const value = {
    favorites,
    teams,
    toasts,
    toggleFavorite,
    isFavorite,
    createTeam,
    deleteTeam,
    addPokemonToTeam,
    removePokemonFromTeam,
    showToast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
