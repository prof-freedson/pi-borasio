import React from 'react';

export default function Corridas() {
  return (
    <div>
      <h1>Gestão de Corridas</h1>
      <button>Criar Itinerário</button>
      <table>
        <thead>
          <tr>
            <th>Motorista</th>
            <th>Passageiro</th>
            <th>Status</th>
            <th>Origem</th>
            <th>Destino</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>João Silva</td>
            <td>Ana Costa</td>
            <td>Em andamento</td>
            <td>Renascença</td>
            <td>Centro</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
