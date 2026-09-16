import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "TechTactix 2026 | CSI Student Chapter | St. Peter's Engineering College",
  description: "TechTactix 2026 — Think Smart. Pitch Strong. Defend Better. A two-round technical competition organized by the CSI Student Chapter of St. Peter's Engineering College.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-navy-900 text-white min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
