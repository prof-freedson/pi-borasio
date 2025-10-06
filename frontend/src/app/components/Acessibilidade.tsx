"use client";
import React, { useState, useEffect } from "react";
import {
  FaSearchPlus,
  FaSearchMinus,
  FaAdjust,
  FaAssistiveListeningSystems,
  FaKeyboard,
} from "react-icons/fa";
import { X, ChevronDown, ChevronUp, Eye, EyeOff, Play } from "lucide-react";

interface Sign {
  emoji: string;
  title: string;
  description: string;
  demo: string;
  gif?: string;
}

interface SignData {
  [key: string]: Sign;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  signs: string[];
}

const AccessibilityIcon = ({ highContrast }: { highContrast?: boolean }) => (
  <svg
    version="1.2"
    baseProfile="tiny"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12.028 15.293"
    width="30px"
    height="30px"
    aria-hidden="true"
    focusable="false"
    className={highContrast ? "filter brightness-125 contrast-125" : ""}
  >
    <g>
      <path
        fillRule="evenodd"
        fill="#171D2D"
        d="M8.466,14.317l1.059,0.962h2.504l-1.174-1.065l-1.173-1.067L8.607,12.17l-0.284-0.258
        c-0.303,0.467-0.723,0.895-1.181,1.202c-0.255,0.171-0.523,0.306-0.79,0.384c-0.294,0.088-0.613,0.133-0.955,0.133
        c-0.51,0-0.98-0.099-1.412-0.295c-0.432-0.194-0.802-0.46-1.11-0.793c-0.309-0.334-0.549-0.722-0.72-1.169
        c-0.087-0.225-0.152-0.457-0.194-0.696L0.891,9.707L0.089,8.979C0.03,9.304,0,9.64,0,9.983c0,0.727,0.132,1.412,0.397,2.06
        c0.264,0.648,0.631,1.212,1.103,1.691c0.47,0.48,1.034,0.859,1.691,1.138c0.657,0.281,1.382,0.421,2.176,0.421
        c0.137,0,0.274-0.004,0.407-0.014c0.455-0.03,0.883-0.112,1.285-0.244C7.556,14.872,8.03,14.625,8.466,14.317L8.466,14.317z"
      />
      <linearGradient
        id="INDmenu-btn_icon_lg"
        gradientUnits="userSpaceOnUse"
        x1="1.0684"
        y1="3.5537"
        x2="11.4826"
        y2="9.2203"
      >
        <stop offset="0" stopColor="#71C387" />
        <stop offset="1" stopColor="#0596C6" />
      </linearGradient>
      <path
        fillRule="evenodd"
        fill="url(#INDmenu-btn_icon_lg)"
        d="M10.502,11.615c0.175-0.528,0.263-1.081,0.263-1.66
        c0-0.725-0.133-1.412-0.398-2.061c-0.264-0.646-0.631-1.209-1.102-1.689s-1.035-0.861-1.691-1.14
        c-0.656-0.28-1.382-0.419-2.176-0.419c-0.672,0-1.345,0.104-1.975,0.344l0.665-1.688H2.278L0.716,7.272l1.425,1.295l2.248,2.043
        l1.251-1.137L3.09,7.154c0.628-0.56,1.438-0.847,2.277-0.847c0.509,0,0.98,0.098,1.412,0.295c0.431,0.196,0.802,0.46,1.11,0.795
        C8.198,7.729,8.438,8.121,8.61,8.565C8.781,9.01,8.867,9.484,8.867,9.983c0,0.051-0.001,0.098-0.003,0.146l0.691,0.628
        L10.502,11.615L10.502,11.615z M3.865,0c0.693,0,1.254,0.561,1.254,1.253c0,0.693-0.561,1.254-1.254,1.254S2.611,1.946,2.611,1.253
        C2.611,0.561,3.172,0,3.865,0z"
      />
    </g>
  </svg>
);

