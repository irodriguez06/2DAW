import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../../../config/database";
import { ArtistBD } from "../../../interfaces/artist/artistBD";
import { ErrorService } from "../../../interfaces/error/errorService";
import { SelectSuccessService } from "../../../interfaces/error/selectSuccessService";


export async function getAllArtists(): Promise<ArtistBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `
        SELECT Artist.id, Artist.name AS nom, Artist.pseudonym AS alias, Country.name AS pais
        FROM Artist
        INNER JOIN Country ON Artist.country_id = Country.id
    `;

    const result: IResult<ArtistBD> = await request.query(queryText);
    return result.recordset;
}

export async function getArtistById(idArtist: string,): Promise<SelectSuccessService<ArtistBD> | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `
        SELECT Artist.id, Artist.name AS nom, Artist.pseudonym AS alias, Country.name AS pais
        FROM Artist
        INNER JOIN Country ON Artist.country_id = Country.id
        WHERE Artist.id = @id
    `;

    request.input("id", sql.UniqueIdentifier, idArtist);

    const result: IResult<ArtistBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return { success: false, code: 404, message: "Artist not found" };
    }

    return { success: true, code: 200, data: result.recordset[0] };
}