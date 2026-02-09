import React, { useState, useEffect } from 'react';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagamentoContent from '../../components/PagamentoContent';
import "../../global.css";

type Corrida = {
    id: number;
    origem: string;
    destino: string;
    assentos: number;
    preco: string;
    motorista: string;
    avaliacao: number;
    tempoEstimado: string;
    veiculo: string;
    tipo: 'geral' | 'ilha' | 'evento' | 'rural' | 'grupo';
};

export default function PagamentoScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [metodoPagamento, setMetodoPagamento] = useState('credito');
    const [descontoAplicado, setDescontoAplicado] = useState(false);
    const [pagamentoFinalizado, setPagamentoFinalizado] = useState(false);
    const [valorOriginal, setValorOriginal] = useState(15.00);
    const [valorComDesconto, setValorComDesconto] = useState(15.00);
    const [corridaSelecionada, setCorridaSelecionada] = useState<Corrida | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const valorUrl = params.valor ? parseFloat(String(params.valor)) : 15.00;
        const finalValor = isNaN(valorUrl) ? 15.00 : valorUrl;
        
        const mockCorrida: Corrida = {
            id: 1,
            origem: "Renascença",
            destino: "Centro Histórico",
            assentos: 1,
            preco: `R$ ${finalValor.toFixed(2).replace('.', ',')}`,
            motorista: "João Silva",
            avaliacao: 4.8,
            tempoEstimado: "15 min",
            veiculo: "Fiat Cronos - Branco",
            tipo: 'geral'
        };

        setCorridaSelecionada(mockCorrida);
        setValorOriginal(finalValor);
        setValorComDesconto(finalValor);
        setIsLoading(false);
    }, [params.valor]);

    const handleFinalizarPagamento = () => {
        setPagamentoFinalizado(true);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#DAF3D7]">
            <Stack.Screen options={{
                headerShown: true,
                title: "Pagamento",
                headerStyle: { backgroundColor: '#004d2b' },
                headerTintColor: '#fff',
                headerShadowVisible: false,
                headerTitleStyle: { fontWeight: '900' },
            }} />

            <PagamentoContent 
                state={{
                    metodoPagamento,
                    setMetodoPagamento,
                    descontoAplicado,
                    setDescontoAplicado,
                    pagamentoFinalizado,
                    setPagamentoFinalizado,
                    valorOriginal,
                    valorComDesconto,
                    corridaSelecionada,
                    isLoading
                }}
                handlers={{
                    handleFinalizarPagamento
                }}
            />
            
        </SafeAreaView>
    );
}
