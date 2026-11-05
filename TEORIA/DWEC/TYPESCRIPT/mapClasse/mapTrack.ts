interface Canco {
    id: string;
    titol: string;
    artista: string;
    durada: number;
}

interface Temps {
    minuts: number;
    segons: number;
}

interface Track {
    title: string;
    duration: Temps;
}

const cancons: Canco[] = [
    {
        id: "2B-CA",
        titol: "Rattle and Hum",
        artista: "U2",
        durada: 30
    },
    {
        id: "2B-CX",
        titol: "Rattle and Hum",
        artista: "U2",
        durada: 65
    },
    {
        id: "3B-TX",
        titol: "Chicago",
        artista: "Michael Jackson",
        durada: 190
    },
    {
        id: "3B-TXY",
        titol: "Chicago",
        artista: "Michael Jackson",
        durada: 180
    },
]

const songsString: string[] = cancons.map(
    (c: Canco) => {
        let minuts: number = Math.floor(c.durada / 60);
        let segons: number = c.durada % 60;

        let text: string = `${c.titol} (${c.artista} - minuts: ${minuts} segons: ${segons})`;
        return text.trim();
    }
)

function convertirTemps(temps: number): Temps {
    return {
        minuts: Math.floor(temps / 60),
        segons: temps % 60
    };
}

const tracks: Track[] = cancons.map(
    (c: Canco) => {
        return { title: c.titol, duration: convertirTemps(c.durada) }
    }
)

tracks.forEach(
    (t: Track) => { console.log(t); }
);