import { randomUUID } from "crypto";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { PlaylistTrackBD } from "../interfaces/playlistTrack/playlistTrackBD";
import { ErrorService } from "../interfaces/error/errorService";
import { isValidPlaylistTrack } from "../validators/playlistTrack.validator";
import { PlaylistTrack } from "../interfaces/playlistTrack/playlistTrack";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { playlistTracks } from "../data/playlistTrack/playlistTrack";


export function createPlaylistTrack(playlistTrack: PlaylistTrack): CreateSuccessService<PlaylistTrackBD> | ErrorService {

    if (!isValidPlaylistTrack(playlistTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idplaylistTrack: string = randomUUID()
    
    const playlistTrackRecord: PlaylistTrackBD = {
        id: idplaylistTrack,
        playlist: playlistTrack.playlist,
        track: playlistTrack.track
    };

    return { success: true, code: 201, data: playlistTrackRecord };
}


export function deletePlaylistTrack(idplaylistTrack: string): DeleteSuccessService | ErrorService {

    const trackIndex: number = playlistTracks.findIndex((playlistTrack: PlaylistTrackBD) => playlistTrack.id === idplaylistTrack);

    if (trackIndex === -1) {
        return { success: false, code: 404, message: "PlaylistTrack not found" };
    }

    return { success: true, code: 204, index: trackIndex };
}