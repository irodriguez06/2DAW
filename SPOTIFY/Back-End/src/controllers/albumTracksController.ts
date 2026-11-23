import { Request, Response } from "express";
import { AlbumTracksBD } from "../interfaces/albumTracks/albumTracksBD";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import { SelectSuccessService } from "../interfaces/error/selectSuccessService";
import {
    createAlbumTrack,
    deleteAlbumTrack,
    getAlbumTrackById,
    getAllAlbumTracks,
} from "../serveis/track/albumTracks/albumTracksService";

export async function getAllAlbumTracksController(_req: Request, res: Response): Promise<Response> {
    const albumTracks: AlbumTracksBD[] = await getAllAlbumTracks();
    return res.status(200).json(albumTracks);
}

export async function getAlbumTrackByIdController(req: Request, res: Response): Promise<Response> {
    const result: SelectSuccessService<AlbumTracksBD> | ErrorService = await getAlbumTrackById(
        req.params.id as string,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function postAlbumTrackController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<number> | ErrorService = await createAlbumTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function deleteAlbumTrackController(req: Request, res: Response): Promise<Response> {
    const result: DeleteSuccessService | ErrorService = await deleteAlbumTrack(
        req.params.id as string,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).send();
}
