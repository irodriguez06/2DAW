import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../../../config/database";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../../../interfaces/error/deleteSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { SelectSuccessService } from "../../../interfaces/error/selectSuccessService";
import { UpdateSuccessService } from "../../../interfaces/error/updateSuccessService";
import { Playlist } from "../../../interfaces/playlist/playlist";
import { MAXPLAYLISTNAME } from "../../../interfaces/playlist/playlist.constants";
import { PlaylistBD } from "../../../interfaces/playlist/playlistBD";
import { isValidPlaylist } from "../../../validators/playlistValidator";

export async function getAllPlaylists(): Promise<PlaylistBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `
        SELECT id, title, user_id AS [user]
        FROM Playlist
    `;

    const result: IResult<PlaylistBD> = await request.query(queryText);
    return result.recordset;
}

export async function getPlaylistById(
    idPlaylist: string,
): Promise<SelectSuccessService<PlaylistBD> | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idPlaylist);

    const queryText: string = `
        SELECT id, title, user_id AS [user]
        FROM Playlist
        WHERE id = @id
    `;

    const result: IResult<PlaylistBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return { success: false, code: 404, message: "Playlist not found" };
    }

    return { success: true, code: 200, data: result.recordset[0] };
}

export async function createPlaylist(
    playlist: Playlist,
): Promise<CreateSuccessService<number> | ErrorService> {
    if (!isValidPlaylist(playlist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const userId: string = playlist.user.trim();
    const title: string = playlist.title.trim().replace(/\s+/g, " ");
    request.input("title", sql.NVarChar(MAXPLAYLISTNAME), title);
    request.input("user", sql.UniqueIdentifier, userId);

    const queryText: string = `
        INSERT INTO Playlist (title, user_id)
        SELECT @title, [User].id
        FROM [User]
        WHERE [User].id = @user
    `;

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: `User ${userId} not found` };
    }

    return { success: true, code: 201, data: result.rowsAffected[0] };
}

export async function updatePlaylist(
    idPlaylist: string,
    playlist: Playlist,
): Promise<UpdateSuccessService<number> | ErrorService> {
    if (!isValidPlaylist(playlist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const userId: string = playlist.user.trim();
    const title: string = playlist.title.trim().replace(/\s+/g, " ");
    request.input("id", sql.UniqueIdentifier, idPlaylist);
    request.input("title", sql.NVarChar(MAXPLAYLISTNAME), title);
    request.input("user", sql.UniqueIdentifier, userId);

    const queryText: string = `
        UPDATE Playlist
        SET title = @title,
            user_id = @user
        WHERE id = @id
          AND EXISTS (
              SELECT 1
              FROM [User]
              WHERE [User].id = @user
          )
    `;

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        const playlistResult: IResult<{ id: string }> = await pool.request()
            .input("id", sql.UniqueIdentifier, idPlaylist)
            .query("SELECT id FROM Playlist WHERE id = @id");

        if (playlistResult.recordset.length === 0) {
            return { success: false, code: 404, message: `Playlist ${idPlaylist} not found` };
        }

        const userResult: IResult<{ id: string }> = await pool.request()
            .input("user", sql.UniqueIdentifier, userId)
            .query("SELECT id FROM [User] WHERE id = @user");

        if (userResult.recordset.length === 0) {
            return { success: false, code: 404, message: `User ${userId} not found` };
        }

        return { success: false, code: 404, message: `Playlist ${idPlaylist} not found` };
    }

    return { success: true, code: 200, data: result.rowsAffected[0] };
}

export async function deletePlaylist(
    idPlaylist: string,
): Promise<DeleteSuccessService | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idPlaylist);

    const result: IResult<PlaylistBD> = await request.query(
        "DELETE FROM Playlist WHERE id = @id",
    );

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: `Playlist ${idPlaylist} not found` };
    }

    return { success: true, code: 204 };
}
