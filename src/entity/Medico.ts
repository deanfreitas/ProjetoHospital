import Pessoa from "./Pessoa";

class Medico extends Pessoa {
    private _CRM: string;

    constructor() {
        super();
    }

    get crm(): string {
        return this._CRM;
    }

    set crm(value: string) {
        this._CRM = value;
    }
}

export default Medico;
