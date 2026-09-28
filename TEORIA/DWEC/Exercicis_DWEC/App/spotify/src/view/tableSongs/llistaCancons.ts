import type { Track } from "../../interface/track"
import { createRowSong } from "../rowView"

export function llistaCancons(tracks:Track[], tbody:HTMLTableSectionElement, onSelect: (id: string) => void
):void {
    tracks.forEach(
    (t:Track) => { tbody.appendChild(createRowSong(t, onSelect)) }
)};