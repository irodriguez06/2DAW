# Enunciat: 

Una plataforma de venda online vol mostrar a l'usuari quant de temps trigara 
en rebre la seva comanda, la funcio rebra un llistat dels productes on cada 
producte te un temps estimat de preparacio que dependra del proveidor, i el tipus de enviament seleccionat.
Hi han dos, l'express (x comanda s'entregara en un temps mínim) o estandart (rebras la comanda quan l'hagis de rebre). 
Tot i que les dades provenen de la base de dades, no es una font 100% viable. 

Que fer: 
Implementacio de la funcio de Typescript. La primera i subsequents. 
Un breu comentari/justificiacio al codi on s'expliquin les decisiones preses davant dels casos ambigús o dades inchoerents. 
Prodeciment que s'ha seguit per arribar a la conclusión final.

Fitxer markdown a pujar al meu GitHub: Estimador de Temps Enviament.md

# Estimador de Temps Enviament

## Primera versió

La primera versió de l'IA:

```typescript
type Producte = {
    nom: string;
    tempsPreparacio: number;
};

function estimarTempsEnviament(
    productes: Producte[],
    tipusEnviament: "express" | "estandard"
): number {

    let temps = 0;

    for (let producte of productes) {
        temps += producte.tempsPreparacio;
    }

    if (tipusEnviament === "express") {
        return temps + 1;
    } else {
        return temps + 3;
    }
}
```

### Problemes

Problemes trobats:

* Si hi ha dos productes, els seus temps potser no s'haurien de sumar, ja que potser es poden preparar al mateix temps.
* No comprova si un temps és negatiu.
* No comprova si el valor és `NaN` o `Infinity`.
* No controla què passa si no hi ha productes.
* Els temps de `1` i `3` hores són valors que he posat jo perquè l'enunciat no els especifica.
* Si les dades de la base de dades són incorrectes, la funció les utilitza igualment.

### Prompt per millorar-la

> Millora aquesta funció de TypeScript tenint en compte que les dades venen d'una base de dades i poden ser incorrectes. Revisa els temps negatius, `NaN`, `Infinity`, la llista buida i el fet que els productes es poden preparar al mateix temps. Mantén el codi senzill i explica les decisions del que has canviat.

---

## Segona versió

Després de ficar el prompt, em va donar aquesta funció:

```typescript
type Producte = {
    nom: string;
    tempsPreparacio: number;
};

function estimarTempsEnviament(
    productes: Producte[],
    tipusEnviament: "express" | "estandard"
): number {

    if (productes.length === 0) {
        return 0;
    }

    let temps = 0;

    for (let producte of productes) {

        if (
            !Number.isFinite(producte.tempsPreparacio) ||
            producte.tempsPreparacio < 0
        ) {
            continue;
        }

        temps = Math.max(temps, producte.tempsPreparacio);
    }

    if (tipusEnviament === "express") {
        return temps + 1;
    }

    return temps + 3;
}
```

### Problemes

Problemes trobats:

* Si tots els productes tenen dades incorrectes, la funció pot retornar un temps com si fos algo vàlid.
* No podem saber si el `0` significa que no hi ha dades vàlides o que realment el temps és 0.
* Els temps d'enviament continuen sent valors que asumeix i no els sap 100%.

### Prompt per millorar-la

> Millora aquesta segona versió. Vull que la funció pugui detectar quan no hi ha cap producte amb un temps de preparació vàlid. En aquest cas, no hauria de retornar una estimació falsa. Modifica el tipus de retorn si és necessari i mantén el codi senzill.

---

## Tercera versió

La última versió de la IA:

```typescript
type Producte = {
    nom: string;
    tempsPreparacio: number;
};

function estimarTempsEnviament(
    productes: Producte[],
    tipusEnviament: "express" | "estandard"
): number | null {

    if (productes.length === 0) {
        return null;
    }

    let temps = 0;
    let hiHaProductesValids = false;

    for (let producte of productes) {

        if (
            !Number.isFinite(producte.tempsPreparacio) ||
            producte.tempsPreparacio < 0
        ) {
            continue;
        }

        hiHaProductesValids = true;
        temps = Math.max(temps, producte.tempsPreparacio);
    }

    if (!hiHaProductesValids) {
        return null;
    }

    if (tipusEnviament === "express") {
        return temps + 1;
    }

    return temps + 3;
}
```

## Procediment

Primer la IA em va fer una versió sencilla de la funció.

Després vaig revisar quins casos podien provocar errors o resultats incorrectes, per exemple el fet que les dades de la BDD no són 100% fiables.

A la segona versió la IA va afegir validacions i va canviar la suma dels temps pel temps més gran.

Al final vaig revisar què passava si totes les dades eren incorrectes i la IA em va modificar la funció perquè retornés `null` quan no es pogués calcular una estimació fiable.