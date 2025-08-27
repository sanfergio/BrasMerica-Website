import './Header.css'
import { FaMapMarkerAlt, FaUser, FaShoppingCart, FaSearch, FaHamburger, FaBars } from 'react-icons/fa';


function Header() {

    function toggleMenu() {}

    function toggleCart() {
        alert('Clicou no carrinho')
    }    

    return (
        <>
            <div className='blackHeader'></div>
            <div className='redHeader'></div>
            <header>
                <div className='imgHeader'>
                    <div><FaBars className='icon' /></div>
                    <img src="./public/images/logo-sem-fundo-border.png" alt="Logo Brasmerica" />
                    <div><FaShoppingCart className='icon'/></div>
                    </div>  
                <div className='inputSearch'>
                    <input type="text" placeholder='O quê você procura?' />
                    <FaSearch className='searchIcon' />
                </div>
                <div className='userActions'>
                    <div className="locationIcon">
                        <FaMapMarkerAlt />
                        <p>CONHEÇA <br /> <a>NOSSA LOJA</a></p>
                    </div>

                    <div className="userIcon">
                        <FaUser />
                        <p>OLÁ VISITANTE,<br /> <a>ENTRE</a> OU <a>CADASTRE-SE</a></p>
                    </div>

                    <div className="cartIcon">
                        <FaShoppingCart/>
                    </div>

                </div>
            </header>
        </>
    )
}

export default Header