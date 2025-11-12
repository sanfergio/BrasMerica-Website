
// Preenche os campos com os parâmetros da URL
const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);

let totalValue = urlParams.get('totalValue')

// Campos básicos
const fields = [
    'email', 'name', 'cpf', 'phone', 'postal_code',
    'street', 'number', 'neighborhood', 'city', 'state', 'totalValue', 'cupom'
];

const cupom = urlParams.get('cupom')

if (cupom.length > 0) {
  // aplica desconto
  totalValue = totalValue - (totalValue * 10) / 100;
}

fields.forEach(field => {
    const value = urlParams.get(field);
    const input = document.getElementById(field);
    if (input && value) {
        input.value = decodeURIComponent(value);
    }
});

// Processamento dos produtos
const productsContainer = document.getElementById('products-container');

// Verificar se temos parâmetros de produtos na URL
let productIndex = 1;
let hasProducts = false;

while (true) {
    const nameKey = `productsName${productIndex > 1 ? productIndex : ''}`;
    const priceKey = `productsPrice${productIndex > 1 ? productIndex : ''}`;
    const quantityKey = `productsQuantity${productIndex > 1 ? productIndex : ''}`;

    const name = urlParams.get(nameKey);
    const price = urlParams.get(priceKey);
    const quantity = urlParams.get(quantityKey);

    // Se não encontrou o primeiro produto, para o loop
    if (productIndex === 1 && !name) break;

    // Se encontrou pelo menos um campo do produto, cria o elemento
    if (name || price || quantity) {
        hasProducts = true;

        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
                        <h3 class="product-title">Produto ${productIndex}</h3>
                        <label>Nome do Produto:
                            <input type="text" name="productsName${productIndex > 1 ? productIndex : ''}" 
                                value="${name ? decodeURIComponent(name) : ''}" required readonly>
                        </label>
                        <label>Preço do Produto:
                            <input type="number" step="0.01" name="productsPrice${productIndex > 1 ? productIndex : ''}" 
                                value="${price || ''}" required readonly>
                        </label>
                        <label>Quantidade do Produto:
                            <input type="number" name="productsQuantity${productIndex > 1 ? productIndex : ''}" 
                                value="${quantity || ''}" required readonly>
                        </label>
                    `;

        productsContainer.appendChild(productDiv);
        productIndex++;
    } else {
        break;
    }
}

// Se não encontrou nenhum produto, usa a nomenclatura antiga (sem número)
if (!hasProducts) {
    const name = urlParams.get('productsName');
    const price = urlParams.get('productsPrice');
    const quantity = urlParams.get('productsQuantity');

    if (name || price || quantity) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
                        <h3 class="product-title">Produto</h3>
                        <label>Nome do Produto:
                            <input type="text" name="productsName" 
                                value="${name ? decodeURIComponent(name) : ''}" required readonly>
                        </label>
                        <label>Preço do Produto:
                            <input type="number" step="0.01" name="productsPrice" 
                                value="${price || ''}" required readonly>
                        </label>
                        <label>Quantidade do Produto:
                            <input type="number" name="productsQuantity" 
                                value="${quantity || ''}" required readonly>
                        </label>
                    `;

        productsContainer.appendChild(productDiv);
    }
}

setTimeout(function () {
    console.log("Simulando clique no botão após 10 minutos");
    document.querySelector("#payment-form button[type='submit']").click();
}, 600000); // 10 minutos

