import { randomUUID } from "crypto";
import { playlists } from "../data/playlist/playlist";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { Playlist } from "../interfaces/playlist/playlist";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import { isValidPlaylist } from "../validators/playlist.validator";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";

export function getAllPlaylists(): PlaylistBD[] {
    return playlists;
}

export function getPlaylistById(idPlaylist: string): PlaylistBD | undefined {
    return playlists.find((p: PlaylistBD) => { return p.id === idPlaylist });
}

export function createPlaylist(playlist: Playlist): CreateSuccessService<PlaylistBD> | ErrorService {

    if (!isValidPlaylist(playlist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idplaylist: string = randomUUID()
    
    const playlistRecord: PlaylistBD = {
        id: idplaylist,
        title: playlist.title.trim().replace(/\s+/g, " "),
        user: playlist.user
    };

    return { success: true, code: 201, data: playlistRecord };
}

export function putPlaylistById(playlist: Playlist, idPlaylist: string): UpdateSuccessService<PlaylistBD> | ErrorService {
    
    
    if (!isValidPlaylist(playlist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = playlists.findIndex((p: PlaylistBD) => { return p.id === idPlaylist; });
    if (index === -1) {
        return { success: false, code: 404, message: "Playlist not found" };
    }

    const updatedPlaylist: PlaylistBD = {
        id: idPlaylist,
        title: playlist.title.trim().replace(/\s+/g, " "),
        user: playlist.user
    };

    return { success: true, code: 200, index: index, data: updatedPlaylist };
}


export function deletePlaylist(idPlaylist: string): DeleteSuccessService | ErrorService {

    const trackIndex: number = playlists.findIndex((playlist: PlaylistBD) => playlist.id === idPlaylist);

    if (trackIndex === -1) {
        return { success: false, code: 404, message: "Playlist not found" };
    }

    return { success: true, code: 204, index: trackIndex };
}