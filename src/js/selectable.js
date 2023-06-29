let selectedRows = [];

const selectRow = function (index) {
    if (selectedRows.indexOf(index) < 0) {
        selectedRows.push(index);
    } else {
        selectedRows.splice(selectedRows.indexOf(index), 1);
    }
}

const cellClass = function (index) {
    if (selectedRows.indexOf(index) >= 0) {
        return ' selected'
    } else {
        return ''
    }
}

let selectedPlayersOnly = false;
const toggleSelectionButton = document.querySelector("#toggle-selection-button");

if (toggleSelectionButton) toggleSelectionButton.addEventListener('click', () => {
    const selectedPlayerKeys = [];
    selectedRows.forEach(e => { selectedPlayerKeys.push(`${e + 1}`) });

    selectedPlayersOnly = !selectedPlayersOnly;
    if (selectedPlayersOnly) selectedPlayersHandle.set(selectedPlayerKeys); else selectedPlayersHandle.clear();
});