export interface AlbumTracks {
    id: string; //PK
    album: string; //FK
    track: string; //FK
}

// Afegir (post), treure (delete), llegir