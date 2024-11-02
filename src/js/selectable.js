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

//const selectedPlayersHandle = new window.crosstalk.FilterHandle('{sd$groupName()}');

let selectedPlayersOnly = false;
const toggleSelectionButton = document.querySelector("#toggle-selection-button");

if (toggleSelectionButton) {
    if (toggleSelectionButton.dataset && toggleSelectionButton.dataset.crosstalkTable) {
        const selectedPlayersHandle = new window.crosstalk.FilterHandle(toggleSelectionButton.dataset.crosstalkTable);
        toggleSelectionButton.addEventListener('click', () => {
            const selectedPlayerKeys = [];
            selectedRows.forEach(e => { selectedPlayerKeys.push(`${e + 1}`) });

            selectedPlayersOnly = !selectedPlayersOnly;
            if (selectedPlayersOnly) selectedPlayersHandle.set(selectedPlayerKeys); else selectedPlayersHandle.clear();
        })
    } else {
        toggleSelectionButton.addEventListener('click', () => {
            selectedPlayersOnly = !selectedPlayersOnly;
            try {
                if (selectedPlayersOnly)
                    Reactable.setFilter(reactableId, "Select", selectedRows)
                else
                    Reactable.setFilter(reactableId, "Select", undefined)

                if (typeof updateFiltersIndicator !== "undefined") updateFiltersIndicator();
            } catch (e) { }
        })
    }
}