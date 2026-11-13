import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../../../config/database";
import { Like } from "../../../interfaces/likes/like";
import { LikeBD } from "../../../interfaces/likes/likeBD";
import { isValidLike } from "../../../validators/likeValidator";

interface LikeTotal {
    totalLikes: number;
    lastAction: 1 | -1 | null;
}

type CreateLikeResult =
    | { success: true; code: 201; data: { event: LikeBD; totalLikes: number } }
    | { success: false; code: number; message: string };

export async function getAllLikes(): Promise<LikeBD[]> {
    const pool: ConnectionPool = await getConnection();
    const result: IResult<LikeBD> = await pool.request().query(`
        SELECT id, track_id AS track, [like], [date]
        FROM dbo.Likes
        ORDER BY [date] DESC, id DESC
    `);

    return result.recordset;
}

export async function getTrackLikeTotal(trackId: string): Promise<LikeTotal> {
    const pool: ConnectionPool = await getConnection();
    const result: IResult<LikeTotal> = await pool.request()
        .input("track", sql.UniqueIdentifier, trackId)
        .query(`
            SELECT
                ISNULL(SUM([like]), 0) AS totalLikes,
                (
                    SELECT TOP 1 [like]
                    FROM dbo.Likes AS latestLike
                    WHERE latestLike.track_id = @track
                    ORDER BY latestLike.[date] DESC, latestLike.id DESC
                ) AS lastAction
            FROM dbo.Likes
            WHERE track_id = @track
        `);

    return result.recordset[0];
}

export async function createLike(item: Like): Promise<CreateLikeResult> {
    if (!isValidLike(item)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const insertResult: IResult<LikeBD> = await pool.request()
        .input("track", sql.UniqueIdentifier, item.track.trim())
        .input("like", sql.Int, item.like)
        .query(`
            INSERT INTO dbo.Likes (track_id, [like])
            OUTPUT
                INSERTED.id,
                INSERTED.track_id AS track,
                INSERTED.[like],
                INSERTED.[date]
            SELECT Track.id, @like
            FROM Track
            WHERE Track.id = @track
        `);

    if (insertResult.recordset.length === 0) {
        return { success: false, code: 404, message: `Track ${item.track} not found` };
    }

    const total = await getTrackLikeTotal(item.track);
    return {
        success: true,
        code: 201,
        data: {
            event: insertResult.recordset[0],
            totalLikes: total.totalLikes,
        },
    };
}
