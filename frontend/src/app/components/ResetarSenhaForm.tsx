"use client"

import { useState } from 'react';

export default function ResetarSenhaForm() {
  const [token, setToken] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem('');
    try {
      const res = await fetch('/api/resetar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, novaSenha }),
      });
      if (res.ok) {
        setMensagem('Senha redefinida com sucesso!');
      } else {
        setMensagem('Erro ao redefinir senha. Verifique o token.');
      }
    } catch {
      setMensagem('Erro de conexão. Tente novamente.');
    }
    setCarregando(false);
  };

  return (
    <form onSubmit={handleSubmit} className="resetar-senha-form">
      <label htmlFor="token">Token:</label>
      <input
        type="text"
        id="token"
        value={token}
        onChange={e => setToken(e.target.value)}
        required
      />
      <label htmlFor="novaSenha">Nova Senha:</label>
      <input
        type="password"
        id="novaSenha"
        value={novaSenha}
        onChange={e => setNovaSenha(e.target.value)}
        required
      />
      <button type="submit" disabled={carregando}>
        {carregando ? 'Enviando...' : 'Redefinir Senha'}
      </button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}
