import {Router} from "express";
import PacienteController from "../controller/PacienteController";

class PacienteRoute {
    public router: Router;
    private readonly pacienteController: PacienteController;

    constructor(router: Router) {
        this.router = router;
        this.pacienteController = new PacienteController();
        this.createRoutes();
    }

    public createRoutes(): void {
        this.router.route("/paciente/").get(this.pacienteController.getPacientes)
            .post(this.pacienteController.insertPaciente)
            .put(this.pacienteController.updatePaciente);
        this.router.route("/paciente/id/:id").get(this.pacienteController.getPaciente)
            .delete(this.pacienteController.deletePaciente);
    }
}

export default PacienteRoute;
