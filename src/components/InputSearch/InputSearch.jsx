import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./InputSearch.module.css";

// 🔧 Configuração do Supabase
import SupabaseClient from "../KEYS/App.jsx";

const supabase = SupabaseClient;

export default function InputSearch() {
  const [termo, setTermo] = useState("");
  const [resultados, setResultados] = useState([]);
  const [todosProdutos, setTodosProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ativo, setAtivo] = useState(false);
  const containerRef = useRef(null);

  // 🔄 Busca todos os produtos no Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("DBproducts")
        .select("id, name, img1, price, url");

      if (error) {
        console.error("Erro ao buscar produtos:", error);
      } else {
        setTodosProdutos(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // 🔍 Filtro de busca
  const handleChange = (e) => {
    const valor = e.target.value;
    setTermo(valor);

    if (valor.trim() === "") {
      setResultados([]);
    } else {
      const filtrados = todosProdutos.filter((produto) =>
        produto.name.toLowerCase().includes(valor.toLowerCase())
      );
      setResultados(filtrados);
    }
  };

  // 🖱️ Detecta clique fora do componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setAtivo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🟢 Ativar ao clicar no input ou ícone
  const handleActivate = () => setAtivo(true);

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <div className={styles.inputSearch}>
        <input
          id="inputSearchText"
          type="text"
          value={termo}
          onChange={handleChange}
          onFocus={handleActivate}
          placeholder="O que você procura?"
        />
        <a href="#inputSearchText">
          <FaSearch
            className={styles.searchIcon}
            onClick={handleActivate}
          />
        </a>

      </div>

      {ativo && (
        <>
          {loading && <p className={styles.loading}>Carregando produtos...</p>}

          {resultados.length > 0 && (
            <div className={styles.resultados}>
              {resultados.map((produto) => (
                <a
                  href={produto.url}
                  key={produto.id}
                  className={styles.resultadoItem}
                >
                  <img
                    src={produto.img1}
                    alt={produto.name}
                    className={styles.imagemProduto}
                  />
                  <div className={styles.infoProduto}>
                    <p className={styles.nomeProduto}>{produto.name}</p>
                    <p className={styles.precoProduto}>
                      R$ {Number(produto.price).toFixed(2)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {!loading && termo.trim() !== "" && resultados.length === 0 && (
            <p className={styles.nenhumResultado}>Produto não encontrado.</p>
          )}
        </>
      )}
    </div>
  );
}
