import React from 'react';
import DownloadSection from '../components/DownloadSection';

export const metadata = {
  title: 'Download - BoraSiô!',
  description: 'Baixe agora o aplicativo oficial do BoraSiô! e transforme sua mobilidade em São Luís.',
};

export default function DownloadPage() {
  return (
    <div className="pt-20 lg:pt-32 min-h-screen bg-green-50">
      <div className="container mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#004d2b] mb-6">
          Pronto para <span className="text-green-600">Bora Siô?</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          A revolução da mobilidade maranhense está a um clique de distância. 
          Baixe o APK e comece a economizar hoje mesmo.
        </p>
      </div>
      
      {/* Reutilizando a seção de download que criamos */}
      <div className="pb-20">
        <DownloadSection />
      </div>

      {/* Seção extra de ajuda rápida para instalação de APK */}
      <section className="bg-white py-20 border-t border-green-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#004d2b] mb-10 text-center">Como instalar o APK</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-100 transition-transform hover:-translate-y-2">
              <div className="bg-[#004d2b] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h3 className="font-bold mb-2 text-[#004d2b]">Baixe o Arquivo</h3>
              <p className="text-sm text-gray-600">Clique no botão de download acima para salvar o arquivo .apk em seu celular.</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-100 transition-transform hover:-translate-y-2">
              <div className="bg-[#004d2b] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h3 className="font-bold mb-2 text-[#004d2b]">Autorize Fontes</h3>
              <p className="text-sm text-gray-600">Vá em Configurações &gt; Segurança e ative "Instalar apps de fontes desconhecidas".</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-100 transition-transform hover:-translate-y-2">
              <div className="bg-[#004d2b] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h3 className="font-bold mb-2 text-[#004d2b]">Abra e Instale</h3>
              <p className="text-sm text-gray-600">Localize o arquivo baixado nas notificações ou no gerenciador de arquivos e clique para instalar.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
