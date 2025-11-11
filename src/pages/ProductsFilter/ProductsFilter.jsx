import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductsFilter.module.css";
import Footer from "../../components/Footer/Footer.jsx";
import NavBar from "../../components/Navbar/NavBar.jsx";
import HomeButton from "../../components/HomeButton.jsx";
import Header from "../../components/Header/Header.jsx";
import WhatsAppButton from "../../components/WhatsappButton.jsx";

export default function ProductsFilter() {
  // OBS: mantive a extração inicial do parâmetro como você já tinha
  var urlParams = new URLSearchParams(window.location.search);
  var categorie = urlParams.get("categoria");

  const categoryMap = {
    pneus: "Pneus",
    oleos: "Óleos",
    acessorios: "Acessórios",
    pecas: "Peças",
  };

  // Converte o parâmetro 'categoria' para o nome canônico (se possível)
  categorie = categoryMap[categorie] || null;

  // Lista canônica de categorias (usadas para validação)
  const canonicalCategories = ["Acessórios", "Pneus", "Peças", "Óleos"];

  // --- Helpers para normalizar e mapear strings (remove acentos, espaços, lower)
  const normalize = (s) =>
    typeof s === "string"
      ? s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // remove acentos
          .replace(/[|:—\-]/g, " ") // normaliza certos separadores para espaço
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase()
      : "";

  const normalizedToCanonical = {
    acessorios: "Acessórios",
    pneus: "Pneus",
    pecas: "Peças",
    oleos: "Óleos",
    // variações comuns (sem 's' etc.)
    acessorio: "Acessórios",
    oleo: "Óleos",
    peca: "Peças",
    pneu: "Pneus",
  };

  // Extrai possível categoria de uma query de busca (ex: "Brasmérica | categoria x" ou "Brasmérica categoria x")
  function extractCategoryFromQuery(q) {
    if (!q) return null;
    let cleaned = q.replace(/brasm[ée]rica/ig, ""); // remove palavra brasmérica se existir
    cleaned = cleaned.replace(/categoria/ig, ""); // remove palavra 'categoria'
    cleaned = cleaned.replace(/[|:—\-]/g, " ");
    cleaned = cleaned.replace(/\s+/g, " ").trim();
    if (!cleaned) return null;

    const norm = normalize(cleaned);

    // Se a string inteira corresponde a uma categoria normalizada
    if (normalizedToCanonical[norm]) return normalizedToCanonical[norm];

    // Tentar procurar palavras individuais que batam
    const parts = norm.split(" ");
    for (let p of parts) {
      if (normalizedToCanonical[p]) return normalizedToCanonical[p];
    }

    return null;
  }

  // Defina aqui as faixas de preço que aparecem como checkboxes
  const priceOptions = [
    { id: "50-100", label: "R$50 - R$100", min: 50, max: 100 },
    { id: "100-150", label: "R$100 - R$150", min: 100, max: 150 },
    { id: "150-200", label: "R$150 - R$200", min: 150, max: 200 },
    { id: "200-250", label: "R$200 - R$250", min: 200, max: 250 },
  ];

  // guarda os ids selecionados (ex: Set) ou array
  const [selectedRanges, setSelectedRanges] = useState(() => new Set());

  const toggleRange = (optionId) => {
    setSelectedRanges((prevSet) => {
      const next = new Set(prevSet);
      if (next.has(optionId)) next.delete(optionId);
      else next.add(optionId);
      return next;
    });
  };

  // NOVO: lista de marcas (na ordem exata e com a grafia exata solicitada)
  const brandsList = [
    "Shell",
    "Mobil",
    "Ipiranga",
    "Motul",
    "Levorin",
    "Maggion",
    "Ira",
    "Yamalube",
    "Texaco",
    "Philips",
    "San Marino",
    "FortLub",
    "DIAFRAG",
    "Megaville",
    "ERBS",
    "BrasPlus",
    "Flahstyre",
  ];

  // Estado para marcas selecionadas
  const [selectedBrands, setSelectedBrands] = useState(() => new Set());

  const toggleBrand = (brand) => {
    setSelectedBrands((prevSet) => {
      const next = new Set(prevSet);
      if (next.has(brand)) next.delete(brand);
      else next.add(brand);
      return next;
    });
  };

  // Ordenação: 'relevance' (padrão), 'price-asc', 'price-desc'
  const [orderValue, setOrderValue] = useState("relevance");

  const handleOrderChange = (e) => {
    setOrderValue(e.target.value);
  };

  // Converte selectedRanges para array de {min,max} para passar ao ProductCard
  const activePriceRanges = Array.from(selectedRanges)
    .map((id) => {
      const opt = priceOptions.find((p) => p.id === id);
      return opt ? { min: opt.min, max: opt.max } : null;
    })
    .filter(Boolean);

  // Mapeia orderValue para props que o ProductCard entende
  let orderByProp = undefined;
  let orderDirectionProp = undefined;
  let limitProp = undefined;

  if (orderValue === "price-asc") {
    orderByProp = "price";
    orderDirectionProp = "asc";
  } else if (orderValue === "price-desc") {
    orderByProp = "price";
    orderDirectionProp = "desc";
  } else if (orderValue === "relevance") {
    // conforme solicitado: usar unitsSold (campo do banco: unitssold) em ordem desc e exemplo com limit=8
    orderByProp = "unitssold";
    orderDirectionProp = "desc";
    limitProp = 8;
  }

  // ---------------------------------------------------------------------
  // EFEITO: define o document.title sempre como o nome da categoria canônica
  // ---------------------------------------------------------------------
  useEffect(() => {
    // prioridade: parametro 'categoria' na URL (já normalizado em 'categorie')
    let finalCategory = null;

    if (categorie && canonicalCategories.includes(categorie)) {
      finalCategory = categorie;
    } else {
      // tenta extrair de parâmetros de busca (q / search)
      const sp = new URLSearchParams(window.location.search);
      const qParam = sp.get("q") || sp.get("search") || null;

      if (qParam) {
        const fromQ = extractCategoryFromQuery(qParam);
        if (fromQ) finalCategory = fromQ;
      }

      // se ainda não achou, tenta extrair do referrer (ex: google ?q=...)
      if (!finalCategory) {
        try {
          const ref = document.referrer || "";
          if (ref && ref.includes("?")) {
            const refUrl = new URL(ref);
            const rq = refUrl.searchParams.get("q");
            if (rq) {
              const fromRef = extractCategoryFromQuery(rq);
              if (fromRef) finalCategory = fromRef;
            }
          }
        } catch (e) {
          // ignora erros de parsing do referrer
        }
      }
    }

    const defaultTitle = "Categorias — Brasmérica";
    const newTitle = finalCategory || categorie || defaultTitle;

    try {
      document.title = "Brasmérica | " + newTitle;

      // Atualiza ou cria meta og:title para compartilhamento
      let og = document.querySelector('meta[property="og:title"]');
      if (!og) {
        og = document.createElement("meta");
        og.setAttribute("property", "og:title");
        document.head.appendChild(og);
      }
      og.setAttribute("content", newTitle);
    } catch (err) {
      // ambiente sem DOM: ignora
      console.warn("Não foi possível definir document.title", err);
    }
  }, []); // roda uma vez no mount

  return (
    <>
      <Header />
      <WhatsAppButton />
      <NavBar />
      <HomeButton />
      <div style={{ width: "100vw" }} className={styles.produtosContainer}>
        <div className={styles.breadcrumb}>
          <span>Início → Categorias → {categorie || "Todas"}</span>
        </div>

        {/* TOPO DESKTOP */}
        <div className={styles.filtro}>
          <h1 className={styles.tituloPagina}>Todos(as) os(as) {categorie || "Produtos"}</h1>

          {/* Ordenação Desktop */}
          <div className={`${styles.ordenacao} desktop`}>
            <label>Ordenar por</label>
            <select value={orderValue} onChange={handleOrderChange}>
              <option value="relevance">Relevância</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>
        </div>

        {/* FILTROS MOBILE */}
        <div className={styles.filtrosMobile}>
          <div style={{ display: 'none' }} className="mobile">
            <label>Filtrar por</label>
            <select>
              <option>Preço</option>
              <option>Marca</option>
              <option>Cor</option>
            </select>
          </div>

          <div className="mobile">
            <label>Ordenar por</label>
            <select value={orderValue} onChange={handleOrderChange}>
              <option value="relevance">Relevância</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>
        </div>

        <div className={styles.produtosLayout}>
          {/* FILTROS DESKTOP */}
          <aside className={styles.filtros}>
            <div className={styles.filtroGrupo}>
              <h4>Preço</h4>
              <div className="checkboxes">
                {priceOptions.map((opt) => (
                  <label key={opt.id}>
                    <input
                      type="checkbox"
                      checked={selectedRanges.has(opt.id)}
                      onChange={() => toggleRange(opt.id)}
                    />{" "}
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filtroGrupo}>
              <h4>Marca</h4>
              <div className="checkboxes">
                {brandsList.map((brand) => (
                  <label key={brand}>
                    <input
                      type="checkbox"
                      checked={selectedBrands.has(brand)}
                      onChange={() => toggleBrand(brand)}
                    />{" "}
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filtroGrupo}>
              <h4>Cor</h4>
              <div className="checkboxes">
                <label>
                  <input type="checkbox" /> Preto
                </label>
                <label>
                  <input type="checkbox" /> Branco
                </label>
                <label>
                  <input type="checkbox" /> Azul
                </label>
                <label>
                  <input type="checkbox" /> Vermelho
                </label>
                <label>
                  <input type="checkbox" /> Amarelo
                </label>
                <label>
                  <input type="checkbox" /> Outros
                </label>
              </div>
            </div>
          </aside>

          <div className={styles.produtosPrincipal}>
            {/* Passa as faixas de preço ativas para o ProductCard */}
            <ProductCard
              category={categorie}
              priceRanges={activePriceRanges}
              orderBy={orderByProp}
              orderDirection={orderDirectionProp}
              limit={limitProp}
              // Passa a lista de marcas selecionadas; usa o nome do campo do BD conforme solicitado
              company_name={Array.from(selectedBrands)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
