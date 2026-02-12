import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Animated, Easing } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Hourglass, MessageCircle, ArrowLeft } from 'lucide-react-native';
import { mockData } from '../../../data/mockData';

export default function AguardandoMotoristaScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    // Animação de Rotação
    const rotateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startRotation = () => {
            rotateValue.setValue(0);
            Animated.loop(
                Animated.timing(rotateValue, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        };

        startRotation();
    }, []);

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const carona = mockData.ofertasCaronas.find(c => c.id === Number(id));
    const motorista = mockData.motoristas.find(m => m.id === carona?.motoristaId);
    const nomeMotorista = motorista ? motorista.nome : "Motorista";

    return (
        <SafeAreaView className="flex-1 bg-green-50 justify-center items-center px-6">
            <View className="items-center mb-10">
                <Text className="text-[#004d2b] text-2xl font-black uppercase tracking-widest text-center mb-4">
                    Aguardando Motorista
                </Text>

                <Text className="text-gray-600 text-center text-base font-medium mb-12 px-4 leading-6">
                    Aguarde até que o motorista <Text className="font-bold text-[#004d2b]">{nomeMotorista}</Text> chegue até o seu local de partida.
                </Text>

                <Animated.View style={{ transform: [{ rotate }] }}>
                    <Hourglass size={80} color="#fbbf24" />
                </Animated.View>
            </View>

            <TouchableOpacity
                className="bg-[#004d2b] flex-row items-center justify-center py-4 px-8 rounded-2xl shadow-lg w-full absolute bottom-12"
                onPress={() => router.push(`/corridas/${id}/chat`)}
            >
                <MessageCircle color="#fff" size={24} />
                <Text className="text-white font-bold uppercase tracking-widest ml-3">
                    Enviar Mensagem
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
