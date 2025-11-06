// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './AuthContext'; // 1. IMPORTAR O PROVEDOR
import App from './App';
import './index.css'; // (você provavelmente tem isso)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* 2. ENVOLVER O APP COM ELE */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);