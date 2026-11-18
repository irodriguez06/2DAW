import type { TrackCreate } from "../../../APIManagment/Tracks/Interfaces/TrackCreate";
import type { Track } from "../../../Model/Track";

export interface AddSongFormProps {
    song?: Track;
    submit: (t: TrackCreate) => void;
}