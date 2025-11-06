// frontend/src/components/FormularioAvaliacao.js

import React, { useState } from 'react';
import axios from 'axios';
import './FormularioAvaliacao.css'; // Criaremos este CSS depois

function FormularioAvaliacao({ piscinaId, onNewAvaliacao }) {
  // Estados para os campos do formulário
  const [nomeAvaliador, setNomeAvaliador] = useState('');
  const [nota, setNota] = useState(5); // Valor padrão da nota
  const [comentario, setComentario] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Para desabilitar o botão enquanto envia

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemSucesso('');
    setMensagemErro('');
    setIsSubmitting(true);

    // Validação básica
    if (!nomeAvaliador || !nota) {
      setMensagemErro('Por favor, preencha seu nome e a nota.');
      setIsSubmitting(false);
      return;
    }
    if (nota < 1 || nota > 5) {
      setMensagemErro('A nota deve ser entre 1 e 5.');
      setIsSubmitting(false);
      return;
    }

    try {
      const avaliacaoData = {
        piscina: piscinaId, // ID da piscina sendo avaliada
        nome_avaliador: nomeAvaliador,
        nota: parseInt(nota), // Garante que a nota seja um número inteiro
        comentario: comentario,
      };

      const response = await axios.post('http://127.0.0.1:8000/api/avaliacoes/', avaliacaoData);
      setMensagemSucesso('Sua avaliação foi enviada com sucesso! Ela aparecerá após aprovação.');

      // Limpa o formulário
      setNomeAvaliador('');
      setNota(5);
      setComentario('');

      // Chama a função passada pelo pai para atualizar a lista de avaliações
      // Poderíamos adicionar a nova avaliação à lista diretamente, ou pedir para recarregar tudo
      if (onNewAvaliacao) {
        onNewAvaliacao(response.data); // Passa a nova avaliação para o componente pai
      }

    } catch (error) {
      console.error("Erro ao enviar avaliação:", error.response?.data || error.message);
      setMensagemErro('Ocorreu um erro ao enviar sua avaliação. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="formulario-avaliacao-container">
      <h3>Deixe sua Avaliação</h3>
      {mensagemSucesso && <p className="mensagem-sucesso">{mensagemSucesso}</p>}
      {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nomeAvaliador">Seu Nome:</label>
          <input
            type="text"
            id="nomeAvaliador"
            value={nomeAvaliador}
            onChange={(e) => setNomeAvaliador(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nota">Nota (1-5 Estrelas):</label>
          <input
            type="number"
            id="nota"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comentario">Comentário (Opcional):</label>
          <textarea
            id="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows="4"
          ></textarea>
        </div>
        <button type="submit" className="submit-avaliacao-button" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
        </button>
      </form>
    </div>
  );
}

export default FormularioAvaliacao;