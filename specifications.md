Agisci come un Senior Full Stack Developer. Crea un progetto Next.js basato su queste specifiche. Parti inizializzando il progetto, creando lo schema Prisma e poi genera il layout della Dashboard.

1. Stack Tecnologico & Architettura
Framework: Next.js (App Router).

Linguaggio: TypeScript (fortemente raccomandato per far capire meglio all'AI le strutture dati).

Styling: Tailwind CSS + componenti base in stile Material Design 3.

Database: SQLite.

ORM (Object-Relational Mapping): Prisma (perfetto con Next.js e SQLite).

Gestione Immagini: Upload locale sul server. Le immagini verranno salvate in una cartella specifica (es. /public/uploads) che verrà montata come volume Docker per non perdere i dati ai riavvii.

2. Struttura Dati (Schema Prisma)
L'agente AI dovrà generare questo schema per il database. Usa ID univoci complessi (UUID) per la tabella Card in modo che i link pubblici siano inindovinabili.

Shutterstock
Esplora

Model Card (Il Biglietto)

id: String (UUID, primary key) - Usato per generare l'URL univoco (es. /card/123e4567-e89b...)

recipientName: String

photoUrl: String (Percorso dell'immagine caricata)

birthdayDate: DateTime

mainMessage: String (Testo principale del biglietto)

themeId: String (Identificativo del tema scelto, es. "theme-neon")

createdAt: DateTime

updatedAt: DateTime

Model Contributor (Chi partecipa al regalo)

id: String (UUID, primary key)

cardId: String (Foreign key collegata a Card)

name: String

dedication: String? (Opzionale)

3. Struttura delle Pagine (Routing)
Frontend Pubblico:

/card/[id]: Pagina pubblica del biglietto. Legge l'ID dall'URL, recupera i dati dal DB e renderizza il biglietto applicando il tema specificato in themeId. È ottimizzata per il mobile.

Area Admin (Protetta idealmente da una password base o Basic Auth):

/admin: Dashboard principale. Lista dei biglietti creati con pulsanti "Copia Link", "Modifica", "Elimina".

/admin/create: Form per creare un nuovo biglietto.

/admin/edit/[id]: Form per modificare un biglietto esistente.

4. Specifiche UI/UX
A. La Dashboard Admin (Material Design 3)
Chiedi all'AI di usare Tailwind CSS per simulare i principi del Material Design 3:

Colori: Uso di colori pastello per i background di superficie e un colore primario (es. un blu o viola MD3) per i FAB (Floating Action Button) e i pulsanti primari.

Componenti: Card pulite per la lista dei biglietti, angoli arrotondati ampi (es. rounded-2xl o rounded-3xl), ombre morbide (shadow-md).

Form: Input text con label flottanti o background leggermente grigio (bg-gray-100), bottoni con riempimento pieno per l'azione di salvataggio.

B. I 10 Temi per i Biglietti (Mobile-First)
Specifica all'AI che i temi devono essere gestiti tramite classi Tailwind dinamiche basate sul themeId. Ecco i 10 temi da far generare:

Minimal Elegance: Sfondo bianco panna, testo nero serif, layout pulito con tanto spazio bianco.

Neon Cyberpunk: Sfondo grigio scuro/nero, testi con effetti ombra (glow) fucsia e ciano, font monospace.

Vintage Kraft: Sfondo texture "carta da pacchi" (marroncino), font stile macchina da scrivere, contenitori con bordi tratteggiati.

Pop Art: Colori primari a contrasto (giallo acceso, rosso, blu), pattern a pois in background, bordi neri spessi sui contenitori.

Soft Floral: Colori pastello (rosa antico, salvia), font corsivo per i titoli, layout morbido.

Deep Space: Sfondo blu notte con piccoli punti bianchi (stelle), testo bianco o argento, effetto "vetro" (glassmorphism) per la lista dei contributori.

Retro 80s: Colori tramonto synthwave (viola, arancione), griglia prospettica in basso, font retrò.

Watercolor: Sfondo con gradienti sfumati irregolari e morbidi (es. rosa che sfuma nel giallo tenue).

Luxury Gold: Sfondo nero antracite o verde smeraldo molto scuro, testi e bordi in color oro (#FFD700), font serif molto elegante.

Confetti Party: Sfondo bianco, allegro, con forme geometriche colorate sparse ai bordi, font arrotondato (sans-serif tipo Comic o simile ma moderno).

5. Dockerizzazione (Infrastruttura)
Il setup deve essere a container singolo, ma con dei Volumi essenziali per non perdere i database e le foto quando riavvii il server. Specifica all'AI di creare questi due file:

Dockerfile: Deve usare un'immagine Node.js (es. node:20-alpine), eseguire npm install, npx prisma generate, buildare l'app Next.js (npm run build) e poi esporre la porta 3000 avviando l'app in produzione.

docker-compose.yml: Fondamentale per il server domestico.

YAML
version: '3.8'
services:
  birthday-app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      # Salva il database SQLite fuori dal container
      - ./prisma/data:/app/prisma/data
      # Salva le foto caricate fuori dal container
      - ./public/uploads:/app/public/uploads 
    restart: always