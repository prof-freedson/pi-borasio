"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function CaronaChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "vitorino",
      text: "Olá! Eu sou o Vitorino, seu parceiro de carona maranhense.\n\nComo posso te ajudar hoje?\n\n1 - Agendar carona\n2 - Problemas com corrida\n3 - Eventos especiais\n4 - Dúvidas sobre o app",
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [fluxo, setFluxo] = useState<"agendamento" | "problema" | "evento" | "duvida" | null>(null);
  const [dadosCarona, setDadosCarona] = useState({ origem: "", destino: "", horario: "" });
  const [tipoProblema, setTipoProblema] = useState("");
  const [eventoEscolhido, setEventoEscolhido] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Função para validar datas no formato brasileiro
  const validarData = (data: string): boolean => {
    // Padrões aceitos: DD/MM/YYYY, DD/MM, DD-MM-YYYY, DD-MM
    const padraoData = /^(\d{1,2})[\/-](\d{1,2})([\/-](\d{4}))?$/;
    const match = data.match(padraoData);
    
    if (!match) return false;
    
    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const ano = match[4] ? parseInt(match[4], 10) : new Date().getFullYear();
    
    // Validar se mês está entre 1-12 e dia entre 1-31
    if (mes < 1 || mes > 12 || dia < 1 || dia > 31) return false;
    
    // Validar meses com 30 dias
    if ([4, 6, 9, 11].includes(mes) && dia > 30) return false;
    
    // Validar fevereiro (considerando ano bissexto)
    if (mes === 2) {
      const isBissexto = (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
      if (dia > (isBissexto ? 29 : 28)) return false;
    }
    
    return true;
  };

  // Função para validar horas no formato brasileiro
  const validarHora = (hora: string): boolean => {
    // Padrões aceitos: HH:MM, HHhMM, HHh, HH (com ou sem minutos)
    const padraoHora = /^(\d{1,2})(?:h|:)?(\d{2})?$/;
    const match = hora.toLowerCase().match(padraoHora);
    
    if (!match) {
      // Aceita palavras como "agora", "tarde", "manhã", etc.
      return ["agora", "tarde", "manhã", "noite", "madrugada", "amanhã", "hoje"].includes(hora.toLowerCase());
    }
    
    const horas = parseInt(match[1], 10);
    const minutos = match[2] ? parseInt(match[2], 10) : 0;
    
    // Validar se horas estão entre 0-23 e minutos entre 0-59
    if (horas < 0 || horas > 23) return false;
    if (minutos < 0 || minutos > 59) return false;
    
    return true;
  };

  // Função para formatar hora para exibição
  const formatarHora = (hora: string): string => {
    if (!validarHora(hora)) return hora;
    
    // Se for palavra como "agora", retorna sem alteração
    if (["agora", "tarde", "manhã", "noite", "madrugada", "amanhã", "hoje"].includes(hora.toLowerCase())) {
      return hora;
    }
    
    const padraoHora = /^(\d{1,2})(?:h|:)?(\d{2})?$/;
    const match = hora.toLowerCase().match(padraoHora);
    
    if (!match) return hora;
    
    const horas = parseInt(match[1], 10);
    const minutos = match[2] ? parseInt(match[2], 10) : 0;
    
    // Formatar para HHhMM (com zero à esquerda se necessário)
    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutos.toString().padStart(2, '0');
    
    return `${horasFormatadas}h${minutosFormatados}`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const userInput = input.trim().toLowerCase();
    let vitorinoResponse = "";

    if (fluxo === null) {
      if (userInput === "1") {
        setFluxo("agendamento");
        setStep(1);
        vitorinoResponse = "Boa! Vamos marcar sua carona.\n\nDe qual bairro você vai sair? (Ex: Cohab, Cohama, Renascença)";
      } else if (userInput === "2") {
        setFluxo("problema");
        setStep(1);
        vitorinoResponse = "Poxa, que pena! Qual foi o problema?\n\n1 - Motorista não apareceu\n2 - Rota muito longa\n3 - Problema no pagamento\n4 - Outro";
      } else if (userInput === "3") {
        setFluxo("evento");
        setStep(1);
        vitorinoResponse = "Ah, os eventos! Qual você vai?\n\n1 - Festa Junina\n2 - Bumba-Meu-Boi\n3 - Carnaval\n4 - Outro";
      } else if (userInput === "4") {
        setFluxo("duvida");
        setStep(1);
        vitorinoResponse = "Em que posso esclarecer suas dúvidas?\n\n1 - Como funciona o Modo Ilha\n2 - Como usar Corrida em Grupo\n3 - Segurança\n4 - Pagamentos";
      } else {
        vitorinoResponse = "Vixe! Escolhe uma opção certa aí, de 1 a 4:\n\n1 - Agendar carona\n2 - Problemas com corrida\n3 - Eventos especiais\n4 - Dúvidas sobre o app";
      }

      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "vitorino", text: vitorinoResponse }]);
      }, 500);

      setInput("");
      return;
    }

    if (fluxo === "agendamento") {
      switch (step) {
        case 1:
          setDadosCarona(prev => ({ ...prev, origem: input }));
          vitorinoResponse = "Beleza! Pra qual bairro você quer ir?";
          setStep(2);
          break;
        case 2:
          setDadosCarona(prev => ({ ...prev, destino: input }));
          vitorinoResponse = "Anotado! Que horas você precisa da carona?\n(Ex: 8h, 14h30, 'agora', 09:45)";
          setStep(3);
          break;
        case 3:
          if (!validarHora(input)) {
            vitorinoResponse = "Ops! Hora inválida. Informe um horário no formato brasileiro:\n\n• 8h ou 08h\n• 14h30 ou 14:30\n• 09:45\n• 'agora', 'tarde', 'manhã'\n\nLembrete: Horas de 0-23 e minutos de 0-59!";
            setStep(3); // Permanece no mesmo passo
          } else {
            const horaFormatada = formatarHora(input);
            setDadosCarona(prev => ({ ...prev, horario: horaFormatada }));
            vitorinoResponse = `✅ Tá marcado!\n\nCarona de ${dadosCarona.origem} para ${dadosCarona.destino} às ${horaFormatada}.\n\nVou te avisar quando encontrar um motorista parceiro!`;
            
            setTimeout(() => {
              setMessages(prev => [...prev, { 
                from: "vitorino", 
                text: "💡 Dica: Ative o 'Modo Ilha' pra encontrar caronas que fazem a ponte entre os bairros!" 
              }]);
              
              setTimeout(resetChat, 3000);
            }, 2000);
          }
          break;
      }
    } else if (fluxo === "problema") {
      if (step === 1) {
        const problemas = {
          "1": "Motorista não apareceu",
          "2": "Rota muito longa",
          "3": "Problema no pagamento",
          "4": input
        };
        
        setTipoProblema(problemas[userInput as "1" | "2" | "3"] || "Outro");
        vitorinoResponse = "Pode me dar mais detalhes? (Ex: motorista atrasou 30min, rota passou pela Av. dos Holandeses congestionada)";
        setStep(2);
      } else if (step === 2) {
        vitorinoResponse = "Vou levar isso pro nosso time corrigir! Já adiantamos seu crédito pra próxima carona.\n\nDesculpe pelo transtorno e obrigado por avisar!";
        
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            from: "vitorino", 
            text: "📌 Relatório:\n- Tipo: " + tipoProblema + "\n- Detalhes: " + input 
          }]);
          
          setTimeout(resetChat, 3000);
        }, 2000);
      }
    } else if (fluxo === "evento") {
      if (step === 1) {
        const eventos = {
          "1": "Festa Junina",
          "2": "Bumba-Meu-Boi",
          "3": "Carnaval",
          "4": input
        };
        
        setEventoEscolhido(eventos[userInput as "1" | "2" | "3"] || "Outro evento");
        vitorinoResponse = "Top! Qual o local e data? (Ex: 'Sábado, 29/06, arraial da Lagoa' ou '15/08 no Centro Histórico')";
        setStep(2);
      } else if (step === 2) {
        // Verificar se a entrada contém uma data válida
        const contemDataValida = input.split(/[\s,]+/).some(part => validarData(part));
        
        if (!contemDataValida) {
          vitorinoResponse = "Para te ajudar melhor com o evento, preciso saber a data. Pode informar? (Ex: 25/12, sábado que vem, ou 15/08/2024)";
          setStep(2); // Permanece no mesmo passo
        } else {
          vitorinoResponse = `Show! Pro ${eventoEscolhido} no ${input}, ative o 'Modo Evento' no app:\n\n1. Vá em Configurações\n2. Ative 'Rotas de Evento'\n3. Veja motoristas especiais pra esse rolê!`;
          
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              from: "vitorino", 
              text: "💡 Dica: Combine 'Corrida em Grupo' com amigos do mesmo bairro pra economizar!" 
            }]);
            
            setTimeout(resetChat, 4000);
          }, 2000);
        }
      }
    } else if (fluxo === "duvida") {
      if (step === 1) {
        const respostas = {
          "1": "O 'Modo Ilha' conecta bairros com rotas inteligentes, evitando pontes congestionadas. Ative no app e veja caronas que fazem o caminho completo!",
          "2": "'Corrida em Grupo' é simples:\n1. Marque no app que aceita companhia\n2. O sistema agrupa pessoas do mesmo bairro\n3. Divida o custo da viagem!",
          "3": "Nossa segurança:\n✔ Motoristas verificados\n✔ Rastreamento em tempo real\n✔ Botão de emergência\n✔ Avaliação após cada corrida",
          "4": "Pagamentos aceitos:\n💳 Cartão\n📱 PIX\n💵 Dinheiro (apenas para corridas avulsas)"
        };
        
        vitorinoResponse = respostas[userInput as "1" | "2" | "3" | "4"] || "Tem mais alguma dúvida? Manda aí!";
        
        if (["1","2","3","4"].includes(userInput)) {
          setStep(2); // Avança para o passo de encerramento
          
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              from: "vitorino", 
              text: "Espero ter ajudado! Precisa de mais alguma coisa?" 
            }]);
            
            setTimeout(resetChat, 3000);
          }, 2000);
        } else {
          // Permite novas perguntas se não for uma opção numérica válida
          setStep(1);
        }
      }
    }

    if (vitorinoResponse) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "vitorino", text: vitorinoResponse }]);
      }, 500);
    }

    setInput("");
  };

  const resetChat = () => {
    setFluxo(null);
    setStep(0);
    setDadosCarona({ origem: "", destino: "", horario: "" });
    setTipoProblema("");
    setEventoEscolhido("");
    setMessages([
      {
        from: "vitorino",
        text: "Olá! Eu sou o Vitorino, seu parceiro de carona maranhense.\n\nComo posso te ajudar hoje?\n\n1 - Agendar carona\n2 - Problemas com corrida\n3 - Eventos especiais\n4 - Dúvidas sobre o app",
      },
    ]);
  }

  const handleCloseChat = () => {
    setOpen(false);
    resetChat();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-400 text-green-800 p-4 rounded-full shadow-lg hover:bg-yellow-500 transition transform hover:scale-110 flex items-center justify-center relative"
          aria-label="Abrir chat de atendimento"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">●</span>
        </button>
      ) : (
        <div className="w-80 h-[28rem] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden border border-yellow-300 relative">
          {/* Cabeçalho */}
          <div className="bg-gradient-to-r from-green-700 to-green-800 p-3 flex justify-between items-center rounded-t-xl z-10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/vitorino.png"
                  alt="Vitorino"
                  className="w-9 h-9 rounded-full border-2 border-yellow-400 object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="font-bold text-white">Vitorino</h2>
                <p className="text-xs text-yellow-200">Online</p>
              </div>
            </div>
            <button 
              onClick={handleCloseChat}
              className="text-yellow-300 hover:text-white transition-colors p-1 z-20"
              aria-label="Fechar chat"
              style={{ position: 'relative' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Área de mensagens */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-yellow-50 to-white">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`whitespace-pre-line p-3 rounded-xl max-w-[85%] text-sm ${
                  msg.from === "vitorino"
                    ? "bg-white text-gray-800 border border-yellow-100 rounded-tl-none shadow-sm"
                    : "bg-green-700 text-white self-end rounded-tr-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Área de input */}
          <div className="p-3 border-t border-yellow-200 bg-white">
            <div className="relative">
              <input
                type="text"
                className="w-full border border-yellow-300 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent pr-12"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Digite sua mensagem..."
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-green-800 p-1.5 rounded-full hover:bg-yellow-500 disabled:opacity-50 transition-colors"
                aria-label="Enviar mensagem"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}