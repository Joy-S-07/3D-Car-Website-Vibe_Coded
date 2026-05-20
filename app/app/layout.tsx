import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lamborghini Fenomeno Roadster | 2026",
  description:
    "The Lamborghini Fenomeno Roadster. A naturally aspirated V12 masterpiece. Only 10 units worldwide. Born in Sant'Agata Bolognese, Italy.",
  keywords: [
    "Lamborghini",
    "Fenomeno",
    "Roadster",
    "V12",
    "Supercar",
    "Hypercar",
    "2026",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body>{children}</body>
    </html>
  );
}
