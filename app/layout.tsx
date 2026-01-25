import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ReduxProvider } from "@/providers/redux-provider";
import { AppProvider } from "@/context/app-context";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mazdoor Connect - Verified Workers in Pakistan",
  description:
    "Connect with police-verified skilled workers including electricians, plumbers, AC mechanics, carpenters, and painters. Book services with transparent pricing and damage protection.",
  keywords: [
    "mazdoor",
    "workers",
    "electrician",
    "plumber",
    "carpenter",
    "painter",
    "AC mechanic",
    "Pakistan",
    "Karachi",
    "home services",
  ],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ReduxProvider>
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  );
}
