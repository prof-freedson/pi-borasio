import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-[#DAF3D7] w-full min-h-[80vh] px-6 py-12 flex flex-col md:flex-row items-center md:items-start justify-between overflow-hidden">
      
      {/* Texto + Benefícios à Esquerda */}
      <div className="w-full md:w-1/2 flex flex-col text-center md:text-left px-4 md:px-6 z-10">
        <h2 className="text-[#004d2b] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-6xl mb-8 mt-12">
          Corridas baratas,<br /> do seu jeito
        </h2>
        <p className="text-[#4e4e4e] text-lg sm:text-xl md:text-2xl mb-8 mt-2">
          Encontre as melhores opções de transporte <br />
          com praticidade, economia e conforto.
        </p>   

        {/* Benefícios Centralizados */}
        <div className="mt-14 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl text-center">
            <div className="flex flex-col items-center">
              <h3 className="text-[#004d2b] font-bold text-2xl mb-2">Preço Justo</h3>
              <p className="text-[#4e4e4e] text-base">
                Transparência e economia em cada corrida. Sem surpresas no final.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-[#004d2b] font-bold text-xl lg:text-2xl mb-2 whitespace-nowrap">
                Segurança
              </h3>
              <p className="text-[#4e4e4e] text-base">
              Prioridade para a sua segurança em cada trajeto.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-[#004d2b] font-bold text-2xl mb-2">Fácil e rápido</h3>
              <p className="text-[#4e4e4e] text-base">
              Cadastre-se e tenha corrida disponível sempre que desejar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Imagem à Direita */}
      <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-end relative">
        <img
          src="/img/boraimg.png"
          alt="Ilustração carro, moto e ônibus"
          className="w-[600px] md:w-[700px] lg:w-[850px] h-auto -mr-6 md:-mr-12 lg:-mr-16"
        />
      </div>
    </section>
  );
};

export default Hero;