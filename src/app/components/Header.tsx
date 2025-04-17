import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-[#004d2b] text-white flex items-center justify-between px-6 py-4">
      
      {/* Logo à esquerda */}
      <div className="flex items-center flex-shrink-0">
        <Link href="/">
          <img
            src="/logo.png"
            alt="logo borasiô"
            className="h-10 w-auto" // altura reduzida para 48px
          />
        </Link>
      </div>

      {/* Navegação principal (visível em telas médias ou maiores) */}
      <nav className="hidden md:flex space-x-6 font-roboto text-base md:text-lg flex-grow justify-end mr-6"> {/* Adicionada margem à direita */}
        <Link href="/"><span className="hover:underline cursor-pointer">Início</span></Link>
        <Link href="/corridas"><span className="hover:underline cursor-pointer">Corridas</span></Link>
        <Link href="#"><span className="hover:underline cursor-pointer">Sobre</span></Link>
        <Link href="#"><span className="hover:underline cursor-pointer">Contato</span></Link>
      </nav>

      {/* Botões de autenticação */}
      <div className="flex items-center space-x-4"> {/* Reduzi o valor de space-x de 8 para 4 */}
        <Link href="/login">
          <button className="bg-yellow-300 text-[#004d2b] font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition">
            Login
          </button>
        </Link>

        <Link href="/cadastro">
          <button className="bg-yellow-300 text-[#004d2b] font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition">
            Cadastre-se
          </button>
        </Link>

        {/* Menu mobile (visível apenas em telas pequenas) */}
        <div className="md:hidden text-2xl cursor-pointer">
          ☰
        </div>
      </div>
    </header>
  );
};

export default Header;