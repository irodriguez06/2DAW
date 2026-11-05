import { Router } from "express";
import { deletePlaylistTrackController, postPlaylistTrackController } from "../controllers/playlistTrackController";

export const playlistTrackRouter: Router = Router();

playlistTrackRouter.post("/", postPlaylistTrackController);
playlistTrackRouter.delete("/:id", deletePlaylistTrackController);
