import { tracks } from './data/track';
import type { Track } from './interface/track';
import './style.css';
import { crearCerca } from './view/cerca/cerca';
import { crearTableSongs } from './view/tableSongs/crearTableSongs';
import { crearTitol } from './view/tableSongs/crearTitol';
import { llistaCancons } from './view/tableSongs/llistaCancons';
import { crearBotoTancar } from './view/tableSongs/crearBotoTancar';


const appObj: HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;
const tbody: HTMLTableSectionElement = document.createElement("tbody");
const cardTrack: HTMLDivElement = document.createElement("div");

const emplenarCardTrack: (id: string) => void = (id: string) => {
    const t: Track | undefined = tracks.find((track: Track) => { return track.id === id; });
    if (t) {
        crearBotoTancar(t, cardTrack);
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