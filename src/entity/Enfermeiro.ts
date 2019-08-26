import Pessoa from "./Pessoa";

class Enfermeiro extends Pessoa {
    private _COREN: string;

    constructor() {
        super();
    }

    get coren(): string {
        return this._COREN;
    }

    set coren(value: string) {
        this._COREN = value;
    }
}

export default Enfermeiro;
