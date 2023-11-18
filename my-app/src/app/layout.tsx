import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spreadsheet :)',
  description: 'Spreadsheet in Cloads using NEXT and SUPABASE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className='min-h-full flex flex-col items-center mt-6 md:mt-12 lg:mt-32'>
        {children}
      </body>
    </html>
  )
}
