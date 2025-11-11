"use client"

// ProductPage.jsx — versão atualizada para definir o document.title como o nome do produto
// e para lidar com pesquisas do tipo "brasmérica produto x". (Comentários comentam as mudanças.)

import React, { useState, useEffect } from "react"
import { Star, Truck, ShoppingCart, ChevronRight } from "lucide-react"
import styles from "./ProductPage.module.css"
import HomeButton from '../../components/HomeButton.jsx';
import Header from '../../components/Header/Header.jsx';
import WhatsAppButton from '../../components/WhatsappButton.jsx';
import Footer from '../../components/Footer/Footer.jsx'
import NavBar from '../../components/Navbar/NavBar.jsx'

// Inicializa o cliente Supabase
import SupabaseClient from "../../components/KEYS/App.jsx";

const supabase = SupabaseClient;

// pequenos subcomponentes (idênticos ao que você já tinha)
const StarRating = ({ rating, reviewCount }) => {
  const numRating = Number(rating) || 0;
  const numReviewCount = Number(reviewCount) || 0;

  const fullStars = Math.floor(numRating)
  const hasHalfStar = numRating % 1 !== 0
  const emptyStars = 5 - Math.ceil(numRating)

  return (
    <div className={styles.rating}>
      <div className={styles.stars}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={styles.starFilled} fill="currentColor" />
        ))}
        {hasHalfStar && (
          <Star key="half" className={styles.starFilled} fill="currentColor" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={styles.starEmpty} />
        ))}
      </div>
      <span className={styles.ratingText}>
        {numRating.toFixed(1)} ({numReviewCount} avaliações)
      </span>
    </div>
  )
}

const ImageGallery = ({ images, name }) => {
  const validImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const [selected, setSelected] = useState(validImages[0] || "/placeholder.svg");

  useEffect(() => {
    if (validImages.length > 0) {
      setSelected(validImages[0]);
    } else {
      setSelected("/placeholder.svg");
    }
  }, [images]);

  if (validImages.length === 0) {
    return <div className={styles.mainImage}><img src="/placeholder.svg" alt={name || "Imagem do produto"} /></div>;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {validImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(img)}
            className={`${styles.thumbnail} ${selected === img ? styles.thumbnailActive : ""}`}
          >
            <img src={img} alt={`${name || "Produto"} ${i + 1}`} />
          </button>
        ))}
      </div>
      <div className={styles.mainImage}>
        <img src={selected} alt={name || "Imagem principal do produto"} />
      </div>
    </div>
  )
}

const ShippingCalculator = () => {
  const [zipCode, setZipCode] = useState("")
  const [cost, setCost] = useState("Calcule o valor do frete")

  const calculate = () => {
    console.log("Calculando frete para:", zipCode)
    setCost("R$ 15,00")
  }

  return (
    <div className={styles.shipping}>
      <div className={styles.shippingHeader}>
        <Truck />
        <span>Frete:</span>
      </div>
      <div className={styles.shippingInput}>
        <input
          type="text"
          placeholder="Insira o seu CEP"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <button onClick={calculate}>Calcular frete!</button>
      </div>
      <div className={styles.shippingCost}>
        <span>Valor do frete:</span>
        <span>{cost}</span>
      </div>
    </div>
  )
}

const ProductActions = ({ productId }) => {
  const addToCart = () => console.log("Adicionando ao carrinho:", productId)
  const buyNow = () => console.log("Comprando agora:", productId)

  return (
    <div className={styles.actions}>
      <button onClick={addToCart} className={styles.btnCart}>
        <ShoppingCart />
        Adicionar ao carrinho!
      </button>
      <button onClick={buyNow} className={styles.btnBuy}>
        Comprar agora!
      </button>
    </div>
  )
}

const DetailRow = ({ label, children }) => (
  <div className={styles.detail}>
    <span className={styles.label}>{label}</span>
    {children}
  </div>
)

// --- FUNÇÃO AUXILIAR: limpar query de busca ---
function cleanSearchQuery(q) {
  if (!q) return null;
  try {
    // Descodifica e normaliza espaços + remove prefixo "brasmérica" se existir
    let decoded = decodeURIComponent(q.replace(/\+/g, ' '));
    decoded = decoded.replace(/\s+/g, ' ').trim();
    decoded = decoded.replace(/brasm[ée]rica[:\-\s]*/i, ''); // remove variações de brasmérica
    return decoded.trim() || null;
  } catch (e) {
    return q;
  }
}

