import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
   title: "NextGram",
   description: "NextGram is a social media platform built with Next.js.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body>{children}</body>
      </html>
   );
}
