import { Response, Request } from "express";
import { getAllTracks, getTrackById } from "../serveis/track/trackService";
import { TrackBD } from "../interfaces/track/trackBD";

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