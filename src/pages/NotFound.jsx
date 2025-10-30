// src/pages/NotFound/NotFound.jsx
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Opcional, para um link de volta

function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px', color: 'black' }}>
            <h1>Oops! 404</h1>
            <p>A página que você está procurando não foi encontrada.</p>
            <Link to="/">Voltar para a página inicial</Link>
        </div>
    );
}

export default NotFound;