import React, { useState } from "react";
import styles from "./InputSearch.module.css";
import { FaSearch } from "react-icons/fa";
import { mockProducts } from "../../mocks/products";

export default function InputSearch() {
  const [termo, setTermo] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleChange = (e) => {
    const valor = e.target.value;
    setTermo(valor);

    if (valor.trim() === "") {
      setResultados([]);
    } else {
      const filtrados = mockProducts.filter((produto) =>
        produto.productName.toLowerCase().includes(valor.toLowerCase())
      );
      setResultados(filtrados);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputSearch}>
        <input
          type="text"
          value={termo}
          onChange={handleChange}
          placeholder="O que você procura?"
        />
        <FaSearch className={styles.searchIcon} />
      </div>

      {resultados.length > 0 && (
        <div className={styles.resultados}>
          {resultados.map((produto) => (
            <div key={produto.id} className={styles.resultadoItem}>
              <img
                src={produto.productImage}
                alt={produto.productName}
                className={styles.imagemProduto}
              />
              <div className={styles.infoProduto}>
                <p className={styles.nomeProduto}>{produto.productName}</p>
                <p className={styles.precoProduto}>R$ {produto.productPrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
