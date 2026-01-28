import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import "../../global.css";

type Corrida = {
    id: number;
    origem: string;
    destino: string;
    assentos: number;
    preco: string;
    motorista: string;
    veiculo: string;
};

export default function PagamentoScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { width } = useWindowDimensions();

    const [metodoPagamento, setMetodoPagamento] = useState('pix');
    const [codigoVoucher, setCodigoVoucher] = useState('');
    const [descontoAplicado, setDescontoAplicado] = useState(false);
    const [pagamentoFinalizado, setPagamentoFinalizado] = useState(false);
    const [valorOriginal, setValorOriginal] = useState(15.90);
    const [valorComDesconto, setValorComDesconto] = useState(15.90);
    const [isLoading, setIsLoading] = useState(false);

    // Mocked ride info (usually would come from params or local storage)
    const [corrida, setCorrida] = useState<Corrida>({
        id: 1,
        origem: "Renascença",
        destino: "Centro Histórico",
        assentos: 1,
        preco: "R$ 15,90",
        motorista: "João Silva",
        veiculo: "Fiat Cronos - Branco"
    });

    useEffect(() => {
        if (params.valor) {
            const val = parseFloat(params.valor as string);
            setValorOriginal(val);
            setValorComDesconto(val);
        }
    }, [params]);

    const aplicarVoucher = () => {
        if (codigoVoucher.toUpperCase() === 'OUT31/10') {
            const desconto = valorOriginal * 0.3;
            setValorComDesconto(valorOriginal - desconto);
            setDescontoAplicado(true);
            Alert.alert("Sucesso", "Cupom de 30% aplicado!");
        } else {
            Alert.alert("Erro", "Cupom inválido");
            setDescontoAplicado(false);
        }
    };

    const finalizarPagamento = () => {
        setIsLoading(true);
        // Simulating API call
        setTimeout(() => {
            setIsLoading(false);
            setPagamentoFinalizado(true);
            Alert.alert("Sucesso", "Pagamento realizado com sucesso!", [
                { text: "OK", onPress: () => router.push("/") }
            ]);
        }, 2000);
    };

    const getValorExibicao = (valor: number) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <Stack.Screen options={{
                headerShown: true,
                title: "Pagamento",
                headerStyle: { backgroundColor: '#064e3b' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            }} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>

                    {/* Valor de Destaque */}
                    <View className="items-center mb-8">
                        <Text className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-1">Total a Pagar</Text>
                        <Text className="text-4xl font-black text-green-900">
                            {getValorExibicao(descontoAplicado ? valorComDesconto : valorOriginal)}
                        </Text>
                        {descontoAplicado && (
                            <Text className="text-gray-400 line-through text-sm">
                                {getValorExibicao(valorOriginal)}
                            </Text>
                        )}
                    </View>

                    {/* Resumo da Corrida */}
                    <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-8">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-green-100 p-2 rounded-xl mr-3">
                                <Feather name="map" size={18} color="#064e3b" />
                            </View>
                            <Text className="text-green-900 font-black text-base">Resumo do Trajeto</Text>
                        </View>

                        <View className="space-y-4 gap-3">
                            <View className="flex-row items-center">
                                <View className="w-2 h-2 rounded-full bg-green-500 mr-3" />
                                <Text className="text-gray-600 flex-1 font-medium">{corrida.origem}</Text>
                            </View>
                            <View className="flex-row items-center">
                                <View className="w-2 h-2 rounded-full bg-red-400 mr-3" />
                                <Text className="text-gray-600 flex-1 font-medium">{corrida.destino}</Text>
                            </View>
                        </View>

                        <View className="h-[1px] bg-gray-100 my-4" />

                        <View className="flex-row justify-between items-center">
                            <View className="flex-row items-center">
                                <Feather name="user" size={14} color="#6b7280" />
                                <Text className="text-gray-400 text-xs ml-1">{corrida.motorista}</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Feather name="truck" size={14} color="#6b7280" />
                                <Text className="text-gray-400 text-xs ml-1">{corrida.veiculo}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Métodos de Pagamento */}
                    <Text className="text-lg font-black text-gray-900 mb-4 ml-1">Método de Pagamento</Text>
                    <View className="flex-row flex-wrap gap-3 mb-8">
                        {[
                            { id: 'pix', label: 'Pix', icon: 'zap' },
                            { id: 'cartao', label: 'Cartão', icon: 'credit-card' },
                            { id: 'boleto', label: 'Boleto', icon: 'hash' }
                        ].map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                onPress={() => setMetodoPagamento(method.id)}
                                className={`flex-1 min-w-[30%] p-4 rounded-2xl border items-center justify-center ${metodoPagamento === method.id ? "bg-green-900 border-green-900" : "bg-white border-gray-200"
                                    }`}
                            >
                                <Feather name={method.icon as any} size={20} color={metodoPagamento === method.id ? "#fff" : "#064e3b"} />
                                <Text className={`font-bold mt-2 text-xs ${metodoPagamento === method.id ? "text-white" : "text-green-900"}`}>
                                    {method.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Detalhes do Método */}
                    {metodoPagamento === 'pix' && (
                        <View className="bg-white p-8 rounded-3xl border border-gray-100 items-center mb-8">
                            <Image
                                source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BORASIO_MOCK_PIX` }}
                                className="w-48 h-48 mb-6"
                            />
                            <Text className="text-gray-500 text-center text-sm mb-4 leading-relaxed">
                                Escaneie o código acima no app do seu banco ou copie a chave abaixo.
                            </Text>
                            <TouchableOpacity
                                className="bg-gray-50 px-6 py-3 rounded-full border border-gray-200 flex-row items-center"
                                onPress={() => Alert.alert("Copiado", "Chave Pix copiada para a área de transferência!")}
                            >
                                <Feather name="copy" size={16} color="#064e3b" />
                                <Text className="text-green-900 font-bold ml-2">Copiar Chave Pix</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {metodoPagamento === 'cartao' && (
                        <View className="bg-white p-6 rounded-3xl border border-gray-100 mb-8 space-y-4 gap-4">
                            <View>
                                <Text className="text-gray-400 font-bold text-xs mb-2 uppercase ml-1">Número do Cartão</Text>
                                <View className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex-row items-center">
                                    <Feather name="credit-card" size={18} color="#9ca3af" />
                                    <TextInput placeholder="0000 0000 0000 0000" className="flex-1 ml-3 font-medium" keyboardType="numeric" />
                                </View>
                            </View>
                            <View className="flex-row space-x-4">
                                <View className="flex-1">
                                    <Text className="text-gray-400 font-bold text-xs mb-2 uppercase ml-1">Validade</Text>
                                    <TextInput placeholder="MM/AA" className="bg-gray-50 p-4 rounded-2xl border border-gray-100 font-medium" keyboardType="numeric" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-400 font-bold text-xs mb-2 uppercase ml-1">CVV</Text>
                                    <TextInput placeholder="123" className="bg-gray-50 p-4 rounded-2xl border border-gray-100 font-medium" keyboardType="numeric" secureTextEntry />
                                </View>
                            </View>
                        </View>
                    )}

                    {metodoPagamento === 'boleto' && (
                        <View className="bg-white p-6 rounded-3xl border border-gray-100 items-center mb-8">
                            <View className="bg-yellow-50 p-4 rounded-full mb-4">
                                <Feather name="file-text" size={32} color="#b45309" />
                            </View>
                            <Text className="text-gray-900 font-black text-center mb-2">Boleto Bancário</Text>
                            <Text className="text-gray-500 text-center text-sm mb-6 px-4">
                                O boleto será gerado e enviado para o seu e-mail após a confirmação.
                            </Text>
                            <TouchableOpacity
                                className="w-full bg-gray-50 py-4 rounded-2xl border border-gray-200 items-center"
                                onPress={() => Alert.alert("Sucesso", "Boleto enviado para seu e-mail!")}
                            >
                                <Text className="text-green-900 font-bold">Gerar e Visualizar</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Voucher */}
                    <View className="mb-12">
                        <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Cupom de Desconto</Text>
                        <View className="flex-row gap-2">
                            <View className="flex-1 bg-white p-4 rounded-2xl border border-gray-200 flex-row items-center">
                                <Feather name="tag" size={18} color="#9ca3af" />
                                <TextInput
                                    placeholder="EX: OUT31/10"
                                    className="flex-1 ml-3 font-bold text-green-900"
                                    autoCapitalize="characters"
                                    value={codigoVoucher}
                                    onChangeText={setCodigoVoucher}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={aplicarVoucher}
                                className="bg-green-700 px-6 rounded-2xl items-center justify-center opacity-90"
                            >
                                <Text className="text-white font-black text-xs">APLICAR</Text>
                            </TouchableOpacity>
                        </View>
                        {descontoAplicado && (
                            <Text className="text-green-600 text-xs font-bold mt-2 ml-1">✓ Cupom OUT31/10 aplicado!</Text>
                        )}
                    </View>

                </ScrollView>

                {/* Floating Action Button */}
                <View className="p-6 bg-white border-t border-gray-100">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        disabled={isLoading || pagamentoFinalizado}
                        onPress={finalizarPagamento}
                        className={`bg-[#fef08a] py-5 rounded-3xl items-center flex-row justify-center shadow-xl shadow-yellow-400/50 ${(isLoading || pagamentoFinalizado) ? "opacity-50" : ""
                            }`}
                    >
                        {isLoading ? (
                            <Text className="text-[#064e3b] font-black text-lg">PROCESSANDO...</Text>
                        ) : (
                            <>
                                <Text className="text-[#064e3b] font-black text-lg mr-2 uppercase">
                                    Finalizar Pagamento
                                </Text>
                                <Feather name="chevron-right" size={24} color="#064e3b" />
                            </>
                        )}
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
