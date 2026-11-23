import { Request, Response } from "express";
import { LikeBD } from "../interfaces/likes/likeBD";
import {
    createLike,
    getAllLikes,
    getTrackLikeTotal,
} from "../serveis/track/likes/likesService";

export async function getAllLikesController(_req: Request, res: Response): Promise<Response> {
    const likes: LikeBD[] = await getAllLikes();
    return res.status(200).json(likes);
}

export async function getTrackLikeTotalController(req: Request, res: Response): Promise<Response> {
    const total = await getTrackLikeTotal(req.params.trackId as string);
    return res.status(200).json(total);
}

export async function postLikeController(req: Request, res: Response): Promise<Response> {
    const result = await createLike(req.body);

    if (!result.success) {
        return res.status(result.code).json({ message: result.message });
    }

    return res.status(result.code).json(result.data);
}
