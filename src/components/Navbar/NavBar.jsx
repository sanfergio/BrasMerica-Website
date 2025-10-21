import React from 'react';
import './NavBar.css';
// Importando os ícones desejados do Font Awesome (fa)
import {
    FaMotorcycle,
    FaDotCircle,
    FaTools,
    FaCogs,
    FaOilCan
} from 'react-icons/fa';

function NavBar() {
    return (
        <nav>
            <a className="card-navbar" href='#'>
                {/* Ícone adicionado */}
                <img src='https://media-public.canva.com/iw3Rg/MAB1V5iw3Rg/2/t.png' />
                <span>Acessórios</span>
            </a>
            <a className="card-navbar" href='#'>
                {/* Ícone adicionado */}
                <img src='https://media-public.canva.com/xteHI/MAEqsFxteHI/1/t.png' />
                <span>Pneus</span>
            </a>
            <a className="card-navbar" href='#'>
                {/* Ícone adicionado */}
                <img src='https://media-public.canva.com/71OSg/MAFcf371OSg/1/t.png' />
                <span>Peças</span>
            </a>
            <a className="card-navbar" href='#'>
                {/* Ícone adicionado */}
                <img src='https://media-public.canva.com/kEKFs/MAFcf6kEKFs/1/t.png' />
                <span>Óleos</span>
            </a>
        </nav>
    );
}

export default NavBar;