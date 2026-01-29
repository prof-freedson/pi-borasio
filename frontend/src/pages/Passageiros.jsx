import React from 'react';

export default function Passageiros() {
  return (
    <div>
      <h1>Gestão de Passageiros</h1>
      <button>Criar Passageiro</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ana Costa</td>
            <td>(98) 99999-0000</td>
            <td>
              <button>Editar</button>
              <button>Remover</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
