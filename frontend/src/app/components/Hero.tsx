"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Zap,
  X,
  MapPin,
  Users,
  Calendar,
  Wifi,
  Terminal,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

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
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      buttonRef.current?.blur();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const regionalContent = {
    title: "Foco Regional",
    desc: "Nosso aplicativo foi desenvolvido especialmente para atender às necessidades únicas de mobilidade urbana em São Luís e região metropolitana do Maranhão.",
    details: [
      "Rotas otimizadas para a geografia insular da cidade",
      "Cobertura especial para bairros periféricos",
      "Integração com pontos de ônibus e terminais",
      "Atendimento prioritário em áreas de difícil acesso",
    ],
    icon: <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-[#004d2b]" />,
  };

  const efficiencyContent = {
    title: "Eficiência Borasiô",
    desc: "Nosso aplicativo de caronas foi projetado para oferecer a melhor experiência em mobilidade urbana com máxima eficiência.",
    details: [
      "Tempo médio de espera reduzido em 40%",
      "Algoritmos inteligentes de combinação de rotas",
      "Economia de até 35% nos custos de transporte",
      "Motoristas verificados e avaliação em tempo real",
    ],
    icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-[#004d2b]" />,
  };

  const linkItems: BenefitItem[] = [
    {
      title: "transito-inteligente",
      displayTitle: "Trânsito Inteligente",
      desc: "Rotas otimizadas para vias congestionadas como Av. Guajajaras",
      icon: <Terminal className="w-6 h-6 sm:w-8 sm:h-8 text-[#004d2b]" />,
      isLink: true,
    },
    {
      title: "eventos-culturais",
      displayTitle: "Eventos Culturais",
      desc: "Cobertura especial para festas juninas e Bumba-Meu-Boi",
      icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#004d2b]" />,
      isLink: true,
    },
    {
      title: "modo-ilha",
      displayTitle: "Modo Ilha",
      desc: "Conexão entre bairros com rotas inteligentes para a geografia de São Luís",
      icon: <Wifi className="w-6 h-6 sm:w-8 sm:h-8 text-[#004d2b]" />,
      isLink: true,
    },
    {
      title: "corrida-em-grupo",
      displayTitle: "Corrida em Grupo",
      desc: "Compartilhe o carro com pessoas do mesmo bairro e economize",
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#004d2b]" />,
      isLink: true,
    },
  ];

  const menuItems: MenuItem[] = [
    { id: "/", label: "Início" },
    { id: "sobre", label: "Sobre" },
    { id: "contato", label: "Contato" },
    { id: "escolha-usuario?acao=login", label: "Login" },
    { id: "escolha-usuario?acao=cadastro", label: "Cadastrar" },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      closeModal();
    }
  };

  return (
    <section
      id="hero"
      className="bg-green-50 px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative"
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
                    {item.id === "/" ? (
                      <button
                        onClick={closeModal}
                        className="block w-full text-left py-3 px-4 hover:bg-green-50 rounded-lg transition-colors text-gray-800 font-medium"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={`/${item.id}`}
                        className="block w-full text-left py-3 px-4 hover:bg-green-50 rounded-lg transition-colors text-gray-800 font-medium"
                        onClick={closeModal}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center text-center max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#004d2b] mb-4 leading-tight">
          Mobilidade com <br className="hidden sm:block" />
          Jeito Maranhense
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

        {/* Seção Foco Regional */}
        <div className="mt-10 w-full flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            {/* Conteúdo à esquerda */}
            <div className="flex-1 bg-gradient-to-r from-green-600 to-green-800 rounded-lg overflow-hidden shadow-xl p-6 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  {regionalContent.icon}
                  <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400">
                    {regionalContent.title}
                  </h3>
                </div>
                <p className="text-white mb-4 sm:mb-6 text-base sm:text-lg">
                  {regionalContent.desc}
                </p>
                <ul className="space-y-2 sm:space-y-3 text-amber-50 text-sm sm:text-base">
                  {regionalContent.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-300 text-xl">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Imagem à direita */}
            <div className="flex-1 flex justify-center items-center">
              <div className="rounded-xl overflow-hidden aspect-[16/9] border border-white/10 w-full max-w-md">
                <img
                  src="img/carro.png"
                  alt="Mobilidade urbana em São Luís"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Seção Eficiência Borasiô */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-8">
            {/* Conteúdo à direita */}
            <div className="flex-1 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-lg overflow-hidden shadow-xl p-6 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  {efficiencyContent.icon}
                  <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400">
                    {efficiencyContent.title}
                  </h3>
                </div>
                <p className="mb-4 sm:mb-6 text-base sm:text-lg">
                  {efficiencyContent.desc}
                </p>
                <ul className="space-y-2 sm:space-y-3 text-amber-50 text-sm sm:text-base">
                  {efficiencyContent.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-300 text-xl">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Imagem à esquerda */}
            <div className="flex-1 flex justify-center items-center">
              <div className="rounded-xl overflow-hidden aspect-[4/3] border border-white/10 w-full max-w-md">
                <img
                  src="img/mobilidade-app.png"
                  alt="Aplicativo Borasio eficiente"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Funcionalidades */}
        <h3 className="text-2xl sm:text-3xl font-bold text-[#004d2b] mb-6 text-center">
          Funcionalidades Inovadoras
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {linkItems.map((item, index) => (
            <a
              key={index}
              href={`/${item.title}`}
              className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow hover:shadow-lg transition duration-300 group hover:scale-105"
            >
              <div className="mb-4 text-[#004d2b] group-hover:text-[#002d1a] transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#004d2b] mb-2 group-hover:text-[#003823] transition-colors">
                {item.displayTitle || item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
