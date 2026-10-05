import { User } from "../interfaces/user/user";
import { MAXUSERNAME } from "../interfaces/user/user.constants";
import { VALID_COUNTRIES } from "../data/track/countries/countries";

export function isValidUser(user: User): boolean {

    if (!user.email|| !user.country) {
        return false;
    }

    const email: string = user.email.trim();
    const country: string = user.country.trim();

    if (email.length === 0 || email.length > MAXUSERNAME) { return false; }

    // el país ha d'existir exactament a la llista de països vàlids
    if (!VALID_COUNTRIES.includes(country)) { return false; }

    return true;
}