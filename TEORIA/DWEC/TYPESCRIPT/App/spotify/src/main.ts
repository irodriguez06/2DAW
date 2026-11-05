import { tracks } from './data/track';
import type { Track } from './interface/track';
import './style.css';
import { crearCerca } from './view/cerca/cerca';
import { crearTitol } from './view/crearTitol';
import { crearTableSongs } from './view/tableSongs/crearTableSongs';
import { llistaCancons } from './view/tableSongs/llistaCancons';


const appObj: HTMLElement = document.querySelector<HTMLDivElement>('#app')!;
const tbody: HTMLTableSectionElement = document.createElement("tbody");
const cardTrack: HTMLDivElement = document.createElement("div");
cardTrack.className = "cardTrack";

function emplenarCard(track: Track): void {
    cardTrack.textContent = "";

    const textTrack: HTMLParagraphElement = document.createElement("p");
    textTrack.textContent = `${track.title} - ${track.artist}`;

    const tancarButton: HTMLButtonElement = document.createElement("button");
    tancarButton.textContent = "X";
    tancarButton.addEventListener("click", () => {
        cardTrack.textContent = "";
    });

    cardTrack.appendChild(textTrack);
    cardTrack.appendChild(tancarButton);
}

const seleccionarCanço: (track: Track) => void = (track: Track): void => {
    emplenarCard(track)
};

const cercar: (textABuscar: string) => void = (textABuscar: string) => {
    const llistaTracks: Track[] = tracks.filter(
        (t: Track) => { return t.title.toLowerCase().includes(textABuscar.trim().toLowerCase()); }
    );
    tbody.innerHTML = "";
    llistaCancons(llistaTracks, tbody, seleccionarCanço);
}

appObj.appendChild(crearTitol());
appObj.appendChild(crearCerca(cercar));
appObj.appendChild(crearTableSongs(tbody, seleccionarCanço));
appObj.appendChild(cardTrack);


