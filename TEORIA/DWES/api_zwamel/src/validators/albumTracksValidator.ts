import { AlbumTracks } from "../interfaces/albumTracks/albumTracks";

export function isValidAlbumTracks(albumTracks: AlbumTracks): boolean {
    if (
        !albumTracks
        || typeof albumTracks.album !== "string"
        || typeof albumTracks.track !== "string"
    ) {
        return false;
    }

    const album: string = albumTracks.album.trim();
    const track: string = albumTracks.track.trim();

    return album.length > 0 && track.length > 0;
}