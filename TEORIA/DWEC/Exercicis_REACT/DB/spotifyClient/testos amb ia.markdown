# Proves generades amb IA per a `spotifyClient`

## Objectiu

Documentar les proves del client React de Spotify a partir del codi que ja hi ha al projecte. L'aplicació mostra una capçalera amb el nom d'usuari i la data, i una targeta amb les dades d'una cançó i un nombre aleatori de reproduccions. L'objectiu és provar aquests comportaments sense completar ni modificar la implementació de l'aplicació.

## Prompt inicial

> Tinc un projecte de React i TypeScript anomenat `spotifyClient`. Fes tests dels casos que es poden comprovar amb el codi existent, sense completar ni modificar l'aplicació. Comprova la capçalera, la targeta de cançó, les dades disponibles i el renderitzat de l'aplicació.

## Feina feta

- Hi ha sis proves a `tests/components.test.mjs`.
- Les proves carreguen els components i les dades amb Vite i comproven el seu HTML renderitzat amb React.
- Les comprovacions dels components se centren en les dades rebudes per propietats o generades per l'aplicació; no validen contingut fix com el títol «Spotify Client».
- Es proven la capçalera, la targeta de cançó, les dades de cançons i el renderitzat de `App`.
- No s'ha modificat el codi de l'aplicació per fer aquesta comprovació.

## Resultats de les comprovacions

- `node --test tests\components.test.mjs`: correcte, amb **6 proves superades i cap error**.
- `npm run build`: correcte; la compilació de TypeScript i la generació de la versió de producció acaben sense errors.
- El `package.json` no defineix cap script `test`; per això `npm test` no és la comanda disponible actualment i les proves s'han executat directament amb Node.

## Què comprova cada prova

1. **La capçalera mostra l'usuari rebut i la data generada.** Comprova que el nom passat com a propietat es representi correctament i que hi hagi una data amb el format esperat.
2. **La capçalera permet un nom d'usuari buit.** Comprova que el component es pugui renderitzar quan `user.name` és una cadena buida.
3. **La targeta mostra les dades de la cançó.** Comprova el títol, l'artista, la durada i les reproduccions.
4. **La targeta representa zero reproduccions.** Evita que el valor `0` desaparegui o es mostri incorrectament.
5. **Les dades de cançons tenen els camps esperats.** Comprova que hi hagi cançons, que títol i artista no siguin buits i que les durades siguin nombres finits i positius.
6. **`App` renderitza dades disponibles.** Comprova que hi aparegui un nom d'usuari generat, una cançó de les dades i un nombre de reproduccions entre 0 i 999.

## Límits de les proves

- Són proves de renderitzat del costat del servidor; no simulen clics, interaccions del navegador ni reproducció real d'àudio.
- L'aplicació tria aleatòriament l'usuari, la cançó i les reproduccions. La prova de `App` comprova que els valors renderitzats pertanyin als conjunts o intervals esperats, però no força tots els resultats aleatoris possibles.
- El projecte no té cap script `test` a `package.json`, de manera que cal executar la prova amb `node --test tests\components.test.mjs`.

## Errors trobats de la IA

- Ha fet un test que comprova que el nom d'usuari pugui ser buit, cosa que no té gaire sentit, ja que la idea es que si o si hi hagi un nom d'usuari.
- Al igual que amb el servidor, ha creat la carpeta de tests a dintre de la carpeta arrel i no a dintre de src, això, com ja s'ha comprobat, pot portar errors de tipus.


## Conclusions

S'ha pogut comprovar que tot i que hi hagin proves ben fetes, n'hi han que no son bones, ja que per començar són casos que en principi no podrien pasar, com per exemple, la prova de que l'usuari pugui ser buit a la capçalera.
Les proves de servidor són molt dinàmiques, es pot veure que amb client no es així i es necessiten molts canvis, llavors arriba un punt que val la pena repensar si realment necessito aquest tipus de validació de literals.