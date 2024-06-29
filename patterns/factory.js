class ProdutoBancario {
    constructor(cliente, valor, parcelas) {
        this.cliente = cliente;
        this.valor = valor;
        this.parcelas = parcelas;
    }

    conferir_posicao() {
        console.log("Posição operação", this.cliente);
        console.log(this.valor);
    }

    liberar() {
        console.log("Valor liberado no caixa");
    }

    liquida_parcela(valor) {
        this.valor = this.valor - valor;
    }
  }

class CCB extends ProdutoBancario {
    constructor(cliente, valor, parcelas) {
        super(cliente, valor, parcelas);
    }

    conferir_posicao() {
        console.log("Posição CCB", this.cliente);
        console.log(this.valor);
    }
}

class Fianca extends ProdutoBancario {
    constructor(cliente, valor, valor_comissao, comissoes) {
        super(cliente, valor, 1);
        this.valor_comissao = valor_comissao;
        this.comissoes = comissoes;
    }

    conferir_posicao() {
        console.log("Posição fiança", this.cliente);
        console.log(this.valor);
        console.log("Valor comissão a receber", this.cliente);
        console.log(this.valor_comissao);
    }

    liquida_comissao(valor) {
        this.valor_comissao = this.valor_comissao - valor;
    }
}

class Proposta {
    constructor(cliente) {
        this.cliente = cliente
    }

    assina_contrato() {}
}

class PropostaCCB extends Proposta {
    constructor(cliente) {
        super(cliente);
    }

    assina_contrato(valor, parcelas) {
        let CCBAssinada = new CCB(this.cliente, valor, parcelas);
        CCBAssinada.liberar();
        return CCBAssinada;
    }
}

class PropostaFianca extends Proposta {
    constructor(cliente) {
        super(cliente);
    }

    assina_contrato(valor, valor_comissao, comissoes) {
        let fiancaAssinada = new Fianca(this.cliente, valor, valor_comissao, comissoes); 
        return fiancaAssinada
    }
}


propostaCCBEmpresa1 = new PropostaCCB("Empresa1");
propostaFiancaEmpresa2 = new PropostaFianca("Empresa2");

CCBEmpresa1 = propostaCCBEmpresa1.assina_contrato(5000000, 12);
FiancaEmpresa2 = propostaFiancaEmpresa2.assina_contrato(6000000, 60000, 12);

CCBEmpresa1.conferir_posicao();
FiancaEmpresa2.conferir_posicao();

CCBEmpresa1.liquida_parcela(1000000);
FiancaEmpresa2.liquida_comissao(10000);

CCBEmpresa1.conferir_posicao();
FiancaEmpresa2.conferir_posicao();