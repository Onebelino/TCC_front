// frontend/src/components/PiscinaDetalhes.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FormularioReserva from './FormularioReserva';
import FormularioAvaliacao from './FormularioAvaliacao';
import './PiscinaDetalhes.css';

function PiscinaDetalhes() {
  const { id } = useParams();
  const [piscina, setPiscina] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [date, setDate] = useState(new Date()); // Estado interno do calendário (data atualmente visível)
  const [unavailableDates, setUnavailableDates] = useState([]); // Datas já reservadas/bloqueadas
  const [selectedDates, setSelectedDates] = useState(null); // Faixa de datas selecionada pelo usuário
  const [estimatedPrice, setEstimatedPrice] = useState(0); // Valor total para as datas selecionadas
  const [avaliacoes, setAvaliacoes] = useState([]); // NOVO ESTADO: Armazena as avaliações

  useEffect(() => {
    const fetchPiscina = async () => {
      try {
        // Busca os detalhes da piscina
        const response = await axios.get(`http://127.0.0.1:8000/api/piscinas/${id}/`);
        setPiscina(response.data);

        // Busca as reservas para esta piscina
        const reservasResponse = await axios.get(`http://127.0.0.1:8000/api/reservas/?piscina=${id}`);
        const reservedDates = [];
        reservasResponse.data.forEach(reserva => {
          // AQUI: Somente considera reservas ATIVAS (PENDENTE ou CONFIRMADA) como indisponíveis
          if (reserva.status === 'PENDENTE' || reserva.status === 'CONFIRMADA') {
            let currentDate = new Date(reserva.data_inicio);
            let endDate = new Date(reserva.data_fim);
            while (currentDate <= endDate) {
              reservedDates.push(currentDate.toDateString());
              currentDate.setDate(currentDate.getDate() + 1);
            }
          }
        });
        setUnavailableDates(reservedDates);

        // NOVO: Busca as avaliações para esta piscina
        const avaliacoesResponse = await axios.get(`http://127.0.0.1:8000/api/avaliacoes/?piscina=${id}`);
        setAvaliacoes(avaliacoesResponse.data); // Armazena as avaliações no estado

      } catch (err) {
        console.error("Erro ao buscar detalhes da piscina, reservas ou avaliações:", err);
        setError("Não foi possível carregar os detalhes, a disponibilidade ou as avaliações da piscina.");
      } finally {
        setLoading(false);
      }
    };

    fetchPiscina();
  }, [id]);

  // Função para desabilitar datas no calendário
  const isDateUnavailable = ({ date, view }) => {
    if (view === 'month') {
      // Desabilitar datas passadas
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      if (date < today) {
        return true;
      }
      // Desabilitar datas que estão na lista de indisponíveis
      return unavailableDates.includes(date.toDateString());
    }
    return false;
  };

  // Função que lida com a seleção de datas no calendário e calcula o preço
  const handleDateChange = (value) => {
    setDate(value); // Atualiza o estado interno do calendário
    let startDate, endDate;
    if (Array.isArray(value) && value.length === 2) {
      startDate = value[0];
      endDate = value[1];
    } else {
      startDate = value;
      endDate = value;
    }
    setSelectedDates([startDate, endDate]); // Armazena a faixa de datas selecionada

    // LÓGICA DE CÁLCULO DE PREÇO
    if (piscina && startDate && endDate) {
      let total = 0;
      let currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay(); // 0 = Domingo, 6 = Sábado
        if (dayOfWeek === 0 || dayOfWeek === 6) { // Fim de semana
          total += parseFloat(piscina.preco_fim_semana);
        } else { // Dia útil
          total += parseFloat(piscina.preco_dia_util);
        }
        currentDate.setDate(currentDate.getDate() + 1); // Avança para o próximo dia
      }
      setEstimatedPrice(total);
    } else {
      setEstimatedPrice(0);
    }
  };

  if (loading) {
    return <div className="piscina-detalhes-container">Carregando detalhes da piscina...</div>;
  }

  if (error) {
    return <div className="piscina-detalhes-container" style={{ color: 'red' }}>Erro: {error}</div>;
  }

  if (!piscina) {
    return <div className="piscina-detalhes-container">Piscina não encontrada.</div>;
  }

  return (
    <div className="piscina-detalhes-container">
      <div className="piscina-detalhes-header">
        {piscina.foto_principal && (
          <img
            src={piscina.foto_principal}
            alt={piscina.nome}
            className="piscina-detalhes-imagem-principal"
          />
        )}
        <h1>{piscina.nome}</h1>
        <p className="preco-detalhes">Preço Fim de Semana: <span>R$ {parseFloat(piscina.preco_fim_semana).toFixed(2).replace('.', ',')}</span></p>
      </div>

      {piscina.fotos && piscina.fotos.length > 0 && (
        <div className="piscina-galeria">
          <h2>Galeria de Fotos</h2>
          <div className="galeria-grid">
            {piscina.fotos.map(foto => (
              <img
                key={foto.id}
                src={foto.imagem}
                alt={foto.descricao || `Foto de ${piscina.nome}`}
                className="galeria-imagem"
              />
            ))}
          </div>
        </div>
      )}

      <div className="piscina-detalhes-info">
        <h2>Sobre a Piscina</h2>
        <p>{piscina.descricao}</p>
        <p><strong>Capacidade:</strong> {piscina.capacidade_pessoas} pessoas</p>
        <p><strong>Endereço:</strong> {piscina.endereco}</p>
        {piscina.caracteristicas_adicionais && (
          <p><strong>Características Adicionais:</strong> {piscina.caracteristicas_adicionais}</p>
        )}
        {piscina.regras_uso && (
          <p><strong>Regras de Uso:</strong> {piscina.regras_uso}</p>
        )}
        
        {/* Este botão foi escondido, pois o formulário de reserva terá seu próprio botão de ação */}
        <button className="alugar-button" style={{ display: 'none' }}>Alugar esta piscina</button> 

        {/* === SEÇÃO DE AVALIAÇÕES === */}
              <div className="piscina-avaliacoes">
        <h2>Avaliações dos Usuários ({avaliacoes.length})</h2>
        {avaliacoes.length === 0 ? (
          <p>Esta piscina ainda não possui avaliações. Seja o primeiro a avaliar!</p>
        ) : (
          <div className="lista-avaliacoes">
            {avaliacoes.map(avaliacao => (
              <div key={avaliacao.id} className="avaliacao-item">
                <p className="avaliacao-nota">Nota: ⭐ {avaliacao.nota.toFixed(1)}</p>
                <p className="avaliacao-comentario">"{avaliacao.comentario}"</p>
                <p className="avaliacao-autor">- {avaliacao.nome_avaliador} em {new Date(avaliacao.data_avaliacao).toLocaleDateString('pt-BR')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* =========================== */}

      {/* === NOVO: FORMULÁRIO DE AVALIAÇÃO === */}
      <FormularioAvaliacao 
          piscinaId={piscina.id} 
          onNewAvaliacao={(newAvaliacao) => setAvaliacoes([...avaliacoes, newAvaliacao])} 
      />
      {/* ================================== */}

        <div className="piscina-disponibilidade">
          <h2>Verificar Disponibilidade</h2>
          <Calendar
            onChange={handleDateChange}
            value={date}
            selectRange={true}
            tileDisabled={isDateUnavailable}
          />
          {selectedDates && (
            <div className="selected-dates-info">
              {Array.isArray(selectedDates) && selectedDates[0] && selectedDates[1] ? (
                <p>Você selecionou de: <strong>{selectedDates[0].toLocaleDateString('pt-BR')}</strong> até: <strong>{selectedDates[1].toLocaleDateString('pt-BR')}</strong></p>
              ) : (
                <p>Você selecionou: <strong>{selectedDates && selectedDates[0] && selectedDates[0].toLocaleDateString('pt-BR')}</strong></p>
              )}
              {estimatedPrice > 0 && (
                <p>Valor estimado: <span>R$ {estimatedPrice.toFixed(2).replace('.', ',')}</span></p>
              )}
            </div>
          )}
        </div>

        {/* FORMULÁRIO DE RESERVA APARECE AQUI APÓS SELEÇÃO DE DATAS */}
        {selectedDates && estimatedPrice > 0 && piscina && (
            <FormularioReserva 
                piscina={piscina} 
                selectedDates={selectedDates} 
                estimatedPrice={estimatedPrice}
                telefoneDono={piscina.telefone_contato}
            />
        )}
        {/* FIM DO FORMULÁRIO DE RESERVA */}

      </div>
    </div>
  );
}

export default PiscinaDetalhes;