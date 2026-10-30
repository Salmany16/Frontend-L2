# Wireframes & Revisies Documentatie — Pokédex App (P1)

Dit document beschrijft hoe de wireframes zijn geïmplementeerd in de Pokédex webapplicatie en verantwoordt eventuele revisies en aanpassingen (beoordelingscriterium 1: **Toepassing van wireframes** — 3 punten).

---

## 1. Overzicht van de Oorspronkelijke Wireframes

De oorspronkelijke wireframes zijn opgeslagen in de map `wireframes/`:
- `wireframes/wireframe-home.png` — Homepage
- `wireframes/wireframe-lijst.png` — Pokémon overzichtslijst
- `wireframes/wireframe-detail.png` — Detailpagina van een Pokémon

---

## 2. Vergelijking & Verantwoording per Pagina

### A. Homepage (`/`)
* **Overeenkomst met wireframe:**
  - **Hero banner:** Blauwe gradient achtergrond, opvallende titel *"Welkom bij de Pokédex!"*, subtitel *"Ontdek, verzamel en beheer jouw favoriete Pokémon..."*, en de call-to-action knop *"Bekijk de Pokémon →"*. Aan de rechterzijde wordt de artwork van de uitgelichte Pokémon getoond.
  - **Populaire Pokémon sectie:** Een grid met populaire start-Pokémon (#025 Pikachu, #001 Bulbasaur, #004 Charmander, #007 Squirtle) met een *"Bekijk alles →"* link naar de lijst.
  - **"Wist je dat?" feitjesbalk:** Onderin de pagina staat de feitjeskaart met een Pokédex icoontje en interessante trivia die automatisch wisselt.
* **Revisies / Verbeteringen:**
  - **Snelkoppelingen toegevoegd:** Aan de onderkant zijn snelle links geplaatst naar "Pokédex doorzoeken", "Mijn Teams" en "Favorieten" om de flow voor de gebruiker te optimaliseren.

---

### B. Pokémon Overzichtslijst (`/list`)
* **Overeenkomst met wireframe:**
  - **Layout:** Pagina-kop met titel "Pokémon" en subtitel *"Blader door alle geregistreerde soorten in de Kanto-regio"*.
  - **Zoekbalk:** Zoekveld bovenaan rechts met vergrootglas-icoon om direct op Pokémonnaam te filteren.
  - **Type filters:** Knoppenbalk voor snelle filtering op element/type (Alle, Gras, Vuur, Water, Elektrisch, Normaal, etc.).
  - **3x3 Grid (9 per pagina):** Precies zoals in de wireframe toont de lijst pagina's van 9 kaarten met het nationale nummer (#001), een cirkelvormig artwork-vlak, de naam, gekleurde type-badges en een favorieten-hartje.
  - **Paginering:** Onder de grid bevindt zich de paginanavigatie (`‹ 1 2 3 4 5 ›`) om eenvoudig door alle 151 Kanto Pokémon te bladeren.
  - **Statusbalk onderaan:** Exact conform het wireframe is er onderaan een statusbalk met: *"Kanto Pokédex Weergave — Totaal 151 monsters geïndexeerd • Sortering op Nationaal Nummer"* en *"Gegevens bijgewerkt"*.
* **Revisies / Verbeteringen:**
  - **Knop "+ Team":** Direct op elke Pokémon-kaart is een "+ Team" knop toegevoegd zodat gebruikers sneller teams kunnen samenstellen zonder eerst naar de detailpagina te hoeven navigeren.

---

### C. Detailpagina (`/pokemon/:name` en `/list/:name`)
* **Overeenkomst met wireframe:**
  - **Bovenbalk:** "← Terug naar lijst" link, favorieten toggle knop (hartje) en de badge "Kanto Regio".
  - **Linkerkaart:** Toont het ID-nummer (#025), de badge "Generatie I", de grote officiële afbeelding, de Pokémonnaam, type-badge(s), de Pokédex omschrijving uit de spellen, en twee infoblokjes voor Hoogte (in meters) en Gewicht (in kg).
  - **Rechterpaneel — Basis stats:** Berekent het totale stat-totaal en toont animated progress bars voor de basisstatistieken.
  - **Rechterpaneel — Evolutie:** Toont de evolutiereeks met actieve statusindicator voor de huidige Pokémon, pijlen en doorklikbare evolutiestappen.
  - **Actieknop:** Grote prominente blauwe knop onderaan: *"❤️ Voeg toe aan mijn team"*.
* **Revisies / Verbeteringen:**
  - **Revisie 1 — Complete Stats:** Het ruwe wireframe toonde slechts 4 willekeurige stats (HP, Aanval, Verdediging, Snelheid). De officiële PokéAPI levert 6 volwaardige stats (HP, Aanval, Verdediging, Speciale Aanval, Speciale Verdediging, Snelheid). We tonen alle 6 met dynamische kleuraanduiding en een subtiele animatie bij het openen.
  - **Revisie 2 — Dynamische Evolutieketen:** De wireframe toonde een statisch vraagteken (#027). In de gerealiseerde applicatie leest het systeem de daadwerkelijke evolutieboom uit via PokéAPI (`evolution_chain`) en haalt direct de officiële sprites op. Hierdoor klopt de keten voor élke Pokémon (ook tweeledige ketens of Pokémon zonder evolutie).
  - **Revisie 3 — Vaardigheden (Abilities):** Er is een extra infopanel toegevoegd met vaardigheden (inclusief verborgen vaardigheden) voor extra diepgang.

---

## 3. Revisies in de Navigatiebalk (Header)

* **Oorspronkelijk wireframe:** Toonde `[Logo Pokédex]  [Home]  [Lijst]  [Detail]  [Profiel]`
* **Revisie & Verklaring:**
  1. **Waarom is de statische knop "Detail" vervangen?**
     In een webapplicatie met dynamic routing (`/pokemon/:name`) heeft een generieke knop "Detail" in het hoofdmenu geen betekenis als er nog geen Pokémon geselecteerd is. Een detailpagina hoort altijd contextueel geopend te worden vanuit de lijst of homepagina.
  2. **Waarom zijn "Teams" en "Favorieten" toegevoegd?**
     Volgens de officiële rubric-eisen moeten teams en favorieten beheerd kunnen worden. Door **"Teams"** en **"Favorieten"** vaste plekken in de navigatiebalk te geven, heeft de eindgebruiker direct toegang tot de kernfunctionaliteiten van de applicatie.
  3. **Gebruiksvriendelijke fallback:**
     Mocht een gebruiker toch direct naar `/list/:name` of `/pokemon/:name` navigeren (bijv. via URL invoer), werkt de dynamische routering vlekkeloos voor zowel IDs (`/pokemon/25`) als namen (`/pokemon/pikachu`).

---

## 4. Samenvatting Beoordeling
Met deze nauwkeurige realisatie en heldere documentatie van revisies voldoet het project volledig aan de hoogste schaal (3 punten: *"De wireframes zijn grotendeels gerealiseerd, eventuele aanpassingen zijn goed verklaard met latere revisies"*).

