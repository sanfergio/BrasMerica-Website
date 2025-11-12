
// Preenche os campos com os parâmetros da URL
const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);

let totalValue = urlParams.get('totalValue')

const cupom = urlParams.get('cupom')

if (cupom.length > 0) {
  // aplica desconto
  totalValue = totalValue - (totalValue * 10) / 100;
}

// Campos básicos
const fields = [
    'email', 'name', 'cpf', 'phone', 'postal_code',
    'street', 'number', 'neighborhood', 'city', 'state', 'totalValue', 'cupom'
];

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


let card_type = document.getElementById("card-selected");
let insertSplit = document.getElementById("insertSplit");

function atualizarParcelas(totalValue) {
    totalValue = parseFloat(totalValue);

    if (card_type.value === "2") {
        insertSplit.innerHTML = `
            <div class="form-group">
                <label for="installments">Parcelas</label>
                <select id="installments" name="installments" required>
                    <option value="">Selecione o número de parcelas</option>
                    <option value="1">1x de R$ ${totalValue.toFixed(2)} sem juros</option>
                    <option value="2">2x de R$ ${(totalValue / 2).toFixed(2)} sem juros</option>
                    <option value="3">3x de R$ ${(totalValue / 3).toFixed(2)} sem juros</option>
                </select>
            </div>
        `;
    } else {
        insertSplit.innerHTML = ""; // limpa se não for crédito
        console.log("Débito Selecionado!");
    }
}

// exemplo: escutando mudança no select de tipo do cartão
card_type.addEventListener("change", function () {
    atualizarParcelas(totalValue);
});

// se quiser já rodar ao carregar
atualizarParcelas(totalValue);

document.getElementById("payment-form").addEventListener("submit", function (e) {
    // SEMPRE bloqueia envio
    const cardType = document.getElementById("card-selected").value;
    const cardNumber = document.getElementById("card-number").value.replace(/\D/g, "");
    const cardName = document.getElementById("card-name").value.trim();
    const month = parseInt(document.getElementById("expiry-date-month").value, 10);
    const year = parseInt(document.getElementById("expiry-date-year").value, 10);
    const cvv = document.getElementById("cvv").value.trim();
    const cpf = document.getElementById("cpf2").value.replace(/\D/g, "");

    if (!cardType) {
        alert("Selecione Débito ou Crédito.");

    }
    if (!isValidCardNumber(cardNumber)) {
        alert("Número do cartão inválido.");
        e.preventDefault();
    }
    if (cardName.length < 5) {
        alert("Digite o nome do titular corretamente.");
        e.preventDefault();
    }
    if (!isValidExpiry(month, year)) {
        alert("Data de validade inválida ou vencida.");
        e.preventDefault();
    }
    if (!/^\d{3,4}$/.test(cvv)) {
        alert("CVV inválido.");
        e.preventDefault();
    }
    if (!isValidCPF(cpf)) {
        alert("CPF inválido.");
        e.preventDefault();
    }

});

// funções de validação
function isValidCardNumber(num) {
    if (num.length < 13 || num.length > 19) return false;
    let sum = 0, alternate = false;
    for (let i = num.length - 1; i >= 0; i--) {
        let n = parseInt(num[i], 10);
        if (alternate) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        sum += n;
        alternate = !alternate;
    }
    return (sum % 10 === 0);
}

function isValidExpiry(month, year) {
    if (month < 1 || month > 12) return false;
    const now = new Date();
    const expiry = new Date(year, month - 1, 1);
    expiry.setMonth(expiry.getMonth() + 1);
    return expiry > now;
}

function isValidCPF(cpf) {
    if (!/^\d{11}$/.test(cpf)) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}