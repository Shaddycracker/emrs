import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { EdgeStoreProvider } from '@/lib/edgestore';
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: 'EMRS Bahraich',
  description: 'Official website of EMRS Bahraich school',
  openGraph: {
    title: 'EMRS Bahraich',
    description: 'Official website of EMRS Bahraich school',
    url: 'https://www.emrsbahraich.in',
    siteName: 'EMRS Bahraich',
    images: [
      {
        url: 'https://www.emrsbahraich.in/og-image.jpg', // <-- create an image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
