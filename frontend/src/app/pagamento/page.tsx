"use client"

import { faCreditCard, faBarcode, faQrcode, faTicketAlt, faCheckCircle, faCopy, faDownload, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef, useEffect } from 'react'
import jsPDF from 'jspdf'
import { useRouter } from 'next/navigation'

export default function Pagamento() {
  const router = useRouter()
  const [metodoPagamento, setMetodoPagamento] = useState('credito')
  const [descontoAplicado, setDescontoAplicado] = useState(false)
  const [pagamentoFinalizado, setPagamentoFinalizado] = useState(false)
  const [valorOriginal] = useState(55.00)
  const [valorComDesconto] = useState(37.00)
  const [valorFinal, setValorFinal] = useState(valorOriginal)
  const [codigoBarrasNumerico, setCodigoBarrasNumerico] = useState('')

  // Gerar código de barras aleatório quando o componente montar ou o desconto mudar
  useEffect(() => {
    gerarCodigoBarrasAleatorio()
  }, [descontoAplicado])

  const gerarCodigoBarrasAleatorio = () => {
    // Estrutura básica de um código de barras de boleto: 44 dígitos
    const banco = '237' // Código do banco (Bradesco - Simulação)
    const moeda = '9' // Real
    const fatorVencimento = '9999' // Fator vencimento fixo (apenas simulação)
    const valor = Math.floor((descontoAplicado ? valorComDesconto : valorOriginal) * 100).toString().padStart(10, '0')
    
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
    
    // Regra do Módulo 11 para Boletos (simplificada, pode variar por banco)
    if (dv === 0 || dv === 10 || dv === 11) return '1' 
    return dv.toString()
  }

  const formatarLinhaDigitavel = (codigo: string) => {
    if (!codigo) return ''
    
    // Campos da Linha Digitável (montado a partir do código de barras de 44 dígitos)
    const campo1 = codigo.substring(0, 4) + codigo.substring(19, 24)
    const campo2 = codigo.substring(24, 34)
    const campo3 = codigo.substring(34, 44)
    const campo4 = codigo.substring(4, 5) // DV Geral
    const campo5 = codigo.substring(5, 9) + codigo.substring(9, 19) // Fator Vencimento + Valor
    
    // Cálculo dos DVs dos campos 1, 2 e 3 (Módulo 10 - simplificado para exibição)
    // Para simplificar, não faremos o cálculo do módulo 10 aqui, apenas a formatação visual
    const dv1 = '8' 
    const dv2 = '9' 
    const dv3 = '0' 
    
    return `${campo1.substring(0, 5)}.${campo1.substring(5)}${dv1} ${campo2.substring(0, 5)}.${campo2.substring(5)}${dv2} ${campo3.substring(0, 5)}.${campo3.substring(5)}${dv3} ${campo4} ${campo5}`
  }

  const handleFinalizarPagamento = () => {
    const valorPago = descontoAplicado ? valorComDesconto : valorOriginal;
    setValorFinal(valorPago);
    setPagamentoFinalizado(true)
    
    // Simulação de redirecionamento após 3 segundos
    setTimeout(() => {
      router.push('/usuario')
    }, 3000)
  }

  const getValorAtual = () => {
    const valorAtual = descontoAplicado ? valorComDesconto : valorOriginal;
    return valorAtual.toFixed(2).replace('.', ',');
  }

  const valorAtualNumerico = descontoAplicado ? valorComDesconto : valorOriginal;
  // Código PIX estático para simulação (em produção seria gerado por API)
  const pixCode = `00020126360014br.gov.bcb.pix0114+5598999999999520400005303986540${valorAtualNumerico.toFixed(2).length.toString().padStart(2, '0')}${valorAtualNumerico.toFixed(2)}5802BR5913NOME DO RECEBEDOR6009SAO LUIS62070503***6304ABCD`;

  const getVencimentoBoleto = () => {
    const data = new Date();
    data.setDate(data.getDate() + 3);
    return data.toLocaleDateString('pt-BR');
  }
  
  // Função para carregar a imagem e converter para Base64 (necessário para jsPDF)
  const getBase64Image = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Importante para evitar problemas de CORS
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          // Tenta obter o Base64, priorizando PNG se for um logo
          try {
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
          } catch (e) {
            // Fallback para JPEG se PNG falhar
            resolve(canvas.toDataURL('image/jpeg'));
          }
        } else {
          reject(new Error('Canvas context not available'));
        }
      };
      img.onerror = (e) => {
        console.error('Erro ao carregar imagem para Base64:', e);
        reject(new Error('Failed to load image for PDF.'));
      };
      img.src = url;
    });
  };
  
  // Função para desenhar o código de barras no PDF (simulação visual do Intercalado 2 de 5)
  const drawBarcodeInPdf = (pdf: jsPDF, codigo: string, x: number, y: number, height: number, barWidth: number) => {
    pdf.setDrawColor(0, 0, 0);
    pdf.setFillColor(0, 0, 0);

    // O padrão Intercalado 2 de 5 usa barras e espaços
    // O código de boleto (44 dígitos) é a sequência numérica a ser codificada.
    
    // Simulação simplificada de barras pretas e brancas (que seriam os espaços)
    const fullCode = codigo; 
    let currentX = x;
    const thinBar = barWidth;
    const wideBar = barWidth * 2; // Simula a barra larga
    const gap = barWidth; // Simula o espaço

    // Desenha uma sequência estilizada de barras (simulação visual de Intercalado 2 de 5)
    for (let i = 0; i < fullCode.length; i++) {
        const digito = parseInt(fullCode[i]);
        
        // Define a largura da barra e do espaço de forma alternada e estilizada
        // O padrão 2 de 5 intercala 5 elementos (2 largos, 3 finos) por par de dígitos.
        // Aqui, faremos uma simulação mais simples, alternando a largura das barras pretas para dar o efeito visual.
        
        let barW = thinBar;
        if (i < 4 || i > fullCode.length - 5) {
            // Barras de início e fim (geralmente fixas)
            barW = thinBar;
        } else if (digito % 2 === 0) {
            // Barras mais largas para dígitos pares (efeito visual)
            barW = wideBar; 
        } else {
            // Barras mais finas para dígitos ímpares (efeito visual)
            barW = thinBar; 
        }

        // Desenha a barra preta
        pdf.rect(currentX, y, barW, height, 'F');
        
        currentX += barW; 
        
        // Adiciona um espaço branco (barra "branca")
        currentX += gap; 
        
        if (currentX > 185) break; // Limite da página
    }
  }

  const handleDownloadPdf = async () => {
    try {
      // @ts-ignore
      const pdf = new jsPDF('p', 'mm', 'a4');
      const logoUrl = '/img/borasio.png';
      let logoBase64: string | undefined;

      try {
        // Tenta carregar a logo de forma assíncrona
        logoBase64 = await getBase64Image(logoUrl);
      } catch (error) {
        console.warn('Não foi possível carregar a logo. Usando fallback de texto no PDF.', error);
      }

      const drawRestOfPdf = (pdf: jsPDF, logoBase64?: string) => {
        
        // Adicionar Logo ou Fallback
        if (logoBase64) {
            pdf.addImage(logoBase64, 'PNG', 20, 22, 30, 15); 
        } else {
            pdf.setFontSize(16);
            pdf.setTextColor(0, 77, 43);
            pdf.text('BoraSiô', 20, 30);
        }

        // Texto ao lado da logo
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Sistema de Transporte Seguro', 60, 37); 
        
        // Linha divisória
        pdf.setDrawColor(0, 77, 43);
        pdf.setLineWidth(0.5);
        pdf.line(20, 40, 190, 40);
        
        // Título do boleto
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);
        pdf.text('BOLETO BANCÁRIO', 20, 55);
        
        // Linha digitável
        const linhaDigitavel = formatarLinhaDigitavel(codigoBarrasNumerico);
        pdf.setFont('courier', 'bold');
        pdf.setFontSize(10);
        pdf.text(linhaDigitavel, 20, 70);
        
        // Dados principais
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
        
        // CÓDIGO DE BARRAS VISUAL COM RETÂNGULOS (MELHORADO)
        yPos += 25;
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text('CÓDIGO DE BARRAS:', 20, yPos);
        
        // Retângulo ao redor do código de barras
        pdf.setDrawColor(0, 0, 0);
        pdf.setLineWidth(0.1);
        pdf.rect(18, yPos - 2, 164, 18); // Ajusta a altura
        
        // Desenha as barras
        const barcodeHeight = 10;
        const initialX = 20; // Posição X inicial das barras
        const barWidthUnit = 0.3; // Largura base da barra em mm (menor para caber mais)
        drawBarcodeInPdf(pdf, codigoBarrasNumerico, initialX, yPos + 3, barcodeHeight, barWidthUnit);
        
        // Adicionar números do código de barras (pequenos e discretos) ABAIXO DAS BARRAS
        pdf.setFontSize(4);
        pdf.setTextColor(150, 150, 150);
        // Colocando os números centralizados sob as barras (simulação)
        pdf.text(codigoBarrasNumerico, 20, yPos + 3 + barcodeHeight + 2, { align: 'left', maxWidth: 160 }); 
        
        // Instruções
        yPos += 30; // Ajusta a posição Y 
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(0, 0, 0);
        pdf.text('INSTRUÇÕES:', 20, yPos);
        pdf.setFont('helvetica', 'normal');
        
        const instrucoes = [
            '• Pagável em qualquer agência bancária ou casa lotérica até o vencimento',
            '• Após o vencimento, pague com juros de 1% ao dia.',
            '• Evite juros - pague em dia',
            '• Em caso de dúvidas: (98) 4002-8922',
            '• Não receber após 30 dias do vencimento'
        ];
        
        instrucoes.forEach((instrucao, index) => {
            pdf.text(instrucao, 25, yPos + 6 + (index * 5));
        });
        
        // Informações de autenticação
        yPos += 35;
        pdf.setFontSize(7);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Autenticação Mecânica', 20, yPos);
        pdf.text(`Código: ${Math.random().toString(36).substring(2, 10).toUpperCase()}`, 20, yPos + 4);
        
        // Rodapé
        pdf.setFontSize(6);
        pdf.text('Boleto gerado automaticamente pelo sistema BoraSiô', 20, 285);
        pdf.text(`Data de emissão: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}`, 20, 288);
        pdf.text(`Documento: ${Math.random().toString(36).substring(2, 15).toUpperCase()}`, 20, 291);
        
        pdf.save(`boleto-borasio-${Date.now()}.pdf`);
      }

      // Chama a função de desenho do PDF
      drawRestOfPdf(pdf, logoBase64);

    } catch (error) {
        console.error('Erro geral ao gerar PDF:', error);
        alert('Erro ao gerar o PDF. Tente novamente.');
    }
  }

  // Função mantida para a visualização na tela do aplicativo (com barras visuais)
  const gerarCodigoBarrasVisualMelhorado = () => {
    if (!codigoBarrasNumerico) return '';
    
    let tracos = '';
    // Use caracteres com boa largura em fontes monoespaçadas para simular barras
    // █ (Block Completo) para barras grossas, ▌ (Half Block) para barras finas
    const patterns = ['█', '█', '▌', '█', '▌', '█', '▌', '█', '▌', '█']; 
    
    for (let i = 0; i < codigoBarrasNumerico.length; i++) {
      const digito = parseInt(codigoBarrasNumerico[i]);
      const pattern = (i % 2 === 0) ? '█' : '▌'; // Alterna para dar o efeito visual
      tracos += pattern;
    }
    
    return tracos;
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
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pixCode)}`} alt="QR Code Pix" className="border-4 border-white rounded-lg shadow-md" />
              </div>
              <p className="font-bold text-xl text-[#004d2b]">Valor: R$ {getValorAtual()}</p>
              <button 
                onClick={() => navigator.clipboard.writeText(pixCode)}
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
                    {/* Simulação na tela (ajustada para um visual de barras) */}
                    <div className="tracking-tighter leading-3 font-bold text-[18px]" style={{ letterSpacing: '-0.1px', fontFamily: 'monospace', lineHeight: '14px' }}>
                      {gerarCodigoBarrasVisualMelhorado()} 
                    </div>
                    <div className="text-[8px] text-gray-400 mt-1 font-mono">
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
                <span>Desconto:</span>
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
  )
}