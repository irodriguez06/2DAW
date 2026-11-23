import { Response, Request } from "express";
import { ErrorService } from "../interfaces/error/errorService";
import { CreateSuccessService } from "../interfaces/error/createSuccessService";
import {
    createCountry,
    getAllCountries,
    getCountryById,
    updateCountry,
} from "../serveis/track/country/countryService";
import { CountryBD } from "../interfaces/country/countryBD";
import { SelectSuccessService } from "../interfaces/error/selectSuccessService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";

export async function getAllCountriesController(_req: Request, res: Response): Promise<Response> {
    const countries: CountryBD[] = await getAllCountries();
    return res.status(200).json(countries);
} 

export async function getCountriesByIdController(req: Request, res: Response): Promise<Response> {
    const result: SelectSuccessService<CountryBD> | ErrorService = await getCountryById(
        req.params.id as string,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
};

export async function postCountryController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<number> | ErrorService = await createCountry(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function putCountryController(req: Request, res: Response): Promise<Response> {
    const result: UpdateSuccessService<number> | ErrorService = await updateCountry(
        req.params.id as string,
        req.body,
    );

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}
