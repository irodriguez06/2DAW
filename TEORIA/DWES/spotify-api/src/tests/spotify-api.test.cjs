const { after, before, test } = require("node:test");
const assert = require("node:assert/strict");

process.env.DB_USER = "test";
process.env.DB_PASSWORD = "test";
process.env.DB_HOST = "localhost";
process.env.DB_PORT = "1433";
process.env.DB_NAME = "SpotifyDB";
process.env.DB_ENCRYPT = "false";
process.env.DB_TRUST_SERVER_CERTIFICATE = "true";

const sql = require("mssql");
const artistId = "da88ae18-0f0e-4529-922e-c0a9da3ffaa0";
const trackId = "3499-cdde-cdab-efab";
const missingId = "00000000-0000-0000-0000-000000000000";
const countryId = "20b53f02-76bb-4256-a064-fc152ca4d2f8";
const userId = "a26f06ae-a532-43a5-8fd1-3a3fa4ba8444";
const playlistId = "7aeeb3ef-30da-447b-bfca-2f0a6f00d92e";
const albumId = "19d93bdf-309c-45e2-98a8-0a382bd075ee";
const initialTrack = {
    id: trackId,
    title: "Sunday bloody Sunday",
    artist_id: artistId,
    duration: 180
};
const initialArtist = {
    id: artistId,
    name: "Javi",
    pseudonym: "Puado",
    country_id: countryId
};
const db = {
    tracks: [{ ...initialTrack }],
    artists: [{ ...initialArtist }],
    inputs: []
};

sql.connect = async () => ({
    request() {
        const parameters = {};
        const request = {
            input(name, _type, value) {
                parameters[name] = value;
                db.inputs.push({ name, value });
                return request;
            },
            async query(queryText) {
                const query = queryText.toLowerCase();
                const table = query.includes("track") ? db.tracks : db.artists;
                const id = parameters.id;

                if (query.startsWith("select")) {
                    return {
                        recordset: query.includes("where")
                            ? table.filter((row) => row.id === id)
                            : [...table]
                    };
                }

                if (query.startsWith("insert into track")) {
                    table.push({
                        id: "created-track",
                        title: parameters.title,
                        artist_id: parameters.artist_id,
                        duration: parameters.duration
                    });
                    return { rowsAffected: [1] };
                }

                if (query.startsWith("insert into artist")) {
                    table.push({
                        id: "created-artist",
                        name: parameters.realName,
                        pseudonym: parameters.artistName,
                        country_id: parameters.country_id
                    });
                    return { rowsAffected: [1] };
                }

                const row = table.find((item) => item.id === id);
                if (query.startsWith("update") && row) {
                    if (query.includes("track")) {
                        row.title = parameters.title;
                        row.artist_id = parameters.artist_id;
                        row.duration = parameters.duration;
                    } else {
                        row.name = parameters.realName;
                        row.pseudonym = parameters.artistName;
                        row.country_id = parameters.country_id;
                    }
                    return { rowsAffected: [1] };
                }
                if (query.startsWith("delete") && row) {
                    table.splice(table.indexOf(row), 1);
                    return { rowsAffected: [1] };
                }
                return { rowsAffected: [0] };
            }
        };
        return request;
    }
});

const { app } = require("../app");
let server;
let baseUrl;

before(async () => {
    server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    if (server) {
        await new Promise((resolve, reject) => {
            server.close((error) => error ? reject(error) : resolve());
        });
    }
});

async function request(path, options = {}) {
    return fetch(`${baseUrl}${path}`, {
        ...options,
        headers: {
            ...(options.body ? { "content-type": "application/json" } : {}),
            ...options.headers
        }
    });
}

async function sendJson(method, path, body) {
    return request(path, { method, body: JSON.stringify(body) });
}

async function responseJson(response) {
    return response.json();
}

