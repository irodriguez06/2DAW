import { randomUUID } from "crypto";
import { tracks } from "../../data/track/track";
import { CreateSuccessService } from "../../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../../interfaces/error/deleteSuccessService";
import { ErrorService } from "../../interfaces/error/errorService";
import { UpdateSuccessService } from "../../interfaces/error/updateSuccessService";
import { Track } from "../../interfaces/track/track";
import { TrackBD } from "../../interfaces/track/trackBD";
import { isValidTrack } from "../../validators/track.Validator";

export function getAllTracks(): TrackBD[] {
    return tracks;
}

export function getTrackById(idTrack: string): TrackBD | undefined {
    return tracks.find((track: TrackBD) => track.id === idTrack);
}

export function createTrack(track: Track): CreateSuccessService<TrackBD> | ErrorService {
    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const trackRecord: TrackBD = {
        id: randomUUID(),
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration,
    };

    return { success: true, code: 201, data: trackRecord };
}

export function updateTrack(
    idTrack: string,
    track: Track,
): UpdateSuccessService<TrackBD> | ErrorService {
    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = tracks.findIndex((existingTrack: TrackBD) => existingTrack.id === idTrack);
    if (index === -1) {
        return { success: false, code: 404, message: `Track ${idTrack} not found` };
    }

    const trackRecord: TrackBD = {
        id: idTrack,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration,
    };

    return { success: true, code: 200, data: trackRecord, index };
}

export function deleteTrack(idTrack: string): DeleteSuccessService | ErrorService {
    const index: number = tracks.findIndex((track: TrackBD) => track.id === idTrack);

    if (index === -1) {
        return { success: false, code: 404, message: `Track ${idTrack} not found` };
    }

    return { success: true, code: 204, index };
}
