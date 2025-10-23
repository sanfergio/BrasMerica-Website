import React from 'react';
import './NavBar.css';
// Os ícones do Font Awesome (fa) podem ser usados, mas como você está usando <img>,
// vou manter os imports apenas como referência, pois não estão sendo usados
// no JSX do código original com <img>.
// Caso queira usar os ícones do Font Awesome no futuro, basta substituir o <img>
// pelo componente correspondente (ex: <FaMotorcycle />).
import {
    FaMotorcycle,
    FaDotCircle,
    FaTools,
    FaCogs,
    FaOilCan
} from 'react-icons/fa';


const navItems = [
    {
        name: "Acessórios",
        iconUrl: 'https://media-public.canva.com/iw3Rg/MAB1V5iw3Rg/2/t.png',
        href: '/categorias?categoria=acessorios'
    },
    {
        name: "Pneus",
        iconUrl: 'https://media-public.canva.com/xteHI/MAEqsFxteHI/1/t.png',
        href: '/categorias?categoria=pneus'
    },
    {
        name: "Peças",
        iconUrl: 'https://media-public.canva.com/71OSg/MAFcf371OSg/1/t.png',
        href: '/categorias?categoria=pecas'
    },
    {
        name: "Óleos",
        iconUrl: 'https://media-public.canva.com/kEKFs/MAFcf6kEKFs/1/t.png',
        href: '/categorias?categoria=oleos'
    }
    // Adicione ou edite itens aqui para atualizar o NavBar automaticamente
];


function NavBar() {
    return (
        <nav>
            {navItems.map((item) => (
                <a key={item.name} className="card-navbar" href={item.href}>
                    <img src={item.iconUrl} alt={`Ícone da categoria ${item.name}`} />
                    <span>{item.name}</span>
                </a>
            ))}
        </nav>
    );
}

export default NavBar;