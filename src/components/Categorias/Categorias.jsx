import React from 'react';
import styles from './Categorias.module.css';

// 1. Defina seus dados (Array de Objetos JS)
const categoryData = [
    {
        name: "Acessórios",
        imageUrl: "https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/Gemini_Generated_Image_xpckvxpckvxpckvx.png?raw=true",
        url: '/categorias?categoria=acessorios'
    },
    {
        name: "Pneus",
        imageUrl: "https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/Gemini_Generated_Image_6k06q36k06q36k06.png?raw=true",
        url: '/categorias?categoria=pneus'
    },
    {
        name: "Peças",
        imageUrl: "https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/Gemini_Generated_Image_gdwyv9gdwyv9gdwy.png?raw=true",
        url: '/categorias?categoria=pecas'
    },
    {
        name: "Óleos",
        imageUrl: "https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/Gemini_Generated_Image_66bu5366bu5366bu.png?raw=true",
        url: '/categorias?categoria=oleos'
    }
];

function Categories() {
    return (
        <div className={styles.categories}>
            {/* 2. Use o método .map() para iterar sobre os dados */}
            {categoryData.map((category) => (
                // 3. Renderize um 'category-item' para cada objeto
                // A prop 'key' é essencial no React para listas!
                <a href={category.url} key={category.name} className={styles.categoryItem}>
                    <img src={category.imageUrl} alt={`Imagem da categoria ${category.name}`} />
                    <h4>{category.name}</h4>
                </a>
            ))}
        </div>
    );
}

export default Categories;