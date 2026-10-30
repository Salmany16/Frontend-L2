import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ToastContainer from './components/ToastContainer'
import Home from './pages/Home'
import List from './pages/List'
import Detail from './pages/Detail'
import Teams from './pages/Teams'
import Favorites from './pages/Favorites'

export default function App() {
  return (
    <AppProvider>
      <div className="page-wrapper">
        {/* Altijd zichtbare navigatiebalk */}
        <Navigation />

        {/* Pagina-routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/pokemon/:name" element={<Detail />} />
          <Route path="/list/:name" element={<Detail />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* 404 fallback */}
          <Route path="*" element={
            <main className="main-content">
              <div className="container" style={{ textAlign: 'center', paddingTop: 80 }}>
                <div style={{ fontSize: '5rem', marginBottom: 16 }}>😵</div>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>404 — Pagina niet gevonden</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
                  Deze Pokémon is ontsnapt… of de pagina bestaat niet.
                </p>
                <a href="/" className="btn btn--blue">Terug naar Home</a>
              </div>
            </main>
          } />
        </Routes>

        {/* Footer */}
        <Footer />

        {/* Toast notificaties */}
        <ToastContainer />
      </div>
    </AppProvider>
  )
}
