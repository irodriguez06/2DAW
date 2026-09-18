interface Canco {
    id: string;
    titol: string;
    artitsta: string;
    durada: number;
}

interface LlistaReproduccio {
    nom: string;
    cancons: Canco[];
}

interface Usuari {
    nom: string;
    gmail: string;
    edat: number;
    llistes: LlistaReproduccio[];
}

interface Canco {
    id: string;
    titol: string;
    artitsta: string;
    durada: number;
}

interface LlistaReproduccio {
    nom: string;
    cancons: Canco[];
}

interface Usuari {
    nom: string;
    gmail: string;
    edat: number;
    llistes: LlistaReproduccio[];
}

const canconsUsuari1:Canco[] = [
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
    }
];

const canconsUsuari2:Canco[] = [
    {
        id: "2B-CAZ",
        titol: "Hum and Rattle",
        artitsta: "U2",
        durada: 90
    },
    {
        id: "3B-TXY",
        titol: "PYT",
        artitsta: "Michael Jackson",
        durada: 190
    }
];

const llistaRock:LlistaReproduccio = {
    nom: "Rock",
    cancons: canconsUsuari1
};

const llistaFavorits:LlistaReproduccio = {
    nom: "Favorits",
    cancons: canconsUsuari2
};

const perfilUsuari:Usuari[] = [
    {
        nom: "Bernat",
        gmail: "usuari1@gmail.com",
        edat: 18,
        llistes: [llistaRock, llistaFavorits]
    },
    {
        nom: "Ayou",
        gmail: "usuari2@gmail.com",
        edat: 20,
        llistes: [llistaRock]
    }
];

function imprimirLlistesUsuari(usuari:Usuari):void {
    for(let i:number = 0; i<usuari.llistes.length; i++) {
        console.log(usuari.llistes[i]);
    }
}

imprimirLlistesUsuari(perfilUsuari[0]);