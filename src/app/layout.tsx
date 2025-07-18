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
