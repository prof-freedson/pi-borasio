import './globals.css';
import { Poppins } from 'next/font/google';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ChatFlutuante from '@/app/components/ChatFlutuante';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-poppins' });

export const metadata = {
  title: 'BoraSiô!',
  description: 'Corridas baratas, do seu jeito!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="flex flex-col h-screen bg-green-100 overflow-hidden">
        <Header />
        <main className="flex-grow overflow-hidden">
          {children}
        </main>

        <ChatFlutuante />
        <Footer />
      </body>
    </html>
  );
}