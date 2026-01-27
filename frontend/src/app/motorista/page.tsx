"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faRulerCombined,
  faCreditCard,
  faCheckCircle,
  faStar,
  faCommentDots,
  faEnvelope,
  faPhone,
  faIdCard,
  faCar,
  faMapMarkerAlt,
  faIdBadge,
  faUser,
  faCarSide,
  faPalette,
  faGasPump,
  faChair,
  faEdit,
  faTimes,
  faUsers,
  faWallet,
  faPowerOff,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Zap, Camera, ChevronRight, LogOut, Settings as SettingsIcon, Activity, MapPin, Award } from "lucide-react";

function MotoristaContent() {
  const [modoEdicao, setModoEdicao] = useState(false);
  const [online, setOnline] = useState(false);

  const [nome, setNome] = useState("João Ribamar");
  const [email, setEmail] = useState("joaoribamar@gmail.com");
  const [telefone, setTelefone] = useState("(98) 98745-3629");
  const [cnh, setCnh] = useState("12345678900");

  const [marca, setMarca] = useState("Volkswagen");
  const [modelo, setModelo] = useState("Gol");
  const [placa, setPlaca] = useState("ABC1D23");
  const [cor, setCor] = useState("Prata");
  const [combustivel, setCombustivel] = useState("Flex");
  const [assentos, setAssentos] = useState(5);
  const [arCondicionado, setArCondicionado] = useState(true);

  const [corridas, setCorridas] = useState([
    {
      passageiro: "Maria Souza",
      localViagem: "Avenida Brasil, 345",
      destino: "Rua do Sol, 890",
      valor: "R$ 25,00",
      data: "Hoje, 10:30",
      duracao: "15 min",
      distancia: "8 km",
      pagamento: "Cartão",
      status: "Concluída",
      classificacao: "4.8",
      comentarios: "Viagem tranquila e rápida.",
    },
    {
      passageiro: "Pedro Oliveira",
      localViagem: "Rua da Paz, 123",
      destino: "Praça da Liberdade, 456",
      valor: "R$ 30,00",
      data: "Ontem, 11:00",
      duracao: "20 min",
      distancia: "12 km",
      pagamento: "Pix",
      status: "Concluída",
      classificacao: "4.5",
      comentarios: "Motorista muito educado.",
    },
  ]);

  const toggleOnline = () => setOnline(!online);

  return (
    <div className="min-h-screen bg-green-50 font-sans selection:bg-yellow-400 selection:text-[#004d2b]">
      
      {/* Header Premium Motorista */}
      <div className="bg-[#004d2b] text-white py-12 px-4 rounded-b-[4rem] shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative group">
            <img
              src="https://img.freepik.com/fotos-gratis/homem-sorridente-olhando-para-a-camera_23-2148154865.jpg?semt=ais_hybrid&w=740"
              className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] object-cover border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-500"
              alt="Perfil Motorista"
            />
            <button className="absolute bottom-2 right-2 bg-yellow-400 text-[#004d2b] p-3 rounded-2xl shadow-xl hover:scale-110 transition-all border-4 border-[#004d2b]">
              <Camera size={20} strokeWidth={3} />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-[#004d2b] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
               <Award size={14} fill="#004d2b" /> Motorista Gold
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">{nome}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-green-100/70 font-medium">
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full"><FontAwesomeIcon icon={faStar} className="text-yellow-400" /> 4.9 Reputação</span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full"><FontAwesomeIcon icon={faCar} className="text-green-300" /> {modelo}</span>
            </div>
          </div>

          <div className="flex gap-3">
             <button className={`p-4 rounded-2xl transition-all border-2 flex items-center gap-2 font-bold ${online ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`} onClick={toggleOnline}>
               <div className={`w-3 h-3 rounded-full ${online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
               {online ? 'ONLINE' : 'OFFLINE'}
             </button>
             <button className="bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all text-white border border-white/10">
               <LogOut size={24} />
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 pb-20">
        
        {/* Left Column - User & Vehicle */}
        <div className="lg:col-span-1 space-y-6">
          {/* Perfil & Vehicle Switcher */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-green-50">
             <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-[#004d2b] uppercase tracking-wider">Dados GERAIS</h2>
              <button 
                onClick={() => setModoEdicao(!modoEdicao)}
                className="text-green-600 hover:text-[#004d2b] transition-all"
              >
                <SettingsIcon size={20} />
              </button>
            </div>

            <div className="space-y-6">
               <InfoItem icon={faUser} label="Nome" value={nome} editable={modoEdicao} onChange={setNome} />
               <InfoItem icon={faIdCard} label="CNH" value={cnh} editable={modoEdicao} onChange={setCnh} />
               <InfoItem icon={faCarSide} label="Veículo" value={`${marca} ${modelo}`} editable={modoEdicao} onChange={setModelo} />
               <InfoItem icon={faIdBadge} label="Placa" value={placa} editable={modoEdicao} onChange={setPlaca} />
            </div>

            {modoEdicao && (
              <button 
                onClick={() => setModoEdicao(false)}
                className="w-full mt-8 bg-[#004d2b] text-white font-black py-4 rounded-2xl shadow-xl shadow-[#004d2b]/20 hover:-translate-y-1 transition-all"
              >
                Salvar Tudo
              </button>
            )}
          </div>

          {/* Wallet / Earnings Card */}
          <div className="bg-gradient-to-br from-[#004d2b] to-[#003823] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between mb-4">
               <div className="bg-white/10 p-3 rounded-2xl"><FontAwesomeIcon icon={faWallet} className="text-yellow-400" /></div>
               <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Ganhos da Semana</span>
            </div>
            <p className="text-xs text-green-100/60 font-bold mb-1">Total acumulado</p>
            <h3 className="text-3xl font-black tracking-tight mb-6">R$ 1.250,00</h3>
            <button className="w-full bg-yellow-400 text-[#004d2b] font-black py-3 rounded-xl text-sm transition-all hover:bg-yellow-300">Resgatar Saldo</button>
          </div>

          <Link
            href="/oferecer-carona"
            className="w-full bg-white hover:bg-green-50 p-8 rounded-[2.5rem] font-black text-xl flex items-center justify-between transition-all shadow-xl border border-green-100 group"
          >
            <span className="text-[#004d2b]">Nova Carona</span>
            <div className="bg-[#004d2b] p-3 rounded-2xl text-white group-hover:translate-x-1 transition-transform">
              <ChevronRight size={24} strokeWidth={3} />
            </div>
          </Link>
        </div>

        {/* Right Column - Dashboard Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Online Card */}
          <div className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex items-center justify-between ${online ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'}`}>
             <div className="space-y-1">
               <h3 className={`text-xl font-black ${online ? 'text-green-800' : 'text-gray-400'}`}>
                 {online ? 'Você está pronto para rodar!' : 'Você está invisível no mapa'}
               </h3>
               <p className="text-sm font-medium text-gray-500">
                 {online ? 'Recebendo chamadas em tempo real.' : 'Ligue o modo online para receber novas corridas.'}
               </p>
             </div>
             <button 
              onClick={toggleOnline}
              className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all shadow-lg ${online ? 'bg-green-600 text-white shadow-green-600/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
             >
               <FontAwesomeIcon icon={faPowerOff} size="lg" />
             </button>
          </div>

          {/* Últimas Corridas */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-green-50">
             <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-2xl">
                   <Activity className="text-[#004d2b] w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-[#004d2b] uppercase tracking-wider">Histórico Recente</h2>
              </div>
              <button className="text-sm font-bold text-green-600 hover:underline">Ver Histórico</button>
            </div>

            <div className="space-y-4">
              {corridas.map((corrida, i) => (
                <div key={i} className="group bg-green-50/30 border border-green-50 p-6 rounded-[2.5rem] hover:bg-green-50 transition-all hover:border-green-100">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-2xl border border-green-100 flex items-center justify-center font-black text-[#004d2b]">
                          {corrida.passageiro.charAt(0)}
                       </div>
                       <div>
                         <p className="font-black text-[#004d2b]">{corrida.passageiro}</p>
                         <p className="text-xs font-bold text-gray-500">{corrida.data} • {corrida.pagamento}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xl font-black text-green-700">{corrida.valor}</p>
                       <p className="text-[10px] font-black text-[#004d2b] bg-yellow-400 px-2 py-0.5 rounded-full inline-block">CONCLUÍDA</p>
                    </div>
                  </div>

                  <div className="bg-white/60 rounded-3xl p-5 mb-4 space-y-3">
                     <div className="flex items-center gap-3">
                        <MapPin size={14} className="text-green-500" />
                        <p className="text-sm font-medium text-gray-600 truncate">{corrida.localViagem}</p>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-3.5 h-3.5 flex items-center justify-center">
                           <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        </div>
                        <p className="text-sm font-medium text-gray-600 truncate">{corrida.destino}</p>
                     </div>
                  </div>

                  <div className="flex items-center justify-between text-xs px-2">
                     <div className="flex gap-4">
                        <span className="flex items-center gap-1 font-bold text-gray-500"><FontAwesomeIcon icon={faClock} /> {corrida.duracao}</span>
                        <span className="flex items-center gap-1 font-bold text-gray-500"><FontAwesomeIcon icon={faRulerCombined} /> {corrida.distancia}</span>
                     </div>
                     <div className="flex items-center gap-1 bg-[#004d2b]/5 px-2 py-1 rounded-lg">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                        <span className="font-black text-[#004d2b]">{corrida.classificacao}</span>
                     </div>
                  </div>
                </div>
              ))}
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

export default function Motorista() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-green-50 font-black text-[#004d2b] animate-pulse">CARREGANDO...</div>}>
      <MotoristaContent />
    </Suspense>
  );
}