import type { Track } from "../interface/track";

export function createRowSong(
    track: Track,
    emplenarCardTrack: (id: string) => void
): HTMLTableRowElement {
    const songTr: HTMLTableRowElement = document.createElement("tr");

    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = track.title;
    titleTd.addEventListener("click", () => {
        emplenarCardTrack(track.id);
    });

    const durationTd: HTMLTableCellElement = document.createElement("td");
    durationTd.textContent = track.duration.toString();
    durationTd.addEventListener("click", () => {
        emplenarCardTrack(track.id);
    });

    songTr.appendChild(titleTd);
    songTr.appendChild(durationTd);

    return songTr;
}