import { Request, Response } from "express";
import { playlists } from "../data/track/playlist/playlist";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import {
    createPlaylist,
    deletePlaylist,
    getAllPlaylists,
    getPlaylistById,
    updatePlaylist,
} from "../serveis/track/playlist/playlistService";

export function getAllPlaylistsController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllPlaylists());
}

export function getPlaylistByIdController(req: Request, res: Response): Response {
    const playlist: PlaylistBD | undefined = getPlaylistById(req.params.id as string);

    if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
    }

    return res.status(200).json(playlist);
}

export function postPlaylistController(req: Request, res: Response): Response {
    const result: CreateSuccessService<PlaylistBD> | ErrorService = createPlaylist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    playlists.push((result as CreateSuccessService<PlaylistBD>).data);
    return res.status(result.code).json(result);
}

export function putPlaylistController(req: Request, res: Response): Response {
    const result: UpdateSuccessService<PlaylistBD> | ErrorService = updatePlaylist(
        req.params.id as string,
        req.body,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const updateResult = result as UpdateSuccessService<PlaylistBD>;
    playlists[updateResult.index] = updateResult.data;
    return res.status(result.code).json(result);
}

export function deletePlaylistController(req: Request, res: Response): Response {
    const result: DeleteSuccessService | ErrorService = deletePlaylist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    playlists.splice((result as DeleteSuccessService).index, 1);
    return res.status(result.code).json(result);
}
