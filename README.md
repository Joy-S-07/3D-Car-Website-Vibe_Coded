# 🏎️ Lamborghini Fenomeno — 3D Scroll Experience

An immersive, scroll-driven 3D showcase website for the **Lamborghini Fenomeno Roadster** — a fictional hypercar concept. Built entirely through vibe coding.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

---

## ✨ Highlights

- **Scroll-Driven Image Sequence** — 240 frames rendered on a canvas element, advancing as you scroll to create a cinematic 3D car reveal
- **Phase-Based Storytelling** — The scroll journey is divided into 4 narrative phases: *Origin → Form → Ritual → Power*
- **Sticky Canvas + HUD Overlay** — A fixed viewport canvas with animated text overlays that transition between phases
- **Smooth Scrolling** — Powered by [Lenis](https://github.com/studio-freight/lenis) for buttery-smooth scroll physics
- **Framer Motion Animations** — Cinematic text reveals, fades, and transitions tied to scroll progress
- **Responsive Design** — Fully responsive layout with mobile-optimized typography and grid layouts
- **Specs & Features Sections** — Clean data-driven grids showcasing the car's technical specifications and design highlights

---

## 📁 Project Structure

```
3D Car Website - Vibe Coded/
├── app/                          # Next.js application (source code)
│   ├── app/                      # Next.js App Router pages & styles
│   │   ├── page.tsx              # Main page — orchestrates the full experience
│   │   ├── layout.tsx            # Root layout with fonts & metadata
│   │   └── globals.css           # Global styles & Tailwind directives
│   ├── components/               # React components
│   │   ├── FenomenoScrollCanvas  # Canvas-based scroll image sequence renderer
│   │   ├── FenomenoExperience    # Scroll-phase HUD overlay with text animations
│   │   ├── Navbar                # Fixed navigation bar
│   │   ├── SpecsGrid             # Technical specifications grid
│   │   ├── FeaturesSection       # Design features showcase
│   │   └── Footer                # Site footer
│   ├── data/
│   │   └── carData.ts            # All car data (specs, phases, features)
│   ├── public/
│   │   ├── frames/               # 240 scroll-sequence frames (JPG) + 81 PNG frames
│   │   └── hero-assets/          # Hero section images
│   ├── scripts/                  # Python scripts for image processing
│   └── package.json
├── images/                       # Source images & reference assets
├── video/                        # Source video used for frame extraction
└── README.md                     # ← You are here
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Joy-S-07/Joy-S-07-3D-Car-Website-Vibe_Coded.git
cd Joy-S-07-3D-Car-Website-Vibe_Coded

# 2. Navigate to the app directory
cd app

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and scroll to experience the full reveal.

---

## 🛠️ Tech Stack

| Layer          | Technology                                                        |
| -------------- | ----------------------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org/) (App Router)                   |
| UI Library     | [React 19](https://react.dev/)                                   |
| Language       | [TypeScript 5](https://www.typescriptlang.org/)                  |
| Styling        | [Tailwind CSS 4](https://tailwindcss.com/)                       |
| Animation      | [Framer Motion 12](https://www.framer.com/motion/)               |
| Smooth Scroll  | [Lenis](https://github.com/studio-freight/lenis)                 |
| Canvas         | HTML5 Canvas API (scroll-synced frame rendering)                  |

---

## 🎬 How the Scroll Experience Works

1. The page has a **600vh tall scroll container** that drives the entire cinematic sequence
2. A **sticky canvas** stays fixed in the viewport while you scroll
3. As `scrollYProgress` advances from 0 → 1, the canvas renders frames 1 → 240, creating a smooth 3D rotation of the car
4. Simultaneously, a **HUD overlay** transitions between 4 narrative phases, revealing text with staggered Framer Motion animations
5. After the scroll sequence ends, the page continues naturally into specs, features, and footer sections

---

## 🤝 Open Source — Contributions Welcome!

This project is **open for contributions**! Whether you're a designer, developer, or car enthusiast — we'd love your help in expanding this experience.

### 🚗 Adding More Cars (Primary Goal)

The biggest area for contribution is **adding new car tabs** — turning this from a single-car showcase into a multi-car gallery experience. Here's how you can contribute a new car:

1. **Fork** the repository and create a new branch (`feature/add-<car-name>`)
2. **Prepare your frames** — Extract 200–240 sequential frames from a 3D rotation video of the car
   - Place them in `app/public/frames/<car-name>/`
   - Use the naming format `frame-001.jpg`, `frame-002.jpg`, etc.
   - Use the Python scripts in `app/scripts/` for batch processing
3. **Add car data** — Create a new data entry in `app/data/carData.ts` following the existing `fenomenoData` structure:
   - Brand, model, tagline, price
   - 4 scroll phases with titles and descriptions
   - 8 spec values
   - 4 feature cards
4. **Submit a Pull Request** with a description and a screenshot/GIF of the experience

#### 💡 Car Ideas

| Car                        | Status      |
| -------------------------- | ----------- |
| Lamborghini Fenomeno       | ✅ Complete |
| Porsche 911 GT3 RS         | 🟡 Open     |
| Ferrari SF90 Stradale      | 🟡 Open     |
| McLaren P1                 | 🟡 Open     |
| Bugatti Chiron             | 🟡 Open     |
| Pagani Huayra              | 🟡 Open     |
| *Your favorite car here!*  | 🟡 Open     |

### 🛠️ Other Ways to Contribute

- **UI/UX improvements** — Better animations, transitions, or responsive layouts
- **Performance optimization** — Lazy loading, image compression, frame caching strategies
- **New sections** — Interior gallery, sound clips, comparison mode
- **Accessibility** — Keyboard navigation, screen reader support, reduced motion preferences
- **Bug fixes** — Found something broken? Open an issue or submit a fix!

### 📋 Contribution Guidelines

1. **Fork & Branch** — Always work on a feature branch, never directly on `main`
2. **Keep it clean** — Follow the existing code style (TypeScript, component structure)
3. **Test locally** — Make sure `npm run build` passes before submitting
4. **Descriptive PRs** — Include screenshots or recordings for visual changes
5. **Be respectful** — This is a learning project; all skill levels are welcome

```bash
# Fork, clone, and get started
git clone https://github.com/<your-username>/Joy-S-07-3D-Car-Website-Vibe_Coded.git
cd Joy-S-07-3D-Car-Website-Vibe_Coded/app
npm install
npm run dev
```

---

## 📄 License

This project is open source and available for educational, portfolio, and community purposes.

---

<p align="center">
  <strong>FENOMENO ROADSTER</strong><br/>
  <em>Born from relentless obsession. 10 units produced worldwide.</em><br/><br/>
  ⭐ <strong>Star this repo</strong> if you find it cool — it helps others discover it!
</p>
