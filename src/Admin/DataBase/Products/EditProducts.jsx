import React, { useState, useEffect } from 'react';
import styles from './DashboardProducts.module.css'; // Reutilizando os mesmos estilos

// Inicializa o cliente Supabase
import SupabaseClient from "../../../components/KEYS/App.jsx";

const supabase = SupabaseClient;

// Estado inicial para um novo formulário ou enquanto carrega
const initialState = {
    name: '',
    price: 0,
    oldprice: 0,
    category: '',
    subcategory: '',
    disponible: 0,
    stockqty: 0,
    rating: 0,
    reviewcount: 0,
    unitssold: 0,
    url: '',
    img1: '',
    img2: '',
    img3: '',
    tags: '',
    shortdesc: '', // Novo campo
    longdesc: '',  // Novo campo
    company_name: ''
};

export default function EditProduct() {
    const [product, setProduct] = useState(initialState);
    const [productId, setProductId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    // 1. Buscar o ID do produto da URL e carregar os dados
    useEffect(() => {
        // Pega o ID da URL (ex: ?productID=123)
        const params = new URLSearchParams(window.location.search);
        const id = params.get('productID');

        if (!id) {
            setError('Nenhum ID de produto fornecido.');
            setLoading(false);
            return;
        }

        setProductId(id);

        async function fetchProduct() {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('DBproducts')
                    .select('*')
                    .eq('id', id)
                    .single(); // Espera um único resultado

                if (error) throw error;

                if (data) {
                    // Mapeia os dados do banco (ex: 'oldprice') para o estado do formulário
                    setProduct({
                        name: data.name || '',
                        price: Number(data.price) || 0,
                        oldprice: Number(data.oldprice) || 0,
                        category: data.category || '',
                        subcategory: data.subcategory || '',
                        disponible: data.disponible === '0' || data.disponible === 0,
                        stockqty: Number(data.stockqty) || 0,
                        rating: Number(data.rating) || 0,
                        reviewcount: Number(data.reviewcount) || 0,
                        unitssold: Number(data.unitssold) || 0,
                        url: data.url || '',
                        img1: data.img1 || '',
                        img2: data.img2 || '',
                        img3: data.img3 || '',
                        tags: data.tags || '',
                        shortdesc: data.shortdesc || '', // Novo campo
                        longdesc: data.longdesc || '',   // Novo campo
                        company_name: data.company_name || ''
                    });
                } else {
                    setError(`Produto com ID ${id} não encontrado.`);
                }
            } catch (err) {
                console.error('Erro ao buscar produto:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, []);

    // 2. Manipulador genérico para campos do formulário
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // 3. Salvar as alterações
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;

        setSaving(true);
        setMessage('');
        setError(null);

        // Mapeia o estado do formulário de volta para o formato do banco
        const updates = {
            name: product.name,
            price: Number(product.price),
            oldprice: Number(product.oldprice) || null, // Salva 0 como nulo se preferir
            category: product.category,
            subcategory: product.subcategory,
            disponible: product.disponible ? '0' : '1',
            stockqty: Number(product.stockqty),
            rating: Number(product.rating),
            reviewcount: Number(product.reviewcount),
            unitssold: Number(product.unitssold),
            url: product.url,
            img1: product.img1,
            img2: product.img2,
            img3: product.img3,
            tags: product.tags,
            shortdesc: product.shortdesc, // Novo campo
            longdesc: product.longdesc,   // Novo campo
            company_name: product.company_name || "Sem marca"
        };

        try {
            const { error } = await supabase
                .from('DBproducts')
                .update(updates)
                .eq('id', productId);

            if (error) throw error;

            setMessage('Produto salvo com sucesso!');
        } catch (err) {
            console.error('Erro ao salvar produto:', err);
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    // 4. Renderização
    if (loading) return <div>Carregando dados do produto...</div>;
    if (error) return <div className={styles.danger}>Erro: {error}</div>;

    return (
        <div className={styles.dashboardModern}>
            {/* Header similar ao do Dashboard */}
            <header className={styles.topbar}>
                <div className={styles.brand}>
                    <div className={styles.logo}>BM</div>
                    <div>
                        <h1>Editar Produto</h1>
                        <p>Modifique os detalhes do item</p>
                    </div>
                </div>
                <div className={styles.topActions}>
                    <a style={{ color: 'white' }} href="/admin/dataBase/products/" className={styles.btn}>Voltar ao Dashboard</a>
                </div>
            </header>

            {/* Conteúdo principal com o formulário */}
            <main className={styles.content}>
                <form onSubmit={handleSubmit} className={styles.tableWrapper}>
                    <div className={styles.formGrid}>

                        {/* --- Campos Principais --- */}
                        <label className={styles.span2}>
                            Nome do Produto
                            <input type="text" name="name" value={product.name} onChange={handleChange} required />
                        </label>

                        {/* --- NOVOS CAMPOS DE DESCRIÇÃO --- */}
                        <label className={styles.span2}>
                            Descrição Curta (shortdesc)
                            <input type="text" name="shortdesc" value={product.shortdesc} onChange={handleChange} />
                        </label>
                        <label className={styles.span2}>
                            Descrição Longa (longdesc)
                            <textarea name="longdesc" value={product.longdesc} onChange={handleChange} rows="5"></textarea>
                        </label>
                        {/* --- FIM DOS NOVOS CAMPOS --- */}

                        <label>
                            Preço (R$)
                            <input type="number" name="price" value={product.price} onChange={handleChange} step="0.01" min="0" />
                        </label>
                        <label>
                            Preço Antigo (R$)
                            <input type="number" name="oldprice" value={product.oldprice} onChange={handleChange} step="0.01" min="0" />
                        </label>

                        {/* --- Categorias --- */}
                        <label>
                            Categoria
                            <input type="text" name="category" value={product.category} onChange={handleChange} />
                        </label>
                        <label>
                            Subcategoria
                            <input type="text" name="subcategory" value={product.subcategory} onChange={handleChange} />
                        </label>

                        <label>
                            Nome da Empresa / Marca
                            <input type="text" name="company_name" value={product.company_name} onChange={handleChange} placeholder="Sem marca" />
                        </label>
                        
                        {/* --- Estoque e Vendas --- */}
                        <label>
                            Qtd. em Estoque
                            <input type="number" name="stockqty" value={product.stockqty} onChange={handleChange} min="0" />
                        </label>
                        <label className={styles.checkboxInline}>
                            <input type="checkbox" name="disponible" checked={product.disponible} onChange={handleChange} />
                            Produto Disponível pra Venda?
                        </label>
                        <label>
                            Unidades Vendidas (Read-only)
                            <input type="number" name="unitssold" value={product.unitssold} readOnly disabled />
                        </label>

                        {/* --- Avaliação --- */}
                        <label>
                            Avaliação (0-5) (Read-only)
                            <input type="number" name="rating" value={product.rating} onChange={handleChange} step="0.1" min="0" max="5" readOnly disabled />
                        </label>
                        <label>
                            Qtd. de Avaliações (Read-only)
                            <input type="number" name="reviewcount" value={product.reviewcount} readOnly disabled />
                        </label>
                        <label>
                            ID do Produto (Read-only)
                            <input type="text" value={productId} readOnly disabled />
                        </label>

                        {/* --- Mídia e Links --- */}
                        <label className={styles.span2}>
                            URL da Página do Produto (Read-only)
                            <input type="url" name="url" value={product.url} onChange={handleChange} placeholder="https://..." readOnly disabled />
                        </label>
                        <label>
                            URL Imagem 1
                            <input type="url" name="img1" value={product.img1} onChange={handleChange} placeholder="https://..." />
                        </label>
                        <label>
                            URL Imagem 2
                            <input type="url" name="img2" value={product.img2} onChange={handleChange} placeholder="https://..." />
                        </label>
                        <label>
                            URL Imagem 3
                            <input type="url" name="img3" value={product.img3} onChange={handleChange} placeholder="https://..." />
                        </label>
                        <label className={styles.span2}>
                            Tags / Palavras Chaves (separadas por vírgula)
                            <input type="text" name="tags" value={product.tags} onChange={handleChange} />
                        </label>
                    </div>

                    {/* --- Ações do Formulário --- */}
                    <div className={styles.formActions}>
                        {message && <span style={{ color: 'green' }}>{message}</span>}
                        {error && <span className={styles.danger}>{error}</span>}

                        <a href="/admin/dataBase/products/" className={styles.btnSecondary}>Cancelar</a>
                        <button type="submit" className={styles.btnPrimary} disabled={saving}>
                            {saving ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}