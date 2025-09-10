"use client";
import React, { useState, useEffect } from "react";
import {
  FaSearchPlus,
  FaSearchMinus,
  FaAdjust,
  FaAssistiveListeningSystems,
  FaKeyboard,
} from "react-icons/fa";
import { X, ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";

interface Sign {
  emoji: string;
  title: string;
  description: string;
  demo: string;
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
      description:
        "Levante a mão e faça um movimento de acenar, como se estivesse cumprimentando alguém. Este é o sinal mais básico e universal para cumprimentar.",
      demo: "🤚 → 👋",
    },
    "bom-dia": {
      emoji: "🌅",
      title: "BOM DIA",
      description:
        'Faça o sinal de "BOM" (polegar para cima) seguido de "DIA" (movimento circular com a mão representando o sol nascendo).',
      demo: "👍 + ☀️",
    },
    obrigado: {
      emoji: "🙏",
      title: "OBRIGADO/A",
      description:
        "Leve a mão direita ao peito, próximo ao coração, e faça um movimento para frente. Expressa gratidão e agradecimento.",
      demo: "❤️ → 🫴",
    },
    tchau: {
      emoji: "👋",
      title: "TCHAU",
      description:
        "Levante a mão e balance os dedos para frente e para trás, como uma despedida tradicional.",
      demo: "✋ 🔄 👋",
    },
    pai: {
      emoji: "👨",
      title: "PAI",
      description:
        "Coloque o polegar da mão direita na testa, próximo à têmpora.",
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
      description:
        "Sorria amplamente e faça movimentos ascendentes com as mãos.",
      demo: "😊 + 🙌 ↗️",
    },
    triste: {
      emoji: "😢",
      title: "TRISTE",
      description:
        "Passe os dedos pelo rosto de cima para baixo, como lágrimas.",
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
    alert("Teclado virtual ativado. Use as teclas na tela para navegar");
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
      className={`w-5 h-5 fill-current ${
        isHighContrast ? "brightness-125 contrast-125" : ""
      }`}
      aria-label="Ícone de Libras"
    >
      <path
        d="M20 30 Q25 20 35 25 L35 35 Q30 40 25 35 Z"
        className="fill-blue-300"
      />
      <path
        d="M35 25 Q45 15 55 25 L55 40 Q50 45 45 40 L35 35 Z"
        className="fill-blue-400"
      />
      <path
        d="M55 25 Q65 20 70 30 L70 45 Q65 50 60 45 L55 40 Z"
        className="fill-blue-500"
      />
      <path
        d="M70 30 Q75 25 80 35 L80 50 Q75 55 70 50 L70 45 Z"
        className="fill-blue-600"
      />
      <circle cx="30" cy="70" r="8" className="fill-pink-400" />
      <path
        d="M25 75 Q35 85 45 75 Q50 80 45 85 Q30 90 25 85 Z"
        className="fill-pink-300"
      />
    </svg>
  );

  if (!isMounted) return null;

  return (
    <>
      {/* Adicione isso ao seu arquivo global.css */}
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
        .high-contrast .bg-gradient-to-r {
          background-image: linear-gradient(
            to right,
            #71c387,
            #0596c6
          ) !important;
        }
      `}</style>

      {/* Alteração principal: bottom-20 para bottom-10 */}
      <div className="fixed bottom-10 left-5 z-[99999] flex items-center">
        <button
          onClick={toggleMenu}
          aria-label="Menu de Acessibilidade"
          aria-expanded={isMenuOpen}
          className={`
            bg-white w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer shadow-md transition-transform duration-300 border-none ml-2 hover:scale-110
            ${
              isHighContrast
                ? "bg-black text-yellow-400 border-2 border-yellow-400"
                : ""
            }
          `}
        >
          <AccessibilityIcon highContrast={isHighContrast} />
        </button>

        <div
          className={`
            ${
              isMenuOpen ? "block" : "hidden"
            } absolute bottom-[70px] left-0 w-[250px] bg-white rounded-lg shadow-lg overflow-hidden z-[100000]
            ${isHighContrast ? "bg-black border-2 border-yellow-400" : ""}
          `}
        >
          <div
            className={`bg-gradient-to-r from-[#71C387] to-[#0596C6] text-white px-4 py-2 font-bold flex justify-between items-center
            ${isHighContrast ? "border-b-2 border-yellow-400" : ""}`}
          >
            <span>Acessibilidade</span>
            <button
              onClick={closeMenu}
              aria-label="Fechar menu de acessibilidade"
              className={`bg-transparent border-none text-white cursor-pointer p-[2px] rounded-full flex items-center justify-center
                ${
                  isHighContrast
                    ? "hover:bg-yellow-400/20"
                    : "hover:bg-white/20"
                }`}
            >
              <X size={18} />
            </button>
          </div>

          <div
            onClick={() => adjustFontSize(1)}
            className={`
              cursor-pointer flex items-center px-4 py-3 border-b border-gray-200
              ${
                isHighContrast
                  ? "text-yellow-400 border-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <FaSearchPlus className="mr-2 text-lg w-5 text-center" /> Aumentar
            Texto
          </div>

          <div
            onClick={() => adjustFontSize(-1)}
            className={`
              cursor-pointer flex items-center px-4 py-3 border-b border-gray-200
              ${
                isHighContrast
                  ? "text-yellow-400 border-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <FaSearchMinus className="mr-2 text-lg w-5 text-center" /> Diminuir
            Texto
          </div>

          <div
            onClick={toggleContrast}
            className={`
              cursor-pointer flex items-center px-4 py-3 border-b border-gray-200
              ${
                isHighContrast
                  ? "text-yellow-400 border-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <FaAdjust className="mr-2 text-lg w-5 text-center" /> Alto Contraste
          </div>

          <div
            onClick={activateScreenReader}
            className={`
              cursor-pointer flex items-center px-4 py-3 border-b border-gray-200
              ${
                isHighContrast
                  ? "text-yellow-400 border-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <FaAssistiveListeningSystems className="mr-2 text-lg w-5 text-center" />{" "}
            Leitor de Tela
          </div>

          <div
            onClick={activateVirtualKeyboard}
            className={`
              cursor-pointer flex items-center px-4 py-3 border-b border-gray-200
              ${
                isHighContrast
                  ? "text-yellow-400 border-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <FaKeyboard className="mr-2 text-lg w-5 text-center" /> Teclado
            Virtual
          </div>

          <div
            onClick={toggleLibrasMenu}
            className={`
              cursor-pointer flex items-center px-4 py-3
              ${
                isHighContrast
                  ? "text-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <LibrasIcon />
            <span className="ml-2">VLibras</span>
          </div>
        </div>
      </div>

      {isLibrasMenuOpen && (
        <div
          className={`fixed inset-0 ${
            isHighContrast ? "bg-black/90" : "bg-black/80"
          } backdrop-blur-sm flex items-center justify-center p-4 z-[100001]`}
        >
          <div
            className={`bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto
            ${isHighContrast ? "border-2 border-yellow-400" : ""}`}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <LibrasIcon />
                <h1
                  className={`text-3xl font-bold ${
                    isHighContrast ? "text-yellow-400" : "text-white"
                  }`}
                >
                  Menu de Libras
                </h1>
                <LibrasIcon />
              </div>
              <button
                onClick={() => setIsLibrasMenuOpen(false)}
                className={
                  isHighContrast
                    ? "text-yellow-400 hover:text-yellow-300"
                    : "text-white hover:text-gray-300"
                }
              >
                <X size={24} />
              </button>
            </div>

            <p
              className={`text-center mb-6 ${
                isHighContrast ? "text-yellow-300" : "text-gray-300"
              }`}
            >
              Aprenda os sinais básicos da Língua Brasileira de Sinais
            </p>

            <div className="flex justify-center mb-6">
              <button
                onClick={toggleShowAll}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300
                  ${
                    isHighContrast
                      ? "bg-yellow-600 hover:bg-yellow-700 text-black"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  }`}
              >
                {showAll ? <EyeOff size={16} /> : <Eye size={16} />}
                {showAll ? "Ocultar Tudo" : "Mostrar Tudo"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`backdrop-blur-lg rounded-xl p-4
                    ${
                      isHighContrast
                        ? "bg-yellow-400/10 border-2 border-yellow-400"
                        : "bg-white/10 border border-white/20"
                    }`}
                >
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between mb-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">{category.icon}</div>
                      <h3
                        className={`text-lg font-bold ${
                          isHighContrast ? "text-yellow-400" : "text-white"
                        }`}
                      >
                        {category.title}
                      </h3>
                    </div>
                    {expandedCategories.has(category.id) ? (
                      <ChevronUp
                        className={
                          isHighContrast ? "text-yellow-400" : "text-white"
                        }
                        size={20}
                      />
                    ) : (
                      <ChevronDown
                        className={
                          isHighContrast ? "text-yellow-400" : "text-white"
                        }
                        size={20}
                      />
                    )}
                  </button>

                  {expandedCategories.has(category.id) && (
                    <div className="grid grid-cols-2 gap-2">
                      {category.signs.map((signId) => {
                        const sign = signData[signId];
                        return (
                          <button
                            key={signId}
                            onClick={() => setSelectedSign(signId)}
                            className={`rounded-lg p-3 text-center transition-all duration-200 transform hover:scale-105
                              ${
                                isHighContrast
                                  ? "bg-yellow-400/20 hover:bg-yellow-400/30"
                                  : "bg-white/20 hover:bg-white/30"
                              }`}
                          >
                            <div className="text-2xl mb-1">{sign.emoji}</div>
                            <div
                              className={`font-semibold text-sm mb-1 ${
                                isHighContrast
                                  ? "text-yellow-400"
                                  : "text-white"
                              }`}
                            >
                              {sign.title}
                            </div>
                            <div
                              className={
                                isHighContrast
                                  ? "text-yellow-300"
                                  : "text-gray-300"
                              }
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

      {selectedSign && (
        <div
          className={`fixed inset-0 ${
            isHighContrast ? "bg-black/95" : "bg-black/90"
          } backdrop-blur-sm flex items-center justify-center p-4 z-[100002]`}
        >
          <div
            className={`rounded-2xl p-6 max-w-md w-full relative
            ${
              isHighContrast
                ? "bg-black border-2 border-yellow-400"
                : "bg-white"
            }`}
          >
            <button
              onClick={() => setSelectedSign(null)}
              className={`absolute top-4 right-4 transition-colors
                ${
                  isHighContrast
                    ? "text-yellow-400 hover:text-yellow-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <div className="text-5xl mb-4">
                {signData[selectedSign].emoji}
              </div>
              <h3
                className={`text-2xl font-bold mb-3 ${
                  isHighContrast ? "text-yellow-400" : "text-gray-800"
                }`}
              >
                {signData[selectedSign].title}
              </h3>
              <div
                className={`text-lg font-mono mb-3 ${
                  isHighContrast ? "text-yellow-300" : "text-blue-600"
                }`}
              >
                {signData[selectedSign].demo}
              </div>
              <p
                className={
                  isHighContrast
                    ? "text-yellow-200 leading-relaxed"
                    : "text-gray-600 leading-relaxed"
                }
              >
                {signData[selectedSign].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityWidget;