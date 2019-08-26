import {NextFunction, Request, Response} from "express";
import Leito from "../entity/Leito";
import MongoService from "../service/MongoService";
import Utils from "../utils/Utils";
import Controller from "./Controller";

class LeitoController extends Controller {

    constructor() {
        super();
    }

    public async getLeitos(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const result = await new MongoService("leitos").getAll();

            if (!result) {
                return res.sendStatus(404);
            }

            const newResult = Utils.removeAttributes(result);

            return res.status(200).send(newResult);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }

    public async getLeito(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const id = req.params.id;
        try {
            const result = await new MongoService("leitos").getOneById(id);

            if (!result) {
                return res.sendStatus(404);
            }

            delete result._id;
            delete result.paciente._id;
            delete result.medico._id;
            result.enfermeiros.forEach((item, index) => {
                delete item._id;
            });

            return res.status(200).send(result);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }

    public async leito(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const register = req.body;
        const leito: Leito = Object.setPrototypeOf(register, Leito.prototype);

        if (!(leito.id && leito.enfermeiros)) {
            return res.status(400).send("Not found all required parameters");
        }

        try {

            const resultLeito = await new MongoService("leitos").getOneById(leito.id);
            if (!resultLeito) {

                if (!(leito.paciente && leito.medico)) {
                    return res.status(400).send("Not found all required parameters");
                }

                const resultPaciente = await new MongoService("pacientes").getOneById(leito.paciente.id);
                if (!resultPaciente) {
                    return res.status(404).send("Not Found this paciente");
                }

                leito.paciente = resultPaciente;

                const resultMedico = await new MongoService("medicos").getOneById(leito.medico.id);
                if (!resultMedico) {
                    return res.status(404).send("Not Found this medico");
                }

                leito.medico = resultMedico;

                let i = 0;
                for (const element of leito.enfermeiros) {
                    if (!element.id) {
                        return res.status(400).send("Not found all required parameters");
                    }

                    const resultEnfermeiro = await new MongoService("enfermeiros").getOneById(element.id);
                    if (!resultEnfermeiro) {
                        return res.status(404).send("Not Found this Enfermeiro id = " + element.id);
                    }

                    leito.enfermeiros[i] = resultEnfermeiro;
                    i++;
                }

                return super.insertRegister(req, res, next, leito, "leitos");

            } else {
                if (leito.paciente) {
                    return res.status(500).send("This leito have paciente");
                }

                if (leito.medico) {
                    return res.status(500).send("This leito have medico");
                }

                let i = 0;
                if (leito.enfermeiros) {
                    for (const enfermeirosAdd of leito.enfermeiros) {
                        for (const enfermeirosLeitos of resultLeito.enfermeiros) {
                            if (enfermeirosAdd.id.toString() === enfermeirosLeitos.id.toString()) {
                                return res.status(500).send("This leito have enfermeiro id = " + enfermeirosLeitos.id);
                            }
                        }

                        const resultEnfermeiro = await new MongoService("enfermeiros").getOneById(enfermeirosAdd.id);
                        if (!resultEnfermeiro) {
                            return res.status(404).send("Not Found this Enfermeiro id = " + enfermeirosAdd.id);
                        }

                        leito.enfermeiros[i] = resultEnfermeiro;
                        i++;
                    }
                }

                leito.enfermeiros = resultLeito.enfermeiros.concat(leito.enfermeiros);
                return super.updateRegister(req, res, next, leito, "leitos");
            }
        } catch (err) {
            return res.send(err.message);
        }
    }

    public async getAllLeitoByCrm(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const crm = req.params.crm;

        try {
            const result = await new MongoService("leitos").getAllByCrm(crm);

            if (!result) {
                return res.sendStatus(404);
            }

            const newResult = Utils.removeAttributes(result);

            return res.status(200).send(newResult);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }

    public async getAllLeitoByCoren(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const coren = req.params.coren;

        try {
            const result = await new MongoService("leitos").getAllByCoren(coren);

            if (!result) {
                return res.sendStatus(404);
            }

            const newResult = Utils.removeAttributes(result);

            return res.status(200).send(newResult);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
}

export default LeitoController;
