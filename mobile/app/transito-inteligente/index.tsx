import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import "../../global.css";

export default function TransitoInteligentePage() {
    const router = useRouter();

    const features = [
        {
            icon: <FontAwesome5 name="route" size={24} color="#facc15" />, // Navigation equivalent
            title: "Rotas Otimizadas",
            description: "Evitamos vias congestionadas usando IA em tempo real.",
            href: "/corridas", // Placeholder
            linkText: "Explorar rotas",
        },
        {
            icon: <Feather name="activity" size={24} color="#facc15" />,
            title: "Monitoramento Vivo",
            description: "Atualizações constantes do tráfego ludovicense.",
            href: "/tempo-real", // Placeholder
            linkText: "Ver mapa ao vivo",
        },
        {
            icon: <FontAwesome5 name="bus" size={24} color="#facc15" />,
            title: "Integração Total",
            description: "Conexão zona rural e terminais com precisão.",
            href: "/conexao-rural-terminal", // Placeholder
            linkText: "Consultar conexões",
        },
        {
            icon: <FontAwesome5 name="traffic-light" size={24} color="#facc15" />, // TrafficCone equivalent
            title: "Desvios Dinâmicos",
            description: "Sugerimos alternativas para acidentes e obras.",
            href: "/desvios-inteligentes", // Matches our mobile route
            linkText: "Alertas ativos",
        },
    ];

    const trafficTips = [
        {
            icon: <Feather name="alert-triangle" size={24} color="#eab308" />,
            title: "Horários de Pico",
            content: "Atenção na Av. dos Holandeses: 7h-9h e 17h-19h.",
        },
        {
            icon: <Feather name="bar-chart-2" size={24} color="#22c55e" />,
            title: "Economia Real",
            content: "Usuários economizam ~25min diários.",
        },
        {
            icon: <Feather name="settings" size={24} color="#004d2b" />,
            title: "Perfil de Rota",
            content: "Personalize: avenidas largas ou fuja de escolas.",
        },
    ];

    return (
        <View className="flex-1 bg-white">
            <ScrollView contentContainerClassName="pb-10">
                {/* Header */}
                <View className="bg-[#004d2b] pt-12 pb-6 px-4 rounded-b-3xl shadow-xl">
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity 
                            onPress={() => router.back()} 
                            className="flex-row items-center bg-white/10 px-3 py-2 rounded-xl"
                        >
                            <Feather name="chevron-left" size={20} color="white" />
                            <Text className="text-white font-medium ml-1">Voltar</Text>
                        </TouchableOpacity>
                        
                        <View className="flex-row items-center gap-2">
                             <View className="bg-yellow-400 p-1.5 rounded-lg">
                                <Feather name="zap" size={16} color="#004d2b" />
                            </View>
                            <Text className="text-white text-lg font-bold">Trânsito Inteligente</Text>
                        </View>
                    </View>
                    
                    <View className="mt-4 self-center flex-row items-center gap-2 bg-green-900/50 border border-green-700 px-3 py-1 rounded-full">
                         <View className="w-2 h-2 rounded-full bg-red-500" />
                         <Text className="text-[10px] font-bold uppercase text-green-300">Transmissão ao Vivo</Text>
                    </View>
                </View>

                {/* Hero Section */}
                <View className="px-4 py-8 bg-green-50">
                    <View className="bg-[#004d2b] self-start px-3 py-1 rounded-full flex-row items-center gap-2 mb-4 shadow-sm">
                        <Feather name="activity" size={14} color="#facc15" />
                        <Text className="text-white text-xs font-bold">Tecnologia Borasiô</Text>
                    </View>
                    
                    <Text className="text-4xl font-black text-[#004d2b] leading-tight mb-4">
                        Navegue por SLZ com <Text className="text-green-600 italic">Precisão.</Text>
                    </Text>
                    
                    <Text className="text-lg text-gray-600 leading-relaxed mb-6 text-justify">
                        Não somos apenas um mapa. Somos o cérebro da mobilidade na Ilha. 
                        Nosso sistema aprende com cada corrida.
                    </Text>

                    <View className="flex-row gap-3">
                        <TouchableOpacity className="flex-1 bg-[#004d2b] py-3 rounded-xl flex-row justify-center items-center gap-2 shadow-lg active:scale-95 transition-transform">
                            <Feather name="smartphone" size={20} color="white" />
                            <Text className="text-white font-bold">Ativar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 border-2 border-[#004d2b] py-3 rounded-xl flex-row justify-center items-center gap-2 active:bg-green-100 transition-colors">
                            <Feather name="info" size={20} color="#004d2b" />
                            <Text className="text-[#004d2b] font-bold">Info</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Grid de Funcionalidades */}
                <View className="px-4 py-8">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold text-[#004d2b] text-center">Engenharia de Movimento</Text>
                        <Text className="text-gray-500 text-center mt-2">Soluções para os gargalos de São Luís.</Text>
                    </View>
                    
                    <View className="gap-6">
                        {features.map((feature, index) => (
                            <TouchableOpacity 
                                key={index}
                                onPress={() => {
                                    if (feature.href.startsWith('/')) {
                                        router.push(feature.href as any);
                                    }
                                }}
                                className="bg-white p-6 rounded-2xl border border-green-50 shadow-sm flex-row items-start gap-4 active:bg-gray-50"
                            >
                                <View className="bg-[#004d2b] w-12 h-12 rounded-xl items-center justify-center shrink-0">
                                    {feature.icon}
                                </View>
                                <View className="flex-1">
                                    <Text className="text-lg font-bold text-[#004d2b] mb-1">{feature.title}</Text>
                                    <Text className="text-gray-500 text-sm leading-relaxed mb-3">{feature.description}</Text>
                                    <View className="flex-row items-center">
                                        <Text className="text-[#004d2b] font-bold text-xs">{feature.linkText}</Text>
                                        <Feather name="chevron-right" size={14} color="#004d2b" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Dicas */}
                <View className="bg-[#004d2b] py-8 px-4 rounded-3xl mx-2 shadow-inner">
                    <Text className="text-2xl font-bold text-white text-center mb-8">Inteligência Coletiva</Text>
                    <View className="gap-4">
                        {trafficTips.map((tip, index) => (
                            <View key={index} className="bg-white/10 p-5 rounded-2xl border border-white/5">
                                <View className="flex-row items-center gap-3 mb-2">
                                    <View className="bg-white/20 p-2 rounded-lg">
                                        {tip.icon}
                                    </View>
                                    <Text className="font-bold text-lg text-yellow-400">{tip.title}</Text>
                                </View>
                                <Text className="text-gray-200 text-sm leading-relaxed">{tip.content}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* CTA Final */}
                <View className="px-4 py-12 items-center">
                    <Text className="text-3xl font-black text-[#004d2b] text-center mb-4">Fluidez total?</Text>
                    <Text className="text-lg text-gray-500 text-center mb-8">
                        Ative o modo trânsito inteligente e economize horas.
                    </Text>
                     <TouchableOpacity className="bg-yellow-400 py-4 px-8 rounded-xl flex-row items-center gap-3 shadow-xl w-full justify-center active:scale-95">
                        <Feather name="zap" size={24} color="#004d2b" />
                        <Text className="text-[#004d2b] font-black text-xl">Começar agora</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}
