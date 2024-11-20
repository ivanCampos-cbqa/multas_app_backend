import { Router } from "express";
import { FineRoutes } from "./controllers/fines/routes";

export class AppRoutes{
    static get routes() :Router{
        const router = Router();
        router.use("/api/fines", FineRoutes.routes);
        return router;
    }
}