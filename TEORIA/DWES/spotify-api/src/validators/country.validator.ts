import { Country } from "../interfaces/country/country";
import { MAXNOM } from "../interfaces/country/country.constants";

export function isValidCountry(country: Country): boolean {
    if (!country || !country.nom) {
        return false;
    }

    const nom = country.nom.trim().replace(/\s+/g, " ");

    return nom.length > 0
        && nom.length <= MAXNOM
}