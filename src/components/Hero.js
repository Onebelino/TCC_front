import React from 'react';
import './Hero.css'; // Criaremos este arquivo CSS depois
import heroImage from '../assets/hero-pool.jpg'; // Importe sua imagem aqui (crie a pasta 'assets' em 'src')

function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
        <h1 className="hero-title">Alugue uma Piscina</h1>
        <p className="hero-subtitle">Encontre piscinas incríveis disponíveis para aluguel em [sua cidade/região]</p>
        <button className="hero-button">Ver Piscinas</button>
      </div>
    </section>
  );
}

export default Hero;