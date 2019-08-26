import cookieParser from "cookie-parser";
import express, {Router} from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";
import Route from "../routes/Route";

class App {
    public express: express.Application;
    private readonly indexRouter: Router;

    constructor() {
        this.express = express();
        this.indexRouter = new Route().router;
        this.config();
    }

    private setError(err, req, res, next): void {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render("error");
    }

    private createError(req, res, next) {
        next(createError(404));
    }

    private config(): void {
        this.express.use(logger("dev"));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: false}));
        this.express.use(cookieParser());
        this.express.use(express.static(path.join(__dirname, "public")));

        this.express.use("/hospital/v1/", this.indexRouter);

        this.express.use(this.createError);

        this.express.use(this.setError);
    }
}

export default new App().express;
