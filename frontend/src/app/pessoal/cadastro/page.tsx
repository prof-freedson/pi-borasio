"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    if (!/^\d{11}$/.test(form.cpf)) {
      return "CPF deve ter 11 dígitos numéricos";
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
    if (!/^\d{8,}$/.test(form.telefone.replace(/\D/g, ""))) {
      return "Telefone deve ter pelo menos 8 dígitos";
    }

    // Senha: obrigatório, mínimo 6 caracteres
    if (!form.senha) {
      return "A senha é obrigatória";
    }
    if (form.senha.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres";
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
          <Input label="CPF" name="cpf" value={form.cpf} onChange={handleChange} />
          <Input label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} />
          <Input type="email" label="E-mail" name="email" value={form.email} onChange={handleChange} />
          <Input type="tel" label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} />
          <Input type="password" label="Senha" name="senha" value={form.senha} onChange={handleChange} />
          <Input type="password" label="Confirmar Senha" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-yellow-300 text-green-900 font-bold py-3 rounded-md hover:bg-yellow-400 transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
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
  type = "text"
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
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
      className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      required
    />
  </div>
);

export default Cadastro;

