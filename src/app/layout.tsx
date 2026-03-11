//Root layout for Replate
//Loads global styles, set up fonts, wraps pages

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

//Loads main DM Sans font
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

//Metadata used by browser and search engines
export const metadata: Metadata = {
  title: "Replate",
  description: "Food waste tracking for buffet restaurants",
};

//Renders shared page layout: HTML, fonts, nav bar, content
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