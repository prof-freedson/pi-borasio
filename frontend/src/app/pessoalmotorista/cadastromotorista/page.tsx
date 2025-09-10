"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs"; // Adicione esta linha

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

  // Função de validação aprimorada
  const validate = () => {
    // Nome: obrigatório, apenas letras e espaços
    if (!form.nome) return "O nome é obrigatório";
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(form.nome)) return "O nome deve conter apenas letras e espaços";

    // CPF: obrigatório, 11 dígitos numéricos
    if (!form.cpf) return "O CPF é obrigatório";
    if (!/^\d{11}$/.test(form.cpf)) return "CPF deve ter 11 dígitos numéricos";

    // CNH: obrigatório, 11 dígitos numéricos
    if (!form.cnh) return "A CNH é obrigatória";
    if (!/^\d{11}$/.test(form.cnh)) return "CNH deve ter 11 dígitos numéricos";

    // Endereço: obrigatório
    if (!form.endereco) return "O endereço é obrigatório";

    // E-mail: obrigatório, formato válido
    if (!form.email) return "O e-mail é obrigatório";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return `E-mail inválido: ${form.email}`;

    // Telefone: obrigatório, mínimo 8 dígitos
    if (!form.telefone) return "O telefone é obrigatório";
    if (!/^\d{8,}$/.test(form.telefone.replace(/\D/g, ""))) return "Telefone deve ter pelo menos 8 dígitos";

    // Senha: obrigatório, mínimo 6 caracteres
    if (!form.senha) return "A senha é obrigatória";
    if (form.senha.length < 6) return "A senha deve ter pelo menos 6 caracteres";

    // Confirmar senha: obrigatório, igual à senha
    if (!form.confirmarSenha) return "Confirme a senha";
    if (form.senha !== form.confirmarSenha) return "As senhas não coincidem";

    // Marca: obrigatório, apenas letras
    if (!form.veiculoMarca) return "A marca do veículo é obrigatória";
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(form.veiculoMarca)) return "A marca deve conter apenas letras";

    // Modelo: obrigatório
    if (!form.veiculoModelo) return "O modelo do veículo é obrigatório";

    // Cor: obrigatório, apenas letras
    if (!form.veiculoCor) return "A cor do veículo é obrigatória";
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(form.veiculoCor)) return "A cor deve conter apenas letras";

    // Combustível: obrigatório
    if (!form.veiculoCombustivel) return "O combustível é obrigatório";

    // Assentos: obrigatório, apenas números, mínimo 1
    if (!form.veiculoAssentos) return "O número de assentos é obrigatório";
    if (!/^\d+$/.test(form.veiculoAssentos)) return "Assentos deve conter apenas números";
    if (parseInt(form.veiculoAssentos) < 1) return "Assentos deve ser pelo menos 1";

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
      console.log("Dados para cadastro:", form);
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push("/motorista");
    } catch (err) {
      setError("Erro ao cadastrar. Tente novamente.");
      Sentry.captureException(err);
    } finally {
      setIsLoading(false);
    }
  };

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
