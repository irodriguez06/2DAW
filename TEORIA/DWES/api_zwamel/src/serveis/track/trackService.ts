import { tracks } from "../../data/track/track";
import { TrackInvalidData } from "../../interfaces/error/trackInvalidData";
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

export function createTrack(track:Track):TrackBD | TrackInvalidData {
    
        if (!isValidTrack(track)) {
            return { error: 400, message: "Invalid data"};
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

        return trackRecord;
}