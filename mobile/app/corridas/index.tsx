
import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import "../../global.css";

export default function CorridasIndex() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="px-6 py-4 flex-row items-center bg-white border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="p-2 bg-gray-50 rounded-full mr-4">
                    <Feather name="arrow-left" size={24} color="#166534" />
                </TouchableOpacity>
                <Text className="text-xl font-black text-green-900">Corridas e Caronas</Text>
            </View>

            <View className="flex-1 p-6 justify-center gap-6">

                {/* Opção 1: Procurar Carona (Passageiro) */}
                <TouchableOpacity
                    className="bg-green-50 p-8 rounded-3xl border-2 border-green-100 items-center shadow-sm active:scale-95 transition-transform"
                    onPress={() => {
                        // Em breve: rota para buscar caronas
                        alert("Funcionalidade de Buscar Carona em breve!");
                    }}
                >
                    <View className="bg-green-100 p-6 rounded-full mb-4">
                        <Feather name="search" size={48} color="#15803d" />
                    </View>
                    <Text className="text-2xl font-black text-green-900 mb-2">Procurar Carona</Text>
                    <Text className="text-gray-500 text-center font-medium">
                        Encontre motoristas indo para o mesmo destino que você.
                    </Text>
                </TouchableOpacity>

                {/* Separador */}
                <View className="flex-row items-center gap-4">
                    <View className="h-[1px] bg-gray-200 flex-1" />
                    <Text className="text-gray-400 font-bold text-xs uppercase">OU</Text>
                    <View className="h-[1px] bg-gray-200 flex-1" />
                </View>

                {/* Opção 2: Oferecer Carona (Motorista) */}
                <TouchableOpacity
                    className="bg-yellow-50 p-8 rounded-3xl border-2 border-yellow-100 items-center shadow-sm active:scale-95 transition-transform"
                    onPress={() => router.push('/corridas/ofertar')}
                >
                    <View className="bg-yellow-100 p-6 rounded-full mb-4">
                        <Feather name="plus-circle" size={48} color="#ca8a04" />
                    </View>
                    <Text className="text-2xl font-black text-yellow-800 mb-2">Oferecer Carona</Text>
                    <Text className="text-gray-500 text-center font-medium">
                        Vá de carro, economize e ajude a mobilidade da ilha.
                    </Text>
                </TouchableOpacity>

            </View>

            <View className="p-6 items-center">
                <Text className="text-gray-300 text-xs font-bold uppercase tracking-widest">Borasiô Mobile</Text>
            </View>
        </SafeAreaView>
    );
}
