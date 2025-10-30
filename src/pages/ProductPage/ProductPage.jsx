"use client"

import React, { useState } from "react"
import { Star, Truck, ShoppingCart, ChevronRight } from "lucide-react"
import styles from "./ProductPage.module.css"

const mockProduct = {
  id: "12345",
  name: "Smartphone XYZ",
  price: 1999.99,
  oldPrice: 2499.99,
  images: [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg",
    "https://example.com/img3.jpg",
  ],
  rating: 4.5,
  category: "Eletrônicos",
  subcategory: "Smartphones",
  unitsSold: 150,
  reviewCount: 25,
  stockQty: 30,
  tags: "smartphone,android,novo",
  shortDesc: "Descrição curta do produto",
  longDesc: "Este smartphone de última geração oferece desempenho excepcional com processador de alta velocidade, câmera profissional e bateria de longa duração. Ideal para quem busca tecnologia e qualidade em um único dispositivo."
}

const StarRating = ({ rating, reviewCount }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - Math.ceil(rating)

  return (
    <div className={styles.rating}>
      <div className={styles.stars}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={styles.starFilled} fill="currentColor" />
        ))}
        {hasHalfStar && (
          <div className={styles.starHalf}>
            <Star className={styles.starEmpty} />
            <Star className={styles.starFilled} fill="currentColor" />
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={styles.starEmpty} />
        ))}
      </div>
      <span className={styles.ratingText}>
        {rating} ({reviewCount} avaliações)
      </span>
    </div>
  )
}

const ImageGallery = ({ images, name }) => {
  const [selected, setSelected] = useState(images[0])

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(img)}
            className={`${styles.thumbnail} ${selected === img ? styles.thumbnailActive : ""}`}
          >
            <img src={img || "/placeholder.svg"} alt={`${name} ${i + 1}`} />
          </button>
        ))}
      </div>
      <div className={styles.mainImage}>
        <img src={selected || "/placeholder.svg"} alt={name} />
      </div>
    </div>
  )
}

const ShippingCalculator = () => {
  const [zipCode, setZipCode] = useState("")
  const [cost, setCost] = useState("Calcule o valor do frete")

  const calculate = () => {
    console.log("Calculating shipping for:", zipCode)
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
  const addToCart = () => console.log("Adding to cart:", productId)
  const buyNow = () => console.log("Buying now:", productId)

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

export default function ProductPage() {
  const p = mockProduct
  const tags = p.tags.split(",").map(t => t.trim()).filter(Boolean)

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.product}>
          <ImageGallery images={p.images} name={p.name} />
          
          <div className={styles.info}>
            <h1>{p.name}</h1>
            <StarRating rating={p.rating} reviewCount={p.reviewCount} />
            
            <div className={styles.price}>
              <span className={styles.priceNow}>R$ {p.price.toFixed(2).replace('.', ',')}</span>
              <span className={styles.priceOld}>R$ {p.oldPrice.toFixed(2).replace('.', ',')}</span>
            </div>

            <ShippingCalculator />
            <ProductActions productId={p.id} />
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <section className={styles.section}>
          <h2>Detalhes do Produto</h2>
          
          <DetailRow label="Categorias:">
            <div className={styles.categories}>
              <span>{p.category}</span>
              <ChevronRight />
              <span>{p.subcategory}</span>
            </div>
          </DetailRow>

          <DetailRow label="Quantidade vendida:">
            <span>{p.unitsSold}</span>
          </DetailRow>

          <DetailRow label="Quantidade em estoque:">
            <span>{p.stockQty}</span>
          </DetailRow>

          <DetailRow label="Tags:">
            <div className={styles.tags}>
              {tags.map((tag, i) => (
                <span key={i} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </DetailRow>
        </section>

        <section className={styles.section}>
          <h2>Descrição do Produto</h2>
          <p>{p.longDesc}</p>
        </section>
      </div>
    </div>
  )
}