import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

const Home: React.FC = () => {
  return (
    <main className="bg-[#eaf5e0] min-h-screen font-sans flex flex-col justify-between">
      <div>
        <Hero />
      </div>
    </main>
  );
};

export default Home;