export const fenomenoData = {
  brand: "LAMBORGHINI",
  model: "FENOMENO",
  edition: "ROADSTER",
  tagline: "The Unstoppable Force",
  year: "2026",
  price: "€3,200,000",
  units: "10",
  origin: "Sant'Agata Bolognese, Italy",

  phases: [
    {
      id: "hero",
      scrollRange: [0, 0.25] as [number, number],
      label: "01 / ORIGIN",
      title: "FENOMENO",
      subtitle: "ROADSTER",
      description:
        "A testament to Italian hypercar design. Born from relentless obsession. Each unit hand-assembled in Sant'Agata Bolognese, Italy.",
      accent: "10 UNITS PRODUCED WORLDWIDE",
    },
    {
      id: "exterior",
      scrollRange: [0.25, 0.5] as [number, number],
      label: "02 / FORM",
      title: "CARBON SCULPTURE",
      subtitle: "AERODYNAMIC MASTERY",
      description:
        "The body carved from Forged Composite — a proprietary carbon fiber architecture exclusive to Lamborghini. Unmatched downforce and precision.",
      accent: "FORGED COMPOSITE™ MONOCOQUE",
    },
    {
      id: "doors",
      scrollRange: [0.5, 0.75] as [number, number],
      label: "03 / RITUAL",
      title: "SCISSOR DOORS",
      subtitle: "THE THEATRE OF ENTRY",
      description:
        "Iconic vertical doors that rise 85° — revealing the striking red and black interior. Opening the Fenomeno is not an action. It is a ceremony.",
      accent: "VERTICAL SCISSOR DOORS · 85°",
    },
    {
      id: "engine",
      scrollRange: [0.75, 1.0] as [number, number],
      label: "04 / POWER",
      title: "NATURALLY ASPIRATED V12",
      subtitle: "829 HP / 725 NM",
      description:
        "Hand-built V12 powertrain. 6.5 litres of pure mechanical theatre, fully visible through the intricately designed open rear clamshell.",
      accent: "0–100 KM/H IN 2.7 SECONDS",
    },
  ],

  specs: [
    { label: "Engine", value: "V12 Nat-Asp", unit: "L" },
    { label: "Displacement", value: "6.5", unit: "Litres" },
    { label: "Power", value: "829", unit: "HP" },
    { label: "Torque", value: "725", unit: "NM" },
    { label: "Weight", value: "1,450", unit: "KG" },
    { label: "Top Speed", value: "350", unit: "KM/H" },
    { label: "0–100 KM/H", value: "2.7", unit: "SEC" },
    { label: "Units Built", value: "10", unit: "TOTAL" },
  ],

  features: [
    {
      number: "01",
      title: "Forged Composite Body",
      description:
        "A proprietary carbon fiber architecture developed exclusively for Lamborghini. Incredibly lightweight while maximizing structural rigidity.",
    },
    {
      number: "02",
      title: "Active Aerodynamics",
      description:
        "The ALA system responds to speed, braking, and cornering in real-time, vectoring air to maximize grip and cornering capabilities.",
    },
    {
      number: "03",
      title: "Red & Black Interior",
      description:
        "Aggressive racing seats trimmed in red and black leather, exposed carbon fiber monocoque, and digital telemetry.",
    },
    {
      number: "04",
      title: "Track DNA",
      description:
        "Tested and refined on the world's most demanding circuits. Pushrod suspension, carbon-ceramic brakes, and Pirelli P Zero tires.",
    },
  ],

  navLinks: ["STORY", "SPECS", "FEATURES", "CONTACT"],
};

export type FenomenoData = typeof fenomenoData;
export type Phase = (typeof fenomenoData.phases)[number];
export type Spec = (typeof fenomenoData.specs)[number];
export type Feature = (typeof fenomenoData.features)[number];
