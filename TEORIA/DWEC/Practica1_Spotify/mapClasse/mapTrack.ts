interface Canco {
    id: string;
    titol: string;
    artitsta: string;
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
    }
];

const songsString: string[] = cancons.map(
    (c: Canco) => {

        let minuts: number = Math.floor(c.durada / 60);
        let segons: number = c.durada % 60;

        let text: string = `${c.titol} (${c.artitsta} - Temps: ${minuts}:${segons})`;
        return text.trim();
    }
);

function convertirTemps(temps: number):Temps {
    return {
        minuts: Math.floor(temps / 60),
        segons: temps % 60
    }
};

const tracks: Track[] = cancons.map(
    (c: Canco) => {
        return  { title: c.titol, duration: convertirTemps(c.durada) };
    }
);

tracks.forEach(
    (t: Track) => {
        console.log(`${t.title}: ${t.duration.minuts} minuts ${t.duration.segons} segons`);
    }
);
