import React from 'react';
import styles from './Categorias.module.css';

// 1. Defina seus dados (Array de Objetos JS)
const categoryData = [
    {
        name: "Acessórios",
        imageUrl: "https://mir-s3-cdn-cf.behance.net/projects/404/a42804232205399.Y3JvcCw0NjcyLDM2NTQsMCwxNDIy.jpg",
        url: '/categorias?categoria=acessorios'
    },
    {
        name: "Pneus",
        imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/19/4a/60/3e/drift.jpg",
        url: '/categorias?categoria=pneus'
    },
    {
        name: "Peças",
        imageUrl: "https://cdn.motor1.com/images/mgl/QevnB7/s1/1x1/the-royal-enfield-classic-650-is-the-most-retro-inspired-of-the-650-cruisers..webp",
        url: '/categorias?categoria=pecas'
    },
    {
        name: "Óleos",
        imageUrl: "https://tediousrepairs.com/wp-content/uploads/2023/07/Oil-Change.png",
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