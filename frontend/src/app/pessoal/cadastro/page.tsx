"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { Eye, EyeOff, Check, X, User, Mail, Smartphone, MapPin, Hash, Lock, ChevronLeft, Zap } from "lucide-react";

const Cadastro = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    endereco: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [termosAceitos, setTermosAceitos] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let valorFormatado = value;

    if (name === 'telefone') {
      const numeros = value.replace(/\D/g, '').slice(0, 11);
      if (numeros.length > 2) {
        valorFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}`;
        if (numeros.length > 7) {
          valorFormatado += `-${numeros.slice(7)}`;
        }
      } else {
        valorFormatado = numeros;
      }
    } else if (name === 'cpf') {
      const numeros = value.replace(/\D/g, '').slice(0, 11);
      valorFormatado = numeros
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    setForm({ ...form, [name]: valorFormatado });
  };

  const validate = () => {
    if (!form.nome || !/^[A-Za-zÀ-ÿ\s]+$/.test(form.nome)) return "Nome completo inválido.";
    if (!form.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf)) return "CPF incompleto ou inválido.";
    if (!form.endereco) return "O endereço é obrigatório.";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) return "E-mail inválido.";
    if (!form.telefone || !/^\(\d{2}\) \d{5}-\d{4}$/.test(form.telefone)) return "Telefone incompleto.";
    if (!form.senha || !validarForcaSenha(form.senha).todosValidos) return "Senha não atende aos requisitos.";
    if (form.senha !== form.confirmarSenha) return "As senhas não coincidem.";
    return null;
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

  const forcaSenha = validarForcaSenha(form.senha);

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
      await new Promise(resolve => setTimeout(resolve, 1500));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', form.email);
      localStorage.setItem('userType', 'passageiro');
      localStorage.setItem('userName', form.nome);
      
      try { 
        window.dispatchEvent(new CustomEvent('authChanged', { 
          detail: { loggedIn: true, email: form.email, userType: 'passageiro' } 
        })); 
      } catch (e) {}
      
      router.push("/usuario");
    } catch (err) {
      setError("Erro ao cadastrar. Tente novamente.");
      Sentry.captureException(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-4 py-20 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-100/50 to-transparent -z-10"></div>
      
      <div className="w-full max-w-2xl relative">
        <Link href="/" className="inline-flex items-center gap-2 text-[#004d2b] font-bold mb-8 hover:bg-white p-2 rounded-xl transition-all">
          <ChevronLeft className="w-5 h-5" /> Início
        </Link>
        
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-green-50">
          <div className="text-center mb-10">
             <div className="bg-[#004d2b] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#004d2b]/20">
              <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </div>
            <h1 className="text-3xl font-black text-[#004d2b]">Crie sua conta</h1>
            <p className="text-gray-500 font-medium">Junte-se à maior rede de caronas de SLZ</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Nome Completo" name="nome" value={form.nome} onChange={handleChange} placeholder="Sarah Lima" icon={<User className="w-5 h-5" />} />
              <Input label="CPF" name="cpf" value={form.cpf} onChange={handleChange} maxLength={14} placeholder="000.000.000-00" icon={<Hash className="w-5 h-5" />} />
              <Input type="email" label="E-mail" name="email" value={form.email} onChange={handleChange} placeholder="sarah@email.com" icon={<Mail className="w-5 h-5" />} />
              <Input type="tel" label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} maxLength={15} placeholder="(98) 90000-0000" icon={<Smartphone className="w-5 h-5" />} />
            </div>
            
            <Input label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} placeholder="Rua das Flores, Centro" icon={<MapPin className="w-5 h-5" />} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-[#004d2b] ml-1 uppercase tracking-wider">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="senha"
                    type={mostrarSenha ? "text" : "password"}
                    value={form.senha}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full border-2 border-gray-100 bg-gray-50/50 p-4 pl-12 pr-12 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#004d2b] transition-all font-medium"
                    required
                  />
                  <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600">
                    {mostrarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-[#004d2b] ml-1 uppercase tracking-wider">Confirmar Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="confirmarSenha"
                    type={mostrarConfirmarSenha ? "text" : "password"}
                    value={form.confirmarSenha}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full border-2 border-gray-100 bg-gray-50/50 p-4 pl-12 pr-12 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#004d2b] transition-all font-medium"
                    required
                  />
                  <button type="button" onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)} className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600">
                    {mostrarConfirmarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {form.senha && (
              <div className="bg-green-50/50 p-6 rounded-3xl border border-green-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <RequisitoSenha valido={forcaSenha.minimo} texto="8+ caracteres" />
                <RequisitoSenha valido={forcaSenha.maiuscula} texto="Maiúscula" />
                <RequisitoSenha valido={forcaSenha.minuscula} texto="Minúscula" />
                <RequisitoSenha valido={forcaSenha.numero} texto="Número" />
                <RequisitoSenha valido={forcaSenha.especial} texto="Especial" />
              </div>
            )}

            <div className="flex items-start gap-3 p-2">
              <input
                type="checkbox"
                checked={termosAceitos}
                onChange={(e) => setTermosAceitos(e.target.checked)}
                className="mt-1 h-5 w-5 rounded-lg border-2 border-gray-200 text-[#004d2b] focus:ring-0 accent-[#004d2b]"
              />
              <span className="text-sm text-gray-500 leading-relaxed font-medium">
                Concordo com os <Link href="/termos" className="text-[#004d2b] font-black hover:underline">Termos de Serviço</Link> e a <Link href="/privacidade" className="text-[#004d2b] font-black hover:underline">Política de Privacidade</Link>.
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !forcaSenha.todosValidos || !termosAceitos}
              className={`w-full font-black py-5 rounded-2xl transition-all duration-300 text-lg flex items-center justify-center gap-3 shadow-xl ${
                isLoading || !forcaSenha.todosValidos || !termosAceitos
                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] shadow-yellow-400/20 active:scale-95 transform hover:-translate-y-1"
              }`}
            >
              {isLoading ? "Criando sua conta..." : "Criar conta agora"}
            </button>
          </form>
          
          <p className="text-center text-gray-500 font-medium mt-10">
            Já é de casa?{" "}
            <Link href="/pessoal/login" className="text-[#004d2b] font-black hover:underline underline-offset-4 decoration-yellow-400 decoration-2">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

const Input = ({ label, name, value, onChange, type = "text", maxLength, placeholder, icon }: any) => (
  <div className="space-y-2">
    <label htmlFor={name} className="text-xs font-black text-[#004d2b] ml-1 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full border-2 border-gray-100 bg-gray-50/50 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#004d2b] transition-all font-medium"
        required
      />
    </div>
  </div>
);

const RequisitoSenha = ({ valido, texto }: { valido: boolean; texto: string }) => (
  <div className={`flex items-center gap-2 font-bold text-xs ${valido ? 'text-green-600' : 'text-gray-400'}`}>
    <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${valido ? 'bg-green-100 border-green-500 text-green-500' : 'bg-gray-50 border-gray-200 text-gray-300'}`}>
      {valido ? <Check size={12} strokeWidth={4} /> : <X size={12} strokeWidth={4} />}
    </div>
    {texto}
  </div>
);

export default Cadastro;