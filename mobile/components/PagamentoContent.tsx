import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import BoletoContent from './BoletoContent';

interface PagamentoContentProps {
    state: {
        metodoPagamento: string;
        setMetodoPagamento: (m: string) => void;
        descontoAplicado: boolean;
        setDescontoAplicado: (d: boolean) => void;
        pagamentoFinalizado: boolean;
        setPagamentoFinalizado: (f: boolean) => void;
        valorOriginal: number;
        valorComDesconto: number;
        corridaSelecionada: any;
        codigoBarrasNumerico: string;
        isLoading: boolean;
    };
    handlers: {
        handleDownloadPdf: () => Promise<void>;
        handleCopiarLinha: () => Promise<void>;
        formatarLinhaDigitavel: (c: string) => string;
        gerarCodigoBarrasVisual: () => string;
    };
}

export default function PagamentoContent({ state, handlers }: PagamentoContentProps) {
    const router = useRouter();
    const [codigoVoucher, setCodigoVoucher] = useState('');
    const [mensagemVoucher, setMensagemVoucher] = useState('');
    const [tipoMensagemVoucher, setTipoMensagemVoucher] = useState<'success' | 'error' | ''>('');

    const { 
        metodoPagamento, setMetodoPagamento, 
        descontoAplicado, setDescontoAplicado, 
        pagamentoFinalizado, setPagamentoFinalizado,
        valorOriginal, valorComDesconto,
        corridaSelecionada, isLoading 
    } = state;

    const handleAplicarVoucher = () => {
        if (!codigoVoucher.trim()) {
            setMensagemVoucher('Insira um voucher');
            setTipoMensagemVoucher('error');
            return;
        }

        if (codigoVoucher.toUpperCase() !== 'OUT31/10') {
            setMensagemVoucher('Voucher inválido');
            setTipoMensagemVoucher('error');
            setDescontoAplicado(false);
            return;
        }

        if (valorOriginal < 5.00) {
            setMensagemVoucher('Valor mínimo R$ 5,00');
            setTipoMensagemVoucher('error');
            setDescontoAplicado(false);
        } else {
            const perc = valorOriginal > 10.00 ? 30 : 20;
            setMensagemVoucher(`Voucher aplicado! ${perc}% de desconto`);
            setTipoMensagemVoucher('success');
            setDescontoAplicado(true);
        }
    };

    const handleFinalizar = () => {
        setPagamentoFinalizado(true);
        const valorFinal = descontoAplicado ? valorComDesconto : valorOriginal;
        Alert.alert(
            "Sucesso", 
            `Pagamento de R$ ${valorFinal.toFixed(2).replace('.', ',')} realizado!`,
            [{ text: "OK", onPress: () => router.push("/") }]
        );
    };

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#004d2b" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1"
        >
            <ScrollView 
                className="flex-1 px-4 py-6" 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <View className="bg-white rounded-[32px] shadow-sm border border-green-50 overflow-hidden mb-6">
                    <View className="p-6">
                        <Text className="text-2xl font-black text-[#004d2b] mb-6">Pagamento</Text>

                        {/* Card de Informação da Corrida */}
                        <View className="mb-6 p-4 bg-green-50/50 rounded-2xl border border-green-100">
                            <Text className="text-[10px] font-black text-[#004d2b] uppercase tracking-widest mb-3">Detalhes da Viagem</Text>
                            <View className="flex-row flex-wrap">
                                <View className="w-1/2 mb-3">
                                    <Text className="text-[8px] text-gray-400 font-bold uppercase">De</Text>
                                    <Text className="text-gray-800 text-xs font-bold" numberOfLines={1}>{corridaSelecionada?.origem}</Text>
                                </View>
                                <View className="w-1/2 mb-3">
                                    <Text className="text-[8px] text-gray-400 font-bold uppercase">Para</Text>
                                    <Text className="text-gray-800 text-xs font-bold" numberOfLines={1}>{corridaSelecionada?.destino}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Métodos de Pagamento */}
                        <View className="gap-y-3 mb-8">
                            {[
                                { id: 'credito', label: 'Cartão de crédito', icon: 'credit-card', lib: Feather },
                                { id: 'pix', label: 'Pix', icon: 'qrcode', lib: MaterialCommunityIcons },
                                { id: 'boleto', label: 'Boleto', icon: 'barcode', lib: MaterialCommunityIcons },
                            ].map((m) => {
                                const Icon = m.lib;
                                const active = metodoPagamento === m.id;
                                return (
                                    <TouchableOpacity 
                                        key={m.id}
                                        onPress={() => setMetodoPagamento(m.id)}
                                        className={`flex-row items-center p-4 rounded-2xl border ${active ? 'border-[#FFD700] bg-green-50/30' : 'border-gray-50 bg-white'}`}
                                    >
                                        <View className={`w-10 h-10 rounded-xl items-center justify-center mr-4 ${active ? 'bg-green-100' : 'bg-gray-50'}`}>
                                            <Icon name={m.icon as any} size={20} color="#004d2b" />
                                        </View>
                                        <Text className={`font-bold text-sm ${active ? 'text-[#004d2b]' : 'text-gray-400'}`}>{m.label}</Text>
                                        {active && <View className="ml-auto w-2 h-2 rounded-full bg-[#FFD700]" />}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Conteúdo Dinâmico */}
                        {metodoPagamento === 'credito' && (
                            <View className="mb-8 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                <TextInput placeholder="Número do Cartão" className="bg-white p-4 rounded-xl mb-4 border border-gray-100 font-bold" keyboardType="numeric" />
                                <View className="flex-row gap-x-4">
                                    <TextInput placeholder="MM/AA" className="flex-1 bg-white p-4 rounded-xl border border-gray-100 font-bold text-center" maxLength={5} />
                                    <TextInput placeholder="CVC" className="flex-1 bg-white p-4 rounded-xl border border-gray-100 font-bold text-center" secureTextEntry maxLength={4} />
                                </View>
                            </View>
                        )}

                        {metodoPagamento === 'pix' && (
                            <View className="mb-8 items-center bg-green-50/20 p-6 rounded-3xl border border-green-50">
                                <Image 
                                    source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PIXMOCK` }} 
                                    className="w-40 h-40 bg-white p-2 rounded-2xl mb-4"
                                />
                                <Text className="font-black text-2xl text-[#004d2b]">R$ {(descontoAplicado ? valorComDesconto : valorOriginal).toFixed(2).replace('.', ',')}</Text>
                            </View>
                        )}

                        {metodoPagamento === 'boleto' && (
                            <BoletoContent 
                                valor={descontoAplicado ? valorComDesconto : valorOriginal}
                                corrida={corridaSelecionada}
                                handlers={handlers}
                                codigoBarrasNumerico={state.codigoBarrasNumerico}
                            />
                        )}

                        {/* Voucher */}
                        <View className="mb-8">
                            <Text className="text-[10px] font-black text-[#004d2b] uppercase tracking-[2px] mb-4">Voucher</Text>
                            <View className="flex-row gap-x-2">
                                <TextInput 
                                    className="flex-1 bg-gray-50 p-4 rounded-xl font-bold uppercase border border-gray-100 text-xs"
                                    placeholder="CUPOM"
                                    value={codigoVoucher}
                                    onChangeText={setCodigoVoucher}
                                />
                                <TouchableOpacity onPress={handleAplicarVoucher} className="bg-green-600 px-6 rounded-xl justify-center">
                                    <Text className="text-white font-black text-[10px]">OK</Text>
                                </TouchableOpacity>
                            </View>
                            {mensagemVoucher !== '' && (
                                <Text className={`mt-2 text-[10px] font-bold ml-1 ${tipoMensagemVoucher === 'success' ? 'text-green-600' : 'text-red-500'}`}>{mensagemVoucher}</Text>
                            )}
                        </View>

                        {/* Totais */}
                        <View className="border-t border-gray-50 pt-6">
                            <View className="flex-row justify-between mb-2">
                                <Text className="text-gray-400 font-bold text-[10px] uppercase">Subtotal</Text>
                                <Text className="text-gray-600 font-bold text-xs">R$ {valorOriginal.toFixed(2).replace('.', ',')}</Text>
                            </View>
                            {descontoAplicado && (
                                <View className="flex-row justify-between mb-2">
                                    <Text className="text-green-500 font-bold text-[10px] uppercase">Desconto</Text>
                                    <Text className="text-green-500 font-bold text-xs">-R$ {(valorOriginal - valorComDesconto).toFixed(2).replace('.', ',')}</Text>
                                </View>
                            )}
                            <View className="flex-row justify-between mt-4">
                                <Text className="text-[#004d2b] font-black text-xl uppercase tracking-tighter">Total</Text>
                                <Text className="text-[#004d2b] font-black text-2xl tracking-tighter">
                                    R$ {(descontoAplicado ? valorComDesconto : valorOriginal).toFixed(2).replace('.', ',')}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity 
                    className={`w-full bg-[#FFD700] p-5 rounded-2xl flex-row justify-center items-center shadow-lg ${pagamentoFinalizado ? 'opacity-40' : ''}`}
                    onPress={handleFinalizar}
                    disabled={pagamentoFinalizado}
                >
                    <Text className="text-[#004d2b] font-black text-lg uppercase tracking-widest mr-2">Finalizar</Text>
                    <Feather name="arrow-right" size={20} color="#004d2b" />
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
