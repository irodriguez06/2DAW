import { tracks } from './data/track';
import type { Track } from './interface/track';
import './style.css';
import { crearCerca } from './view/cerca/cerca';
import { crearTableSongs } from './view/tableSongs/crearTableSongs';
import { crearTitol } from './view/tableSongs/crearTitol';
import { llistaCancons } from './view/tableSongs/llistaCancons';

const appObj: HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;
const tbody: HTMLTableSectionElement = document.createElement("tbody");
const detall: HTMLDivElement = document.createElement("div");
const textDetall: HTMLParagraphElement = document.createElement("p");
detall.appendChild(textDetall);

const seleccionar: (id: string) => void = (id: string) => {
    console.log(id);
    const track: Track | undefined = tracks.find((t: Track) => { return t.id === id; });
    if (track) {
        textDetall.textContent = `${track.title} - ${track.artist}`;
    }
};

tbody.addEventListener("click", (e: MouseEvent) => {
    const target: HTMLElement = e.target as HTMLElement;
    const tr: HTMLTableRowElemenl = target.closest<HTMLTableRowElement>("tr");
    if (tr && tr.id) {
        seleccionar(tr.id);
    }
});

const cercar: (textABuscar: string) => void = (textABuscar: string) => {
    const llistaTracks: Track[] = tracks.filter(
        (t: Track) => { return t.title.toLowerCase().includes(textABuscar.trim().toLowerCase()); }
    );
    tbody.innerHTML = "";
    llistaCancons(llistaTracks, tbody);
}

appObj.appendChild(crearTitol());
appObj.appendChild(crearTableSongs(tbody));
appObj.appendChild(crearCerca(cercar));
appObj.appendChild(detall);