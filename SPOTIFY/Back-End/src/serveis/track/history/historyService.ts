import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../../../config/database";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { SelectSuccessService } from "../../../interfaces/error/selectSuccessService";
import { History } from "../../../interfaces/history/history";
import { HistoryBD } from "../../../interfaces/history/historyBD";
import { isValidHistory } from "../../../validators/historyValidator";

export async function getAllHistory(): Promise<HistoryBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const result: IResult<HistoryBD> = await request.query(`
        SELECT id, user_id AS [user], track_id AS track, [date]
        FROM History
        ORDER BY [date] DESC
    `);

    return result.recordset;
}

export async function getHistoryById(
    idHistory: string,
): Promise<SelectSuccessService<HistoryBD> | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idHistory);

    const result: IResult<HistoryBD> = await request.query(`
        SELECT id, user_id AS [user], track_id AS track, [date]
        FROM History
        WHERE id = @id
    `);

    if (result.recordset.length === 0) {
        return { success: false, code: 404, message: "History record not found" };
    }

    return { success: true, code: 200, data: result.recordset[0] };
}

export async function createHistory(
    item: History,
): Promise<CreateSuccessService<number> | ErrorService> {
    if (!isValidHistory(item)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const userId: string = item.user.trim();
    const trackId: string = item.track.trim();
    request.input("user", sql.UniqueIdentifier, userId);
    request.input("track", sql.UniqueIdentifier, trackId);

    const result: IResult<number> = await request.query(`
        INSERT INTO History (user_id, track_id)
        SELECT [User].id, Track.id
        FROM [User]
        CROSS JOIN Track
        WHERE [User].id = @user
          AND Track.id = @track
    `);

    if (result.rowsAffected[0] === 0) {
        const userResult: IResult<{ id: string }> = await pool.request()
            .input("user", sql.UniqueIdentifier, userId)
            .query("SELECT id FROM [User] WHERE id = @user");

        if (userResult.recordset.length === 0) {
            return { success: false, code: 404, message: `User ${userId} not found` };
        }

        return { success: false, code: 404, message: `Track ${trackId} not found` };
    }

    return { success: true, code: 201, data: result.rowsAffected[0] };
}
