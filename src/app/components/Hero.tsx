'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Zap,
  X,
  MapPin,
  Users,
  Calendar,
  Wifi,
  Terminal,
  TrendingUp,
} from 'lucide-react';

type BenefitItem = {
  title: string;
  displayTitle?: string;
  desc: string;
  icon: React.ReactNode;
  isLink?: boolean;
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

  const regionalContent = {
    title: 'Foco Regional',
    desc: 'Nosso aplicativo foi desenvolvido especialmente para atender às necessidades únicas de mobilidade urbana em São Luís e região metropolitana do Maranhão.',
    details: [
      'Rotas otimizadas para a geografia insular da cidade',
      'Cobertura especial para bairros periféricos',
      'Integração com pontos de ônibus e terminais',
      'Atendimento prioritário em áreas de difícil acesso'
    ],
    icon: <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-[#004d2b]" />
  };

  const efficiencyContent = {
    title: 'Eficiência Borasio',
    desc: 'Nosso aplicativo de caronas foi projetado para oferecer a melhor experiência em mobilidade urbana com máxima eficiência.',
    details: [
      'Tempo médio de espera reduzido em 40%',
      'Algoritmos inteligentes de combinação de rotas',
      'Economia de até 35% nos custos de transporte',
      'Motoristas verificados e avaliação em tempo real'
    ],
    icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-[#004d2b]" />
  };

  const linkItems: BenefitItem[] = [
    {
      title: 'transito-inteligente',
      displayTitle: 'Trânsito Inteligente',
      desc: 'Rotas otimizadas para vias congestionadas como Av. Guajajaras',
      icon: <Terminal className="w-6 h-6 sm:w-8 sm:h-8 text-[#004d2b]" />,
      isLink: true
    },
    {
      title: 'eventos-culturais',
      displayTitle: 'Eventos Culturais',
      desc: 'Cobertura especial para festas juninas e Bumba-Meu-Boi',
      icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#004d2b]" />,
      isLink: true
    },
    {
      title: 'modo-ilha',
      displayTitle: 'Modo Ilha',
      desc: 'Conexão entre bairros com rotas inteligentes para a geografia de São Luís',
      icon: <Wifi className="w-6 h-6 sm:w-8 sm:h-8 text-[#004d2b]" />,
      isLink: true
    },
    {
      title: 'corrida-em-grupo',
      displayTitle: 'Corrida em Grupo',
      desc: 'Compartilhe o carro com pessoas do mesmo bairro e economize',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#004d2b]" />,
      isLink: true
    }
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
      className="bg-green-50 px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative"
    >
      {/* Modal */}
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

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#004d2b] mb-4 leading-tight">
          Mobilidade com <br className="hidden sm:block" />Jeito Maranhense
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
          Um app de carona mais humano, mais seguro e mais local.
        </p>

        <button
          ref={buttonRef}
          onClick={openModal}
          className="bg-[#004d2b] hover:bg-[#003823] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-[#004d2b] focus:outline-none flex items-center gap-2"
          aria-label="Abrir menu de navegação"
        >
          <Zap className="w-5 h-5" />
          Saiba mais
        </button>

        {/* Grid de Boxes maiores */}
        <div className="mt-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            {/* Box Foco Regional */}
            <div className="bg-white border border-green-200 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="p-10">
                <div className="flex items-center gap-5 mb-6">
                  {regionalContent.icon}
                  <h3 className="text-3xl font-bold text-[#004d2b]">
                    {regionalContent.title}
                  </h3>
                </div>
                <p className="text-gray-700 mb-6 text-lg">{regionalContent.desc}</p>
                <ul className="space-y-3 text-base text-gray-600">
                  {regionalContent.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#004d2b] text-xl">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full h-72 overflow-hidden">
                <img
                  src="https://i0.wp.com/www.grupoberimbau.com.br/wp-content/uploads/2016/01/www.grupoberimbau.com.br_carro-x-moto-qual-o-melhor_untitled-1.jpg"
                  alt="Mobilidade urbana em São Luís"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Box Eficiência Borasio */}
            <div className="bg-white border border-green-200 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="p-10">
                <div className="flex items-center gap-5 mb-6">
                  {efficiencyContent.icon}
                  <h3 className="text-3xl font-bold text-[#004d2b]">
                    {efficiencyContent.title}
                  </h3>
                </div>
                <p className="text-gray-700 mb-6 text-lg">{efficiencyContent.desc}</p>
                <ul className="space-y-3 text-base text-gray-600">
                  {efficiencyContent.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#004d2b] text-xl">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full h-64 overflow-hidden"> {/* imagem menor */}
                <img
                  src="https://www.menosfios.com/wp-content/uploads/2023/12/Mobilidade_Angola_MenosFios.jpeg"
                  alt="Aplicativo Borasio eficiente"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Seção de Links */}
          <h3 className="text-2xl sm:text-3xl font-bold text-[#004d2b] mb-6 text-center">
            Funcionalidades Inovadoras
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {linkItems.map((item, index) => (
              <a
                key={index}
                href={`/${item.title}`}
                className="bg-white border border-green-200 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#004d2b] mb-2 group-hover:text-[#003823] transition-colors">
                  {item.displayTitle || item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {item.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
