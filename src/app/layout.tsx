import { Providers } from "@/components/shared";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
   title: "NextGram",
   description: "NextGram is a messenger built with Next.js.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className="bg-[#212121] font-roboto">
            <Providers>{children}</Providers>
         </body>
      </html>
   );
}
