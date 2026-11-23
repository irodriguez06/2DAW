import { Artist } from "../interfaces/artist/artist";
import { MAXPSEUDONYM, MAXREALNAME } from "../interfaces/artist/artist.constants";

// validar que hi hagi artista

export function isValidArtist(artist: Artist): boolean {
    if (
        !artist
        || typeof artist.alias !== "string"
        || typeof artist.nom !== "string"
        || typeof artist.pais !== "string"
    ) {
        return false;
    }

// validar que totes les dades del body siguin presents

    // validar dades que no son foreign key

    const pseudonym: string = artist.alias.trim().replace(/\s+/g, " ");
    const realName: string = artist.nom.trim().replace(/\s+/g, " ");

    if (pseudonym.length === 0 || pseudonym.length > MAXPSEUDONYM) { return false; }
    if (realName.length === 0 || realName.length > MAXREALNAME) { return false; }
    if (artist.pais.trim().length === 0) { return false; }

    return true;
}