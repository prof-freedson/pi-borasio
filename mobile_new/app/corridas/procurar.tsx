
import React, { useState, useEffect } from "react";
import {
    View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert, SafeAreaView, Platform
} from "react-native";
import { useRouter } from "expo-router";
// Ícones usando Expo Vector Icons
import {
    ArrowLeft, MapPin, Search as SearchIcon, Users, Cloud, Car, Clock, Star,
    Map as MapIcon, Calendar, TreePine, Share2, Navigation, Truck
} from "lucide-react-native";
import { mockData } from "../../data/mockData";

// Definição do Tipo Carona (baseado no frontend e backend)
type Carona = {
    id: number;
    tipo: 'geral' | 'ilha' | 'evento' | 'rural' | 'grupo';
    origem: string;
    destino: string;
    vagas: number;
    valor: number | string; // Suporta string "R$ 10,00" ou number
    motorista: {
        nome: string;
        veiculo?: string;
        avaliacao?: number;
    };
    dataHora: string | Date;
    tempoEstimado?: string;
    economia?: string;
    pessoasGrupo?: number;
};

// Configuração da API para testes (ajuste conforme seu ambiente: localhost, IP da rede, etc)
// Para emulador Android: 10.0.2.2
// Para emulador iOS: localhost
// Para dispositivo físico: IP da máquina (ex: 192.168.1.5)
const API_URL = "http://10.0.2.2:3001"; // Ajuste aqui se necessário

