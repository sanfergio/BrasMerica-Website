import React, { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";
import { FaShippingFast } from "react-icons/fa";
import { SiPix } from "react-icons/si";
import { FaCartShopping } from "react-icons/fa6";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://vutcznlbeyvnzaoehdje.supabase.co",
  "sb_publishable_NfkLxVMoxM-hv5Me_46Bxg_bC7xgIJI"
);

export function currencyBRL(value) {
  return value == null
    ? "-"
    : Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
}

/**
 * 🧩 Componente com filtros dinâmicos
 *
 * @param {object} props
 * @param {string=} props.category - Categoria (ex: "Pneus")
 * @param {string=} props.subcategory - Subcategoria (ex: "Pneus para motos")
 * @param {number=} props.limit - Limite de produtos retornados
 * @param {string=} props.orderBy - Campo de ordenação (ex: "unitssold", "reviewcount", "price")
 * @param {"asc"|"desc"=} props.orderDirection - Direção da ordenação
 * @param {boolean=} props.onlyAvailable - Se true, filtra apenas disponíveis (disponible = 0) (default: true)
 */
function ProductCard({
  category,
  subcategory,
  limit,
  orderBy,
  orderDirection = "desc",
  onlyAvailable = true,
}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let query = supabase.from('DBproducts').select("*");

        // 🔸 Sempre mostrar apenas produtos disponíveis (disponible = 0)
        query = query.eq("disponible", 0);

        // 🔸 Filtros opcionais
        if (category) query = query.eq("category", category);
        if (subcategory) query = query.eq("subcategory", subcategory);

        // 🔸 Ordenação (mais vendidos, melhor avaliados, etc.)
        if (orderBy) {
          query = query.order(orderBy, { ascending: orderDirection === "asc" });
        } else {
          query = query.order("name", { ascending: true });
        }

        // 🔸 Limite de resultados
        if (limit) query = query.limit(limit);

        const { data, error } = await query;

        if (error) {
          console.error("Erro Supabase:", error);
          return;
        }

        const mapped = data.map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          oldPrice: p.oldprice ? Number(p.oldprice) : null,
          images: [p.img1, p.img2, p.img3].filter(Boolean),
          rating: p.rating ? Number(p.rating) : 0,
          category: p.category,
          subcategory: p.subcategory,
          available: p.disponible === 0 || p.disponible === "0",
          url: p.url,
          unitsSold: p.unitssold ? Number(p.unitssold) : 0,
          reviewCount: p.reviewcount ? Number(p.reviewcount) : 0,
          stockQty: p.stockqty ? Number(p.stockqty) : 0,
          tags: p.tags || "",
          shortDesc: p.shortdesc || "",
          longDesc: p.longdesc || "",
          freeShipping:
            p.freeshipping === true ||
            p.freeshipping === "true" ||
            p.freeshipping === 1,
          discountPix: p.discountpix || "PIX",
          title: p.name,
          image: p.img1,
          buyNowUrl: p.url || "#",
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    }

    fetchProducts();
  }, [category, subcategory, limit, orderBy, orderDirection, onlyAvailable]);

  return (
    <div className={styles.productsContainer}>
      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        products.map((product) => (
          <div className={styles.productCard} key={product.id}>

            <div className={styles.freeShipping}>
              <span>
                <FaShippingFast /> FRETE GRÁTIS
              </span>
            </div>

            <a href={product.buyNowUrl}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImage}
              />
            </a>

            <div className={styles.productInfo}>
              <h3 title={product.title} className={styles.productTitle}>
                {product.title}
              </h3>
              <p className={styles.productPrice}>
                R${product.price.toFixed(2).replace(".", ",")}
                {product.oldPrice && (
                  <span className={styles.productOldPrice}>
                    R${product.oldPrice.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </p>
            </div>

            <div className={styles.productActions}>
              <button className={`${styles.btn} ${styles.btnCart}`}>
                ADICIONAR <FaCartShopping />
              </button>
              <a
                href={product.buyNowUrl}
                className={`${styles.btn} ${styles.btnBuy}`}
              >
                VER PRODUTO!
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductCard;