const AccessibilityWidget = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [isLibrasMenuOpen, setIsLibrasMenuOpen] = useState<boolean>(false);
  const [isVirtualKeyboardOpen, setIsVirtualKeyboardOpen] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const signData: SignData = {
    oi: {
      emoji: "👋",
      title: "OI / OLÁ",
      description: "Levante a mão e faça um movimento de acenar, como se estivesse cumprimentando alguém. Este é o sinal mais básico e universal para cumprimentar.",
      demo: "🤚 → 👋",
      gif: "👋"
    },
    "bom-dia": {
      emoji: "🌅",
      title: "BOM DIA",
      description: 'Faça o sinal de "BOM" (polegar para cima) seguido de "DIA" (movimento circular com a mão representando o sol nascendo).',
      demo: "👍 + ☀️",
      gif: "🌅"
    },
    obrigado: {
      emoji: "🙏",
      title: "OBRIGADO/A",
      description: "Leve a mão direita ao peito, próximo ao coração, e faça um movimento para frente. Expressa gratidão e agradecimento.",
      demo: "❤️ → 🫴",
      gif: "🙏"
    },
    tchau: {
      emoji: "👋",
      title: "TCHAU",
      description: "Levante a mão e balance os dedos para frente e para trás, como uma despedida tradicional.",
      demo: "✋ 🔄 👋",
      gif: "👋"
    },
    pai: {
      emoji: "👨",
      title: "PAI",
      description: "Coloque o polegar da mão direita na testa, próximo à têmpora.",
      demo: "👍 → 🧠",
    },
    mae: {
      emoji: "👩",
      title: "MÃE",
      description: "Coloque o polegar da mão direita no queixo.",
      demo: "👍 → 😊",
    },
    irmao: {
      emoji: "👦",
      title: "IRMÃO/Ã",
      description: "Una os dedos indicadores das duas mãos, mostrando união.",
      demo: "👆 + 👆 = 🤝",
    },
    bebe: {
      emoji: "👶",
      title: "BEBÊ",
      description: "Faça o movimento de embalar um bebê nos braços.",
      demo: "🤱 🔄",
    },
    feliz: {
      emoji: "😊",
      title: "FELIZ",
      description: "Sorria amplamente e faça movimentos ascendentes com as mãos.",
      demo: "😊 + 🙌 ↗️",
    },
    triste: {
      emoji: "😢",
      title: "TRISTE",
      description: "Passe os dedos pelo rosto de cima para baixo, como lágrimas.",
      demo: "😭 👆 ↘️",
    },
    amor: {
      emoji: "❤️",
      title: "AMOR",
      description: "Cruze as mãos sobre o peito, próximo ao coração.",
      demo: "🤗 ❤️",
    },
    odio: {
      emoji: "💢",
      title: "ÓDIO",
      description: "Cerre os punhos e faça expressão de raiva ou frustração.",
      demo: "😠 ✊💢",
    },
    um: {
      emoji: "1️⃣",
      title: "UM",
      description: "Levante apenas o dedo indicador.",
      demo: "☝️",
    },
    dois: {
      emoji: "2️⃣",
      title: "DOIS",
      description: 'Levante o indicador e médio, formando o "V".',
      demo: "✌️",
    },
    tres: {
      emoji: "3️⃣",
      title: "TRÊS",
      description: "Levante três dedos: indicador, médio e anelar.",
      demo: "🤟 → 👆👆👆",
    },
    cinco: {
      emoji: "5️⃣",
      title: "CINCO",
      description: "Abra completamente a mão, mostrando todos os dedos.",
      demo: "🖐️",
    },
  };

  const categories: Category[] = [
    {
      id: "cumprimentos",
      title: "Cumprimentos",
      icon: "👋",
      signs: ["oi", "bom-dia", "obrigado", "tchau"],
    },
    {
      id: "familia",
      title: "Família",
      icon: "👨‍👩‍👧‍👦",
      signs: ["pai", "mae", "irmao", "bebe"],
    },
    {
      id: "sentimentos",
      title: "Sentimentos",
      icon: "😊",
      signs: ["feliz", "triste", "amor", "odio"],
    },
    {
      id: "numeros",
      title: "Números",
      icon: "🔢",
      signs: ["um", "dois", "tres", "cinco"],
    },
  ];

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      const savedHighContrast = localStorage.getItem("highContrast") === "true";
      setIsHighContrast(savedHighContrast);
      applyHighContrast(savedHighContrast);
    }
  }, []);

  const applyHighContrast = (enabled: boolean) => {
    if (typeof document === "undefined") return;

    if (enabled) {
      document.documentElement.classList.add("high-contrast");
      document.querySelectorAll("img, svg").forEach((el) => {
        el.classList.add("brightness-125", "contrast-125");
      });
    } else {
      document.documentElement.classList.remove("high-contrast");
      document.querySelectorAll("img, svg").forEach((el) => {
        el.classList.remove("brightness-125", "contrast-125");
      });
    }
  };

  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);
  const closeMenu = (): void => {
    setIsMenuOpen(false);
    setIsLibrasMenuOpen(false);
    setIsVirtualKeyboardOpen(false);
  };

  const adjustFontSize = (change: number): void => {
    if (typeof document === "undefined") return;

    const html = document.querySelector("html");
    if (!html) return;

    const currentSize = parseFloat(
      window.getComputedStyle(html).getPropertyValue("font-size")
    );
    const newSize = currentSize + change;

    if (newSize >= 12 && newSize <= 24) {
      html.style.fontSize = `${newSize}px`;
    }
  };

  const toggleContrast = (): void => {
    const newContrastState = !isHighContrast;
    setIsHighContrast(newContrastState);
    localStorage.setItem("highContrast", String(newContrastState));
    applyHighContrast(newContrastState);
  };

  const activateScreenReader = (): void => {
    alert(
      "Leitor de tela ativado. Navegue usando o teclado (Tab, Shift+Tab, Enter)"
    );
  };

  const activateVirtualKeyboard = (): void => {
    setIsVirtualKeyboardOpen(true);
    setIsMenuOpen(false);
  };

  const toggleLibrasMenu = (): void => {
    setIsLibrasMenuOpen(!isLibrasMenuOpen);
    setIsMenuOpen(false);
  };

  const toggleCategory = (categoryId: string): void => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleShowAll = (): void => {
    if (showAll) {
      setExpandedCategories(new Set());
    } else {
      setExpandedCategories(new Set(categories.map((c) => c.id)));
    }
    setShowAll(!showAll);
  };

  const LibrasIcon = () => (
    <svg
      viewBox="0 0 100 100"
      className={`w-6 h-6 ${isHighContrast ? "text-yellow-400" : "text-green-600"}`}
      aria-label="Ícone de Libras"
    >
      <path
        d="M30 20 Q40 15 45 25 L45 40 Q40 45 35 40 L30 35 Z"
        fill="currentColor"
      />
      <path
        d="M45 25 Q55 20 60 30 L60 45 Q55 50 50 45 L45 40 Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M60 30 Q70 25 75 35 L75 50 Q70 55 65 50 L60 45 Z"
        fill="currentColor"
        opacity="0.6"
      />
      <circle cx="35" cy="70" r="6" fill="currentColor" />
      <path
        d="M30 75 Q40 80 45 75 Q50 80 45 85 Q35 90 30 85 Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  );

  // Teclado Virtual - Aparece em baixo
  const VirtualKeyboard = () => {
    const [input, setInput] = useState<string>("");
    
    const keys = [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      [' ', '⌫', 'Enter']
    ];

    const handleKeyPress = (key: string) => {
      if (key === '⌫') {
        setInput(prev => prev.slice(0, -1));
      } else if (key === 'Enter') {
        setInput(prev => prev + '\n');
      } else if (key === ' ') {
        setInput(prev => prev + ' ');
      } else {
        setInput(prev => prev + key);
      }
    };

    return (
      <div className="fixed bottom-0 left-0 right-0 z-[100002] bg-white/95 backdrop-blur-sm border-t border-green-200">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className={`text-lg font-bold ${isHighContrast ? "text-yellow-400" : "text-green-900"}`}>
              Teclado Virtual
            </h2>
            <button
              onClick={() => setIsVirtualKeyboardOpen(false)}
              className={isHighContrast ? "text-yellow-400 hover:text-yellow-300 p-1" : "text-green-700 hover:text-green-900 p-1"}
            >
              <X size={20} />
            </button>
          </div>

          <div className={`mb-3 p-3 rounded-lg border min-h-[60px] ${isHighContrast ? "bg-black border-yellow-400 text-yellow-400" : "bg-green-50 border-green-300 text-green-900"}`}>
            {input || "Digite usando o teclado virtual..."}
          </div>

          <div className="space-y-1">
            {keys.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    className={`
                      flex-1 max-w-[40px] h-10 rounded-lg font-semibold transition-all duration-200 text-sm
                      ${key === ' ' ? 'max-w-[120px]' : ''}
                      ${key === 'Enter' ? 'max-w-[60px] text-xs' : ''}
                      ${
                        isHighContrast
                          ? "bg-yellow-600 hover:bg-yellow-700 text-black border border-yellow-400"
                          : "bg-green-600 hover:bg-green-700 text-white border border-green-700"
                      }
                    `}
                  >
                    {key === '⌫' ? '⌫' : key === 'Enter' ? 'Enter' : key}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setInput('')}
              className={`flex-1 py-2 rounded-lg font-semibold text-sm ${
                isHighContrast 
                  ? "bg-yellow-400 hover:bg-yellow-500 text-black" 
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!isMounted) return null;

  return (
    <>
      <style jsx global>{`
        .high-contrast {
          background-color: #000 !important;
          color: #fff !important;
        }
        .high-contrast * {
          color: #fff !important;
          background-color: #000 !important;
          border-color: #ff0 !important;
        }
        .high-contrast button,
        .high-contrast [role="button"],
        .high-contrast [role="link"] {
          background-color: #333 !important;
          border: 2px solid #ff0 !important;
          color: #ff0 !important;
        }
      `}</style>

      {/* Botão Principal */}
      <div className="fixed bottom-10 left-5 z-[99999] flex items-center">
        <button
          onClick={toggleMenu}
          aria-label="Menu de Acessibilidade"
          aria-expanded={isMenuOpen}
          className={`
            bg-white w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 border-none ml-2 hover:scale-110 hover:shadow-xl
            ${
              isHighContrast
                ? "bg-black text-yellow-400 border-2 border-yellow-400"
                : "border border-gray-300 hover:border-green-500"
            }
          `}
        >
          <AccessibilityIcon highContrast={isHighContrast} />
        </button>

        {/* Menu de Opções */}
        <div
          className={`
            ${
              isMenuOpen ? "block" : "hidden"
            } absolute bottom-[70px] left-0 w-[280px] bg-white rounded-xl shadow-2xl overflow-hidden z-[100000] border border-gray-200
            ${isHighContrast ? "bg-black border-2 border-yellow-400" : ""}
          `}
        >
          <div
            className={`bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 font-bold flex justify-between items-center rounded-t-xl
            ${isHighContrast ? "border-b-2 border-yellow-400" : ""}`}
          >
            <span className="flex items-center gap-2">
              <AccessibilityIcon />
              Acessibilidade
            </span>
            <button
              onClick={closeMenu}
              aria-label="Fechar menu de acessibilidade"
              className={`bg-transparent border-none text-white cursor-pointer p-1 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors
                ${isHighContrast ? "hover:bg-yellow-400/20" : ""}`}
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-2 space-y-1">
            <div
              onClick={() => adjustFontSize(1)}
              className={`
                cursor-pointer flex items-center px-3 py-3 rounded-lg transition-all duration-200
                ${
                  isHighContrast
                    ? "text-yellow-400 hover:bg-yellow-400/10 border border-yellow-400/30"
                    : "text-green-800 hover:bg-green-50 hover:text-green-700 border border-transparent hover:border-green-200"
                }
              `}
            >
              <FaSearchPlus className="mr-3 text-lg w-5 text-center text-green-600" /> 
              <span className="font-medium">Aumentar Texto</span>
            </div>

            <div
              onClick={() => adjustFontSize(-1)}
              className={`
                cursor-pointer flex items-center px-3 py-3 rounded-lg transition-all duration-200
                ${
                  isHighContrast
                    ? "text-yellow-400 hover:bg-yellow-400/10 border border-yellow-400/30"
                    : "text-green-800 hover:bg-green-50 hover:text-green-700 border border-transparent hover:border-green-200"
                }
              `}
            >
              <FaSearchMinus className="mr-3 text-lg w-5 text-center text-green-600" /> 
              <span className="font-medium">Diminuir Texto</span>
            </div>

            <div
              onClick={toggleContrast}
              className={`
                cursor-pointer flex items-center px-3 py-3 rounded-lg transition-all duration-200
                ${
                  isHighContrast
                    ? "text-yellow-400 hover:bg-yellow-400/10 border border-yellow-400/30"
                    : "text-green-800 hover:bg-green-50 hover:text-green-700 border border-transparent hover:border-green-200"
                }
              `}
            >
              <FaAdjust className="mr-3 text-lg w-5 text-center text-green-600" /> 
              <span className="font-medium">Alto Contraste</span>
            </div>

            <div
              onClick={activateScreenReader}
              className={`
                cursor-pointer flex items-center px-3 py-3 rounded-lg transition-all duration-200
                ${
                  isHighContrast
                    ? "text-yellow-400 hover:bg-yellow-400/10 border border-yellow-400/30"
                    : "text-green-800 hover:bg-green-50 hover:text-green-700 border border-transparent hover:border-green-200"
                }
              `}
            >
              <FaAssistiveListeningSystems className="mr-3 text-lg w-5 text-center text-green-600" /> 
              <span className="font-medium">Leitor de Tela</span>
            </div>

            <div
              onClick={activateVirtualKeyboard}
              className={`
                cursor-pointer flex items-center px-3 py-3 rounded-lg transition-all duration-200
                ${
                  isHighContrast
                    ? "text-yellow-400 hover:bg-yellow-400/10 border border-yellow-400/30"
                    : "text-green-800 hover:bg-green-50 hover:text-green-700 border border-transparent hover:border-green-200"
                }
              `}
            >
              <FaKeyboard className="mr-3 text-lg w-5 text-center text-green-600" /> 
              <span className="font-medium">Teclado Virtual</span>
            </div>

            <div
              onClick={toggleLibrasMenu}
              className={`
                cursor-pointer flex items-center px-3 py-3 rounded-lg transition-all duration-200
                ${
                  isHighContrast
                    ? "text-yellow-400 hover:bg-yellow-400/10 border border-yellow-400/30"
                    : "text-green-800 hover:bg-green-50 hover:text-green-700 border border-transparent hover:border-green-200"
                }
              `}
            >
              <LibrasIcon />
              <span className="ml-3 font-medium">VLibras</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu de Libras - Tema Verde */}
      {isLibrasMenuOpen && (
        <div
          className={`fixed inset-0 ${
            isHighContrast ? "bg-black/95" : "bg-gradient-to-br from-green-50 to-yellow-50"
          } backdrop-blur-sm flex items-center justify-center p-4 z-[100001]`}
        >
          <div
            className={`bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl p-8 max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border-2 border-green-200
            ${isHighContrast ? "border-2 border-yellow-400 bg-black" : ""}`}
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${isHighContrast ? "bg-yellow-400/20 border border-yellow-400" : "bg-green-100 border border-green-200"}`}>
                  <LibrasIcon />
                </div>
                <div>
                  <h1
                    className={`text-4xl font-bold ${isHighContrast ? "text-yellow-400" : "text-green-900"}`}
                  >
                    Aprenda Libras
                  </h1>
                  <p
                    className={`text-lg ${isHighContrast ? "text-yellow-300" : "text-green-700"}`}
                  >
                    Língua Brasileira de Sinais - Comunicação Inclusiva
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLibrasMenuOpen(false)}
                className={`p-2 rounded-xl transition-colors ${
                  isHighContrast
                    ? "text-yellow-400 hover:bg-yellow-400/20"
                    : "text-green-700 hover:bg-green-100"
                }`}
              >
                <X size={28} />
              </button>
            </div>

            {/* Demonstração Interativa */}
            <div className={`mb-8 rounded-2xl p-6 ${isHighContrast ? "bg-yellow-400/10 border-2 border-yellow-400" : "bg-green-100 border border-green-200"}`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isHighContrast ? "text-yellow-400" : "text-green-800"}`}>
                <Play size={20} />
                Como Aprender Libras
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`text-center p-4 rounded-xl ${isHighContrast ? "bg-yellow-400/20" : "bg-white"}`}>
                  <div className="text-4xl mb-2">👀</div>
                  <h4 className={`font-bold mb-2 ${isHighContrast ? "text-yellow-400" : "text-green-800"}`}>Observe</h4>
                  <p className={isHighContrast ? "text-yellow-300 text-sm" : "text-green-700 text-sm"}>Preste atenção nos movimentos das mãos e expressões faciais</p>
                </div>
                <div className={`text-center p-4 rounded-xl ${isHighContrast ? "bg-yellow-400/20" : "bg-white"}`}>
                  <div className="text-4xl mb-2">👐</div>
                  <h4 className={`font-bold mb-2 ${isHighContrast ? "text-yellow-400" : "text-green-800"}`}>Pratique</h4>
                  <p className={isHighContrast ? "text-yellow-300 text-sm" : "text-green-700 text-sm"}>Repita os sinais até se sentir confortável</p>
                </div>
                <div className={`text-center p-4 rounded-xl ${isHighContrast ? "bg-yellow-400/20" : "bg-white"}`}>
                  <div className="text-4xl mb-2">💬</div>
                  <h4 className={`font-bold mb-2 ${isHighContrast ? "text-yellow-400" : "text-green-800"}`}>Comunique</h4>
                  <p className={isHighContrast ? "text-yellow-300 text-sm" : "text-green-700 text-sm"}>Use os sinais no dia a dia para fixar o aprendizado</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={toggleShowAll}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg
                  ${
                    isHighContrast
                      ? "bg-yellow-600 hover:bg-yellow-700 text-black"
                      : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  }`}
              >
                {showAll ? <EyeOff size={20} /> : <Eye size={20} />}
                {showAll ? "Ocultar Todos" : "Expandir Todos"}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`rounded-2xl p-6 transition-all duration-300
                    ${
                      isHighContrast
                        ? "bg-yellow-400/10 border-2 border-yellow-400 hover:bg-yellow-400/20"
                        : "bg-white border border-green-200 hover:shadow-lg hover:border-green-300"
                    }`}
                >
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between mb-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-3xl p-3 rounded-xl ${isHighContrast ? "bg-yellow-400/20" : "bg-green-100"}`}>
                        {category.icon}
                      </div>
                      <h3
                        className={`text-xl font-bold text-left ${isHighContrast ? "text-yellow-400" : "text-green-900"}`}
                      >
                        {category.title}
                      </h3>
                    </div>
                    {expandedCategories.has(category.id) ? (
                      <ChevronUp
                        className={isHighContrast ? "text-yellow-400" : "text-green-600"}
                        size={24}
                      />
                    ) : (
                      <ChevronDown
                        className={isHighContrast ? "text-yellow-400" : "text-green-600"}
                        size={24}
                      />
                    )}
                  </button>

                  {expandedCategories.has(category.id) && (
                    <div className="grid grid-cols-2 gap-3">
                      {category.signs.map((signId) => {
                        const sign = signData[signId];
                        return (
                          <button
                            key={signId}
                            onClick={() => setSelectedSign(signId)}
                            className={`rounded-xl p-4 text-center transition-all duration-200 transform hover:scale-105 group
                              ${
                                isHighContrast
                                  ? "bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400/30"
                                  : "bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300"
                              }`}
                          >
                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                              {sign.emoji}
                            </div>
                            <div
                              className={`font-bold text-sm mb-1 ${isHighContrast ? "text-yellow-400" : "text-green-800"}`}
                            >
                              {sign.title}
                            </div>
                            <div
                              className={`text-xs ${isHighContrast ? "text-yellow-300" : "text-green-600"}`}
                            >
                              {sign.demo}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Sinal */}
      {selectedSign && (
        <div
          className={`fixed inset-0 ${
            isHighContrast ? "bg-black/95" : "bg-black/80"
          } backdrop-blur-sm flex items-center justify-center p-4 z-[100002]`}
        >
          <div
            className={`rounded-3xl p-8 max-w-2xl w-full relative
            ${
              isHighContrast
                ? "bg-black border-2 border-yellow-400"
                : "bg-gradient-to-br from-green-50 to-yellow-50 border-2 border-green-200"
            }`}
          >
            <button
              onClick={() => setSelectedSign(null)}
              className={`absolute top-6 right-6 p-2 rounded-xl transition-colors
                ${
                  isHighContrast
                    ? "text-yellow-400 hover:bg-yellow-400/20"
                    : "text-green-700 hover:bg-green-100"
                }`}
            >
              <X size={24} />
            </button>

            <div className="text-center">
              <div className="text-6xl mb-6 animate-bounce">
                {signData[selectedSign].emoji}
              </div>
              <h3
                className={`text-3xl font-bold mb-4 ${
                  isHighContrast ? "text-yellow-400" : "text-green-900"
                }`}
              >
                {signData[selectedSign].title}
              </h3>
              <div
                className={`text-xl font-mono mb-6 p-3 rounded-xl ${
                  isHighContrast 
                    ? "bg-yellow-400/20 text-yellow-300" 
                    : "bg-green-100 text-green-700"
                }`}
              >
                {signData[selectedSign].demo}
              </div>
              <p
                className={`text-lg leading-relaxed mb-6 ${
                  isHighContrast ? "text-yellow-200" : "text-green-800"
                }`}
              >
                {signData[selectedSign].description}
              </p>

              {/* Demonstração Prática */}
              <div className={`mt-6 p-4 rounded-xl ${isHighContrast ? "bg-yellow-400/10" : "bg-green-100"}`}>
                <h4 className={`text-xl font-bold mb-3 ${isHighContrast ? "text-yellow-400" : "text-green-800"}`}>
                  💡 Como Fazer:
                </h4>
                <div className="text-left space-y-2">
                  <div className={`flex items-center gap-2 ${isHighContrast ? "text-yellow-300" : "text-green-700"}`}>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Posicione suas mãos conforme a descrição</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isHighContrast ? "text-yellow-300" : "text-green-700"}`}>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Faça os movimentos suavemente</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isHighContrast ? "text-yellow-300" : "text-green-700"}`}>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Pratique algumas vezes até memorizar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teclado Virtual - Aparece em baixo */}
      {isVirtualKeyboardOpen && <VirtualKeyboard />}
    </>
  );
};

export default AccessibilityWidget;