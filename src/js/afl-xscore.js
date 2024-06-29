// const filterColumns = {
//     'Shots': 'Shots',
//     'Goals': 'Goals',
//     'Behinds': 'Behinds',
//     'NoScore': 'No Score',
//     'ScorePerShot': 'Score / Shot',
//     'xScorePerShot': 'xScore / Shot',
//     'DiffPerShot': 'Shot Rating',
//     'Accuracy': 'Accuracy'
// }

// const filterColumnsDefault = ['Shots']
const reactableId = 'xscore-table';

let xscore;
let lookups;
let lookupNames = {
    Season: "Season",
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

let filters = {};

const aggregate = (obj, groupBy, filter) => {
    // using reduce() method to aggregate 
    const res = { Index: [], Grouping1: [], Grouping2: [], Shots: [], Goals: [], Behinds: [], NoScore: [], Score: [], xScore: [], Diff: [], ScorePerShot: [], xScorePerShot: [], DiffPerShot: [], Accuracy: [] };
    let data_season, groupByValue, groupByValue2;

    // Loop seasons
    Object.keys(obj).forEach(season => {
        data_season = obj[season];
        if (typeof filter["Season"] === "undefined" || filter["Season"].includes(season)) {

            //data_season[groupBy[0]].forEach((groupByValue, i) => {
            for (i = 0; i < data_season[Object.keys(data_season)[0]].length; i++) {
                groupByValue = groupBy[0] === "Season" ? season : data_season[groupBy[0]][i];

                let filtered = true;
                Object.keys(filter).forEach(filterColumn => {
                    if (filterColumn !== "Season")
                        filtered = filtered && (filter[filterColumn].length == 0 || filter[filterColumn].includes(data_season[filterColumn][i]));
                });

                if (filtered) {
                    if (groupBy.length > 1) {
                        groupByValue2 = groupBy[1] === "Season" ? season : data_season[groupBy[1]][i];
                        groupByIndex = `${groupByValue}|${groupByValue2}`;
                    } else groupByIndex = groupByValue;

                    index = res.Index.indexOf(groupByIndex);

                    if (index < 0) {
                        grouping1 = typeof lookups[groupBy[0]] !== "undefined" ? lookups[groupBy[0]][0].Label[lookups[groupBy[0]][0].Index.indexOf(groupByValue)] : groupByValue;
                        grouping2 = groupBy.length > 1 && typeof lookups[groupBy[1]] !== "undefined" ? lookups[groupBy[1]][0].Label[lookups[groupBy[1]][0].Index.indexOf(groupByValue2)] : groupByValue2;

                        res.Index.push(groupByIndex);
                        res.Grouping1.push(grouping1);
                        res.Grouping2.push(grouping2);
                        res.Goals.push(0);
                        res.Behinds.push(0);
                        res.NoScore.push(0);
                        res.xScore.push(0);
                        index = res.Index.length - 1;
                    }

                    res.Goals[index] += data_season.Goals[i];
                    res.Behinds[index] += data_season.Behinds[i];
                    res.NoScore[index] += data_season.NoScore[i];
                    res.xScore[index] += data_season.xScore[i];
                }
            }
        }
    });

    res.Index.forEach((groupByValue, i) => {
        res.Shots[i] = res.Goals[i] + res.Behinds[i] + res.NoScore[i];
        res.Score[i] = res.Goals[i] * 6 + res.Behinds[i];
        res.Diff[i] = res.Score[i] - res.xScore[i];
        res.ScorePerShot[i] = res.Score[i] / res.Shots[i];
        res.xScorePerShot[i] = res.xScore[i] / res.Shots[i];
        res.DiffPerShot[i] = res.Diff[i] / res.Shots[i];
        res.Accuracy[i] = res.Goals[i] / res.Shots[i] * 100;
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
    const hiddenColumns = ["Index"];
    if (statGrouping2.value && statGrouping2.value !== statGrouping1.value) {
        groupings.push(statGrouping2.value);
    } else {
        hiddenColumns.push("Grouping2");
    }

    Reactable.setHiddenColumns('xscore-table', hiddenColumns);
    Reactable.setData("xscore-table", aggregate(xscore, groupings, filters));
}

const initialiseFilters = () => {
    for (c of Object.keys(lookupNames)) {
        const filterDiv = document.createElement('div');
        filterDiv.classList = "m-2";

        const h5 = document.createElement('h5');
        h5.classList = "my-1"
        h5.innerText = lookupNames[c];

        filterDiv.appendChild(h5);

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

    updateTable();
}

fetch(`https://www.wheeloratings.com/src/xscore/xscore_testing.json`)
    .then((res) => res.json())
    .then((data) => {
        xscore = data.Data;
        lookups = data.Lookups;
        lookups.Season = [{ Index: Object.keys(xscore), Label: Object.keys(xscore) }];

        Reactable.setFilter('xscore-table', "Shots", 10);
        initialiseFilters();
    });