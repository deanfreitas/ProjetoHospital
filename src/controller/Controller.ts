import {NextFunction, Request, Response} from "express";
import Hospital from "../entity/Hospital";
import MongoService from "../service/MongoService";

abstract class Controller {

    // tslint:disable-next-line:max-line-length
    protected async getAllRegister(req: Request, res: Response, next: NextFunction, nameCollection: string): Promise<Response> {
        try {
            const result = await new MongoService(nameCollection).getAll();

            if (!result) {
                return res.sendStatus(404);
            }

            result.forEach((item, index) => {
                delete item._id;
            });

            return res.status(200).send(result);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }

    // tslint:disable-next-line:max-line-length
    protected async getRegister(req: Request, res: Response, next: NextFunction, nameCollection: string): Promise<Response> {
        const id = req.params.id;
        try {
            const result = await new MongoService(nameCollection).getOneById(id);

            if (!result) {
                return res.sendStatus(404);
            }

            delete result._id;
            return res.status(200).send(result);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }

    // tslint:disable-next-line:max-line-length
    protected async insertRegister(req: Request, res: Response, next: NextFunction, hospital: Hospital, nameCollection: string): Promise<Response> {

        try {

            const register = await new MongoService(nameCollection).getOneById(hospital.id);
            if (register) {
                return res.status(409).send("This user is exist");
            }

            const result = await new MongoService(nameCollection).insertOne(hospital);

            if (result && result.result.n === 1) {
                return res.status(201).send({id: hospital.id});
            }

            return res.status(500).send("Error create register");
        } catch (err) {
            if (err.code === 11000) {
                return res.status(409).send("E11000 duplicate key error collection");
            }

            return res.status(500).send(err.message);
        }
    }

    // tslint:disable-next-line:max-line-length
    protected async updateRegister(req: Request, res: Response, next: NextFunction, hospital: Hospital, nameCollection: string): Promise<Response> {

        try {
            const register = await new MongoService(nameCollection).getOneById(hospital.id);
            if (!register) {
                return res.sendStatus(404);
            }

            const result = await new MongoService(nameCollection).updateOne(hospital.id, hospital);
            if (!result) {
                return res.status(500).send("Error update register");
            }
            if (result.result.n === 0) {
                return res.sendStatus(404);
            }
            if (result.result.nModified === 0) {
                return res.sendStatus(304);
            }

            return res.sendStatus(200);

        } catch (err) {
            return res.status(500).send(err.message);
        }
    }

    // tslint:disable-next-line:max-line-length
    protected async deleteRegister(req: Request, res: Response, next: NextFunction, nameCollection: string): Promise<Response> {
        const id = req.params.id;

        try {
            const isRegister = await new MongoService(nameCollection).getOneById(id);
            if (!isRegister) {
                return res.sendStatus(404);
            }

            const result = await new MongoService(nameCollection).deleteOneById(id);
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

export default Controller;
