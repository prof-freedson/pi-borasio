import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Motoristas() {
  const [motoristas, setMotoristas] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/drivers');
      const data = await response.json();
      setMotoristas(data);
    } catch (error) {
      console.error('Erro ao buscar motoristas:', error);
    }
  };

  const handleRemove = async (id) => {
    if (confirm('Tem certeza que deseja remover este motorista?')) {
      try {
        await fetch(`http://localhost:3001/admin/users/${id}`, { method: 'DELETE' });
        fetchDrivers(); // Recarrega a lista
      } catch (error) {
        console.error('Erro ao remover motorista:', error);
      }
    }
  };

  return (
    <div className="motoristas-container">
      <h1>Gestão de Motoristas</h1>
      <button className="criar-btn">Criar Motorista</button>
      <table className="motoristas-tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNH</th>
            <th>Veículo</th>
            <th>Placa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {motoristas.map((m) => (
            <tr key={m.id}>
              <td>{m.usuarios?.nome || 'N/A'}</td>
              <td>{m.cnh || 'N/A'}</td>
              <td>{m.modelo} - {m.cor}</td>
              <td>{m.placa || 'N/A'}</td>
              <td>
                <Link href={`/motoristas/editar/${m.usuarios.id}`}>
                  <button className="editar-btn">Editar</button>
                </Link>
                <button className="remover-btn" onClick={() => handleRemove(m.usuarios.id)} style={{ marginLeft: '10px' }}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}