import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../../../config/database";
import { CountryBD } from "../../../interfaces/country/countryBD";
import { ErrorService } from "../../../interfaces/error/errorService";
import { SelectSuccessService } from "../../../interfaces/error/selectSuccessService";
import { Country } from "../../../interfaces/country/country";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { isValidCountry } from "../../../validators/countryValidator";
import { UpdateSuccessService } from "../../../interfaces/error/updateSuccessService";

export async function getAllCountries(): Promise<CountryBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = "SELECT id, name FROM Country";

    const result: IResult<CountryBD> = await request.query(queryText);
    return result.recordset;
}

export async function getCountryById(
    idCountry: string,
): Promise<SelectSuccessService<CountryBD> | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = "SELECT id, name FROM Country WHERE id = @id";
    request.input("id", sql.UniqueIdentifier, idCountry);

    const result: IResult<CountryBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return { success: false, code: 404, message: "Country not found" };
    }

    return { success: true, code: 200, data: result.recordset[0] };
}

export async function createCountry(
    country: Country,
): Promise<CreateSuccessService<number> | ErrorService> {
    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("name", sql.NVarChar(100), country.name.trim().replace(/\s+/g, " "));

    const queryText: string = "INSERT INTO Country (name) VALUES (@name)";
    const result: IResult<number> = await request.query(queryText);

    return { success: true, code: 201, data: result.rowsAffected[0] };
}

export async function updateCountry(
    idCountry: string,
    country: Country,
): Promise<UpdateSuccessService<number> | ErrorService> {
    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idCountry);
    request.input("name", sql.NVarChar(100), country.name.trim().replace(/\s+/g, " "));

    const queryText: string = "UPDATE Country SET name = @name WHERE id = @id";
    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: `Country ${idCountry} not found` };
    }

    return { success: true, code: 200, data: result.rowsAffected[0] };
}