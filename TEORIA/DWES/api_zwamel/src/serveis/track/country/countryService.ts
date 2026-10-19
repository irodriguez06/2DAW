import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../../../config/database";
import { CountryBD } from "../../../interfaces/country/countryBD";
import { ErrorService } from "../../../interfaces/error/errorService";
import { SelectSuccessService } from "../../../interfaces/error/selectSuccessService";

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