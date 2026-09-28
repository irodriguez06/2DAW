import { tracks } from './data/track';
import type { Track } from './interface/track';
import './style.css';
import { crearCerca} from './view/cerca/cerca';
import { crearTableSongs } from './view/tableSongs/crearTableSongs';
import { crearTitol } from './view/tableSongs/crearTitol';
import { llistaCancons } from './view/tableSongs/llistaCancons';

const appObj:HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;
const tbody:HTMLTableSectionElement = document.createElement("tbody");

const seleccionar: (id: string) => void = (id: string) => {
    console.log(id);
};

const cercar:(textABuscar:string) => void = (textABuscar:string) => {
    const llistaTracks:Track[] = tracks.filter(
        (t:Track) => { return t.title.toLowerCase().includes(textABuscar.trim().toLowerCase()); }
    );
    tbody.innerHTML = "";
    llistaCancons(llistaTracks, tbody, seleccionar);
}

appObj.appendChild(crearTitol());
appObj.appendChild(crearTableSongs(tbody, seleccionar));
appObj.appendChild(crearCerca(cercar));
