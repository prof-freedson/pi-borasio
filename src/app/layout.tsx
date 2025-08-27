import './globals.css';
import { Poppins } from 'next/font/google';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ChatFlutuante from '@/app/components/ChatFlutuante';
import Acessibilidade from '@/app/components/Acessibilidade';


const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700'], 
  variable: '--font-poppins' 
});

export const metadata = {
  title: 'BoraSiô!',
  description: 'Corridas baratas, do seu jeito!',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="flex flex-col min-h-screen bg-green-100">
        <Header />
        <main className="flex-grow w-full">
          {children}
        </main>
        <ChatFlutuante />
        <Acessibilidade />
        <Footer />
      </body>
    </html>
  );
}