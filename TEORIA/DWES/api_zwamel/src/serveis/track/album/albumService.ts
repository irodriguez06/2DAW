import { randomUUID } from "crypto";
import { albums } from "../../../data/track/albums/albums";
import { artists } from "../../../data/track/artist/artist";
import { Album } from "../../../interfaces/album/album";
import { AlbumBD } from "../../../interfaces/album/albumBD";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../../../interfaces/error/deleteSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { UpdateSuccessService } from "../../../interfaces/error/updateSuccessService";
import { isValidAlbum } from "../../../validators/albumValidator";

export function getAllAlbums(): AlbumBD[] {
    return albums;
}

export function getAlbumById(idAlbum: string): AlbumBD | undefined {
    return albums.find((album: AlbumBD) => album.id === idAlbum);
}

export function createAlbum(album: Album): CreateSuccessService<AlbumBD> | ErrorService {
    if (!isValidAlbum(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const artistId: string = album.artist.trim();
    if (!artists.some((artist) => artist.id === artistId)) {
        return { success: false, code: 404, message: `Artist ${artistId} not found` };
    }

    const albumRecord: AlbumBD = {
        id: randomUUID(),
        title: album.title.trim().replace(/\s+/g, " "),
        artist: artistId,
        data: album.data.trim(),
    };

    return { success: true, code: 201, data: albumRecord };
}

export function updateAlbum(
    idAlbum: string,
    album: Album,
): UpdateSuccessService<AlbumBD> | ErrorService {
    if (!isValidAlbum(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = albums.findIndex((existingAlbum: AlbumBD) => existingAlbum.id === idAlbum);
    if (index === -1) {
        return { success: false, code: 404, message: `Album ${idAlbum} not found` };
    }

    const artistId: string = album.artist.trim();
    if (!artists.some((artist) => artist.id === artistId)) {
        return { success: false, code: 404, message: `Artist ${artistId} not found` };
    }

    const albumRecord: AlbumBD = {
        id: idAlbum,
        title: album.title.trim().replace(/\s+/g, " "),
        artist: artistId,
        data: album.data.trim(),
    };

    return { success: true, code: 200, data: albumRecord, index };
}

export function deleteAlbum(idAlbum: string): DeleteSuccessService | ErrorService {
    const index: number = albums.findIndex((album: AlbumBD) => album.id === idAlbum);

    if (index === -1) {
        return { success: false, code: 404, message: `Album ${idAlbum} not found` };
    }

    return { success: true, code: 204, index };
}
