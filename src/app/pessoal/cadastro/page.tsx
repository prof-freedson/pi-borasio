"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (form.senha !== form.confirmarSenha) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Dados para cadastro:", form);
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push("/usuario");
    } catch (err) {
      setError("Erro ao cadastrar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-green-100 flex items-center justify-center px-4 pt-20 md:pt-32 pb-20 md:pb-32">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl"> {/* Aumentei o max-width */}
        <h1 className="text-3xl font-bold text-center text-green-900 mb-6">
          Criar conta
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coluna 1 */}
            <div className="space-y-4">
              {/* Nome Completo */}
              <div>
                <label htmlFor="nome" className="block text-green-900 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={form.nome}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* CPF */}
              <div>
                <label htmlFor="cpf" className="block text-green-900 mb-1">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  id="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-green-900 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="space-y-4">
              {/* Endereço */}
              <div>
                <label htmlFor="endereco" className="block text-green-900 mb-1">
                  Endereço Completo
                </label>
                <input
                  type="text"
                  name="endereco"
                  id="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Telefone */}
              <div>
                <label htmlFor="telefone" className="block text-green-900 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="telefone"
                  id="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Senha */}
              <div>
                <label htmlFor="senha" className="block text-green-900 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  name="senha"
                  id="senha"
                  value={form.senha}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>

          {/* Confirmar Senha (ocupa linha inteira) */}
          <div className="mt-4">
            <label htmlFor="confirmarSenha" className="block text-green-900 mb-1">
              Confirmar Senha
            </label>
            <input
              type="password"
              name="confirmarSenha"
              id="confirmarSenha"
              value={form.confirmarSenha}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-6 bg-yellow-300 text-green-900 font-bold py-3 rounded-md hover:bg-yellow-400 transition ${
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

export default Cadastro;