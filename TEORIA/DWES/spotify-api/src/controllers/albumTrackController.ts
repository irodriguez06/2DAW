import { Response, Request } from "express";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { AlbumTrackBD } from "../interfaces/albumTrack/albumTrackBD";
import { createAlbumTrack, deleteAlbumTrack } from "../Services/albumTrackService";
import { albumTracks } from "../data/albumTrack/albumTrack";


export function postAlbumTrackController(req: Request, res: Response): Response {
    const result: CreateSuccessService<AlbumTrackBD> | ErrorService = createAlbumTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    albumTracks.push((result as CreateSuccessService<AlbumTrackBD>).data);
    return res.status(result.code).json(result);
}


export function deleteAlbumTrackController(req: Request, res: Response): Response {
    const result: DeleteSuccessService | ErrorService = deleteAlbumTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index
    albumTracks.splice(index, 1);

    return res.status(result.code).json(result);
}