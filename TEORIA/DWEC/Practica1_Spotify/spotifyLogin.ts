function autentificació (usuari: string, password: string, edat: number): 
    boolean {
        if (usuari == "admin" && password == "1234" && edat > 14) {
            return true;
    }
        return false;
}

let resultat: boolean = autentificació("admin", "1234", 18);

console.log(`${resultat}`);