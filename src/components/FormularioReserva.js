// frontend/src/components/FormularioReserva.js

import React, { useState } from 'react';
import axios from 'axios'; // Para enviar a reserva para o backend
import './FormularioReserva.css'; // Criaremos este CSS depois

// O componente agora recebe 'telefoneDono' como uma propriedade
function FormularioReserva({ piscina, selectedDates, estimatedPrice, telefoneDono }) {
  // Estados para os campos do formulário
  const [nomeCliente, setNomeCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    setMensagemSucesso(''); // Limpa mensagens anteriores
    setMensagemErro('');

    // Validação básica do formulário
    if (!nomeCliente || !telefoneCliente || !selectedDates || selectedDates.length < 2 || !estimatedPrice) {
      setMensagemErro('Por favor, preencha seu nome e telefone, e selecione as datas no calendário.');
      return;
    }

    // Validação para o telefone do dono (essencial para o WhatsApp)
    if (!telefoneDono) {
      setMensagemErro('O telefone de contato do dono da piscina não está disponível. Por favor, tente outra piscina ou contate o suporte.');
      return;
    }

    const dataInicio = selectedDates[0].toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const dataFim = selectedDates[1].toISOString().split('T')[0]; // Formato YYYY-MM-DD

    // 1. Enviar para o Backend Django (para registrar no banco de dados)
    try {
      const reservaData = {
        piscina: piscina.id, // ID da piscina
        nome_cliente: nomeCliente,
        telefone_cliente: telefoneCliente,
        email_cliente: emailCliente,
        data_inicio: dataInicio,
        data_fim: dataFim,
        valor_total: estimatedPrice,
        status: 'PENDENTE' // Status inicial da reserva
      };
      
      await axios.post('http://127.0.0.1:8000/api/reservas/', reservaData);
      setMensagemSucesso('Sua solicitação de reserva foi registrada! Redirecionando para o WhatsApp...');
      
      // 2. Redirecionar para o WhatsApp
      const mensagemWhatsApp = `Olá, gostaria de alugar a piscina "${piscina.nome}"` +
                               ` de ${selectedDates[0].toLocaleDateString('pt-BR')} até ${selectedDates[1].toLocaleDateString('pt-BR')}.` +
                               ` O valor estimado é R$ ${estimatedPrice.toFixed(2).replace('.', ',')}.` +
                               ` Meu nome é ${nomeCliente} e meu e-mail é ${emailCliente || 'não informado'}.`;
      
      // Usa o telefoneDono recebido via props
      const whatsappURL = `https://wa.me/${telefoneDono}?text=${encodeURIComponent(mensagemWhatsApp)}`;
      
      setTimeout(() => {
        window.open(whatsappURL, '_blank'); // Abre em nova aba
        // Opcional: Limpar formulário após envio
        setNomeCliente('');
        setTelefoneCliente('');
        setEmailCliente('');
      }, 2000); // Pequeno atraso para mostrar a mensagem de sucesso
      
    } catch (error) {
      console.error("Erro ao enviar a reserva:", error.response?.data || error.message);
      setMensagemErro('Ocorreu um erro ao registrar sua reserva. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="formulario-reserva-container">
      <h3>Preencha seus dados para reservar:</h3>
      {mensagemSucesso && <p className="mensagem-sucesso">{mensagemSucesso}</p>}
      {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nomeCliente">Nome Completo:</label>
          <input
            type="text"
            id="nomeCliente"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefoneCliente">Telefone (WhatsApp):</label>
          <input
            type="tel"
            id="telefoneCliente"
            value={telefoneCliente}
            onChange={(e) => setTelefoneCliente(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailCliente">E-mail (Opcional):</label>
          <input
            type="email"
            id="emailCliente"
            value={emailCliente}
            onChange={(e) => setEmailCliente(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-reserva-button">Solicitar Reserva e Chamar no WhatsApp</button>
      </form>
    </div>
  );
}

export default FormularioReserva;