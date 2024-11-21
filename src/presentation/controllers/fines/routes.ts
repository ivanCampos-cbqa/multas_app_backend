import { Router } from "express";
import { FineController } from "./controllers";



export class FineRoutes{
    static get routes(): Router {
        const router = Router();
        const controller = new FineController();
        router.get("/", controller.getFines)
        router.post("/", controller.createFine);
        router.put("/:id", controller.updateFine);
        
        return router;

    }
}