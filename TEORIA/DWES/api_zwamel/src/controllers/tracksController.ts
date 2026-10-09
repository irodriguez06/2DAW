import { Response, Request } from "express";
import { createTrack, getAllTracks, getTrackById } from "../serveis/track/trackService";
import { TrackBD } from "../interfaces/track/trackBD";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import { tracks } from "../data/track/track";
import { ErrorService } from "../interfaces/error/errorService";

export function getAllTracksController(res: Response):Response {
    return res.status(200).json(getAllTracks());
} 


export function getTrackByIdController(req: Request, res: Response):Response {
    const findTrack: TrackBD | undefined = getTrackById(req.params.id as string);
    
        if (!findTrack) {
            return res.status(404).json({message: `Track not found`});
        }
        return res.status(200).json(findTrack);
    }

export function postTrackController(req: Request, res: Response):Response {
    const result: CreateSuccessService<TrackBD> | ErrorService = createTrack(req.body);

        if (!result.success) {
            const ErrorResult = result as ErrorService;
            return res.status(result.code).json({ message: ErrorResult.message });
        }

        tracks.push((result as CreateSuccessService<TrackBD>).data);
        return res.status(result.code).json(result);
};

