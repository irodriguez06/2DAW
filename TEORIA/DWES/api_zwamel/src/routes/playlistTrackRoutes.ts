import { Router } from "express";
import {
    deletePlaylistTrackController,
    getAllPlaylistTracksController,
    getPlaylistTrackByIdController,
    postPlaylistTrackController,
} from "../controllers/playlistTracksController";

export const playlistTrackRouter: Router = Router();

playlistTrackRouter.get("/", getAllPlaylistTracksController);
playlistTrackRouter.get("/:id", getPlaylistTrackByIdController);
playlistTrackRouter.post("/", postPlaylistTrackController);
playlistTrackRouter.delete("/:id", deletePlaylistTrackController);
