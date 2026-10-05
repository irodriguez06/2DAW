import { PlaylistTracks } from "../interfaces/playlistTracks/playlistTracks";
import { MAXPLAYLISTNAME } from "../interfaces/playlist/playlist.constants";
import { MAXTITOL } from "../interfaces/track/track.constants";

export function isValidPlaylistTracks(playlistTracks: PlaylistTracks): boolean {

    if (!playlistTracks.track || !playlistTracks.playlist) {
        return false;
    }

    const track: string = playlistTracks.track.trim();
    const playlist: string = playlistTracks.playlist.trim();

    if (track.length === 0 || track.length > MAXTITOL) { return false; }
    if (playlist.length === 0 || playlist.length > MAXPLAYLISTNAME) { return false; }

    return true;
}