import { useState } from 'react';

export default function RecuperarSenhaForm() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem('');
    try {
      const res = await fetch('/api/recuperar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setMensagem('Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.');
      } else {
        setMensagem('Erro ao solicitar recuperação. Tente novamente.');
      }
    } catch {
      setMensagem('Erro de conexão. Tente novamente.');
    }
    setCarregando(false);
  };

  return (
    <form onSubmit={handleSubmit} className="recuperar-senha-form">
      <label htmlFor="email">E-mail:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={carregando}>
        {carregando ? 'Enviando...' : 'Recuperar Senha'}
      </button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}
