import {Router} from "express";
import LeitoController from "../controller/LeitoController";

class LeitoRoute {
    public router: Router;
    private readonly leitoController: LeitoController;

    constructor(router: Router) {
        this.router = router;
        this.leitoController = new LeitoController();
        this.createRoutes();
    }

    public createRoutes(): void {
        this.router.route("/leito/").get(this.leitoController.getLeitos)
            .post(this.leitoController.leito);
        this.router.route("/leito/id/:id").get(this.leitoController.getLeito);
        this.router.route("/leito/crm/:crm").get(this.leitoController.getAllLeitoByCrm);
        this.router.route("/leito/coren/:coren").get(this.leitoController.getAllLeitoByCoren);
    }
}

export default LeitoRoute;
