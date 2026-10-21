import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../../../config/database";
import { User } from "../../../interfaces/user/user";
import { UserBD } from "../../../interfaces/user/userBD";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../../../interfaces/error/deleteSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { SelectSuccessService } from "../../../interfaces/error/selectSuccessService";
import { UpdateSuccessService } from "../../../interfaces/error/updateSuccessService";
import { isValidUser } from "../../../validators/userValidator";

export async function getAllUsers(): Promise<UserBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `
        SELECT [User].id, [User].email, Country.name AS country
        FROM [User]
        INNER JOIN Country ON [User].country_id = Country.id
    `;

    const result: IResult<UserBD> = await request.query(queryText);
    return result.recordset;
}

export async function getUserById(
    idUser: string,
): Promise<SelectSuccessService<UserBD> | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `
        SELECT [User].id, [User].email, Country.name AS country
        FROM [User]
        INNER JOIN Country ON [User].country_id = Country.id
        WHERE [User].id = @id
    `;
    request.input("id", sql.UniqueIdentifier, idUser);

    const result: IResult<UserBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return { success: false, code: 404, message: "User not found" };
    }

    return { success: true, code: 200, data: result.recordset[0] };
}

export async function createUser(
    user: User,
): Promise<CreateSuccessService<number> | ErrorService> {
    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("email", sql.NVarChar(255), user.email.trim());
    request.input("country", sql.NVarChar(100), user.country.trim());

    const queryText: string = `
        INSERT INTO [User] (email, country_id)
        SELECT @email, Country.id
        FROM Country
        WHERE Country.name = @country
    `;
    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: `Country ${user.country.trim()} not found` };
    }

    return { success: true, code: 201, data: result.rowsAffected[0] };
}

export async function updateUser(
    idUser: string,
    user: User,
): Promise<UpdateSuccessService<number> | ErrorService> {
    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idUser);
    request.input("email", sql.NVarChar(255), user.email.trim());
    request.input("country", sql.NVarChar(100), user.country.trim());

    const queryText: string = `
        UPDATE [User]
        SET email = @email,
            country_id = Country.id
        FROM [User]
        INNER JOIN Country ON Country.name = @country
        WHERE [User].id = @id
    `;
    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        const countryResult: IResult<{ id: string }> = await pool.request()
            .input("country", sql.NVarChar(100), user.country.trim())
            .query("SELECT id FROM Country WHERE name = @country");

        if (countryResult.recordset.length === 0) {
            return { success: false, code: 404, message: `Country ${user.country.trim()} not found` };
        }

        return { success: false, code: 404, message: "User not found" };
    }

    return { success: true, code: 200, data: result.rowsAffected[0] };
}

export async function deleteUser(idUser: string): Promise<DeleteSuccessService | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idUser);

    const queryText: string = "DELETE FROM [User] WHERE id = @id";
    const result: IResult<UserBD> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: "User not found" };
    }

    return { success: true, code: 204 };
}
