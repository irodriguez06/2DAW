import { tracks } from "../../data/track/track";
import { SuccesService } from "../../interfaces/error/succesService";
import { ErrorService } from "../../interfaces/error/errorService";
import { Track } from "../../interfaces/track/track";
import { TrackBD } from "../../interfaces/track/trackBD";
import { isValidTrack } from "../../validators/track.Validator";
import { randomUUID } from "crypto";

export function getAllTracks(): TrackBD [] {
    return tracks;
}

export function getTrackById(idTrack: string): TrackBD | undefined {
    return tracks.find((t: TrackBD) => { return t.id === idTrack});
}

export function createTrack(track:Track):SuccesService<TrackBD> | ErrorService {
    
        if (!isValidTrack(track)) {
            return {success: false, code: 400, message: "Invalid data"};
        };
    
        const uuid:string = randomUUID();
    
        const trackRecord: TrackBD = {
            id: uuid,
            title: track.title.trim().replace("/\s+/g", " "),
            artist: track.artist.trim().replace("/\s+/g", " "),
            duration: track.duration,
        };
    
        //important: fer push
        tracks.push(trackRecord);

        return { success: true, data: trackRecord };
}