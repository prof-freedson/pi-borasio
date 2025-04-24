'use client';

import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="">
      {/* Seção Principal */}
      <section className="bg-green-100   px-6   flex flex-col md:flex-row items-center md:items-start justify-between flex-1"> 
        {/* Conteúdo Principal */}
        <div className="w-full md:w-1/2 flex flex-col text-center md:text-left px-4 md:px-6 z-10">
          <h2 className="text-[#004d2b] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-6xl mb-3 mt-3">
            Corridas baratas,<br /> do seu jeito
          </h2>
          <p className="text-[#4e4e4e] text-lg sm:text-xl md:text-2xl mb-3 mt-3">
            Encontre as melhores opções de transporte <br />
            com praticidade, economia e conforto.
          </p>

          {/* Bloco de Benefícios */}
          <div className="mt-20 flex justify-center"> 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl text-center">


              <div className="flex flex-col items-center bg-yellow-100/50 rounded p-2 border-1 text-green-800">
                <h3 className="text-[#004d2b] font-bold text-2xl mb-2">Preço Justo</h3>
                <p className="text-[#4e4e4e] text-lg">
                  Transparência e economia em cada corrida. Sem surpresas no final.
                </p>
              </div>

              <div className="flex flex-col items-center bg-yellow-100/50 rounded p-2 border-1 text-green-800 ">
                <h3 className="text-[#004d2b] font-bold text-xl lg:text-2xl mb-2 whitespace-nowrap">
                  Segurança
                </h3>
                <p className="text-[#4e4e4e] text-lg">
                  Prioridade para a sua segurança em cada trajeto.
                </p>
              </div>

              <div className="flex flex-col items-center bg-yellow-100/50 rounded p-2 border-1 text-green-800">
                <h3 className="text-[#004d2b] font-bold text-2xl mb-2">Fácil e rápido</h3>
                <p className="text-[#4e4e4e] text-lg">
                  Cadastre-se e tenha corrida disponível sempre que desejar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Imagem de Ilustração */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-end relative">
          <img
            src="/img/boraimg.png"
            alt="Ilustração carro, moto e ônibus"
            className="w-[300px] md:w-[400px] lg:w-[800px] h-auto -mr-6 md:-mr-12 lg:-mr-16"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;