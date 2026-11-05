import { albums } from "../data/album/album";
import { tracks } from "../data/track/track";
import { AlbumBD } from "../interfaces/album/albumBD";
import { AlbumTrack } from "../interfaces/albumTrack/albumTrack";
import { TrackBD } from "../interfaces/track/trackBD";

export function isValidAlbumTrack(albumTrack: AlbumTrack): boolean | string | undefined {
    if (!albumTrack || !albumTrack.album || !albumTrack.track) {
        return false;
    }

    const albumOK: AlbumBD | undefined = albums.find(
        (album: AlbumBD) => { return album.id === albumTrack.album }
    );

    if (!albumOK) {
        return false;
    }

    const trackOK: TrackBD | undefined = tracks.find(
        (track: TrackBD) => { return track.id === albumTrack.track }
    );

    if (!trackOK) {
        return false;
    }

    return true;
}
