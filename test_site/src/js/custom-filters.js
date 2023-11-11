const customFilterDiv = document.querySelector('#custom-filters');
customFilterDiv.innerHTML = "";

const filterSelectLabel = document.createElement('label');
filterSelectLabel.innerText = "Select a field to filter";
filterSelectLabel.for = "filter-select";
filterSelectLabel.classList = "form-label fw-bold";

const filterSelect = document.createElement('select');
filterSelect.id = "filter-select";
filterSelect.classList = "form-select";

let filterOption = document.createElement("option");
filterOption.value = "";
filterOption.text = "Select a field";
filterSelect.appendChild(filterOption);

const filterAdd = document.createElement('button');
filterAdd.classList = "btn btn-primary btn-sm mx-1 my-2";
filterAdd.innerText = "Add filter";

const selectOptions = [];

window.addEventListener('DOMContentLoaded', (event) => {
    Object.keys(filterColumns).forEach(key => {
        if (Object.keys(Reactable.getInstance(reactableId).data[0]).includes(key)) {
            if (typeof filterColumnsDefault !== 'undefined' && filterColumnsDefault.includes(key)) {
                filterCreate(key);
            } else {
                filterOption = document.createElement("option");
                filterOption.value = key;
                filterOption.text = filterColumns[key];
                selectOptions.push(filterOption);
                filterSelect.appendChild(filterOption);
            }
        } else {
            delete filterColumns[key];
        }
    })
})

customFilterDiv.appendChild(filterSelectLabel);
customFilterDiv.appendChild(filterSelect);
customFilterDiv.appendChild(filterAdd);

const customFilterRow = document.createElement('div');
customFilterRow.classList = "d-flex flex-wrap";
customFilterDiv.appendChild(customFilterRow);

const filterCreate = function (column) {
    const div = document.createElement('div');
    div.classList = "m-2";

    const label = document.createElement('label');
    label.innerText = filterColumns[column];
    label.for = `filter-min-${column}`;
    label.classList = "form-label fw-bold";

    const inputGroup = document.createElement('div');
    inputGroup.classList = "input-group input-group-sm";

    const labelMin = document.createElement('span');
    labelMin.innerText = "from";
    labelMin.classList = "input-group-text";
    inputGroup.appendChild(labelMin);

    const valueMin = document.createElement('input');
    valueMin.id = `filter-min-${column}`;
    valueMin.type = "text";
    valueMin.size = "4";
    inputGroup.appendChild(valueMin);

    const labelMax = document.createElement('span');
    labelMax.innerText = "to";
    labelMax.classList = "input-group-text";
    inputGroup.appendChild(labelMax);

    const valueMax = document.createElement('input');
    valueMax.id = `filter-max-${column}`;
    valueMax.type = "text";
    valueMax.size = "4";
    inputGroup.appendChild(valueMax);

    div.appendChild(label);
    div.appendChild(inputGroup);

    valueMin.addEventListener('input', () => {
        filterCustom(column, valueMin.value, valueMax.value);
    })
    valueMax.addEventListener('input', () => {
        filterCustom(column, valueMin.value, valueMax.value);
    })

    customFilterRow.appendChild(div);

    selectOptions.forEach(opt => { if (column === opt.value) opt.disabled = true });
}

filterAdd.addEventListener('click', (e) => {
    if (filterSelect.value) {
        const filterColumn = filterSelect.value;
        filterCreate(filterColumn);

        filterSelect.value = "";
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////

ct_handles = {};
ct_sharedData = JSON.parse(document.querySelector(`script[data-for='${reactableId}']`).innerHTML).x.tag.attribs.crosstalkGroup;

const filterCustom = function (column, min_value, max_value) {
    let handle;
    if (ct_handles[column]) {
        handle = ct_handles[column];
    } else {
        handle = new window.crosstalk.FilterHandle(ct_sharedData);
        ct_handles[column] = handle;
    }

    if (min_value.length === 0 && max_value.length === 0) {
        filterClear(column);
    } else {
        const filtered = [];

        for (i = 0; i < Reactable.getInstance(reactableId).data.length; i++) {
            const value = Reactable.getInstance(reactableId).data[i][column];
            if ((value >= min_value || min_value.length === 0) && (value <= max_value || max_value.length === 0)) filtered.push(i + 1);
        };

        handle.set(filtered);
    }
};

const filterClear = function (column) {
    if (ct_handles[column]) ct_handles[column].clear();
}

const filterClearAll = function () {
    Object.keys(ct_handles).forEach(key => {
        ct_handles[key].clear();
    })
}