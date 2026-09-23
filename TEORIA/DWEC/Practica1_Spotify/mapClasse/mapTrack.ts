interface Canco {
    id: string;
    titol: string;
    artitsta: string;
    durada: number;
}

interface Track {
    title: string;
    minutes: number;
    seconds: number;
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

const tracks: Track[] = cancons.map(
    (c: Canco) => {

        let minuts: number = Math.floor(c.durada / 60);
        let segons: number = c.durada % 60;

        return {
            title: c.titol,
            minutes: minuts,
            seconds: segons
        };
    }
);

tracks.forEach(
    (t: Track) => {
        console.log(
            "titol: " + t.title +
            " durada: " + t.minutes +
            " minuts " + t.seconds +
            " segons"
        );
    }
);