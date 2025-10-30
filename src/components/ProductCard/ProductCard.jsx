import React from "react";
import { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";
import { FaShippingFast } from "react-icons/fa";
import { SiPix } from "react-icons/si";
import { FaCartShopping } from "react-icons/fa6";

import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://vutcznlbeyvnzaoehdje.supabase.co", "sb_publishable_NfkLxVMoxM-hv5Me_46Bxg_bC7xgIJI")

export function currencyBRL(value) {
  return value == null
    ? '-'
    : Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// 🧠 Componente principal
function ProductCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('produtos')
          .select('*')
          .order('name', { ascending: true });

        if (error) {
          console.error('Erro Supabase:', error);
        } else if (!data) {
          console.warn('Nenhum dado retornado do Supabase.');
        } else {
          console.log('Produtos carregados:', data.length);
          const mapped = data.map((p) => ({
            id: p.id,
            name: p.name,
            price: Number(p.price),
            oldPrice: p.oldprice ? Number(p.oldprice) : null,
            images: [p.img1, p.img2, p.img3].filter(Boolean),
            rating: p.rating ? Number(p.rating) : 0,
            category: p.category,
            subcategory: p.subcategory,
            available: p.available === '1' || p.available === 1,
            url: p.url,
            unitsSold: p.unitssold ? Number(p.unitssold) : 0,
            reviewCount: p.reviewcount ? Number(p.reviewcount) : 0,
            stockQty: p.stockqty ? Number(p.stockqty) : 0,
            tags: p.tags || '',
            // Campos que estavam faltando no mapeamento original
            freeShipping: p.freeshipping || false,
            title: p.name, // Usando o name como title
            image: p.img1, // Usando a primeira imagem
            discountPix: p.discountpix || 'PIX',
            buyNowUrl: p.url || '#'
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className={styles.productsContainer}>
      {products.map((product) => (
        <div className={styles.productCard} key={product.id}>
          <br />

          <div className={styles.freeShipping}>
            <span><FaShippingFast /> FRETE GRÁTIS</span>
          </div>

          <a href={product.buyNowUrl}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
          </a>

          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>{product.title}</h3>
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
            <a href={product.buyNowUrl} className={`${styles.btn} ${styles.btnBuy}`}>
              VER PRODUTO!
            </a>
            <br />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;