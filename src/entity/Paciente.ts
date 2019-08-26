import Pessoa from "./Pessoa";

class Paciente extends Pessoa {
    private _CPF: string;

    constructor() {
        super();
    }

    get cpf(): string {
        return this._CPF;
    }

    set cpf(value: string) {
        this._CPF = value;
    }
}

export default Paciente;
