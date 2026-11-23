import { Router } from "express";
import { postAlbumTrackController, deleteAlbumTrackController } from "../controllers/albumTrackController";

export const albumTrackRouter: Router = Router();

albumTrackRouter.post("/", postAlbumTrackController);
albumTrackRouter.delete("/:id", deleteAlbumTrackController);