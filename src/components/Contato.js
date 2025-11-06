// frontend/src/components/Contato.js

import React from 'react';
import './PaginaEstatica.css'; // Usaremos o mesmo CSS genérico

function Contato() {
  return (
    <div className="pagina-estatica-container">
      <h1>Entre em Contato Conosco</h1>
      <p>Se você tiver alguma dúvida, sugestão ou precisar de suporte, entre em contato conosco pelos canais abaixo:</p>

      <section className="secao-info">
        <h2>Suporte ao Cliente</h2>
        <p><strong>E-mail:</strong> <a href="mailto:contato@alugapool.com.br">contato@alugapool.com.br</a></p>
        <p><strong>Telefone:</strong> +55 (XX) YYYYY-ZZZZ</p> {/* Substitua por um telefone real, se tiver */}
        <p>Nosso horário de atendimento é de Segunda a Sexta, das 9h às 18h.</p>
      </section>

      <section className="secao-info">
        <h2>Para Proprietários de Piscinas</h2>
        <p>Se você tem uma piscina e deseja alugá-la através do AlugaPool, <a href="mailto:proprietarios@alugapool.com.br">clique aqui para nos enviar um e-mail</a> e saiba como se cadastrar.</p>
      </section>

      <section className="secao-info">
        <h2>Redes Sociais</h2>
        <p>Siga-nos nas redes sociais para ficar por dentro das novidades e promoções!</p>
        <p>
          <a href="https://facebook.com/alugapool" target="_blank" rel="noopener noreferrer">Facebook</a> |
          <a href="https://instagram.com/alugapool" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </p>
      </section>
    </div>
  );
}

export default Contato;