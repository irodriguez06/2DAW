import { Response, Request } from "express";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { PlaylistTrackBD } from "../interfaces/playlistTrack/playlistTrackBD";
import { ErrorService } from "../interfaces/error/errorService";
import { createPlaylistTrack, deletePlaylistTrack } from "../Services/playlistTrackService";
import { playlistTracks } from "../data/playlistTrack/playlistTrack";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";


export function postPlaylistTrackController(req: Request, res: Response): Response {
    const result: CreateSuccessService<PlaylistTrackBD> | ErrorService = createPlaylistTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    playlistTracks.push((result as CreateSuccessService<PlaylistTrackBD>).data);
    return res.status(result.code).json(result);
}


export function deletePlaylistTrackController(req: Request, res: Response): Response {
    const result: DeleteSuccessService | ErrorService = deletePlaylistTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index
    playlistTracks.splice(index, 1);

    return res.status(result.code).json(result);
}