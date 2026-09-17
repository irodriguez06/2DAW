interface Canco {
    id: string;
    titol: string;
    artitsta: string;
    durada: number;
}

function imprimirr(canco:Canco | null): void {
    if (canco !== null) {
        console.log(canco);
    }
    else {
        console.log("Canco no existeix");
    }
}

const cancoABuscar:Canco = {
    id: "2B-CA",
    titol: "Rattle and Hum",
    artitsta: "U2",
    durada: 90
}

const cancons:Canco[] = [
    {
        id: "2B-CA",
        titol: "Rattle and Hum",
        artitsta: "U2",
        durada: 90
    },
    {
        id: "3B-TX",
        titol: "Chicago",
        artitsta: "Michael Jackson",
        durada: 190
    },
]

console.log(cancoABuscar);

function buscarCanco(titol:string, cancoList: Canco[]):Canco | null {
    const totalCancons:number = cancoList.length -1;
    let i:number = 0;

    while (i < totalCancons && titol !== cancoList[i].titol) {
        i++;
    }
    if (titol === cancoList[i].titol) {
        return cancoList[i];
    }
    else {
        return null;
    }
}

let existeixCanco:Canco | null = buscarCanco(cancoABuscar.titol,cancons);
imprimirr(existeixCanco);

existeixCanco = buscarCanco("Chicago", cancons)
imprimirr(existeixCanco);

existeixCanco = buscarCanco("binding lights", cancons)
imprimirr(existeixCanco);

export {}