import { Artist } from "../interfaces/artist/artist";
import { MAXPSEUDONYM, MAXREALNAME } from "../interfaces/artist/artist.constants";
import { countries } from "../data/track/countries/countries";
import { CountryBD } from "../interfaces/country/countryBD";

// validar que hi hagi artista

export function isValidArtist(artist: Artist): boolean {
    if (!artist) {
        return false;
    }

// validar que totes les dades del body siguin presents

    if (!artist.alias|| !artist.nom || !artist.pais) {
        return false;
    }

    // validar dades que no son foreign key

    const pseudonym: string = artist.alias.trim();
    const realName: string = artist.nom.trim();
    const country: string = artist.pais.trim();

    if (pseudonym.length === 0 || pseudonym.length > MAXPSEUDONYM) { return false; }
    if (realName.length === 0 || realName.length > MAXREALNAME) { return false; }

    // el país ha d'existir exactament a la llista de països vàlids
    if (!countries.some((validCountry) => validCountry.name === country)) { return false; }

        return true;
}



    // validar identificar de pais sigui valid

    // const countryOK:CountryBD = countries.find(
    //     (c:CountryBD) => { c.id === artist.country }
    // )

    //     const dadesOK:boolean = artistNameLenght > 0
    //     && artistNameLength <= MAXARTISTNAME
    //     && realNameLength > 0
    //     && realNameLength <= MAXREALNAME
    // if (!dadesOK) {
    //     return false;
    // }

    // if (!country!) {
    //     return false;
    // }
    // return true;
    // }