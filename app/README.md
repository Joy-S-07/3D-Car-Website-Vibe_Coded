# Fenomeno App — Next.js Application

The core web application for the Lamborghini Fenomeno 3D scroll experience. Built with **Next.js 16**, **React 19**, **Framer Motion**, and **Lenis** smooth scroll.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the experience.

### Other Commands

```bash
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # Run ESLint
```

---

## 📁 Directory Structure

```
app/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Main page — master scroll controller
│   ├── layout.tsx              # Root layout, fonts (Geist), metadata
│   └── globals.css             # Global styles, Tailwind CSS directives
│
├── components/
│   ├── FenomenoScrollCanvas.tsx  # HTML5 canvas that renders 240 frames
│   │                             # synced to scroll position
│   ├── FenomenoExperience.tsx    # Scroll-phase HUD with animated text
│   │                             # overlays (4 phases: Origin → Power)
│   ├── Navbar.tsx                # Fixed glassmorphism navigation bar
│   ├── SpecsGrid.tsx             # 8-cell specs grid (V12, 829 HP, etc.)
│   ├── FeaturesSection.tsx       # 4-card features showcase
│   └── Footer.tsx                # Site footer with links & branding
│
├── data/
│   └── carData.ts              # Central data source — all car specs,
│                                 # phases, features, nav links
│
├── lib/
│   └── utils.ts                # Utility functions (cn helper for classnames)
│
├── public/
│   ├── frames/                 # 240 JPG frames (ezgif-frame-001 to 240)
│   │                           # + 81 PNG frames (frame-001 to 081)
│   └── hero-assets/            # Hero images (closed, doors open, engine)
│
└── scripts/
    ├── process_all_frames.py     # Batch process all 240 scroll frames
    └── process_hero_images.py    # Process hero section images
```

---

## 🏗️ Architecture

### Scroll System

The experience is driven by a single scroll container (`600vh`) on the main page:

```
page.tsx
 ├── Navbar                         (fixed)
 ├── Scroll Container (600vh)       (scrollable)
 │   └── Sticky Viewport (100vh)    (sticky top:0)
 │       ├── FenomenoScrollCanvas   (canvas — renders frames 1–240)
 │       └── FenomenoExperience     (HUD overlay — 4 text phases)
 ├── SpecsGrid                      (normal flow)
 ├── FeaturesSection                (normal flow)
 └── Footer                         (normal flow)
```

- **`FenomenoScrollCanvas`** — Preloads all 240 frames into memory, then draws the appropriate frame on a `<canvas>` element based on the current `scrollYProgress` value (0 → 1).
- **`FenomenoExperience`** — Reads the same `scrollYProgress` and maps it to 4 phases defined in `carData.ts`. Each phase triggers staggered text animations via Framer Motion.

### Smooth Scroll

[Lenis](https://github.com/studio-freight/lenis) is initialized in `page.tsx` to provide smooth, physics-based scrolling with custom easing and reduced wheel sensitivity.

---

## 🛠️ Tech Stack

| Dependency               | Version   | Purpose                                  |
| ------------------------ | --------- | ---------------------------------------- |
| `next`                   | 16.2.6    | React framework with App Router          |
| `react` / `react-dom`    | 19.2.4    | UI library                               |
| `framer-motion`          | 12.39.0   | Scroll-tied animations & transitions     |
| `@studio-freight/lenis`  | 1.0.42    | Smooth scroll physics                    |
| `tailwindcss`            | 4.x       | Utility-first CSS framework              |
| `clsx` / `tailwind-merge`| latest    | Conditional classname merging            |
| `typescript`             | 5.x       | Type safety                              |

---

## 🎨 Customization

### Changing Car Data

All text, specs, and features are centralized in [`data/carData.ts`](data/carData.ts). Edit this single file to change:
- Brand name, model, tagline, price
- Scroll phase labels, titles, and descriptions
- Specs grid values
- Feature cards content

### Replacing Frames

1. Place your new frames in `public/frames/` using the naming format `ezgif-frame-XXX.jpg` (001–240)
2. Update the `totalFrames` prop in `page.tsx` if your count differs
3. Use the Python scripts in `scripts/` for batch processing

---

## 📄 License

This project is for educational and portfolio purposes.
