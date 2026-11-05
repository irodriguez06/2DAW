import assert from "node:assert/strict";
import { after, before, beforeEach, describe, it } from "node:test";
import { app } from "../app";
import { albums } from "../data/track/albums/albums";
import { albumTracks } from "../data/track/albumTracks/albumTracks";
import { artists } from "../data/track/artist/artist";
import { history } from "../data/track/history/history";
import { playlists } from "../data/track/playlist/playlist";
import { playlistTracks } from "../data/track/playlistTracks/playlistTracks";
import { tracks } from "../data/track/track";
import { users } from "../data/track/user/user";
import { APICONFIG } from "../config/apiConfig";

const artistId = "artist-test";
const userId = "user-test";
const trackId = "track-test";
const playlistId = "playlist-test";
const albumId = "album-test";

let server: ReturnType<typeof app.listen>;
let baseUrl: string;

function clear<T>(items: T[]): void {
    items.splice(0, items.length);
}

async function send(path: string, init?: RequestInit): Promise<Response> {
    return fetch(`${baseUrl}${path}`, init);
}

async function sendJson(path: string, method: string, body: unknown): Promise<Response> {
    return send(path, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
    });
}

async function responseJson<T>(response: Response): Promise<T> {
    return response.json() as Promise<T>;
}

describe("API HTTP", () => {
    before(async () => {
        server = app.listen(0, "127.0.0.1");
        await new Promise<void>((resolve, reject) => {
            server.once("listening", resolve);
            server.once("error", reject);
        });

        const address = server.address();
        assert.ok(address && typeof address !== "string");
        baseUrl = `http://127.0.0.1:${address.port}`;
    });

    after(async () => {
        await new Promise<void>((resolve, reject) => {
            server.close((error) => error ? reject(error) : resolve());
        });
    });

    beforeEach(() => {
        clear(albums);
        clear(albumTracks);
        clear(artists);
        clear(history);
        clear(playlists);
        clear(playlistTracks);
        clear(tracks);
        clear(users);

        artists.push({ id: artistId, nom: "Artista de prova", alias: "", pais: "country-test" });
        users.push({ id: userId, email: "prova@example.test", country: "country-test" });
        tracks.push({ id: trackId, title: "Cançó de prova", artist: artistId, duration: 180 });
        playlists.push({ id: playlistId, title: "Playlist inicial", user: userId });
        albums.push({ id: albumId, title: "Àlbum inicial", artist: artistId, data: "2024-01-01" });
    });

    it("retorna la configuració i les col·leccions inicials", async () => {
        const rootResponse = await send("/");
        assert.equal(rootResponse.status, 200);
        assert.deepEqual(JSON.parse(await rootResponse.json() as string), APICONFIG);

        for (const path of ["/playlists", "/albums", "/histories", "/playlisttracks", "/albumtracks"]) {
            const response = await send(path);
            assert.equal(response.status, 200, path);
            assert.ok(Array.isArray(await response.json()), path);
        }
    });

    it("rebutja dades invàlides als recursos connectats a la base de dades", async () => {
        const invalidRequests: Array<[string, string, unknown]> = [
            ["/tracks/test-id", "POST", { title: "", artist: artistId, duration: 180 }],
            ["/tracks/test-id", "PUT", { title: "Cançó", artist: artistId, duration: 0 }],
            ["/artists/test-id", "POST", { nom: "", alias: "Alias", pais: "País" }],
            ["/artists/test-id", "PUT", { nom: "Nom", alias: "", pais: "País" }],
            ["/countries", "POST", { name: "   " }],
            ["/countries/test-id", "PUT", { name: "" }],
            ["/users", "POST", { email: "", country: "País" }],
            ["/users/test-id", "PUT", { email: "correu@example.test", country: "" }],
        ];

        for (const [path, method, body] of invalidRequests) {
            const response = await sendJson(path, method, body);
            assert.equal(response.status, 400, `${method} ${path}`);
            assert.deepEqual(await responseJson(response), { message: "Invalid data" });
        }
    });

    it("crea, consulta, actualitza i esborra playlists, i rebutja dades incorrectes", async () => {
        const invalidResponse = await sendJson("/playlists", "POST", { title: "   ", user: userId });
        assert.equal(invalidResponse.status, 400);
        assert.deepEqual(await responseJson(invalidResponse), { message: "Invalid data" });

        const missingUserResponse = await sendJson("/playlists", "POST", { title: "Nova", user: "missing" });
        assert.equal(missingUserResponse.status, 404);

        const createResponse = await sendJson("/playlists", "POST", { title: "  Nova   playlist ", user: userId });
        assert.equal(createResponse.status, 201);
        const created = await responseJson<{ data: { id: string; title: string; user: string } }>(createResponse);
        assert.ok(created.data.id);
        assert.equal(created.data.title, "Nova playlist");
        assert.equal(created.data.user, userId);

        const getResponse = await send(`/playlists/${created.data.id}`);
        assert.equal(getResponse.status, 200);
        assert.equal((await responseJson<{ id: string }>(getResponse)).id, created.data.id);
        assert.equal((await send("/playlists/not-found")).status, 404);

        const updateResponse = await sendJson(`/playlists/${created.data.id}`, "PUT", {
            title: "Actualitzada",
            user: userId,
        });
        assert.equal(updateResponse.status, 200);
        assert.equal((await responseJson<{ data: { title: string } }>(updateResponse)).data.title, "Actualitzada");
        assert.equal((await sendJson("/playlists/not-found", "PUT", { title: "Canvi", user: userId })).status, 404);

        assert.equal((await send(`/playlists/${created.data.id}`, { method: "DELETE" })).status, 204);
        assert.equal((await send(`/playlists/${created.data.id}`)).status, 404);
        assert.equal((await send("/playlists/not-found", { method: "DELETE" })).status, 404);
    });

    it("gestiona els àlbums amb referències d'artista vàlides", async () => {
        const invalidResponse = await sendJson("/albums/ignored", "POST", { title: "", artist: artistId, data: "no-date" });
        assert.equal(invalidResponse.status, 400);

        const missingArtistResponse = await sendJson("/albums/ignored", "POST", {
            title: "Àlbum",
            artist: "missing",
            data: "2025-02-03",
        });
        assert.equal(missingArtistResponse.status, 404);

        const createResponse = await sendJson("/albums/ignored", "POST", {
            title: "  Àlbum   nou ",
            artist: artistId,
            data: "2025-02-03",
        });
        assert.equal(createResponse.status, 201);
        const created = await responseJson<{ data: { id: string; title: string; artist: string } }>(createResponse);
        assert.ok(created.data.id);
        assert.equal(created.data.title, "Àlbum nou");
        assert.equal(created.data.artist, artistId);
        assert.equal((await send(`/albums/${created.data.id}`)).status, 200);
        assert.equal((await send("/albums/not-found")).status, 404);

        const updateResponse = await sendJson(`/albums/${created.data.id}`, "PUT", {
            title: "Àlbum modificat",
            artist: artistId,
            data: "2025-04-05",
        });
        assert.equal(updateResponse.status, 200);
        assert.equal((await responseJson<{ data: { title: string } }>(updateResponse)).data.title, "Àlbum modificat");
        assert.equal((await sendJson("/albums/not-found", "PUT", {
            title: "Àlbum",
            artist: artistId,
            data: "2025-04-05",
        })).status, 404);

        assert.equal((await send(`/albums/${created.data.id}`, { method: "DELETE" })).status, 204);
        assert.equal((await send(`/albums/${created.data.id}`)).status, 404);
        assert.equal((await send("/albums/not-found", { method: "DELETE" })).status, 404);
    });

    it("crea i consulta l'historial, rebutjant usuaris, pistes i dates incorrectes", async () => {
        const invalidResponse = await sendJson("/histories", "POST", {
            user: userId,
            track: trackId,
            data: "no-date",
        });
        assert.equal(invalidResponse.status, 400);

        const missingUserResponse = await sendJson("/histories", "POST", {
            user: "missing",
            track: trackId,
            data: "2025-01-01",
        });
        assert.equal(missingUserResponse.status, 404);

        const missingTrackResponse = await sendJson("/histories", "POST", {
            user: userId,
            track: "missing",
            data: "2025-01-01",
        });
        assert.equal(missingTrackResponse.status, 404);

        const createResponse = await sendJson("/histories", "POST", {
            user: userId,
            track: trackId,
            data: "2025-01-01",
        });
        assert.equal(createResponse.status, 201);
        const created = await responseJson<{ data: { id: string; user: string; track: string; data: string } }>(createResponse);
        assert.ok(created.data.id);
        assert.equal(created.data.user, userId);
        assert.equal(created.data.track, trackId);
        assert.equal(new Date(created.data.data).toISOString(), created.data.data);
        assert.equal((await send(`/histories/${created.data.id}`)).status, 200);
        assert.equal((await send("/histories/not-found")).status, 404);
    });

    it("gestiona les relacions playlist-pista i àlbum-pista", async () => {
        const invalidPlaylistTrack = await sendJson("/playlisttracks", "POST", { playlist: "", track: trackId });
        assert.equal(invalidPlaylistTrack.status, 400);
        assert.equal((await sendJson("/playlisttracks", "POST", { playlist: "missing", track: trackId })).status, 404);
        assert.equal((await sendJson("/playlisttracks", "POST", { playlist: playlistId, track: "missing" })).status, 404);

        const playlistTrackResponse = await sendJson("/playlisttracks", "POST", { playlist: playlistId, track: trackId });
        assert.equal(playlistTrackResponse.status, 201);
        const playlistTrack = await responseJson<{ data: { id: string } }>(playlistTrackResponse);
        assert.ok(playlistTrack.data.id);
        assert.equal((await send(`/playlisttracks/${playlistTrack.data.id}`)).status, 200);
        assert.equal((await send("/playlisttracks/not-found")).status, 404);
        assert.equal((await send(`/playlisttracks/${playlistTrack.data.id}`, { method: "DELETE" })).status, 204);
        assert.equal((await send(`/playlisttracks/${playlistTrack.data.id}`)).status, 404);
        assert.equal((await send("/playlisttracks/not-found", { method: "DELETE" })).status, 404);

        const invalidAlbumTrack = await sendJson("/albumtracks", "POST", { album: "", track: trackId });
        assert.equal(invalidAlbumTrack.status, 400);
        assert.equal((await sendJson("/albumtracks", "POST", { album: "missing", track: trackId })).status, 404);
        assert.equal((await sendJson("/albumtracks", "POST", { album: albumId, track: "missing" })).status, 404);

        const albumTrackResponse = await sendJson("/albumtracks", "POST", { album: albumId, track: trackId });
        assert.equal(albumTrackResponse.status, 201);
        const albumTrack = await responseJson<{ data: { id: string } }>(albumTrackResponse);
        assert.ok(albumTrack.data.id);
        assert.equal((await send(`/albumtracks/${albumTrack.data.id}`)).status, 200);
        assert.equal((await send("/albumtracks/not-found")).status, 404);
        assert.equal((await send(`/albumtracks/${albumTrack.data.id}`, { method: "DELETE" })).status, 204);
        assert.equal((await send(`/albumtracks/${albumTrack.data.id}`)).status, 404);
        assert.equal((await send("/albumtracks/not-found", { method: "DELETE" })).status, 404);
    });
});
