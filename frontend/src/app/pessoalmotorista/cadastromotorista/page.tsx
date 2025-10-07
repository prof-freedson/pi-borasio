"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { Eye, EyeOff, Check, X } from "lucide-react";

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

  // Função para validar força da senha e retornar os critérios
  const validarForcaSenha = (senha: string) => {
    const requisitos = {
      minimo: /.{8,}/.test(senha), // mínimo 8 caracteres
      maiuscula: /[A-Z]/.test(senha), // letra maiúscula
      minuscula: /[a-z]/.test(senha), // letra minúscula
      numero: /[0-9]/.test(senha), // número
      especial: /[^A-Za-z0-9]/.test(senha), // caractere especial
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
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(form.veiculoMarca)) return "A marca deve conter apenas letras";
    if (!form.veiculoModelo) return "O modelo do veículo é obrigatório";
    if (!form.veiculoPlaca) return "A placa do veículo é obrigatória";
    if (!form.veiculoCor) return "A cor do veículo é obrigatória";
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(form.veiculoCor)) return "A cor deve conter apenas letras";
    if (!form.veiculoCombustivel) return "O combustível é obrigatório";
    if (!form.veiculoAssentos) return "O número de assentos é obrigatório";
    if (!/^\d+$/.test(form.veiculoAssentos)) return "Assentos deve conter apenas números";
    if (parseInt(form.veiculoAssentos) < 1) return "Assentos deve ser pelo menos 1";
    if (!termsAccepted) return "Você deve aceitar os Termos de Serviço e a Política de Privacidade.";
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
      // Simulação de cadastro
      console.log("Dados para cadastro:", form);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Salvar dados no localStorage e marcar como logado
      try {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', form.email);
        localStorage.setItem('userType', 'motorista');
        localStorage.setItem('userName', form.nome);
        
        // Notificar o header sobre a mudança
        try { 
          window.dispatchEvent(new CustomEvent('authChanged', { 
            detail: { 
              loggedIn: true, 
              email: form.email,
              userType: 'motorista'
            } 
          })); 
        } catch (e) {}
      } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
      }
      
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
    <main className="min-h-screen bg-green-100 flex items-center justify-center px-4 py-16">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3">
        <h1 className="text-3xl font-bold text-center text-green-900 mb-8">
          Cadastro de Motorista
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dados do Motorista */}
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-green-800 mb-2 border-b pb-1">
              Dados Pessoais
            </legend>

            <Input label="Nome Completo" name="nome" value={form.nome} onChange={handleChange} />
            <Input label="CNH" name="cnh" value={form.cnh} onChange={handleChange} />
            <Input label="Endereço Completo" name="endereco" value={form.endereco} onChange={handleChange} />
            <Input type="email" label="E-mail" name="email" value={form.email} onChange={handleChange} />
            <Input type="tel" label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000" />

            {/* Campo de Senha com indicador e visibilidade */}
            <div className="mb-4">
              <label htmlFor="senha" className="block text-green-900 mb-1 font-medium">Senha</label>
              <div className="relative">
                <input
                  id="senha"
                  name="senha"
                  type={mostrarSenha ? "text" : "password"}
                  value={form.senha}
                  onChange={handleChange}
                  className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                  {mostrarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {form.senha && (
                <div className="mt-2 text-xs space-y-1">
                  <RequisitoSenha valido={forcaSenha.minimo} texto="Pelo menos 8 caracteres" />
                  <RequisitoSenha valido={forcaSenha.maiuscula} texto="Uma letra maiúscula" />
                  <RequisitoSenha valido={forcaSenha.minuscula} texto="Uma letra minúscula" />
                  <RequisitoSenha valido={forcaSenha.numero} texto="Um número" />
                  <RequisitoSenha valido={forcaSenha.especial} texto="Um caractere especial (!@#$...)" />
                </div>
              )}
            </div>

            {/* Campo de Confirmar Senha com visibilidade */}
            <div className="mb-4">
              <label htmlFor="confirmarSenha" className="block text-green-900 mb-1 font-medium">Confirmar Senha</label>
              <div className="relative">
                <input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  value={form.confirmarSenha}
                  onChange={handleChange}
                  className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <button type="button" onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                  {mostrarConfirmarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
          </fieldset>

          {/* Dados do Veículo */}
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-green-800 mb-2 border-b pb-1">
              Dados do Veículo
            </legend>

            <Input label="Marca" name="veiculoMarca" value={form.veiculoMarca} onChange={handleChange} />
            <Input label="Modelo" name="veiculoModelo" value={form.veiculoModelo} onChange={handleChange} />
            <Input label="Placa" name="veiculoPlaca" value={form.veiculoPlaca} onChange={handleChange} />
            <Input label="Cor" name="veiculoCor" value={form.veiculoCor} onChange={handleChange} />
            <Select
              label="Ar-Condicionado"
              name="veiculoArCondicionado"
              value={form.veiculoArCondicionado}
              onChange={handleChange}
              options={[
                { label: "Sim", value: "sim" },
                { label: "Não", value: "não" }
              ]}
            />
            <Select
              label="Combustível"
              name="veiculoCombustivel"
              value={form.veiculoCombustivel}
              onChange={handleChange}
              options={[
                { label: "Qual o combustível?", value: "" }, 
                { label: "Gasolina", value: "gasolina" },
                { label: "Etanol", value: "etanol" },
                { label: "Flex", value: "flex" },
                { label: "Diesel", value: "diesel" },
                { label: "Elétrico", value: "eletrico" },
              ]}
            />
            <Input type="number" label="Assentos" name="veiculoAssentos" value={form.veiculoAssentos} onChange={handleChange} />
          </fieldset>

          {/* Termos e Botão */}
          <div className="md:col-span-2">
            <div className="flex items-start mb-6">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted} 
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4 accent-green-900 border-gray-300 rounded focus:ring-green-500 mt-1"
              />
              <label htmlFor="terms" className="ml-2 text-sm">
                <span className="text-gray-500">Eu li e aceito os </span>
                <Link href="/termos-de-servico" className="font-medium text-green-900 hover:underline">Termos de Serviço</Link>
                <span className="text-gray-500"> e a </span>
                <Link href="/politica-de-privacidade" className="font-medium text-green-900 hover:underline">Política de Privacidade</Link>
                <span className="text-gray-500">.</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-yellow-300 text-green-900 font-bold py-3 rounded-md hover:bg-yellow-400 transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Cadastrando..." : "Cadastre-se"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-green-900 mt-6">
          Já tem uma conta?{" "}
          <Link href="/pessoalmotorista/loginmotorista" className="hover:underline font-medium">
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
};

// Input and Select components remain the same
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) => (
  <div>
    <label htmlFor={name} className="block text-green-900 mb-1 font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      required
    />
  </div>
);

const Select = ({
  label,
  name,
  value,
  onChange,
  options
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
}) => (
  <div>
    <label htmlFor={name} className="block text-green-900 mb-1 font-medium">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const RequisitoSenha = ({ valido, texto }: { valido: boolean; texto: string }) => (
  <div className={`flex items-center gap-2 transition-colors ${valido ? 'text-green-600' : 'text-gray-500'}`}>
    {valido ? (
      <Check size={16} className="flex-shrink-0" />
    ) : (
      <X size={16} className="flex-shrink-0" />
    )}
    <span>{texto}</span>
  </div>
);

export default Cadastromotorista;