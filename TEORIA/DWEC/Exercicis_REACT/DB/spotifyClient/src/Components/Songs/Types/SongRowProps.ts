import type { Track } from "../../../Model/Track";

export interface SongRowProps {
    id: string;
    key: string;
    title: string;
    artist: string;
    artist_id: string;
    duration: number;
    onPlay: () => void;
    edit?: (t:Track) => void;
}