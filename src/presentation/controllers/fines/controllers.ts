import { Request, Response } from "express"
import { FineModel } from "../../../data/models/fine.model";

export class FineController {
    public getFines = async (req: Request, res: Response) => {
        try {
            const fines = await FineModel.find();
            return res.json(fines);
        } catch (error) {
            return res.json([])
        }
    }
}