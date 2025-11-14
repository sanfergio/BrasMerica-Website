import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import styles from "./BrandsFilter.module.css";

const BrandsFilter = () => {
  const { nomeMarca } = useParams();

  return (
    <div className={styles.outerContainer}>
      <Header />

      <div className={styles.container}>
        <div className={styles.brandHeader}>
          <div className={styles.brandInfo}>
            <h2 className={styles.titulo}>{nomeMarca}</h2>
            <p className={styles.subtitulo}>
              Explore todos os produtos da marca
            </p>
          </div>

          <div className={styles.brandSearch}>
            <input
              type="text"
              placeholder={`Buscar produtos da ${nomeMarca}...`}
              className={styles.inputSearch}
            />
            <button className={styles.btnSearch} disabled>
              🔍
            </button>
          </div>
        </div>

        <div className={styles.gridProdutos}>
          <ProductCard company_name={[nomeMarca.charAt(0).toUpperCase() + nomeMarca.slice(1).toLowerCase()]} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrandsFilter;
