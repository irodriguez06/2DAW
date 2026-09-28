import type { Track } from "../interface/track";

export function createRowSong(track:Track): HTMLTableRowElement {
    const songTr: HTMLTableRowElement = document.createElement("tr");

    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = track.title;

    const durationTd: HTMLTableCellElement = document.createElement("td");
    durationTd.textContent = track.duration.toString();

    songTr.appendChild(titleTd);
    songTr.appendChild(durationTd);

    return songTr;
}