import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';

interface BoletoContentProps {
    valor: number;
    corrida: any;
    codigoBarrasNumerico: string;
    handlers: {
        handleDownloadPdf: () => Promise<void>;
        handleCopiarLinha: () => Promise<void>;
        formatarLinhaDigitavel: (c: string) => string;
        gerarCodigoBarrasVisual: () => string;
    };
}

export default function BoletoContent({ valor, handlers, codigoBarrasNumerico }: BoletoContentProps) {
    const { handleCopiarLinha, formatarLinhaDigitavel, gerarCodigoBarrasVisual } = handlers;

    // Esta é a função solicitada, adaptada para funcionar no Mobile (Expo) 
    // mantendo EXATAMENTE os mesmos textos, coordenadas (mm) e lógica do seu código.
    const handleDownloadPdfLocal = async () => {
        try {
            const linhaDigitavel = formatarLinhaDigitavel(codigoBarrasNumerico);
            const vencimento = new Date(Date.now() + 259200000).toLocaleDateString('pt-BR');
            const valorStr = valor.toFixed(2).replace('.', ',');
            const nossoNumero = `${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}-${Math.floor(Math.random() * 10)}`;
            const autenticacao = Math.random().toString(36).substring(2, 10).toUpperCase();
            const dataEmissao = new Date().toLocaleDateString('pt-BR');
            const horaEmissao = new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
            const documentoId = Math.random().toString(36).substring(2, 15).toUpperCase();
            const barcodeHtml = gerarCodigoBarrasVisual();

            // O HTML abaixo recria o layout do jsPDF usando coordenadas em mm
            const html = `
                <html>
                    <head>
                        <style>
                            body { font-family: Helvetica, Arial, sans-serif; margin: 0; padding: 0; }
                            .page { width: 210mm; height: 297mm; padding: 20mm; position: relative; box-sizing: border-box; }
                            .logo { position: absolute; left: 20mm; top: 22mm; font-size: 24pt; font-weight: bold; color: #004d2b; }
                            .tagline { position: absolute; left: 60mm; top: 37mm; font-size: 10pt; color: #646464; }
                            .line { position: absolute; left: 20mm; top: 40mm; width: 170mm; height: 0.5mm; background: #004d2b; }
                            .title { position: absolute; left: 20mm; top: 55mm; font-size: 14pt; font-weight: bold; }
                            .linha-digitavel { position: absolute; left: 20mm; top: 70mm; font-family: monospace; font-size: 10pt; font-weight: bold; }
                            .fields { font-size: 10pt; }
                            .venc { position: absolute; left: 20mm; top: 85mm; }
                            .val { position: absolute; left: 120mm; top: 85mm; }
                            .nosso { position: absolute; left: 20mm; top: 93mm; }
                            .agencia { position: absolute; left: 120mm; top: 93mm; }
                            .benefic { position: absolute; left: 20mm; top: 101mm; }
                            .cnpj { position: absolute; left: 120mm; top: 101mm; }
                            .paga { position: absolute; left: 20mm; top: 109mm; }
                            .cpf { position: absolute; left: 120mm; top: 109mm; }
                            .bc-label { position: absolute; left: 20mm; top: 134mm; font-size: 8pt; color: #646464; }
                            .bc-box { position: absolute; left: 18mm; top: 132mm; width: 164mm; height: 20mm; border: 0.1mm solid #000; }
                            .bc-vis { position: absolute; left: 20mm; top: 137mm; font-family: monospace; font-size: 6pt; white-space: pre; line-height: 1; }
                            .bc-num { position: absolute; left: 20mm; top: 152mm; font-size: 5pt; color: #969696; }
                            .inst-label { position: absolute; left: 20mm; top: 169mm; font-size: 9pt; font-weight: bold; }
                            .inst-list { position: absolute; left: 25mm; top: 175mm; font-size: 9pt; }
                            .autent { position: absolute; left: 20mm; top: 204mm; font-size: 7pt; color: #646464; }
                            .autent-code { position: absolute; left: 20mm; top: 208mm; font-size: 7pt; color: #646464; }
                            .f1 { position: absolute; left: 20mm; top: 285mm; font-size: 6pt; color: #646464; }
                            .f2 { position: absolute; left: 20mm; top: 288mm; font-size: 6pt; color: #646464; }
                            .f3 { position: absolute; left: 20mm; top: 291mm; font-size: 6pt; color: #646464; }
                        </style>
                    </head>
                    <body>
                        <div class="page">
                            <div class="logo">BoraSiô</div>
                            <div class="tagline">Sistema de Transporte Seguro</div>
                            <div class="line"></div>
                            <div class="title">BOLETO BANCÁRIO</div>
                            <div class="linha-digitavel">${linhaDigitavel}</div>
                            <div class="fields">
                                <div class="venc">Vencimento: ${vencimento}</div>
                                <div class="val">Valor: R$ ${valorStr}</div>
                                <div class="nosso">Nosso Número: ${nossoNumero}</div>
                                <div class="agencia">Agência/Código Cedente: 0001/12345-6</div>
                                <div class="benefic">Beneficiário: BoraSiô Transportes Ltda</div>
                                <div class="cnpj">CNPJ: 12.345.678/0001-90</div>
                                <div class="paga">Pagador: [Nome do Cliente]</div>
                                <div class="cpf">CPF: [CPF do Cliente]</div>
                            </div>
                            <div class="bc-box"></div>
                            <div class="bc-label">CÓDIGO DE BARRAS:</div>
                            <div class="bc-vis">${barcodeHtml}</div>
                            <div class="bc-num">${codigoBarrasNumerico}</div>
                            <div class="inst-label">INSTRUÇÕES:</div>
                            <div class="inst-list">
                                <div>• Pagável em qualquer agência bancária ou casa lotérica até o vencimento</div>
                                <div>• Após o vencimento, pagável apenas na rede BoraSiô</div>
                                <div>• Evite juros - pague em dia</div>
                                <div>• Em caso de dúvidas: (98) 4002-8922</div>
                                <div>• Não receber após o vencimento</div>
                            </div>
                            <div class="autent">Autenticação Mecânica</div>
                            <div class="autent-code">Código: ${autenticacao}</div>
                            <div class="f1">Boleto gerado automaticamente pelo sistema BoraSiô</div>
                            <div class="f2">Data de emissão: ${dataEmissao} às ${horaEmissao}</div>
                            <div class="f3">Documento: ${documentoId}</div>
                        </div>
                    </body>
                </html>
            `;

            const { uri } = await Print.printToFileAsync({ html });
            await Sharing.shareAsync(uri);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao gerar o PDF. Tente novamente.');
        }
    };

    return (
        <View className="mb-8 p-5 bg-green-50/50 rounded-3xl border border-green-100">
            <Text className="text-lg font-black text-[#004d2b] text-center mb-4">Pagamento por Boleto</Text>
            
            <View className="bg-white p-4 rounded-2xl border border-dashed border-gray-200 shadow-sm overflow-hidden">
                <View className="bg-gray-50 p-3 rounded-xl mb-4">
                    <Text className="font-mono text-[9px] font-bold text-center text-gray-700">
                        {formatarLinhaDigitavel(codigoBarrasNumerico)}
                    </Text>
                </View>
                
                <View className="flex-row justify-between mb-4">
                    <View>
                        <Text className="text-[7px] text-gray-400 font-bold uppercase">Vencimento</Text>
                        <Text className="text-gray-800 font-bold text-[10px]">{new Date(Date.now() + 259200000).toLocaleDateString('pt-BR')}</Text>
                    </View>
                    <View className="items-end">
                        <Text className="text-[7px] text-gray-400 font-bold uppercase">Valor</Text>
                        <Text className="text-green-700 font-black text-xs">R$ {valor.toFixed(2).replace('.', ',')}</Text>
                    </View>
                </View>
                
                <View className="items-center border-t border-gray-50 pt-4">
                    <Text className="font-mono text-[5px] tracking-tighter text-black h-4 overflow-hidden mb-1">
                        {gerarCodigoBarrasVisual()}
                    </Text>
                    <Text className="text-[7px] text-gray-300 font-mono">{codigoBarrasNumerico}</Text>
                </View>
            </View>
            
            <View className="flex-row gap-x-2 mt-4">
                <TouchableOpacity
                    onPress={handleCopiarLinha}
                    className="flex-1 bg-white border border-gray-100 py-4 rounded-xl items-center flex-row justify-center"
                >
                    <Feather name="copy" size={14} color="#374151" />
                    <Text className="text-gray-700 font-bold text-xs ml-2 uppercase tracking-widest text-[10px]">Copiar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleDownloadPdfLocal}
                    className="flex-1 bg-[#004d2b] py-4 rounded-xl items-center flex-row justify-center shadow-md"
                >
                    <Feather name="download" size={14} color="#ffffff" />
                    <Text className="text-white font-bold text-xs ml-2 uppercase tracking-widest text-[10px]">PDF</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
