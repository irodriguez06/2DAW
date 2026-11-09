import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../../../config/database";
import { AlbumTracks } from "../../../interfaces/albumTracks/albumTracks";
import { AlbumTracksBD } from "../../../interfaces/albumTracks/albumTracksBD";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../../../interfaces/error/deleteSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { SelectSuccessService } from "../../../interfaces/error/selectSuccessService";
import { isValidAlbumTracks } from "../../../validators/albumTracksValidator";

export async function getAllAlbumTracks(): Promise<AlbumTracksBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const result: IResult<AlbumTracksBD> = await request.query(`
        SELECT id, album_id AS album, track_id AS track
        FROM AlbumTracks
    `);

    return result.recordset;
}

export async function getAlbumTrackById(
    idAlbumTrack: string,
): Promise<SelectSuccessService<AlbumTracksBD> | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idAlbumTrack);

    const result: IResult<AlbumTracksBD> = await request.query(`
        SELECT id, album_id AS album, track_id AS track
        FROM AlbumTracks
        WHERE id = @id
    `);

    if (result.recordset.length === 0) {
        return { success: false, code: 404, message: "Album track not found" };
    }

    return { success: true, code: 200, data: result.recordset[0] };
}

export async function createAlbumTrack(
    item: AlbumTracks,
): Promise<CreateSuccessService<number> | ErrorService> {
    if (!isValidAlbumTracks(item)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const albumId: string = item.album.trim();
    const trackId: string = item.track.trim();
    request.input("album", sql.UniqueIdentifier, albumId);
    request.input("track", sql.UniqueIdentifier, trackId);

    const result: IResult<number> = await request.query(`
        INSERT INTO AlbumTracks (album_id, track_id)
        SELECT Album.id, Track.id
        FROM Album
        CROSS JOIN Track
        WHERE Album.id = @album
          AND Track.id = @track
    `);

    if (result.rowsAffected[0] === 0) {
        const albumResult: IResult<{ id: string }> = await pool.request()
            .input("album", sql.UniqueIdentifier, albumId)
            .query("SELECT id FROM Album WHERE id = @album");

        if (albumResult.recordset.length === 0) {
            return { success: false, code: 404, message: `Album ${albumId} not found` };
        }

        return { success: false, code: 404, message: `Track ${trackId} not found` };
    }

    return { success: true, code: 201, data: result.rowsAffected[0] };
}

export async function deleteAlbumTrack(
    idAlbumTrack: string,
): Promise<DeleteSuccessService | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idAlbumTrack);

    const result: IResult<AlbumTracksBD> = await request.query(
        "DELETE FROM AlbumTracks WHERE id = @id",
    );

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: "Album track not found" };
    }

    return { success: true, code: 204 };
}
