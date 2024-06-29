const carteira = [];

class Parcela {
    constructor(valor, proxima = null) {
        this.valor = valor;
        this.proxima = proxima;
    }
}

class OperacaoParcelasObj {
    constructor(cliente, produto, fluxo_parcelas) {
        this.cliente = cliente;
        this.produto = produto;
        this.fluxo_parcelas = fluxo_parcelas;
    }
}

class RelatorioParcelas {
    constructor () {}

    relatorio(opParcelas) {
        console.log(`Cliente: ${opParcelas.cliente}. Produto: ${opParcelas.produto}`);
        let nro = 1;
        let loop = true;
        let parcela = opParcelas.fluxo_parcelas;
        while (loop) {
            console.log(`Valor da parcela ${nro}: ${parcela.valor}`);
            parcela = parcela.proxima;
            nro += 1;
            loop = (parcela != null);
        }
    }
}

class OperacaoConsolidadaObj {
    constructor (cliente, produto, valor, nro_parcelas, prazo_medio) {
        this.cliente = cliente;
        this.produto = produto;
        this.valor = valor;
        this.nro_parcelas = nro_parcelas;
        this.prazo_medio = prazo_medio;
    }
}

class RelatorioConsolidado {
    constructor() {}

    relatorio(objConsolidado) {
        console.log(`Cliente: ${objConsolidado.cliente}. Produto: ${objConsolidado.produto}`);
        console.log(`Valor Total: ${objConsolidado.valor}. Nro Parcelas: ${objConsolidado.nro_parcelas}. Prazo médio: ${objConsolidado.prazo_medio}`);
    }
}

class RelatorioAdapter {
    constructor () {}

    relatorio(opParcelas) {
        let nro = 1;
        let total = 0;
        let prazo_medio = 0;
        let loop = true;
        let parcela = opParcelas.fluxo_parcelas;
        while (loop) {
            total += parcela.valor;
            prazo_medio += nro*parcela.valor;
            parcela = parcela.proxima;
            nro += 1;
            loop = (parcela != null);
        }

        prazo_medio = prazo_medio/total;
        console.log(`Cliente: ${opParcelas.cliente}. Produto: ${opParcelas.produto}`);
        console.log(`Valor Total: ${total}. Nro Parcelas: ${nro}. Prazo médio: ${prazo_medio}`);
    }
}

let parcela_inicial = new Parcela(10000);
let parcela = new Parcela(20000);
parcela_inicial.proxima = parcela;
for (let i = 3; i < 13; i++) {
    let valor = i * 10000;
    parcela.proxima = new Parcela(valor);
    parcela = parcela.proxima;
}

carteira.push(new OperacaoParcelasObj("Empresa1", "Empréstimo", parcela_inicial));
carteira.push(new OperacaoConsolidadaObj("Empresa2", "Empréstimo", 50000, 12, 15.5));

const relatorioParcelas = new RelatorioParcelas();
const relatorioConsolidado = new RelatorioConsolidado();
const relatorioAdapter = new RelatorioAdapter();

relatorioParcelas.relatorio(carteira[0]);
relatorioConsolidado.relatorio(carteira[1]);
relatorioAdapter.relatorio(carteira[0]);