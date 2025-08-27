'use client';

import { ChevronLeft, Users, Share2, DollarSign, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

export default function CorridaEmGrupoPage() {
    const benefits = [
        {
            icon: <DollarSign className="w-8 h-8 text-[#004d2b]" />,
            title: "Economia",
            description: "Divida os custos da viagem com até 3 pessoas"
        },
        {
            icon: <Clock className="w-8 h-8 text-[#004d2b]" />,
            title: "Eficiência",
            description: "Menos carros nas ruas, menos congestionamento"
        },
        {
            icon: <Users className="w-8 h-8 text-[#004d2b]" />,
            title: "Comunidade",
            description: "Conecte-se com pessoas do seu bairro"
        },
        {
            icon: <Shield className="w-8 h-8 text-[#004d2b]" />,
            title: "Segurança",
            description: "Todos os participantes são verificados"
        }
    ];

    const howItWorks = [
        {
            step: "1",
            title: "Marque sua viagem",
            description: "No app, selecione 'Oferecer Carona' ou 'Pedir Carona'"
        },
        {
            step: "2",
            title: "Escolha o grupo",
            description: "Selecione quantas pessoas você quer compartilhar (até 3)"
        },
        {
            step: "3",
            title: "Combine o trajeto",
            description: "Defina os pontos de encontro e destino final"
        },
        {
            step: "4",
            title: "Viaje juntos",
            description: "Acompanhe em tempo real e aproveite a jornada"
        }
    ];

    return (
        <div className="bg-green-50 min-h-screen">
            {/* Header */}
            <header className="bg-[#004d2b] text-white py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Voltar</span>
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1">
                        Corrida em Grupo
                    </h1>
                    <div className="w-8"></div> {/* Espaçamento balanceado */}
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#004d2b] to-green-700 text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Compartilhe sua viagem, economize e faça novas conexões
                        </h2>
                        <p className="text-lg sm:text-xl mb-6">
                            Nosso sistema de caronas compartilhadas conecta pessoas do mesmo bairro que estão indo para destinos similares.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/cadastrar"
                                className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
                            >
                                Oferecer Carona
                            </Link>
                            <Link
                                href="/cadastrar"
                                className="bg-white/10 hover:bg-white/20 font-semibold py-3 px-6 rounded-lg transition-colors border border-white"
                            >
                                Pedir Carona
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="/img/compartilhar-carona.jpg"
                            alt="Pessoas compartilhando carona"
                            className="w-full max-w-[400px] md:max-w-[350px] rounded-lg shadow-xl -mt-2 md:mt-0"
                        />
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#004d2b] mb-12">
                        Vantagens da Corrida em Grupo
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-green-50 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                                <div className="mb-4 p-3 bg-white rounded-full">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#004d2b] mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#004d2b] mb-12">
                        Como funciona
                    </h2>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-[#004d2b]/20 transform -translate-x-1/2"></div>

                        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
                            {howItWorks.map((item, index) => (
                                <div
                                    key={index}
                                    className={`relative flex ${index % 2 === 0 ? 'lg:pr-8 justify-start' : 'lg:pl-8 justify-end'}`}
                                >
                                    <div className="max-w-md">
                                        <div className="flex items-center mb-4">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#004d2b] text-white font-bold mr-4">
                                                {item.step}
                                            </div>
                                            <h3 className="text-xl font-bold text-[#004d2b]">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 pl-14">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#004d2b] rounded-xl p-8 md:p-12 text-white">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="md:w-1/2">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                    Segurança em Primeiro Lugar
                                </h2>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Todos os usuários são verificados</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Avaliação mútua após cada corrida</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Rota compartilhada em tempo real com contatos de confiança</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Botão de emergência integrado</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:w-1/2 flex justify-center">
                                <img
                                    src="/img/seguranca-carona.jpg"
                                    alt="Recursos de segurança para caronas em grupo"
                                    className="rounded-lg shadow-lg max-w-xs"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#004d2b] to-green-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Pronto para compartilhar sua próxima viagem?
                    </h2>
                    <p className="text-xl mb-8">
                        Junte-se à comunidade de caronas compartilhadas e ajude a reduzir o trânsito em São Luís.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/cadastrar"
                            className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md text-lg"
                        >
                            Começar Agora
                        </Link>
                        <Link
                            href="/modo-ilha"
                            className="bg-white/10 hover:bg-white/20 font-semibold py-3 px-8 rounded-lg transition-colors border border-white text-lg"
                        >
                            Combinar com Modo Ilha
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}