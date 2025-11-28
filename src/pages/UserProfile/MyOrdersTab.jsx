import { Truck, CreditCard } from 'lucide-react';
import styles from "./UserProfile.module.css";

const mockOrders = [
  {
    id: "ORD-2024-001",
    transactionId: "TXN-ABC123456",
    status: "preparing",
    statusLabel: "Preparando",
    products: [
      { name: "Óleo Verde", price: 1999.99, image: "https://s3.us-east-2.amazonaws.com/main.s3.atacadaoec.astrus/tb_estrutura_produtos/1096/20w50-moto-4t_025d8e45ae91880bd9b27e9ffbfaaaa6.webp" },
      { name: "Óleo Preto", price: 49.99, image: "https://cdn.awsli.com.br/600x450/877/877231/produto/43792412/20w50-5000--wwsx9lx0er.png" }
    ],
    total: 2049.98
  },
  {
    id: "ORD-2024-002",
    transactionId: "TXN-DEF789012",
    status: "on-the-way",
    statusLabel: "A caminho",
    products: [
      { name: "Óleo Cinza", price: 299.99, image: "https://io.convertiez.com.br/m/sbsmotos/shop/products/images/5813578/medium/oleo-mobil-4t-10w30-mx-para-moto-honda_586.png" }
    ],
    total: 299.99
  },
  {
    id: "ORD-2024-003",
    transactionId: "TXN-GHI345678",
    status: "delivered",
    statusLabel: "Entregue",
    products: [
      { name: "Óleo Amarelo", price: 899.99, image: "https://images.tcdn.com.br/img/img_prod/1039962/oleo_para_moto_lubrax_10w30_4t_api_sl_1l_1819_1_f9a4cf28e6c2202c4b58043c6fb01e12.png" },
      { name: "Óleo Vermelho", price: 79.99, image: "https://images.tcdn.com.br/img/img_prod/589388/oleo_mineral_4t_10w30_moto_injetada_original_ipiranga_27129_1_9c7caadcea7e7772e9ceee38b8706376.png" }
    ],
    total: 979.98
  },
  {
    id: "ORD-2024-004",
    transactionId: "TXN-JKL901234",
    status: "canceled",
    statusLabel: "Cancelado",
    products: [
      { name: "Óleo Branco", price: 2499.99, image: "https://images.tcdn.com.br/img/img_prod/681364/oleo_honda_10w30_semi_sintetico_4t_1l_1233_1_b569571204f7551c470c2b8e52c86d17.jpg" }
    ],
    total: 2499.99
  },
  {
    id: "ORD-2024-005",
    transactionId: "TXN-MNO567890",
    status: "refunded",
    statusLabel: "Reembolsado",
    products: [
      { name: "Óleo Azul", price: 149.99, image: "https://m.magazineluiza.com.br/a-static/420x420/oleo-moto-motor-4t-20w50-titan-fan-cg-125-150-biz-100-biz125-gulf/vitoriarepresentante/1511ee/9128cca3a308ed38c33d957d27934278.jpeg" }
    ],
    total: 149.99
  }
];

export default function MyOrdersTab({ useMock, realOrders }) {
  const ordersToDisplay = useMock ? mockOrders : (realOrders || []);

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Meus pedidos</h1>
      <div className={styles.ordersContainer}>
        {Array.isArray(ordersToDisplay) && ordersToDisplay.length > 0 ? (
          ordersToDisplay.map((order) => (
            <div key={order.id || order.transactionId} className={`${styles.orderCard} ${styles[order.status] || ""}`}>
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <div className={styles.infoRow}>
                    <CreditCard className={styles.infoIcon} size={16} />
                    <span className={styles.transactionId}>{order.transactionId || "—"}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <Truck className={styles.infoIcon} size={16} />
                    <span className={styles.trackingCode}>{order.id || "—"}</span>
                  </div>
                </div>
                <span className={`${styles.orderStatus} ${styles[`status-${order.status}`] || ""}`}>
                  {order.statusLabel || order.status || "—"}
                </span>
              </div>

              <div className={styles.orderProducts}>
                {(order.products || []).map((product, index) => (
                  <div key={index} className={styles.productItem}>
                    <img 
                      src={product.image || "/placeholder.svg"} 
                      alt={product.name || "Produto"}
                      className={styles.productImage}
                    />
                    <span className={styles.productName}>{product.name || "Produto"}</span>
                    <span className={styles.productPrice}>
                      R$ {typeof product.price === "number" ? product.price.toFixed(2) : (product.price || "0.00")}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.orderTotal}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalValue}>R$ {typeof order.total === "number" ? order.total.toFixed(2) : (order.total || "0.00")}</span>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.shortMessage}>Você ainda não fez nenhum pedido.</p>
        )}
      </div>
    </div>
  );
}