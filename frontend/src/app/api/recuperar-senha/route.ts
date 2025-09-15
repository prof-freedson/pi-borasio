import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();
  // Chamada para o backend Java
  const res = await fetch('http://localhost:8080/api/password-recovery/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const text = await res.text();
  if (res.ok) {
    return NextResponse.json({ message: text });
  } else {
    return NextResponse.json({ error: text }, { status: 400 });
  }
}
