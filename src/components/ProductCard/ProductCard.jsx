// ProductCard.jsx
import React, { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";
import { FaShippingFast } from "react-icons/fa";
import { SiPix } from "react-icons/si";
import { FaCartShopping } from "react-icons/fa6";
import SupabaseClient from "../KEYS/App.jsx";
import AddCart from "../Alerts/AddCart";
import CartSidebar from "../CartSideBar/CartSideBar.jsx";

const supabase = SupabaseClient;

const STORAGE_KEY = "cart_v1";

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
 * @param {Array<{min:number,max:number}>=} props.priceRanges - Array de faixas de preço para filtrar (client-side)
 * @param {Array<string>=} props.company_name - Array de nomes de marca para filtrar (campo no BD: company_name)
 */
function ProductCard({
  category,
  subcategory,
  limit,
  orderBy,
  orderDirection = "desc",
  onlyAvailable = true,
  priceRanges = [],
  company_name = [],
}) {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAddCart, setShowAddCart] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let query = supabase.from("DBproducts").select("*");

        // 🔸 Sempre mostrar apenas produtos disponíveis (disponible = 0)
        if (onlyAvailable) {
          query = query.eq("disponible", 0);
        }

        // 🔸 Filtros opcionais
        if (category) query = query.eq("category", category);
        if (subcategory) query = query.eq("subcategory", subcategory);

        // 🔸 Filtrar por marcas (company_name) se fornecido — usa o campo exatamente como no BD
        if (Array.isArray(company_name) && company_name.length > 0) {
          // garante que todos os itens são strings
          const brands = company_name.map((b) => String(b));
          query = query.in("company_name", brands);
        }

        // 🔸 Ordenação (mais vendidos, melhor avaliados, etc.)
        if (orderBy) {
          query = query.order(orderBy, {
            ascending: orderDirection === "asc",
          });
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

        const mapped = (data || []).map((p) => ({
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

        // Se houver priceRanges, filtra client-side: produto entra se estiver em qualquer faixa selecionada
        let final = mapped;
        if (Array.isArray(priceRanges) && priceRanges.length > 0) {
          final = mapped.filter((prod) =>
            priceRanges.some((r) => {
              const price = Number(prod.price);
              // caso r.min ou r.max sejam null/undefined, tratar como aberto
              const minOk = r.min == null ? true : price >= r.min;
              const maxOk = r.max == null ? true : price <= r.max;
              return minOk && maxOk;
            })
          );
        }

        setProducts(final);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    }

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    category,
    subcategory,
    limit,
    orderBy,
    orderDirection,
    onlyAvailable,
    JSON.stringify(priceRanges),
    JSON.stringify(company_name),
  ]);

  // --- Função para adicionar item ao cart salvo no localStorage ---
  const handleAddToCart = (product) => {
    try {
      // Mostra a notificação
      setShowAddCart(true);

      const raw = localStorage.getItem(STORAGE_KEY);
      const cart = raw ? JSON.parse(raw) : [];

      // Procura item pelo id
      const idx = cart.findIndex((it) => String(it.id) === String(product.id));

      if (idx > -1) {
        // incrementa quantidade
        cart[idx].productQuantity = Number(cart[idx].productQuantity || 0) + 1;
      } else {
        // adiciona novo item com a estrutura esperada pelo carrinho
        const newItem = {
          id: product.id,
          productName: product.title || product.name || "",
          productPrice: product.price != null ? product.price : 0,
          productQuantity: 1,
          productImage: product.image || (product.images && product.images[0]) || "",
        };
        cart.push(newItem);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

      // Abre o carrinho automaticamente
      setIsCartOpen(true);

      // Emite evento customizado para permitir que componentes na mesma aba possam reagir sem reload.
      try {
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart }));
      } catch (e) {
        // fallback: dispatch plain Event and rely on reading localStorage
        try {
          window.dispatchEvent(new Event("cartUpdated"));
        } catch (er) {
          // ignore
        }
      }

      // Esconde a notificação após um tempo
      setTimeout(() => {
        setShowAddCart(false);
      }, 3000);

    } catch (e) {
      console.error("Erro ao adicionar item ao carrinho:", e);
    }
  };

  return (
    <>
      <AddCart show={showAddCart} duration={3000} />
      
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
                <button
                  className={`${styles.btn} ${styles.btnCart}`}
                  onClick={() => handleAddToCart(product)}
                >
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

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default ProductCard;