import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://vutcznlbeyvnzaoehdje.supabase.co", "sb_publishable_NfkLxVMoxM-hv5Me_46Bxg_bC7xgIJI")

function DashboardProducts() {
  const [produtos, setprodutos] = useState([]);

  useEffect(() => {
    getprodutos();
  }, []);

  async function getprodutos() {
    const { data } = await supabase.from("produtos").select();
    setprodutos(data);
  }

  return (
    <ul>
      {produtos.map((produto) => (
        <li key={produto.name}>{produto.name}</li>
      ))}
    </ul>
  );
}

export default DashboardProducts;