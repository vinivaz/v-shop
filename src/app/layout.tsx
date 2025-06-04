import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Container } from "./Components/ui/Container";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "V-shop",
  description: "virtual shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-void flex items-center flex-col h-full justify-between pt-[45px]">
        <Header/>
        <Container>
          {children}          
        </Container>

        <Footer/>
      </body>
    </html>
  );
}
