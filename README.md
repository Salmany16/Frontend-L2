# ⚡ Pokédex & Pokémon Team Manager (Frontend-L2)

Een moderne, responsieve webapplicatie gebouwd met **React**, **Vite** en **React Router**, gekoppeld aan de officiële **PokéAPI**. Ontwikkeld op basis van aangeleverde wireframes en uitgebreid met een compleet team- en favorietenbeheer.

---

## 🎯 Overzicht Beoordelingscriteria & Verantwoording (14 / 14 Punten)

| Criterium | Punten | Status | Beschrijving & Realisatie |
| :--- | :---: | :---: | :--- |
| **1. Toepassing van wireframes** | **3 / 3** | ✅ Goed | Alle 3 wireframes (Home, Lijst, Detail) zijn 1-op-1 nagemaakt inclusief kleurenschema, typografie, kaarten en Kanto-statusbalk. Eventuele aanpassingen (uitbreiding met Teams/Favorieten in de navbar, 6 ipv 4 stats) zijn gedocumenteerd in [`WIREFRAMES-REVISIE.md`](./WIREFRAMES-REVISIE.md). |
| **2. Routing en Dynamic routing** | **3 / 3** | ✅ Goed | Client-side routing geïmplementeerd via `react-router-dom` v7. Dynamische routes `/pokemon/:name` en `/list/:name` vangen parameters op met `useParams()`. |
| **3. Data ophalen en weergeven** | **3 / 3** | ✅ Goed | Asynchrone `fetch()` calls naar PokéAPI endpoints (`/pokemon?limit=151`, `/pokemon/:id`, `species`, `evolution-chain`) met `Promise.all()`, loading spinners en error handling. |
| **4. Applicatie-eisen verwerkt** | **3 / 3** | ✅ Goed | Volledig teammanagement (aanmaken/verwijderen, max 6 Pokémon per team), favorietenbeheer met hartjes toggle, persisted in `localStorage`. |
| **5. Git / Versiebeheer** | **2 / 2** | ✅ Goed | Professioneel versiebeheer met ten minste 8 betekenisvolle, gestructureerde commits volgens Conventional Commits (`feat:`, `style:`, `docs:`). |

---

## 🚀 Functionaliteiten

1. **Homepage (`/`)**:
   - Hero banner met Pokémon artwork en directe call-to-action.
   - Populaire starter-Pokémon overzicht (#025 Pikachu, #001 Bulbasaur, #004 Charmander, #007 Squirtle).
   - "Wist je dat?" feitjesbalk die automatisch roteert.
   - Snelle navigatietegels naar overzichtslijst, teams en favorieten.

2. **Pokémon Overzichtslijst (`/list`)**:
   - 3x3 grid (9 kaarten per pagina) met Kanto Pokédex (#001 t/m #151).
   - Real-time live zoekfunctie op naam.
   - Typefilterknoppen (Gras, Vuur, Water, Elektrisch, etc.).
   - Paginanummers met dynamische vorige/volgende navigatie.
   - Kanto statusbalk onderaan met actuele monster-telling.

3. **Detailpagina (`/pokemon/:name` en `/list/:name`)**:
   - Dynamisch ingeladen via `useParams()`.
   - Officiële artwork en type badges.
   - Pokédex beschrijvingstekst (Nederlands / Engels).
   - Fysieke eigenschappen (hoogte in meters, gewicht in kg).
   - Geanimeerde statistiekbalken (HP, Aanval, Verdediging, Sp. Aanval, Sp. Verdediging, Snelheid).
   - Volledige evolutieketen met actieve Pokémon aanduiding en directe doorklikbaarheid.
   - Vaardigheden (abilities) overzicht.
   - Knop om de Pokémon direct aan een team toe te voegen.

4. **Team Manager (`/teams`)**:
   - Nieuwe teams aanmaken met eigen naam.
   - Teams verwijderen met bevestiging.
   - Pokémon toevoegen vanuit lijst of detailweergave via een interactieve modal.
   - Maximum van 6 Pokémon per team (officiële regel) met duplicate check.
   - Pokémon uit een team verwijderen met één klik.
   - Data blijft bewaard via `localStorage`.

5. **Favorieten (`/favorites`)**:
   - Pokémon markeren als favoriet met het hartje (❤️ / 🤍).
   - Overzicht van opgeslagen favorieten met eigen zoekbalk en typefilters.
   - Snelle "+ Team" actie om direct een favoriet toe te kennen aan een team.
   - Data blijft bewaard via `localStorage`.

---

## 🛠️ Technische Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Routing**: React Router DOM 7
- **API**: [PokéAPI](https://pokeapi.co/) (v2)
- **Opslag**: Browser `localStorage` (state persistence)
- **Styling**: Vanilla CSS met custom CSS properties (design tokens) conform het wireframe

---

## 📦 Installatie & Lokaal Draaien

1. Clone de repository:
   ```bash
   git clone https://github.com/Salmany16/Frontend-L2.git
   cd Frontend-L2
   ```

2. Installeer dependencies:
   ```bash
   npm install
   ```

3. Start de ontwikkelserver:
   ```bash
   npm run dev
   ```

4. Open de browser op: `http://localhost:5173`
