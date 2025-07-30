import type { Metadata } from "next";

// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "./providers"; 
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { Header } from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import { Container } from "@/Components/ui/Container";
import { WarningMessage } from "@/Components/ui/WarningMessage";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "V-shop | Technology that moves you",
  description: "Discover the Omnia Core and other innovative products. Smartphones, gaming consoles, and more — all with modern design and outstanding performance.",
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
    <html lang="en">
      <body className="bg-void flex items-center flex-col h-full justify-between pt-[var(--navbar-height)] max-md:pt-0 max-md:pb-[var(--navbar-height)]">
        <AuthProvider>
          <Header />
          <Container>
            {children}
          </Container>
          <Footer />
          <WarningMessage />
        </AuthProvider>
      </body>
    </html>
  );
}
