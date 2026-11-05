export function createTableHead(): HTMLTableSectionElement {
    const thead: HTMLTableSectionElement = document.createElement("thead");
    const trHead: HTMLTableRowElement = document.createElement("tr");
    const thTitol: HTMLTableCellElement = document.createElement("th");
    const thDurada: HTMLTableCellElement = document.createElement("th");
    const thReproduccions: HTMLTableCellElement = document.createElement("th");
    const thBotoPlay: HTMLTableCellElement = document.createElement("th");

    thTitol.textContent = "Títol";
    thDurada.textContent = "Durada";
    thReproduccions.textContent = "Reproduccions";
    thBotoPlay.textContent = "Play";

    trHead.appendChild(thTitol);
    trHead.appendChild(thDurada);
    trHead.appendChild(thReproduccions)
    trHead.appendChild(thBotoPlay)
    thead.appendChild(trHead);
    return thead;
}
