// frontend/src/components/MainContent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // <-- ADICIONE ESTA LINHA
import './MainContent.css';

function MainContent() {
  const [piscinas, setPiscinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPiscinas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/piscinas/');
        setPiscinas(response.data);
      } catch (err) {
        console.error("Erro ao buscar piscinas:", err);
        setError("Não foi possível carregar as piscinas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPiscinas();
  }, []);

  if (loading) {
    return (
      <main className="main-content">
        <p>Carregando piscinas...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <p style={{ color: 'red' }}>Erro: {error}</p>
      </main>
    );
  }

  return (
    <main className="main-content">
      <h2>Explore Nossas Piscinas</h2>
      <p>Descubra uma variedade de piscinas incríveis para momentos de lazer inesquecíveis.</p>

      <div className="piscinas-list">
        {piscinas.length > 0 ? (
          piscinas.map(piscina => (
            <div key={piscina.id} className="piscina-card">
              {/* Se você tiver fotos, pode renderizá-las aqui */}
              {piscina.foto_principal && (
                <img
                  src={piscina.foto_principal} // <--- A LINHA QUE MUDOU AQUI!
                  alt={piscina.nome}
                  className="piscina-card-image"
                />
              )}
              <div className="piscina-card-info">
                <h3>{piscina.nome}</h3>
                <p>{piscina.descricao.substring(0, 100)}...</p> {/* Mostra só um pedaço da descrição */}
                <p>Capacidade: {piscina.capacidade_pessoas} pessoas</p>
                <p className="preco">Preço Fim de Semana: <span>R$ {parseFloat(piscina.preco_fim_semana).toFixed(2).replace('.', ',')}</span></p>
                <Link to={`/piscinas/${piscina.id}`} className="ver-detalhes-button">
  Ver Detalhes
</Link>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma piscina encontrada. Adicione algumas no Django Admin!</p>
        )}
      </div>
    </main>
  );
}

export default MainContent;