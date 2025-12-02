import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  display: 'optional', // Faster initial render on mobile
  preload: true,
  weight: ['400', '500', '600', '700'],
  variable: "--font-inter",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Axiom Trade Clone - Token Discovery",
  description: "Pixel-perfect clone of Axiom Trade's token discovery table",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external image domain for faster loading */}
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
        {/* Optimize rendering */}
        <meta name="color-scheme" content="dark" />
        {/* Mobile optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${inter.className} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