export default function ProcurarCaronasScreen() {
    const router = useRouter();
    const [abaAtiva, setAbaAtiva] = useState<'geral' | 'ilha' | 'evento' | 'rural' | 'grupo'>('geral');
    const [loading, setLoading] = useState(false);
    const [buscaOrigem, setBuscaOrigem] = useState("");
    const [buscaDestino, setBuscaDestino] = useState("");
    const [caronas, setCaronas] = useState<Carona[]>([]);

    // Dados Mockados importados
    // Dados Mockados importados
    const caronasMockadas: Carona[] = mockData.ofertasCaronas.map(c => ({
        id: c.id,
        tipo: (c.tipo as any) || 'geral',
        origem: c.origem,
        destino: c.destino,
        vagas: c.vagas,
        valor: c.valor,
        motorista: mockData.motoristas.find(m => m.id === c.motoristaId) || { nome: "Motorista", avaliacao: 5.0 },
        dataHora: c.dataHora,
        tempoEstimado: "15 min" // Hardcoded for demo
    }));

    // Buscar Caronas da API (e mesclar com mocks)
    // Buscar Caronas (Apenas Mocks para Demo Instantânea)
    const buscarCaronas = async () => {
        // setLoading(true); // Removido para não mostrar "Buscando rotas"
        try {
            // Simplesmente filtra os mocks
            const mocksFiltrados = caronasMockadas.filter(c => c.tipo === abaAtiva);

            // Aplica filtros de texto
            let resultadoFinal = [...mocksFiltrados];
            if (buscaOrigem || buscaDestino) {
                resultadoFinal = resultadoFinal.filter(c => {
                    const matchOrigem = !buscaOrigem || c.origem.toLowerCase().includes(buscaOrigem.toLowerCase());
                    const matchDestino = !buscaDestino || c.destino.toLowerCase().includes(buscaDestino.toLowerCase());
                    return matchOrigem && matchDestino;
                });
            }

            setCaronas(resultadoFinal);

        } catch (error) {
            console.error("Erro ao buscar caronas:", error);
        }
    };

    // Carregar inicial
    useEffect(() => {
        buscarCaronas();
    }, [abaAtiva]);

    // Formatador de Moeda
    const formatarValor = (val: number | string) => {
        if (typeof val === 'number') {
            return `R$ ${val.toFixed(2).replace('.', ',')}`;
        }
        return val;
    };

    // Ícones por Categoria
    const getIconeCategoria = (tipo: string) => {
        switch (tipo) {
            case 'ilha': return <Navigation color="#fff" size={16} />;
            case 'evento': return <Calendar color="#fff" size={16} />;
            case 'rural': return <TreePine color="#fff" size={16} />;
            case 'grupo': return <Share2 color="#fff" size={16} />;
            default: return <MapPin color="#fff" size={16} />;
        }
    };

    const getDescricaoCategoria = (tipo: string) => {
        switch (tipo) {
            case 'ilha': return 'Rotas especiais Ilha';
            case 'evento': return 'Shows e Festivais';
            case 'rural': return 'Conexão Rural-Urbana';
            case 'grupo': return 'Economia Coletiva';
            default: return 'Rotas do dia-a-dia';
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-green-50">
            {/* Header Verde */}
            <View className="bg-[#004d2b] px-6 pt-12 pb-6 border-b border-green-800 shadow-sm rounded-b-[32px] z-10">
                <View className="flex-row items-center justify-between mb-6">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 bg-white/10 items-center justify-center rounded-xl"
                    >
                        <ArrowLeft color="#fff" size={24} />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold uppercase tracking-wider">
                        Buscar Carona
                    </Text>
                    <View className="w-10" />
                </View>

                {/* Barra de Busca Simples */}
                <View className="flex-row items-center space-x-3 bg-white/10 p-1 rounded-2xl border border-white/20">
                    <View className="flex-1 bg-white rounded-xl flex-row items-center px-4 h-12 shadow-sm">
                        <MapPin color="#004d2b" size={18} />
                        <TextInput
                            placeholder="Para onde você vai?"
                            placeholderTextColor="#9ca3af"
                            className="flex-1 ml-3 text-gray-800 font-medium"
                            value={buscaDestino}
                            onChangeText={setBuscaDestino}
                            onSubmitEditing={buscarCaronas}
                        />
                    </View>
                    <TouchableOpacity
                        className="bg-yellow-400 w-12 h-12 items-center justify-center rounded-xl shadow-lg"
                        onPress={buscarCaronas}
                    >
                        <SearchIcon color="#004d2b" size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Categorias (Abas) Horizontal */}
            <View className="mt-4 px-4">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
                    {(['geral', 'ilha', 'evento', 'rural', 'grupo'] as const).map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setAbaAtiva(cat)}
                            className={`flex-row items-center px-5 py-3 rounded-2xl mr-3 border ${abaAtiva === cat
                                ? 'bg-[#004d2b] border-[#004d2b]'
                                : 'bg-white border-green-100'
                                }`}
                        >
                            {getIconeCategoria(cat)}
                            <Text className={`font-bold uppercase text-[10px] ml-2 tracking-widest ${abaAtiva === cat ? 'text-white' : 'text-[#004d2b]'
                                }`}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Text className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2 mb-4">
                    {getDescricaoCategoria(abaAtiva)}
                </Text>
            </View>

            {/* Lista de Resultados */}
            <ScrollView className="px-4 pb-20" showsVerticalScrollIndicator={false}>
                {loading ? (
                    <View className="py-20 items-center">
                        {/* Loading removido conforme solicitado */}
                    </View>
                ) : caronas.length === 0 ? (
                    <View className="bg-white p-8 rounded-[32px] items-center mt-4 border border-green-100 shadow-sm">
                        <View className="w-16 h-16 bg-green-50 rounded-full items-center justify-center mb-4">
                            <MapIcon color="#004d2b" size={32} opacity={0.5} />
                        </View>
                        <Text className="text-[#004d2b] font-bold text-lg text-center mb-2">Nenhuma carona encontrada</Text>
                        <Text className="text-gray-400 text-center text-sm">
                            Tente mudar os filtros ou busque por outro destino.
                        </Text>
                    </View>
                ) : (
                    caronas.map((carona) => (
                        <View
                            key={carona.id}
                            className="bg-white rounded-[32px] mb-6 shadow-sm border border-green-100 overflow-hidden"
                        >
                            <View className="p-6">
                                {/* Cabeçalho do Card */}
                                <View className="flex-row justify-between items-start mb-6">
                                    <View className="flex-row items-center">
                                        <View className="w-12 h-12 bg-[#004d2b] rounded-2xl items-center justify-center mr-3">
                                            <Text className="text-white font-black text-lg">
                                                {carona.motorista.nome.charAt(0)}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text className="font-bold text-[#004d2b] text-base">{carona.motorista.nome}</Text>
                                            <View className="flex-row items-center">
                                                <Star size={12} color="#fbbf24" fill="#fbbf24" />
                                                <Text className="text-xs text-gray-500 ml-1 font-bold">{carona.motorista.avaliacao}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-2xl font-black text-[#004d2b]">{formatarValor(carona.valor)}</Text>
                                    </View>
                                </View>

                                {/* Linha de Trajeto */}
                                <View className="ml-2 border-l-2 border-dashed border-green-100 pl-6 space-y-6 py-2 relative">
                                    <View className="absolute -left-[5px] top-0 w-3 h-3 bg-white border-2 border-[#004d2b] rounded-full" />
                                    <View className="absolute -left-[5px] bottom-0 w-3 h-3 bg-yellow-400 rounded-full" />

                                    <View>
                                        <Text className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Origem</Text>
                                        <Text className="text-[#004d2b] font-bold text-base">{carona.origem}</Text>
                                    </View>
                                    <View>
                                        <Text className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Destino</Text>
                                        <Text className="text-[#004d2b] font-bold text-base">{carona.destino}</Text>
                                    </View>
                                </View>

                                {/* Detalhes Extras */}
                                <View className="flex-row mt-6 pt-4 border-t border-green-50 justify-between">
                                    <View className="flex-row items-center bg-green-50 px-3 py-2 rounded-xl">
                                        <Clock size={14} color="#004d2b" />
                                        <Text className="ml-2 text-[#004d2b] font-bold text-xs">
                                            {carona.tempoEstimado || "Em breve"}
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center bg-green-50 px-3 py-2 rounded-xl">
                                        <Users size={14} color="#004d2b" />
                                        <Text className="ml-2 text-[#004d2b] font-bold text-xs">
                                            {carona.vagas} vagas
                                        </Text>
                                    </View>
                                </View>

                                {/* Botão de Ação */}
                                <TouchableOpacity
                                    className="mt-6 bg-[#004d2b] py-4 rounded-2xl items-center shadow-md active:bg-green-900"
                                    onPress={() => router.push(`/corridas/${carona.id}/pagamento`)}
                                >
                                    <Text className="text-white font-black uppercase tracking-widest text-xs">
                                        Escolher Carona
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))
                )}
                <View className="h-20" />
            </ScrollView>
        </SafeAreaView>
    );
}
