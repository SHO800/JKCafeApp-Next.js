import type { Metadata } from 'next'

import Header from "./components/header/header"
import './globals.css'
import './reset.css'
import './animation.css'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '2J - Café',
  description: 'JK(J系高専生)手作りのパンケーキ屋さんです！',
}

export default function RootLayout({children,}: {  children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <title>2J - Café</title>
        <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
