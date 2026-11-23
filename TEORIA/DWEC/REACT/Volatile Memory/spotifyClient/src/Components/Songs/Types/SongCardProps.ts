import type { TrackView } from "./TrackView";

export interface SongCardProps{
    trackInfo: TrackView;
    isPlaying: boolean;
    play: () => void;
    like: () => void;
    reset: () => void;
}