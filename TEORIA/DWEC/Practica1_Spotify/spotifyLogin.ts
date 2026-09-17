interface Usuari {
    correu: string;
    password: string;
    edat: number;
}

function autentificacio(usuari: Usuari): boolean {
    let correcte: boolean = false;

    if (usuari.correu === "admin@gmail.com" && usuari.password === "1234" && usuari.edat > 14) {
        correcte = true;
    }

    return correcte;
}

function imprimir(auth: boolean): void {
    if (auth) {
        console.log("Usuari autentificat de forma correcte");
    }
    else {
        console.log("Usuari, password o edat no vàlids");
    }
}

const usuariCorrecte: Usuari = {
    correu: "admin@gmail.com",
    password: "1234",
    edat: 18
}

let autOk: boolean = autentificacio(usuariCorrecte);
imprimir(autOk);

const usuariIncorrecte: Usuari = {
    correu: "admin@gmail.com",
    password: "1234",
    edat: 12
}

let autOkIncorrecte: boolean = autentificacio(usuariIncorrecte);
imprimir(autOkIncorrecte);
