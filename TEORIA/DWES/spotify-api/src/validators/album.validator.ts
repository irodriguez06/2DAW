import { artists } from "../data/artist/artist";
import { Album } from "../interfaces/album/album";
import { MAXALBUMNAME, MAXDATE } from "../interfaces/album/album.constants";
import { ArtistBD } from "../interfaces/artist/artistBD";

export function isValidAlbum(album: Album): boolean | string | undefined {
    if (!album || !album.artist || !album.date || !album.name) {
        return false;
    }

    const nameLength: number = album.name.trim().replace(/\s+/g, " ").length;
    const dateLength: number = album.date.trim().length;
    const dataOK: boolean = nameLength > 0
        && nameLength <= MAXALBUMNAME
        && dateLength === MAXDATE;

    if (!dataOK) {
        return false;
    }

    const artistOK: ArtistBD | undefined = artists.find(
        (artist: ArtistBD) => { return artist.id === album.artist }
    );

    if (!artistOK) {
        return false;
    }

    return true;
}
