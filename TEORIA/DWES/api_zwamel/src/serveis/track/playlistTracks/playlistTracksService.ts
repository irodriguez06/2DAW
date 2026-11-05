import { randomUUID } from "crypto";
import { playlistTracks } from "../../../data/track/playlistTracks/playlistTracks";
import { playlists } from "../../../data/track/playlist/playlist";
import { tracks } from "../../../data/track/track";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../../../interfaces/error/deleteSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { PlaylistTracks } from "../../../interfaces/playlistTracks/playlistTracks";
import { PlaylistTracksBD } from "../../../interfaces/playlistTracks/playlistTrackBD";
import { isValidPlaylistTracks } from "../../../validators/playlistTracksValidator";

export function getAllPlaylistTracks(): PlaylistTracksBD[] {
    return playlistTracks;
}

export function getPlaylistTrackById(idPlaylistTrack: string): PlaylistTracksBD | undefined {
    return playlistTracks.find((item: PlaylistTracksBD) => item.id === idPlaylistTrack);
}

export function createPlaylistTrack(
    item: PlaylistTracks,
): CreateSuccessService<PlaylistTracksBD> | ErrorService {
    if (!isValidPlaylistTracks(item)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const playlistId: string = item.playlist.trim();
    if (!playlists.some((playlist) => playlist.id === playlistId)) {
        return { success: false, code: 404, message: `Playlist ${playlistId} not found` };
    }

    const trackId: string = item.track.trim();
    if (!tracks.some((track) => track.id === trackId)) {
        return { success: false, code: 404, message: `Track ${trackId} not found` };
    }

    return {
        success: true,
        code: 201,
        data: { id: randomUUID(), playlist: playlistId, track: trackId },
    };
}

export function deletePlaylistTrack(
    idPlaylistTrack: string,
): DeleteSuccessService | ErrorService {
    const index: number = playlistTracks.findIndex(
        (item: PlaylistTracksBD) => item.id === idPlaylistTrack,
    );

    if (index === -1) {
        return { success: false, code: 404, message: `Playlist track ${idPlaylistTrack} not found` };
    }

    return { success: true, code: 204, index };
}