// --- Componente Principal ---
export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fallbackTitle, setFallbackTitle] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get('productID');
    const qParam = urlParams.get('q') || urlParams.get('search') || null;

    // Se houver um parâmetro de busca (ex: vindo do Google/site search), tenta extrair um título
    if (qParam) {
      const candidate = cleanSearchQuery(qParam);
      if (candidate) setFallbackTitle(candidate);
    } else {
      // Tenta extrair do referrer (ex.: quando o usuário veio de uma busca com q=...)
      try {
        const ref = document.referrer || '';
        if (ref.includes('?')) {
          const refUrl = new URL(ref);
          const rq = refUrl.searchParams.get('q');
          if (rq) {
            const candidate = cleanSearchQuery(rq);
            if (candidate) setFallbackTitle(candidate);
          }
        }
      } catch (e) {
        // ignora erros no parsing do referrer
      }
    }

    const fetchProduct = async () => {
      if (!productID) {
        setError("Nenhum produto selecionado.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('DBproducts')
          .select('*')
          .eq('id', productID)
          .single();

        if (error) throw error;

        if (data) {
          setProduct(data);
        } else {
          setError("Produto não encontrado.");
        }

      } catch (err) {
        console.error("Erro ao buscar produto:", err.message);
        setError("Não foi possível carregar o produto. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  // Garante que o título da aba (document.title) seja sempre o nome do produto quando disponível.
  // Se não houver produto mas houver um fallback vindo de uma busca que contenha "brasmérica ...",
  // o título será definido para esse fallback.
  useEffect(() => {
    const defaultSiteTitle = 'Produto — Brasmérica';
    const newTitle = (product && product.name) ? product.name : (fallbackTitle || defaultSiteTitle);

    try {
      document.title = "Brasmérica | " + newTitle;

      // Atualiza / cria meta og:title para SEO compartilhamento quando possível (client-side)
      let og = document.querySelector('meta[property="og:title"]');
      if (!og) {
        og = document.createElement('meta');
        og.setAttribute('property', 'og:title');
        document.head.appendChild(og);
      }
      og.setAttribute('content', newTitle);
    } catch (e) {
      // se estiver em ambiente sem DOM, ignora
    }
  }, [product, fallbackTitle]);

  return (
    <>
      <Header />
      <HomeButton />
      <WhatsAppButton />

      <div className={styles.container}>
        {loading && (
          <div className={styles.statusMessage}><h2>Carregando produto...</h2></div>
        )}

        {error && (
          <div className={styles.statusMessage}><h2>Erro: {error}</h2></div>
        )}

        {!loading && !error && !product && (
          <div className={styles.statusMessage}><h2>Produto não encontrado.</h2></div>
        )}

        {product && (
          <>
            <div className={styles.card}>
              <div className={styles.product}>
                <ImageGallery
                  images={[product.img1, product.img2, product.img3]}
                  name={product.name}
                />
                <div className={styles.info}>
                  <h1>{product.name}</h1>
                  <StarRating rating={product.rating} reviewCount={product.reviewcount} />

                  <div className={styles.price}>
                    <span className={styles.priceNow}>R$ {Number(product.price || 0).toFixed(2).replace('.', ',')}</span>
                    {Number(product.oldprice) > 0 && (
                      <span className={styles.priceOld}>R$ {Number(product.oldprice).toFixed(2).replace('.', ',')}</span>
                    )}
                  </div>

                  <ShippingCalculator />
                  <ProductActions productId={product.id} />
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <section className={styles.section}>
                <h2>Detalhes do Produto</h2>

                <DetailRow label="Categorias:">
                  <div className={styles.categories}>
                    <span>{product.category}</span>
                    <ChevronRight />
                    <span>{product.subcategory}</span>
                  </div>
                </DetailRow>

                <DetailRow label="Quantidade vendida:">
                  <span>{product.unitssold || 0}</span>
                </DetailRow>

                <DetailRow label="Quantidade em estoque:">
                  <span>{product.stockqty || 0}</span>
                </DetailRow>

                <DetailRow label="Nome da marca:">
                  <span>{product.company_name ? product.company_name : "N/A"}</span>
                </DetailRow>

                <DetailRow label="Tags:">
                  <div className={styles.tags}>
                    {(product.tags ? product.tags.split(",").map(t => t.trim()).filter(Boolean) : []).length > 0 ? (
                      (product.tags.split(",").map(t => t.trim()).filter(Boolean)).map((tag, i) => (
                        <span key={i} className={styles.tag}>{tag}</span>
                      ))
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                </DetailRow>
              </section>

              <section className={styles.section}>
                <h2>Descrição do Produto</h2>
                <h2 style={{color: 'black'}}>{product.longdesc}</h2>
              </section>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  )
}
