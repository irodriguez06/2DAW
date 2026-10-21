import { tracks } from "../../data/track";
import { createTableHead } from "./createTableHead";
import { llistaCancons } from "./llistaCancons";

export function crearTableSongs(
    tbody: HTMLTableSectionElement,
    emplenarCardTrack: (id: string) => void
): HTMLTableElement {
    const table: HTMLTableElement = document.createElement("table");
    table.appendChild(createTableHead());
    llistaCancons(tracks, tbody, emplenarCardTrack);
    table.appendChild(tbody);
    return table;
}