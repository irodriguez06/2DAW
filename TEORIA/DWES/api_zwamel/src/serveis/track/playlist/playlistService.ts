import { randomUUID } from "crypto";
import { playlists } from "../../../data/track/playlist/playlist";
import { users } from "../../../data/track/user/user";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../../../interfaces/error/deleteSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { UpdateSuccessService } from "../../../interfaces/error/updateSuccessService";
import { Playlist } from "../../../interfaces/playlist/playlist";
import { PlaylistBD } from "../../../interfaces/playlist/playlistBD";
import { isValidPlaylist } from "../../../validators/playlistValidator";

export function getAllPlaylists(): PlaylistBD[] {
    return playlists;
}

export function getPlaylistById(idPlaylist: string): PlaylistBD | undefined {
    return playlists.find((playlist: PlaylistBD) => playlist.id === idPlaylist);
}

export function createPlaylist(
    playlist: Playlist,
): CreateSuccessService<PlaylistBD> | ErrorService {
    if (!isValidPlaylist(playlist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const userId: string = playlist.user.trim();
    if (!users.some((user) => user.id === userId)) {
        return { success: false, code: 404, message: `User ${userId} not found` };
    }

    return {
        success: true,
        code: 201,
        data: {
            id: randomUUID(),
            title: playlist.title.trim().replace(/\s+/g, " "),
            user: userId,
        },
    };
}

export function updatePlaylist(
    idPlaylist: string,
    playlist: Playlist,
): UpdateSuccessService<PlaylistBD> | ErrorService {
    if (!isValidPlaylist(playlist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = playlists.findIndex(
        (existingPlaylist: PlaylistBD) => existingPlaylist.id === idPlaylist,
    );
    if (index === -1) {
        return { success: false, code: 404, message: `Playlist ${idPlaylist} not found` };
    }

    const userId: string = playlist.user.trim();
    if (!users.some((user) => user.id === userId)) {
        return { success: false, code: 404, message: `User ${userId} not found` };
    }

    return {
        success: true,
        code: 200,
        data: {
            id: idPlaylist,
            title: playlist.title.trim().replace(/\s+/g, " "),
            user: userId,
        },
        index,
    };
}

export function deletePlaylist(idPlaylist: string): DeleteSuccessService | ErrorService {
    const index: number = playlists.findIndex(
        (playlist: PlaylistBD) => playlist.id === idPlaylist,
    );

    if (index === -1) {
        return { success: false, code: 404, message: `Playlist ${idPlaylist} not found` };
    }

    return { success: true, code: 204, index };
}
