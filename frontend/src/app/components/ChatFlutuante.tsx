"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

type Msg = { from: "vitorino" | "user"; text: string };

export default function CaronaChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "vitorino",
      text:
        "Olá! Eu sou o Vitorino, seu parceiro de carona maranhense.\n\n" +
        "Como posso te ajudar hoje?\n\n" +
        "• Agendar carona\n• Problemas com corrida\n• Eventos especiais\n• Dúvidas sobre o app",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const resetChat = () => {
    setMessages([
      {
        from: "vitorino",
        text:
          "Olá! Eu sou o Vitorino, seu parceiro de carona maranhense.\n\n" +
          "Como posso te ajudar hoje?\n\n" +
          "• Agendar carona\n• Problemas com corrida\n• Eventos especiais\n• Dúvidas sobre o app",
      },
    ]);
  };

  async function handleSend() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Msg = { from: "user", text };
    setInput("");
    setLoading(true);

    const updatedMessages = [...messages, userMsg];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      if (!res.ok) throw new Error(await res.text());
      const json: { content?: string; error?: string } = await res.json();
      const botText = json.content ?? "Desculpe, não consegui responder agora.";
      setMessages([...updatedMessages, { from: "vitorino", text: botText }]);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          from: "vitorino",
          text: "⚠️ Ops! Tive um problema ao falar com a IA. Tente novamente em instantes.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleCloseChat = () => {
    setOpen(false);
    resetChat();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans selection:bg-yellow-400 selection:text-[#004d2b]">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="group bg-[#004d2b] text-white p-5 rounded-[2rem] shadow-2xl hover:bg-[#003823] transition-all duration-500 transform hover:scale-105 flex items-center gap-3 relative border-2 border-white/10"
          aria-label="Abrir chat de atendimento"
        >
          <div className="relative">
             <img
                src="/img/vitorino.png"
                alt="Vitorino"
                className="w-10 h-10 rounded-2xl border-2 border-yellow-400 object-cover shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#004d2b] animate-pulse"></div>
          </div>
          <div className="text-left hidden md:block pr-2">
             <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Fale com o</p>
             <p className="text-sm font-black uppercase tracking-tighter">Vitorino</p>
          </div>
        </button>
      ) : (
        <div className="w-[22rem] h-[32rem] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border-4 border-white relative animate-in slide-in-from-bottom-10 fade-in duration-500">
          {/* Cabeçalho Premium */}
          <div className="bg-[#004d2b] p-6 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl -z-0"></div>
            
            <div className="flex items-center space-x-4 z-10">
              <div className="relative">
                <img
                  src="/img/vitorino.png"
                  alt="Vitorino"
                  className="w-12 h-12 rounded-2xl border-2 border-yellow-400 object-cover shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#004d2b]"></div>
              </div>
              <div>
                <h2 className="font-black text-white uppercase text-sm tracking-tighter">Vitorino</h2>
                <div className="flex items-center gap-1.5 pt-0.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                   <p className="text-[10px] font-black text-yellow-400/80 uppercase tracking-widest">Especialista local</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleCloseChat}
              className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-2.5 transition-all z-20 group"
              aria-label="Fechar chat"
            >
              <X size={18} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          {/* Área de mensagens */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-green-50/30 no-scrollbar">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`relative p-4 rounded-[1.8rem] max-w-[85%] text-[13px] font-medium leading-relaxed shadow-sm transition-all ${
                    msg.from === "vitorino"
                      ? "bg-white text-[#004d2b] rounded-tl-none border border-green-100"
                      : "bg-[#004d2b] text-white rounded-tr-none shadow-[#004d2b]/20"
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                 <div className="bg-white p-4 rounded-[1.8rem] rounded-tl-none border border-green-100 flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[#004d2b]/20 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#004d2b]/20 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-[#004d2b]/20 rounded-full animate-bounce delay-200"></div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Premium */}
          <div className="p-6 bg-white border-t border-green-50">
            <div className="relative group">
              <input
                type="text"
                className="w-full bg-green-50/50 border-2 border-transparent px-5 py-4 rounded-2xl text-[13px] font-bold text-[#004d2b] placeholder:text-gray-400 focus:outline-none focus:border-[#004d2b]/20 focus:bg-white transition-all pr-14 shadow-inner"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Pergunte ao Vitorino..."
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#004d2b] text-white p-2.5 rounded-xl hover:bg-[#003823] disabled:opacity-20 transition-all shadow-lg active:scale-95 group-hover:shadow-[#004d2b]/20"
                aria-label="Enviar mensagem"
              >
                <MessageCircle size={18} fill="currentColor" className="opacity-80" />
              </button>
            </div>
            <p className="text-[8px] text-center font-black text-gray-300 uppercase tracking-widest mt-4">
              Papo reto com inteligência ludovicense
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

