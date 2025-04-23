import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#004d2b] text-white flex items-center justify-between px-6 py-4">
      <div className="flex items-center flex-shrink-0">
        <Link href="/">
          <img
            src="/logo.png"
            alt="logo borasiô"
            className="h-10 w-auto" 
          />
        </Link>
      </div>

      <nav className="hidden md:flex space-x-6 font-roboto text-base md:text-lg flex-grow justify-end mr-6"> 
        <Link href="/"><span className="hover:underline cursor-pointer">Início</span></Link>
        <Link href="/corridas"><span className="hover:underline cursor-pointer">Corridas</span></Link>
        <Link href="/sobre"><span className="hover:underline cursor-pointer">Sobre</span></Link>
        <Link href="/contato"><span className="hover:underline cursor-pointer">Contato</span></Link>
      </nav>

      <div className="flex items-center space-x-4"> 
        <Link href="/escolha-usuario?acao=login">
          <button className="bg-yellow-300 text-[#004d2b] font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition">
            Login
          </button>
        </Link>

        <Link href="/escolha-usuario?acao=cadastro">
          <button className="bg-yellow-300 text-[#004d2b] font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition">
            Cadastre-se
          </button>
        </Link>
        <div className="md:hidden text-2xl cursor-pointer">
          ☰
        </div>
      </div>
    </header>
  );
};

export default Header;