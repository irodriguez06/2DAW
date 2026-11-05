import { Request, Response } from "express";
import { playlistTracks } from "../data/track/playlistTracks/playlistTracks";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import { PlaylistTracksBD } from "../interfaces/playlistTracks/playlistTrackBD";
import {
    createPlaylistTrack,
    deletePlaylistTrack,
    getAllPlaylistTracks,
    getPlaylistTrackById,
} from "../serveis/track/playlistTracks/playlistTracksService";

export function getAllPlaylistTracksController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllPlaylistTracks());
}

export function getPlaylistTrackByIdController(req: Request, res: Response): Response {
    const playlistTrack: PlaylistTracksBD | undefined = getPlaylistTrackById(req.params.id as string);

    if (!playlistTrack) {
        return res.status(404).json({ message: "Playlist track not found" });
    }

    return res.status(200).json(playlistTrack);
}

export function postPlaylistTrackController(req: Request, res: Response): Response {
    const result: CreateSuccessService<PlaylistTracksBD> | ErrorService = createPlaylistTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    playlistTracks.push((result as CreateSuccessService<PlaylistTracksBD>).data);
    return res.status(result.code).json(result);
}

export function deletePlaylistTrackController(req: Request, res: Response): Response {
    const result: DeleteSuccessService | ErrorService = deletePlaylistTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    playlistTracks.splice((result as DeleteSuccessService).index, 1);
    return res.status(result.code).json(result);
}
