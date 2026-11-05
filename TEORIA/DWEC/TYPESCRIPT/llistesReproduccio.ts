interface Canco {
    id: string;
    titol: string;
    artista: string;
    durada: number;
}

interface LlistaReproduccio {
    nom: string;
    cancons: Canco[];
}

interface Usuari {
    nom: string;
    llistes: LlistaReproduccio[];
}


const canco1: Canco = {
    id: "1",
    titol: "Rattle and Hum",
    artista: "U2",
    durada: 90
};

const canco2: Canco = {
    id: "2",
    titol: "One",
    artista: "U2",
    durada: 280
};

const canco3: Canco = {
    id: "3",
    titol: "Chicago",
    artista: "Michael Jackson",
    durada: 190
};

const canco4: Canco = {
    id: "4",
    titol: "Billie Jean",
    artista: "Michael Jackson",
    durada: 240
};


const usuaris: Usuari[] = [
    {
        nom: "Joan",
        llistes: [
            {
                nom: "Rock",
                cancons: [canco1, canco2]
            },
            {
                nom: "Pop",
                cancons: [canco3]
            }
        ]
    },
    {
        nom: "Maria",
        llistes: [
            {
                nom: "Favorits",
                cancons: [canco4]
            }
        ]
    }
];


function retornarCanconsArtistaUsuari(
    nomUsuari: string,
    artista: string,
    usuaris: Usuari[]
): Canco[] {

    // Busquem l'usuari.
    const usuari: Usuari | undefined = usuaris.find(
        (u: Usuari) => u.nom === nomUsuari
    );

    // Si l'usuari no existeix, retornem una llista buida.
    if (usuari === undefined) {
        return [];
    }

    const cancons: Canco[] = [];

    // Recorrem totes les llistes de l'usuari.
    for (const llista of usuari.llistes) {

        // Busquem les cançons de l'artista dins de cada llista.
        const canconsArtista: Canco[] = llista.cancons.filter(
            (canco: Canco) => canco.artista === artista
        );

        // Afegim les cançons trobades.
        cancons.push(...canconsArtista);
    }

    return cancons;
}


// Cas 1: Joan i U2.
console.log(
    retornarCanconsArtistaUsuari("Joan", "U2", usuaris)
);


// Cas 2: Joan i Michael Jackson.
console.log(
    retornarCanconsArtistaUsuari("Joan", "Michael Jackson", usuaris)
);


// Cas 3: Maria i Michael Jackson.
console.log(
    retornarCanconsArtistaUsuari("Maria", "Michael Jackson", usuaris)
);


// Cas 4: usuari que no existeix.
console.log(
    retornarCanconsArtistaUsuari("Pere", "U2", usuaris)
);

export { }