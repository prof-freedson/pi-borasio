import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [totalMotoristas, setTotalMotoristas] = useState(0);

  useEffect(() => {
    const motoristas = JSON.parse(localStorage.getItem('motoristas')) || [];
    setTotalMotoristas(motoristas.length);
  }, []);

  return (
    <div>
      <h1>Dashboard Administrativo</h1>
      <div>
        <p>Total de Motoristas: {totalMotoristas}</p>
        <p>Total de Passageiros: ___</p>
        <p>Corridas em andamento: ___</p>
        <p>Pagamentos pendentes: ___</p>
      </div>
    </div>
  );
}