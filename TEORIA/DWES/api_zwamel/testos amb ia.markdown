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

## Resultats comunicats

- `npm test`: correcte, amb **6 proves superades i cap error**.
- `npm run build`: falla per errors de tipus que ja existien al codi de l'aplicació. No s'han corregit perquè no formaven part de l'encàrrec.
- Les operacions correctes que depenen de SQL no s'han provat contra una base de dades.

## Passos pendents

1. Revisar les proves amb més detall després del commit.
2. Comparar les proves de React amb les proves del servidor i analitzar si falta algun cas o si hi ha algun comportament que no s'hagi cobert.
3. Si cal, afegir o ajustar proves. No completar el codi de l'aplicació dins d'aquesta feina.