import { tracks } from './data/track';
import type { Track } from './interface/track';
import './style.css';
import { crearCerca } from './view/cerca/cerca';
import { crearTableSongs } from './view/tableSongs/crearTableSongs';
import { crearTitol } from './view/tableSongs/crearTitol';
import { llistaCancons } from './view/tableSongs/llistaCancons';

const appObj: HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;
const tbody: HTMLTableSectionElement = document.createElement("tbody");
const cardTrack: HTMLDivElement = document.createElement("div");
const textTrack: HTMLParagraphElement = document.createElement("p");
const botoTancar: HTMLButtonElement = document.createElement("button");

botoTancar.type = "button";
botoTancar.textContent = "X";
botoTancar.addEventListener("click", () => {
    cardTrack.style.display = "none";
});

cardTrack.appendChild(textTrack);
cardTrack.appendChild(botoTancar);
cardTrack.style.display = "none";

const emplenarCardTrack: (id: string) => void = (id: string) => {
    console.log(id);
    const t: Track | undefined = tracks.find((track: Track) => { return track.id === id; });
    if (t) {
        textTrack.textContent = `${t.title} - ${t.artist}`;
    }
};

const cercar: (textABuscar: string) => void = (textABuscar: string) => {
    const llistaTracks: Track[] = tracks.filter(
        (t: Track) => { return t.title.toLowerCase().includes(textABuscar.trim().toLowerCase()); }
    );
    tbody.innerHTML = "";
    llistaCancons(llistaTracks, tbody, emplenarCardTrack);
}

appObj.appendChild(crearTitol());
appObj.appendChild(crearTableSongs(tbody, emplenarCardTrack));
appObj.appendChild(crearCerca(cercar));
appObj.appendChild(cardTrack);