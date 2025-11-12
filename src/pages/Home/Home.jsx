import Footer from '../../components/Footer/Footer.jsx';
import '../../App.css';
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { FaMotorcycle, FaCampground } from "react-icons/fa";
import NavBar from '../../components/Navbar/NavBar.jsx';
import Categories from '../../components/Categorias/Categorias.jsx';
import Carousel from '../../components/Carousel/Carousel.jsx';
import styles from './Home.module.css';
import HomeButton from '../../components/HomeButton.jsx';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header.jsx';
import WhatsAppButton from '../../components/WhatsappButton.jsx';
import AllProductsList from '../../components/AllProductsList/AllProductsList.jsx';

function Home() {
    return (
        <>
            {/* Cabeçalho principal do site */}
            <Header />
            <WhatsAppButton />
            <HomeButton />
            <NavBar />

            {/* Conteúdo principal da página */}
            <main className={styles.main} role="main" aria-label="Página inicial da BrasMérica Moto Peças">
                
                {/* Carrossel principal */}
                <section className={styles.carousel} aria-label="Carrossel de destaques">
                    <Carousel />
                </section>

                {/* Seção da marca */}
                <section className={styles.brandSection} aria-label="Apresentação da marca BrasMérica">
                    <h1 className={styles.brandTitle} title="BrasMérica Moto Peças">
                        <span className={styles.brandPartGreen}>BRAS</span>
                        <span className={styles.brandPartGradient}>MÉRICA</span>
                        <FaMotorcycle aria-hidden="true" />
                    </h1>

                    <h2 className={styles.sloganSubtitle}>
                        O maior estoque atacadista, agora na sua garagem.
                    </h2>
                </section>

                {/* Novidades */}
                <section aria-labelledby="novidades-titulo">
                    <h3 id="novidades-titulo" style={{ color: '#b22234', fontSize: '25px' }}>
                        NOSSAS NOVIDADES
                    </h3>
                    <div className={styles.productCards}>
                        <ProductCard orderBy="id" limit={8} orderDirection="desc" />
                    </div>
                </section>

                {/* Marca de confiança */}
                <section aria-labelledby="marca-confianca-titulo">
                    <h3 id="marca-confianca-titulo" style={{ color: '#b22234', fontSize: '25px', textAlign: 'center' }}>
                        SUA MARCA DE CONFIANÇA
                    </h3>
                    <div className={styles.trustSection}>
                        <figure className={styles.trustItem}>
                            <img 
                                src="https://powersports.honda.com/motorcycle/standard/-/media/products/family/scl500/hero-banner/desktop/2025/2025-scl500-hero-banner-1920x930.jpg"
                                alt="Motocicleta Honda representando qualidade e desempenho"
                                title="Motocicleta Honda SCL500 - símbolo de qualidade"
                            />
                        </figure>
                        <figure className={styles.trustItem}>
                            <img 
                                src="https://mir-s3-cdn-cf.behance.net/projects/404/421919187810179.Y3JvcCwxMDgwLDg0NCwwLDI1MQ.jpg"
                                alt="Equipe mecânica trabalhando em oficina representando confiança"
                                title="Equipe profissional - Confiança e qualidade no atendimento"
                            />
                        </figure>
                        <figure className={styles.trustItem}>
                            <img 
                                src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQobQl6LdbndEjaAc31LtZejeNl9oBkv4vH0uGgXkTCRo9SGxP8"
                                alt="Peças e componentes de motos organizados em prateleira"
                                title="Estoque de peças de alta qualidade"
                            />
                        </figure>
                    </div>
                </section>

                {/* Categorias */}
                <section aria-labelledby="categorias-titulo">
                    <h3 id="categorias-titulo" style={{ color: '#b22234', fontSize: '25px', textAlign: 'center' }}>
                        CATEGORIAS DISPONÍVEIS
                    </h3>
                    <div className="categories-section">
                        <Categories />
                    </div>
                </section>

                {/* Mais vendidos */}
                <section aria-labelledby="mais-vendidos-titulo">
                    <h3 id="mais-vendidos-titulo" style={{ color: '#b22234', fontSize: '25px' }}>
                        MAIS VENDIDOS
                    </h3>
                    <div className={styles.productCards}>
                        <ProductCard limit={8} orderBy="unitssold" orderDirection="desc" />
                    </div>
                </section>

                {/* Banners promocionais */}
                <section className={styles.bannerSection} aria-label="Banners promocionais">
                    <img 
                        src="https://paulinhomotos.fbitsstatic.net/img/b/a1c5be88-d5f1-41b2-bc3d-9a3f715ba844.jpg" 
                        alt="Banner promocional de produtos Honda" 
                        title="Promoções de peças Honda" 
                    />
                    <img 
                        src="https://paulinhomotos.fbitsstatic.net/img/b/e45e2155-1f7a-4069-91b2-409ad5eeeb8f.jpg" 
                        alt="Banner de acessórios e equipamentos de motos"
                        title="Acessórios e equipamentos - Linha completa"
                    />
                </section>
            </main>

            {/* Listagem de todos os produtos */}
            <AllProductsList />

            {/* Rodapé */}
            <Footer />
        </>
    );
}

export default Home;
