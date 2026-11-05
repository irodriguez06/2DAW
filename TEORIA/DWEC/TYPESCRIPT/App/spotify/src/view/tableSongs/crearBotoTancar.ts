import type { Track } from "../../interface/track";

export function crearBotoTancar(t: Track, cardTrack: HTMLDivElement): void {
    const textTrack: HTMLParagraphElement = document.createElement("p");
    const botoTancar: HTMLButtonElement = document.createElement("button");

    cardTrack.innerHTML = "";
    botoTancar.addEventListener("click", () => {
        cardTrack.innerHTML = "";
    });
    botoTancar.type = "button";
    botoTancar.textContent = "X";

    cardTrack.appendChild(textTrack);
    cardTrack.appendChild(botoTancar);
    cardTrack.style.display = "none";
    textTrack.textContent = `${t.title} - ${t.artist}`;
    cardTrack.style.display = "block";
}