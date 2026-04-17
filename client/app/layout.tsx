// import type { Metadata } from 'next'
// import { Geist, Geist_Mono } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
// import { ThemeProvider } from '@/lib/theme-context'
// import { AuthProvider } from '@/lib/auth-context'
// import { NotesProvider } from '@/lib/notes-context'
// import './globals.css'
// import Providers from './providers'

// const _geist = Geist({ subsets: ["latin"] });
// const _geistMono = Geist_Mono({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: 'NotesApp - Simple Note Taking',
//   description: 'Capture, organize, and access your notes from anywhere.',
//   generator: 'v0.app',
//   icons: {
//     icon: [
//       {
//         url: '/icon-light-32x32.png',
//         media: '(prefers-color-scheme: light)',
//       },
//       {
//         url: '/icon-dark-32x32.png',
//         media: '(prefers-color-scheme: dark)',
//       },
//       {
//         url: '/icon.svg',
//         type: 'image/svg+xml',
//       },
//     ],
//     apple: '/apple-icon.png',
//   },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en" className="bg-background">
//       <body className="font-sans antialiased">
//         <Providers>

//           <ThemeProvider>
//             <AuthProvider>
//               <NotesProvider>
//                 {children}
//               </NotesProvider>
//             </AuthProvider>
//           </ThemeProvider>
//           {process.env.NODE_ENV === 'production' && <Analytics />}
//         </Providers>
//       </body>
//     </html>
//   )
// }



import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Providers from "./providers";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NotesApp - Simple Note Taking',
  description: 'Capture, organize, and access your notes from anywhere.',
  generator: 'v0.app',
  icons: {
    icon: [
      // {
      //   url: '/icon-light-32x32.png',
      //   media: '(prefers-color-scheme: light)',
      // },
      // {
      //   url: '/icon-dark-32x32.png',
      //   media: '(prefers-color-scheme: dark)',
      // },
      {
        url: '/logo.png',
        type: 'image/png',
      },
    ],
    // apple: '/apple-icon.png',
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
          {process.env.NODE_ENV === "production" && <Analytics />}
        </Providers>
      </body>
    </html>
  );
}