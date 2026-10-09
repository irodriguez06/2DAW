import { Router } from "express";
import { deleteTrackController, getAllTracksController, getTrackByIdController, postTrackController, putTrackController } from "../controllers/tracksController";

export const trackRouter:Router = Router();

trackRouter.get("/", getAllTracksController)
trackRouter.get("/:id", getTrackByIdController)
trackRouter.post("/:id", postTrackController)
trackRouter.put("/:id", putTrackController)
trackRouter.delete("/:id", deleteTrackController)