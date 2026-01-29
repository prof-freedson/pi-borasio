import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Motoristas from './pages/Motoristas';
import Passageiros from './pages/Passageiros';
import Corridas from './pages/Corridas';
import Pagamentos from './pages/Pagamentos';

// Rotas adicionais do admin
import Usuarios from './pages/admin/Usuarios';
import Configuracoes from './pages/admin/Configuracoes';
import Relatorios from './pages/admin/Relatorios';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/motoristas" element={<Motoristas />} />
        <Route path="/passageiros" element={<Passageiros />} />
        <Route path="/corridas" element={<Corridas />} />
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route path="/admin/usuarios" element={<Usuarios />} />
        <Route path="/admin/configuracoes" element={<Configuracoes />} />
        <Route path="/admin/relatorios" element={<Relatorios />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </Router>
  );
}
