import React, { ReactNode } from 'react';
import Hero from './components/Hero';

interface HomeProps {
  children: ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <main className="flex-grow w-full">
      <Hero />
      {children} 
    </main>
  );
};

export default Home;