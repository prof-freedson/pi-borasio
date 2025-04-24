'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRightOnRectangleIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
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

  // Handle click outside and escape key
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
      document.body.style.overflow = 'hidden'; // Disable scrolling when menu is open
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.style.overflow = ''; // Enable scrolling when menu is closed
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen, closeMenu]);

  const handleLogout = useCallback(() => {
    console.log('Logout realizado');
    // Implement your logout logic here
  }, []);

  const navLinks: NavLink[] = [
    { href: '/', label: 'Início' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
  ];

  const authLinks: NavLink[] = [
    { 
      href: '/escolha-usuario?acao=login', 
      label: 'Login',
      className: 'bg-yellow-300 text-[#004d2b] hover:bg-yellow-400'
    },
    { 
      href: '/escolha-usuario?acao=cadastro', 
      label: 'Cadastre-se',
      className: 'bg-white text-[#004d2b] hover:bg-gray-100'
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
            >
              {link.label}
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="group relative p-2 text-yellow-300 hover:text-red-400 transition-colors"
            aria-label="Sair"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Sair
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 focus:outline-none"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`block text-gray-800 hover:text-[#004d2b] text-lg font-medium py-2 ${link.className ? link.className.replace('px-4 py-2', 'px-3 py-2') : ''}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Logout Button in Mobile */}
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="w-full text-left text-gray-800 hover:text-red-500 text-lg font-medium py-2 flex items-center"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                Sair
              </button>
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
