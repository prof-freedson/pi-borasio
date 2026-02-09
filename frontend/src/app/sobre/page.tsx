'use client';

import { FaCarSide, FaRegLightbulb, FaRegHandshake, FaUsers, FaChartLine, FaMapMarkedAlt, FaCheckCircle, FaStar } from 'react-icons/fa';
import { MdSafetyDivider, MdPayment, MdSupportAgent, MdDirectionsCar, MdGraphicEq } from 'react-icons/md';
import { IoIosRocket } from 'react-icons/io';
import { Zap, Shield, Users, MapPin, ChevronRight, Star } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

export default function SobrePage() {
  const stats = [
    { value: "50.000+", label: "Caronas Realizadas", icon: <FaCarSide className="text-4xl text-yellow-400" /> },
    { value: "15.000+", label: "Usuários Ativos", icon: <FaUsers className="text-4xl text-yellow-400" /> },
    { value: "4.9/5", label: "Avaliação Média", icon: <FaStar className="text-4xl text-yellow-400" /> }
  ];

  const values = [
    {
      title: "Identidade Local",
      desc: "Entendemos o sotaque, os caminhos e o jeito de ser do maranhense. Não somos apenas um app, somos parte da Ilha.",
      icon: <MapPin className="w-8 h-8 text-yellow-400" />
    },
    {
      title: "Segurança Real",
      desc: "Monitoramento 24h e verificação rigorosa. Sua segurança é nossa prioridade número um, da Cohab ao Cohatrac.",
      icon: <Shield className="w-8 h-8 text-yellow-400" />
    },
    {
      title: "Economia Inteligente",
      desc: "Preços que cabem no bolso do trabalhador e do estudante, com transparência total em cada rota.",
      icon: <Zap className="w-8 h-8 text-yellow-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-green-50 font-sans selection:bg-yellow-400 selection:text-[#004d2b]">
      
      {/* Hero Section - Estilo Borasiô Premium */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#004d2b]">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-400 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-400 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Mais que um App,<br/>
            <span className="text-yellow-400">Nossa Identidade.</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto font-light leading-relaxed opacity-90 text-justify md:text-center">
            O BoraSiô nasceu para conectar São Luís de ponta a ponta, valorizando quem vive e se move pela nossa Ilha do Amor.
          </p>
        </div>
      </section>

      {/* Seção História - Design Limpo e Profissional */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-green-100">
              <Image 
                src="/img/borasio.png" 
                alt="Equipe BoraSiô" 
                width={800}
                height={600}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-green-50 text-[#004d2b] px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider border border-green-200">
              Nossa Jornada
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#004d2b] leading-tight">
              A Gente Entende o <span className="text-green-600">Ritmo da Cidade</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 text-justify leading-relaxed">
              <p>
                O BoraSiô não é apenas uma empresa de tecnologia. Somos um grupo de ludovicenses apaixonados que acreditam no potencial da nossa capital.
              </p>
              <p>
                Entendemos que uma corrida da Cidade Operária para o Renascença não é apenas um deslocamento, é a vida de alguém acontecendo. Por isso, criamos algo que fala a nossa língua e entende os nossos desafios diários.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {["Motoristas Locais", "Segurança Reforçada", "Suporte Humanizado", "Preço Justo"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <span className="font-semibold text-[#004d2b]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Pilares / Valores - Grid Dinâmico */}
      <section className="bg-[#004d2b] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[50px] border-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Nossos Pilares</h2>
            <p className="text-green-50/70 text-xl max-w-2xl mx-auto">O que nos move todos os dias para oferecer o melhor serviço.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <div key={index} className="group bg-white/5 hover:bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 transition-all duration-500 hover:-translate-y-2">
                <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-yellow-400/20 transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-green-50/70 text-lg leading-relaxed text-justify">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas de Impacto */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] shadow-2xl p-12 md:p-20 relative overflow-hidden border border-green-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-4">
                <div className="flex justify-center">{stat.icon}</div>
                <div className="text-5xl font-black text-[#004d2b] tracking-tighter">{stat.value}</div>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Final - Impactante */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#004d2b] via-[#003823] to-green-900 rounded-[3.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px]"></div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight relative z-10">
            Bora transformar a sua<br/>
            <span className="text-yellow-400">forma de circular?</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <Link href="/download" className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] px-10 py-5 rounded-2xl font-black text-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-xl shadow-yellow-400/20">
              <Zap className="w-6 h-6 fill-[#004d2b]" /> Baixar Aplicativo
            </Link>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-xl transition-all backdrop-blur-sm flex items-center gap-3">
              Tornar-se Motorista <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-4 text-green-100/50">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#004d2b] bg-green-800 overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium tracking-wide">+15k ludovicenses já usam</p>
          </div>
        </div>
      </section>
    </div>
  );
}