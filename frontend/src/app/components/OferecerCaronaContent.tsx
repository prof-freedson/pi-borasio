"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  MapPin, 
  Car, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  ArrowLeft,
  User,
  Phone,
  CheckCircle,
  Snowflake,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Info,
  CarFront,
  BadgeCheck
} from "lucide-react"

type FormData = {
  motorista: string
  telefone: string
  origem: string
  destino: string
  assentos: number
  preco: string
  veiculo: string
  placa: string
  data: string
  horario: string
  observacoes: string
  arCondicionado: boolean
  tipo: 'geral' | 'ilha' | 'evento' | 'rural' | 'grupo'
}

export default function OferecerCaronaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  // Verifica se veio da página de grupos
  const tipoParam = searchParams.get('tipo')
  const [tipoCarona, setTipoCarona] = useState<'geral' | 'grupo'>(
    tipoParam === 'grupo' ? 'grupo' : 'geral'
  )
  
  const [formData, setFormData] = useState<FormData>({
    motorista: "",
    telefone: "",
    origem: "",
    destino: "",
    assentos: 4,
    preco: "",
    veiculo: "",
    placa: "",
    data: "",
    horario: "",
    observacoes: "",
    arCondicionado: false,
    tipo: tipoParam === 'grupo' ? 'grupo' : 'geral'
  })

  useEffect(() => {
    setIsVisible(true)
    if (tipoParam === 'grupo') {
      setTipoCarona('grupo')
      setFormData(prev => ({
        ...prev,
        tipo: 'grupo'
      }))
    }
  }, [tipoParam])

  const handleInputChange = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const precoFormatado = formData.preco.includes('R$') 
        ? formData.preco 
        : `R$ ${formData.preco}`
      
      const novaCorrida = {
        id: Date.now(),
        origem: formData.origem,
        destino: formData.destino,
        assentos: formData.assentos,
        preco: precoFormatado,
        motorista: formData.motorista,
        avaliacao: 5.0,
        tempoEstimado: "15 min",
        veiculo: `${formData.veiculo} - ${formData.placa}`,
        tipo: tipoCarona,
        arCondicionado: formData.arCondicionado,
        horario: formData.horario,
        data: formData.data,
        observacoes: formData.observacoes,
        ...(tipoCarona === 'grupo' && {
          pessoas: Math.floor(Math.random() * 3) + 2,
          economia: `R$ ${(Math.random() * 15 + 5).toFixed(2).replace('.', ',')}`
        })
      }
      
      const corridasExistentes = JSON.parse(localStorage.getItem('corridasOferecidas') || '[]')
      localStorage.setItem('corridasOferecidas', JSON.stringify([...corridasExistentes, novaCorrida]))
      
      setIsSuccess(true)
      
      setTimeout(() => {
        if (tipoCarona === 'grupo') {
          router.push('/corridas?group=true')
        } else {
          router.push('/corridas')
        }
      }, 3000)
      
    } catch (error) {
      console.error('Erro ao cadastrar carona:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#fcfdfc] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="bg-white rounded-[40px] shadow-2xl p-12 max-w-md w-full text-center relative z-10 border border-gray-100">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl scale-150 animate-pulse"></div>
            <div className="relative bg-green-500 text-white p-6 rounded-full inline-block shadow-lg">
              <CheckCircle className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-3xl font-black text-[#004d2b] mb-4">
            {tipoCarona === 'grupo' ? 'GRUPO CRIADO!' : 'OFERTA ATIVA!'}
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed font-medium">
            Sua carona foi cadastrada com sucesso e já está disponível para os passageiros em São Luís.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
               <div className="w-2 h-2 bg-green-600 rounded-full animate-ping"></div>
               <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Sincronizando rotas</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#004d2b] h-full animate-[progress_3s_ease-in-out]"></div>
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">Redirecionando...</p>
          </div>
        </div>

        <style jsx>{`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#fcfdfc] relative overflow-hidden font-sans">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-3xl -ml-40 -mb-40"></div>

      <div className="max-w-3xl mx-auto px-6 pt-12 pb-24 relative z-10">
        {/* Header */}
        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.back()}
              className="group p-4 bg-white hover:bg-[#004d2b] text-[#004d2b] hover:text-white rounded-2xl transition-all duration-300 shadow-xl shadow-green-900/5 border border-gray-100"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="px-2 py-0.5 bg-yellow-400 font-black text-[10px] uppercase rounded text-[#004d2b] tracking-wider">
                   {tipoCarona === 'grupo' ? 'Modo Grupo' : 'Modo Geral'}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-[#004d2b] tracking-tight">
                {tipoCarona === 'grupo' ? 'Oferecer p/ Grupo' : 'Oferecer Carona'}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-lg shadow-green-900/5 border border-gray-100">
             <div className="bg-green-100 p-2 rounded-xl">
               <BadgeCheck className="w-5 h-5 text-green-600" />
             </div>
             <div>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest text-left">Sua Conta</p>
               <p className="text-sm font-bold text-[#004d2b]">Perfil Verificado</p>
             </div>
          </div>
        </div>

        {/* Ride Type Selector (General vs Group) */}
        <div className="mb-12 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
           <button
             type="button"
             onClick={() => {
                setTipoCarona('geral')
                setFormData(prev => ({ ...prev, tipo: 'geral' }))
             }}
             className={`relative group p-6 rounded-[32px] border-2 transition-all duration-300 ${
               tipoCarona === 'geral'
                 ? 'border-[#004d2b] bg-white shadow-2xl shadow-green-900/10'
                 : 'border-gray-100 bg-white/50 text-gray-400 hover:border-green-200'
             }`}
           >
             {tipoCarona === 'geral' && (
               <div className="absolute top-4 right-4 bg-[#004d2b] text-white p-1 rounded-full">
                 <CheckCircle className="w-4 h-4" />
               </div>
             )}
             <div className="flex flex-col items-center gap-2">
                <div className={`p-4 rounded-2xl transition-colors ${tipoCarona === 'geral' ? 'bg-green-100 text-[#004d2b]' : 'bg-gray-100 group-hover:bg-green-50'}`}>
                  <CarFront className="w-6 h-6" />
                </div>
                <span className={`font-black uppercase tracking-widest text-[10px] ${tipoCarona === 'geral' ? 'text-[#004d2b]' : 'text-gray-400'}`}>
                  Carona Geral
                </span>
                <p className="text-[11px] font-medium leading-tight opacity-60">Para qualquer passageiro</p>
             </div>
           </button>

           <button
             type="button"
             onClick={() => {
                setTipoCarona('grupo')
                setFormData(prev => ({ ...prev, tipo: 'grupo' }))
             }}
             className={`relative group p-6 rounded-[32px] border-2 transition-all duration-300 ${
               tipoCarona === 'grupo'
                 ? 'border-yellow-400 bg-white shadow-2xl shadow-yellow-900/10'
                 : 'border-gray-100 bg-white/50 text-gray-400 hover:border-yellow-200'
             }`}
           >
             {tipoCarona === 'grupo' && (
               <div className="absolute top-4 right-4 bg-yellow-400 text-[#004d2b] p-1 rounded-full">
                 <CheckCircle className="w-4 h-4" />
               </div>
             )}
             <div className="flex flex-col items-center gap-2">
                <div className={`p-4 rounded-2xl transition-colors ${tipoCarona === 'grupo' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 group-hover:bg-yellow-50'}`}>
                  <Users className="w-6 h-6" />
                </div>
                <span className={`font-black uppercase tracking-widest text-[10px] ${tipoCarona === 'grupo' ? 'text-yellow-600' : 'text-gray-400'}`}>
                  Carona Grupo
                </span>
                <p className="text-[11px] font-medium leading-tight opacity-60">Para grupos específicos</p>
             </div>
           </button>
        </div>

        {/* Step Progress Visualizer */}
        <div className="mb-12">
          <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-green-900/5 border border-gray-100">
            <div className="flex items-center justify-between relative mb-8">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-[#004d2b] -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>

              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="relative z-10 flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${
                    step >= stepNumber 
                      ? 'bg-[#004d2b] text-white shadow-xl shadow-green-900/20 scale-110' 
                      : 'bg-white text-gray-300 border-2 border-gray-100'
                  }`}>
                    {step > stepNumber ? <CheckCircle className="w-6 h-6" /> : stepNumber}
                  </div>
                  <div className={`absolute -bottom-10 whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                    step >= stepNumber ? 'text-[#004d2b]' : 'text-gray-300'
                  }`}>
                    {stepNumber === 1 ? 'Perfil' : stepNumber === 2 ? 'Trajeto' : 'Veículo'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Context Card */}
        {tipoCarona === 'grupo' && step === 1 && (
           <div className="mb-8 p-6 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 rounded-3xl border border-yellow-200/50 flex gap-4 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white p-3 rounded-2xl shadow-sm">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-[#004d2b] font-bold">Foco em Comunidade</h3>
                <p className="text-sm text-[#004d2b]/70 font-medium italic">"Sua oferta será vista por grupos com rotas compartilhadas."</p>
              </div>
           </div>
        )}

        {/* Main Form Container */}
        <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <form onSubmit={handleSubmit} className="bg-white rounded-[40px] shadow-2xl shadow-green-900/10 p-10 border border-gray-100">
            {/* Step 1: Informações Pessoais */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-6">
                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                      <User className="w-4 h-4" />
                      Identificação do {tipoCarona === 'grupo' ? 'Grupo' : 'Motorista'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.motorista}
                      onChange={(e) => handleInputChange('motorista', e.target.value)}
                      className="w-full bg-gray-50/50 p-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-bold text-[#004d2b] placeholder:text-gray-300 shadow-inner"
                      placeholder={tipoCarona === 'grupo' ? 'Ex: Grupo dos Servidores' : 'Seu nome completo'}
                    />
                  </div>

                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                      <Phone className="w-4 h-4" />
                      Contato WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      className="w-full bg-gray-50/50 p-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-bold text-[#004d2b] placeholder:text-gray-300 shadow-inner"
                      placeholder="(98) 9XXXX-XXXX"
                    />
                  </div>
                </div>

                <div className="bg-[#004d2b] p-6 rounded-[32px] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                    <ShieldCheck className="w-24 h-24" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-xl">
                      <ShieldCheck className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Privacidade Garantida</h4>
                      <p className="text-green-100/70 text-sm leading-relaxed">
                        Seu contato só será compartilhado com passageiros aceitos por você. 
                        Mantemos seus dados seguros em São Luís.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Detalhes da Viagem */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                      <MapPin className="w-4 h-4 text-green-600" />
                      Origem
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.origem}
                      onChange={(e) => handleInputChange('origem', e.target.value)}
                      className="w-full bg-gray-50/50 p-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-bold text-[#004d2b] placeholder:text-gray-300 shadow-inner"
                      placeholder="Ex: Cohab, Renascença..."
                    />
                  </div>

                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                      <MapPin className="w-4 h-4 text-red-500" />
                      Destino
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.destino}
                      onChange={(e) => handleInputChange('destino', e.target.value)}
                      className="w-full bg-gray-50/50 p-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-bold text-[#004d2b] placeholder:text-gray-300 shadow-inner"
                      placeholder="Ex: Litorânea, Centro..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                      <Calendar className="w-4 h-4" />
                      Data da Partida
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.data}
                      onChange={(e) => handleInputChange('data', e.target.value)}
                      className="w-full bg-gray-50/50 p-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-bold text-[#004d2b] shadow-inner"
                    />
                  </div>

                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                      <Clock className="w-4 h-4" />
                      Horário
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.horario}
                      onChange={(e) => handleInputChange('horario', e.target.value)}
                      className="w-full bg-gray-50/50 p-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-bold text-[#004d2b] shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4 px-1">
                    <Users className="w-4 h-4" />
                    Vagas para Passageiros
                  </label>
                  <div className="flex bg-gray-50/50 p-2 rounded-3xl border border-gray-100 shadow-inner overflow-x-auto gap-2">
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleInputChange('assentos', num)}
                        className={`flex-1 min-w-[60px] py-4 rounded-2xl font-black transition-all ${
                          formData.assentos === num 
                            ? 'bg-[#004d2b] text-white shadow-lg shadow-green-900/20' 
                            : 'text-gray-400 hover:text-[#004d2b] hover:bg-white'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Veículo e Preço */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                      <CarFront className="w-4 h-4" />
                      Modelo e Cor
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.veiculo}
                      onChange={(e) => handleInputChange('veiculo', e.target.value)}
                      className="w-full bg-gray-50/50 p-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-bold text-[#004d2b] placeholder:text-gray-300 shadow-inner"
                      placeholder="Ex: HB20 Prata"
                    />
                  </div>

                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                      <Zap className="w-4 h-4" />
                      Placa do Veículo
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.placa}
                      onChange={(e) => handleInputChange('placa', e.target.value.toUpperCase())}
                      className="w-full bg-gray-50/50 p-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-bold text-[#004d2b] placeholder:text-gray-300 shadow-inner"
                      placeholder="ABC1D23"
                      maxLength={7}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4 px-1">
                      <Snowflake className="w-4 h-4" />
                      Ar-Condicionado
                    </label>
                    <div className="flex bg-gray-100/50 p-1.5 rounded-[22px] border border-gray-100">
                      <button
                        type="button"
                        onClick={() => handleInputChange('arCondicionado', true)}
                        className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm transition-all ${
                          formData.arCondicionado
                            ? 'bg-white text-[#004d2b] shadow-md'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        ✅ Ativado
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInputChange('arCondicionado', false)}
                        className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm transition-all ${
                          !formData.arCondicionado
                            ? 'bg-white text-[#004d2b] shadow-md'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        ❌ Desativado
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                      <DollarSign className="w-4 h-4" />
                      Valor Sugerido (Individual)
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#004d2b] font-black text-lg">R$</span>
                      <input
                        type="text"
                        required
                        value={formData.preco}
                        onChange={(e) => handleInputChange('preco', e.target.value)}
                        className="w-full bg-gray-100/30 p-5 pl-12 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all font-black text-[#004d2b] placeholder:text-gray-300"
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                    Notas e Regras da Viagem
                  </label>
                  <textarea
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    className="w-full bg-gray-50/50 p-6 rounded-[32px] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-medium text-[#004d2b] placeholder:text-gray-300 resize-none shadow-inner"
                    rows={4}
                    placeholder="Ex: Não fumantes, ponto de encontro no Shopping da Ilha, aceito pequenas bagagens..."
                  />
                </div>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-50">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="group px-8 py-5 text-gray-400 font-bold hover:text-[#004d2b] transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Voltar
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#004d2b] hover:bg-[#00361e] text-white font-black px-10 py-5 rounded-[22px] shadow-2xl shadow-green-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
                >
                  Continuar
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-black px-10 py-5 rounded-[22px] shadow-2xl shadow-yellow-400/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-4 border-[#004d2b] border-t-transparent rounded-full animate-spin" />
                      VALIDANDO...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      {tipoCarona === 'grupo' ? 'ATIVAR GRUPO' : 'PUBLICAR OFERTA'}
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Info/Tips Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
           <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-green-900/5 group">
              <div className="bg-green-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#004d2b] group-hover:text-white transition-all duration-300">
                <Info className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <h4 className="text-[#004d2b] font-black text-lg mb-3">Dica de Sucesso</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Viagens com <span className="text-[#004d2b] font-bold">ar-condicionado</span> e pontos de encontro em locais conhecidos (como shoppings ou terminais) têm 3x mais chances de serem preenchidas rapidamente.
              </p>
           </div>
           
           <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-green-900/5 group">
              <div className="bg-yellow-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-[#004d2b] transition-all duration-300">
                <ShieldCheck className="w-6 h-6 text-yellow-600 group-hover:text-[#004d2b]" />
              </div>
              <h4 className="text-[#004d2b] font-black text-lg mb-3">Segurança São Luís</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sempre verifique o perfil do passageiro no app antes de iniciar a viagem. Membros com avaliações 5 estrelas garantem uma jornada mais tranquila para todos.
              </p>
           </div>
        </div>
      </div>
    </main>
  )
}
