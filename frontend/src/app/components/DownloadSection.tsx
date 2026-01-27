"use client";

import React from "react";
import { Download, Smartphone, ShieldCheck, Zap } from "lucide-react";

const DownloadSection = () => {
  const handleDownload = () => {
    // Simulando o download do APK
    const link = document.createElement("a");
    link.href = "/borasio.apk"; // Nome fictício do arquivo
    link.download = "borasio.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="download" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#004d2b] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center">
          {/* Texto e Conteúdo */}
          <div className="flex-1 p-8 sm:p-12 lg:p-16 text-white text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Leve o <span className="text-yellow-400">BoraSiô!</span> sempre com você
            </h2>
            <p className="text-lg text-green-50 mb-8 opacity-90 text-justify">
              O BoraSiô! é o seu novo parceiro de mobilidade urbana em São Luís. 
              Criado para brasileiros, por brasileiros, oferecemos caronas seguras, 
              preços justos e uma experiência pensada para a nossa gente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-white/10 p-3 rounded-xl mb-3">
                  <ShieldCheck className="w-6 h-6 text-yellow-400" />
                </div>
                <h4 className="font-semibold text-sm">Segurança Total</h4>
                <p className="text-xs text-green-100/70">Motoristas verificados</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-white/10 p-3 rounded-xl mb-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <h4 className="font-semibold text-sm">Rapidez</h4>
                <p className="text-xs text-green-100/70">Chegue rápido ao destino</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-white/10 p-3 rounded-xl mb-3">
                  <Smartphone className="w-6 h-6 text-yellow-400" />
                </div>
                <h4 className="font-semibold text-sm">Fácil de Usar</h4>
                <p className="text-xs text-green-100/70">Interface intuitiva</p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="group bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              <span>Baixar APK Agora</span>
            </button>
          </div>

          {/* Imagem / Visual */}
          <div className="flex-1 relative w-full h-[400px] lg:h-[600px] flex items-center justify-center p-8 bg-green-900/20">
            <div className="relative">
                {/* Círculos de fundo para efeito visual */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl"></div>
                
                {/* Mockup de Celular Simples */}
                <div className="relative w-64 h-[500px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-10"></div>
                    <img 
                      src="/img/mobilidade-app.png" 
                      alt="App Screenshot" 
                      className="w-full h-full object-cover"
                    />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
