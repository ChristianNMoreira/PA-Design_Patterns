class Torcedor {
    constructor (nome, time) {
        this.nome = nome;
        this.time = time
    }
}

class TorcedorVasco extends Torcedor {
    constructor (nome) {
        super(nome, "Vasco")
    }

    update (time1, time2) {
        if (time1 == "Vasco" || time2 == "vasco") {
            console.log(`Olá ${this.nome}, o jogo do Vasco começou!`)
        } 
    }
}

class TorcedorBotafogo extends Torcedor {
    constructor (nome) {
        super(nome, "botafogo")
    }

    update (time1, time2) {
        if (time1 == "botafogo" || time2 == "Botafogo") {
            console.log(`Olá ${this.nome}, o jogo do botafogo começou!`);
        } 
    }
}

class Jogo {
    constructor(time1, time2) {
        this.time1 = time1;
        this.time2 = time2;
        this.torcedores = [];
    }

    adiciona (torcedor) {
        this.torcedores.push(torcedor);
    }

    retira (torcedor) {
        const index = this.torcedores.indexOf(torcedor);
        if (index > -1) { 
            this.torcedores.splice(index, 1);
        }
    }

    notifica () {
        for (let i = 0; i < this.torcedores.length; i ++) {
            this.torcedores[i].update(this.time1, this.time2);
        }
    }

    comecar_jogo () {
        console.log(`Começa o jogo entre ${this.time1} e ${this.time2}!`);
        this.notifica();
    }
}

let christian = new TorcedorVasco("Christian");
let miceli = new TorcedorBotafogo("Claudio");

let jogo = new Jogo("Vasco", "Criciúma");

jogo.adiciona(christian);
jogo.adiciona(miceli);

jogo.comecar_jogo();

jogo.time1 = "Vasco";
jogo.time2 = "Botafogo";

jogo.comecar_jogo();

jogo.retira(miceli);
jogo.comecar_jogo();