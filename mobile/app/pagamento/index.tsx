import React, { useState, useEffect } from 'react';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
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
    const [codigoBarrasNumerico, setCodigoBarrasNumerico] = useState('');
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

    useEffect(() => {
        if (valorOriginal > 0) {
            gerarCodigoBarrasAleatorio();
        }
    }, [descontoAplicado, valorOriginal]);

    const gerarCodigoBarrasAleatorio = () => {
        const valorAtual = descontoAplicado ? valorComDesconto : valorOriginal;
        const banco = '237';
        const moeda = '9';
        const fatorVencimento = '9999';
        const valor = Math.floor(valorAtual * 100).toString().padStart(10, '0');
        const r1 = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        const r2 = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        const r3 = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        const r4 = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        
        const base = banco + moeda + fatorVencimento + valor + r1 + r2 + r3 + r4;
        let soma = 0;
        let peso = 2;
        for (let i = base.length - 1; i >= 0; i--) {
            soma += parseInt(base[i]) * peso;
            peso = peso === 9 ? 2 : peso + 1;
        }
        const resto = soma % 11;
        let dv = 11 - resto;
        if (dv === 0 || dv === 10 || dv === 11) dv = 1;
        
        setCodigoBarrasNumerico(base.substring(0, 4) + dv + base.substring(4));
    };

    const formatarLinhaDigitavel = (codigo: string) => {
        if (!codigo || codigo.length < 44) return '';
        const c1 = codigo.substring(0, 4) + codigo.substring(19, 24);
        const c2 = codigo.substring(24, 34);
        const c3 = codigo.substring(34, 44);
        const c4 = codigo.substring(4, 5); 
        const c5 = codigo.substring(5, 9) + codigo.substring(9, 19);
        return `${c1.substring(0, 5)}.${c1.substring(5, 10)} ${c2.substring(0, 5)}.${c2.substring(5, 10)} ${c3.substring(0, 5)}.${c3.substring(5, 10)} ${c4} ${c5}`;
    };

    const gerarCodigoBarrasVisual = () => {
        if (!codigoBarrasNumerico) return '';
        const full = '0000' + codigoBarrasNumerico + '100';
        let visual = '';
        for (let i = 0; i < full.length; i++) {
            const d = parseInt(full[i]);
            if (i % 2 === 0) visual += d >= 7 ? '███' : (d >= 4 ? '██' : '█');
            else visual += d >= 7 ? '   ' : (d >= 4 ? '  ' : ' ');
        }
        return visual;
    };

    const getVencimentoBoleto = () => {
        const data = new Date();
        data.setDate(data.getDate() + 3);
        return data.toLocaleDateString('pt-BR');
    };

    const getValorAtual = () => {
        const valorAtual = descontoAplicado ? valorComDesconto : valorOriginal;
        return valorAtual.toFixed(2).replace('.', ',');
    };

    // Função handleDownloadPdf adaptada para Mobile mantendo EXATAMENTE o layout solicitado
    const handleDownloadPdf = async () => {
        try {
            const linhaDigitavel = formatarLinhaDigitavel(codigoBarrasNumerico);
            const vencimento = getVencimentoBoleto();
            const valorStr = getValorAtual();
            const nossoNumero = `${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}-${Math.floor(Math.random() * 10)}`;
            const autenticacao = Math.random().toString(36).substring(2, 10).toUpperCase();
            const dataEmissao = new Date().toLocaleDateString('pt-BR');
            const horaEmissao = new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
            const documentoId = Math.random().toString(36).substring(2, 15).toUpperCase();

            // Gerar Barras Visuais para o PDF (Simulando o drawBarcodeInPdf via HTML)
            const barcodeHtml = gerarCodigoBarrasVisual();

            const html = `
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <style>
                            body { font-family: 'Helvetica', Arial, sans-serif; padding: 0; margin: 0; color: #000; background: #fff; width: 210mm; height: 297mm; }
                            .page { position: relative; width: 210mm; height: 297mm; padding: 20mm; box-sizing: border-box; }
                            
                            /* Coordenadas aproximadas baseadas no jsPDF do frontend */
                            .logo { position: absolute; left: 20mm; top: 22mm; width: 30mm; height: 15mm; font-size: 24px; font-weight: bold; color: #004d2b; }
                            .tagline { position: absolute; left: 60mm; top: 37mm; font-size: 10pt; color: #646464; }
                            .header-line { position: absolute; left: 20mm; top: 40mm; width: 170mm; height: 0.5mm; background: #004d2b; }
                            
                            .title { position: absolute; left: 20mm; top: 55mm; font-size: 14pt; font-weight: bold; }
                            .linha-digitavel { position: absolute; left: 20mm; top: 70mm; font-family: 'Courier New', Courier, monospace; font-size: 10pt; font-weight: bold; }
                            
                            .field-labels { font-size: 10pt; color: #000; }
                            .vencimento { position: absolute; left: 20mm; top: 85mm; }
                            .valor { position: absolute; left: 120mm; top: 85mm; }
                            
                            .nosso-numero { position: absolute; left: 20mm; top: 93mm; }
                            .agencia { position: absolute; left: 120mm; top: 93mm; }
                            
                            .beneficiario { position: absolute; left: 20mm; top: 101mm; }
                            .cnpj { position: absolute; left: 120mm; top: 101mm; }
                            
                            .pagador { position: absolute; left: 20mm; top: 109mm; }
                            .cpf { position: absolute; left: 120mm; top: 109mm; }
                            
                            .barcode-label { position: absolute; left: 20mm; top: 134mm; font-size: 8pt; color: #646464; }
                            .barcode-box { position: absolute; left: 18mm; top: 132mm; width: 164mm; height: 20mm; border: 0.1mm solid #000; }
                            .barcode-visual { position: absolute; left: 20mm; top: 137mm; font-family: monospace; font-size: 6pt; letter-spacing: -1px; white-space: pre; line-height: 1; }
                            .barcode-num { position: absolute; left: 20mm; top: 152mm; font-size: 5pt; color: #969696; }
                            
                            .instrucoes-label { position: absolute; left: 20mm; top: 169mm; font-size: 9pt; font-weight: bold; }
                            .instrucoes-list { position: absolute; left: 25mm; top: 175mm; font-size: 9pt; line-height: 1.5; }
                            
                            .autenticacao { position: absolute; left: 20mm; top: 204mm; font-size: 7pt; color: #646464; }
                            .autenticacao-code { position: absolute; left: 20mm; top: 208mm; font-size: 7pt; color: #646464; }
                            
                            .footer-1 { position: absolute; left: 20mm; top: 285mm; font-size: 6pt; color: #646464; }
                            .footer-2 { position: absolute; left: 20mm; top: 288mm; font-size: 6pt; color: #646464; }
                            .footer-3 { position: absolute; left: 20mm; top: 291mm; font-size: 6pt; color: #646464; }
                        </style>
                    </head>
                    <body>
                        <div class="page">
                            <div class="logo">BoraSiô</div>
                            <div class="tagline">Sistema de Transporte Seguro</div>
                            <div class="header-line"></div>
                            
                            <div class="title">BOLETO BANCÁRIO</div>
                            <div class="linha-digitavel">${linhaDigitavel}</div>
                            
                            <div class="field-labels">
                                <div class="vencimento">Vencimento: ${vencimento}</div>
                                <div class="valor">Valor: R$ ${valorStr}</div>
                                
                                <div class="nosso-numero">Nosso Número: ${nossoNumero}</div>
                                <div class="agencia">Agência/Código Cedente: 0001/12345-6</div>
                                
                                <div class="beneficiario">Beneficiário: BoraSiô Transportes Ltda</div>
                                <div class="cnpj">CNPJ: 12.345.678/0001-90</div>
                                
                                <div class="pagador">Pagador: [Nome do Cliente]</div>
                                <div class="cpf">CPF: [CPF do Cliente]</div>
                            </div>
                            
                            <div class="barcode-box"></div>
                            <div class="barcode-label">CÓDIGO DE BARRAS:</div>
                            <div class="barcode-visual">${barcodeHtml}</div>
                            <div class="barcode-num">${codigoBarrasNumerico}</div>
                            
                            <div class="instrucoes-label">INSTRUÇÕES:</div>
                            <div class="instrucoes-list">
                                <div>• Pagável em qualquer agência bancária ou casa lotérica até o vencimento</div>
                                <div>• Após o vencimento, pagável apenas na rede BoraSiô</div>
                                <div>• Evite juros - pague em dia</div>
                                <div>• Em caso de dúvidas: (98) 4002-8922</div>
                                <div>• Não receber após o vencimento</div>
                            </div>
                            
                            <div class="autenticacao">Autenticação Mecânica</div>
                            <div class="autenticacao-code">Código: ${autenticacao}</div>
                            
                            <div class="footer-1">Boleto gerado automaticamente pelo sistema BoraSiô</div>
                            <div class="footer-2">Data de emissão: ${dataEmissao} às ${horaEmissao}</div>
                            <div class="footer-3">Documento: ${documentoId}</div>
                        </div>
                    </body>
                </html>
            `;

            const { uri } = await Print.printToFileAsync({ html });
            await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            Alert.alert('Erro', 'Erro ao gerar o PDF. Tente novamente.');
        }
    }

    const handleCopiarLinha = async () => {
        const linha = formatarLinhaDigitavel(codigoBarrasNumerico);
        await Clipboard.setStringAsync(linha);
        Alert.alert("Copiado", "Linha digitável copiada!");
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
                    codigoBarrasNumerico,
                    isLoading
                }}
                handlers={{
                    handleDownloadPdf,
                    handleCopiarLinha,
                    formatarLinhaDigitavel,
                    gerarCodigoBarrasVisual
                }}
            />
            
        </SafeAreaView>
    );
}
