class Cliente {
    constructor(cliente, limite_valor, limite_operacoes) {
        this.cliente = cliente;
        this.limite_valor = limite_valor;
        this.valor = 0;
        this.limite_operacoes = limite_operacoes;
        this.nro_operacoes = 0;
        this.operacoes = [];
    }

    adiciona_operacao(operacao) {
        this.operacoes.push(operacao);
        this.valor += operacao["valor"];
        this.nro_operacoes += 1;
    }

    adiciona_limite_disponivel(valor) {
        this.valor -= valor;
    } 

    check_limite_valor(valor) {
        return (this.valor + valor) <= this.limite_valor
    }

    check_limite_operacoes() {
        return (this.nro_operacoes + 1) <= this.limite_operacoes
    }
}

class DataBase {
    constructor() {
        this.clientes = {};
    }

    adiciona_cliente(cliente, limite_valor, limite_operacoes) {
        if (Object.keys(this.clientes).indexOf(cliente) == -1) {
            this.clientes[cliente] = new Cliente(cliente, limite_valor, limite_operacoes);
        }
        else {
            console.log("Cliente já existe");
        }
    }

    adiciona_operacao(cliente, operacao) {
        if (Object.keys(this.clientes).indexOf(cliente) == -1) {
            console.log("Cliente não existe");
        }
        else {
            this.clientes[cliente].adiciona_operacao(operacao);
        }
    }

    adiciona_limite_disponivel(cliente, valor) {
        if (Object.keys(this.clientes).indexOf(cliente) == -1) {
            console.log("Cliente não existe");
        }
        else {
            this.clientes[cliente].adiciona_limite_disponivel(valor);
        }
    }
}

class Handler {
    constructor(next_handler = null) {
        this.next_handler = next_handler;
    }

    handle(obj) {}

    handle_next(obj) {
        if (this.next_handler == null) {
            return true
        }
        return this.next_handler.handle(obj)
    }
}

class ValorHandler extends Handler {
    constructor(next_handler) {
        super(next_handler);
    }

    handle(cliente, valor) {
        if (db.clientes[cliente].check_limite_valor(valor)) {
            return this.handle_next(cliente, valor)
        }
        return false
    }
}

class LimiteOperacoesHandler extends Handler {
    constructor(next_handler) {
        super(next_handler);
    }

    handle(cliente, valor) {
        if (db.clientes[cliente].check_limite_operacoes()) {
            return this.handle_next(cliente, valor)
        }
        return false
    }
}

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
        db.adiciona_operacao(this.cliente, this);
        console.log("Operação liberada!");
    }

    liquida_parcela(valor) {
        this.valor = this.valor - valor;
        db.adiciona_limite_disponivel(this.cliente, this.valor);
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
    constructor(cliente, handler) {
        this.cliente = cliente;
        this.handler = handler;
    }

    assina_contrato() {}
}

class PropostaCCB extends Proposta {
    constructor(cliente, handler) {
        super(cliente, handler);
    }

    assina_contrato(valor, parcelas) {
        if (this.handler.handle(this.cliente, valor)) {
            let CCBAssinada = new CCB(this.cliente, valor, parcelas);
            CCBAssinada.liberar();
            return CCBAssinada;
        }
        else {
            console.log(`Operação de CCB para o cliente ${this.cliente} recusada.`);
            return false
        }
    }
}

class PropostaFianca extends Proposta {
    constructor(cliente, handler) {
        super(cliente, handler);
    }

    assina_contrato(valor, valor_comissao, comissoes) {
        if (this.handler.handle(this.cliente, valor)) {
            let fiancaAssinada = new Fianca(this.cliente, valor, valor_comissao, comissoes);
            db.adiciona_operacao(this.cliente, fiancaAssinada);
            return fiancaAssinada
        }
        else {
            console.log(`Operação de fiança para o cliente ${this.cliente} recusada.`);
            return false
        }
    }
}

const db = new DataBase();

db.adiciona_cliente("Empresa1", 5000000, 2);

const limite_operacoes_handler = new LimiteOperacoesHandler();
const value_handler = new ValorHandler(limite_operacoes_handler);

propostaCCBEmpresa1 = new PropostaCCB("Empresa1", value_handler);
propostaFiancaEmpresa1 = new PropostaFianca("Empresa1", value_handler);

console.log("Proposta de CCB e Fiança passando do valor limite");
CCBEmpresa1 = propostaCCBEmpresa1.assina_contrato(3000000, 12);
FiancaEmpresa1 = propostaFiancaEmpresa1.assina_contrato(3000000, 30000, 12);

CCBEmpresa1.conferir_posicao();
console.log(db.clientes);
console.log("Liquidação de parcela da CCB, liberando valor limite");
CCBEmpresa1.liquida_parcela(2000000);
console.log(db.clientes);
console.log("Proposta de Fiança, agora com valor no limite");
FiancaEmpresa1 = propostaFiancaEmpresa1.assina_contrato(3000000, 30000, 12);
console.log(db.clientes);