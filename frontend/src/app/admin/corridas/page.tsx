"use client";
import * as React from 'react';
import { useEffect, useState } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

type Corrida = {
  id: number;
  origem: string;
  destino: string;
  dataCorrida: string;
  status: string;
};

const API_URL = 'http://localhost:8080/corridas';

const CorridasAdmin: React.FC = () => {
  const [corridas, setCorridas] = useState<Corrida[]>([]);
  const [form, setForm] = useState<Partial<Corrida>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const adminPages = [
    { label: 'Motoristas', path: '/admin/motoristas' },
    { label: 'Passageiros', path: '/admin/passageiros' },
    { label: 'Corridas', path: '/admin/corridas' },
    { label: 'Itinerários', path: '/admin/itinerarios' },
    { label: 'Pagamentos', path: '/admin/pagamentos' },
  ];

  useEffect(() => {
    fetchCorridas();
  }, []);

  const fetchCorridas = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCorridas(data);
    } catch (err) {
      alert('Erro ao buscar corridas');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erro ao salvar corrida');
      setForm({});
      setEditId(null);
      fetchCorridas();
    } catch (err) {
      alert('Erro ao salvar corrida');
    }
    setLoading(false);
  };

  const handleEdit = (corrida: Corrida) => {
    setForm(corrida);
    setEditId(corrida.id);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja remover esta corrida?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao remover corrida');
      fetchCorridas();
    } catch (err) {
      alert('Erro ao remover corrida');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <nav style={{ marginBottom: 24, display: 'flex', gap: 16 }}>
        {adminPages.map((p) => (
          <a key={p.path} href={p.path} style={{ color: '#007a4d', fontWeight: 'bold', textDecoration: 'underline' }}>{p.label}</a>
        ))}
      </nav>
      <h1 style={{ marginBottom: 16 }}>Gestão de Corridas</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input name="origem" placeholder="Origem" value={form.origem || ''} onChange={handleChange} required />
        <input name="destino" placeholder="Destino" value={form.destino || ''} onChange={handleChange} required />
        <input name="dataCorrida" type="datetime-local" value={form.dataCorrida || ''} onChange={handleChange} required />
        <select name="status" value={form.status || ''} onChange={handleChange} required>
          <option value="">Status</option>
          <option value="pendente">Pendente</option>
          <option value="em_andamento">Em andamento</option>
          <option value="concluida">Concluída</option>
          <option value="cancelada">Cancelada</option>
        </select>
        <button type="submit" disabled={loading}>{editId ? 'Atualizar' : 'Criar'}</button>
        {editId && <button type="button" onClick={() => { setForm({}); setEditId(null); }}>Cancelar edição</button>}
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#e6f4ea' }}>
            <th>ID</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {corridas.map((c: Corrida) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.origem}</td>
              <td>{c.destino}</td>
              <td>{c.dataCorrida?.replace('T', ' ')}</td>
              <td>{c.status}</td>
              <td>
                <button onClick={() => handleEdit(c)} disabled={loading}>Editar</button>
                <button onClick={() => handleDelete(c.id)} disabled={loading} style={{ color: 'red', marginLeft: 8 }}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p style={{ marginTop: 16 }}>Carregando...</p>}
    </div>
  );
};

export default CorridasAdmin;
