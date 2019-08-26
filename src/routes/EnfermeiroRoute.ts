import {Router} from "express";
import EnfermeiroController from "../controller/EnfermeiroController";

class EnfermeiroRoute {
    public router: Router;
    private readonly enfermeiroController: EnfermeiroController;

    constructor(router: Router) {
        this.router = router;
        this.enfermeiroController = new EnfermeiroController();
        this.createRoutes();
    }

    public createRoutes(): void {
        this.router.route("/enfermeiro/").get(this.enfermeiroController.getEnfermeiros)
            .post(this.enfermeiroController.insertEnfermeiro)
            .put(this.enfermeiroController.updateEnfermeiro);
        this.router.route("/enfermeiro/id/:id").get(this.enfermeiroController.getEnfermeiroById)
            .delete(this.enfermeiroController.deleteEnfermeiroId);
        this.router.route("/enfermeiro/coren/:coren").get(this.enfermeiroController.getEnfermeiroByCoren)
            .delete(this.enfermeiroController.deleteRegisterByCoren);
    }
}

export default EnfermeiroRoute;
