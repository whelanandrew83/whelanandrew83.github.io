let selectedRows = [];

const selectRow = function (index) {
    if (selectedRows.indexOf(index) < 0) {
        selectedRows.push(index);
    } else {
        selectedRows.splice(selectedRows.indexOf(index), 1);
    }
}

const rowStyle = function (index) {
    if (selectedRows.indexOf(index) >= 0) {
        return { backgroundColor: '#d79ff5', boxShadow: 'inset 2px 0 0 0 #670099' }
    }
}