import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SupabaseClient from "../KEYS/App.jsx";
import styles from "./RelatedProducts.module.css";

const RelatedProducts = ({ company_name, category, currentProductId }) => {
  const [produtos, setProdutos] = useState([]);
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 250;
      carouselRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchProdutosRelacionados = async () => {
      try {
        let query = SupabaseClient
          .from("DBproducts")
          .select("*")
          .eq("disponible", 0)
          .limit(10);

        if (company_name) query = query.ilike("company_name", `%${company_name}%`);
        if (category) query = query.ilike("category", `%${category}%`);

        const { data, error } = await query;
        if (error) throw error;

        const filtered = (data || [])
          .filter((p) => p.id !== currentProductId)
          .map((p) => ({
            id: p.id,
            productName: p.name || "-",
            productPrice: Number(p.price || 0),
            productImage: p.img1 || "",
            company_name: p.company_name,
            category: p.category,
          }));

        setProdutos(filtered);
      } catch (err) {
        console.error("Erro ao buscar produtos relacionados:", err.message);
      }
    };

    fetchProdutosRelacionados();
  }, [company_name, category, currentProductId]);

  if (!produtos.length) return null;

  return (
    <div className={styles.relatedSection}>
      <h2 className={styles.title}>Produtos relacionados</h2>

      <div className={styles.carouselWrapper}>
        <button className={styles.arrowLeft} onClick={() => scroll("left")}>
          &#8249;
        </button>

        <div className={styles.carousel} ref={carouselRef}>
          {produtos.map((produto) => (
            <div key={produto.id} className={styles.card}>
              <Link to={`/produto/${produto.id}`} className={styles.link}>
                <img
                  src={produto.productImage}
                  alt={produto.productName}
                  className={styles.img}
                />
                <p className={styles.nome}>{produto.productName}</p>
                <p className={styles.preco}>
                  R${produto.productPrice.toFixed(2).replace(".", ",")}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <button className={styles.arrowRight} onClick={() => scroll("right")}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default RelatedProducts;
