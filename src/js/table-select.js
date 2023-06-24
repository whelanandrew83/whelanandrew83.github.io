let selectedRows = [];

const selectRow = function (index) {
    if (selectedRows.indexOf(index) < 0) {
        selectedRows.push(index);
    } else {
        selectedRows.splice(selectedRows.indexOf(index), 1);
    }
}

const rowStyle = function (index) {
    return { backgroundColor: '#eee', boxShadow: 'inset 2px 0 0 0 #3a0057' };
    if (selectedRows.indexOf(index) >= 0) {
        return { backgroundColor: '#eee', boxShadow: 'inset 2px 0 0 0 #3a0057' }
    }
}