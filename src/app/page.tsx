import React from 'react';
import Hero from './components/Hero';


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