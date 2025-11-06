// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // 1. Importa o hook de autenticação

// Seus componentes de página
import Header from './components/Header';
import Hero from './components/Hero';
import MainContent from './components/MainContent';
import PiscinaDetalhes from './components/PiscinaDetalhes';
import ComoFunciona from './components/ComoFunciona';
import Contato from './components/Contato';

// Nossos novos componentes de autenticação
import LoginForm from './LoginForm'; // (Crie este arquivo)
import RegisterForm from './RegisterForm'; // (Crie este arquivo)

import './App.css';

// --- Página Home com Hero e MainContent ---
function HomePage() {
  return (
    <>
      <Hero />
      <MainContent />
    </>
  );
}

// --- Página de Login ---
function LoginPage() {
  const { user } = useAuth();
  // Se o usuário já estiver logado, redireciona para a home
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <LoginForm />;
}

// --- Página de Registro ---
function RegisterPage() {
    const { user } = useAuth();
    // Se o usuário já estiver logado, redireciona para a home
    if (user) {
      return <Navigate to="/" replace />;
    }
  return <RegisterForm />;
}


function App() {
  // Pega o 'user' e 'logout' do nosso "cérebro" (AuthContext)
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="App">
        {/* Passamos o 'user' e 'logout' para o Header.
          Agora o Header pode decidir se mostra "Entrar" ou "Bem-vindo, [Nome]" e "Sair"
        */}
        <Header user={user} onLogout={logout} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/piscinas/:id" element={<PiscinaDetalhes />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/contato" element={<Contato />} />

          {/* NOVAS ROTAS DE LOGIN E REGISTRO */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;