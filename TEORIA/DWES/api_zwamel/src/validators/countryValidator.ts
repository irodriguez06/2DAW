import { Country } from "../interfaces/country/country";
import { MAXCOUNTRYNAME } from "../interfaces/country/country.constants";

export function isValidCountry(country: Country): boolean {
    if (!country.name) {
        return false;
    }
    const name = country.name.trim().replace(/\s+/g, " ");
    return name.length > 0
        && name.length <= MAXCOUNTRYNAME
}