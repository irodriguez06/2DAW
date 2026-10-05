import { AlbumTracks } from "../interfaces/albumTracks/albumTracks";
import { MAXALBUMTRACKSNAME } from "../interfaces/albumTracks/albumTracks.constants";
    
export function isValidAlbumTracks(albumTracks: AlbumTracks): boolean {

    if (!albumTracks.album|| !albumTracks.track) {
        return false;
    }

    const album: string = albumTracks.album.trim();
    const track: string = albumTracks.track.trim();

    if (album.length === 0 || album.length > MAXALBUMTRACKSNAME) { return false; }

    return true;
}