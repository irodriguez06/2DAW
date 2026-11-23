# Proves generades amb Copilot per a `api_zwamel`

## Objectiu

Generar proves per comprovar els casos possibles de l'aplicació, a partir del codi existent del client i del servidor. El projecte encara no està acabat: l'encàrrec era afegir proves, no completar ni modificar la implementació de l'aplicació.

## Prompt inicial

> ara mateix tinc un projecte sense acabar a DWES anomenat api_zwamel, vull que facis els testos dels casos possibles per poder comprovar que la aplicacio va be, nomes els testos no complementis el codi osiguio no generis ni canvis res, nomes amb el que hi ha fes tests de que tot aniria be i ja esta

## Feina feta

Segons el resum final de Copilot:

- S'han afegit proves a `api.test.ts`.
- S'ha configurat l'ordre `npm test` a `package.json`.
- Les proves cobreixen recursos en memòria, operacions CRUD i alguns casos de dades no vàlides o de referències inexistents.
- No s'ha modificat el codi de l'aplicació.
- He executat la comanda que m'ha donat la IA per poder comprovar jo mateix que totes les proves que ha fet són correctes.

## Resultats comunicats

- `npm test`: correcte, amb **6 proves superades i cap error**.
- `npm run build`: falla per errors de tipus que ja existien al codi de l'aplicació. No s'han corregit perquè no formaven part de l'encàrrec.
- Les operacions correctes que depenen de SQL no s'han provat contra una base de dades.
- Al executar `npm test` manualment he pogut veure que efectivament els tests fets per la IA han sigut correctes.

## Resultat comunicat amb "npm test"

> API HTTP 
> ✔ retorna la configuració i les col·leccions inicials (43.6048ms)
> ✔ rebutja dades invàlides als recursos connectats a la base de dades (36.3796ms)
> ✔ crea, consulta, actualitza i esborra playlists, i rebutja dades incorrectes (12.4134ms)
> ✔ gestiona els àlbums amb referències d'artista vàlides (9.0212ms)
> ✔ crea i consulta l'historial, rebutjant usuaris, pistes i dates incorrectes (5.9735ms)
> ✔ gestiona les relacions playlist-pista i àlbum-pista (15.9588ms)
> ✔ API HTTP (131.5955ms)
> ℹ tests 6
> ℹ suites 1
> ℹ pass 6
> ℹ fail 0
> ℹ cancelled 0
> ℹ skipped 0
> ℹ todo 0
> ℹ duration_ms 877.1131

## Comparacions entre els missatges de les proves i el que es pot trobar al codi fet a api.test

- API HTTP --> linea 43, l'estructura general dels tests es fer un describe amb varis it a dintre, per poder fer proves unitaries
- retorna la configuració i les col·leccions inicials --> trobat a la linea 79
- rebutja dades invàlides als recursos connectats a la base de dades --> trobat linea 91
- crea i consulta l'historial, rebutjant usuaris, pistes i dates incorrectes --> trobat linea 110
- gestiona els àlbums amb referències d'artista vàlides --> trobat linea 143
- crea i consulta l'historial, rebutjant usuaris, pistes i dates incorrectes --> trobat linea 185
- gestiona les relacions playlist-pista i àlbum-pista --> trobat linea 222

## Moure la carpeta de tests a src i provar d'executar-la

- Al moure la carpeta de tests a src i tornar a executar npm test, acaba donant els mateixos resultats de tests, tot correcte i 6 proves diferents.

## Quins errors s'han trobat

- Compilació TypeScript: npm run build falla per errors de tipus. Cal identificar-los i comprovar si afecten el funcionament de l'API.
- La carpeta de tests està creada a la carpeta arrel de api_zwamel, quan en realitat hauria d'estar dintre la carpeta de src. Axiò es degut a que els testos con com controls de qualitat i a la cuina (arrel) hi han les receptes (npm tipus), si fiquem aquests controls de qualitat al jardí (arrel) i no a la cuina (src) no trobarem les receptes per poder saber com fer-ho.

## Conclusions del treball

- En principi semblaria que la IA fa els testos més importants per a la api, pero es pot deixar coses o fer-ne d'altres de malament. Per això es important que manualment es revisin els tests i es pensin en probabilitats d'altres casos que la IA hagi no pogut tenir en compte.