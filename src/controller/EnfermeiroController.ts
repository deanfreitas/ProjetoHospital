import {NextFunction, Request, Response} from "express";
import Enfermeiro from "../entity/Enfermeiro";
import MongoService from "../service/MongoService";
import Controller from "./Controller";

class EnfermeiroController extends Controller {

    constructor() {
        super();
    }

    public async getEnfermeiros(req: Request, res: Response, next: NextFunction): Promise<Response> {
        return super.getAllRegister(req, res, next, "enfermeiros");
    }

    public async getEnfermeiroById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        return super.getRegister(req, res, next, "enfermeiros");
    }

    public async insertEnfermeiro(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const register = req.body;
        const enfermeiro: Enfermeiro = Object.setPrototypeOf(register, Enfermeiro.prototype);

        if (!(enfermeiro.id && enfermeiro.nome && enfermeiro.coren)) {
            return res.status(400).send("Not found all required parameters");
        }

        return super.insertRegister(req, res, next, enfermeiro, "enfermeiros");
    }

    public async updateEnfermeiro(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const newRegister = req.body;

        const enfermeiro: Enfermeiro = Object.setPrototypeOf(newRegister, Enfermeiro.prototype);

        if (!(enfermeiro.id && enfermeiro.nome && enfermeiro.coren)) {
            return res.status(400).send("Not found all required parameters");
        }

        return super.updateRegister(req, res, next, enfermeiro, "enfermeiros");
    }

    public async deleteEnfermeiroId(req: Request, res: Response, next: NextFunction): Promise<Response> {
        return super.deleteRegister(req, res, next, "enfermeiros");
    }

    public async getEnfermeiroByCoren(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const coren = req.params.coren;
        try {
            const result = await new MongoService("enfermeiros").getOneByCoren(coren);

            if (!result) {
                return res.sendStatus(404);
            }

            delete result._id;
            return res.status(200).send(result);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }

    public async deleteRegisterByCoren(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const coren = req.params.coren;

        try {
            const isRegister = await new MongoService("enfermeiros").getOneByCoren(coren);
            if (!isRegister) {
                return res.sendStatus(404);
            }

            const result = await new MongoService("enfermeiros").deleteOneByCoren(coren);
            if (!result) {
                return res.status(500).send("Error delete register");
            }

            if (result.result.n === 0) {
                return res.sendStatus(404);
            }

            return res.sendStatus(200);

        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
}

export default EnfermeiroController;
