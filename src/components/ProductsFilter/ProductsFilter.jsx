import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsFilter.css";

export default function ProductsFilter() {
  return (
    <div className="produtos-container">
      <div className="breadcrumb">
        <span>Início → Acessórios</span>
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

        <main className="produtos-principal">
          <ProductCard />
        </main>
      </div>
    </div>
  );
}
