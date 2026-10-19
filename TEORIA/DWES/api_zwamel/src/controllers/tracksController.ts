import { Response, Request } from "express";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "../serveis/track/trackService";
import { TrackBD } from "../interfaces/track/trackBD";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import { tracks } from "../data/track/track";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";

export async function getAllTracksController(_req: Request, res: Response): Promise<Response> {
    const tracks: TrackBD[] = await getAllTracks();
    return res.status(200).json(tracks);
}

export function getTrackByIdController(req: Request, res: Response): Response {
    const track: TrackBD | undefined = getTrackById(req.params.id as string);

    if (!track) {
        return res.status(404).json({ message: `Track not found` });
    }
    return res.status(200).json(track);

}

export function postTrackController(req: Request, res: Response): Response {
    const result: CreateSuccessService<TrackBD> | ErrorService = createTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }


    tracks.push((result as CreateSuccessService<TrackBD>).data);
    return res.status(result.code).json(result);

}


export function putTrackController(req: Request, res: Response): Response {
    const result: UpdateSuccessService<TrackBD> | ErrorService = updateTrack(
        req.params.id as string,
        req.body,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as UpdateSuccessService<TrackBD>).index;
    tracks[index] = (result as UpdateSuccessService<TrackBD>).data;

    return res.status(result.code).json(result);
}

export function deleteTrackController(req: Request, res: Response): Response {
    const result: DeleteSuccessService | ErrorService = deleteTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index
    tracks.splice(index, 1);

    return res.status(result.code).json(result);
}