import './globals.css'
import { Poppins } from 'next/font/google'
import Footer from "./components/Footer";


const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-poppins' })

export const metadata = {
  title: 'BoraSiô!',
  description: 'Corridas baratas, do seu jeito!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}