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
