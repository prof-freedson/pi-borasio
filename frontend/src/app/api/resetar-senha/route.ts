import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { token, novaSenha } = await request.json();
  // Chamada para o backend Java
  const params = new URLSearchParams({ token, newPassword: novaSenha });
  const res = await fetch(`http://localhost:8080/api/password-recovery/reset?${params.toString()}`, {
    method: 'POST',
  });
  const text = await res.text();
  if (res.ok) {
    return NextResponse.json({ message: text });
  } else {
    return NextResponse.json({ error: text }, { status: 400 });
  }
}
