import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../../../config/database";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../../../interfaces/error/deleteSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { SelectSuccessService } from "../../../interfaces/error/selectSuccessService";
import { PlaylistTracks } from "../../../interfaces/playlistTracks/playlistTracks";
import { PlaylistTracksBD } from "../../../interfaces/playlistTracks/playlistTrackBD";
import { isValidPlaylistTracks } from "../../../validators/playlistTracksValidator";

export async function getAllPlaylistTracks(): Promise<PlaylistTracksBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const result: IResult<PlaylistTracksBD> = await request.query(`
        SELECT id, playlist_id AS playlist, track_id AS track
        FROM PlaylistTracks
    `);

    return result.recordset;
}

export async function getPlaylistTrackById(
    idPlaylistTrack: string,
): Promise<SelectSuccessService<PlaylistTracksBD> | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idPlaylistTrack);

    const result: IResult<PlaylistTracksBD> = await request.query(`
        SELECT id, playlist_id AS playlist, track_id AS track
        FROM PlaylistTracks
        WHERE id = @id
    `);

    if (result.recordset.length === 0) {
        return { success: false, code: 404, message: "Playlist track not found" };
    }

    return { success: true, code: 200, data: result.recordset[0] };
}

export async function createPlaylistTrack(
    item: PlaylistTracks,
): Promise<CreateSuccessService<number> | ErrorService> {
    if (!isValidPlaylistTracks(item)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const playlistId: string = item.playlist.trim();
    const trackId: string = item.track.trim();
    request.input("playlist", sql.UniqueIdentifier, playlistId);
    request.input("track", sql.UniqueIdentifier, trackId);

    const result: IResult<number> = await request.query(`
        INSERT INTO PlaylistTracks (playlist_id, track_id)
        SELECT Playlist.id, Track.id
        FROM Playlist
        CROSS JOIN Track
        WHERE Playlist.id = @playlist
          AND Track.id = @track
    `);

    if (result.rowsAffected[0] === 0) {
        const playlistResult: IResult<{ id: string }> = await pool.request()
            .input("playlist", sql.UniqueIdentifier, playlistId)
            .query("SELECT id FROM Playlist WHERE id = @playlist");

        if (playlistResult.recordset.length === 0) {
            return { success: false, code: 404, message: `Playlist ${playlistId} not found` };
        }

        return { success: false, code: 404, message: `Track ${trackId} not found` };
    }

    return { success: true, code: 201, data: result.rowsAffected[0] };
}

export async function deletePlaylistTrack(
    idPlaylistTrack: string,
): Promise<DeleteSuccessService | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idPlaylistTrack);

    const result: IResult<PlaylistTracksBD> = await request.query(
        "DELETE FROM PlaylistTracks WHERE id = @id",
    );

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: "Playlist track not found" };
    }

    return { success: true, code: 204 };
}
