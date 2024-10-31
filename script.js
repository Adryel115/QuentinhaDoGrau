let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let total = carrinho.reduce((acc, item) => acc + item.preco, 0);

function adicionarAoCarrinho(item, preco) {
    carrinho.push({ item, preco });
    total += preco;
    atualizarCarrinho();
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function atualizarCarrinho() {
    const itensCarrinho = document.getElementById("itensCarrinho");
    if (itensCarrinho) {
        itensCarrinho.innerHTML = '';

        carrinho.forEach((produto, index) => {
            itensCarrinho.innerHTML += `<p>${produto.item} - R$ ${produto.preco.toFixed(2)} <button onclick="removerDoCarrinho(${index})">Remover</button></p>`;
        });

        document.getElementById("totalCarrinho").innerText = total.toFixed(2);
    }
    atualizarQuantidadeCarrinho();
}

function removerDoCarrinho(index) {
    total -= carrinho[index].preco;
    carrinho.splice(index, 1);
    atualizarCarrinho();
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Compra finalizada! Total: R$ " + total.toFixed(2));
    carrinho = [];
    total = 0;
    localStorage.removeItem('carrinho');
    atualizarCarrinho();
}

// Imprimir Nota Fiscal
function imprimirNotaFiscal() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Não é possível imprimir a nota fiscal.");
        return;
    }

    let notaFiscal = `<h1>Nota Fiscal</h1>`;
    notaFiscal += `<h2>Itens Comprados:</h2><ul>`;
    
    carrinho.forEach(produto => {
        notaFiscal += `<li>${produto.item} - R$ ${produto.preco.toFixed(2)}</li>`;
    });

    notaFiscal += `</ul>`;
    notaFiscal += `<h3>Total: R$ ${total.toFixed(2)}</h3>`;

    const novaJanela = window.open('', '_blank');
    novaJanela.document.write(`<html><head><title>Nota Fiscal</title></head><body>${notaFiscal}</body></html>`);
    novaJanela.document.close();
    novaJanela.print();
}

// Atualiza a quantidade de itens no carrinho
function atualizarQuantidadeCarrinho() {
    const quantidadeCarrinho = document.getElementById("quantidadeCarrinho");
    if (quantidadeCarrinho) {
        quantidadeCarrinho.innerText = carrinho.length; // Atualiza o texto com a quantidade de itens
    }
}

// Atualiza o carrinho na página do carrinho
document.addEventListener("DOMContentLoaded", () => {
    atualizarCarrinho();
    atualizarQuantidadeCarrinho(); // Chama na inicialização também
});