"use client";

import { useState } from "react";
import Link from "next/link";

const Cadastro = () => {
  const [form, setForm] = useState({ nome: "", email: "", senha: "", confirmarSenha: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui pode colocar lógica de validação ou envio para API
    console.log("Cadastro:", form);
  };

  return (
    <main className="min-h-screen bg-green-100 flex items-center justify-center px-4">
      <div className="bg-[#fefce8] p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-green-900 mb-6">Criar conta</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-green-900 mb-1">
              Nome
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
            />
          </div>
          <div>
            <label htmlFor="confirmarSenha" className="block text-green-900 mb-1">
              Confirmar senha
            </label>
            <input
              type="password"
              name="confirmarSenha"
              id="confirmarSenha"
              value={form.confirmarSenha}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-300 text-green-900 font-bold py-3 rounded-md hover:bg-yellow-400 transition"
          >
            Cadastre-se
          </button>
        </form>
        <p className="text-center text-sm text-green-900 mt-4">
          Já tem uma conta?{" "}
          <Link href="/login" className="hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Cadastro;
