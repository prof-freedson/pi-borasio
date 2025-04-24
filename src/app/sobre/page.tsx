'use client';

import { FaCarSide, FaRegLightbulb, FaRegHandshake } from 'react-icons/fa';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-green-100 flex justify-center items-start px-4"> {/* Alinha ao topo */}
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-2xl px-8 py-16 space-y-16 mt-20 mx-auto">
        
        {/* Título e Introdução */}
        <div className="text-justify">
          <h1 className="text-4xl font-bold text-green-900 sm:text-5xl">Sobre o BoraSiô</h1>
          <p className="text-[#4e4e4e] text-lg sm:text-xl mt-4">
            O BoraSiô oferece uma plataforma conveniente e acessível para conectar passageiros a motoristas.
            Nosso objetivo é facilitar a mobilidade urbana com uma solução prática e transparente. 
            Escolher a gente é garantir a experiência de uma viagem confortável, com um preço justo 
            e com motoristas comprometidos em oferecer o melhor serviço.
          </p>
        </div>

        {/* Missão, Visão e Valores */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 md:space-x-8 mt-16">
          {/* Missão */}
          <div className="flex flex-col items-center text-center md:text-left space-y-4">
            <FaRegLightbulb className="text-green-800 text-6xl transition-transform transform hover:scale-110" />
            <h3 className="text-xl font-semibold text-green-800 sm:text-2xl">Nossa Missão</h3>
            <p className="text-gray-600 text-center text-base sm:text-lg">
              Tornar o transporte urbano mais acessível e econômico para todos. Oferecemos
              corridas rápidas, seguras e com o melhor custo-benefício.
            </p>
          </div>

          {/* Visão */}
          <div className="flex flex-col items-center text-center md:text-left space-y-4">
            <FaCarSide className="text-green-800 text-6xl transition-transform transform hover:scale-110" />
            <h3 className="text-xl font-semibold text-green-800 sm:text-2xl">Nossa Visão</h3>
            <p className="text-gray-600 text-center text-base sm:text-lg">
              Ser a principal opção de transporte para quem busca economia, conforto e confiança.
              Estamos sempre em busca de melhorias e inovações para tornar cada viagem mais agradável.
            </p>
          </div>

          {/* Valores */}
          <div className="flex flex-col items-center text-center md:text-left space-y-4">
            <FaRegHandshake className="text-green-800 text-6xl transition-transform transform hover:scale-110" />
            <h3 className="text-xl font-semibold text-green-800 sm:text-2xl">Nossos Valores</h3>
            <p className="text-gray-600 text-center text-base sm:text-lg">
              Valorizamos a transparência, a honestidade e o respeito pelo cliente. Cada corrida é tratada
              com o máximo cuidado e comprometimento.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
