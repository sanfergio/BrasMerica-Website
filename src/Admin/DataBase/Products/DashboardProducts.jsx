// src/DashboardProducts.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from "@supabase/supabase-js";
import './DashboardProducts.css';

const supabase = createClient("https://vutcznlbeyvnzaoehdje.supabase.co", "sb_publishable_NfkLxVMoxM-hv5Me_46Bxg_bC7xgIJI")

export function currencyBRL(value) {
  return value == null
    ? '-'
    : Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function StarRating({ value }) {
  const val = Number(value) || 0;
  const full = Math.floor(val);
  const half = val - full >= 0.5;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push('full');
    else if (i === full && half) stars.push('half');
    else stars.push('empty');
  }

  return (
    <div className="star-rating" title={`${val.toFixed(1)} / 5`}>
      {stars.map((s, i) => (
        <svg
          key={i}
          className={`star ${s}`}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden
        >
          <defs>
            <linearGradient id={`g${i}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset={s === 'half' ? '50%' : '100%'} stopColor="#f59e0b" />
              <stop offset={s === 'half' ? '50%' : '0%'} stopColor="#e6edf3" />
            </linearGradient>
          </defs>
          <path
            fill={s === 'empty' ? '#e6edf3' : `url(#g${i})`}
            stroke="#cbd5e1"
            strokeWidth="0.5"
            d="M12 .587l3.668 7.431L23.6 9.75l-5.668 5.53L19.6 24 12 19.897 4.4 24l1.668-8.72L.4 9.75l7.932-1.732z"
          />
        </svg>
      ))}
      <span className="rating-value">{val.toFixed(1)}</span>
    </div>
  );
}

export default function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('produtos')
          .select('*')
          .order('name', { ascending: true });

        if (error) {
          console.error('Erro Supabase:', error);
        } else if (!data) {
          console.warn('Nenhum dado retornado do Supabase.');
        } else {
          console.log('Produtos carregados:', data.length);
          const mapped = data.map((p) => ({
            id: p.id,
            name: p.name,
            price: Number(p.price),
            oldPrice: p.oldprice ? Number(p.oldprice) : null,
            images: [p.img1, p.img2, p.img3].filter(Boolean),
            rating: p.rating ? Number(p.rating) : 0,
            category: p.category,
            subcategory: p.subcategory,
            available: p.available === '1' || p.available === 1,
            url: p.url,
            unitsSold: p.unitssold ? Number(p.unitssold) : 0,
            reviewCount: p.reviewcount ? Number(p.reviewcount) : 0,
            stockQty: p.stockqty ? Number(p.stockqty) : 0,
            tags: p.tags || '',
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const setCat = new Set(products.map((p) => p.category));
    return ['Todos', ...Array.from(setCat)];
  }, [products]);

  function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    console.log('Produto excluído:', id);
  }

  const filtered = products.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      String(p.id).toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      !categoryFilter || categoryFilter === 'Todos'
        ? true
        : p.category === categoryFilter;
    const matchesAvailability = !showOnlyAvailable ? true : p.available;
    return matchesQuery && matchesCategory && matchesAvailability;
  });

  function exportCSV() {
    try {
      const headers = ['ID','Nome','Preco','Old Preco','Categoria','Subcategoria','Disponivel','URL','Units Sold','Reviews','Imagens'];
      const rows = filtered.map((p) => [
        p.id,p.name,p.price,p.oldPrice||'',p.category,p.subcategory,p.available?'Sim':'Não',p.url,p.unitsSold,p.reviewCount,p.images.join('|')
      ]);
      const csv = [headers,...rows]
        .map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(','))
        .join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'produtos_export.csv';
      a.click();
      URL.revokeObjectURL(url);
      console.log('CSV exportado com sucesso.');
    } catch (err) {
      console.error('Erro ao exportar CSV:', err);
    }
  }

  if (loading) return <div>Carregando produtos...</div>;

  return (
    <div className="dashboard modern">
      <header className="topbar">
        <div className="brand">
          <div className="logo">BM</div>
          <div>
            <h1>Brasmérica</h1>
            <p>Gerenciamento de Estoque — 2025</p>
          </div>
        </div>
        <div className="top-actions">
          <button className="btn" onClick={() => { setQuery(''); setCategoryFilter(''); setShowOnlyAvailable(false); }}>Resetar filtros</button>
          <a href="/produtos/novo" className="btn-add" title="Adicionar produto">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
            </svg>
            Adicionar Produto
          </a>
        </div>
      </header>

      <section className="controls">
        <div className="search">
          <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M21 21l-4.35-4.35" />
            <path fill="currentColor" d="M10.5 18A7.5 7.5 0 1 1 18 10.5 7.508 7.508 0 0 1 10.5 18z" />
          </svg>
          <input placeholder="Pesquisar por nome, ID ou tag..." value={query} onChange={(e)=>setQuery(e.target.value)}/>
        </div>

        <div className="filters">
          <select value={categoryFilter} onChange={(e)=>setCategoryFilter(e.target.value)} aria-label="Filtrar por categoria">
            {categories.map((cat)=>(
              <option key={cat} value={cat==='Todos'?'':cat}>{cat}</option>
            ))}
          </select>
          <label className="toggle-available">
            <input type="checkbox" checked={showOnlyAvailable} onChange={(e)=>setShowOnlyAvailable(e.target.checked)} />
            Mostrar apenas disponíveis
          </label>
        </div>
      </section>

      <main className="content">
        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Vendidas</th>
                <th>Avaliação</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((prod)=>(
                <tr key={prod.id}>
                  <td className="td-product">
                    <img src={prod.images[0]||'/placeholder.png'} alt={prod.name}/>
                    <div>
                      <strong>{prod.name}</strong>
                      <div className="small-id">ID: {prod.id}</div>
                    </div>
                  </td>
                  <td>
                    <div className="price-table">
                      <span>{currencyBRL(prod.price)}</span>
                      {prod.oldPrice && <small className="old">{currencyBRL(prod.oldPrice)}</small>}
                    </div>
                  </td>
                  <td>{prod.stockQty ?? '—'}</td>
                  <td>{prod.unitsSold}</td>
                  <td><StarRating value={prod.rating} /></td>
                  <td>
                    <div className="category-cell">
                      <span>{prod.category}</span>
                      <small className="muted">{prod.subcategory}</small>
                    </div>
                  </td>
                  <td>
                    <div className="actions">
                      <a href={'edit?productID='+prod.id} rel="noreferrer" className="linkish">Editar</a>
                      <button onClick={()=>handleDelete(prod.id)} className="linkish danger">Excluir</button>
                      <a href={prod.url} target="_blank" rel="noreferrer" className="linkish">Ver</a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
