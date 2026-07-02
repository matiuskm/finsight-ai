import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FinSight AI — Finance Dashboard",
  description: "AI-powered personal finance dashboard. Track income, expenses, budget, and get smart insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full antialiased`}>
      <body className="min-h-full bg-gray-950 text-white font-[family-name:var(--font-inter)]">
        {children}
        <footer className="relative z-10 text-center py-6 text-xs text-white/25">
          © {new Date().getFullYear()} Arunika Digital
        </footer>
      </body>
    </html>
  );
}
