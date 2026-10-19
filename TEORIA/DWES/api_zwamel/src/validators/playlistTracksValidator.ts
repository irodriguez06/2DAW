import { PlaylistTracks } from "../interfaces/playlistTracks/playlistTracks";

export function isValidPlaylistTracks(playlistTracks: PlaylistTracks): boolean {
    if (
        !playlistTracks
        || typeof playlistTracks.track !== "string"
        || typeof playlistTracks.playlist !== "string"
    ) {
        return false;
    }

    const track: string = playlistTracks.track.trim();
    const playlist: string = playlistTracks.playlist.trim();

    return track.length > 0 && playlist.length > 0;
}