import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../../../config/database";
import { Album } from "../../../interfaces/album/album";
import { MAXALBUMNAME } from "../../../interfaces/album/album.constants";
import { AlbumBD } from "../../../interfaces/album/albumBD";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../../../interfaces/error/deleteSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { SelectSuccessService } from "../../../interfaces/error/selectSuccessService";
import { UpdateSuccessService } from "../../../interfaces/error/updateSuccessService";
import { isValidAlbum } from "../../../validators/albumValidator";

export async function getAllAlbums(): Promise<AlbumBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `
        SELECT id, title, artist_id AS artist,
               CONVERT(char(10), [date], 23) AS data
        FROM Album
    `;

    const result: IResult<AlbumBD> = await request.query(queryText);
    return result.recordset;
}

export async function getAlbumById(
    idAlbum: string,
): Promise<SelectSuccessService<AlbumBD> | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idAlbum);

    const queryText: string = `
        SELECT id, title, artist_id AS artist,
               CONVERT(char(10), [date], 23) AS data
        FROM Album
        WHERE id = @id
    `;

    const result: IResult<AlbumBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return { success: false, code: 404, message: "Album not found" };
    }

    return { success: true, code: 200, data: result.recordset[0] };
}

export async function createAlbum(
    album: Album,
): Promise<CreateSuccessService<number> | ErrorService> {
    if (!isValidAlbum(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const title: string = album.title.trim().replace(/\s+/g, " ");
    const artistId: string = album.artist.trim();
    const date: string = new Date(album.data.trim()).toISOString().slice(0, 10);
    request.input("title", sql.NVarChar(MAXALBUMNAME), title);
    request.input("artist", sql.UniqueIdentifier, artistId);
    request.input("date", sql.VarChar(10), date);

    const queryText: string = `
        INSERT INTO Album (title, artist_id, [date])
        SELECT @title, Artist.id, CONVERT(date, @date, 23)
        FROM Artist
        WHERE Artist.id = @artist
    `;

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: `Artist ${artistId} not found` };
    }

    return { success: true, code: 201, data: result.rowsAffected[0] };
}

export async function updateAlbum(
    idAlbum: string,
    album: Album,
): Promise<UpdateSuccessService<number> | ErrorService> {
    if (!isValidAlbum(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const title: string = album.title.trim().replace(/\s+/g, " ");
    const artistId: string = album.artist.trim();
    const date: string = new Date(album.data.trim()).toISOString().slice(0, 10);
    request.input("id", sql.UniqueIdentifier, idAlbum);
    request.input("title", sql.NVarChar(MAXALBUMNAME), title);
    request.input("artist", sql.UniqueIdentifier, artistId);
    request.input("date", sql.VarChar(10), date);

    const queryText: string = `
        UPDATE Album
        SET title = @title,
            artist_id = @artist,
            [date] = CONVERT(date, @date, 23)
        WHERE id = @id
          AND EXISTS (
              SELECT 1
              FROM Artist
              WHERE Artist.id = @artist
          )
    `;

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        const albumResult: IResult<{ id: string }> = await pool.request()
            .input("id", sql.UniqueIdentifier, idAlbum)
            .query("SELECT id FROM Album WHERE id = @id");

        if (albumResult.recordset.length === 0) {
            return { success: false, code: 404, message: `Album ${idAlbum} not found` };
        }

        const artistResult: IResult<{ id: string }> = await pool.request()
            .input("artist", sql.UniqueIdentifier, artistId)
            .query("SELECT id FROM Artist WHERE id = @artist");

        if (artistResult.recordset.length === 0) {
            return { success: false, code: 404, message: `Artist ${artistId} not found` };
        }

        return { success: false, code: 404, message: `Album ${idAlbum} not found` };
    }

    return { success: true, code: 200, data: result.rowsAffected[0] };
}

export async function deleteAlbum(
    idAlbum: string,
): Promise<DeleteSuccessService | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idAlbum);

    const result: IResult<AlbumBD> = await request.query(
        "DELETE FROM Album WHERE id = @id",
    );

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: `Album ${idAlbum} not found` };
    }

    return { success: true, code: 204 };
}
