import { User } from "../interfaces/user/user";
import { MAXUSERNAME } from "../interfaces/user/user.constants";
import { countries } from "../data/track/countries/countries";

export function isValidUser(user: User): boolean {

    if (!user || typeof user.email !== "string" || typeof user.country !== "string") {
        return false;
    }

    const email: string = user.email.trim();
    const country: string = user.country.trim();

    if (email.length === 0 || email.length > MAXUSERNAME) { return false; }

    // el país ha d'existir exactament a la llista de països vàlids
    if (!countries.some((validCountry) => validCountry.name === country)) { return false; }

    return true;
}