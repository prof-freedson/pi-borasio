import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, codigo } = await request.json();

  try {
    const res = await fetch('http://localhost:8080/api/password-recovery/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, verificationCode: codigo }),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      const errorData = await res.json();
      return NextResponse.json(errorData, { status: res.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro de conexão. Não foi possível verificar o código.' }, { status: 500 });
  }
}