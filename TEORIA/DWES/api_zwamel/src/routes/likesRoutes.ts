import { Router } from "express";
import {
    getAllLikesController,
    getTrackLikeTotalController,
    postLikeController,
} from "../controllers/likesController";

export const likesRouter: Router = Router();

likesRouter.get("/", getAllLikesController);
likesRouter.get("/track/:trackId", getTrackLikeTotalController);
likesRouter.post("/", postLikeController);
