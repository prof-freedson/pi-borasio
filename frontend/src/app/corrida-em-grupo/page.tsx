'use client';

import { ChevronLeft, Users, Share2, DollarSign, Clock, Shield, Car, MapPin, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CorridaEmGrupoPage() {
    const [activeTab, setActiveTab] = useState('offer');

    const benefits = [
        {
            icon: <DollarSign className="w-8 h-8 text-[#004d2b]" />,
            title: "Economia Inteligente",
            description: "Divida os custos e economize até 70% por viagem"
        },
        {
            icon: <Clock className="w-8 h-8 text-[#004d2b]" />,
            title: "Trânsito Reduzido",
            description: "Menos carros, mais fluidez no tráfego"
        },
        {
            icon: <Users className="w-8 h-8 text-[#004d2b]" />,
            title: "Conexões Reais",
            description: "Conheça pessoas do seu bairro e região"
        },
        {
            icon: <Shield className="w-8 h-8 text-[#004d2b]" />,
            title: "Segurança Total",
            description: "Verificação completa de todos os usuários"
        }
    ];

    const howItWorks = [
        {
            step: "1",
            title: "Escolha seu papel",
            description: "Seja motorista oferecendo carona ou passageiro buscando uma",
            icon: <Users className="w-6 h-6" />
        },
        {
            step: "2",
            title: "Defina seu trajeto",
            description: "Informe origem, destino e horários desejados",
            icon: <MapPin className="w-6 h-6" />
        },
        {
            step: "3",
            title: "Forme seu grupo",
            description: "Conecte-se com até 3 pessoas do mesmo percurso",
            icon: <Share2 className="w-6 h-6" />
        },
        {
            step: "4",
            title: "Viajem juntos",
            description: "Acompanhe tudo em tempo real com segurança",
            icon: <Car className="w-6 h-6" />
        }
    ];

    const testimonials = [
        {
            name: "Ana Silva",
            role: "Universitária",
            comment: "Economizo R$ 200 por mês indo pra faculdade com o grupo!",
            rating: 5,
            avatar: "👩‍🎓"
        },
        {
            name: "Carlos Santos",
            role: "Motorista",
            comment: "Ótimo para dividir custos e conhecer pessoas do bairro.",
            rating: 5,
            avatar: "👨‍💼"
        },
        {
            name: "Marina Costa",
            role: "Profissional",
            comment: "Chego mais rápido ao trabalho e ainda faço networking.",
            rating: 4,
            avatar: "👩‍💻"
        }
    ];

    // Função para ativar corrida em grupo
    const ativarCorridaGrupo = (type = '') => {
        const params = new URLSearchParams();
        if (type) params.append('type', type);
        params.append('group', 'true');
        
        window.location.href = `/corridas?${params.toString()}`;
    };

    return (
        <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">
            {/* Header */}
            <header className="bg-[#004d2b] text-white py-6 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:text-yellow-300 transition-all duration-300 transform hover:-translate-x-1">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Voltar</span>
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1 bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                        Corrida em Grupo
                    </h1>
                    <div className="w-8"></div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#004d2b] via-green-700 to-green-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Compartilhamento Inteligente</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                            Viaje junto, 
                            <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent"> economize </span>
                            mais!
                        </h2>
                        <p className="text-xl mb-8 text-green-100 leading-relaxed">
                            Conecte-se com pessoas do seu bairro que fazem trajetos similares. 
                            Divida custos, reduza o trânsito e faça novas amizades.
                        </p>
                        
                        {/* Tab Selection */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 mb-6 flex w-fit">
                            <button
                                onClick={() => setActiveTab('offer')}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                                    activeTab === 'offer' 
                                    ? 'bg-yellow-400 text-[#004d2b] shadow-lg' 
                                    : 'text-white hover:bg-white/10'
                                }`}
                            >
                                🚗 Oferecer
                            </button>
                            <button
                                onClick={() => setActiveTab('request')}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                                    activeTab === 'request' 
                                    ? 'bg-yellow-400 text-[#004d2b] shadow-lg' 
                                    : 'text-white hover:bg-white/10'
                                }`}
                            >
                                👥 Pedir
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => ativarCorridaGrupo(activeTab)}
                                className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 whitespace-nowrap"
                            >
                                <Car className="w-5 h-5" />
                                {activeTab === 'offer' ? 'Oferecer Carona' : 'Buscar Carona'}
                            </button>
                            <Link 
                                href="/modo-ilha" 
                                className="bg-white/10 hover:bg-white/20 font-semibold py-4 px-6 rounded-xl transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center gap-3 backdrop-blur-sm whitespace-nowrap"
                            >
                                <MapPin className="w-5 h-5" />
                                Com Modo Ilha
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center relative">
                        <div className="relative">
                            <img
                                src="/img/compartilhar-carona.jpg"
                                alt="Pessoas compartilhando carona de forma moderna"
                                className="w-full max-w-md rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1.5 rounded-full font-semibold shadow-lg text-sm backdrop-blur-sm">
                                Economize 70%
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#004d2b] mb-4">
                            Por que escolher corrida em grupo?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Uma experiência de mobilidade mais inteligente, econômica e social
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100 group"
                            >
                                <div className="mb-6 p-4 bg-green-50 rounded-2xl inline-flex group-hover:bg-green-100 transition-colors duration-300">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#004d2b] mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#004d2b] mb-4">
                            Como funciona em 4 passos
                        </h2>
                        <p className="text-xl text-gray-600">
                            Simples, rápido e seguro
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {howItWorks.map((item, index) => (
                            <div 
                                key={index} 
                                className="relative text-center group"
                            >
                                <div className="relative z-10 bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100">
                                    <div className="w-16 h-16 bg-[#004d2b] text-white rounded-2xl flex items-center justify-center font-bold text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                                        {item.step}
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto text-[#004d2b]">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#004d2b] mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                                {index < howItWorks.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-green-200 transform translate-x-4 -translate-y-1/2"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#004d2b] mb-4">
                            O que nossos usuários dizem
                        </h2>
                        <p className="text-xl text-gray-600">
                            Experiências reais de quem já adotou a corrida em grupo
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index} 
                                className="bg-green-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-green-100"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="text-3xl">{testimonial.avatar}</div>
                                    <div>
                                        <h4 className="font-bold text-[#004d2b]">{testimonial.name}</h4>
                                        <p className="text-green-600 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`w-4 h-4 ${
                                                i < testimonial.rating 
                                                    ? 'text-yellow-400 fill-current' 
                                                    : 'text-gray-300'
                                            }`} 
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Safety Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#004d2b] to-green-800 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                                <Shield className="w-4 h-4" />
                                <span className="text-sm font-medium">Segurança Garantida</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                Sua segurança é nossa prioridade
                            </h2>
                            <div className="space-y-4">
                                {[
                                    "Verificação completa de documentos e identidade",
                                    "Sistema de avaliação mútua após cada corrida",
                                    "Compartilhamento de rota em tempo real",
                                    "Botão de emergência 24/7",
                                    "Suporte dedicado para incidentes"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex justify-center">
                            <div className="relative">
                                <img
                                    src="/img/seguranca-carona.jpg"
                                    alt="Recursos de segurança para caronas em grupo"
                                    className="rounded-2xl shadow-2xl max-w-md transform hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg font-semibold text-sm">
                                    🔒 Protegido
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#004d2b] via-green-700 to-green-800 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <Heart className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
                    <h2 className="text-4xl font-bold mb-6">
                        Pronto para uma nova forma de se locomover?
                    </h2>
                    <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto leading-relaxed">
                        Junte-se a milhares de são-luisenses que já descobriram os benefícios 
                        da corrida em grupo. Economize, conecte-se e ajude nossa cidade.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link 
                            href="/download"
                            className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg flex items-center gap-3"
                        >
                            📱 Baixar App Gratuito
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}