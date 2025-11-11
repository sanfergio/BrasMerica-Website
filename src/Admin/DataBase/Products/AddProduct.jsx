import React, { useState } from 'react'; // Removido 'useEffect' que não era mais necessário
import styles from './DashboardProducts.module.css';

// Inicializa o cliente Supabase
import SupabaseClient from "../../../components/KEYS/App.jsx";

const supabase = SupabaseClient;

// Estado inicial para um novo produto
// Removi a 'url' daqui, pois ela será definida após o submit
const initialState = {
    name: '',
    price: 0,
    oldprice: 0,
    category: 0,
    subcategory: '',
    disponible: true,
    stockqty: 0,
    rating: 0,
    reviewcount: 0,
    unitssold: 0,
    // url: '', // Não precisamos mais disso no estado inicial
    img1: '',
    img2: '',
    img3: '',
    tags: '',
    shortdesc: '',
    longdesc: '',
    company_name: ''
};

// Removi o 'useEffect' e 'generateSlug'
// Eles não são mais necessários, pois a URL não depende mais do 'name'.

export default function AddProduct() {
    const [product, setProduct] = useState(initialState);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    // Manipulador genérico para campos do formulário
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Enviar o novo produto para o Supabase
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;

        setSaving(true);
        setMessage('');
        setError(null);

        // 1. Mapeia o estado do formulário
        // Note que 'url' NÃO está incluído aqui
        const newProduct = {
            name: product.name,
            price: Number(product.price),
            oldprice: Number(product.oldprice) || null,
            category: product.category,
            subcategory: product.subcategory,
            disponible: product.disponible ? '0' : '1',
            stockqty: Number(product.stockqty),
            rating: Number(product.rating),
            reviewcount: Number(product.reviewcount),
            unitssold: Number(product.unitssold),
            img1: product.img1,
            img2: product.img2,
            img3: product.img3,
            tags: product.tags,
            shortdesc: product.shortdesc,
            longdesc: product.longdesc,
            company_name: product.company_name || "Sem marca"
        };

        try {
            // =================================================================
            // ETAPA 1 e 2: Inserir o produto E receber o ID de volta
            // Usamos .select() para pedir ao Supabase o registro recém-criado
            // =================================================================
            const { data: insertedData, error: insertError } = await supabase
                .from('DBproducts')
                .insert([newProduct])
                .select('id') // Pede para retornar APENAS o ID do novo produto
                .single(); // Espera um único objeto, não um array

            if (insertError) throw insertError;
            if (!insertedData || !insertedData.id) {
                throw new Error("Falha ao criar o produto ou obter o ID.");
            }

            const newID = insertedData.id;
            
            // =================================================================
            // ETAPA 3: Construir a URL e Atualizar o registro
            // =================================================================
            const finalUrl = `https://www.brasmerica.com.br/produtos?productID=${newID}`;

            const { error: updateError } = await supabase
                .from('DBproducts')
                .update({ url: finalUrl }) // Salva a URL final...
                .eq('id', newID);          // ...no produto com o ID que acabamos de criar.

            if (updateError) throw updateError;


            setMessage('Produto adicionado com sucesso! Redirecionando...');
            setProduct(initialState); // Limpa o formulário

            // Redireciona de volta ao dashboard após 2 segundos
            setTimeout(() => {
                window.location.href = '/admin/dataBase/products/';
            }, 2000);

        } catch (err) {
            console.error('Erro ao adicionar produto:', err);
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.dashboardModern}>
            {/* Header */}
            <header className={styles.topbar}>
                <div className={styles.brand}>
                    <div className={styles.logo}>BM</div>
                    <div>
                        <h1>Adicionar Novo Produto</h1>
                        <p>Preencha os detalhes do novo item</p>
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

                        {/* --- Campos de Descrição --- */}
                        <label className={styles.span2}>
                            Descrição Curta (shortdesc)
                            <input type="text" name="shortdesc" value={product.shortdesc} onChange={handleChange} required />
                        </label>
                        <label className={styles.span2}>
                            Descrição Longa (longdesc)
                            <textarea name="longdesc" value={product.longdesc} onChange={handleChange} rows="5" required></textarea>
                        </label>

                        <label>
                            Preço (R$)
                            <input type="number" name="price" value={product.price} onChange={handleChange} step="0.01" min="0" required />
                        </label>
                        <label>
                            Preço Antigo (R$)
                            <input type="number" name="oldprice" value={product.oldprice} onChange={handleChange} step="0.01" min="0" required />
                        </label>

                        {/* --- Categorias --- */}
                        <label>
                            Categoria
                            <input type="text" name="category" value={product.category} onChange={handleChange} required />
                        </label>
                        <label>
                            Subcategoria
                            <input type="text" name="subcategory" value={product.subcategory} onChange={handleChange} required />
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

                        {/* --- Mídia e Links --- */}
                        <label className={styles.span2}>
                            URL da Página do Produto
                            {/* Alterei este campo.
                                Ele agora está 'disabled' e tem um 'placeholder'
                                para informar ao usuário que a URL é automática.
                            */}
                            <input 
                                type="text" 
                                name="url" 
                                value="" 
                                placeholder="Será gerada automaticamente após salvar (ex: ...?productID=123)"
                                readOnly 
                                disabled
                                style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                            />
                        </label>
                        <label>
                            URL Imagem 1
                            <input type="url" name="img1" value={product.img1} onChange={handleChange} placeholder="https://..." required />
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
                            Tags (separadas por vírgula)
                            <input type="text" name="tags" value={product.tags} onChange={handleChange} />
                        </label>
                    </div>

                    {/* --- Ações do Formulário --- */}
                    <div className={styles.formActions}>
                        {message && <span style={{ color: 'green' }}>{message}</span>}
                        {error && <span className={styles.danger}>{error}</span>}
                        <a href="/admin/dataBase/products/" className={styles.btnSecondary}>Cancelar</a>
                        <button type="submit" className={styles.btnPrimary} disabled={saving}>
                            {saving ? 'Adicionando...' : 'Adicionar Produto'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}