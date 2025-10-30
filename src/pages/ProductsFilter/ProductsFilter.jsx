import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductsFilter.css";
import Footer from "../../components/Footer/Footer.jsx";
import NavBar from "../../components/Navbar/NavBar.jsx";
import HomeButton from "../../components/HomeButton.jsx";
import Header from "../../components/Header/Header.jsx";
import WhatsAppButton from "../../components/WhatsappButton.jsx";

export default function ProductsFilter() {

  var urlParams = new URLSearchParams(window.location.search);
  var categorie = urlParams.get('categoria');

  const categoryMap = {
    pneus: "Pneus",
    oleos: "Óleos",
    acessorios: "Acessórios",
    pecas: "Peças"
  };

  categorie = categoryMap[categorie] || "None";

  return (
    <>
      <Header />
      <WhatsAppButton />
      <NavBar />
      <HomeButton />
      <div style={{ width: '100vw' }} className="produtos-container">
        <div className="breadcrumb">
          <span>Início → Categorias → {categorie}</span>
        </div>

        {/* TOPO DESKTOP */}
        <div className="filtro">
          <h2 className="titulo-pagina">Todos os produtos</h2>

          {/* Ordenação Desktop */}
          <div className="ordenacao desktop">
            <label>Ordenar por</label>
            <select>
              <option>Relevância</option>
              <option>Menor preço</option>
              <option>Maior preço</option>
            </select>
          </div>
        </div>

        {/* FILTROS MOBILE */}
        <div className="filtros-mobile">
          <div className="mobile">
            <label>Filtrar por</label>
            <select>
              <option>Preço</option>
              <option>Marca</option>
              <option>Cor</option>
            </select>
          </div>

          <div className="mobile">
            <label>Ordenar por</label>
            <select>
              <option>Relevância</option>
              <option>Menor preço</option>
              <option>Maior preço</option>
            </select>
          </div>
        </div>

        <div className="produtos-layout">
          {/* FILTROS DESKTOP */}
          <aside className="filtros">
            <div className="filtro-grupo">
              <h4>Preço</h4>
              <div className="checkboxes">
                <label><input type="checkbox" /> R$50 - R$100</label>
                <label><input type="checkbox" /> R$100 - R$150</label>
                <label><input type="checkbox" /> R$150 - R$200</label>
                <label><input type="checkbox" /> R$200 - R$250</label>
              </div>
            </div>

            <div className="filtro-grupo">
              <h4>Marca</h4>
              <div className="checkboxes">
                <label><input type="checkbox" /> Pirelli</label>
                <label><input type="checkbox" /> Ipiranga</label>
                <label><input type="checkbox" /> Motul</label>
              </div>
            </div>

            <div className="filtro-grupo">
              <h4>Cor</h4>
              <div className="checkboxes">
                <label><input type="checkbox" /> Preto</label>
                <label><input type="checkbox" /> Branco</label>
                <label><input type="checkbox" /> Azul</label>
                <label><input type="checkbox" /> Vermelho</label>
                <label><input type="checkbox" /> Amarelo</label>
                <label><input type="checkbox" /> Outros</label>
              </div>
            </div>
          </aside>

          <div className="produtos-principal">
            <ProductCard category={categorie} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
