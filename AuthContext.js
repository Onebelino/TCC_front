// src/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// URL base da sua API Django
const API_URL = 'http://127.0.0.1:8000/api/auth/';

// 1. Criar o Contexto
const AuthContext = createContext();

// 2. Criar o Provedor (o "cérebro" que gerencia tudo)
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Armazena os dados do usuário (id, nome, tipo)
    const [token, setToken] = useState(null); // Armazena o Token

    // --- A FUNÇÃO DE LOGIN ---
    // Esta é a lógica de 2 etapas que discutimos
    const login = async (username, password) => {
        try {
            // Etapa 1: Fazer login para pegar o Token
            const loginResponse = await axios.post(API_URL + 'login/', {
                username: username,
                password: password,
            });

            const userToken = loginResponse.data.token;
            setToken(userToken);

            // Configura o axios para enviar o Token em TODAS as futuras requisições
            axios.defaults.headers.common['Authorization'] = `Token ${userToken}`;

            // Etapa 2: Usar o Token para buscar os dados do usuário (o /me/)
            const userResponse = await axios.get(API_URL + 'me/');
            
            setUser(userResponse.data); // Salva os dados (id, username, profile.tipo_usuario)
            
            alert(`Login bem-sucedido! Bem-vindo, ${userResponse.data.first_name}`);
            return true;

        } catch (error) {
            console.error('Erro no login:', error.response?.data || error.message);
            alert('Erro no login: ' + (error.response?.data.non_field_errors || 'Verifique seu usuário e senha.'));
            return false;
        }
    };

    // --- A FUNÇÃO DE LOGOUT ---
    const logout = () => {
        setUser(null);
        setToken(null);
        // Remove o Token dos cabeçalhos do axios
        delete axios.defaults.headers.common['Authorization'];
        alert('Você saiu.');
    };

    // 3. Compartilhar os dados e funções com o resto do app
    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// 4. Hook customizado para facilitar o uso em outros componentes
export const useAuth = () => {
    return useContext(AuthContext);
};