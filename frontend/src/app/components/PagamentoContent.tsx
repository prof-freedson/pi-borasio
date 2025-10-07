"use client"

import { faCreditCard, faBarcode, faQrcode, faTicketAlt, faCheckCircle, faCopy, faDownload, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import { useRouter, useSearchParams } from 'next/navigation'

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
  horario?: string;
  data?: string;
  economia?: string;
  pessoas?: number;
};

export default function PagamentoContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [metodoPagamento, setMetodoPagamento] = useState('credito')
  const [descontoAplicado, setDescontoAplicado] = useState(false)
  const [pagamentoFinalizado, setPagamentoFinalizado] = useState(false)
  const [valorOriginal, setValorOriginal] = useState(0)
  const [valorComDesconto, setValorComDesconto] = useState(0)
  const [valorFinal, setValorFinal] = useState(0)
  const [codigoBarrasNumerico, setCodigoBarrasNumerico] = useState('')
  const [corridaSelecionada, setCorridaSelecionada] = useState<Corrida | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar corrida selecionada do localStorage e URL parameters
  useEffect(() => {
    setIsLoading(true)
    
    // Tentar obter da URL primeiro (valor direto)
    const valorUrl = searchParams.get('valor')
    
    // Tentar obter do localStorage (objeto completo)
    const corridaSalva = localStorage.getItem('selectedCorrida')
    
    if (corridaSalva) {
      try {
        const corrida: Corrida = JSON.parse(corridaSalva)
        setCorridaSelecionada(corrida)
        
        // Extrair valor numérico do preço (ex: "R$ 8,50" → 8.50)
        const precoNumerico = extrairValorNumerico(corrida.preco)
        setValorOriginal(precoNumerico)
        setValorComDesconto(calcularDesconto(precoNumerico))
        setValorFinal(precoNumerico)
      } catch (error) {
        console.error('Erro ao parsear corrida:', error)
        // Fallback para valor da URL ou valor padrão
        const valorFallback = valorUrl ? parseFloat(valorUrl) : 15.00
        setValorOriginal(valorFallback)
        setValorComDesconto(calcularDesconto(valorFallback))
        setValorFinal(valorFallback)
      }
    } else if (valorUrl) {
      // Usar valor direto da URL
      const valor = parseFloat(valorUrl)
      setValorOriginal(valor)
      setValorComDesconto(calcularDesconto(valor))
      setValorFinal(valor)
    } else {
      // Valor padrão fallback
      const valorPadrao = 15.00
      setValorOriginal(valorPadrao)
      setValorComDesconto(calcularDesconto(valorPadrao))
      setValorFinal(valorPadrao)
    }
    
    setIsLoading(false)
  }, [searchParams])

  // Função para extrair valor numérico de string como "R$ 8,50"
  const extrairValorNumerico = (precoString: string): number => {
    if (!precoString) return 0
    
    // Remove "R$", espaços e converte vírgula para ponto
    const valorLimpo = precoString
      .replace('R$', '')
      .replace(' ', '')
      .replace('.', '')
      .replace(',', '.')
      .trim()
    
    return parseFloat(valorLimpo) || 0
  }

  // Calcular desconto (30% off como exemplo)
  const calcularDesconto = (valor: number): number => {
    return parseFloat((valor * 0.7).toFixed(2)) // 30% de desconto
  }

  // Gerar código de barras quando valores mudarem
  useEffect(() => {
    if (valorOriginal > 0) {
      gerarCodigoBarrasAleatorio()
    }
  }, [descontoAplicado, valorOriginal])

  const gerarCodigoBarrasAleatorio = () => {
    const valorAtual = descontoAplicado ? valorComDesconto : valorOriginal
    
    // Estrutura básica de um código de barras de boleto: 44 dígitos
    const banco = '237' // Código do banco (Bradesco)
    const moeda = '9' // Real
    const fatorVencimento = '9999' // Fator vencimento fixo
    const valor = Math.floor(valorAtual * 100).toString().padStart(10, '0')
    
    // Parte aleatória (20 dígitos)
    const aleatorio1 = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
    const aleatorio2 = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
    const aleatorio3 = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
    const aleatorio4 = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
    
    const codigoBase = banco + moeda + fatorVencimento + valor + aleatorio1 + aleatorio2 + aleatorio3 + aleatorio4
    
    // Calcular dígito verificador (módulo 11)
    const digitoVerificador = calcularDigitoVerificador(codigoBase)
    
    const codigoCompleto = codigoBase.substring(0, 4) + digitoVerificador + codigoBase.substring(4)
    setCodigoBarrasNumerico(codigoCompleto)
  }

  const calcularDigitoVerificador = (codigo: string) => {
    let soma = 0
    let peso = 2
    
    for (let i = codigo.length - 1; i >= 0; i--) {
      soma += parseInt(codigo[i]) * peso
      peso = peso === 9 ? 2 : peso + 1
    }
    
    const resto = soma % 11
    const dv = 11 - resto
    
    if (dv === 0 || dv === 10 || dv === 11) return '1'
    return dv.toString()
  }

  const formatarLinhaDigitavel = (codigo: string) => {
    if (!codigo) return ''
    
    const campo1 = codigo.substring(0, 4) + codigo.substring(19, 24)
    const campo2 = codigo.substring(24, 34)
    const campo3 = codigo.substring(34, 44)
    const campo4 = codigo.substring(4, 5) // DV
    const campo5 = codigo.substring(5, 9) + codigo.substring(9, 19)
    
    return `${campo1.substring(0, 5)}.${campo1.substring(5, 10)} ${campo2.substring(0, 5)}.${campo2.substring(5, 10)} ${campo3.substring(0, 5)}.${campo3.substring(5, 10)} ${campo4} ${campo5}`
  }

  const handleFinalizarPagamento = () => {
    const valorPago = descontoAplicado ? valorComDesconto : valorOriginal;
    setValorFinal(valorPago);
    setPagamentoFinalizado(true)
    
    // Limpar a corrida selecionada do localStorage após pagamento
    localStorage.removeItem('selectedCorrida')
    
    setTimeout(() => {
      router.push('/usuario')
    }, 3000)
  }

  const getValorAtual = () => {
    const valorAtual = descontoAplicado ? valorComDesconto : valorOriginal;
    return valorAtual.toFixed(2).replace('.', ',');
  }

  const getValorAtualNumerico = () => {
    return descontoAplicado ? valorComDesconto : valorOriginal;
  }

  const getPixCode = () => {
    const valorAtual = getValorAtualNumerico();
    return `00020126360014br.gov.bcb.pix0114+5598999999999520400005303986540${valorAtual.toFixed(2).length.toString().padStart(2, '0')}${valorAtual.toFixed(2)}5802BR5913NOME DO RECEBEDOR6009SAO LUIS62070503***6304ABCD`;
  }

  const getVencimentoBoleto = () => {
    const data = new Date();
    data.setDate(data.getDate() + 3);
    return data.toLocaleDateString('pt-BR');
  }
  
  const drawBarcodeInPdf = (pdf: jsPDF, codigo: string, x: number, y: number, height: number) => {
    pdf.setDrawColor(0, 0, 0);
    pdf.setFillColor(0, 0, 0);

    const startCode = '0000';
    const endCode = '100';
    const fullCode = startCode + codigo + endCode;
    
    let currentX = x;
    const narrowBarWidth = 0.3;
    const wideBarWidth = 0.9;
    const barSpacing = 0.2;

    for (let i = 0; i < fullCode.length; i++) {
      const digit = parseInt(fullCode[i]);
      const barWidth = digit >= 5 ? wideBarWidth : narrowBarWidth;
      
      if (i % 2 === 0) {
        pdf.rect(currentX, y, barWidth, height, 'F');
      }
      
      currentX += barWidth + barSpacing;
    }
  }

  const gerarCodigoBarrasVisual = () => {
    if (!codigoBarrasNumerico) return '';
    
    const startCode = '0000';
    const endCode = '100';
    const fullCode = startCode + codigoBarrasNumerico + endCode;
    
    let barcodeVisual = '';
    
    for (let i = 0; i < fullCode.length; i++) {
      const digit = parseInt(fullCode[i]);
      
      if (i % 2 === 0) {
        if (digit >= 7) {
          barcodeVisual += '███';
        } else if (digit >= 4) {
          barcodeVisual += '██';
        } else {
          barcodeVisual += '█';
        }
      } else {
        if (digit >= 7) {
          barcodeVisual += '   ';
        } else if (digit >= 4) {
          barcodeVisual += '  ';
        } else {
          barcodeVisual += ' ';
        }
      }
    }
    
    return barcodeVisual;
  }

  const handleDownloadPdf = async () => {
    try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const logoUrl = '/img/borasio.png';
        const logoImg = new Image();
        logoImg.src = logoUrl;
        
        const drawRestOfPdf = (pdf: jsPDF) => {
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text('Sistema de Transporte Seguro', 60, 37);
            
            pdf.setDrawColor(0, 77, 43);
            pdf.setLineWidth(0.5);
            pdf.line(20, 40, 190, 40);
            
            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);
            pdf.text('BOLETO BANCÁRIO', 20, 55);
            
            const linhaDigitavel = formatarLinhaDigitavel(codigoBarrasNumerico);
            pdf.setFont('courier', 'bold');
            pdf.setFontSize(10);
            pdf.text(linhaDigitavel, 20, 70);
            
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
            
            let yPos = 85;
            pdf.text(`Vencimento: ${getVencimentoBoleto()}`, 20, yPos);
            pdf.text(`Valor: R$ ${getValorAtual()}`, 120, yPos);
            
            yPos += 8;
            pdf.text(`Nosso Número: ${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}-${Math.floor(Math.random() * 10)}`, 20, yPos);
            pdf.text(`Agência/Código Cedente: 0001/12345-6`, 120, yPos);
            
            yPos += 8;
            pdf.text(`Beneficiário: BoraSiô Transportes Ltda`, 20, yPos);
            pdf.text(`CNPJ: 12.345.678/0001-90`, 120, yPos);
            
            yPos += 8;
            pdf.text(`Pagador: [Nome do Cliente]`, 20, yPos);
            pdf.text(`CPF: [CPF do Cliente]`, 120, yPos);
            
            yPos += 25;
            pdf.setFontSize(8);
            pdf.setTextColor(100, 100, 100);
            pdf.text('CÓDIGO DE BARRAS:', 20, yPos);
            
            const barcodeHeight = 12;
            const initialX = 20;
            drawBarcodeInPdf(pdf, codigoBarrasNumerico, initialX, yPos + 3, barcodeHeight);
            
            pdf.setFontSize(5);
            pdf.setTextColor(150, 150, 150);
            pdf.text(codigoBarrasNumerico, 20, yPos + 3 + barcodeHeight + 3);
            
            pdf.setDrawColor(0, 0, 0);
            pdf.setLineWidth(0.1);
            pdf.rect(18, yPos - 2, 164, 20);
            
            yPos += 32;
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(9);
            pdf.setTextColor(0, 0, 0);
            pdf.text('INSTRUÇÕES:', 20, yPos);
            pdf.setFont('helvetica', 'normal');
            
            const instrucoes = [
                '• Pagável em qualquer agência bancária ou casa lotérica até o vencimento',
                '• Após o vencimento, pagável apenas na rede BoraSiô',
                '• Evite juros - pague em dia',
                '• Em caso de dúvidas: (98) 4002-8922',
                '• Não receber após o vencimento'
            ];
            
            instrucoes.forEach((instrucao, index) => {
                pdf.text(instrucao, 25, yPos + 6 + (index * 5));
            });
            
            yPos += 35;
            pdf.setFontSize(7);
            pdf.setTextColor(100, 100, 100);
            pdf.text('Autenticação Mecânica', 20, yPos);
            pdf.text(`Código: ${Math.random().toString(36).substring(2, 10).toUpperCase()}`, 20, yPos + 4);
            
            pdf.setFontSize(6);
            pdf.text('Boleto gerado automaticamente pelo sistema BoraSiô', 20, 285);
            pdf.text(`Data de emissão: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}`, 20, 288);
            pdf.text(`Documento: ${Math.random().toString(36).substring(2, 15).toUpperCase()}`, 20, 291);
            
            pdf.save(`boleto-borasio-${Date.now()}.pdf`);
        }

        logoImg.onload = function() {
            pdf.addImage(logoImg, 'PNG', 20, 22, 30, 15);
            drawRestOfPdf(pdf);
        };
        
        logoImg.onerror = function() {
            pdf.setFontSize(16);
            pdf.setTextColor(0, 77, 43);
            pdf.text('BoraSiô', 20, 30);
            drawRestOfPdf(pdf);
        };

    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar o PDF. Tente novamente.');
    }
  }

  // Informações da corrida selecionada
  const getInfoCorrida = () => {
    if (!corridaSelecionada) return null;
    
    return (
      <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-800 mb-2">Informações da Corrida</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-gray-600">Origem:</span> {corridaSelecionada.origem}</div>
          <div><span className="text-gray-600">Destino:</span> {corridaSelecionada.destino}</div>
          <div><span className="text-gray-600">Motorista:</span> {corridaSelecionada.motorista}</div>
          <div><span className="text-gray-600">Veículo:</span> {corridaSelecionada.veiculo}</div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#DAF3D7] to-[#B8E1B3] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando informações de pagamento...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DAF3D7] to-[#B8E1B3] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-[#004d2b] mb-6">Finalizar Pagamento</h1>
          
          {pagamentoFinalizado && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500 text-xl" />
              <div>
                <p className="font-bold">Pagamento finalizado com sucesso!</p>
                <p className="text-sm">Valor pago: R$ {valorFinal.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
          )}
          
          {/* Exibir informações da corrida selecionada */}
          {getInfoCorrida()}
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#004d2b] mb-4">Método de pagamento</h2>
            
            <div className="space-y-3">
              <div 
                className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${metodoPagamento === 'credito' ? 'border-[#FFD700] bg-green-50 ring-2 ring-[#FFD700]' : 'border-gray-300'}`}
                onClick={() => setMetodoPagamento('credito')}
              >
                <FontAwesomeIcon icon={faCreditCard} className="mr-3 text-[#004d2b]" />
                <label className="block text-sm font-medium text-gray-700">
                  Cartão de crédito
                </label>
              </div>
              
              <div 
                className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${metodoPagamento === 'pix' ? 'border-[#FFD700] bg-green-50 ring-2 ring-[#FFD700]' : 'border-gray-300'}`}
                onClick={() => setMetodoPagamento('pix')}
              >
                <FontAwesomeIcon icon={faQrcode} className="mr-3 text-[#004d2b]" />
                <label className="block text-sm font-medium text-gray-700">
                  Pix
                </label>
              </div>

              <div 
                className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${metodoPagamento === 'boleto' ? 'border-[#FFD700] bg-green-50 ring-2 ring-[#FFD700]' : 'border-gray-300'}`}
                onClick={() => setMetodoPagamento('boleto')}
              >
                <FontAwesomeIcon icon={faBarcode} className="mr-3 text-[#004d2b]" />
                <label className="block text-sm font-medium text-gray-700">
                  Boleto
                </label>
              </div>
            </div>
          </div>

          {metodoPagamento === 'credito' && (
            <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-[#004d2b] mb-4">Dados do Cartão</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número do cartão</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d2b]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Validade</label>
                    <input type="text" placeholder="MM/AA" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d2b]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input type="text" placeholder="123" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d2b]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {metodoPagamento === 'pix' && (
            <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200 text-center">
              <h3 className="text-lg font-semibold text-[#004d2b] mb-4">Pagar com Pix</h3>
              <p className="text-gray-600 mb-2">Escaneie o QR Code abaixo com seu app de pagamentos.</p>
              <div className="flex justify-center my-4">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(getPixCode())}`} alt="QR Code Pix" className="border-4 border-white rounded-lg shadow-md" />
              </div>
              <p className="font-bold text-xl text-[#004d2b]">Valor: R$ {getValorAtual()}</p>
              <button 
                onClick={() => navigator.clipboard.writeText(getPixCode())}
                className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-2 px-4 rounded-lg flex items-center justify-center mx-auto"
              >
                <FontAwesomeIcon icon={faCopy} className="mr-2" />
                Copiar código Pix
              </button>
            </div>
          )}

          {metodoPagamento === 'boleto' && (
            <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200 text-center">
              <h3 className="text-lg font-semibold text-[#004d2b] mb-4">Pagamento com Boleto</h3>
              <p className="text-gray-600 mb-4">
                Geramos um boleto para você. Ele também será enviado para o seu e-mail.
              </p>
              
              <div className="border-2 border-dashed border-gray-400 p-4 rounded-lg bg-white text-left text-sm">
                <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <img 
                      src="/img/borasio.png" 
                      alt="Logo BoraSiô" 
                      className="h-8 w-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'text-2xl';
                        fallback.textContent = '🚗';
                        e.currentTarget.parentNode?.insertBefore(fallback, e.currentTarget);
                      }}
                    />
                    <div className="font-bold text-lg text-gray-800">BoraSiô Transportes</div>
                  </div>
                  <div className="flex items-center gap-2 text-green-700 bg-green-100 px-2 py-1 rounded-md text-xs">
                    <FontAwesomeIcon icon={faShieldAlt} />
                    <span>Boleto Confiável</span>
                  </div>
                </div>
                
                <div className="font-mono text-sm mb-4 text-center bg-gray-100 p-2 rounded font-bold">
                  {formatarLinhaDigitavel(codigoBarrasNumerico)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                  <div><span className="text-gray-500 block">Vencimento</span> <span className="font-bold">{getVencimentoBoleto()}</span></div>
                  <div><span className="text-gray-500 block">Agência/Código Cedente</span> <span className="font-bold">0001 / 12345-6</span></div>
                  <div><span className="text-gray-500 block">Nosso Número</span> <span className="font-bold">{Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}-{Math.floor(Math.random() * 10)}</span></div>
                  <div><span className="text-gray-500 block">Valor do Documento</span> <span className="font-bold text-base">R$ {getValorAtual()}</span></div>
                </div>
                
                <div className="text-center mt-4 p-3 bg-white border rounded">
                  <div className="text-xs text-gray-500 mb-2">CÓDIGO DE BARRAS</div>
                  <div className="font-mono text-xs bg-white p-2 border rounded-lg">
                    <div className="tracking-tight leading-3 font-bold" style={{ 
                      letterSpacing: '1px', 
                      fontFamily: 'monospace',
                      fontSize: '8px',
                      lineHeight: '1.2'
                    }}>
                      {gerarCodigoBarrasVisual()}
                    </div>
                    <div className="text-[6px] text-gray-400 mt-1 font-mono">
                      {codigoBarrasNumerico}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button 
                  onClick={() => navigator.clipboard.writeText(formatarLinhaDigitavel(codigoBarrasNumerico))} 
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faCopy} className="mr-2" /> Copiar Linha Digitável
                </button>
                <button 
                  onClick={handleDownloadPdf}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faDownload} className="mr-2" /> Baixar Boleto (PDF)
                </button>
              </div>
            </div>
          )}
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#004d2b] mb-4 flex items-center">
              <FontAwesomeIcon icon={faTicketAlt} className="mr-2 text-green-500" />
              Voucher de desconto
            </h2>
            
            <div className="flex">
              <input type="text" placeholder="Código do voucher" className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              <button 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md"
                onClick={() => setDescontoAplicado(true)}
              >
                Aplicar
              </button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">R$ {valorOriginal.toFixed(2).replace('.', ',')}</span>
            </div>
            
            {descontoAplicado && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Desconto (30%):</span>
                <span>- R$ {(valorOriginal - valorComDesconto).toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            
            <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
              <span>Total:</span>
              <span className="text-[#004d2b]">
                R$ {getValorAtual()}
              </span>
            </div>
          </div>
          
          <button 
            className="w-full bg-[#FFD700] hover:bg-[#FFC000] text-[#004d2b] font-bold py-3 px-4 rounded-md mt-6 transition duration-200 disabled:opacity-50"
            onClick={handleFinalizarPagamento}
            disabled={pagamentoFinalizado}
          >
            {pagamentoFinalizado ? 'Pagamento Concluído' : 'Finalizar pagamento'}
          </button>
        </div>
      </div>
    </div>
  );
}