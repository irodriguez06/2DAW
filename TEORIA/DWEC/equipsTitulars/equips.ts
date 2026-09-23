interface Jugador{
    nom: string;
    titular: boolean;
}

interface Equips{
    nom: string;
    jugadors: Jugador[];
}

const equips: Equips[] = [
    {
        nom: "Boscdelacoma",
        jugadors: [
            { nom: "Sei", titular: true },
            { nom: "Miquel Boada", titular: true },
            { nom: "Joan Caselles", titular: false }
        ]
    },
    {
        nom: "Montscopa",
        jugadors: [
            { nom: "Maria Galicia", titular: true },
            { nom: "Maria Boada", titular: true },
            { nom: "Nilsson Raviña", titular: false }
        ]
    }
];

