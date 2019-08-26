import {NextFunction, Request, Response} from "express";
import Medico from "../entity/Medico";
import MongoService from "../service/MongoService";
import Controller from "./Controller";

class MedicoController extends Controller {

    constructor() {
        super();
    }

    public async getMedicos(req: Request, res: Response, next: NextFunction): Promise<Response> {
        return super.getAllRegister(req, res, next, "medicos");
    }

    public async getMedicoById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        return super.getRegister(req, res, next, "medicos");
    }

    public async insertMedico(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const register = req.body;
        const medico: Medico = Object.setPrototypeOf(register, Medico.prototype);

        if (!(medico.id && medico.nome && medico.crm)) {
            return res.status(400).send("Not found all required parameters");
        }

        return super.insertRegister(req, res, next, medico, "medicos");
    }

    public async updateMedico(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const newRegister = req.body;

        const medico: Medico = Object.setPrototypeOf(newRegister, Medico.prototype);

        if (!(medico.id && medico.nome && medico.crm)) {
            return res.status(400).send("Not found all required parameters");
        }

        return super.updateRegister(req, res, next, medico, "medicos");
    }

    public async deleteMedicoId(req: Request, res: Response, next: NextFunction): Promise<Response> {
        return super.deleteRegister(req, res, next, "medicos");
    }

    public async getMedicoByCrm(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const crm = req.params.crm;
        try {
            const result = await new MongoService("medicos").getOneByCrm(crm);

            if (!result) {
                return res.status(404);
            }

            delete result._id;
            return res.status(200).send(result);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }

    public async deleteRegisterByCrm(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const crm = req.params.crm;

        try {
            const isRegister = await new MongoService("medicos").getOneByCrm(crm);
            if (!isRegister) {
                return res.status(404);
            }

            const result = await new MongoService("medicos").deleteOneByCrm(crm);
            if (!result) {
                return res.status(500).send("Error delete register");
            }

            if (result.result.n === 0) {
                return res.status(404);
            }

            return res.sendStatus(200);

        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
}

export default MedicoController;
