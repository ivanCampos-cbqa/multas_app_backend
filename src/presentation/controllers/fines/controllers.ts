import { Request, Response } from "express";
import { FineModel } from "../../../data/models/fine.model";
import mongoose from "mongoose";

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
      const { plate, city, state, speed, limit, lat, lng, email } = req.body;
      const newFine = await FineModel.create({
        plate,
        city,
        state,
        speed,
        limit,
        lat,
        lng,
        email,
      });
      return res.json(newFine);
    } catch (error) {
      return res.json({ message: "Error registering the fine" });
    }
  };

  public updateFine = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ message: "Please provide a valid id" });
      }

      const { plate, city, state, speed, limit, lat, lng, email } = req.body;
      await FineModel.findByIdAndUpdate(id, {
        plate,
        city,
        state,
        speed,
        limit,
        lat,
        lng,
        email,
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
    try {
      const plateNumber = req.params.plateNumber;
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

  public getFineById = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ message: "Please provide a valid id" });
      }

      const fine = await FineModel.findById(id);

      if (!fine)
        return res.json({
          message: `Couldn't find a fine with the id ${id}`,
        });

      return res.json(fine);
    } catch (error) {
      return res.json({
        message: "An error occurred while searching for the requested fine.",
      });
    }
  };

  public deleteFineById = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ message: "Please provide a valid id" });
      }

      const fineToDelete = await FineModel.findById(id);

      if (!fineToDelete)
        return res.json({
          message: `Couldn't find a fine with the id ${id}`,
        });

      await FineModel.deleteOne({ _id: id });
      return res.json({
        message: `Fine with id: ${id} was deleted succesfuly`,
      });
    } catch (error) {
      return res.json({
        message: "An error occurred while trying to delet the specified fine.",
      });
    }
  };
}
