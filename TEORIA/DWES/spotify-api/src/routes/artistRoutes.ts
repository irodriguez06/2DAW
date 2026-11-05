import { Router } from "express";
import { deleteArtistController, getAllArtistsController, getArtistByIdController, postArtistController, updateArtistController } from "../controllers/artistController";

export const artistRouter: Router = Router();

artistRouter.get("/", getAllArtistsController);
artistRouter.get("/:id", getArtistByIdController);
artistRouter.post("/", postArtistController);
artistRouter.put("/:id", updateArtistController);
artistRouter.delete("/:id", deleteArtistController);
