import React, { useState } from 'react';

export default function Motoristas() {
  const [motorista, setMotorista] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    status: 'Ativo'
  });

  const [lista, setLista] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setMotorista({ ...motorista, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLista([...lista, motorista]);
    setMotorista({ nome: '', cpf: '', telefone: '', status: 'Ativo' });
  }

  return (
    <div>
      <h1>Cadastro de Motoristas</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={motorista.nome}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={motorista.cpf}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={motorista.telefone}
          onChange={handleChange}
        />
        <select name="status" value={motorista.status} onChange={handleChange}>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Lista de Motoristas</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item, index) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>{item.cpf}</td>
              <td>{item.telefone}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
