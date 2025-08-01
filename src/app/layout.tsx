import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { Zen_Dots } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "./providers"; 
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { Container } from "@/Components/ui/Container";
import { WarningMessage } from "@/Components/ui/WarningMessage";
import { Checkout } from "@/Components/Checkout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const zenDots = Zen_Dots({
  subsets: ["latin"],
  variable: "--font-zen-dots",
  weight: "400",
});


export const metadata = {
  title: "V-shop | Technology that moves you",
  description: "Discover the Omnia Core and other innovative products. Smartphones, gaming consoles, and more — all with modern design and outstanding performance.",
    icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-96x96.png", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/apple-touch-icon.png", rel: "apple-touch-icon" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  keywords: ["Smartphones", "Videogames", "Smartwatches", "Headphones"],
  openGraph: {
    title: "V-shop | Technology that moves you",
    description:
      "Explore the Omnia Core — our next-generation smartphone — and much more.",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "NOVA",
    images: [
      {
        url: `https://${process.env.NEXT_PUBLIC_URL}image-meta.png`,
        width: 664,
        height: 302,
        alt: "Omnia Core - NOVA",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA | Tecnologia que move você",
    description: "Tecnologia de ponta com design impressionante. Conheça nossos produtos.",
    images: [`https://${process.env.NEXT_PUBLIC_URL}image-meta.png`],
  },
    robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${zenDots.variable}`}>
      <body className="bg-void flex items-center flex-col h-full justify-between pt-[var(--navbar-height)] max-md:pt-0 max-md:pb-[var(--navbar-height)]">
        <AuthProvider>
          <Header />
          <Container>
            {children}
          </Container>
          <Footer />
          <WarningMessage />
          <Checkout/>
        </AuthProvider>
      </body>
    </html>
  );
}
