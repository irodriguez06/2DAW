import { randomUUID } from "crypto";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { AlbumBD } from "../interfaces/album/albumBD";
import { albums } from "../data/album/album";
import { isValidAlbum } from "../validators/album.validator";
import { Album } from "../interfaces/album/album";

export function getAllAlbums(): AlbumBD[] {
    return albums;
}

export function getAlbumById(idAlbum: string): AlbumBD | undefined {
    return albums.find((a: AlbumBD) => { return a.id === idAlbum });
}

export function createAlbum(album: Album): CreateSuccessService<AlbumBD> | ErrorService {

    if (!isValidAlbum(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idalbum: string = randomUUID()
    
    const albumRecord: AlbumBD = {
        id: idalbum,
        artist: album.artist,
        date: album.date.trim(),
        name: album.name.trim().replace(/\s+/g, " ")
    };

    return { success: true, code: 201, data: albumRecord };
}

export function putAlbumById(album: Album, idAlbum: string): UpdateSuccessService<AlbumBD> | ErrorService {
    
    
    if (!isValidAlbum(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = albums.findIndex((a: AlbumBD) => { return a.id === idAlbum; });
    if (index === -1) {
        return { success: false, code: 404, message: "Album not found" };
    }

    const updatedAlbum: AlbumBD = {
        id: idAlbum,
        artist: album.artist,
        date: album.date.trim(),
        name: album.name.trim().replace(/\s+/g, " ")
    };

    return { success: true, code: 200, index: index, data: updatedAlbum };
}


export function deleteAlbum(idAlbum: string): DeleteSuccessService | ErrorService {

    const trackIndex: number = albums.findIndex((album: AlbumBD) => album.id === idAlbum);

    if (trackIndex === -1) {
        return { success: false, code: 404, message: "Album not found" };
    }

    return { success: true, code: 204, index: trackIndex };
}