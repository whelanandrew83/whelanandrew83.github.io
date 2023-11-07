const filterColumns = {
    'Matches': 'Matches',
    'RatingPoints_Avg': 'Player Rating',
    'Supercoach_Avg': 'Supercoach',
    'ContestedPossessions': 'Contested Possessions',
    'CentreBounceAttendancePercentage': 'Centre Bounce Attendance %',
    'TotalClearances': 'Clearances',
    'Disposals': 'Disposals',
    'Hitouts': 'Hitouts',
    'Goals_Total': 'Goals (Total)',
    'Goals_Avg': 'Goals (Average)',
    'TimeOnGround': 'Time On Ground %'
}

const collapseStat = document.querySelector("#collapse-stat :first-child");
collapseStat.innerHTML = "";

const customFilterDiv = document.createElement('div');
collapseStat.appendChild(customFilterDiv);
// filtersDiv.insertAdjacentElement('afterend', customFilterDiv)

const filterSelectLabel = document.createElement('label');
filterSelectLabel.innerText = "Select a field";
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
Object.keys(filterColumns).forEach(key => {
    filterOption = document.createElement("option");
    filterOption.value = key;
    filterOption.text = filterColumns[key];
    selectOptions.push(filterOption);
    filterSelect.appendChild(filterOption);
})

customFilterDiv.appendChild(filterSelectLabel);
customFilterDiv.appendChild(filterSelect);
customFilterDiv.appendChild(filterAdd);

const customFilterRow = document.createElement('div');
customFilterRow.classList = "d-flex flex-wrap";
customFilterDiv.appendChild(customFilterRow);

filterAdd.addEventListener('click', (e) => {
    if (filterSelect.value) {
        const div = document.createElement('div');
        div.classList = "m-2";

        const filterColumn = filterSelect.value;

        const label = document.createElement('label');
        label.innerText = filterColumns[filterSelect.value];
        label.for = `filter-min-${filterColumn}`;
        label.classList = "form-label fw-bold";

        const inputGroup = document.createElement('div');
        inputGroup.classList = "input-group input-group-sm";

        const labelMin = document.createElement('span');
        labelMin.innerText = "from";
        labelMin.classList = "input-group-text";
        inputGroup.appendChild(labelMin);

        const valueMin = document.createElement('input');
        valueMin.id = `filter-min-${filterColumn}`;
        valueMin.type = "text";
        valueMin.size = "4";
        inputGroup.appendChild(valueMin);

        const labelMax = document.createElement('span');
        labelMax.innerText = "to";
        labelMax.classList = "input-group-text";
        inputGroup.appendChild(labelMax);

        const valueMax = document.createElement('input');
        valueMax.id = `filter-max-${filterColumn}`;
        valueMax.type = "text";
        valueMax.size = "4";
        inputGroup.appendChild(valueMax);

        div.appendChild(label);
        div.appendChild(inputGroup);

        valueMin.addEventListener('input', () => {
            filterCustom(filterColumn, valueMin.value, valueMax.value);
        })
        valueMax.addEventListener('input', () => {
            filterCustom(filterColumn, valueMin.value, valueMax.value);
        })

        customFilterRow.appendChild(div);

        selectOptions.forEach(opt => { if (filterSelect.value === opt.value) opt.disabled = true });

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

        //for (i = 0; i < chartStats[column].length; i++) {
        for (i = 0; i < Reactable.getInstance(reactableId).data.length; i++) {
            //if (chartStats[column][i] >= min_value) filtered.push(i + 1);
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
