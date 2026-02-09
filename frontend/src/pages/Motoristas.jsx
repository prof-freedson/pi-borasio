import React from 'react';

const motoristas = [
  {
    nome: 'João Silva',
    cpf: '123.456.789-00',
    status: 'Ativo',
  },
  // Adicione mais motoristas conforme necessário
];

export default function Motoristas() {
  return (
    <div className="motoristas-container">
      <h1>Gestão de Motoristas</h1>
      <button className="criar-btn">Criar Motorista</button>
      <table className="motoristas-tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {motoristas.map((m, index) => (
            <tr key={index}>
              <td>{m.nome}</td>
              <td>{m.cpf}</td>
              <td>{m.status}</td>
              <td>
                <button className="editar-btn">Editar</button>
                <button className="remover-btn">Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}