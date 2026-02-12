import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';

interface PagamentoContentProps {
    state: {
        metodoPagamento: string;
        setMetodoPagamento: (m: string) => void;
        descontoAplicado: boolean;
        setDescontoAplicado: (d: boolean) => void;
        pagamentoFinalizado: boolean;
        setPagamentoFinalizado: (pf: boolean) => void;
        valorOriginal: number;
        valorComDesconto: number;
        corridaSelecionada: any;
        isLoading: boolean;
    };
    handlers: {
        handleFinalizarPagamento: () => void;
    };
}

export default function PagamentoContent({ state, handlers }: PagamentoContentProps) {
    const router = useRouter();
    const {
        metodoPagamento,
        setMetodoPagamento,
        pagamentoFinalizado,
        valorComDesconto,
        corridaSelecionada,
        isLoading
    } = state;

    const { handleFinalizarPagamento } = handlers;

    const handleCopyPix = async () => {
        await Clipboard.setStringAsync('00020126360014BR.GOV.BCB.PIX0114+5598988888888520400005303986540510.005802BR5913BoraSio Transp6008SAO LUIS62070503***6304E2B1');
        Alert.alert("Sucesso", "Chave PIX (Copia e Cola) copiada para a área de transferência!");
    };

    const handleBackToHome = () => {
        router.replace('/');
    };

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#004d2b" />
                <Text className="mt-4 text-[#004d2b] font-bold">Carregando detalhes...</Text>
            </View>
        );
    }

    if (pagamentoFinalizado) {
        return (
            <View className="flex-1 justify-center items-center p-6">
                <View className="bg-white p-8 rounded-full mb-6 shadow-sm">
                    <Feather name="check" size={80} color="#004d2b" />
                </View>
                <Text className="text-2xl font-black text-[#004d2b] text-center mb-2">Pagamento Realizado!</Text>
                <Text className="text-gray-600 text-center mb-10 px-4">Sua corrida foi confirmada com sucesso. O motorista já recebeu sua solicitação e está a caminho do ponto de embarque.</Text>
                
                <TouchableOpacity 
                    className="bg-[#004d2b] w-full py-5 rounded-3xl items-center shadow-lg"
                    onPress={handleBackToHome}
                >
                    <Text className="text-white font-black text-lg">Entendido, ir para Início</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
            {/* Trip Summary Card */}
            <View className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
                <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Resumo da Corrida</Text>
                
                <View className="flex-row items-center mb-5">
                    <View className="w-12 h-12 bg-green-50 rounded-2xl items-center justify-center mr-4">
                        <Feather name="map-pin" size={24} color="#004d2b" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-gray-400 text-xs font-bold uppercase mb-0.5">Destino</Text>
                        <Text className="text-[#004d2b] font-black text-lg" numberOfLines={1}>{corridaSelecionada?.destino}</Text>
                    </View>
                </View>

                <View className="h-[1px] bg-gray-100 w-full mb-5" />

                <View className="flex-row justify-between items-end">
                    <View>
                        <Text className="text-gray-400 text-xs font-bold uppercase mb-1">Total a Pagar</Text>
                        <Text className="text-3xl font-black text-[#004d2b]">R$ {valorComDesconto.toFixed(2).replace('.', ',')}</Text>
                    </View>
                    <View className="bg-green-50 px-4 py-2 rounded-2xl border border-green-100">
                        <Text className="text-[#004d2b] text-xs font-black uppercase tracking-tighter">{corridaSelecionada?.veiculo}</Text>
                    </View>
                </View>
            </View>

            {/* Payment Method Selection */}
            <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-2">Forma de Pagamento</Text>
            
            <View className="flex-row gap-x-4 mb-8">
                <TouchableOpacity 
                    onPress={() => setMetodoPagamento('credito')}
                    activeOpacity={0.7}
                    className={`flex-1 p-5 rounded-3xl border-2 items-center justify-center ${metodoPagamento === 'credito' ? 'bg-white border-[#004d2b] shadow-md' : 'bg-gray-50 border-transparent opacity-60'}`}
                >
                    <Feather name="credit-card" size={28} color={metodoPagamento === 'credito' ? '#004d2b' : '#9ca3af'} />
                    <Text className={`mt-3 font-black text-xs uppercase tracking-widest ${metodoPagamento === 'credito' ? 'text-[#004d2b]' : 'text-gray-400'}`}>Cartão</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => setMetodoPagamento('pix')}
                    activeOpacity={0.7}
                    className={`flex-1 p-5 rounded-3xl border-2 items-center justify-center ${metodoPagamento === 'pix' ? 'bg-white border-[#004d2b] shadow-md' : 'bg-gray-50 border-transparent opacity-60'}`}
                >
                    <Feather name="zap" size={28} color={metodoPagamento === 'pix' ? '#004d2b' : '#9ca3af'} />
                    <Text className={`mt-3 font-black text-xs uppercase tracking-widest ${metodoPagamento === 'pix' ? 'text-[#004d2b]' : 'text-gray-400'}`}>PIX</Text>
                </TouchableOpacity>
            </View>

            {/* Specific Content */}
            {metodoPagamento === 'credito' && (
                <View className="bg-white p-7 rounded-[40px] border border-gray-100 shadow-sm mb-8">
                    <Text className="text-[#004d2b] font-black text-xl mb-6">Dados do Cartão</Text>
                    
                    <View className="mb-5">
                        <Text className="text-gray-400 text-[10px] font-bold uppercase mb-2 ml-1">Número do Cartão</Text>
                        <TextInput 
                            placeholder="0000 0000 0000 0000"
                            placeholderTextColor="#d1d5db"
                            className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-gray-800 font-bold text-base"
                            keyboardType="numeric"
                        />
                    </View>

                    <View className="flex-row gap-x-4">
                        <View className="flex-1">
                            <Text className="text-gray-400 text-[10px] font-bold uppercase mb-2 ml-1">Validade</Text>
                            <TextInput 
                                placeholder="MM/AA"
                                placeholderTextColor="#d1d5db"
                                className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-gray-800 font-bold text-base text-center"
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-400 text-[10px] font-bold uppercase mb-2 ml-1">CVV</Text>
                            <TextInput 
                                placeholder="000"
                                placeholderTextColor="#d1d5db"
                                className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-gray-800 font-bold text-base text-center"
                                keyboardType="numeric"
                                secureTextEntry
                            />
                        </View>
                    </View>
                </View>
            )}

            {metodoPagamento === 'pix' && (
                <View className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm mb-8 items-center">
                    <View className="bg-green-50 p-8 rounded-[40px] mb-6 shadow-inner">
                        <MaterialCommunityIcons name="qrcode-scan" size={140} color="#004d2b" />
                    </View>
                    <Text className="text-[#004d2b] font-black text-xl mb-3">Pague com PIX</Text>
                    <Text className="text-gray-500 text-center text-sm mb-8 px-6 leading-5">Aponte a câmera do seu aplicativo de banco para o QR Code acima ou utilize a chave abaixo.</Text>
                    
                    <TouchableOpacity 
                        onPress={handleCopyPix}
                        activeOpacity={0.7}
                        className="flex-row items-center border-2 border-dashed border-green-100 bg-green-50/30 p-5 rounded-2xl w-full justify-center"
                    >
                        <Feather name="copy" size={20} color="#004d2b" />
                        <Text className="text-[#004d2b] font-black ml-3 uppercase tracking-widest text-xs">Copiar Código PIX</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Bottom Button */}
            {!pagamentoFinalizado && (
                <TouchableOpacity 
                    onPress={handleFinalizarPagamento}
                    activeOpacity={0.8}
                    className="bg-[#004d2b] flex-row py-5 rounded-[25px] items-center justify-center shadow-2xl mb-12"
                >
                    <Text className="text-white font-black text-lg mr-3">Confirmar e Pagar</Text>
                    <Feather name="arrow-right" size={24} color="white" />
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}