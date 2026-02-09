"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Car, 
  MapPin, 
  ShieldCheck, 
  CreditCard,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Info,
  BadgeCheck,
  Palette,
  Droplets,
  Armchair,
  Snowflake
} from "lucide-react";

const Cadastromotorista = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    cnh: "",
    veiculoMarca: "",
    veiculoCor: "",
    veiculoPlaca: "",
    veiculoArCondicionado: "não",
    veiculoModelo: "",
    veiculoCombustivel: "",
    veiculoAssentos: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "telefone") {
      let maskedValue = value.replace(/\D/g, "");
      maskedValue = maskedValue.replace(/^(\d{2})(\d)/, "($1) $2");
      maskedValue = maskedValue.replace(/(\d{5})(\d)/, "$1-$2");
      setForm({ ...form, [name]: maskedValue.slice(0, 15) });
    } else if (name === "cnh") {
      const maskedValue = value.replace(/\D/g, "");
      setForm({ ...form, [name]: maskedValue.slice(0, 11) });
    } else if (name === "veiculoPlaca") {
      const maskedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
      setForm({ ...form, [name]: maskedValue.slice(0, 7) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validarForcaSenha = (senha: string) => {
    const requisitos = {
      minimo: /.{8,}/.test(senha),
      maiuscula: /[A-Z]/.test(senha),
      minuscula: /[a-z]/.test(senha),
      numero: /[0-9]/.test(senha),
      especial: /[^A-Za-z0-9]/.test(senha),
    };
    const todosValidos = Object.values(requisitos).every(Boolean);
    return { ...requisitos, todosValidos };
  };

  const validate = () => {
    if (!form.nome) return "O nome é obrigatório";
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(form.nome)) return "O nome deve conter apenas letras e espaços";
    if (!form.cnh) return "A CNH é obrigatória";
    if (!/^\d{11}$/.test(form.cnh)) return "CNH deve ter 11 dígitos numéricos";
    if (!form.endereco) return "O endereço é obrigatório";
    if (!form.email) return "O e-mail é obrigatório";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return `E-mail inválido: ${form.email}`;
    if (!form.telefone) return "O telefone é obrigatório";
    if (form.telefone.replace(/\D/g, "").length < 10) return "Telefone deve ter pelo menos 10 dígitos";
    if (!form.senha) return "A senha é obrigatória";
    if (!validarForcaSenha(form.senha).todosValidos) {
      return "A senha não atende a todos os requisitos de segurança.";
    }
    if (!form.confirmarSenha) return "Confirme a senha";
    if (form.senha !== form.confirmarSenha) return "As senhas não coincidem";
    if (!form.veiculoMarca) return "A marca do veículo é obrigatória";
    if (!form.veiculoModelo) return "O modelo do veículo é obrigatório";
    if (!form.veiculoPlaca) return "A placa do veículo é obrigatória";
    if (!form.veiculoCor) return "A cor do veículo é obrigatória";
    if (!form.veiculoCombustivel) return "O combustível é obrigatório";
    if (!form.veiculoAssentos) return "O número de assentos é obrigatório";
    if (!termsAccepted) return "Você deve aceitar os Termos e Políticas.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      Sentry.captureException(new Error(validationError));
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', form.email);
      localStorage.setItem('userType', 'motorista');
      localStorage.setItem('userName', form.nome);
      
      try { 
        window.dispatchEvent(new CustomEvent('authChanged', { 
          detail: { 
            loggedIn: true, 
            email: form.email,
            userType: 'motorista'
          } 
        })); 
      } catch (e) {}
      
      router.push("/motorista");
    } catch (err) {
      setError("Erro ao cadastrar. Tente novamente.");
      Sentry.captureException(err);
    } finally {
      setIsLoading(false);
    }
  };

  const forcaSenha = validarForcaSenha(form.senha);

  return (
    <main className="min-h-screen bg-[#fcfdfc] relative overflow-hidden font-sans">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl -mr-64 -mt-64 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-3xl -ml-40 -mb-40 animate-pulse delay-1000"></div>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-24 relative z-10">
        {/* Header with Back Button */}
        <div className={`flex flex-col md:flex-row items-center justify-between gap-8 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="flex items-center gap-6">
            <Link 
              href="/"
              className="group p-4 bg-white hover:bg-[#004d2b] text-[#004d2b] hover:text-white rounded-2xl transition-all duration-300 shadow-xl shadow-green-900/5 border border-gray-100"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="px-2 py-0.5 bg-yellow-400 font-black text-[10px] uppercase rounded text-[#004d2b] tracking-wider">
                   Novo Parceiro
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#004d2b] tracking-tight">
                Seja um <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-600">Borasio</span>
              </h1>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-3 bg-white px-6 py-4 rounded-3xl shadow-xl shadow-green-900/5 border border-gray-50">
             <div className="bg-green-100 p-2.5 rounded-2xl">
               <ShieldCheck className="w-6 h-6 text-green-600" />
             </div>
             <div>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Segurança Total</p>
               <p className="text-sm font-bold text-[#004d2b]">Dados Criptografados</p>
             </div>
          </div>
        </div>

        {/* Form Card */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <form 
            onSubmit={handleSubmit} 
            className="bg-white rounded-[48px] shadow-2xl shadow-green-900/10 p-8 md:p-14 border border-gray-50 space-y-12"
          >
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-[24px] flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-red-100 p-2 rounded-xl">
                    <X className="w-5 h-5" />
                </div>
                <p className="font-bold text-sm tracking-tight">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Section 1: Personal Info */}
              <div className="space-y-10">
                <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                  <div className="bg-[#004d2b] p-3 rounded-2xl shadow-lg shadow-green-900/20">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[#004d2b] leading-none mb-1">Dados Individuais</h2>
                    <p className="text-sm text-gray-400 font-medium">Informações obrigatórias para sua conta</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Input label="Nome Completo" name="nome" value={form.nome} onChange={handleChange} icon={<User className="w-4 h-4" />} placeholder="Ex: Maria Oliveira" />
                  <Input label="CNH" name="cnh" value={form.cnh} onChange={handleChange} icon={<CreditCard className="w-4 h-4" />} placeholder="Somente números" />
                  <Input label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} icon={<MapPin className="w-4 h-4" />} placeholder="Sua localização atual" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input type="email" label="E-mail" name="email" value={form.email} onChange={handleChange} icon={<Mail className="w-4 h-4" />} placeholder="nome@email.com" />
                    <Input type="tel" label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} icon={<Phone className="w-4 h-4" />} placeholder="(98) 9XXXX-XXXX" />
                  </div>

                  {/* Password Fields with Strength */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        <Lock className="w-3 h-3" /> Senha
                      </label>
                      <div className="relative group">
                        <input
                          name="senha"
                          type={mostrarSenha ? "text" : "password"}
                          value={form.senha}
                          onChange={handleChange}
                          className="w-full bg-gray-50/50 p-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-bold text-[#004d2b] shadow-inner pr-14"
                          placeholder="********"
                        />
                        <button 
                          type="button" 
                          onClick={() => setMostrarSenha(!mostrarSenha)} 
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#004d2b] transition-colors"
                        >
                          {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        <Lock className="w-3 h-3" /> Confirmar
                      </label>
                      <div className="relative group">
                        <input
                          name="confirmarSenha"
                          type={mostrarConfirmarSenha ? "text" : "password"}
                          value={form.confirmarSenha}
                          onChange={handleChange}
                          className="w-full bg-gray-50/50 p-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-bold text-[#004d2b] shadow-inner pr-14"
                          placeholder="********"
                        />
                        <button 
                          type="button" 
                          onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)} 
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#004d2b] transition-colors"
                        >
                          {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {form.senha && (
                    <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-[32px] border border-gray-100 grid grid-cols-2 gap-x-4 gap-y-2">
                      <RequisitoSenha valido={forcaSenha.minimo} texto="8+ caracteres" />
                      <RequisitoSenha valido={forcaSenha.maiuscula} texto="Maiúscula" />
                      <RequisitoSenha valido={forcaSenha.minuscula} texto="Minúscula" />
                      <RequisitoSenha valido={forcaSenha.numero} texto="Número" />
                      <div className="col-span-2 mt-2">
                         <RequisitoSenha valido={forcaSenha.especial} texto="Caractere especial (@, #, !, %)" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Vehicle Info */}
              <div className="space-y-10">
                <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                  <div className="bg-yellow-400 p-3 rounded-2xl shadow-lg shadow-yellow-900/20">
                    <Car className="w-6 h-6 text-[#004d2b]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[#004d2b] leading-none mb-1">Máquina e Conforto</h2>
                    <p className="text-sm text-gray-400 font-medium">Detalhes do automóvel cadastrado</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Marca" name="veiculoMarca" value={form.veiculoMarca} onChange={handleChange} icon={<Car className="w-4 h-4" />} placeholder="Ex: Toyota" />
                    <Input label="Modelo" name="veiculoModelo" value={form.veiculoModelo} onChange={handleChange} icon={<Car className="w-4 h-4" />} placeholder="Ex: Corolla" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Placa" name="veiculoPlaca" value={form.veiculoPlaca} onChange={handleChange} icon={<CreditCard className="w-4 h-4" />} placeholder="ABC1D23" />
                    <Input label="Cor" name="veiculoCor" value={form.veiculoCor} onChange={handleChange} icon={<Palette className="w-4 h-4" />} placeholder="Ex: Cinza Chumbo" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Ar-Condicionado"
                      name="veiculoArCondicionado"
                      value={form.veiculoArCondicionado}
                      onChange={handleChange}
                      icon={<Snowflake className="w-4 h-4" />}
                      options={[
                        { label: "Não possui", value: "não" },
                        { label: "Sim, completo", value: "sim" }
                      ]}
                    />
                    <Select
                      label="Combustível"
                      name="veiculoCombustivel"
                      value={form.veiculoCombustivel}
                      onChange={handleChange}
                      icon={<Droplets className="w-4 h-4" />}
                      options={[
                        { label: "Selecione...", value: "" }, 
                        { label: "Flex (Álc/Gas)", value: "flex" },
                        { label: "Gasolina", value: "gasolina" },
                        { label: "Etanol", value: "etanol" },
                        { label: "Diesel", value: "diesel" },
                        { label: "Elétrico / Híbrido", value: "eletrico" },
                      ]}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                      <Armchair className="w-3 h-3" /> Assentos Disponíveis
                    </label>
                    <div className="flex bg-gray-50/50 p-2 rounded-3xl border border-gray-100 shadow-inner gap-2 overflow-x-auto">
                      {[1, 2, 3, 4, 5, 6, 7].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, veiculoAssentos: num.toString() }))}
                          className={`flex-1 min-w-[50px] py-4 rounded-2xl font-black transition-all ${
                            form.veiculoAssentos === num.toString() 
                              ? 'bg-[#004d2b] text-white shadow-lg' 
                              : 'text-gray-400 hover:text-[#004d2b] hover:bg-white'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50/50 p-8 rounded-[40px] border border-green-100/50 mt-8 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-700">
                        <Info className="w-24 h-24 text-green-700" />
                     </div>
                     <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="bg-green-100 p-2 rounded-xl">
                              <BadgeCheck className="w-5 h-5 text-green-600" />
                           </div>
                           <h4 className="text-[#004d2b] font-black text-lg tracking-tight">Vantagem Borasio</h4>
                        </div>
                        <p className="text-sm text-green-900/60 font-medium leading-relaxed italic">
                          "Veículos com ar-condicionado e placa Mercosul atualizada aumentam suas chances de aprovação imediata em até 40%."
                        </p>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer: Terms & CTA */}
            <div className="pt-12 border-t border-gray-50 space-y-10">
              <div className="flex items-center gap-4 bg-gray-50/50 p-6 rounded-[32px] border border-gray-100">
                <div className="relative flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted} 
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-8 h-8 opacity-0 absolute cursor-pointer z-10"
                  />
                  <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                    termsAccepted ? 'bg-[#004d2b] border-[#004d2b]' : 'border-gray-200 bg-white'
                  }`}>
                    {termsAccepted && <Check className="w-5 h-5 text-white" />}
                  </div>
                </div>
                <label htmlFor="terms" className="text-sm font-medium text-gray-500 cursor-pointer">
                  Confirmo que li e aceito os <Link href="/termos-de-servico" className="text-[#004d2b] font-black hover:underline px-1">Termos de Serviço</Link> e a <Link href="/politica-de-privacidade" className="text-[#004d2b] font-black hover:underline px-1">Política de Privacidade</Link> da plataforma.
                </label>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-3/4 bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-black py-6 rounded-[28px] shadow-2xl shadow-yellow-400/20 hover:scale-[1.02] active:scale-95 transition-all text-xl flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-4 border-[#004d2b] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      FINALIZAR MEU CADASTRO
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <div className="w-full md:w-1/4">
                  <p className="text-center md:text-right text-gray-400 font-bold text-xs uppercase tracking-widest px-2">
                    Já é parceiro? <Link href="/pessoalmotorista/loginmotorista" className="text-[#004d2b] hover:text-green-600 underline-offset-4 decoration-2 hover:underline ml-1">Entrar</Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

const Input = ({ label, name, value, onChange, type = "text", placeholder, icon }: any) => (
  <div className="space-y-4">
    <label htmlFor={name} className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
      {icon} {label}
    </label>
    <div className="relative group">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-50/50 p-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-bold text-[#004d2b] placeholder:text-gray-300 shadow-inner"
        required
      />
    </div>
  </div>
);

const Select = ({ label, name, value, onChange, options, icon }: any) => (
  <div className="space-y-4">
    <label htmlFor={name} className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
      {icon} {label}
    </label>
    <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-50/50 p-5 rounded-3xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#004d2b] focus:bg-white transition-all font-bold text-[#004d2b] appearance-none shadow-inner"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronRight className="w-5 h-5 rotate-90" />
      </div>
    </div>
  </div>
);

const RequisitoSenha = ({ valido, texto }: { valido: boolean; texto: string }) => (
  <div className={`flex items-center gap-2.5 transition-all duration-300 ${valido ? 'text-green-600 translate-x-1' : 'text-gray-300'}`}>
    <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${valido ? 'bg-green-100 border-green-500 text-green-600 shadow-lg shadow-green-900/10' : 'border-gray-100 bg-white'}`}>
      {valido ? <Check size={10} strokeWidth={4} /> : <div className="w-1 h-1 bg-gray-200 rounded-full" />}
    </div>
    <span className={`text-[11px] font-black uppercase tracking-wider ${valido ? 'opacity-100' : 'opacity-60'}`}>{texto}</span>
  </div>
);

export default Cadastromotorista;
