import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import "../../global.css";

export default function PerfilUsuario() {
    const router = useRouter();

    const menuOptions = [
        { icon: 'user', label: 'Dados Pessoais', desc: 'Nome, e-mail e telefone' },
        { icon: 'map-pin', label: 'Endereços Salvos', desc: 'Casa, trabalho e favoritos' },
        { icon: 'credit-card', label: 'Pagamentos', desc: 'Cartões e histórico' },
        { icon: 'shield', label: 'Segurança', desc: 'Senha e verificação' },
        { icon: 'bell', label: 'Notificações', desc: 'Preferências de alertas' },
        { icon: 'help-circle', label: 'Ajuda', desc: 'Suporte e FAQ' },
    ];

    return (
        <View className="flex-1 bg-gray-50">
            <View className="bg-[#004d2b] pb-24 pt-12 px-6 rounded-b-[40px] relative">
                <View className="flex-row justify-between items-center mb-6">
                    <TouchableOpacity onPress={() => router.back()} className="bg-white/20 p-2 rounded-full">
                        <Feather name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold">Perfil</Text>
                    <TouchableOpacity className="bg-white/20 p-2 rounded-full">
                        <Feather name="settings" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View className="items-center">
                    <View className="relative">
                        <Image
                            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
                            className="w-24 h-24 rounded-full border-4 border-white"
                        />
                        <TouchableOpacity className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full border-2 border-white">
                            <Feather name="camera" size={14} color="#004d2b" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-white text-xl font-bold mt-3">Maria Vitória</Text>
                    <Text className="text-green-200">Passageira Safira</Text>
                    <View className="flex-row items-center mt-2 bg-white/20 px-3 py-1 rounded-full">
                        <Feather name="star" size={14} color="#fde047" />
                        <Text className="text-white ml-1 font-bold">4.9</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 -mt-16 pt-2 pb-8">
                <View className="bg-white rounded-2xl shadow-sm p-2 mb-6">
                    {menuOptions.map((item, index) => (
                        <TouchableOpacity key={index} className={`flex-row items-center p-4 ${index !== menuOptions.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <View className="bg-green-50 p-3 rounded-xl mr-4">
                                <Feather name={item.icon as any} size={20} color="#004d2b" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-800 font-semibold text-base">{item.label}</Text>
                                <Text className="text-gray-400 text-xs">{item.desc}</Text>
                            </View>
                            <Feather name="chevron-right" size={20} color="#cbd5e1" />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    className="flex-row items-center justify-center bg-red-50 p-4 rounded-xl border border-red-100 mb-8"
                    onPress={() => router.replace("/")}
                >
                    <Feather name="log-out" size={20} color="#ef4444" />
                    <Text className="text-red-500 font-semibold ml-2">Sair da Conta</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
