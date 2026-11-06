import { Request, Response } from "express";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import { SelectSuccessService } from "../interfaces/error/selectSuccessService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import {
    createPlaylist,
    deletePlaylist,
    getAllPlaylists,
    getPlaylistById,
    updatePlaylist,
} from "../serveis/track/playlist/playlistService";

export async function getAllPlaylistsController(_req: Request, res: Response): Promise<Response> {
    const playlists: PlaylistBD[] = await getAllPlaylists();
    return res.status(200).json(playlists);
}

export async function getPlaylistByIdController(req: Request, res: Response): Promise<Response> {
    const result: SelectSuccessService<PlaylistBD> | ErrorService = await getPlaylistById(
        req.params.id as string,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function postPlaylistController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<number> | ErrorService = await createPlaylist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function putPlaylistController(req: Request, res: Response): Promise<Response> {
    const result: UpdateSuccessService<number> | ErrorService = await updatePlaylist(
        req.params.id as string,
        req.body,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function deletePlaylistController(req: Request, res: Response): Promise<Response> {
    const result: DeleteSuccessService | ErrorService = await deletePlaylist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).send();
}
