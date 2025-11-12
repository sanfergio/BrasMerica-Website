// 🔧 Configuração do Supabase
import { useEffect, useState } from "react";
import SupabaseClient from "../KEYS/App.jsx";
import styles from "./AllProductsList.module.css";

const supabase = SupabaseClient;

function AllProductsList() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchDisponiveis = async () => {
      const { data, error } = await supabase
        .from("DBproducts")
        .select("name, disponible, url")
        .eq("disponible", 0);

      if (error) {
        console.error("Erro ao buscar dispositivos disponíveis:", error);
        setProdutos([]);
        return;
      }

      // Ordena alfabeticamente pelo nome (A -> Z) e seta o estado
      const ordenados = (data || []).slice().sort((a, b) =>
        (a.name || "").localeCompare(b.name || "", "pt-BR", { sensitivity: "base" })
      );
      setProdutos(ordenados);
    };

    fetchDisponiveis();
  }, []);

  return (
    <div className={styles.container}>
      <hr className={styles.divider} />
      <h5 className={styles.title} style={{color: "#b22234"}}> NOSSO CATÁLOGO </h5>
      <ul className={styles.lista}>
        {produtos.map((produto, index) => (
          <li key={index} className={styles.item}>
            <a
              href={produto.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              title={produto.name}
            >
              {produto.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllProductsList;
