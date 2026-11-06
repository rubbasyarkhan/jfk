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
  weight: ["400", "500", "600", "700"],
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#111111",
};

export const metadata: Metadata = {
  title: "JFK Liquors — Houston, TX | Luxury Spirits, Fine Wine & Cold Beer Near IAH",
  description:
    "Discover allocated bourbon, rare single malts, cellar wines, and cold craft beer on JFK Boulevard, Houston. 3 minutes from George Bush Intercontinental Airport (IAH).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${figtree.variable} ${anton.variable}`}>
      <body className="bg-[#111111] text-[#FFFFFF] antialiased selection:bg-[#F5D900] selection:text-[#111111]">
        {children}
      </body>
    </html>
  );
}
