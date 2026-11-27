import type { Track } from "../../../Model/Track";

export interface SongRowProps {
    id: string;
    title: string;
    artist: string;
    artist_id: string;
    duration: number;
    play: () => void;
    edit?: (t: Track) => void;
}