"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Cadastromotorista = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    endereco: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    cnh: "",
    veiculoMarca: "",
    veiculoCor: "",
    veiculoArCondicionado: "não",
    veiculoModelo: "",
    veiculoCombustivel: "",
    veiculoAssentos: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <main className="min-h-screen bg-green-100 flex items-center justify-center px-4 py-16">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-6xl">
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
            <Input label="CPF" name="cpf" value={form.cpf} onChange={handleChange} />
            <Input label="CNH" name="cnh" value={form.cnh} onChange={handleChange} />
            <Input label="Endereço Completo" name="endereco" value={form.endereco} onChange={handleChange} />
            <Input type="email" label="E-mail" name="email" value={form.email} onChange={handleChange} />
            <Input type="tel" label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} />
            <Input type="password" label="Senha" name="senha" value={form.senha} onChange={handleChange} />
            <Input type="password" label="Confirmar Senha" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} />
          </fieldset>

          {/* Dados do Veículo */}
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-green-800 mb-2 border-b pb-1">
              Dados do Veículo
            </legend>

            <Input label="Marca" name="veiculoMarca" value={form.veiculoMarca} onChange={handleChange} />
            <Input label="Modelo" name="veiculoModelo" value={form.veiculoModelo} onChange={handleChange} />
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
            <Input label="Combustível" name="veiculoCombustivel" value={form.veiculoCombustivel} onChange={handleChange} />
            <Input type="number" label="Assentos" name="veiculoAssentos" value={form.veiculoAssentos} onChange={handleChange} />
          </fieldset>

          {/* Botão (fica abaixo das colunas) */}
          <div className="md:col-span-2">
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

export default Cadastromotorista;
