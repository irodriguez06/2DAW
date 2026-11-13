export type LikeValue = 1 | -1;

export interface AddLike {
    track: string;
    like: LikeValue;
}

export interface GETLikeHistory extends AddLike {
    id: string;
    date: string;
}

export interface LikeResponse {
    event: GETLikeHistory;
    totalLikes: number;
}

export interface LikeTotalResponse {
    totalLikes: number;
    lastAction: LikeValue | null;
}
