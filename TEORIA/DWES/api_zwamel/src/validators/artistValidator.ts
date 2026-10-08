import { Artist } from "../interfaces/artist/artist";
import { MAXPSEUDONYM, MAXREALNAME } from "../interfaces/artist/artist.constants";
import { countries } from "../data/track/countries/countries";

export function isValidArtist(artist: Artist): boolean {

    if (!artist.alias|| !artist.nom || !artist.pais) {
        return false;
    }

    const pseudonym: string = artist.alias.trim();
    const realName: string = artist.nom.trim();
    const country: string = artist.pais.trim();

    if (pseudonym.length === 0 || pseudonym.length > MAXPSEUDONYM) { return false; }
    if (realName.length === 0 || realName.length > MAXREALNAME) { return false; }

    // el país ha d'existir exactament a la llista de països vàlids
    if (!countries.some((validCountry) => validCountry.name === country)) { return false; }

    return true;
}