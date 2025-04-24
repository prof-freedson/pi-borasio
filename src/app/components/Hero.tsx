'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Tag,
  ShieldCheck,
  Zap,
  X
} from 'lucide-react';

type BenefitItem = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

type MenuItem = {
  id: string;
  label: string;
};

const Hero = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      buttonRef.current?.blur();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const beneficios: BenefitItem[] = [
    {
      title: 'Preço Justo',
      desc: 'Transparência e economia em cada corrida. Sem surpresas no final.',
      icon: <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-[#004d2b]" />,
    },
    {
      title: 'Segurança',
      desc: 'Prioridade para a sua segurança em cada trajeto.',
      icon: <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#004d2b]" />,
    },
    {
      title: 'Fácil e rápido',
      desc: 'Cadastre-se e tenha corrida disponível sempre que desejar.',
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#004d2b]" />,
    },
  ];

  const menuItems: MenuItem[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'contatos', label: 'Contatos' },
    { id: 'login', label: 'Login' },
    { id: 'cadastrar', label: 'Cadastrar' },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      closeModal();
    }
  };

  return (
    <section
      id="hero"
      className="bg-green-100 px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative"
    >
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#004d2b] mb-1">
                Por onde quer começar?
              </h3>
              <p className="text-sm text-gray-600">
                Escolha uma seção para navegar na página
              </p>
            </div>

            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left py-3 px-4 hover:bg-green-50 rounded-lg transition-colors text-gray-800 font-medium"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 lg:gap-12">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#004d2b] mb-4 leading-tight">
            Corridas baratas,<br className="hidden sm:block" /> do seu jeito
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg">
            Encontre as melhores opções de transporte com praticidade, economia e conforto.
          </p>

          <button
            ref={buttonRef}
            onClick={openModal}
            className="bg-[#004d2b] hover:bg-[#003823] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-[#004d2b] focus:outline-none flex items-center gap-2"
            aria-label="Abrir menu de navegação"
          >
            <Zap className="w-5 h-5" />
            Ver seções
          </button>

          <div className="mt-12 w-full max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {beneficios.map((item, index) => (
                <div
                  key={index}
                  className="bg-yellow-50/80 border border-green-200 rounded-lg p-4 sm:p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                >
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#004d2b] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-end">
          <img
            src="/img/boraimg.png"
            alt="Ilustração de opções de transporte: carro, moto e ônibus"
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
            loading="lazy"
            width={600}
            height={400}
          />
        </div>
        











      </div>
    </section>
  );
};

export default Hero;
