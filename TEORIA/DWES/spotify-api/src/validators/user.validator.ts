import { User } from "../interfaces/user/user";
import { MAXCOUNTRY, MAXEMAIL } from "../interfaces/user/user.constants";

export function isValidUser(user: User): boolean {
    if (!user || !user.email || !user.country) {
        return false;
    }

    const email: string = user.email.trim().replace(/\s+/g, " ");

    // Aqui s'hauria de posar que validi el country per id

    return email.length <= MAXEMAIL;
}
