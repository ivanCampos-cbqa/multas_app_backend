import { Request, Response } from "express";
import { FineModel } from "../../../data/models/fine.model";

export class FineController {
  public getFines = async (req: Request, res: Response): Promise<any> => {
    try {
      const fines = await FineModel.find();

      if (fines.length < 1) return res.json({ message: "No fines found." });

      return res.json(fines);
    } catch (error) {
      return res.json([]);
    }
  };

  public createFine = async (req: Request, res: Response): Promise<any> => {
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
      });
      return res.json(newFine);
    } catch (error) {
      return res.json({ message: "Error registering the fine" });
    }
  };

  public updateFine = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const { plate, city, state, speed, limit, lat, lng } = req.body;
      await FineModel.findByIdAndUpdate(id, {
        plate,
        city,
        state,
        speed,
        limit,
        lat,
        lng,
      });

      const updateFine = await FineModel.findById(id);
      return res.json(updateFine);
    } catch (error) {
      return res.json({
        message: "An error occurred while updating the fine.",
      });
    }
  };

  public getFinesByPlateNumber = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const plateNumber = req.params.plateNumber;

    try {
      const fines = await FineModel.find({ plate: plateNumber });

      if (fines.length < 1)
        return res.json({
          message: `Couldn't find any fines fot the plate number ${plateNumber}`,
        });

      return res.json(fines);
    } catch (error) {
      return res.json({
        message: "An error occurred while searching for fines.",
      });
    }
  };
}
