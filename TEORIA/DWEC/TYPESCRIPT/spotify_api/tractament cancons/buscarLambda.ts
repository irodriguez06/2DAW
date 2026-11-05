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
    {
        id: "3B-TXY",
        titol: "Chicago",
        artitsta: "Michael Jackson",
        durada: 190
    },
]

let titol: string = "Chicago"
const songsSearch:Canco[] = cancons.filter(
    (c:Canco) => { 
        return c.titol === titol && c.durada > 120;
    }
);

const longSongs:Canco[] = cancons.filter(
    (c:Canco) => { 
        return c.durada > 120;
    }
);

console.log(songsSearch);

export {}