import React from 'react';
import Link from 'next/link';

export default function MenuAdmin() {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px' }}>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/motoristas">Motoristas</Link>
      <Link href="/passageiros">Passageiros</Link>
      <Link href="/corridas">Corridas</Link>
      <Link href="/pagamentos">Pagamentos</Link>
    </nav>
  );
}