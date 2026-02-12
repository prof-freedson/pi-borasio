
import React, { useState, useEffect } from "react";
import {
    View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert, SafeAreaView, Modal
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
// Ícones usando Expo Vector Icons/Lucide
import {
    ArrowLeft, CreditCard, Ticket, CheckCircle, Zap, ShieldCheck, Lock, AlertTriangle, AlertCircle
} from "lucide-react-native";
import { mockData } from "../../../data/mockData";

const API_URL = "http://10.0.2.2:3001"; // Ajuste para seu ambiente (localhost no emulador Android)

type CaronaDetalhes = {
    id: number;
    origem: string;
    destino: string;
    valor: number;
    motorista: string;
    veiculo: string;
    data: string;
};

export default function PagamentoCaronaScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [loading, setLoading] = useState(true);
    const [processando, setProcessando] = useState(false);
    const [pagamentoConcluido, setPagamentoConcluido] = useState(false);
    const [detalhes, setDetalhes] = useState<CaronaDetalhes | null>(null);

    // Estado do Cartão
    const [numeroCartao, setNumeroCartao] = useState("");
    const [validade, setValidade] = useState("");
    const [cvc, setCvc] = useState("");
    const [metodoPagamento, setMetodoPagamento] = useState<'credito' | 'dinheiro'>('credito');
    const [erroPagamento, setErroPagamento] = useState("");

    // Simular busca de detalhes da carona usando mockData
    useEffect(() => {
        const ride = mockData.ofertasCaronas.find(c => c.id === Number(id));
        if (ride) {
            const motorista = mockData.motoristas.find(m => m.id === ride.motoristaId);
            setDetalhes({
                id: ride.id,
                origem: ride.origem,
                destino: ride.destino,
                valor: ride.valor,
                motorista: motorista?.nome || "Motorista App",
                veiculo: motorista?.veiculo || "Carro Padrão",
                data: new Date(ride.dataHora).toLocaleDateString('pt-BR')
            });
            setLoading(false);
        } else {
            Alert.alert("Erro", "Carona não encontrada");
            router.back();
        }
    }, [id]);

    const handlePagamento = async () => {
        setErroPagamento("");
        setProcessando(true);

        try {
            // Validação simples de cartão
            if (metodoPagamento === 'credito' && numeroCartao.length < 13) {
                throw new Error("Número do cartão inválido.");
            }

            // Simula processamento
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Sucesso no pagamento
            setPagamentoConcluido(true);
            setProcessando(false);

            Alert.alert("Pagamento Aprovado", "Aguardando confirmação do motorista...");

            // Simula aceitação do motorista após 10 segundos
            setTimeout(() => {
                Alert.alert(
                    "Corrida Aceita! 🚗",
                    `O motorista ${detalhes?.motorista} está a caminho!`,
                    [
                        { text: "Acompanhar", onPress: () => router.push(`/corridas/${id}/aguardando` as any) }
                    ]
                );
            }, 10000); // 10 segundos

        } catch (err: any) {
            setProcessando(false);
            setErroPagamento(err.message);
            Alert.alert("Erro no Pagamento", err.message);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-green-50">
                <ActivityIndicator size="large" color="#004d2b" />
                <Text className="mt-4 text-[#004d2b] font-bold">Carregando detalhes...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-green-50">
            <View className="bg-[#004d2b] px-6 pt-6 pb-6 border-b border-green-800 rounded-b-[32px] z-10">
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <ArrowLeft color="#fff" size={24} />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold uppercase tracking-wider">Checkout</Text>
                </View>
                <Text className="text-green-200 text-xs font-bold uppercase tracking-widest text-center">
                    Ambiente Seguro <ShieldCheck size={10} color="#bbf7d0" />
                </Text>
            </View>

            <ScrollView className="px-6 pt-6" showsVerticalScrollIndicator={false}>

                {/* Resumo da Corrida */}
                <View className="bg-white p-6 rounded-[32px] mb-6 shadow-sm border border-green-100">
                    <Text className="text-[#004d2b] font-black uppercase text-xs tracking-widest mb-4">Resumo da Viagem</Text>

                    <View className="flex-row justify-between mb-4">
                        <View>
                            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Origem</Text>
                            <Text className="text-[#004d2b] font-bold text-sm">{detalhes?.origem}</Text>
                        </View>
                        <View className="items-end">
                            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Valor</Text>
                            <Text className="text-[#004d2b] font-black text-xl">R$ {detalhes?.valor.toFixed(2).replace('.', ',')}</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Destino</Text>
                        <Text className="text-[#004d2b] font-bold text-sm">{detalhes?.destino}</Text>
                    </View>
                </View>

                {/* Métodos de Pagamento */}
                <Text className="text-gray-400 font-black uppercase text-xs tracking-widest mb-4 ml-2">Pagamento</Text>
                <View className="flex-row justify-between mb-6">
                    <TouchableOpacity
                        onPress={() => setMetodoPagamento('credito')}
                        className={`flex-1 mr-2 p-4 rounded-2xl border items-center ${metodoPagamento === 'credito' ? 'bg-[#004d2b] border-[#004d2b]' : 'bg-white border-green-100'}`}
                    >
                        <CreditCard size={24} color={metodoPagamento === 'credito' ? '#fff' : '#004d2b'} />
                        <Text className={`text-[10px] font-bold uppercase mt-2 ${metodoPagamento === 'credito' ? 'text-white' : 'text-[#004d2b]'}`}>Cartão</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setMetodoPagamento('dinheiro')}
                        className={`flex-1 ml-2 p-4 rounded-2xl border items-center ${metodoPagamento === 'dinheiro' ? 'bg-[#004d2b] border-[#004d2b]' : 'bg-white border-green-100'}`}
                    >
                        <Ticket size={24} color={metodoPagamento === 'dinheiro' ? '#fff' : '#004d2b'} />
                        <Text className={`text-[10px] font-bold uppercase mt-2 ${metodoPagamento === 'dinheiro' ? 'text-white' : 'text-[#004d2b]'}`}>Dinheiro</Text>
                    </TouchableOpacity>
                </View>

                {/* Formulário Cartão */}
                {metodoPagamento === 'credito' && (
                    <View className="bg-white p-6 rounded-[32px] mb-6 border border-green-50 shadow-sm animate-pulse">
                        <View className="flex-row items-center mb-4">
                            <CreditCard size={16} color="#004d2b" />
                            <Text className="ml-2 text-[#004d2b] font-bold text-xs uppercase tracking-widest">Dados do Cartão</Text>
                        </View>

                        <View className="mb-4">
                            <Text className="text-[10px] text-gray-400 font-bold uppercase mb-1">Número (Teste: 4242...)</Text>
                            <TextInput
                                className="bg-gray-50 p-4 rounded-xl text-[#004d2b] font-bold border border-gray-100"
                                placeholder="0000 0000 0000 0000"
                                keyboardType="numeric"
                                value={numeroCartao}
                                onChangeText={setNumeroCartao}
                            />
                        </View>

                        <View className="flex-row space-x-4">
                            <View className="flex-1">
                                <Text className="text-[10px] text-gray-400 font-bold uppercase mb-1">Validade</Text>
                                <TextInput
                                    className="bg-gray-50 p-4 rounded-xl text-[#004d2b] font-bold border border-gray-100"
                                    placeholder="MM/AA"
                                    value={validade}
                                    onChangeText={setValidade}
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="text-[10px] text-gray-400 font-bold uppercase mb-1">CVC</Text>
                                <TextInput
                                    className="bg-gray-50 p-4 rounded-xl text-[#004d2b] font-bold border border-gray-100"
                                    placeholder="123"
                                    keyboardType="numeric"
                                    value={cvc}
                                    onChangeText={setCvc}
                                    secureTextEntry
                                />
                            </View>
                        </View>
                    </View>
                )}

                {/* Mensagem de Erro */}
                {erroPagamento ? (
                    <View className="bg-red-50 p-4 rounded-2xl mb-6 flex-row items-center border border-red-100">
                        <AlertTriangle color="#ef4444" size={20} />
                        <Text className="ml-2 text-red-600 font-bold text-xs flex-1">{erroPagamento}</Text>
                    </View>
                ) : null}

                {/* Botão Finalizar */}
                <TouchableOpacity
                    className={`py-5 rounded-2xl items-center shadow-lg mb-8 flex-row justify-center space-x-2 ${processando || pagamentoConcluido ? 'bg-green-800' : 'bg-yellow-400'
                        }`}
                    onPress={handlePagamento}
                    disabled={processando || pagamentoConcluido}
                >
                    {processando ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : pagamentoConcluido ? (
                        <CheckCircle color="#fff" size={20} />
                    ) : (
                        <Lock color="#004d2b" size={18} />
                    )}

                    <Text className={`font-black uppercase tracking-widest text-sm ${processando || pagamentoConcluido ? 'text-white' : 'text-[#004d2b]'
                        }`}>
                        {processando ? "Processando..." : pagamentoConcluido ? "Aprovado!" : "Pagar Agora"}
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}
