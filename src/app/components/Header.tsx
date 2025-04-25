'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface NavLink {
  href: string;
  label: string;
  className?: string;
}

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
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = ''; 
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen, closeMenu]);

  const navLinks: NavLink[] = [
    { href: '/', label: 'Início' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
  ];

  const authLinks: NavLink[] = [
    { 
      href: '/escolha-usuario?acao=login', 
      label: 'Login',
      className: 'bg-white text-[#004d2b] hover:bg-yellow-400'
    },
    { 
      href: '/escolha-usuario?acao=cadastro', 
      label: 'Cadastre-se',
      className: 'bg-white text-[#004d2b] hover:bg-yellow-400'
    },
  ];

  return (
    <header className="bg-[#004d2b] text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Home" onClick={closeMenu}>
          <Image
            src="/logo.png"
            alt="Logo Borasiô"
            className="h-10 w-auto"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium"
              onClick={closeMenu} // Fecha o menu ao clicar
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {authLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${link.className}`}
              onClick={closeMenu} // Fecha o menu ao clicar
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 focus:outline-none"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen ? 'true' : 'false'}
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={menuRef}
            className="bg-white h-full w-3/4 max-w-sm ml-auto shadow-xl transform transition-all ease-in-out duration-300 animate-slide-in"
          >
            <div className="p-4 flex justify-end">
              <button
                onClick={closeMenu}
                className="text-gray-500 hover:text-gray-700 p-2"
                aria-label="Fechar menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <nav className="px-6 py-4 space-y-6">
              {/* Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-gray-800 hover:text-[#004d2b] text-lg font-medium py-2 ${link.className ? link.className.replace('px-4 py-2', 'px-3 py-2') : ''}`}
                  onClick={closeMenu} // Fecha o menu ao clicar
                >
                  {link.label}
                </Link>
              ))}

              {/* Auth Links in Row */}
              <div className="flex space-x-4 mt-4">
                {authLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${link.className}`}
                    onClick={closeMenu} // Fecha o menu ao clicar
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;