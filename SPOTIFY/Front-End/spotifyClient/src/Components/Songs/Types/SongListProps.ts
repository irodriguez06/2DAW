import type { GETTrack } from "../../../APIManagment/Tracks/Interfaces/Track";
import type { Track } from "../../../Model/Track";

export interface SongListProps{
    tracks: GETTrack[]
    onPlay: (track: GETTrack) => void;
    edit?: (t:Track) => void;
}