import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao BoraSio!</h1>
      <p>Escolha uma área para gerenciar:</p>

      <div className="button-grid">
        <Link href="/motoristas"><button>Motoristas</button></Link>
        <Link href="/passageiros"><button>Passageiros</button></Link>
        <Link href="/corridas"><button>Corridas</button></Link>
        <Link href="/pagamentos"><button>Pagamentos</button></Link>
      </div>
    </div>
  );
}