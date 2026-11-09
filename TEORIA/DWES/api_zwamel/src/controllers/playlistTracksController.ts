import { Request, Response } from "express";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import { SelectSuccessService } from "../interfaces/error/selectSuccessService";
import { PlaylistTracksBD } from "../interfaces/playlistTracks/playlistTrackBD";
import {
    createPlaylistTrack,
    deletePlaylistTrack,
    getAllPlaylistTracks,
    getPlaylistTrackById,
} from "../serveis/track/playlistTracks/playlistTracksService";

export async function getAllPlaylistTracksController(_req: Request, res: Response): Promise<Response> {
    const playlistTracks: PlaylistTracksBD[] = await getAllPlaylistTracks();
    return res.status(200).json(playlistTracks);
}

export async function getPlaylistTrackByIdController(req: Request, res: Response): Promise<Response> {
    const result: SelectSuccessService<PlaylistTracksBD> | ErrorService = await getPlaylistTrackById(
        req.params.id as string,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function postPlaylistTrackController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<number> | ErrorService = await createPlaylistTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function deletePlaylistTrackController(req: Request, res: Response): Promise<Response> {
    const result: DeleteSuccessService | ErrorService = await deletePlaylistTrack(
        req.params.id as string,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).send();
}
