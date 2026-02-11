
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Alert, Modal, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import "../../global.css";

// CONFIGURAÇÃO DA API
// Se estiver usando Emulador Android, use: 'http://10.0.2.2:3001'
// Se estiver usando Simulador iOS, use: 'http://localhost:3001'
// Se estiver usando Dispositivo Físico, use o IP da sua máquina: 'http://192.168.x.x:3001'
const API_URL = 'http://10.0.2.2:3001';

type FormData = {
    motorista: string;
    telefone: string;
    origem: string;
    destino: string;
    assentos: number;
    preco: string;
    veiculo: string;
    placa: string;
    data: string;
    horario: string;
    observacoes: string;
    arCondicionado: boolean;
    tipo: 'geral' | 'grupo';
};

export default function OferecerCaronaScreen() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        motorista: "",
        telefone: "",
        origem: "",
        destino: "",
        assentos: 4,
        preco: "",
        veiculo: "",
        placa: "",
        data: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        horario: new Date().toTimeString().split(' ')[0].slice(0, 5), // HH:MM
        observacoes: "",
        arCondicionado: false,
        tipo: 'geral'
    });

    const handleInputChange = (field: keyof FormData, value: string | number | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const dataHoraString = `${formData.data}T${formData.horario}:00`;
            const dataHora = new Date(dataHoraString);

            const payload = {
                motoristaId: 1, // Mock ID
                tipo: formData.tipo,
                origem: formData.origem,
                destino: formData.destino,
                dataHora: dataHora.toISOString(),
                vagas: formData.assentos,
                valor: formData.preco.replace('R$', '').replace(',', '.').trim(),
                veiculo: formData.veiculo,
                placa: formData.placa,
                arCondicionado: formData.arCondicionado,
                observacoes: formData.observacoes,
                telefone: formData.telefone
            };

            const response = await fetch(`${API_URL}/caronas/ofertar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Falha ao criar oferta');
            }

            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                router.back();
            }, 3000);

        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique sua conexão.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    if (isSuccess) {
        return (
            <SafeAreaView className="flex-1 bg-white justify-center items-center">
                <View className="bg-green-50 p-6 rounded-full mb-6">
                    <Feather name="check-circle" size={64} color="#15803d" />
                </View>
                <Text className="text-2xl font-black text-green-900 mb-2">
                    {formData.tipo === 'grupo' ? 'GRUPO CRIADO!' : 'OFERTA ATIVA!'}
                </Text>
                <Text className="text-gray-500 text-center px-8">
                    Sua carona foi cadastrada com sucesso e já está disponível.
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between bg-white border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="p-2 bg-gray-50 rounded-full">
                    <Feather name="arrow-left" size={24} color="#166534" />
                </TouchableOpacity>
                <Text className="text-lg font-black text-green-900">Oferecer Carona</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>

                {/* Progress Steps */}
                <View className="flex-row justify-between mb-8 px-4">
                    {[1, 2, 3].map((s) => (
                        <View key={s} className="items-center">
                            <View className={`w-8 h-8 rounded-full items-center justify-center mb-1 ${step >= s ? 'bg-green-700' : 'bg-gray-200'}`}>
                                <Text className={`font-bold ${step >= s ? 'text-white' : 'text-gray-500'}`}>{s}</Text>
                            </View>
                            <Text className="text-[10px] text-gray-400 font-bold uppercase">
                                {s === 1 ? 'Perfil' : s === 2 ? 'Rota' : 'Veículo'}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Tipo de Carona Selector */}
                <View className="flex-row gap-4 mb-8">
                    <TouchableOpacity
                        onPress={() => handleInputChange('tipo', 'geral')}
                        className={`flex-1 p-4 rounded-2xl border-2 flex-col items-center gap-2 ${formData.tipo === 'geral' ? 'border-green-700 bg-white shadow-lg shadow-green-900/10' : 'border-gray-100 bg-gray-50'}`}
                    >
                        <Feather name="navigation" size={24} color={formData.tipo === 'geral' ? '#15803d' : '#9ca3af'} />
                        <Text className={`font-black text-xs uppercase ${formData.tipo === 'geral' ? 'text-green-800' : 'text-gray-400'}`}>Geral</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleInputChange('tipo', 'grupo')}
                        className={`flex-1 p-4 rounded-2xl border-2 flex-col items-center gap-2 ${formData.tipo === 'grupo' ? 'border-yellow-400 bg-white shadow-lg shadow-yellow-900/10' : 'border-gray-100 bg-gray-50'}`}
                    >
                        <Feather name="users" size={24} color={formData.tipo === 'grupo' ? '#ca8a04' : '#9ca3af'} />
                        <Text className={`font-black text-xs uppercase ${formData.tipo === 'grupo' ? 'text-yellow-600' : 'text-gray-400'}`}>Grupo</Text>
                    </TouchableOpacity>
                </View>

                {/* Form Content */}
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-20">

                    {step === 1 && (
                        <View className="space-y-4 gap-4">
                            <View>
                                <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Motorista / Grupo</Text>
                                <TextInput
                                    value={formData.motorista}
                                    onChangeText={(t) => handleInputChange('motorista', t)}
                                    placeholder="Seu nome ou nome do grupo"
                                    className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-medium text-green-900"
                                />
                            </View>
                            <View>
                                <Text className="text-xs font-bold text-gray-400 uppercase mb-2">WhatsApp</Text>
                                <TextInput
                                    value={formData.telefone}
                                    onChangeText={(t) => handleInputChange('telefone', t)}
                                    placeholder="(98) 9XXXX-XXXX"
                                    keyboardType="phone-pad"
                                    className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-medium text-green-900"
                                />
                            </View>
                        </View>
                    )}

                    {step === 2 && (
                        <View className="space-y-4 gap-4">
                            <View>
                                <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Origem</Text>
                                <TextInput
                                    value={formData.origem}
                                    onChangeText={(t) => handleInputChange('origem', t)}
                                    placeholder="Ex: Renascença"
                                    className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-medium text-green-900"
                                />
                            </View>
                            <View>
                                <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Destino</Text>
                                <TextInput
                                    value={formData.destino}
                                    onChangeText={(t) => handleInputChange('destino', t)}
                                    placeholder="Ex: Centro"
                                    className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-medium text-green-900"
                                />
                            </View>
                            <View className="flex-row gap-4">
                                <View className="flex-1">
                                    <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Data</Text>
                                    <TextInput
                                        value={formData.data}
                                        onChangeText={(t) => handleInputChange('data', t)}
                                        placeholder="YYYY-MM-DD"
                                        className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-medium text-green-900"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Horário</Text>
                                    <TextInput
                                        value={formData.horario}
                                        onChangeText={(t) => handleInputChange('horario', t)}
                                        placeholder="HH:MM"
                                        className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-medium text-green-900"
                                    />
                                </View>
                            </View>
                            <View>
                                <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Vagas: {formData.assentos}</Text>
                                <View className="flex-row gap-2">
                                    {[1, 2, 3, 4].map(num => (
                                        <TouchableOpacity
                                            key={num}
                                            onPress={() => handleInputChange('assentos', num)}
                                            className={`w-10 h-10 rounded-lg items-center justify-center ${formData.assentos === num ? 'bg-green-700' : 'bg-gray-100'}`}
                                        >
                                            <Text className={`font-bold ${formData.assentos === num ? 'text-white' : 'text-gray-600'}`}>{num}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                    )}

                    {step === 3 && (
                        <View className="space-y-4 gap-4">
                            <View>
                                <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Veículo</Text>
                                <TextInput
                                    value={formData.veiculo}
                                    onChangeText={(t) => handleInputChange('veiculo', t)}
                                    placeholder="Modelo e cor do carro"
                                    className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-medium text-green-900"
                                />
                            </View>
                            <View className="flex-row gap-4">
                                <View className="flex-1">
                                    <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Placa</Text>
                                    <TextInput
                                        value={formData.placa}
                                        onChangeText={(t) => handleInputChange('placa', t.toUpperCase())}
                                        placeholder="ABC1D23"
                                        className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-medium text-green-900"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Valor (R$)</Text>
                                    <TextInput
                                        value={formData.preco}
                                        onChangeText={(t) => handleInputChange('preco', t)}
                                        placeholder="0,00"
                                        keyboardType="numeric"
                                        className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-medium text-green-900"
                                    />
                                </View>
                            </View>
                            <View className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <Text className="font-bold text-gray-700">Ar Condicionado</Text>
                                <Switch
                                    value={formData.arCondicionado}
                                    onValueChange={(v) => handleInputChange('arCondicionado', v)}
                                    trackColor={{ false: "#e5e7eb", true: "#15803d" }}
                                />
                            </View>
                            <View>
                                <Text className="text-xs font-bold text-gray-400 uppercase mb-2">Observações</Text>
                                <TextInput
                                    value={formData.observacoes}
                                    onChangeText={(t) => handleInputChange('observacoes', t)}
                                    placeholder="Regras da viagem..."
                                    multiline
                                    className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-medium text-green-900 h-24"
                                    textAlignVertical="top"
                                />
                            </View>
                        </View>
                    )}

                </View>
            </ScrollView>

            {/* Footer Navigation */}
            <View className="absolute bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-100 flex-row justify-between items-center shadow-lg">
                {step > 1 ? (
                    <TouchableOpacity onPress={prevStep} className="p-4">
                        <Text className="font-bold text-gray-400">Voltar</Text>
                    </TouchableOpacity>
                ) : (
                    <View />
                )}

                {step < 3 ? (
                    <TouchableOpacity
                        onPress={nextStep}
                        className="bg-green-700 px-8 py-4 rounded-2xl shadow-lg shadow-green-900/20"
                    >
                        <Text className="font-black text-white">Continuar</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-yellow-400 px-8 py-4 rounded-2xl shadow-lg shadow-yellow-500/20 flex-row items-center gap-2"
                    >
                        <Feather name={isSubmitting ? "loader" : "check"} size={20} color="#064e3b" />
                        <Text className="font-black text-green-900">{isSubmitting ? 'ENVIANDO...' : 'PUBLICAR'}</Text>
                    </TouchableOpacity>
                )}
            </View>

        </SafeAreaView>
    );
}
