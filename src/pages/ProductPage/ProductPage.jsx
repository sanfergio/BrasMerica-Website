"use client"

// 'useSearchParams' e 'Suspense' foram removidos
import React, { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Star, Truck, ShoppingCart, ChevronRight } from "lucide-react"
import styles from "./ProductPage.module.css"
import HomeButton from '../../components/HomeButton.jsx';
import Header from '../../components/Header/Header.jsx';
import WhatsAppButton from '../../components/WhatsappButton.jsx';
import Footer from '../../components/Footer/Footer.jsx'
import NavBar from '../../components/Navbar/NavBar.jsx'

// Inicializa o cliente Supabase
const supabase = createClient("https://vutcznlbeyvnzaoehdje.supabase.co", "sb_publishable_NfkLxVMoxM-hv5Me_46Bxg_bC7xgIJI");

// --- Componentes Internos (Sub-componentes da página) ---
// (Estes componentes são idênticos aos da versão anterior)

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
      setSelected("/placeholder.svg"); // Garante que o placeholder seja usado se as imagens mudarem para vazio
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


// --- Componente Principal da Página ---
// Unificamos ProductContent e ProductPage
export default function ProductPage() {

  // Estados para gerenciar os dados, carregamento e erros
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ==================================================================
  // MUDANÇA PRINCIPAL: Busca de dados com useEffect e window.location
  // ==================================================================
  useEffect(() => {
    // Acessamos 'window.location.search' aqui dentro
    // O 'useEffect' com [] só roda no cliente, após a montagem
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get('productID'); // Pega o ID da URL

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
          .from('produtos')
          .select('*')
          .eq('id', productID)
          .single();

        if (error) {
          throw error;
        }

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
  }, []); // O array de dependência vazio [] garante que isso rode APENAS UMA VEZ no carregamento.


  // ----- Renderização do Layout (Cabeçalho, Rodapé, etc.) -----
  return (
    <>
      <Header />
      <HomeButton />
      <WhatsAppButton />

      <div className={styles.container}>
        {/* ----- Renderização Condicional do Conteúdo ----- */}

        {loading && (
          <div className={styles.statusMessage}><h2>Carregando produto...</h2></div>
        )}

        {error && (
          <div className={styles.statusMessage}><h2>Erro: {error}</h2></div>
        )}

        {!loading && !error && !product && (
          <div className={styles.statusMessage}><h2>Produto não encontrado.</h2></div>
        )}

        {/* ----- Renderização do Produto (se tudo deu certo) ----- */}
        {product && (
          <>
            {/* Bloco 1: Imagens e Ações */}
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

            {/* Bloco 2: Detalhes e Descrição */}
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
                <p>{product.longdesc}</p>
              </section>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  )
}