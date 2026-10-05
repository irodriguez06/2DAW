import { Album } from "../interfaces/album/album";
import { MAXALBUMNAME } from "../interfaces/album/album.constants";

export function isValidAlbum(album: Album): boolean {

    if (!album.artist || !album.data) {
        return false;
    }

    const artist: string = album.artist.trim();
    const data: string = album.data.trim();
    
    if (data.length === 0 || data.length > MAXALBUMNAME) { return false; }

    return true;
}