import { Response, Request } from "express";
import { createCountry, getAllCountries, getCountryById, putCountryById } from "../Services/countryService";
import { CountryBD } from "../interfaces/country/countryBD";
import { countries } from "../data/country/country";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";

export function getAllCountriesController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllCountries());
}

export function getCountryByIdController(req: Request, res: Response): Response {
    const country: CountryBD | undefined = getCountryById(req.params.id as string);

    if (!country) {
        return res.status(404).json({ message: `Country not found` });
    }
    return res.status(200).json(country);
}

export function postCountryController(req: Request, res: Response): Response {
    const result: CreateSuccessService<CountryBD> | ErrorService = createCountry(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    countries.push((result as CreateSuccessService<CountryBD>).data);
    return res.status(result.code).json(result);
}

export function putCountryController(req: Request, res: Response): Response {
    const result: UpdateSuccessService<CountryBD> | ErrorService = putCountryById(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as UpdateSuccessService<CountryBD>).index;
    countries[index] = (result as UpdateSuccessService<CountryBD>).data;

    return res.status(result.code).json(result);
}