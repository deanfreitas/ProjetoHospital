import {Router} from "express";
import MedicoController from "../controller/MedicoController";

class MedicoRoute {
    public router: Router;
    private readonly medicoController: MedicoController;

    constructor(router: Router) {
        this.router = router;
        this.medicoController = new MedicoController();
        this.createRoutes();
    }

    public createRoutes(): void {
        this.router.route("/medico/").get(this.medicoController.getMedicos)
            .post(this.medicoController.insertMedico)
            .put(this.medicoController.updateMedico);
        this.router.route("/medico/id/:id").get(this.medicoController.getMedicoById)
            .delete(this.medicoController.deleteMedicoId);
        this.router.route("/medico/crm/:crm").get(this.medicoController.getMedicoByCrm)
            .delete(this.medicoController.deleteRegisterByCrm);
    }
}

export default MedicoRoute;
