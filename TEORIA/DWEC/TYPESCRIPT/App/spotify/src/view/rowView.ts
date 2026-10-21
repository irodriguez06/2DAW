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

    const reproduccionsTd: HTMLTableCellElement = document.createElement("td");
    const textReproduccions: HTMLSpanElement = document.createElement("span");
    textReproduccions.textContent = "0";
    const botoPlay: HTMLButtonElement = document.createElement("button");
    botoPlay.type = "button";
    botoPlay.textContent = "Play";

    songTr.appendChild(titleTd);
    songTr.appendChild(durationTd);
    songTr.appendChild(reproduccionsTd);

    reproduccionsTd.appendChild(textReproduccions);
    reproduccionsTd.appendChild(botoPlay);

    return songTr;
}