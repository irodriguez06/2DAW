import { Response, Request } from "express";
import { ErrorService } from "../interfaces/error/errorService";
import { getAllCountries, getCountryById} from "../serveis/track/country/countryService";
import { CountryBD } from "../interfaces/country/countryBD";
import { SelectSuccessService } from "../interfaces/error/selectSuccessService";

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