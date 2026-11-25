import type { GETTrack } from "../../../APIManagment/Tracks/Interfaces/Track";
import type { Track } from "../../../Model/Track";

export interface SongListProps{
    tracks: GETTrack[]
    play: (track: GETTrack) => void
    edit?: (t: Track) => void
}