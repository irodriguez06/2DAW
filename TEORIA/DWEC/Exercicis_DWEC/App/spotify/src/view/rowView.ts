import type { Track } from "../interface/track";

export function createRowSong(track:Track, onSelect: (id: string) => void) : HTMLTableRowElement {
    
    const songTr: HTMLTableRowElement = document.createElement("tr");

    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = track.title;

    const durationTd: HTMLTableCellElement = document.createElement("td");
    durationTd.textContent = track.duration.toString();

    const clicar: () => void = () => { onSelect(track.id); };
    titleTd.addEventListener("click", clicar);
    durationTd.addEventListener("click", clicar);

    songTr.appendChild(titleTd);
    songTr.appendChild(durationTd);

    return songTr;
}