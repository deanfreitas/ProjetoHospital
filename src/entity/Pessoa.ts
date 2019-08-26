import Hospital from "./Hospital";

class Pessoa extends Hospital {

    private _NOME: string;

    constructor() {
        super();
    }

    get nome(): string {
        return this._NOME;
    }

    set nome(value: string) {
        this._NOME = value;
    }
}

export default Pessoa;
