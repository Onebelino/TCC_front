// frontend/src/components/ComoFunciona.js

import React from 'react';
import './PaginaEstatica.css'; // Usaremos um CSS genérico para páginas estáticas

function ComoFunciona() {
  return (
    <div className="pagina-estatica-container">
      <h1>Como Funciona o AlugaPool</h1>
      <section className="secao-info">
        <h2>1. Explore Nossas Piscinas</h2>
        <p>Navegue pela nossa lista de piscinas incríveis. Use os filtros para encontrar a piscina perfeita perto de você, com as características e capacidade que você precisa.</p>
        <p>Cada piscina possui uma página de detalhes com fotos, descrição, regras de uso e preços.</p>
      </section>

      <section className="secao-info">
        <h2>2. Verifique a Disponibilidade e Preço</h2>
        <p>Na página de detalhes de cada piscina, você encontrará um calendário interativo. Selecione as datas desejadas para o seu aluguel.</p>
        <p>O sistema calculará automaticamente o valor estimado da sua reserva, considerando dias úteis e fins de semana.</p>
      </section>

      <section className="secao-info">
        <h2>3. Solicite sua Reserva via WhatsApp</h2>
        <p>Após selecionar as datas e verificar o valor, preencha o formulário de reserva com seus dados básicos.</p>
        <p>Ao clicar em "Solicitar Reserva", uma mensagem pré-preenchida será gerada e você será redirecionado para o WhatsApp do proprietário da piscina para finalizar os detalhes e o pagamento.</p>
      </section>

      <section className="secao-info">
        <h2>4. Aproveite seu Lazer!</h2>
        <p>Uma vez que o proprietário confirmar sua reserva, tudo estará pronto para você e seus convidados aproveitarem um dia (ou mais!) de sol e diversão em uma piscina exclusiva!</p>
      </section>
    </div>
  );
}

export default ComoFunciona;