import React from 'react';

export default function PassaggiPage() {
  return (
    <div>
      <h1>Gestione dei Passaggi</h1>
      <button>Aggiungi Passaggio</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Note</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>23/09/2025</td>
            <td>Exemplo</td>
            <td>
              <button>Modifica</button>
              <button>Elimina</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
