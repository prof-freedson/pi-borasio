import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Passageiros() {
  const [passageiros, setPassageiros] = useState([]);

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/passengers');
      const data = await response.json();
      setPassageiros(data);
    } catch (error) {
      console.error('Erro ao buscar passageiros:', error);
    }
  };

  const handleRemove = async (id) => {
    if (confirm('Tem certeza que deseja remover este passageiro?')) {
      try {
        await fetch(`http://localhost:3001/admin/users/${id}`, { method: 'DELETE' });
        fetchPassengers(); // Recarrega a lista
      } catch (error) {
        console.error('Erro ao remover passageiro:', error);
      }
    }
  };

  return (
    <div>
      <h1>Gestão de Passageiros</h1>
      <button>Criar Passageiro</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Preferências</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {passageiros.map((p) => (
            <tr key={p.id}>
              <td>{p.usuarios?.nome || 'N/A'}</td>
              <td>{p.telefone || 'N/A'}</td>
              <td>{p.preferencias || '-'}</td>
              <td>
                <Link href={`/passageiros/editar/${p.usuarios.id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleRemove(p.usuarios.id)} style={{ marginLeft: '10px', color: 'red' }}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
