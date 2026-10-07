import { tracks } from "../../data/track/track";
import { CreateSuccessService } from "../../interfaces/error/createSuccessService";
import { UpdateSuccessService } from "../../interfaces/error/updateSuccessService";
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

export function createTrack(track:Track):CreateSuccessService<TrackBD> | ErrorService {
    
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

        return { success: true, code: 201, data: trackRecord };
}

export function updateTrack(idTrack: string, track: Track): UpdateSuccessService<TrackBD> | ErrorService {
 
    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data" };
    };
 
    const index: number = tracks.findIndex((t: TrackBD) => t.id === idTrack);
    if (index === -1) {
        return { success: false, code: 404, message: `Track ${idTrack} not found` };
    }
 
    const trackRecord: TrackBD = {
        id: idTrack,
        title: track.title.trim().replace("/\s+/g", " "),
        artist: track.artist.trim().replace("/\s+/g", " "),
        duration: track.duration,
    };
 
    return { success: true, code: 200, data: trackRecord, index: index };
}
 