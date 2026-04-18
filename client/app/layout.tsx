import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NotesApp - Simple Note Taking',
  description: 'Capture, organize, and access your notes from anywhere.',

  icons: {
    icon: [
     
      {
        url: '/logo.png',
        type: 'image/png',
      },
    ],
  
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`} suppressHydrationWarning>
        <Providers>
          {children}
          {process.env.NODE_ENV === "production"}
        </Providers>
      </body>
    </html>
  );
}