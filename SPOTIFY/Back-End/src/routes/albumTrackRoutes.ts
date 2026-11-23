import { Router } from "express";
import {
    deleteAlbumTrackController,
    getAlbumTrackByIdController,
    getAllAlbumTracksController,
    postAlbumTrackController,
} from "../controllers/albumTracksController";

export const albumTrackRouter: Router = Router();

albumTrackRouter.get("/", getAllAlbumTracksController);
albumTrackRouter.get("/:id", getAlbumTrackByIdController);
albumTrackRouter.post("/", postAlbumTrackController);
albumTrackRouter.delete("/:id", deleteAlbumTrackController);
