// src/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// URL base da sua API Django
const API_URL = 'http://127.0.0.1:8000/api/auth/';

// 1. Criar o Contexto
const AuthContext = createContext();

// 2. Criar o Provedor
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // --- A FUNÇÃO DE LOGIN (VERSÃO NOVA E MELHORADA) ---
    const login = async (username, password) => {
        
        let userToken; // Vamos salvar o token aqui

        // --- ETAPA 1: Tentar fazer o login e pegar o Token ---
        try {
            const loginResponse = await axios.post(API_URL + 'login/', {
                username: username,
                password: password,
            });

            // Se chegamos aqui, o login SUCEDEU (status 200)
            userToken = loginResponse.data.token;
            setToken(userToken);

            // Configura o axios para enviar o Token em TODAS as futuras requisições
            axios.defaults.headers.common['Authorization'] = `Token ${userToken}`;

        } catch (error) {
            // Se o login (Etapa 1) falhar (ex: erro 400)
            console.error('Erro na Etapa 1 (Login):', error.response?.data);
            
            // Pega a mensagem de erro específica do Django
            const errorMessage = error.response?.data?.non_field_errors?.[0] || 'Usuário ou senha inválidos.';
            alert(`Erro no login: ${errorMessage}`);
            
            // Para a execução
            return false;
        }

        // --- ETAPA 2: Se a Etapa 1 funcionou, buscar os dados do usuário ---
        if (userToken) {
            try {
                const userResponse = await axios.get(API_URL + 'me/');
                
                // Se chegamos aqui, a Etapa 2 SUCEDEU
                setUser(userResponse.data); // Salva os dados (id, username, profile.tipo_usuario)
                
                alert(`Login bem-sucedido! Bem-vindo, ${userResponse.data.first_name}`);
                return true;

            } catch (error) {
                // Se a Etapa 2 falhar (ex: Token inválido, que não deve acontecer)
                console.error('Erro na Etapa 2 (Buscar /me/):', error.response?.data);
                alert('Erro ao buscar dados do usuário: ' + (error.response?.data?.detail || 'Tente novamente.'));
                
                // Limpa o token "ruim"
                logout();
                return false;
            }
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