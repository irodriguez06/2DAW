import { randomUUID } from "crypto";
import { albumTracks } from "../../../data/track/albumTracks/albumTracks";
import { albums } from "../../../data/track/albums/albums";
import { tracks } from "../../../data/track/track";
import { AlbumTracks } from "../../../interfaces/albumTracks/albumTracks";
import { AlbumTracksBD } from "../../../interfaces/albumTracks/albumTracksBD";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../../../interfaces/error/deleteSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { isValidAlbumTracks } from "../../../validators/albumTracksValidator";

export function getAllAlbumTracks(): AlbumTracksBD[] {
    return albumTracks;
}

export function getAlbumTrackById(idAlbumTrack: string): AlbumTracksBD | undefined {
    return albumTracks.find((item: AlbumTracksBD) => item.id === idAlbumTrack);
}

export function createAlbumTrack(
    item: AlbumTracks,
): CreateSuccessService<AlbumTracksBD> | ErrorService {
    if (!isValidAlbumTracks(item)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const albumId: string = item.album.trim();
    if (!albums.some((album) => album.id === albumId)) {
        return { success: false, code: 404, message: `Album ${albumId} not found` };
    }

    const trackId: string = item.track.trim();
    if (!tracks.some((track) => track.id === trackId)) {
        return { success: false, code: 404, message: `Track ${trackId} not found` };
    }

    return {
        success: true,
        code: 201,
        data: { id: randomUUID(), album: albumId, track: trackId },
    };
}

export function deleteAlbumTrack(idAlbumTrack: string): DeleteSuccessService | ErrorService {
    const index: number = albumTracks.findIndex((item: AlbumTracksBD) => item.id === idAlbumTrack);

    if (index === -1) {
        return { success: false, code: 404, message: `Album track ${idAlbumTrack} not found` };
    }

    return { success: true, code: 204, index };
}
