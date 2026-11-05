import { tracks } from "../../data/track";
import type { Track } from "../../interface/track";
import { createTableHead } from "./createTableHead";
import { llistaCancons } from "./llistaCancons";

export function crearTableSongs(tbody: HTMLTableSectionElement, mostrarInfoCanço: (track: Track) => void): HTMLTableElement {
    const table: HTMLTableElement = document.createElement("table");
    table.appendChild(createTableHead());

    llistaCancons(tracks, tbody, mostrarInfoCanço);
    table.appendChild(tbody);
    return table;
}