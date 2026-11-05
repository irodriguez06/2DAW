import type { Track } from "../../interface/track";
import { createRowSong } from "../rowView";

export function llistaCancons(tracks: Track[], tbody: HTMLTableSectionElement, mostrarInfoCanço: (track: Track) => void): void {
    tracks.forEach(
        (t: Track) => { tbody.appendChild(createRowSong(t, mostrarInfoCanço)); }
    );
}
