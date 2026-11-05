export interface PlaylistTracks {
    id: string; //PK
    playlist: string; //FK
    track: string; //FK
}

// Afegir (post), treure (delete), llegir