test("Spotify API HTTP behavior", async (t) => {
    await t.test("root returns the API configuration as a JSON object", async () => {
        const response = await request("/");
        assert.equal(response.status, 200);
        const body = await responseJson(response);
        assert.equal(typeof body, "object");
        assert.equal(body.name, "API Spotify");
        assert.equal(body.version.major, 1);
    });

    await t.test("unknown routes return 404", async () => {
        const response = await request("/not-a-resource");
        assert.equal(response.status, 404);
    });

    await t.test("countries support list, lookup, create, update and validation", async () => {
        const list = await request("/countries");
        assert.equal(list.status, 200);
        assert.ok((await responseJson(list)).some((country) => country.id === countryId));

        const found = await request(`/countries/${countryId}`);
        assert.equal(found.status, 200);
        assert.equal((await responseJson(found)).nom, "Andorra");
        assert.equal((await request(`/countries/${missingId}`)).status, 404);

        const created = await sendJson("POST", "/countries", { nom: "  Test   Land " });
        assert.equal(created.status, 201);
        const createdBody = await responseJson(created);
        assert.equal(createdBody.data.nom, "Test Land");
        assert.equal((await request(`/countries/${createdBody.data.id}`)).status, 200);

        const updated = await sendJson("PUT", `/countries/${createdBody.data.id}`, { nom: "Updated Land" });
        assert.equal(updated.status, 200);
        const updatedCountry = await responseJson(await request(`/countries/${createdBody.data.id}`));
        assert.equal(updatedCountry.nom, "Updated Land");
        assert.equal((await sendJson("POST", "/countries", {})).status, 400);
        assert.equal((await sendJson("PUT", `/countries/${missingId}`, { nom: "Nowhere" })).status, 404);
    });

    await t.test("users support list, lookup, create, update, delete and 404 responses", async () => {
        assert.equal((await request("/users")).status, 200);
        assert.equal((await request(`/users/${userId}`)).status, 200);
        assert.equal((await request(`/users/${missingId}`)).status, 404);

        const created = await sendJson("POST", "/users", { email: "new@example.com", country: "Andorra" });
        assert.equal(created.status, 201);
        const user = (await responseJson(created)).data;
        assert.equal((await request(`/users/${user.id}`)).status, 200);

        const updated = await sendJson("PUT", `/users/${user.id}`, { email: "updated@example.com", country: "Andorra" });
        assert.equal(updated.status, 200);
        assert.equal((await responseJson(await request(`/users/${user.id}`))).email, "updated@example.com");
        assert.equal((await sendJson("POST", "/users", {})).status, 400);
        assert.equal((await request(`/users/${missingId}`, { method: "DELETE" })).status, 404);
        assert.equal((await request(`/users/${user.id}`, { method: "DELETE" })).status, 204);
        assert.equal((await request(`/users/${user.id}`)).status, 404);
    });

    await t.test("playlists support list, lookup, create, update and delete", async () => {
        assert.equal((await request("/playlists")).status, 200);
        assert.equal((await request(`/playlists/${playlistId}`)).status, 200);
        assert.equal((await request(`/playlists/${missingId}`)).status, 404);

        const created = await sendJson("POST", "/playlists", { title: "  New   Mix ", user: userId });
        assert.equal(created.status, 201);
        const playlist = (await responseJson(created)).data;
        assert.equal(playlist.title, "New Mix");

        assert.equal((await sendJson("PUT", `/playlists/${playlist.id}`, { title: "Updated Mix", user: userId })).status, 200);
        assert.equal((await responseJson(await request(`/playlists/${playlist.id}`))).title, "Updated Mix");
        assert.equal((await sendJson("POST", "/playlists", { title: "Invalid", user: missingId })).status, 400);
        assert.equal((await request(`/playlists/${missingId}`, { method: "DELETE" })).status, 404);
        assert.equal((await request(`/playlists/${playlist.id}`, { method: "DELETE" })).status, 204);
        assert.equal((await request(`/playlists/${playlist.id}`)).status, 404);
    });

    await t.test("histories support list, lookup, create and relation validation", async () => {
        assert.equal((await request("/histories")).status, 200);
        assert.equal((await request(`/histories/${missingId}`)).status, 404);

        const created = await sendJson("POST", "/histories", {
            user: userId,
            track: "3456-abdl-cd21-ef12",
            date: "2025-01-02"
        });
        assert.equal(created.status, 201);
        const history = (await responseJson(created)).data;
        assert.equal((await request(`/histories/${history.id}`)).status, 200);

        assert.equal((await sendJson("POST", "/histories", {
            user: missingId,
            track: "3456-abdl-cd21-ef12",
            date: "2025-01-02"
        })).status, 400);
        assert.equal((await sendJson("POST", "/histories", {})).status, 400);
    });

    await t.test("albums support list, lookup, create, update, delete and relation validation", async () => {
        assert.equal((await request("/albums")).status, 200);
        assert.equal((await request(`/albums/${albumId}`)).status, 200);
        assert.equal((await request(`/albums/${missingId}`)).status, 404);

        const created = await sendJson("POST", "/albums", {
            artist: artistId,
            date: "2024-08-09",
            name: "  Test   Album "
        });
        assert.equal(created.status, 201);
        const album = (await responseJson(created)).data;
        assert.equal(album.name, "Test Album");
        assert.equal((await sendJson("PUT", `/albums/${album.id}`, {
            artist: artistId,
            date: "2024-08-09",
            name: "Updated Album"
        })).status, 200);
        assert.equal((await request(`/albums/${album.id}`)).status, 200);
        assert.equal((await sendJson("POST", "/albums", {
            artist: missingId,
            date: "2024-08-09",
            name: "Invalid"
        })).status, 400);
        assert.equal((await request(`/albums/${missingId}`, { method: "DELETE" })).status, 404);
        assert.equal((await request(`/albums/${album.id}`, { method: "DELETE" })).status, 204);
        assert.equal((await request(`/albums/${album.id}`)).status, 404);
    });

    await t.test("playlist and album tracks support relation validation and deletion", async () => {
        const playlistTrack = await sendJson("POST", "/playlisttracks", {
            playlist: playlistId,
            track: "3456-abdl-cd21-ef12"
        });
        assert.equal(playlistTrack.status, 201);
        const playlistTrackId = (await responseJson(playlistTrack)).data.id;
        assert.equal((await request(`/playlisttracks/${playlistTrackId}`, { method: "DELETE" })).status, 204);
        assert.equal((await request(`/playlisttracks/${playlistTrackId}`, { method: "DELETE" })).status, 404);
        assert.equal((await sendJson("POST", "/playlisttracks", { playlist: missingId, track: trackId })).status, 400);

        const albumTrack = await sendJson("POST", "/albumtracks", {
            album: albumId,
            track: "3456-abdl-cd21-ef12"
        });
        assert.equal(albumTrack.status, 201);
        const albumTrackId = (await responseJson(albumTrack)).data.id;
        assert.equal((await request(`/albumtracks/${albumTrackId}`, { method: "DELETE" })).status, 204);
        assert.equal((await request(`/albumtracks/${albumTrackId}`, { method: "DELETE" })).status, 404);
        assert.equal((await sendJson("POST", "/albumtracks", { album: missingId, track: trackId })).status, 400);
    });

    await t.test("tracks use SQL-backed list, lookup, create, update and delete paths", async () => {
        assert.equal((await request("/tracks")).status, 200);
        assert.ok((await responseJson(await request("/tracks"))).some((track) => track.id === trackId));
        assert.equal((await request(`/tracks/${trackId}`)).status, 200);
        assert.equal((await request(`/tracks/${missingId}`)).status, 404);
        assert.equal((await sendJson("POST", "/tracks", {})).status, 400);

        const created = await sendJson("POST", "/tracks", {
            title: "' OR 1=1 --",
            artist: artistId,
            duration: 205
        });
        assert.equal(created.status, 201);
        assert.ok(db.inputs.some((input) => input.name === "title" && input.value === "' OR 1=1 --"));

        assert.equal((await sendJson("PUT", `/tracks/${trackId}`, {
            title: "Updated track",
            artist: artistId,
            duration: 210
        })).status, 200);
        assert.equal((await request(`/tracks/${missingId}`, { method: "DELETE" })).status, 404);
        assert.equal((await request(`/tracks/${trackId}`, { method: "DELETE" })).status, 204);
    });

    await t.test("artists use SQL-backed list, lookup, create, update and not-found paths", async () => {
        assert.equal((await request("/artists")).status, 200);
        assert.ok((await responseJson(await request("/artists"))).some((artist) => artist.id === artistId));
        assert.equal((await request(`/artists/${artistId}`)).status, 200);
        assert.equal((await request(`/artists/${missingId}`)).status, 404);
        assert.equal((await sendJson("POST", "/artists", {})).status, 400);

        const created = await sendJson("POST", "/artists", {
            artistName: "  Test   Name ",
            realName: "Real Name",
            country: countryId
        });
        assert.equal(created.status, 201);
        assert.ok(db.inputs.some((input) => input.name === "artistName" && input.value === "Test Name"));

        assert.equal((await sendJson("PUT", `/artists/${artistId}`, {
            artistName: "Updated",
            realName: "Updated Real",
            country: countryId
        })).status, 200);
        assert.equal((await sendJson("PUT", `/artists/${missingId}`, {
            artistName: "Unknown",
            realName: "Unknown Person",
            country: countryId
        })).status, 404);
    });

    await t.test("malformed JSON receives a client error", async () => {
        const response = await request("/countries", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: "{"
        });
        assert.equal(response.status, 400);
    });

    await t.test("entity validators accept boundary values and reject invalid relationships", () => {
        const { isValidTrack } = require("../validators/track.validator");
        const { isValidArtist } = require("../validators/artist.validator");
        const { isValidCountry } = require("../validators/country.validator");
        const { isValidUser } = require("../validators/user.validator");
        const { isValidPlaylist } = require("../validators/playlist.validator");
        const { isValidHistory } = require("../validators/history.validator");
        const { isValidAlbum } = require("../validators/album.validator");
        const { isValidPlaylistTrack } = require("../validators/playlistTrack.validator");
        const { isValidAlbumTrack } = require("../validators/albumTrack.validator");

        assert.equal(isValidTrack({ title: "T".repeat(100), artist: artistId, duration: 1 }), true);
        assert.equal(isValidTrack({ title: " ", artist: artistId, duration: 1 }), false);
        assert.equal(isValidTrack({ title: "Title", artist: artistId, duration: 0 }), false);

        assert.equal(isValidArtist({
            artistName: "A".repeat(60),
            realName: "R".repeat(100),
            country: countryId
        }), true);
        assert.equal(isValidArtist({ artistName: "", realName: "Name", country: countryId }), false);

        assert.equal(isValidCountry({ nom: "C".repeat(100) }), true);
        assert.equal(isValidCountry({ nom: " " }), false);
        assert.equal(isValidUser({ email: "e".repeat(100), country: "Andorra" }), true);
        assert.equal(isValidUser({ email: "", country: "Andorra" }), false);

        assert.equal(isValidPlaylist({ title: "Playlist", user: userId }), true);
        assert.equal(isValidPlaylist({ title: "Playlist", user: missingId }), false);
        assert.equal(isValidHistory({
            user: userId,
            track: "3456-abdl-cd21-ef12",
            date: "2025-01-02"
        }), true);
        assert.equal(isValidHistory({ user: userId, track: missingId, date: "2025-01-02" }), false);

        assert.equal(isValidAlbum({ artist: artistId, date: "2025-01-02", name: "Album" }), true);
        assert.equal(isValidAlbum({ artist: missingId, date: "2025-01-02", name: "Album" }), false);
        assert.equal(isValidPlaylistTrack({ playlist: playlistId, track: "3456-abdl-cd21-ef12" }), true);
        assert.equal(isValidAlbumTrack({ album: albumId, track: "3456-abdl-cd21-ef12" }), true);
    });

    await t.test("artist deletion succeeds once and then returns 404", async () => {
        assert.equal((await request(`/artists/${artistId}`, { method: "DELETE" })).status, 204);
        assert.equal((await request(`/artists/${artistId}`, { method: "DELETE" })).status, 404);
    });
});
