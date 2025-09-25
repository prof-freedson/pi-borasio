"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaTextHeight,
  FaSearchPlus,
  FaSearchMinus,
  FaAdjust,
  FaAssistiveListeningSystems,
  FaKeyboard,
  FaSignLanguage,
} from "react-icons/fa";
import { X } from "lucide-react";
import VirtualKeyboard from "./VirtualKeyboard"; // Importar o novo componente
import { usePathname } from "next/navigation";

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
  const [isVlibrasReady, setIsVlibrasReady] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false); // Estado para rastrear a interação do usuário
  const [isVirtualKeyboardOpen, setIsVirtualKeyboardOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      const savedHighContrast = localStorage.getItem("highContrast") === "true";
      setIsHighContrast(savedHighContrast);
      applyHighContrast(savedHighContrast);
    }
  }, [pathname]); // A dependência no `pathname` garante que o efeito rode a cada mudança de rota.

  // Efeito para carregar o VLibras apenas uma vez
  useEffect(() => {
    // Esta função inicializa ou reinicializa o widget do VLibras.
    const setupVlibras = () => {
      if (window.VLibras) {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
        setIsVlibrasReady(true);
      }
    };

    // Verifica se o script já foi injetado para não duplicar
    if (!document.getElementById("vlibras-script")) {
      setIsVlibrasReady(false);

      // Cria a div de ancoragem que o VLibras precisa
      const vwDiv = document.createElement('div');
      vwDiv.setAttribute('vw', 'true');
      vwDiv.className = 'enabled';
      document.body.appendChild(vwDiv);

      // Cria e injeta o script do VLibras
      const script = document.createElement("script");
      script.id = "vlibras-script";
      script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
      script.async = true;
      script.onload = setupVlibras; // Chama o setup quando o script carregar
      document.body.appendChild(script);
    } else {
      // Se o script já existe, apenas reinicializa o widget para a nova página
      setupVlibras();
    }

    // Função de limpeza para remover o botão flutuante ao trocar de página
    return () => {
      document.querySelector('.vw-access-button')?.remove();
    };
  }, [pathname]); // A dependência no `pathname` garante que o efeito rode a cada mudança de rota.

  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Hook para lidar com cliques fora do menu para fechá-lo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]); // Executa apenas quando o menu está aberto

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

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
    // Na primeira vez que o usuário clica, marcamos que ele interagiu.
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };
  const closeMenu = (): void => {
    setIsMenuOpen(false);
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

  const resetFontSize = (): void => {
    if (typeof document === "undefined") return;
    const html = document.querySelector("html");
    if (html) {
      html.style.fontSize = ""; // Remove o estilo inline, voltando ao padrão do CSS
    }
  };

  const toggleContrast = (): void => {
    const newContrastState = !isHighContrast;
    setIsHighContrast(newContrastState);
    localStorage.setItem("highContrast", String(newContrastState));
    applyHighContrast(newContrastState);
  };

  const showNotification = (message: string) => {
    setNotification(message);
    // A notificação desaparecerá após 5 segundos
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const activateScreenReader = (): void => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      // Tenta encontrar o conteúdo principal da página para ler.
      const mainElement = document.querySelector("main");
      const firstHeading = document.querySelector("h1");
      let textToRead = "";

      if (mainElement?.innerText) {
        // Limita o texto para não ser uma leitura muito longa na demonstração
        textToRead = `Iniciando leitura do conteúdo principal. ${mainElement.innerText.substring(
          0,
          300
        )}`;
      } else if (firstHeading?.innerText) {
        textToRead = `Lendo o título principal: ${firstHeading.innerText}`;
      } else {
        textToRead =
          "Não foi possível encontrar um conteúdo principal para ler. Navegue com seu leitor de tela para explorar a página.";
      }

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = "pt-BR";
      window.speechSynthesis.speak(utterance);
      showNotification("Iniciando leitura da página...");
    } else {
      showNotification("Seu navegador não suporta esta funcionalidade.");
    }
    closeMenu();
  };

  const activateVirtualKeyboard = (): void => {
    setIsVirtualKeyboardOpen(!isVirtualKeyboardOpen);
    closeMenu();
  };

  const activateVlibras = (): void => {
    // Esta função só é chamada quando o botão está habilitado (isVlibrasReady é true).
    const vlibrasButton = document.querySelector('.vw-access-button');
    if (vlibrasButton) {
      (vlibrasButton as HTMLElement).click();
    } else {
      // Mensagem de fallback caso algo inesperado ocorra.
      alert('Não foi possível ativar a ferramenta VLibras. Por favor, recarregue a página.');
    }
  };

  const playHoverSound = () => {
    // Só tenta tocar o som se o usuário já tiver interagido (clicado) no widget.
    if (!hasInteracted) return;

    try {
      // Certifique-se de que o arquivo de som está na pasta /public, por exemplo: /sounds/hover.mp3
      const audio = new Audio('/sounds/hover.mp3');
      audio.volume = 0.2; // Ajuste o volume se necessário (0.0 a 1.0)
      audio.play().catch(error => console.error("Erro ao tocar o som:", error));
    } catch (error) {
      console.error("Não foi possível carregar o arquivo de som.", error);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {isVirtualKeyboardOpen && (
        <VirtualKeyboard
          onClose={() => setIsVirtualKeyboardOpen(false)}
          onKeyPress={(key) => {
            showNotification(`Tecla pressionada: ${key}`);
          }}
        />
      )}
      {notification && (
        <div
          className={`
            fixed bottom-28 left-5 z-[100001] max-w-sm bg-gray-800 text-white px-4 py-3 rounded-lg shadow-xl transition-opacity duration-300
            ${
              isHighContrast
                ? "bg-yellow-400 text-black border-2 border-black"
                : ""
            }
          `}
        >
          {notification}
        </div>
      )}
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
        /* Oculta o botão flutuante padrão do VLibras, pois teremos um botão customizado no menu */
        .vw-access-button {
          display: none !important;
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>

      {/* Alteração principal: bottom-20 para bottom-10 */}
      <div
        ref={menuContainerRef}
        className="fixed bottom-10 left-5 z-[99999] flex items-center"
      >
        <button
          onClick={toggleMenu}
          onMouseEnter={playHoverSound}
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

          <button
            onClick={() => adjustFontSize(1)}
            className={`
              w-full text-left cursor-pointer flex items-center px-4 py-3 border-b border-gray-200
              ${
                isHighContrast
                  ? "text-yellow-400 border-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <FaSearchPlus className="mr-2 text-lg w-5 text-center" /> Aumentar
            Texto
          </button>

          <button
            onClick={() => adjustFontSize(-1)}
            className={`
              w-full text-left cursor-pointer flex items-center px-4 py-3 border-b border-gray-200
              ${
                isHighContrast
                  ? "text-yellow-400 border-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <FaSearchMinus className="mr-2 text-lg w-5 text-center" /> Diminuir
            Texto
          </button>

          <button
            onClick={resetFontSize}
            className={`
              w-full text-left cursor-pointer flex items-center px-4 py-3 border-b border-gray-200
              ${
                isHighContrast
                  ? "text-yellow-400 border-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <FaTextHeight className="mr-2 text-lg w-5 text-center" /> Fonte
            Padrão
          </button>

          <button
            onClick={toggleContrast}
            className={`
              w-full text-left cursor-pointer flex items-center px-4 py-3 border-b border-gray-200
              ${
                isHighContrast
                  ? "text-yellow-400 border-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <FaAdjust className="mr-2 text-lg w-5 text-center" /> Alto Contraste
          </button>

          <button
            onClick={activateScreenReader}
            className={`
              w-full text-left cursor-pointer flex items-center px-4 py-3 border-b border-gray-200
              ${
                isHighContrast
                  ? "text-yellow-400 border-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <FaAssistiveListeningSystems className="mr-2 text-lg w-5 text-center" />{" "}
            Leitor de Tela
          </button>

          <button
            onClick={activateVirtualKeyboard}
            className={`
              w-full text-left cursor-pointer flex items-center px-4 py-3 border-b border-gray-200
              ${
                isHighContrast
                  ? "text-yellow-400 border-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <FaKeyboard className="mr-2 text-lg w-5 text-center" /> Teclado
            Virtual
          </button>

          <button
            onClick={activateVlibras}
            disabled={!isVlibrasReady}
            className={`
              w-full text-left cursor-pointer flex items-center px-4 py-3 transition-opacity
              ${
                isHighContrast
                  ? "text-yellow-400 hover:bg-black"
                  : "hover:bg-gray-100"
              }
              ${!isVlibrasReady ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <FaSignLanguage className="mr-2 text-lg w-5 text-center" />
            <span>
              VLibras (Língua de Sinais)
              {!isVlibrasReady && <span className="text-xs ml-1">(Carregando...)</span>}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AccessibilityWidget;