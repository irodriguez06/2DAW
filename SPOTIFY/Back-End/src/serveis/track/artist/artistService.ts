import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../../../config/database";
import { ArtistBD } from "../../../interfaces/artist/artistBD";
import { ErrorService } from "../../../interfaces/error/errorService";
import { SelectSuccessService } from "../../../interfaces/error/selectSuccessService";
import { Artist } from "../../../interfaces/artist/artist";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { isValidArtist } from "../../../validators/artistValidator";
import { UpdateSuccessService } from "../../../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../../../interfaces/error/deleteSuccessService";


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

export async function createArtist(artist: Artist,): Promise<CreateSuccessService<number> | ErrorService> {

    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("name", sql.NVarChar(150), artist.nom.trim().replace(/\s+/g, " "));
    request.input("pseudonym", sql.NVarChar(150), artist.alias.trim().replace(/\s+/g, " "));
    request.input("country", sql.NVarChar(100), artist.pais.trim());

    const result: IResult<ArtistBD> = await request.query(`
        INSERT INTO Artist (name, pseudonym, country_id)
        SELECT @name, @pseudonym, Country.id
        FROM Country
        WHERE Country.name = @country
    `);

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: `Country ${artist.pais.trim()} not found` };
    }

    return { success: true, code: 201, data: result.rowsAffected[0] };
}

export async function updateArtist(idArtist: string, artist: Artist,): Promise<UpdateSuccessService<number> | ErrorService> {

    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idArtist);
    request.input("name", sql.NVarChar(150), artist.nom.trim().replace(/\s+/g, " "));
    request.input("pseudonym", sql.NVarChar(150), artist.alias.trim().replace(/\s+/g, " "));
    request.input("country", sql.NVarChar(100), artist.pais.trim());

    const result: IResult<ArtistBD> = await request.query(`
        UPDATE Artist
        SET name = @name,
            pseudonym = @pseudonym,
            country_id = (
                SELECT Country.id
                FROM Country
                WHERE Country.name = @country
            )
        WHERE Artist.id = @id
          AND EXISTS (
              SELECT 1
              FROM Country
              WHERE Country.name = @country
          )
    `);

    if (result.rowsAffected[0] === 0) {
        const countryResult: IResult<{ id: string }> = await pool.request()
            .input("country", sql.NVarChar(100), artist.pais.trim())
            .query("SELECT id FROM Country WHERE name = @country");

        if (countryResult.recordset.length === 0) {
            return { success: false, code: 404, message: `Country ${artist.pais.trim()} not found` };
        }

        return { success: false, code: 404, message: "Artist not found" };
    }

    return { success: true, code: 200, data: result.rowsAffected[0] };
}

export async function deleteArtist(idArtist: string): Promise<DeleteSuccessService | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idArtist);

    const result: IResult<ArtistBD> = await request.query(
        "DELETE FROM Artist WHERE Artist.id = @id",
    );

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: "Artist not found" };
    }

    return { success: true, code: 204 };
}
