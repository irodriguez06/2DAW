import { randomUUID } from "crypto";
import { AlbumTrack } from "../interfaces/albumTrack/albumTrack";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { AlbumTrackBD } from "../interfaces/albumTrack/albumTrackBD";
import { ErrorService } from "../interfaces/error/errorService";
import { isValidAlbumTrack } from "../validators/albumTrack.validator";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { albumTracks } from "../data/albumTrack/albumTrack";


export function createAlbumTrack(albumTrack: AlbumTrack): CreateSuccessService<AlbumTrackBD> | ErrorService {

    if (!isValidAlbumTrack(albumTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idalbumTrack: string = randomUUID()
    
    const albumTrackRecord: AlbumTrackBD = {
        id: idalbumTrack,
        album: albumTrack.album,
        track: albumTrack.track
    };

    return { success: true, code: 201, data: albumTrackRecord };
}


export function deleteAlbumTrack(idalbumTrack: string): DeleteSuccessService | ErrorService {

    const trackIndex: number = albumTracks.findIndex((albumTrack: AlbumTrackBD) => albumTrack.id === idalbumTrack);

    if (trackIndex === -1) {
        return { success: false, code: 404, message: "AlbumTrack not found" };
    }

    return { success: true, code: 204, index: trackIndex };
}