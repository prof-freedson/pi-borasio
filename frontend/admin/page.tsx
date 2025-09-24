import React from 'react';

export default function Dashboard() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dashboard Administradora</h1>
      <section>
        <h2>Resumo</h2>
        <ul>
          <li>Total de usuários cadastrados</li>
          <li>Total de corridas realizadas</li>
          <li>Eventos culturais ativos</li>
        </ul>
      </section>
      <section>
        <h2>Atalhos</h2>
        <ul>
          <li><a href="/admin/usuarios">Gerenciar Usuários</a></li>
          <li><a href="/admin/motoristas">Gestão de Motoristas</a></li>
          <li><a href="/admin/passageiros">Gestão de Passageiros</a></li>
          <li><a href="/admin/corridas">Gerenciar Corridas</a></li>
          <li><a href="/admin/eventos-culturais">Gerenciar Eventos</a></li>
          <li><a href="/admin/financeiro">Painel Financeiro</a></li>
          <li><a href="/admin/suporte-denuncias">Suporte/Denúncias</a></li>
          <li><a href="/admin/estatisticas">Estatísticas/Gráficos</a></li>
          <li><a href="/admin/permissoes">Permissões</a></li>
          <li><a href="/admin/logs-admin">Logs Administrativos</a></li>
        </ul>
      </section>
    </main>
  );
}
