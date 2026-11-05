interface Jugador {
    nom: string;
    titular: boolean;
    dorsal: number;
}

interface Equip {
    nom: string;
    jugadors: Jugador[];
}

const equips: Equip[] = [
    {
        nom: "RCD Espanyol",
        jugadors: [
            {
                nom: "Urko",
                titular: true,
                dorsal: 4
            },
            {
                nom: "Roberto Fernández",
                titular: true,
                dorsal: 9
            },
            {
                nom: "Leandro Cabrera",
                titular: false,
                dorsal: 6
            }
        ]
    },
    {
        nom: "Atleti de Madrid",
        jugadors: [
            {
                nom: "Oblak",
                titular: true,
                dorsal: 13
            },
            {
                nom: "Marcos Llorente",
                titular: true,
                dorsal: 14
            },
            {
                nom: "Julian Álvarez",
                titular: false,
                dorsal: 19
            }
        ]
    }
];

function equipTitular(equips: Equip[], nom: string): Jugador[] {
    const equipSel: Equip | undefined = equips.find(
        (e: Equip) => { return e.nom === nom; }
    );

    if (equipSel === undefined) {
        return []
    }
    return equipSel.jugadors.filter(
        (j: Jugador) => { return j.titular; }
    )
}

const nomEquip: string = "RCD Espanyol";

const jugadorsTitulars: Jugador[] = equipTitular(equips, nomEquip);

console.log(jugadorsTitulars);