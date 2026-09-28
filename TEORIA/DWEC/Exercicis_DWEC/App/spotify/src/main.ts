import './style.css';
import { crearCerca} from './view/cerca/cerca';
import { crearTableSongs } from './view/tableSongs/crearTableSongs';
import { crearTitol } from './view/tableSongs/crearTitol';

const appObj:HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;

appObj.appendChild(crearTitol());
appObj.appendChild(crearTableSongs());
appObj.appendChild(crearCerca());
