// frontend/src/components/Header.js

import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../assets/2.png'; // Importe sua logo aqui

function Header() {
  // Definindo o nome do site
  const siteName = "AlugaPool"; // Nome do site: AlugaPool (ou o que você preferir!)

return (
  <header className="header">
    <div className="logo-container">
      <img src={logo} alt="Logo AlugaPool" className="logo" />
      <span className="site-name">{siteName}</span>
    </div>
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Início</Link></li> {/* Alterado para Link */}
        <li className="nav-item"><Link to="/piscinas">Explorar Piscinas</Link></li> {/* Criaremos esta rota e componente depois */}
        <li className="nav-item"><Link to="/como-funciona">Como Funciona</Link></li> {/* Alterado para Link */}
        <li className="nav-item"><Link to="/contato">Contato</Link></li> {/* Alterado para Link */}
      </ul>
    </nav>
    <div className="nav-actions">
      <button className="sign-in-button">Entrar</button>
    </div>
  </header>
);
}

export default Header;