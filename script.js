let saldo = 500;
let total = 0;

// Formata valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Atualiza o saldo e o total gasto na tela
function atualizarTela() {
    document.getElementById("saldo").textContent =
        formatarMoeda(saldo);

    document.getElementById("total").textContent =
        formatarMoeda(total);
}

// Adiciona dinheiro ao saldo
function adicionarDinheiro() {
    const descricao = document
        .getElementById("descricaoEntrada")
        .value.trim();

    const valor = Number(
        document.getElementById("valorEntrada").value
    );

    if (descricao === "" || !Number.isFinite(valor) || valor <= 0) {
        alert("Preencha a descrição e informe um valor maior que zero!");
        return;
    }

    // Aumenta o saldo
    saldo += valor;

    // Registra a entrada no histórico
    registrarMovimentacao(descricao, valor, true);

    // Limpa os campos
    document.getElementById("descricaoEntrada").value = "";
    document.getElementById("valorEntrada").value = "";

    atualizarTela();
}

// Adiciona um gasto
function adicionarGasto() {
    const descricao = document
        .getElementById("descricao")
        .value.trim();

    const valor = Number(
        document.getElementById("valor").value
    );

    if (descricao === "" || !Number.isFinite(valor) || valor <= 0) {
        alert("Preencha a descrição e informe um valor maior que zero!");
        return;
    }

    // Diminui o saldo e aumenta o total gasto
    saldo -= valor;
    total += valor;

    // Registra a saída no histórico
    registrarMovimentacao(descricao, valor, false);

    // Limpa os campos
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";

    atualizarTela();
}

// Registra entradas e saídas no histórico
function registrarMovimentacao(descricao, valor, ehEntrada) {
    const lista = document.getElementById("listaGastos");

    const movimentacao = document.createElement("div");
    movimentacao.classList.add("movimentacao");

    const nome = document.createElement("span");
    nome.textContent = descricao;

    const valorElemento = document.createElement("span");

    if (ehEntrada) {
        movimentacao.classList.add("entrada");
        valorElemento.textContent = "+ " + formatarMoeda(valor);
    } else {
        movimentacao.classList.add("saida");
        valorElemento.textContent = "- " + formatarMoeda(valor);
    }

    movimentacao.appendChild(nome);
    movimentacao.appendChild(valorElemento);

    // Coloca a movimentação mais recente no início
    lista.prepend(movimentacao);
}

// Exibe os valores iniciais
atualizarTela();