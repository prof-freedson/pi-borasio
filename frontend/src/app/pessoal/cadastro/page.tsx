"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { Eye, EyeOff, Check, X } from "lucide-react";

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

  // Função de validação aprimorada
  const validate = () => {
    // Nome: obrigatório, apenas letras e espaços
    if (!form.nome) {
      return "O nome é obrigatório";
    }
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(form.nome)) {
      return "O nome deve conter apenas letras e espaços";
    }

    // CPF: obrigatório, 11 dígitos numéricos
    if (!form.cpf) {
      return "O CPF é obrigatório";
    }
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf)) {
      return "CPF inválido. Preencha o formato completo.";
    }

    // Endereço: obrigatório
    if (!form.endereco) {
      return "O endereço é obrigatório";
    }

    // E-mail: obrigatório, formato válido
    if (!form.email) {
      return "O e-mail é obrigatório";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return `E-mail inválido: ${form.email}`;
    }

    // Telefone: obrigatório, mínimo 8 dígitos
    if (!form.telefone) {
      return "O telefone é obrigatório";
    }
    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(form.telefone)) {
      return "Telefone inválido. Preencha o DDD e o número completo.";
    }

    // Senha: obrigatório e forte
    if (!form.senha) {
      return "A senha é obrigatória";
    }
    if (!validarForcaSenha(form.senha).todosValidos) {
      return "A senha não atende a todos os requisitos de segurança.";
    }

    // Confirmar senha: obrigatório, igual à senha
    if (!form.confirmarSenha) {
      return "Confirme a senha";
    }
    if (form.senha !== form.confirmarSenha) {
      return "As senhas não coincidem";
    }

    return null;
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

  const forcaSenha = validarForcaSenha(form.senha);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      // Reporta qualquer erro de validação ao Sentry
      Sentry.captureException(new Error(validationError));
      setIsLoading(false);
      return;
    }

    try {
      // ...existing code...
      console.log("Dados para cadastro:", form);
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push("/usuario");
    } catch (err) {
      setError("Erro ao cadastrar. Tente novamente.");
      Sentry.captureException(err); // Captura erro inesperado
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-green-100 flex items-center justify-center px-4 pt-20 md:pt-32 pb-20 md:pb-32">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-green-900 mb-6">
          Criar conta
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <Input label="Nome Completo" name="nome" value={form.nome} onChange={handleChange} />
          <Input label="CPF" name="cpf" value={form.cpf} onChange={handleChange} maxLength={14} />
          <Input label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} />
          <Input type="email" label="E-mail" name="email" value={form.email} onChange={handleChange} />
          <Input type="tel" label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} maxLength={15} />

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

          {/* Checkbox de Termos de Serviço */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={termosAceitos}
                onChange={(e) => setTermosAceitos(e.target.checked)}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:outline-none accent-green-700"
              />
              <span className="ml-2 text-sm text-gray-700">
                Eu li e aceito os{" "}
                <Link href="/termos-de-servico" className="text-green-700 hover:underline font-medium">
                  Termos de Serviço
                </Link>{" "}
                e a{" "}
                <Link href="/politica-de-privacidade" className="text-green-700 hover:underline font-medium">
                  Política de Privacidade
                </Link>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || !forcaSenha.todosValidos || !termosAceitos}
            className={`w-full bg-yellow-300 text-green-900 font-bold py-3 rounded-md hover:bg-yellow-400 transition ${
              isLoading || !forcaSenha.todosValidos || !termosAceitos ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Cadastrando..." : "Cadastre-se"}
          </button>
        </form>
        <p className="text-center text-sm text-green-900 mt-4">
          Já tem uma conta?{" "}
          <Link href="/pessoal/login" className="hover:underline font-medium">
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
};

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  maxLength
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  maxLength?: number;
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-green-900 mb-1 font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      required
    />
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

export default Cadastro;
