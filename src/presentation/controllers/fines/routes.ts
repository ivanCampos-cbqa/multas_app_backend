import { Router } from "express";
import { FineController } from "./controllers";



export class FineRoutes{
    static get routes(): Router {
        const router = Router();
        const controller = new FineController();
        
        return router;

    }
}