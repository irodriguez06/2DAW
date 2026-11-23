import { Response, Request } from "express";
import { createPlaylist, deletePlaylist, getAllPlaylists, getPlaylistById, putPlaylistById } from "../Services/playlistService";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { playlists } from "../data/playlist/playlist";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";


export function getAllPlaylistsController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllPlaylists());
}

export function getPlaylistByIdController(req: Request, res: Response): Response {
    const playlist: PlaylistBD | undefined = getPlaylistById(req.params.id as string);

    if (!playlist) {
        return res.status(404).json({ message: `Playlist not found` });
    }
    return res.status(200).json(playlist);
}

export function postPlaylistController(req: Request, res: Response): Response {
    const result: CreateSuccessService<PlaylistBD> | ErrorService = createPlaylist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    playlists.push((result as CreateSuccessService<PlaylistBD>).data);
    return res.status(result.code).json(result);
}

export function putPlaylistController(req: Request, res: Response): Response {
    const result: UpdateSuccessService<PlaylistBD> | ErrorService = putPlaylistById(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as UpdateSuccessService<PlaylistBD>).index;
    playlists[index] = (result as UpdateSuccessService<PlaylistBD>).data;

    return res.status(result.code).json(result);
}

export function deletePlaylistController(req: Request, res: Response): Response {
    const result: DeleteSuccessService | ErrorService = deletePlaylist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index
    playlists.splice(index, 1);

    return res.status(result.code).json(result);
}