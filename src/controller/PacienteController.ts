import {NextFunction, Request, Response} from "express";
import Paciente from "../entity/Paciente";
import Controller from "./Controller";

class PacienteController extends Controller {

    constructor() {
        super();
    }

    public async getPacientes(req: Request, res: Response, next: NextFunction): Promise<Response> {
        return super.getAllRegister(req, res, next, "pacientes");
    }

    public async getPaciente(req: Request, res: Response, next: NextFunction): Promise<Response> {
        return super.getRegister(req, res, next, "pacientes");
    }

    public async insertPaciente(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const register = req.body;
        const paciente: Paciente = Object.setPrototypeOf(register, Paciente.prototype);

        if (!(paciente.id && paciente.nome && paciente.cpf)) {
            return res.status(400).send("Not found all required parameters");
        }

        return super.insertRegister(req, res, next, paciente, "pacientes");
    }

    public async updatePaciente(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const newRegister = req.body;

        const paciente: Paciente = Object.setPrototypeOf(newRegister, Paciente.prototype);

        if (!(paciente.id && paciente.nome && paciente.cpf)) {
            return res.status(400).send("Not found all required parameters");
        }

        return super.updateRegister(req, res, next, paciente, "pacientes");
    }

    public async deletePaciente(req: Request, res: Response, next: NextFunction): Promise<Response> {
        return super.deleteRegister(req, res, next, "pacientes");
    }
}

export default PacienteController;
