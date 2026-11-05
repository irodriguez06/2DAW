import { Playlist } from "../interfaces/playlist/playlist";
import { MAXPLAYLISTNAME } from "../interfaces/playlist/playlist.constants";

export function isValidPlaylist(playlist: Playlist): boolean {
    if (
        !playlist
        || typeof playlist.title !== "string"
        || typeof playlist.user !== "string"
    ) {
        return false;
    }

    const title: string = playlist.title.trim().replace(/\s+/g, " ");
    const user: string = playlist.user.trim();

    if (title.length === 0 || title.length > MAXPLAYLISTNAME) { return false; }
    if (user.length === 0) { return false; }

    return true;
}