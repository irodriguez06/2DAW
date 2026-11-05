interface Usuari {
    usuari: string;
    password: string;
    edat: number;
}

function autentificar(
    usuari: string,
    password: string,
    edat: number
): boolean {

    // Dades codificades de l'usuari.
    const usuariCorrecte: string = "bvila683@boscdelacoma.cat";
    const passwordCorrecte: string = "Patata123";

    // Comprovem que l'usuari i la contrasenya siguin correctes
    // i que l'edat sigui superior a 14 anys.
    if (
        usuari === usuariCorrecte &&
        password === passwordCorrecte &&
        edat > 14
    ) {
        return true;
    }

    return false;
}


// Cas 1: dades correctes i edat superior a 14.
console.log(autentificar("bvila683@boscdelacoma.cat", "Patata123", 20)); // true

// Cas 2: usuari incorrecte.
console.log(autentificar("usuari", "Patata123", 20)); // false

// Cas 3: password incorrecte.
console.log(autentificar("bvila683@boscdelacoma.cat", "5678", 20)); // false

// Cas 4: edat inferior a 14.
console.log(autentificar("bvila683@boscdelacoma.cat", "Patata123", 12)); // false

// Cas 5: edat exactament 14.
console.log(autentificar("bvila683@boscdelacoma.cat", "Patata123", 14)); // false