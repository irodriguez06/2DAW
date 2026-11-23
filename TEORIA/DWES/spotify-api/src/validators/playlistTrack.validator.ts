import { playlists } from "../data/playlist/playlist";
import { tracks } from "../data/track/track";
import { PlaylistTrack } from "../interfaces/playlistTrack/playlistTrack";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import { TrackBD } from "../interfaces/track/trackBD";

export function isValidPlaylistTrack(playlistTrack: PlaylistTrack): boolean | string | undefined {
    if (!playlistTrack || !playlistTrack.playlist || !playlistTrack.track) {
        return false;
    }

    const playlistOK: PlaylistBD | undefined = playlists.find(
        (playlist: PlaylistBD) => { return playlist.id === playlistTrack.playlist }
    );

    if (!playlistOK) {
        return false;
    }

    const trackOK: TrackBD | undefined = tracks.find(
        (track: TrackBD) => { return track.id === playlistTrack.track }
    );

    if (!trackOK) {
        return false;
    }

    return true;
}
