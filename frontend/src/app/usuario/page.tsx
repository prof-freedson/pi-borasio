"use client";

import {
  faClock,
  faCommentDots,
  faCreditCard,
  faEdit,
  faEnvelope,
  faIdBadge,
  faMapMarkerAlt,
  faMoneyBill,
  faPhone,
  faRoute,
  faTimes,
  faUser,
  faCarAlt,
  faStar,
  faReceipt,
  faCheckCircle,
  faBarcode,
  faQrcode,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Zap, Camera, ChevronRight, LogOut, Settings as SettingsIcon, Bell } from "lucide-react";

function UsuarioContent() {
  const searchParams = useSearchParams();
  const [modoEdicao, setModoEdicao] = useState(false);
  const [selectedCorrida, setSelectedCorrida] = useState<any>(null);
  const [historicoPagamentos, setHistoricoPagamentos] = useState<any[]>([]);

  const [nome, setNome] = useState("Sarah Lima Pereira");
  const [email, setEmail] = useState("Sarah@exemplo.com");
  const [telefone, setTelefone] = useState("(98) 98877-8999");
  const [cpf, setCpf] = useState("123.456.789-00");
  const [endereco, setEndereco] = useState("Rua das Flores, 123 - Centro");

  const [corridasAnteriores, setCorridasAnteriores] = useState([
    {
      origem: "Rua das Flores - Centro",
      destino: "Rua B - Maiobão",
      data: "01 Abr 2025",
      valor: "R$ 20,00",
    },
    {
      origem: "Rua Primavera - Santa Clara",
      destino: "Rua Outono - Vila Nova",
      data: "10 Abr 2025",
      valor: "R$ 25,00",
    },
  ]);
  const [corridasAgendadas, setCorridasAgendadas] = useState([
    {
      id: 1,
      origem: "Rua Pinhos - Centro",
      destino: "Rua Olivia - Centro",
      data: "20 Abr 2025 - 14:00",
    },
  ]);

  useEffect(() => {
    const corridaSelected = searchParams.get("corridaSelected");
    if (corridaSelected) {
      const storedCorrida = localStorage.getItem("selectedCorrida");
      if (storedCorrida) {
        setSelectedCorrida(JSON.parse(storedCorrida));
        localStorage.removeItem("selectedCorrida");
      }
    }
    const historico = JSON.parse(localStorage.getItem('historicoPagamentos') || '[]');
    setHistoricoPagamentos(historico);
  }, [searchParams]);

  const salvarEdicao = () => {
    setModoEdicao(false);
    alert("Perfil atualizado com sucesso!");
  };

  const getMetodoPagamentoIcon = (metodo: string) => {
    switch (metodo) {
      case 'credito': return faCreditCard;
      case 'pix': return faQrcode;
      case 'boleto': return faBarcode;
      default: return faMoneyBill;
    }
  };

  return (
    <div className="min-h-screen bg-green-50 font-sans selection:bg-yellow-400 selection:text-[#004d2b]">
      {/* Modal de Confirmação */}
      {selectedCorrida && (
        <div className="fixed inset-0 bg-[#004d2b]/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl border border-green-50 animate-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-black text-[#004d2b] mb-6 tracking-tight">
              Confirmar Corrida
            </h2>
            <div className="space-y-4 mb-8 bg-green-50 p-6 rounded-3xl border border-green-100">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <div>
                  <p className="text-xs font-black text-[#004d2b] uppercase tracking-wider">Origem</p>
                  <p className="text-gray-700 font-medium">{selectedCorrida.origem}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                <div>
                  <p className="text-xs font-black text-[#004d2b] uppercase tracking-wider">Destino</p>
                  <p className="text-gray-700 font-medium">{selectedCorrida.destino}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/pagamento"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-black py-4 rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-yellow-400/20"
              >
                Prosseguir para Pagamento
              </Link>
              <button
                onClick={() => setSelectedCorrida(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-4 rounded-2xl transition-all"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header / Top Nav */}
      <div className="bg-[#004d2b] text-white py-12 px-4 rounded-b-[4rem] shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative group">
            <img
              src="https://img.freepik.com/fotos-gratis/close-up-na-jovem-empresaria_23-2149153830.jpg?semt=ais_hybrid&w=740"
              className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] object-cover border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-500"
              alt="Perfil"
            />
            <button className="absolute bottom-2 right-2 bg-yellow-400 text-[#004d2b] p-3 rounded-2xl shadow-xl hover:scale-110 transition-all border-4 border-[#004d2b]">
              <Camera size={20} strokeWidth={3} />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">{nome}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-green-100/70 font-medium">
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full"><FontAwesomeIcon icon={faStar} className="text-yellow-400" /> 4.9 Passageira</span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">Desde 2024</span>
            </div>
          </div>

          <div className="flex gap-3">
             <button className="bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all" title="Notificações">
               <Bell size={24} />
             </button>
             <button className="bg-red-500/20 p-4 rounded-2xl hover:bg-red-500/40 transition-all text-red-100 border border-red-500/30" title="Sair">
               <LogOut size={24} />
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 pb-20">
        
        {/* Left Column - Form & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-green-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-[#004d2b] uppercase tracking-wider">Perfil</h2>
              <button 
                onClick={() => setModoEdicao(!modoEdicao)}
                className="text-green-600 hover:text-[#004d2b] transition-all"
              >
                <SettingsIcon size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <InfoItem icon={faEnvelope} label="E-mail" value={email} editable={modoEdicao} onChange={setEmail} />
              <InfoItem icon={faPhone} label="Telefone" value={telefone} editable={modoEdicao} onChange={setTelefone} />
              <InfoItem icon={faIdBadge} label="CPF" value={cpf} editable={modoEdicao} onChange={setCpf} />
              <InfoItem icon={faMapMarkerAlt} label="Endereço" value={endereco} editable={modoEdicao} onChange={setEndereco} />
            </div>

            {modoEdicao && (
              <button 
                onClick={salvarEdicao}
                className="w-full mt-8 bg-[#004d2b] text-white font-black py-4 rounded-2xl shadow-xl shadow-[#004d2b]/20 hover:-translate-y-1 transition-all"
              >
                Salvar Alterações
              </button>
            )}
          </div>

          <Link
            href="/corridas"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] p-8 rounded-[2.5rem] font-black text-xl flex items-center justify-between transition-all shadow-xl shadow-yellow-400/10 group"
          >
            <span>Pedir Corrida</span>
            <div className="bg-[#004d2b] p-3 rounded-2xl text-white group-hover:translate-x-1 transition-transform">
              <ArrowRight size={24} strokeWidth={3} />
            </div>
          </Link>
        </div>

        {/* Right Column - Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Corridas Recentes */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-green-50">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-2xl">
                   <FontAwesomeIcon icon={faRoute} className="text-[#004d2b] text-xl" />
                </div>
                <h2 className="text-xl font-black text-[#004d2b] uppercase tracking-wider">Viagens Recentes</h2>
              </div>
              <button className="text-sm font-bold text-green-600 hover:underline">Ver tudo</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {corridasAnteriores.map((c, i) => (
                <div key={i} className="bg-green-50/50 border border-green-100 p-6 rounded-[2rem] hover:bg-green-50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-black text-[#004d2b] bg-white px-3 py-1 rounded-full border border-green-100">{c.data}</span>
                    <span className="text-lg font-black text-green-700">{c.valor}</span>
                  </div>
                  <div className="space-y-3 mb-4">
                     <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> {c.origem}
                     </p>
                     <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div> {c.destino}
                     </p>
                  </div>
                  <Link href="/feedback" className="w-full bg-white text-[#004d2b] font-bold py-2 rounded-xl border border-green-100 hover:bg-[#004d2b] hover:text-white transition-all text-center block text-sm">
                    Avaliar Viagem
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Histórico de Pagamentos */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-green-50">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-2xl">
                   <FontAwesomeIcon icon={faReceipt} className="text-[#004d2b] text-xl" />
                </div>
                <h2 className="text-xl font-black text-[#004d2b] uppercase tracking-wider">Linha do Tempo</h2>
              </div>
            </div>

            <div className="space-y-4">
              {historicoPagamentos.length > 0 ? (
                historicoPagamentos.slice(0, 3).map((pag, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 hover:bg-green-50 rounded-3xl transition-colors border border-transparent hover:border-green-100">
                    <div className="w-12 h-12 bg-[#004d2b] text-white rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={getMetodoPagamentoIcon(pag.metodo)} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[#004d2b]">{pag.destino}</p>
                      <p className="text-xs text-gray-500 font-medium">{pag.data} • {pag.status}</p>
                    </div>
                    <div className="text-right">
                       <p className="font-black text-[#004d2b]">R$ {pag.valor.toFixed(2)}</p>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">ID: {pag.id}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                  <p className="font-bold text-gray-400">Nenhum registro encontrado</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ icon, label, value, editable, onChange }: any) => (
  <div className="space-y-1">
    <p className="text-[10px] font-black text-[#004d2b] uppercase tracking-widest flex items-center gap-1.5 ml-1">
      <FontAwesomeIcon icon={icon} className="w-3" /> {label}
    </p>
    {editable ? (
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-green-50/50 border-2 border-green-100 p-3 rounded-2xl focus:outline-none focus:border-[#004d2b] font-medium text-gray-700 transition-all shadow-sm"
      />
    ) : (
      <p className="text-gray-700 font-bold px-1">{value}</p>
    )}
  </div>
);

const ArrowRight = ({ size, strokeWidth }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function Usuario() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-green-50 font-black text-[#004d2b] animate-pulse">CARREGANDO...</div>}>
      <UsuarioContent />
    </Suspense>
  );
}