let xscore;
let lookups;
let lookupNames = {
    ShotType: "Shot Type",
    Distance: "Distance",
    Pocket: "Pocket"
}
let groupingColumns = {
    Team: "Team",
    Player: "Player",
    Season: "Season",
    ShotType: "Shot Type",
    Distance: "Distance",
    Pocket: "Pocket"
}

let filters = { Team: ["gc", "melb"], Pocket: [] };
filters = {};

const aggregate = (obj, groupBy, filter) => {
    // using reduce() method to aggregate 
    const res = { Index: [], Grouping1: [], Grouping2: [], Shots: [], Score: [], xScore: [], Diff: [], ScorePerShot: [], xScorePerShot: [], DiffPerShot: [] };
    let groupByValue2;

    obj[groupBy[0]].forEach((groupByValue, i) => {

        let filtered = true;
        Object.keys(filter).forEach((filterColumn) => {
            filtered = filtered & (filter[filterColumn].length == 0 | filter[filterColumn].includes(obj[filterColumn][i]));
        });

        if (filtered) {
            if (groupBy.length > 1) {
                groupByValue2 = obj[groupBy[1]][i];
                groupByIndex = `${groupByValue}|${groupByValue2}`;
            } else groupByIndex = groupByValue;

            index = res.Index.indexOf(groupByIndex);

            if (index < 0) {
                grouping1 = typeof lookups[groupBy[0]] !== "undefined" ? lookups[groupBy[0]][0].Label[lookups[groupBy[0]][0].Index.indexOf(groupByValue)] : groupByValue;
                grouping2 = groupBy.length > 1 && typeof lookups[groupBy[1]] !== "undefined" ? lookups[groupBy[1]][0].Label[lookups[groupBy[1]][0].Index.indexOf(groupByValue2)] : groupByValue2;

                res.Index.push(groupByIndex);
                res.Grouping1.push(grouping1);
                res.Grouping2.push(grouping2);
                res.Shots.push(0);
                res.Score.push(0);
                res.xScore.push(0);
                index = res.Index.length - 1;
            }

            res.Shots[index] += obj.Shots[i];
            res.Score[index] += obj.Score[i];
            res.xScore[index] += obj.xScore[i];
        }
    });

    res.Index.forEach((groupByValue, i) => {
        res.Diff[i] = res.Score[i] - res.xScore[i];
        res.ScorePerShot[i] = res.Score[i] / res.Shots[i];
        res.xScorePerShot[i] = res.xScore[i] / res.Shots[i];
        res.DiffPerShot[i] = res.Diff[i] / res.Shots[i];
    });

    return res;
}

const filtersDiv = document.querySelector("#filters");
const checkboxFiltersDiv = document.querySelector("#checkbox-filters");
const statGrouping1 = document.querySelector("#stat-grouping-1");
const statGrouping2 = document.querySelector("#stat-grouping-2");
statGrouping1.addEventListener('change', (e) => { updateTable(); });
statGrouping2.addEventListener('change', (e) => { updateTable(); });

let checkboxLookups = { Id: [], Lookup: [], LookupIndex: [] };

const updateTable = () => {
    const selectedInputs = document.querySelectorAll("#checkbox-filters input:checked");

    filters = {};
    for (input of selectedInputs) {
        i = checkboxLookups.Id.indexOf(input.id);
        key = checkboxLookups.Lookup[i];
        if (!(Object.keys(filters).includes(key))) filters[key] = [];

        filters[key].push(checkboxLookups.LookupIndex[i]);
    }

    const groupings = [statGrouping1.value];
    if (statGrouping2.value && statGrouping2.value !== statGrouping1.value) groupings.push(statGrouping2.value);

    Reactable.setData("xscore-table", aggregate(xscore, groupings, filters));
}

const initialiseFilters = () => {
    for (c of Object.keys(lookupNames)) {
        const filterDiv = document.createElement('div');
        filterDiv.classList = "m-2";

        const h5 = document.createElement('h5');
        h5.classList = "my-1"
        h5.innerText = lookupNames[c];

        checkboxFiltersDiv.appendChild(h5);

        lookups[c][0].Index.forEach((index, i) => {
            const div = document.createElement('div');
            div.classList = "form-check form-switch";

            const id = "select-filter-" + c.toLowerCase().replaceAll(' ', '-') + "-" + index.toLowerCase().replaceAll(' ', '-');

            const input = document.createElement('input');
            input.classList = "form-check-input"
            input.type = "checkbox"
            input.value = index;
            input.id = id;

            input.addEventListener('change', (e) => { updateTable(); });

            const label = document.createElement('label');
            label.classList = "form-check-label stat-selection-label"
            label.htmlFor = id;
            label.innerText = lookups[c][0].Label[i];

            checkboxLookups.Id.push(id);
            checkboxLookups.Lookup.push(c);
            checkboxLookups.LookupIndex.push(index);

            div.appendChild(input);
            div.appendChild(label);
            filterDiv.appendChild(div)
        });

        checkboxFiltersDiv.appendChild(filterDiv);
    }

    let option = document.createElement("option");
    option.value = "";
    option.text = "None";
    statGrouping2.appendChild(option);

    for (col of Object.keys(groupingColumns)) {
        option = document.createElement("option");
        option.value = col;
        option.text = groupingColumns[col];
        statGrouping1.appendChild(option);
        statGrouping2.appendChild(option.cloneNode(true));
    }

    //statDropdownX.selectedIndex = nonHeadingOptions.indexOf(defaultX) < 0 ? 0 : nonHeadingOptions.indexOf(defaultX);
    //statDropdownY.selectedIndex = nonHeadingOptions.indexOf(defaultY) < 0 ? 0 : nonHeadingOptions.indexOf(defaultY);
}

fetch(`https://www.wheeloratings.com/src/xscore/xscore_testing.json`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        xscore = data.Data[0];
        lookups = data.Lookups;

        initialiseFilters();

        Reactable.setData("xscore-table", aggregate(xscore, ["Player"], filters));
    });

// aggregate(xscore, "Player", filters)
// aggregate(xscore, "Team", filters)
// aggregate(xscore, "Team", {})

// aggregate(xscore, "Distance", {})
// aggregate(xscore, "Pocket", {})
