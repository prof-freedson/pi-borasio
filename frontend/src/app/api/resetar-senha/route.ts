import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { novaSenha, confirmarNovaSenha } = await request.json();

  // Validação simples para garantir que as senhas coincidem
  if (novaSenha !== confirmarNovaSenha) {
    return NextResponse.json({ error: 'As senhas não coincidem.' }, { status: 400 });
  }

  try {
    const res = await fetch(`http://localhost:8080/api/password-recovery/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Passamos a nova senha no corpo
      body: JSON.stringify({ newPassword: novaSenha }),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      const errorData = await res.json();
      return NextResponse.json(errorData, { status: res.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao redefinir a senha. Tente novamente mais tarde.' }, { status: 500 });
  }
}