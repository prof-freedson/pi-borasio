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

    // Cria o histórico completo incluindo a nova mensagem do usuário
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
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-400 text-green-800 p-4 rounded-full shadow-lg hover:bg-yellow-500 transition transform hover:scale-110 flex items-center justify-center relative"
          aria-label="Abrir chat de atendimento"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            ●
          </span>
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
              style={{ position: "relative" }}
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
            {loading && (
              <div className="whitespace-pre-line p-3 rounded-xl max-w-[85%] text-sm bg-white text-gray-800 border border-yellow-100 rounded-tl-none shadow-sm">
                digitando…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
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
                disabled={!input.trim() || loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-green-800 p-1.5 rounded-full hover:bg-yellow-500 disabled:opacity-50 transition-colors"
                aria-label="Enviar mensagem"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
