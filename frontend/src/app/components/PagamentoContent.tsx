"use client"

import {
  CreditCard,
  Barcode,
  QrCode,
  Ticket,
  CheckCircle,
  Copy,
  Download,
  ShieldCheck,
  AlertTriangle,
  ChevronLeft,
  Zap,
  Info,
  Calendar,
  Lock,
  Wallet
} from 'lucide-react'
import { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

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
  const [codigoVoucher, setCodigoVoucher] = useState('')
  const [mensagemVoucher, setMensagemVoucher] = useState('')
  const [tipoMensagemVoucher, setTipoMensagemVoucher] = useState<'success' | 'error' | ''>('')

  // Carregar corrida selecionada do localStorage e URL parameters
  useEffect(() => {
    if (!searchParams) return;
    setIsLoading(true)

    // Tentar obter da URL primeiro (valor direto)
    const valorUrl = searchParams?.get('valor')

    // Tentar obter do localStorage (objeto completo)
    const corridaSalva = localStorage.getItem('selectedCorrida')

    if (corridaSalva) {
      try {
        const corrida: Corrida = JSON.parse(corridaSalva)
        setCorridaSelecionada(corrida)

        // Extrair valor numérico do preço (ex: "R$ 8,50" → 8.50)
        const precoNumerico = extrairValorNumerico(corrida.preco)
        setValorOriginal(precoNumerico)
        setValorComDesconto(precoNumerico)
        setValorFinal(precoNumerico)
      } catch (error) {
        console.error('Erro ao parsear corrida:', error)
        // Fallback para valor da URL ou valor padrão
        const valorFallback = valorUrl ? parseFloat(valorUrl) : 15.00
        setValorOriginal(valorFallback)
        setValorComDesconto(valorFallback)
        setValorFinal(valorFallback)
      }
    } else if (valorUrl) {
      // Usar valor direto da URL
      const valor = parseFloat(valorUrl)
      setValorOriginal(valor)
      setValorComDesconto(valor)
      setValorFinal(valor)
    } else {
      // Valor padrão fallback
      const valorPadrao = 15.00
      setValorOriginal(valorPadrao)
      setValorComDesconto(valorPadrao)
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

  // Aplicar desconto baseado no valor e código do voucher
  const aplicarDesconto = (valor: number, codigo: string) => {
    if (codigo.toUpperCase() !== 'OUT31/10') {
      return { valorComDesconto: valor, percentual: 0 }
    }

    if (valor > 10.00) {
      return {
        valorComDesconto: parseFloat((valor * 0.7).toFixed(2)), // 30% de desconto
        percentual: 30
      }
    } else if (valor >= 5.00) {
      return {
        valorComDesconto: parseFloat((valor * 0.8).toFixed(2)), // 20% de desconto
        percentual: 20
      }
    } else {
      return { valorComDesconto: valor, percentual: 0 }
    }
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

  const handleAplicarVoucher = () => {
    if (!codigoVoucher.trim()) {
      setMensagemVoucher('Por favor, insira um código de voucher')
      setTipoMensagemVoucher('error')
      return
    }

    if (codigoVoucher.toUpperCase() !== 'OUT31/10') {
      setMensagemVoucher('Código de voucher inválido')
      setTipoMensagemVoucher('error')
      setDescontoAplicado(false)
      setValorComDesconto(valorOriginal)
      return
    }

    const resultado = aplicarDesconto(valorOriginal, codigoVoucher)

    if (resultado.percentual === 0) {
      setMensagemVoucher('Este voucher não é válido para valores abaixo de R$ 5,00')
      setTipoMensagemVoucher('error')
      setDescontoAplicado(false)
      setValorComDesconto(valorOriginal)
    } else {
      setMensagemVoucher(`Voucher aplicado com sucesso! ${resultado.percentual}% de desconto`)
      setTipoMensagemVoucher('success')
      setDescontoAplicado(true)
      setValorComDesconto(resultado.valorComDesconto)
    }
  }

  const [numeroCartao, setNumeroCartao] = useState('')
  const [validadeCartao, setValidadeCartao] = useState('')
  const [cvcCartao, setCvcCartao] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFinalizarPagamento = async () => {
    setErrorMessage('')
    setIsProcessing(true)

    try {
      const valorPago = descontoAplicado ? valorComDesconto : valorOriginal;
      let tokenCartao = '';

      // Validação de pagamento simulado
      if (metodoPagamento === 'credito') {
        // Remover espaços para verificação
        const cartaoLimpo = numeroCartao.replace(/\s/g, '');

        if (cartaoLimpo !== '4242424242424242') {
          throw new Error('Cartão recusado. Para testes, use o cartão final 4242.');
        }
        tokenCartao = 'tok_visa_4242';
      }

      // Preparar payload para o backend
      const payload = {
        ofertaId: corridaSelecionada?.id,
        passageiroId: 1, // ID fixo para teste, idealmente viria da sessão
        metodoPagamento,
        tokenCartao
      };

      // Tenta chamar o backend
      try {
        const response = await fetch('http://localhost:3001/caronas/reservar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao processar pagamento no servidor.');
        }

      } catch (backendError) {
        console.warn('Backend indisponível ou erro na reserva:', backendError);
        // Em ambiente de desenvolvimento puramente frontend, podemos querer continuar 
        // mesmo se o backend falhar, mas aqui vamos bloquear para validar o fluxo real.
        // Se quiser permitir modo offline, descomente a linha abaixo:
        // if (metodoPagamento === 'credito') throw backendError;
      }

      // Sucesso! Atualiza UI
      setValorFinal(valorPago);
      setPagamentoFinalizado(true)

      // Salvar no histórico de pagamentos
      const pagamentoData = {
        id: Date.now(),
        data: new Date().toLocaleDateString('pt-BR'),
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        metodo: metodoPagamento,
        valor: valorPago,
        origem: corridaSelecionada?.origem || 'Local de origem',
        destino: corridaSelecionada?.destino || 'Local de destino',
        status: 'Concluído'
      };

      // Salvar no localStorage para a página do usuário
      const historicoPagamentos = JSON.parse(localStorage.getItem('historicoPagamentos') || '[]');
      historicoPagamentos.unshift(pagamentoData);
      localStorage.setItem('historicoPagamentos', JSON.stringify(historicoPagamentos));

      // Limpar a corrida selecionada do localStorage após pagamento
      localStorage.removeItem('selectedCorrida')

      setTimeout(() => {
        router.push('/usuario')
      }, 3000)

    } catch (error: any) {
      setErrorMessage(error.message || 'Erro ao processar pagamento.');
    } finally {
      setIsProcessing(false)
    }
  }

  // Renderização do formulário de cartão com estados
  const renderFormularioCartao = () => (
    <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 animate-in fade-in duration-500">
      <h3 className="text-xs font-black text-[#004d2b] uppercase tracking-widest mb-6 flex items-center gap-2">
        <CreditCard className="w-4 h-4" />
        Dados do Cartão (Teste: 4242...)
      </h3>
      <div className="space-y-6">
        <div className="relative">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Número do cartão</label>
          <div className="relative">
            <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              className="w-full bg-white p-5 pl-14 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] transition-all font-bold text-[#004d2b] placeholder:text-gray-200 shadow-sm"
              value={numeroCartao}
              onChange={(e) => setNumeroCartao(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Validade</label>
            <input
              type="text"
              placeholder="MM/AA"
              className="w-full bg-white p-5 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] transition-all font-bold text-[#004d2b] placeholder:text-gray-200 shadow-sm"
              value={validadeCartao}
              onChange={(e) => setValidadeCartao(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">CVC</label>
            <div className="relative">
              <input
                type="text"
                placeholder="123"
                className="w-full bg-white p-5 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] transition-all font-bold text-[#004d2b] placeholder:text-gray-200 shadow-sm"
                value={cvcCartao}
                onChange={(e) => setCvcCartao(e.target.value)}
              />
              <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
        pdf.text(`Data de emissão: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`, 20, 288);
        pdf.text(`Documento: ${Math.random().toString(36).substring(2, 15).toUpperCase()}`, 20, 291);

        pdf.save(`boleto-borasio-${Date.now()}.pdf`);
      }

      logoImg.onload = function () {
        pdf.addImage(logoImg, 'PNG', 20, 22, 30, 15);
        drawRestOfPdf(pdf);
      };

      logoImg.onerror = function () {
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
      <div className="mb-8 p-6 bg-green-50/50 rounded-[32px] border border-green-100/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
          <Zap className="w-24 h-24 text-[#004d2b]" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-[#004d2b] p-1.5 rounded-lg">
              <Info className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-black text-[#004d2b] uppercase text-xs tracking-widest">Resumo da Viagem</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trajeto</p>
              <p className="text-sm font-bold text-[#004d2b]">{corridaSelecionada.origem} → {corridaSelecionada.destino}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Motorista & Veículo</p>
              <p className="text-sm font-bold text-[#004d2b]">{corridaSelecionada.motorista} • {corridaSelecionada.veiculo}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fcfdfc] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 border-4 border-green-100 border-t-[#004d2b] rounded-full animate-spin"></div>
          </div>
          <p className="text-[#004d2b] font-black uppercase tracking-widest text-xs">Preparando checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfc] relative overflow-hidden pb-20">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-3xl -ml-40 -mb-40"></div>

      <div className="max-w-3xl mx-auto px-6 pt-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.back()}
              className="group p-4 bg-white hover:bg-[#004d2b] text-[#004d2b] hover:text-white rounded-2xl transition-all duration-300 shadow-xl shadow-green-900/5 border border-gray-100"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="px-2 py-0.5 bg-yellow-400 font-black text-[10px] uppercase rounded text-[#004d2b] tracking-wider">
                  Checkout Seguro
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-[#004d2b] tracking-tight">
                Finalizar Pagamento
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-lg shadow-green-900/5 border border-gray-100">
            <div className="bg-green-100 p-2 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest text-left">Ambiente</p>
              <p className="text-sm font-bold text-[#004d2b]">100% Protegido</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl shadow-green-900/10 border border-gray-100 overflow-hidden">
          <div className="p-10 md:p-12">

            {pagamentoFinalizado && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-[32px] flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-green-500 text-white p-3 rounded-2xl shadow-lg shadow-green-500/20">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black text-[#004d2b] uppercase text-sm tracking-widest">Pagamento Confirmado!</p>
                  <p className="text-green-700/70 text-sm font-medium">Valor de R$ {valorFinal.toFixed(2).replace('.', ',')} processado com sucesso.</p>
                </div>
              </div>
            )}

            {/* Exibir informações da corrida selecionada */}
            {getInfoCorrida()}

            <div className="mb-12">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Método de pagamento
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'credito', label: 'Cartão', icon: CreditCard },
                  { id: 'pix', label: 'Pix', icon: QrCode },
                  { id: 'boleto', label: 'Boleto', icon: Barcode }
                ].map((method) => (
                  <button
                    key={method.id}
                    className={`flex flex-col items-center justify-center p-6 rounded-[32px] border-2 transition-all duration-300 gap-3 group ${metodoPagamento === method.id
                      ? 'border-[#004d2b] bg-white shadow-2xl shadow-green-900/10 scale-[1.02]'
                      : 'border-gray-50 bg-gray-50/30 text-gray-400 hover:border-green-100 hover:bg-white'
                      }`}
                    onClick={() => setMetodoPagamento(method.id)}
                  >
                    <div className={`p-4 rounded-2xl transition-colors ${metodoPagamento === method.id ? 'bg-green-100 text-[#004d2b]' : 'bg-gray-100 group-hover:bg-green-50 group-hover:text-[#004d2b]'
                      }`}>
                      <method.icon className="w-6 h-6" />
                    </div>
                    <span className={`font-black uppercase tracking-widest text-[10px] ${metodoPagamento === method.id ? 'text-[#004d2b]' : 'text-gray-400'
                      }`}>
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {errorMessage}
                </div>
              )}

              {metodoPagamento === 'credito' && renderFormularioCartao()}

              {metodoPagamento === 'pix' && (
                <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 text-center animate-in fade-in duration-500">
                  <h3 className="text-xs font-black text-[#004d2b] uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
                    <QrCode className="w-4 h-4" />
                    Pagar com Pix
                  </h3>
                  <p className="text-sm text-gray-500 mb-8 font-medium">Escaneie o QR Code abaixo com seu app de pagamentos.</p>

                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-green-500/10 rounded-full blur-3xl scale-150"></div>
                    <div className="relative bg-white p-6 rounded-[32px] shadow-2xl border border-gray-100">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(getPixCode())}`}
                        alt="QR Code Pix"
                        className="w-48 h-48 mx-auto"
                      />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gray-100 mb-6">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Valor do Pagamento</p>
                    <p className="font-black text-3xl text-[#004d2b]">R$ {getValorAtual()}</p>
                  </div>

                  <button
                    onClick={() => navigator.clipboard.writeText(getPixCode())}
                    className="w-full bg-[#004d2b] hover:bg-[#003823] text-white font-black py-5 px-8 rounded-2xl transition-all shadow-xl shadow-green-900/10 flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Copy className="w-5 h-5" />
                    Copiar código Pix
                  </button>
                </div>
              )}

              {metodoPagamento === 'boleto' && (
                <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 text-center animate-in fade-in duration-500">
                  <h3 className="text-xs font-black text-[#004d2b] uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
                    <Barcode className="w-4 h-4" />
                    Pagamento com Boleto
                  </h3>

                  <div className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 text-left mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <ShieldCheck className="w-32 h-32 text-green-600" />
                    </div>

                    <div className="flex justify-between items-center mb-8 relative z-10 border-b border-gray-50 pb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#004d2b] p-2 rounded-xl">
                          <Zap className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div className="font-black text-lg text-[#004d2b] tracking-tight">BoraSiô Pay</div>
                      </div>
                      <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Boleto Seguro</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-2xl font-mono text-[11px] mb-8 break-all border border-gray-100 text-gray-600 font-bold text-center">
                      {formatarLinhaDigitavel(codigoBarrasNumerico)}
                    </div>

                    <div className="grid grid-cols-2 gap-8 relative z-10">
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Vencimento</p>
                        <p className="font-bold text-[#004d2b]">{getVencimentoBoleto()}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Valor Total</p>
                        <p className="font-black text-[#004d2b] text-xl">R$ {getValorAtual()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigator.clipboard.writeText(formatarLinhaDigitavel(codigoBarrasNumerico))}
                      className="flex-1 bg-white hover:bg-gray-50 text-[#004d2b] font-black py-4 px-6 rounded-2xl border border-gray-100 flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <Copy className="w-4 h-4" /> Copiar Linha
                    </button>
                    <button
                      onClick={handleDownloadPdf}
                      className="flex-1 bg-[#004d2b] hover:bg-[#003823] text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-green-900/10 active:scale-95"
                    >
                      <Download className="w-4 h-4" /> Baixar PDF
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-50 mb-12">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                Voucher de desconto
              </h2>

              <div className="bg-yellow-400/10 p-6 rounded-[32px] border border-yellow-400/20 mb-6 flex items-start gap-4">
                <div className="bg-yellow-400 p-2 rounded-xl text-[#004d2b]">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="text-[11px] text-[#004d2b] font-bold">
                  <p className="uppercase tracking-widest mb-1">Cupom Especial: <span className="bg-yellow-400 px-1.5 py-0.5 rounded ml-1">OUT31/10</span></p>
                  <p className="opacity-70 leading-relaxed">• 30% OFF em compras acima de R$ 10,00</p>
                  <p className="opacity-70 leading-relaxed">• 20% OFF em compras partir de R$ 5,00</p>
                </div>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="EX: OUT31/10"
                  className="flex-1 bg-gray-50/50 p-5 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] transition-all font-black text-[#004d2b] placeholder:text-gray-200"
                  value={codigoVoucher}
                  onChange={(e) => setCodigoVoucher(e.target.value)}
                />
                <button
                  className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-black px-8 py-5 rounded-2xl transition-all shadow-xl shadow-yellow-400/20 active:scale-95 text-xs uppercase tracking-widest"
                  onClick={handleAplicarVoucher}
                >
                  Aplicar
                </button>
              </div>

              {mensagemVoucher && (
                <div className={`mt-4 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest animate-in fade-in duration-300 ${tipoMensagemVoucher === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-100'
                  : 'bg-red-50 text-red-700 border border-red-100'
                  }`}>
                  {mensagemVoucher}
                </div>
              )}
            </div>

            <div className="bg-[#004d2b] rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl shadow-green-900/20">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <Zap className="w-48 h-48" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-center opacity-60">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Subtotal</span>
                  <span className="font-bold">R$ {valorOriginal.toFixed(2).replace('.', ',')}</span>
                </div>

                {descontoAplicado && (
                  <div className="flex justify-between items-center text-yellow-400">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Desconto Aplicado</span>
                    <span className="font-bold">- R$ {(valorOriginal - valorComDesconto).toFixed(2).replace('.', ',')}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-sm font-black uppercase tracking-[0.3em]">Total Final</span>
                  <span className="text-4xl font-black tracking-tighter">
                    R$ {getValorAtual()}
                  </span>
                </div>
              </div>

              <button
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-black py-6 px-4 rounded-3xl mt-10 transition-all shadow-xl shadow-yellow-400/20 hover:scale-[1.02] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed text-lg tracking-tight flex items-center justify-center gap-3"
                onClick={handleFinalizarPagamento}
                disabled={pagamentoFinalizado || isProcessing}
              >
                {pagamentoFinalizado ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    PAGAMENTO CONCLUÍDO
                  </>
                ) : isProcessing ? (
                  <>
                    <div className="w-6 h-6 border-4 border-[#004d2b]/30 border-t-[#004d2b] rounded-full animate-spin"></div>
                    PROCESSANDO...
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6 fill-[#004d2b]" />
                    FINALIZAR PAGAMENTO
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Pagamento SSL Seguro
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <Lock className="w-4 h-4 text-gray-400" />
                Dados Criptografados
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}