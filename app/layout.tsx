import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Figtree, Anton } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  style: ["normal", "italic"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0E0D0D",
};

export const metadata: Metadata = {
  title: "JFK Liquors — Houston, TX | Rare Spirits, Fine Wine & Cold Beer Near IAH",
  description:
    "We bring you close to the cask. Houston’s premier spirits destination on JFK Boulevard minutes from George Bush Intercontinental Airport (IAH). Allocated bourbons, rare single malts, and curated wines.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${figtree.variable} ${anton.variable}`}>
      <body className="bg-[#0E0D0D] text-[#FFFFFF] antialiased selection:bg-[#D4AF37]/30 selection:text-[#FFFFFF]">
        {children}
      </body>
    </html>
  );
}
