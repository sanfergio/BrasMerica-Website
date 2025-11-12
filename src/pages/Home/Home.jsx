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
import AllProductsList from '../../components/AllProductsList/AllProductsList.jsx'

function Home() {
    return (
        <>
            <Header />
            <WhatsAppButton />
            <HomeButton />
            <NavBar />
            <main className={styles.main}>
                <div className={styles.carousel}>
                    <Carousel />
                </div>
                <div className={styles.brandSection}>
                    {/* H1 - Apenas o nome da marca */}
                    <h1 className={styles.brandTitle}>
                        {/* "BRAS" em verde sólido */}
                        <span className={styles.brandPartGreen}>
                            BRAS
                        </span>

                        {/* "MÉRICA" com o gradiente */}
                        <span className={styles.brandPartGradient}>
                            MÉRICA
                        </span>
                        <FaMotorcycle />
                    </h1>

                    {/* H2 - O Slogan (Subtítulo) */}
                    <h2 className={styles.sloganSubtitle}>
                        O maior estoque atacadista, agora na sua garagem.
                    </h2>
                </div>
                <h3 style={{ color: '#b22234', fontSize: '25px' }}>NOSSAS NOVIDADES</h3>
                <div className={styles.productCards}>
                    <ProductCard orderBy="id" limit={8} orderDirection="desc" />
                </div>
                <h3 style={{ color: '#b22234', fontSize: '25px', textAlign: 'center' }}>SUA MARCA DE CONFIANÇA</h3>
                <div className={styles.trustSection}>
                    <div className={styles.trustItem}>
                        <img src="https://powersports.honda.com/motorcycle/standard/-/media/products/family/scl500/hero-banner/desktop/2025/2025-scl500-hero-banner-1920x930.jpg" alt="Qualidade" />
                    </div>
                    <div className={styles.trustItem}>
                        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/421919187810179.Y3JvcCwxMDgwLDg0NCwwLDI1MQ.jpg" alt="Qualidade" />
                    </div>
                    <div className={styles.trustItem}>
                        <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQobQl6LdbndEjaAc31LtZejeNl9oBkv4vH0uGgXkTCRo9SGxP8" alt="Qualidade" />
                    </div>
                </div>
                <h3 style={{ color: '#b22234', fontSize: '25px', textAlign: 'center' }}>CATEGORIAS DISPONÍVEIS</h3>
                <div className="categories-section">
                    <Categories />
                </div>
                <h3 style={{ color: '#b22234', fontSize: '25px' }}>MAIS VENDIDOS</h3>
                <div className={styles.productCards}><ProductCard limit={8} orderBy="unitssold" orderDirection="desc" /></div>
                <div className={styles.bannerSection}>
                    <img src="https://paulinhomotos.fbitsstatic.net/img/b/a1c5be88-d5f1-41b2-bc3d-9a3f715ba844.jpg" alt="Banner 1" />
                    <img src="https://paulinhomotos.fbitsstatic.net/img/b/e45e2155-1f7a-4069-91b2-409ad5eeeb8f.jpg" alt="Banner 2" />
                </div>
            </main>
            <AllProductsList />
            <Footer />
        </>
    )
}

export default Home