import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import "../../global.css";

export default function TransitoInteligente() {
    const router = useRouter();

    const alerts = [
        { type: 'congestion', title: 'Av. Jerônimo de Albuquerque', time: '10 min', severity: 'Alto', desc: 'Trânsito lento devido a obras.' },
        { type: 'accident', title: 'Ponte do São Francisco', time: '25 min', severity: 'Médio', desc: 'Acidente leve na faixa da direita.' },
        { type: 'info', title: 'Av. Litorânea', time: '5 min', severity: 'Baixo', desc: 'Fluxo livre.' },
    ];

    return (
        <View className="flex-1 bg-gray-50">
            <View className="bg-[#004d2b] px-6 pt-12 pb-6 rounded-b-3xl shadow-lg">
                <View className="flex-row items-center justify-between mb-4">
                    <TouchableOpacity onPress={() => router.back()} className="bg-white/20 p-2 rounded-full">
                        <Feather name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold">Trânsito Inteligente</Text>
                    <TouchableOpacity className="bg-white/20 p-2 rounded-full">
                        <Feather name="refresh-cw" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Text className="text-white/80 text-center">Monitoramento em tempo real das vias de São Luís</Text>
            </View>

            <ScrollView className="flex-1 px-4 pt-6">
                {/* Map Placeholder */}
                <View className="bg-gray-200 h-48 rounded-2xl mb-6 items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden relative">
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" }}
                        className="w-full h-full opacity-60"
                    />
                    <View className="absolute bg-white/90 px-4 py-2 rounded-lg">
                        <Text className="font-bold text-gray-700">Mapa de Calor (Simulação)</Text>
                    </View>
                </View>

                <Text className="text-lg font-bold text-gray-800 mb-4">Alertas Recentes</Text>

                <View className="space-y-4 gap-4 pb-8">
                    {alerts.map((alert, index) => (
                        <View key={index} className="bg-white p-4 rounded-xl shadow-sm border-l-4" style={{
                            borderLeftColor: alert.severity === 'Alto' ? '#ef4444' : alert.severity === 'Médio' ? '#f59e0b' : '#10b981'
                        }}>
                            <View className="flex-row justify-between items-start mb-2">
                                <View className="flex-row items-center gap-2">
                                    <Feather
                                        name={alert.type === 'congestion' ? 'alert-octagon' : alert.type === 'accident' ? 'alert-triangle' : 'info'}
                                        size={20}
                                        color={alert.severity === 'Alto' ? '#ef4444' : alert.severity === 'Médio' ? '#f59e0b' : '#10b981'}
                                    />
                                    <Text className="font-bold text-gray-800 flex-1">{alert.title}</Text>
                                </View>
                                <Text className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{alert.time}</Text>
                            </View>
                            <Text className="text-gray-600 ml-7">{alert.desc}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
