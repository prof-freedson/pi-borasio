'use client';

import { 
  ChevronLeft, 
  Users, 
  Share2, 
  DollarSign, 
  Clock, 
  Shield, 
  Car, 
  MapPin, 
  Star, 
  Heart, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CorridaEmGrupoPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('offer');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const benefits = [
        {
            icon: <DollarSign className="w-8 h-8 text-yellow-500" />,
            title: "Economia Inteligente",
            description: "Divida os custos e economize até 70% por viagem. Ideal para o trajeto diário.",
            color: "from-yellow-500/10 to-transparent"
        },
        {
            icon: <Clock className="w-8 h-8 text-blue-500" />,
            title: "Trânsito Reduzido",
            description: "Menos carros na Ilha significam viagens mais rápidas para todos.",
            color: "from-blue-500/10 to-transparent"
        },
        {
            icon: <Users className="w-8 h-8 text-purple-500" />,
            title: "Conexões Reais",
            description: "Crie laços com vizinhos e colegas que fazem o mesmo caminho que você.",
            color: "from-purple-500/10 to-transparent"
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
            title: "Segurança Total",
            description: "Todos os perfis são verificados para garantir sua paz de espírito.",
            color: "from-green-500/10 to-transparent"
        }
    ];

    const howItWorks = [
        {
            step: "01",
            title: "Escolha seu Papel",
            description: "Selecione se deseja oferecer uma carona ou buscar uma vaga disponível.",
            icon: <Users className="w-6 h-6 text-white" />
        },
        {
            step: "02",
            title: "Defina o Trajeto",
            description: "Informe sua origem, destino e os horários que você costuma transitar.",
            icon: <MapPin className="w-6 h-6 text-white" />
        },
        {
            step: "03",
            title: "Forme o Time",
            description: "Nosso sistema encontra automaticamente pessoas com rotas compatíveis.",
            icon: <Share2 className="w-6 h-6 text-white" />
        },
        {
            step: "04",
            title: "Partiu Viagem",
            description: "Aproveite a companhia, economize e contribua com a cidade.",
            icon: <Car className="w-6 h-6 text-white" />
        }
    ];

    const testimonials = [
        {
            name: "Ana Silva",
            role: "Universitária",
            comment: "Melhor coisa que aconteceu para quem estuda longe. Economizo muito e fiz amigos!",
            rating: 5,
            avatar: "👩‍🎓",
            tag: "Economia"
        },
        {
            name: "Carlos Santos",
            role: "Profissional",
            comment: "Uso todos os dias para ir ao trabalho. A divisão de custos é justa e o app é nota 10.",
            rating: 5,
            avatar: "👨‍💼",
            tag: "Praticidade"
        },
        {
            name: "Marina Costa",
            role: "Arquiteta",
            comment: "Me sinto segura viajando com pessoas verificadas do meu próprio bairro.",
            rating: 5,
            avatar: "👩‍🎨",
            tag: "Segurança"
        }
    ];

    const ativarCorridaGrupo = (type = '') => {
        if (type === 'offer') {
            router.push('/oferecer-carona?tipo=grupo');
        } else {
            router.push('/corridas?group=true');
        }
    };

    return (
        <div className="bg-[#fcfdfc] min-h-screen font-sans">
            {/* Elegant Header */}
            <header className="bg-[#004d2b] text-white py-4 px-6 md:px-12 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-[#004d2b]/95">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link 
                        href="/" 
                        className="group flex items-center gap-2 text-white/80 hover:text-yellow-400 transition-all duration-300"
                    >
                        <div className="bg-white/10 p-2 rounded-full group-hover:bg-yellow-400/20 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </div>
                        <span className="font-medium hidden sm:block font-bold">Voltar ao Início</span>
                    </Link>
                    
                    <h1 className="text-xl md:text-2xl font-black tracking-tight text-center">
                        MODO <span className="text-yellow-400 font-bold">GRUPO</span>
                    </h1>

                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider hidden md:block border border-yellow-400/20">
                            Exclusivo Bora Siô
                        </div>
                    </div>
                </div>
            </header>

            <main>
                {/* Premium Hero Section */}
                <section className="relative pt-12 pb-24 px-6 overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className={`lg:w-1/2 space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <div className="inline-flex items-center gap-2 bg-green-100/80 backdrop-blur-sm text-[#004d2b] px-4 py-2 rounded-2xl border border-green-200">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Mobilidade Consciente</span>
                                </div>

                                <h2 className="text-5xl md:text-7xl font-black text-[#004d2b] leading-[1.1]">
                                    Unidos pela <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-green-600 to-yellow-500">
                                        Carona Perfeita.
                                    </span>
                                </h2>

                                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                                    Conecte-se com pessoas do seu bairro que fazem caminhos similares. 
                                    Divida custos, reduza o tempo no trânsito e viaje com mais conforto.
                                </p>

                                {/* Interactive Tab and Call to Action */}
                                <div className="bg-white p-2 rounded-3xl shadow-2xl shadow-green-900/5 inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border border-gray-100">
                                    <div className="flex bg-gray-100/50 p-1.5 rounded-2xl">
                                        <button
                                            onClick={() => setActiveTab('offer')}
                                            className={`flex-1 sm:flex-none px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                                                activeTab === 'offer' 
                                                ? 'bg-[#004d2b] text-white shadow-lg scale-100' 
                                                : 'text-gray-500 hover:text-[#004d2b] scale-95 hover:scale-100'
                                            }`}
                                        >
                                            🚀 Oferecer
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('request')}
                                            className={`flex-1 sm:flex-none px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                                                activeTab === 'request' 
                                                ? 'bg-[#004d2b] text-white shadow-lg scale-100' 
                                                : 'text-gray-500 hover:text-[#004d2b] scale-95 hover:scale-100'
                                            }`}
                                        >
                                            🎒 Buscar
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => ativarCorridaGrupo(activeTab)}
                                        className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-black py-4 px-10 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-yellow-400/20 active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        {activeTab === 'offer' ? 'CRIAR MEU GRUPO' : 'ENCONTRAR GRUPO'}
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className={`lg:w-1/2 relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                <div className="relative group">
                                    {/* Decorative Frame */}
                                    <div className="absolute -inset-4 bg-gradient-to-tr from-yellow-400/20 to-green-500/20 rounded-[40px] blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative bg-white p-4 rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden">
                                        <img
                                            src="/img/compartilhar-carona.jpg"
                                            alt="Pessoas compartilhando carona"
                                            className="w-full h-auto rounded-[32px] object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop";
                                            }}
                                        />
                                        <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-xl">
                                            <div className="flex items-center gap-4 mb-2">
                                                <div className="bg-green-100 p-2 rounded-xl">
                                                    <Zap className="w-6 h-6 text-green-600 fill-current" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-green-600 font-black uppercase tracking-widest">Impacto Imediato</p>
                                                    <p className="text-lg font-bold text-[#004d2b]">Até 70% mais econômico</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Grid */}
                <section className="py-24 px-6 bg-gradient-to-b from-white to-green-50/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20 space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black text-[#004d2b]">Por que viajar em grupo?</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-lg italic">"A gente chega mais longe quando vai no mesmo passo."</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {benefits.map((benefit, index) => (
                                <div 
                                    key={index} 
                                    className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                    <div className="relative space-y-6">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#004d2b] mb-3">{benefit.title}</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">{benefit.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Steps */}
                <section className="py-24 px-6 bg-[#004d2b] text-white relative overflow-hidden">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-4">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-black">Fluxo Simplificado</h2>
                                <p className="text-green-200 text-lg">De São Luís para São Luís: carona nativa, segura e rápida.</p>
                            </div>
                            <div className="bg-yellow-400 text-[#004d2b] px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase">
                                Em menos de 2 minutos
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {howItWorks.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="relative group "
                                >
                                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-400/40 to-transparent">
                                                {item.step}
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 group-hover:bg-yellow-400 group-hover:text-[#004d2b] transition-all duration-300">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                            <p className="text-green-100/70 text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                    {index < howItWorks.length - 1 && (
                                        <div className="hidden lg:block absolute top-10 left-full w-full h-[1px] bg-gradient-to-r from-yellow-400/30 to-transparent z-0"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials with New Layout */}
                <section className="py-24 px-6 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="md:flex items-center justify-between mb-16 space-y-4 md:space-y-0 text-center md:text-left">
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-4xl font-black text-[#004d2b]">Vozes da Comunidade</h2>
                                <p className="text-gray-500">Histórias reais de quem já mudou sua rotina com o Bora Siô.</p>
                            </div>
                            <div className="flex justify-center md:justify-end gap-2">
                                <span className="bg-green-100 text-[#004d2b] px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                                    +5.000 Grupos Ativos
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((t, index) => (
                                <div 
                                    key={index} 
                                    className="bg-gray-50/50 rounded-[32px] p-8 border border-gray-100 relative group hover:bg-white hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="absolute top-8 right-8 text-yellow-500/20 group-hover:text-yellow-500/40 transition-colors">
                                        <Sparkles className="w-12 h-12" />
                                    </div>
                                    
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="text-4xl filter drop-shadow-md">{t.avatar}</div>
                                        <div>
                                            <h4 className="font-bold text-[#004d2b]">{t.name}</h4>
                                            <p className="text-xs text-gray-500 uppercase tracking-tighter font-bold">{t.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mb-4">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 italic leading-relaxed mb-6 font-medium">"{t.comment}"</p>
                                    
                                    <div className="inline-block px-3 py-1 bg-white rounded-lg border border-gray-100 text-[10px] font-black text-[#004d2b] uppercase tracking-wider">
                                        #{t.tag}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Safety - Dark Premium Section */}
                <section className="py-24 px-6 bg-gradient-to-br from-[#012e1a] to-[#004d2b] text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-12 -translate-y-12">
                        <Shield className="w-96 h-96" />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="lg:w-1/2 space-y-8">
                                <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-2xl border border-yellow-400/20">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Segurança em Primeiro Lugar</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black leading-tight">Sua segurança não <br /><span className="text-yellow-400">é negociável.</span></h2>
                                
                                <div className="space-y-6">
                                    {[
                                        "Biometria facial para todos os motoristas",
                                        "Monitoramento via GPS em tempo real",
                                        "Central de incidentes 24h por dia",
                                        "Seguro de viagem incluso para passageiros",
                                        "Verificação rigorosa de CNH e antecedentes"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 group">
                                            <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30 group-hover:bg-green-500 transition-colors">
                                                <CheckCircle2 className="w-4 h-4 text-green-400 group-hover:text-white" />
                                            </div>
                                            <span className="text-lg text-green-100/90">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:w-1/2 relative">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-yellow-400/10 rounded-[40px] blur-2xl"></div>
                                    <div className="relative bg-[#023c23] p-4 rounded-[40px] border border-white/10 shadow-3xl">
                                        <img
                                            src="/img/seguranca-carona.jpg"
                                            alt="Segurança na Carona"
                                            className="w-full h-auto rounded-[32px] opacity-90 hover:opacity-100 transition-opacity duration-500"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "https://images.unsplash.com/photo-1557033160-32df9e67ca02?q=80&w=800&auto=format&fit=crop";
                                            }}
                                        />
                                        <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/10">
                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                            <span className="text-[10px] font-black uppercase tracking-widest">Botão SOS Ativo</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-32 px-6 relative bg-white">
                    <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
                        <div className="inline-block bg-green-50 p-4 rounded-3xl mb-4">
                            <Heart className="w-16 h-16 text-[#004d2b] animate-bounce" />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-6xl font-black text-[#004d2b] leading-tight">
                                Pronto para rodar <br /> 
                                <span className="text-yellow-500 italic">do jeito certo?</span>
                            </h2>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                                Junte-se a milhares de ludovicenses que já estão economizando e fazendo 
                                do trânsito um lugar mais amigável. Comece hoje mesmo.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                            <Link 
                                href="/download"
                                className="w-full sm:w-auto bg-[#004d2b] hover:bg-[#00361e] text-white font-black py-5 px-12 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-green-900/30 text-lg flex items-center justify-center gap-3 active:scale-95 group"
                            >
                                <Car className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                BAIXAR APP AGORA
                            </Link>
                            <Link 
                                href="/sobre"
                                className="w-full sm:w-auto text-[#004d2b] font-bold py-5 px-12 rounded-2xl transition-all border-2 border-[#004d2b] hover:bg-[#004d2b] hover:text-white text-lg flex items-center justify-center gap-2"
                            >
                                SAIBA MAIS
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
