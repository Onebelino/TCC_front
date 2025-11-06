// frontend/src/components/Header.js
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../assets/2.png';

function Header({ user, onLogout }) {
  const siteName = "AlugaPool";

  const getTipoUsuario = () => {
    if (!user || !user.profile) return '';
    return user.profile.tipo_usuario === 'PROPRIETARIO' ? 'Proprietário' : 'Locatário';
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo AlugaPool" className="logo" />
        <span className="site-name">{siteName}</span>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/">Início</Link></li>
          <li className="nav-item"><Link to="/piscinas">Explorar Piscinas</Link></li>
          <li className="nav-item"><Link to="/como-funciona">Como Funciona</Link></li>
          <li className="nav-item"><Link to="/contato">Contato</Link></li>
        </ul>
      </nav>
      <div className="nav-actions">
        {user ? (
          <div className="user-info">
            <span className="welcome-message">
              Olá, {user.first_name} ({getTipoUsuario()})
            </span>
            <button onClick={onLogout} className="sign-in-button">Sair</button>
          </div>
        ) : (
          <>
            <Link to="/login" className="sign-in-button">Entrar</Link>
            <Link to="/register" className="sign-in-button register-button">Registrar-se</Link>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;