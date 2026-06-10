import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import CustomCursor from "@/components/effects/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Optika Kosović — Novi Banovci",
  description:
    "Dioptrijske naočare, kontaktna sočiva, provera dioptrije i servis — sve na jednom mestu u Novim Banovcima.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr-Latn-RS"
      className={`${inter.variable} ${playfairDisplay.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-text-primary">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
