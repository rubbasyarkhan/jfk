import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display, Anton } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "JFK Liquors — Houston, TX | Luxury Spirits, Fine Wine & Allocated Vault Near IAH",
  description:
    "Discover allocated bourbon, rare single malts, cellar wines, and cold craft beer on JFK Boulevard, Houston. 3 minutes from George Bush Intercontinental Airport (IAH).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable} ${anton.variable}`}>
      <body className="bg-[#050505] text-[#FFFFFF] font-sans antialiased selection:bg-[#F5D900] selection:text-[#050505]">
        {children}
      </body>
    </html>
  );
}
