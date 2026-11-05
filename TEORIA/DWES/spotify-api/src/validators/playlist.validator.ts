import { users } from "../data/user/user";
import { Playlist } from "../interfaces/playlist/playlist";
import { MAXTITOL } from "../interfaces/playlist/playlist.constants";
import { UserBD } from "../interfaces/user/userBD";

export function isValidPlaylist(playlist: Playlist): boolean | string | undefined {
    if (!playlist || !playlist.title || !playlist.user) {
        return false;
    }

    const titleLength: number = playlist.title.trim().replace(/\s+/g, " ").length;
    const titleOK: boolean = titleLength > 0 && titleLength <= MAXTITOL;

    if (!titleOK) {
        return false;
    }

    const userOK: UserBD | undefined = users.find(
        (user: UserBD) => { return user.id === playlist.user }
    );

    if (!userOK) {
        return false;
    }

    return true;
}
