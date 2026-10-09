import { Router } from "express";
import { getAllAlbumsController, getAlbumByIdController, postAlbumController, putAlbumController, deleteAlbumController } from "../controllers/albumController";

export const albumRouter:Router = Router();

albumRouter.get("/", getAllAlbumsController)
albumRouter.get("/:id", getAlbumByIdController)
albumRouter.post("/:id", postAlbumController)
albumRouter.put("/:id", putAlbumController)
albumRouter.delete("/:id", deleteAlbumController)