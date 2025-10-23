import React from "react";
import "./ProductCard.css";
import { FaShippingFast } from "react-icons/fa";
import { SiPix } from "react-icons/si";

// 🧩 Mock JSON diretamente no arquivo
const mockProducts = [
  {
    id: 1,
    title: "Capacete Integral Pro Tork R8",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSThQs75Yfy8IOxQNjBFbdLCVGCyQiMaEXkc6WGOsEwlnOmh8Q3tRfPszvNPOm34X_orEFYH3voJrOrJ9sY9FTsfIvRpv5ZrcCRdDOqkAAMhIqk56VBZm_64niH5N2HWlliCzxjzeGncQ&usqp=CAc",
    price: 199.00,
    oldPrice: 389.00,
    discountPix: "10% de desconto no PIX",
    freeShipping: true,
    addToCartUrl: "#",
    buyNowUrl: "#"
  },
  {
    id: 2,
    title: "Jaqueta Motociclística Texx Storm",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTuQeVeyLRz2tcz84d5ZeQTlApvC0qQPQ1Urc4e9wVzeTbP2ltvRqyQJ3yxMx13domzQebSk_EhEzlq505BCbka1g1GPKKOmY2EE3C1U4OG2tc5mojgPsosP5qTOzSDcue_aTpM7Qr8Wng&usqp=CAc",
    price: 359.90,
    oldPrice: 499.00,
    discountPix: "15% de desconto no PIX",
    freeShipping: true,
    addToCartUrl: "#",
    buyNowUrl: "#"
  },
  {
    id: 3,
    title: "Luva X11 Blackout Touchscreen",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYcdDqmTzUuTPD5b1eLTJdRAhnoH8u5dQ3uOQ0qK_3RBVSLdD1-dT5f3CJ5JgDuX-d5Q0SCQxO2ojSk6OL6dY49dyS3PmAauwCBCAnyO6ixMFk8jhM8M2fUkXpo2QOAg&usqp=CAc",
    price: 89.90,
    oldPrice: 129.90,
    discountPix: "5% de desconto no PIX",
    freeShipping: true,
    addToCartUrl: "#",
    buyNowUrl: "#"
  },
  {
    id: 4,
    title: "Bota de Motociclista Mondeo Impermeável",
    image: "data:image/webp;base64,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",
    price: 289.00,
    oldPrice: 450.00,
    discountPix: "10% de desconto no PIX",
    freeShipping: true,
    addToCartUrl: "#",
    buyNowUrl: "#"
  },
  {
    id: 5,
    title: "Calça Motociclista X11 Troy com Proteção",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRoJISNNPDHlwlWBG6JTnIaufbBl_rlkGjiHflaN6vb2nUf-WgQIQPHTtezGV1SQElCuPInTA6o5DgTI1jP7rcHkJjO1_gm9_SYQUZu20582QUycLiyE8vi8g",
    price: 320.50,
    oldPrice: 410.00,
    discountPix: "10% de desconto no PIX",
    freeShipping: true,
    addToCartUrl: "#",
    buyNowUrl: "#"
  },
  {
    id: 6,
    title: "Baú de Moto Givi Monolock 45 Litros",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS7nHTWoYI7o0FPWsQQ23O5Yh5h8xnIvFf8ArlWxWk0YV-rZfKM6dhA0CcstdIgWOoCgbaHn4gPIhskG7_PIrrga70uE7D7Q85g8cb8eRn-vpfkGug1rZZD",
    price: 450.00,
    oldPrice: 599.00,
    discountPix: "12% de desconto no PIX",
    freeShipping: true,
    addToCartUrl: "#",
    buyNowUrl: "#"
  },
  {
    id: 7,
    title: "Intercomunicador de Capacete Ejeas V6 Pro",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTp_kR2h4HzEQaq9Aho_fLK7Wh1p_3M3k2cUEldi4FjIMfyXXzB_hZpZdmjgKsu9j_y0CI8E_576aDimlUGTs70ewmRIW24GXl8fBavj3bTYsILajqpeQxT8w",
    price: 299.00,
    oldPrice: 399.00,
    discountPix: "15% de desconto no PIX",
    freeShipping: true,
    addToCartUrl: "#",
    buyNowUrl: "#"
  },
  {
    id: 8,
    title: "Intercomunicador de Capacete Ejeas V6 Pro",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTp_kR2h4HzEQaq9Aho_fLK7Wh1p_3M3k2cUEldi4FjIMfyXXzB_hZpZdmjgKsu9j_y0CI8E_576aDimlUGTs70ewmRIW24GXl8fBavj3bTYsILajqpeQxT8w",
    price: 299.00,
    oldPrice: 399.00,
    discountPix: "15% de desconto no PIX",
    freeShipping: true,
    addToCartUrl: "#",
    buyNowUrl: "#"
  }
];

// 🧠 Componente principal
export default function ProductCard() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "2rem",
        padding: "0.5rem",
      }}
    >
      {mockProducts.map((product) => (
        <div className="product-card" key={product.id}>
          <br />
          {product.freeShipping && (
            <div className="free-shipping">
              
              <span><FaShippingFast /> FRETE GRÁTIS</span>
            </div>
          )}

          <a href={product.buyNowUrl}>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          </a>
          <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">
              R${product.price.toFixed(2).replace(".", ",")} <span className="proudct-old-price">R${product.oldPrice.toFixed(2).replace(".", ",")}</span>

              <span className="discount-pix"> {product.discountPix} <SiPix style={{ color: "#32BCAD", marginLeft: "4px", verticalAlign: "middle" }} /></span>
              
            </p>
          </div>

          <div className="product-actions">
            <button href={product.addToCartUrl} className="btn btn-cart">
              ADICIONAR AO CARRINHO!
            </button>
            <a href={product.buyNowUrl} className="btn btn-buy">
              COMPRAR AGORA!
            </a>
            <br />  
          </div>
        </div>
        
      ))}
    </div>
  );
}
