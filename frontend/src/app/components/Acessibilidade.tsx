"use client";
import React, { useState, useEffect } from "react";
import {
  FaSearchPlus,
  FaSearchMinus,
  FaAdjust,
  FaAssistiveListeningSystems,
  FaKeyboard,
} from "react-icons/fa";
import { X, Eye } from "lucide-react";

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
  const [isVirtualKeyboardOpen, setIsVirtualKeyboardOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

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
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsVirtualKeyboardOpen(false);
  };

  const adjustFontSize = (change: number) => {
    if (typeof document === "undefined") return;
    const html = document.querySelector("html");
    if (!html) return;
    const currentSize = parseFloat(window.getComputedStyle(html).getPropertyValue("font-size"));
    const newSize = currentSize + change;
    if (newSize >= 12 && newSize <= 24) html.style.fontSize = `${newSize}px`;
  };

  const toggleContrast = () => {
    const newState = !isHighContrast;
    setIsHighContrast(newState);
    localStorage.setItem("highContrast", String(newState));
    applyHighContrast(newState);
  };

  const activateScreenReader = () => alert("Leitor de tela ativado. Navegue usando o teclado.");
  const activateVirtualKeyboard = () => { setIsVirtualKeyboardOpen(true); setIsMenuOpen(false); };

  const VirtualKeyboard = () => {
    const [typed, setTyped] = useState("");
    const keys = [['1','2','3','4','5','6','7','8','9','0'],['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['Z','X','C','V','B','N','M'],[' ','⌫','Enter']];
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-black uppercase ${isHighContrast ? "text-yellow-400" : "text-[#004d2b]"}`}>Teclado Virtual Premium</h2>
          <button onClick={() => setIsVirtualKeyboardOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-red-50 transition-colors"><X size={24} /></button>
        </div>
        <div className={`mb-6 p-6 rounded-3xl border-4 min-h-[100px] text-xl font-bold ${isHighContrast ? "bg-black border-yellow-400 text-yellow-400" : "bg-green-50 border-green-200 text-[#004d2b]"}`}>
          {typed || "Comece a digitar..."}
        </div>
        <div className="space-y-2">
          {keys.map((row, i) => (
            <div key={i} className="flex justify-center gap-2">
              {row.map(k => (
                <button 
                  key={k} 
                  onClick={() => k === '⌫' ? setTyped(t=>t.slice(0,-1)) : k === 'Enter' ? setTyped(t=>t+'\n') : setTyped(t=>t+k)}
                  className={`h-14 rounded-2xl font-black text-sm transition-all active:scale-95 flex-1 max-w-[60px] ${k === ' ' ? 'max-w-[300px]' : ''} ${isHighContrast ? "bg-yellow-600 text-black border-b-4 border-yellow-800" : "bg-[#004d2b] text-white border-b-4 border-[#002b18]"}`}
                >
                  {k}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isMounted) return null;

  return (
    <>
      <style jsx global>{`
        .high-contrast { background-color: #000 !important; color: #fff !important; }
        .high-contrast * { color: #fff !important; background-color: #000 !important; border-color: #ff0 !important; }
        .high-contrast button { background-color: #333 !important; border: 2px solid #ff0 !important; color: #ff0 !important; }
      `}</style>



      {/* Floating Button */}
      <div className="fixed bottom-10 left-5 z-[99999]">
        <button
          onClick={toggleMenu}
          className={`w-[65px] h-[65px] rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 ${isHighContrast ? "bg-black border-4 border-yellow-400" : "bg-white border-2 border-green-50 hover:border-green-500"}`}
        >
          <AccessibilityIcon highContrast={isHighContrast} />
        </button>

        {/* Floating Menu */}
        <div className={`${isMenuOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95 pointer-events-none"} absolute bottom-[80px] left-0 w-[300px] bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden z-[100000] border-2 transition-all duration-500 ${isHighContrast ? "bg-black border-4 border-yellow-400" : "border-green-50"}`}>
          <div className={`bg-[#004d2b] p-6 flex justify-between items-center relative overflow-hidden`}>
            <span className="flex items-center gap-3 text-white font-black uppercase text-[10px] tracking-widest z-10"><div className="bg-yellow-400/20 p-2 rounded-xl"><Eye size={16} className="text-yellow-400" /></div>Acessibilidade</span>
            <button onClick={closeMenu} className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-2 transition-all z-20"><X size={16} /></button>
          </div>
          <div className="p-4 space-y-2 bg-gradient-to-b from-white to-green-50/50">
            <div className="grid grid-cols-2 gap-2 mb-2">
               <button onClick={() => adjustFontSize(1)} className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${isHighContrast ? "border-yellow-400 text-yellow-400" : "border-green-50 text-[#004d2b] hover:border-green-400 hover:bg-white"}`}><FaSearchPlus size={18} /><span className="text-[9px] font-black uppercase mt-1">Aumentar</span></button>
               <button onClick={() => adjustFontSize(-1)} className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${isHighContrast ? "border-yellow-400 text-yellow-400" : "border-green-50 text-[#004d2b] hover:border-green-400 hover:bg-white"}`}><FaSearchMinus size={18} /><span className="text-[9px] font-black uppercase mt-1">Diminuir</span></button>
            </div>
            {[
              { icon: <FaAdjust size={18} />, label: "Alto Contraste", action: toggleContrast },
              { icon: <FaAssistiveListeningSystems size={18} />, label: "Leitor de Tela", action: activateScreenReader },
              { icon: <FaKeyboard size={18} />, label: "Teclado Virtual", action: activateVirtualKeyboard },
            ].map((opt, i) => (
              <button key={i} onClick={opt.action} className={`w-full flex items-center px-5 py-4 rounded-2xl transition-all duration-300 group ${isHighContrast ? "text-yellow-400 hover:bg-yellow-400/10 border-2 border-yellow-400/30" : "text-[#004d2b] bg-white border-2 border-transparent hover:border-green-200 hover:shadow-lg"}`}>
                <div className="mr-4 group-hover:scale-110 transition-transform">{opt.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest">{opt.label}</span>
              </button>
            ))}
            <p className="text-[8px] text-center font-black text-gray-300 uppercase tracking-widest pt-4">BoraSiô | Mobilidade para Todos</p>
          </div>
        </div>
      </div>

      {/* Virtual Keyboard Modal */}
      {isVirtualKeyboardOpen && (
        <div className="fixed inset-0 z-[100002] flex items-end">
           <div className="absolute inset-0 bg-[#004d2b]/60 backdrop-blur-sm" onClick={() => setIsVirtualKeyboardOpen(false)}></div>
           <div className="relative w-full bg-white rounded-t-[5rem] border-t-8 border-white p-12 shadow-2xl animate-in slide-in-from-bottom-full duration-700">
              <VirtualKeyboard />
           </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityWidget;