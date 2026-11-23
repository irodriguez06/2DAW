import { Router } from "express";
import { deleteArtistController, getAllArtistController, getArtistByIdController, postArtistController, putArtistController } from "../controllers/artistsController";


export const artistRouter:Router = Router();

artistRouter.get("/", getAllArtistController)
artistRouter.get("/:id", getArtistByIdController)
artistRouter.post("/:id", postArtistController)
artistRouter.put("/:id", putArtistController)
artistRouter.delete("/:id", deleteArtistController)