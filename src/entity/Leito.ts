import Enfermeiro from "./Enfermeiro";
import Hospital from "./Hospital";
import Medico from "./Medico";
import Paciente from "./Paciente";

class Leito extends Hospital {

    private _PACIENTE: Paciente;
    private _MEDICO: Medico;
    private _ENFERMEIROS: Enfermeiro[];

    constructor() {
        super();
    }

    get paciente(): Paciente {
        return this._PACIENTE;
    }

    set paciente(value: Paciente) {
        this._PACIENTE = value;
    }

    get medico(): Medico {
        return this._MEDICO;
    }

    set medico(value: Medico) {
        this._MEDICO = value;
    }

    get enfermeiros(): Enfermeiro[] {
        return this._ENFERMEIROS;
    }

    set enfermeiros(value: Enfermeiro[]) {
        this._ENFERMEIROS = value;
    }
}

export default Leito;
