import { Router } from "express";
import { FineController } from "./controllers";

export class FineRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new FineController();
    router.get("/", controller.getFines);
    router.get("/plate/:plateNumber", controller.getFinesByPlateNumber);
    router.get("/:id", controller.getFineById);
    router.post("/", controller.createFine);
    router.put("/:id", controller.updateFine);
    router.delete("/:id", controller.deleteFineById);

    return router;
  }
}
