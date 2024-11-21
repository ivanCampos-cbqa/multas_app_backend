import { Request, Response } from "express"
import { FineModel } from "../../../data/models/fine.model";

export class FineController {
    public getFines = async (req: Request, res: Response) : Promise<any> => {
        try {
            const fines = await FineModel.find();
            return res.json(fines);
        } catch (error) {
            return res.json([])
        }
    }

    public createFine = async (req: Request, res: Response) : Promise<any> => {
        try {
            const { plate, city, state, speed, limit, lat, lng } = req.body;
            const newFine = await FineModel.create({
                plate,
                city, 
                state,
                speed,
                limit,
                lat,
                lng,
            })
           return res.json(newFine);
        } catch (error) {
           return res.json({ message: "Error registering the fine" })
        }
    }

    public updateFine = async (req: Request, res: Response) : Promise<any> => {
        try {
            const { id } = req.params;
            const { plate, city, state, speed, limit, lat, lng} = req.body;
            await FineModel.findByIdAndUpdate(id, {
                plate,
                city, 
                state,
                speed,
                limit,
                lat,
                lng,
            })

            const updateFine = await FineModel.findById(id);
            return res.json(updateFine);

        } catch (error) {
            return res.json({ message: "An error occurred while updating the fine." })
        }
    }
}