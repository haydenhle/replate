import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Replate",
  description: "Food waste tracking for buffet restaurants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${dmSans.variable} antialiased bg-[#f8f7f4] text-gray-900`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}