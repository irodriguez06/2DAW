interface Jugador{
    nom: string;
    titular: boolean;
    dorsal: number;
}

interface Equips{
    nom: string;
    jugadors: Jugador[];
}

const equips: Equips[] = [
    {
        nom: "Boscdelacoma",
        jugadors: [
            { nom: "Sei", titular: true, dorsal: 1 },
            { nom: "Miquel Boada", titular: true, dorsal: 2 },
            { nom: "Joan Caselles", titular: false, dorsal: 3 }
        ]
    },
    {
        nom: "Montscopa",
        jugadors: [
            { nom: "Maria Galicia", titular: true, dorsal: 4 },
            { nom: "Maria Boada", titular: true, dorsal: 5 },
            { nom: "Nilsson Raviña", titular: false, dorsal: 6 }
        ]
    }
];

const nomEquip: string = "Boscdelacoma";

const jugadorsTitulars: Jugador[] = equipTitular(equips,nomEquip);

function equipTitular(equips: Equips[], nomEquip: string): Jugador[] {
    
    const equipFinal = equips.filter(
        (e: Equips) => e.nom === nomEquip
    )[0];

    return equipFinal.jugadors.filter(
        (j: Jugador) => j.titular === true
    );
}

console.log(jugadorsTitulars);
