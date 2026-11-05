export interface Track {
    id: string; //PK
    title: string;
    artist: string; //FK
    duration: number;
}

// CRUD