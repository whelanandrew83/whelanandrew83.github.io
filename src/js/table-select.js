let selectedRows = [];

const selectRow = function (index) {
    if (selectedRows.indexOf(index) < 0) {
        selectedRows.push(index);
    } else {
        selectedRows.pop(index);
    }
}