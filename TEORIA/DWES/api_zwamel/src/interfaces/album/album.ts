export interface Album {
    id: string; //PK
    title: string;
    artist: string; //FK
    data: string;
}

// CRUD