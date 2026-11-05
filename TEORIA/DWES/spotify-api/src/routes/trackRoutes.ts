import { Router } from "express";
import { deleteTrackController, getAllTracksController, getTrackByIdController, postTrackController, updateTrackController } from "../controllers/tracksController";

export const trackRouter: Router = Router();

trackRouter.get("/", getAllTracksController);
trackRouter.get("/:id", getTrackByIdController);
trackRouter.post("/", postTrackController);
trackRouter.put("/:id", updateTrackController);
trackRouter.delete("/:id", deleteTrackController);
