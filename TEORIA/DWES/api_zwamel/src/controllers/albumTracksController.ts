import { Request, Response } from "express";
import { albumTracks } from "../data/track/albumTracks/albumTracks";
import { AlbumTracksBD } from "../interfaces/albumTracks/albumTracksBD";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import {
    createAlbumTrack,
    deleteAlbumTrack,
    getAlbumTrackById,
    getAllAlbumTracks,
} from "../serveis/track/albumTracks/albumTracksService";

export function getAllAlbumTracksController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllAlbumTracks());
}

export function getAlbumTrackByIdController(req: Request, res: Response): Response {
    const albumTrack: AlbumTracksBD | undefined = getAlbumTrackById(req.params.id as string);

    if (!albumTrack) {
        return res.status(404).json({ message: "Album track not found" });
    }

    return res.status(200).json(albumTrack);
}

export function postAlbumTrackController(req: Request, res: Response): Response {
    const result: CreateSuccessService<AlbumTracksBD> | ErrorService = createAlbumTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    albumTracks.push((result as CreateSuccessService<AlbumTracksBD>).data);
    return res.status(result.code).json(result);
}

export function deleteAlbumTrackController(req: Request, res: Response): Response {
    const result: DeleteSuccessService | ErrorService = deleteAlbumTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    albumTracks.splice((result as DeleteSuccessService).index, 1);
    return res.status(result.code).json(result);
}
