import { randomUUID } from "crypto";
import { countries } from "../data/country/country";
import { Country } from "../interfaces/country/country";
import { CountryBD } from "../interfaces/country/countryBD";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { isValidCountry } from "../validators/country.validator";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";

export function getAllCountries(): CountryBD[] {
    return countries;
}

export function getCountryById(idCountry: string): CountryBD | undefined {
    return countries.find((c: CountryBD) => { return c.id === idCountry });
}

export function createCountry(country: Country): CreateSuccessService<CountryBD> | ErrorService {

    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idCountry: string = randomUUID()
    
    const countryRecord: CountryBD = {
        id: idCountry,
        nom: country.nom.trim().replace(/\s+/g, " ")
    };

    return { success: true, code: 201, data: countryRecord };
}

export function putCountryById(country: Country, idCountry: string): UpdateSuccessService<CountryBD> | ErrorService {
    
    
    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = countries.findIndex((c: CountryBD) => { return c.id === idCountry; });
    if (index === -1) {
        return { success: false, code: 404, message: "Country not found" };
    }

    const updatedCountry: CountryBD = {
        id: idCountry,
        nom: country.nom.trim().replace(/\s+/g, " "),
    };

    return { success: true, code: 200, index: index, data: updatedCountry };
}