import { Album } from "../interfaces/album/album";
import { MAXALBUMNAME } from "../interfaces/album/album.constants";

export function isValidAlbum(album: Album): boolean {
    if (
        !album
        || typeof album.title !== "string"
        || typeof album.artist !== "string"
        || typeof album.data !== "string"
    ) {
        return false;
    }

    const title: string = album.title.trim().replace(/\s+/g, " ");
    const artist: string = album.artist.trim();
    const data: string = album.data.trim();
    
    if (title.length === 0 || title.length > MAXALBUMNAME) { return false; }
    if (artist.length === 0) { return false; }
    if (data.length === 0 || Number.isNaN(Date.parse(data))) { return false; }

    return true;
}