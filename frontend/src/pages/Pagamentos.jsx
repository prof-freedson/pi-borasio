import React from 'react';

export default function Pagamentos() {
  return (
    <div>
      <h1>Gestão de Pagamentos</h1>
      <table>
        <thead>
          <tr>
            <th>Passageiro</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ana Costa</td>
            <td>R$ 12,00</td>
            <td>Pendente</td>
            <td>23/09/2025</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
