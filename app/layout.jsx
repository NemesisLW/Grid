import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "../styles/globals.css";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="bg-[#00000f] text-gray-300">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
