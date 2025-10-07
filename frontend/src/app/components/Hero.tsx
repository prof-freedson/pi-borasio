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
  ChevronLeft,
  ChevronRight,
  CheckCircle,
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
  
  // Estados para o carrossel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 6 imagens do carrossel
  const carouselImages = [
    "/carousel-1.png",
    "/carousel-2.png",
    "/carousel-3.png",
    "/carousel-4.png",
    "/carousel-5.png",
    "/carousel-6.png" // Nova imagem adicionada
  ];

  // Efeito para o carrossel automático
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselImages.length]);

  // Navegação do carrossel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

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
    icon: <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />,
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
    icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />,
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
      className="relative bg-green-100"
    >
      {/* Carrossel de Imagens de Fundo */}
      <div className="relative h-96 sm:h-[500px] lg:h-[600px] overflow-hidden">
        {/* Slides */}
        <div className="relative w-full h-full">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Carrossel ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay escuro para melhor contraste do texto */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Conteúdo sobreposto no carrossel */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Mobilidade com <br className="hidden sm:block" />
            Jeito Maranhense
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl">
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
        </div>

        {/* Controles do carrossel */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-300"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-300"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicadores - agora com 6 pontos */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal (mantido igual) */}
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

      {/* Conteúdo principal (mantido igual) */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Título da Seção */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#004d2b] mb-4">
              Uma Solução Pensada Para a Região Metropolitana de São Luís
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubra como o Borasiô transforma a mobilidade urbana na Ilha do Amor com tecnologia, eficiência e um toque local.
            </p>
          </div>

          {/* Seção Foco Regional */}
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              {/* Conteúdo à esquerda */}
              <div className="flex-1 bg-gradient-to-br from-green-600 to-green-800 rounded-xl shadow-xl p-8 sm:p-10 text-white">
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  {regionalContent.icon}
                  <h3 className="text-2xl sm:text-3xl font-bold text-yellow-300">
                    {regionalContent.title}
                  </h3>
                </div>
                <p className="text-gray-200 mb-6 sm:mb-8 text-base sm:text-lg">
                  {regionalContent.desc}
                </p>
                <ul className="space-y-3 text-gray-100 text-sm sm:text-base">
                  {regionalContent.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Imagem à direita */}
              <div className="flex-1 w-full max-w-lg"><img src="/img/carro.png" alt="Mobilidade urbana em São Luís" className="rounded-xl w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" /></div>
            </div>

            {/* Seção Eficiência Borasiô */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-8">
              {/* Conteúdo à direita */}
              <div className="flex-1 bg-gradient-to-tl from-green-600 to-green-800 rounded-xl shadow-xl p-8 sm:p-10 text-white">
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  {efficiencyContent.icon}
                  <h3 className="text-2xl sm:text-3xl font-bold text-yellow-300">
                    {efficiencyContent.title}
                  </h3>
                </div>
                <p className="text-gray-200 mb-6 sm:mb-8 text-base sm:text-lg">
                  {efficiencyContent.desc}
                </p>
                <ul className="space-y-3 text-gray-100 text-sm sm:text-base">
                  {efficiencyContent.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Imagem à esquerda */}
              <div className="flex-1 w-full max-w-lg"><img src="/img/mobilidade-app.png" alt="Aplicativo Borasio eficiente" className="rounded-xl w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" /></div>
            </div>
          </div>

          {/* Seção de Funcionalidades */}
          <div className="mt-12 md:mt-16 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-[#004d2b] mb-12">
              Funcionalidades Inovadoras
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {linkItems.map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.title}`}
                  className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
                >
                  <div className="bg-green-100 p-4 rounded-full mb-5 transition-colors duration-300 group-hover:bg-green-200">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[#004d2b] mb-2">
                    {item.displayTitle || item.title}
                  </h4>
                  <p className="text-sm text-gray-600 flex-grow">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;