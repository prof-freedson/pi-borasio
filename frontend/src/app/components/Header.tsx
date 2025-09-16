'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <header className="bg-[#004d2b] text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Home Bora Siô" onClick={closeMenu} className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo Bora Siô"
            width={120}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link href="/" className="hover:text-yellow-400 transition-colors">Início</Link>
          <Link href="/sobre" className="hover:text-yellow-400 transition-colors">Sobre</Link>
          <Link href="/contato" className="hover:text-yellow-400 transition-colors">Contato</Link>
        </nav>

        {/* Auth Buttons Desktop */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/escolha-usuario?acao=login"
            className="bg-white text-[#004d2b] font-semibold py-2 px-6 rounded hover:bg-yellow-400 transition"
          >
            Login
          </Link>
          <Link
            href="/escolha-usuario?acao=cadastro"
            className="bg-white text-[#004d2b] font-semibold py-2 px-6 rounded hover:bg-yellow-400 transition"
          >
            Cadastre-se
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          className="md:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        >
          <div
            ref={menuRef}
            className="bg-white w-3/4 max-w-sm ml-auto h-full shadow-xl p-6 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-gray-800 hover:text-[#004d2b] text-lg font-medium"
              >
                Início
              </Link>
              <Link
                href="/sobre"
                onClick={closeMenu}
                className="text-gray-800 hover:text-[#004d2b] text-lg font-medium"
              >
                Sobre
              </Link>
              <Link
                href="/contato"
                onClick={closeMenu}
                className="text-gray-800 hover:text-[#004d2b] text-lg font-medium"
              >
                Contato
              </Link>

              <div className="flex space-x-4 mt-8">
                <Link
                  href="/escolha-usuario?acao=login"
                  onClick={closeMenu}
                  className="flex-1 bg-[#004d2b] text-white py-2 rounded text-center font-semibold hover:bg-yellow-400 hover:text-[#004d2b] transition"
                >
                  Login
                </Link>
                <Link
                  href="/escolha-usuario?acao=cadastro"
                  onClick={closeMenu}
                  className="flex-1 bg-[#004d2b] text-white py-2 rounded text-center font-semibold hover:bg-yellow-400 hover:text-[#004d2b] transition"
                >
                  Cadastre-se
                </Link>
                <Link
                  href="/recuperar-senha"
                  onClick={closeMenu}
                  className="flex-1 bg-[#004d2b] text-white py-2 rounded text-center font-semibold hover:bg-yellow-400 hover:text-[#004d2b] transition"
                >
                  Esqueci minha senha
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
