import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PixelSnowWrapper } from "../components/PixelSnow/PixelSnowWrapper";
import { Header } from "../components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Venkata Ramana — Designer & Developer",
  description: "Experimental portfolio showcasing design, development, and creative vision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PixelSnowWrapper />
        <Header />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
