// src/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('LOCATARIO');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            username: username,
            password: password,
            email: email,
            first_name: firstName,
            last_name: lastName,
            tipo_usuario: tipoUsuario
        };
        try {
            await axios.post('http://127.0.0.1:8000/api/auth/register/', userData);
            alert('Cadastro realizado com sucesso! Você já pode fazer login.');
            setUsername(''); setPassword(''); setEmail(''); setFirstName(''); setLastName('');
        } catch (error) {
            console.error('Erro ao registrar:', error.response.data);
            alert('Erro ao cadastrar: ' + JSON.stringify(error.response.data));
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Formulário de Cadastro</h2>
            <form onSubmit={handleSubmit}>
                <div><label>Usuário (login):</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0' }}/></div>
                <div><label>Senha:</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0' }}/></div>
                <div><label>Email:</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0' }}/></div>
                <div><label>Nome:</label><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0' }}/></div>
                <div><label>Sobrenome:</label><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '5px 0' }}/></div>
                <div><label>Eu quero me cadastrar como:</label><select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0' }}><option value="LOCATARIO">Locatário (quero alugar piscinas)</option><option value="PROPRIETARIO">Proprietário (quero cadastrar minha piscina)</option></select></div>
                <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '15px' }}>Cadastrar</button>
            </form>
        </div>
    );
}