import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anatomia - Präzise 3D-Modelle",
  description: "3D-Modelle für präzise OP-Planung aus CT- und MRT-Daten.",
  icons: {
    icon: "/favicon.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Load Contentsquare/Hotjar script asynchronously after the page is interactive */}
        <Script
          src="https://t.contentsquare.net/uxa/029cf532918a8.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
