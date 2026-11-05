import { randomUUID } from "crypto";
import { artists } from "../data/artist/artist";
import { Artist } from "../interfaces/artist/artist";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { isValidArtist } from "../validators/artist.validator";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql";
import { SelectSuccessService } from "../interfaces/error/selectSuccessService";

export async function getAllArtists(): Promise<ArtistBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Artist`;

    const result: IResult<ArtistBD> = await request.query(queryText);
    return result.recordset;
}

export async function getArtistById(idArtist: string): Promise<SelectSuccessService<ArtistBD> | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Artist Where Artist.id = @id`;
    request.input("id", sql.UniqueIdentifier, idArtist);

    const result: IResult<ArtistBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Artist not found"
        }
    }
    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    }
}

export async function createArtist(artist: Artist): Promise<CreateSuccessService<number> | ErrorService> {

    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const artistName: string = artist.artistName.trim().replace(/\s+/g, " ");
    const realName: string = artist.realName.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `INSERT INTO ARTIST(name, pseudonym, country_id)
        VALUES(@realName, @artistName, @country_id)
    `;

    request.input("realName", sql.NVarChar, realName);
    request.input("artistName", sql.NVarChar, artistName);
    request.input("country_id", sql.UniqueIdentifier, artist.country);

    const result: IResult<number> = await request.query(queryText);

    return { success: true, code: 201, data: result.rowsAffected[0] };
}


export async function updateArtist(artist: Artist, idArtist: string): Promise<UpdateSuccessService<number> | ErrorService> {


    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const artistName: string = artist.artistName.trim().replace(/\s+/g, " ");
    const realName: string = artist.realName.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `UPDATE ARTIST SET
        name=@realName,pseudonym=@artistName,country_id=@country_id
        where Artist.id=@id
    `;

    request.input("realName", sql.NVarChar, realName);
    request.input("artistName", sql.NVarChar, artistName);
    request.input("country_id", sql.UniqueIdentifier, artist.country);
    request.input("id", sql.UniqueIdentifier, idArtist);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Artist not found"
        }
    }

    return { success: true, code: 200, data: result.rowsAffected[0] };
}


export function deleteArtist(idArtist: string): DeleteSuccessService | ErrorService {

    const trackIndex: number = artists.findIndex((artist: ArtistBD) => artist.id === idArtist);

    if (trackIndex === -1) {
        return { success: false, code: 404, message: "Artist not found" };
    }

    return { success: true, code: 204, index: trackIndex };
}