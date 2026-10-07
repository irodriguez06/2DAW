import { randomUUID } from "crypto";
import { artists } from "../../../data/track/artist/artist";
import { Artist } from "../../../interfaces/artist/artist";
import { ArtistBD } from "../../../interfaces/artist/artistBD";
import { CreateSuccessService } from "../../../interfaces/error/createSuccessService";
import { DeleteSuccessService } from "../../../interfaces/error/deleteSuccessService";
import { ErrorService } from "../../../interfaces/error/errorService";
import { UpdateSuccessService } from "../../../interfaces/error/updateSuccessService";
import { isValidArtist } from "../../../validators/artistValidator";

export function getAllArtists(): ArtistBD[] {
    return artists;
}

export function getArtistById(idArtist: string): ArtistBD | undefined {
    return artists.find((artist: ArtistBD) => artist.id === idArtist);
}

export function createArtist(artist: Artist): CreateSuccessService<ArtistBD> | ErrorService {
    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const artistRecord: ArtistBD = {
        id: randomUUID(),
        nom: artist.nom.trim().replace(/\s+/g, " "),
        alias: artist.alias.trim().replace(/\s+/g, " "),
        pais: artist.pais.trim(),
    };

    return { success: true, code: 201, data: artistRecord };
}

export function updateArtist(
    idArtist: string,
    artist: Artist,
): UpdateSuccessService<ArtistBD> | ErrorService {
    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = artists.findIndex((existingArtist: ArtistBD) => existingArtist.id === idArtist);
    if (index === -1) {
        return { success: false, code: 404, message: `Artist ${idArtist} not found` };
    }

    const artistRecord: ArtistBD = {
        id: idArtist,
        nom: artist.nom.trim().replace(/\s+/g, " "),
        alias: artist.alias.trim().replace(/\s+/g, " "),
        pais: artist.pais.trim(),
    };

    return { success: true, code: 200, data: artistRecord, index };
}

export function deleteArtist(idArtist: string): DeleteSuccessService | ErrorService {
    const index: number = artists.findIndex((artist: ArtistBD) => artist.id === idArtist);

    if (index === -1) {
        return { success: false, code: 404, message: `Artist ${idArtist} not found` };
    }

    return { success: true, code: 204, index };
}
