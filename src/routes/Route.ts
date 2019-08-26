import express, {Router} from "express";
import EnfermeiroRoute from "./EnfermeiroRoute";
import LeitoRoute from "./LeitoRoute";
import MedicoRoute from "./MedicoRoute";
import PacienteRoute from "./PacienteRoute";

class Route {

    public router: Router;

    constructor() {
        this.router = express.Router();
        this.router = new PacienteRoute(this.router).router;
        this.router = new MedicoRoute(this.router).router;
        this.router = new EnfermeiroRoute(this.router).router;
        this.router = new LeitoRoute(this.router).router;
    }
}

export default Route;
