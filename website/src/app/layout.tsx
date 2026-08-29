import type { Metadata } from "next";
import { Cinzel_Decorative, Playfair_Display, Cairo, Inter } from "next/font/google";
import "./globals.css";
import AppProviders from "@/context/AppProviders";

const cinzel = Cinzel_Decorative({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  adjustFontFallback: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: false,
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Le Crispy Dormans — Kebab, Pizza, Burger, Tacos, Naan",
  description: "Fast-food Le Crispy Dormans (1 rue Jean de Dormans, 51700 Dormans). Tel: 09 56 07 00 91. 2 pizzas achetées = 1 pizza offerte. Sur place, à emporter et livraison.",
  keywords: ["le crispy dormans", "kebab dormans", "pizza dormans", "burger dormans", "tacos dormans", "livraison dormans"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cinzel.variable} ${playfair.variable} ${cairo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
