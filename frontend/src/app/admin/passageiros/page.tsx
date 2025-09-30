'use client';

import React, { useState } from 'react';

type Passageiro = {
  id: number;
  nome: string;
  email: string;
  dataCadastro: string;
};

const PassageirosAdmin: React.FC = () => {
  const [passageiros, setPassageiros] = useState<Passageiro[]>([
    { id: 1, nome: 'Ana Júlia de Almeida', email: 'ana.almeida@email.com', dataCadastro: '2023-10-25' },
    { id: 2, nome: 'Bruno Carvalho', email: 'bruno.carvalho@email.com', dataCadastro: '2023-10-22' },
    { id: 3, nome: 'Carlos Eduardo Lima', email: 'carlos.lima@email.com', dataCadastro: '2023-09-15' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Passageiro | null>(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const abrirModal = (passageiro?: Passageiro) => {
    if (passageiro) {
      setEditando(passageiro);
      setNome(passageiro.nome);
      setEmail(passageiro.email);
    } else {
      setEditando(null);
      setNome('');
      setEmail('');
    }
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setEditando(null);
    setNome('');
    setEmail('');
  };

  const salvarPassageiro = () => {
    if (!nome || !email) return;

    if (editando) {
      setPassageiros((prev) =>
        prev.map((p) =>
          p.id === editando.id ? { ...p, nome, email } : p
        )
      );
    } else {
      const novoPassageiro = {
        id: Date.now(),
        nome,
        email,
        dataCadastro: new Date().toISOString().split('T')[0],
      };
      setPassageiros([...passageiros, novoPassageiro]);
    }

    fecharModal();
  };

  const removerPassageiro = (id: number) => {
    if (confirm('Tem certeza que deseja remover este passageiro?')) {
      setPassageiros(passageiros.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-green-600">Gestão de Passageiros</h1>
        <button
          onClick={() => abrirModal()}
          className="bg-yellow-300 hover:bg-yellow-500 text-green-800 font-semibold py-2 px-4 rounded shadow transition"
        >
          + Adicionar Passageiro
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase tracking-wide text-xs">
              <th className="px-5 py-3 border-b">Nome</th>
              <th className="px-5 py-3 border-b">Email</th>
              <th className="px-5 py-3 border-b">Data de Cadastro</th>
              <th className="px-5 py-3 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {passageiros.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 border-b">{p.nome}</td>
                <td className="px-5 py-4 border-b">{p.email}</td>
                <td className="px-5 py-4 border-b">{p.dataCadastro}</td>
                <td className="px-5 py-4 border-b text-center space-x-2">
                  <button
                    onClick={() => abrirModal(p)}
                    className="text-yellow-600 hover:text-yellow-800 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => removerPassageiro(p.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
            {passageiros.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Nenhum passageiro cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-green-700">
              {editando ? 'Editar Passageiro' : 'Adicionar Passageiro'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={fecharModal}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={salvarPassageiro}
                className="px-4 py-2 bg-yellow-300 hover:bg-yellow-500 text-green-800 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassageirosAdmin;
