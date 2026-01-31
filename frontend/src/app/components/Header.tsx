'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { XMarkIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState<'passageiro' | 'motorista' | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    // Ler dados do usuário logado
    try {
      const storedLoggedIn = localStorage.getItem('isLoggedIn');
      const storedEmail = localStorage.getItem('userEmail');
      const storedUserType = localStorage.getItem('userType');
      
      setIsLoggedIn(storedLoggedIn === 'true');
      setUserEmail(storedEmail || '');
      setUserType(storedUserType as 'passageiro' | 'motorista' | null);
    } catch (e) {
      // ignore
    }

    // Escutar mudanças de autenticação
    const handleAuthChanged = (ev: Event) => {
      try {
        const custom = ev as CustomEvent;
        if (custom && custom.detail) {
          setIsLoggedIn(Boolean(custom.detail.loggedIn));
          setUserEmail(custom.detail.email || '');
          setUserType(custom.detail.userType || null);
        } else {
          // Fallback
          setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
          setUserEmail(localStorage.getItem('userEmail') || '');
          setUserType(localStorage.getItem('userType') as 'passageiro' | 'motorista' | null);
        }
      } catch (e) {
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
        setUserEmail(localStorage.getItem('userEmail') || '');
        setUserType(localStorage.getItem('userType') as 'passageiro' | 'motorista' | null);
      }
    };

    window.addEventListener('authChanged', handleAuthChanged as EventListener);

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
      window.removeEventListener('authChanged', handleAuthChanged as EventListener);
    };
  }, [isMenuOpen, closeMenu]);

  const handleLogout = useCallback(() => {
    try {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userType');
    } catch (e) {
      // ignore
    }
    // Notificar outros listeners e redirecionar
    try { 
      window.dispatchEvent(new CustomEvent('authChanged', { 
        detail: { loggedIn: false, email: '', userType: null } 
      })); 
    } catch (e) {}
    window.location.href = '/';
  }, []);

  const getUserDisplayName = () => {
    if (userEmail) {
      return userEmail.split('@')[0]; // Retorna a parte antes do @
    }
    return 'Usuário';
  };

  const getUserProfileLink = () => {
    return userType === 'motorista' ? '/motorista' : '/usuario';
  };

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
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Informações do usuário logado */}
              <Link 
                href={getUserProfileLink()}
                className="flex items-center space-x-2 bg-green-700 hover:bg-green-600 py-2 px-4 rounded transition-colors"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span className="font-medium">
                  {getUserDisplayName()}
                  {userType && (
                    <span className="text-yellow-300 text-xs block capitalize">
                      {userType}
                    </span>
                  )}
                </span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="bg-white text-[#004d2b] font-semibold py-2 px-4 rounded hover:bg-yellow-400 transition"
              >
                Sair
              </button>
            </div>
          )}
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

              {/* Seção do usuário logado no mobile */}
              {isLoggedIn && (
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-3 mb-4 p-3 bg-green-50 rounded-lg">
                    <UserCircleIcon className="h-8 w-8 text-green-700" />
                    <div>
                      <p className="font-medium text-gray-800">{getUserDisplayName()}</p>
                      {userType && (
                        <p className="text-sm text-green-600 capitalize">{userType}</p>
                      )}
                    </div>
                  </div>
                  <Link
                    href={getUserProfileLink()}
                    onClick={closeMenu}
                    className="block text-center bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
                  >
                    Meu Perfil
                  </Link>
                </div>
              )}

              <div className="flex space-x-4 mt-8">
                {!isLoggedIn ? (
                  <>
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
                  </>
                ) : (
                  <button
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                    className="flex-1 bg-red-600 text-white py-2 rounded text-center font-semibold hover:bg-red-700 transition"
                  >
                    Sair
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;