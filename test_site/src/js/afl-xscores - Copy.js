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
const reactableId = 'xscores-table';
const clearPlayerButton = document.querySelector("#clear-player-button");
clearPlayerButton.addEventListener('click', () => { selectedPlayer = undefined; Reactable.setFilter(reactableId, "Shots", shotsFilter); updatePlayer(); });
const shotChartDiv = document.querySelector("#shot-chart-div");

let view = "Player";
let xscore;
let xscoreShots;
let lookups;
let lookupNames = {
    Season: "Season",
    ShotType: "Shot Type",
    Distance: "Distance",
    Pocket: "Pocket"
}
let groupingColumns = {
    Season: "Season",
    ShotType: "Shot Type",
    Distance: "Distance",
    Pocket: "Pocket"
}
let shotsFilter = 10;

//let selectedPlayer = urlParams.get("ID");
let selectedPlayer; //= "2db9fb";
let selectedTeam; //= "2db9fb";

let filters = {};

const getFilter = (filter) => {
    let returnValue;

    Reactable.getState(reactableId).filters.forEach(f => {
        if (f.id === filter) returnValue = f.value;
    });
    return returnValue;
}

const aggregate = (obj, groupBy, filter) => {
    // using reduce() method to aggregate 
    const res = { Index: [], Id: [], Grouping1: [], Grouping2: [], Shots: [], Goals: [], Behinds: [], NoScore: [], Score: [], xScore: [], Diff: [], ScorePerShot: [], xScorePerShot: [], DiffPerShot: [], Accuracy: [] };
    let data_season, groupByValue, groupByValue2;

    // Loop seasons
    Object.keys(obj).forEach(season => {
        data_season = obj[season];
        if (typeof filter["Season"] === "undefined" || filter["Season"].includes(season)) {

            for (i = 0; i < data_season[Object.keys(data_season)[0]].length; i++) {
                groupByValue = groupBy[0] === "Season" ? season : data_season[groupBy[0]][i];

                let filtered = true;
                Object.keys(filter).forEach(filterColumn => {
                    if (filterColumn === "Player")
                        filtered = filtered && (filter[filterColumn].length == 0 || filter[filterColumn].includes(lookups[filterColumn][0].WebsiteId[lookups[filterColumn][0].Index.indexOf(data_season[filterColumn][i])]));
                    else if (filterColumn === "Team")
                        filtered = filtered && (filter[filterColumn].length == 0 || filter[filterColumn].includes(lookups[filterColumn][0].Index[lookups[filterColumn][0].Index.indexOf(data_season[filterColumn][i])]));
                    else if (filterColumn !== "Season")
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
                        if (groupBy[0] === "Player")
                            res.Id.push(lookups[groupBy[0]][0].WebsiteId[lookups[groupBy[0]][0].Index.indexOf(groupByValue)]);
                        else if (groupBy[0] === "Team")
                            res.Id.push(groupByValue);
                        else
                            res.Id.push("");

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

const statGrouping2Div = document.querySelector("#stat-grouping-2-div");
const teamFiltersDiv = document.querySelector("#team-filters");
const tableHeading = document.querySelector("#table-heading");

const viewPlayersButton = document.querySelector("#view-players");
const viewTeamsButton = document.querySelector("#view-teams");
const viewAllButton = document.querySelector("#view-all");

viewPlayersButton.addEventListener('click', () => {
    view = "Player";
    selectedPlayer = undefined;
    Reactable.setFilter(reactableId, "Shots", shotsFilter);
    teamFiltersDiv.classList.remove("d-none");
    statGrouping1.options[0].disabled = false;
    statGrouping1.selectedIndex = 0;
    updatePlayer();
});
viewTeamsButton.addEventListener('click', () => {
    view = "Team";
    selectedPlayer = undefined;
    Reactable.setFilter(reactableId, "Shots", shotsFilter);
    teamFiltersDiv.classList.remove("d-none");
    statGrouping1.options[0].disabled = false;
    statGrouping1.selectedIndex = 0;
    updatePlayer();
});
viewAllButton.addEventListener('click', () => {
    view = undefined;
    selectedPlayer = undefined;
    selectedTeam = undefined;
    Reactable.setFilter(reactableId, "Shots", shotsFilter);
    teamFiltersDiv.classList.add("d-none");
    statGrouping1.options[0].disabled = true;
    statGrouping1.selectedIndex = 1;
    updatePlayer();
});

let checkboxLookups = { Id: [], Lookup: [], LookupIndex: [] };

const corridorLength = 50;
const corridorX = 25;
const corridorY = Math.sqrt(Math.pow(corridorLength, 2) - Math.pow(corridorX, 2));
const grassColour = 'rgba(235, 248, 230, 1.0)';

const ctx = document.getElementById('shot-chart');

const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: []
    },
    options: {
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {}
            },
            annotation: {
                annotations: {
                    oval: {
                        type: 'ellipse',
                        xMin: -70,
                        xMax: 70,
                        yMin: 0,
                        yMax: -160,
                        borderWidth: 2,
                        backgroundColor: grassColour,
                        adjustScaleRange: false,
                        drawTime: 'beforeDraw'
                    },
                    corriderLeft: {
                        type: 'line',
                        xMin: -3.5,
                        xMax: -corridorX,
                        yMin: 0,
                        yMax: -corridorY,
                        adjustScaleRange: false,
                        borderWidth: 1,
                        borderColor: '#dddddd',
                        drawTime: 'beforeDraw'
                    },
                    corriderRight: {
                        type: 'line',
                        xMin: 3.5,
                        xMax: corridorX,
                        yMin: 0,
                        yMax: -corridorY,
                        adjustScaleRange: false,
                        borderWidth: 1,
                        borderColor: '#dddddd',
                        drawTime: 'beforeDraw'
                    },
                    corriderLeftCentreSquare: {
                        type: 'line',
                        xMin: -corridorX,
                        xMax: -corridorX,
                        yMin: -corridorY,
                        yMax: -55,
                        adjustScaleRange: false,
                        borderWidth: 1,
                        borderColor: '#dddddd',
                        drawTime: 'beforeDraw'
                    },
                    corriderRightCentreSquare: {
                        type: 'line',
                        xMin: corridorX,
                        xMax: corridorX,
                        yMin: -corridorY,
                        yMax: -55,
                        adjustScaleRange: false,
                        borderWidth: 1,
                        borderColor: '#dddddd',
                        drawTime: 'beforeDraw'
                    },
                    centreSquare: {
                        type: 'box',
                        xMin: -25,
                        xMax: 25,
                        yMin: -55,
                        yMax: -105,
                        borderWidth: 2,
                        backgroundColor: 'transparent',
                        adjustScaleRange: false,
                        drawTime: 'beforeDraw'
                    },
                    label50Left: {
                        type: 'label',
                        xValue: -corridorX,
                        yValue: -corridorY,
                        backgroundColor: grassColour,
                        content: ['50m'],
                        font: {
                            size: 10
                        },
                        drawTime: 'beforeDraw'
                    },
                    label50Right: {
                        type: 'label',
                        xValue: corridorX,
                        yValue: -corridorY,
                        backgroundColor: grassColour,
                        content: ['50m'],
                        font: {
                            size: 10
                        },
                        drawTime: 'beforeDraw'
                    },
                    label10Centre: {
                        type: 'label',
                        xValue: 0,
                        yValue: -10,
                        backgroundColor: grassColour,
                        content: ['10m'],
                        font: {
                            size: 10
                        },
                        drawTime: 'beforeDraw'
                    },
                    label20Centre: {
                        type: 'label',
                        xValue: 0,
                        yValue: -20,
                        backgroundColor: grassColour,
                        content: ['20m'],
                        font: {
                            size: 10
                        },
                        drawTime: 'beforeDraw'
                    },
                    label30Centre: {
                        type: 'label',
                        xValue: 0,
                        yValue: -30,
                        backgroundColor: grassColour,
                        content: ['30m'],
                        font: {
                            size: 10
                        },
                        drawTime: 'beforeDraw'
                    },
                    label40Centre: {
                        type: 'label',
                        xValue: 0,
                        yValue: -40,
                        backgroundColor: grassColour,
                        content: ['40m'],
                        font: {
                            size: 10
                        },
                        drawTime: 'beforeDraw'
                    },
                    label50Centre: {
                        type: 'label',
                        xValue: 0,
                        yValue: -50,
                        backgroundColor: grassColour,
                        content: ['50m'],
                        font: {
                            size: 10
                        },
                        drawTime: 'beforeDraw'
                    },
                    goalSquareLeft: {
                        type: 'line',
                        xMin: -3.5,
                        xMax: -3.5,
                        yMin: 0,
                        yMax: -9,
                        borderWidth: 2,
                        adjustScaleRange: false,
                        drawTime: 'beforeDraw'
                    },
                    goalSquareRight: {
                        type: 'line',
                        xMin: 3.5,
                        xMax: 3.5,
                        yMin: 0,
                        yMax: -9,
                        borderWidth: 2,
                        adjustScaleRange: false,
                        drawTime: 'beforeDraw'
                    },
                    goalSquareTop: {
                        type: 'line',
                        xMin: 3.5,
                        xMax: -3.5,
                        yMin: -9,
                        yMax: -9,
                        borderWidth: 2,
                        adjustScaleRange: false,
                        drawTime: 'beforeDraw'
                    }
                }
            }
        },
        maintainAspectRatio: true
    }

});

const selectPlayer = (id) => {
    selectedPlayer = id;
    shotsFilter = getFilter("Shots");

    updatePlayer(true);
}

const selectTeam = (id) => {
    selectedTeam = id;

    updatePlayer();
}

const updatePlayer = (clearFilter = false) => {
    if (view === "Player" && typeof selectedPlayer !== "undefined") {
        fetch(`https://www.wheeloratings.com/src/xscores/${selectedPlayer.slice(-2)}.json`)
            .then((res) => res.json())
            .then((data) => {
                xscoreShots = data[selectedPlayer].Data;
                updateTable();
                updateShotChart(filters);
                teamFiltersDiv.classList.add("d-none");
                clearPlayerButton.classList.remove("d-none");
                shotChartDiv.classList.remove("d-none");
                if (clearFilter) Reactable.setFilter(reactableId, "Shots", undefined);

                tableHeading.innerHTML = lookups.Player[0].Label[lookups.Player[0].WebsiteId.indexOf(selectedPlayer)];
            });
    } else if (view === "Team" && typeof selectedTeam !== "undefined") {
        xscoreShots = {};
        updateTable();
        updateShotChart(filters);
        clearPlayerButton.classList.add("d-none");
        shotChartDiv.classList.add("d-none");
        if (clearFilter) Reactable.setFilter(reactableId, "Shots", undefined);

        tableHeading.innerHTML = lookups.Team[0].Label[lookups.Team[0].Index.indexOf(selectedTeam)];
    } else {
        xscoreShots = {};
        updateTable();
        updateShotChart(filters);
        if (view === "Player") teamFiltersDiv.classList.remove("d-none");
        clearPlayerButton.classList.add("d-none");
        shotChartDiv.classList.add("d-none");
        if (clearFilter) Reactable.setFilter(reactableId, "Shots", undefined);

        if (view === "Player" && typeof selectedTeam !== "undefined") {
            tableHeading.innerHTML = lookups.Team[0].Label[lookups.Team[0].Index.indexOf(selectedTeam)];
        } else {
            tableHeading.innerHTML = "All Teams";
        }

    }

}

const updateTable = () => {
    const selectedInputs = document.querySelectorAll("#checkbox-filters input:checked");

    filters = {};
    //filters = typeof view === "undefined" ? {} : { ...filtersOther };

    for (input of selectedInputs) {
        i = checkboxLookups.Id.indexOf(input.id);
        key = checkboxLookups.Lookup[i];
        if (!(Object.keys(filters).includes(key))) filters[key] = [];

        filters[key].push(checkboxLookups.LookupIndex[i]);
    }

    if (view === "Player" && typeof selectedPlayer != "undefined")
        filters["Player"] = [selectedPlayer];
    if (typeof selectedTeam != "undefined")
        filters["Team"] = [selectedTeam];

    const groupings = [];
    const hiddenColumns = ["Index"];

    if (view === "Player" || view === "Team") {
        if ((view === "Player" && typeof selectedPlayer === "undefined") || (view === "Team" && typeof selectedTeam === "undefined")) {
            groupings.push(view);
            if (statGrouping1.value) {
                groupings.push(statGrouping1.value);
            } else {
                hiddenColumns.push("Grouping2");
            }
            statGrouping2Div.classList.add("d-none");
        } else {
            if (statGrouping1.value) {
                groupings.push(statGrouping1.value);
            } else {
                groupings.push(view);
            }
            if (statGrouping2.value && statGrouping2.value !== statGrouping1.value) {
                groupings.push(statGrouping2.value);
            } else {
                hiddenColumns.push("Grouping2");
            }
            statGrouping2Div.classList.remove("d-none");
        }
        if (typeof selectedPlayer !== "undefined" || view === "Team") hiddenColumns.push("Id");
    } else {
        groupings.push(statGrouping1.value);
        if (statGrouping2.value && statGrouping2.value !== statGrouping1.value) {
            groupings.push(statGrouping2.value);
        } else {
            hiddenColumns.push("Grouping2");
        }
        hiddenColumns.push("Id");
        statGrouping2Div.classList.remove("d-none");
    }

    Reactable.setHiddenColumns(reactableId, hiddenColumns);
    Reactable.setData("xscores-table", aggregate(xscore, groupings, filters));
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

            input.addEventListener('change', (e) => { updateTable(); if (typeof selectedPlayer !== "undefined") updateShotChart(filters); });

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
    statGrouping1.appendChild(option);
    statGrouping2.appendChild(option.cloneNode(true));

    for (col of Object.keys(groupingColumns)) {
        option = document.createElement("option");
        option.value = col;
        option.text = groupingColumns[col];
        statGrouping1.appendChild(option);
        statGrouping2.appendChild(option.cloneNode(true));
    }

    console.log(lookups.Team)
    if (typeof lookups.Team !== 'undefined') {
        for (i = -1; i < lookups.Team[0].Index.length; i++) {
            const teamLink = document.createElement('a');
            if (i == -1) {
                teamLink.classList = 'btn btn-primary btn-sm mx-1 my-1';
                teamLink.innerText = `ALL`;
            } else {
                teamLink.classList = 'btn btn-sm p-1';
                teamLink.innerHTML = `<img src='${lookups.Team[0].TeamImage[i]}' height='25px'>`;
            }
            teamFiltersDiv.appendChild(teamLink);

            const team = i == -1 ? undefined : lookups.Team[0].Index[i];
            const teamLabel = i == -1 ? "All teams" : lookups.Team[0].Label[i];

            teamLink.addEventListener('click', function (event) {
                selectTeam(team);
            });
            // teamLink.addEventListener('click', function (event) {
            //     Reactable.setFilter('team-lists-table', 'Abbreviation', team);
            // });
        }
    }

    updatePlayer();
}

fetch(`https://www.wheeloratings.com/src/xscores/xscores_data.json`)
    .then((res) => res.json())
    .then((data) => {
        xscore = data.Data;
        lookups = data.Lookups;
        lookups.Season = [{ Index: Object.keys(xscore), Label: Object.keys(xscore) }];

        Reactable.setFilter(reactableId, "Shots", shotsFilter);
        initialiseFilters();
    });

const updateShotChart = function (filter) {
    const datasets = [];

    const data = { Goals: [], Behinds: [], NoScore: [] };
    const labels = { Goals: [], Behinds: [], NoScore: [] };

    let x;
    let y;
    let score;
    let labelText;

    let xMax = 40;
    let yMax = 55;

    if (Object.keys(xscoreShots).includes("x")) {

        xscoreShots["x"].forEach((element, index) => {
            x = parseFloat(element);
            y = parseFloat(xscoreShots["y"][index]);

            if (!isNaN(x)) {
                if (typeof xMax === "undefined") {
                    xMax = Math.abs(x);
                } else {
                    if (Math.abs(x) > xMax) xMax = Math.abs(x);
                }
            }

            if (!isNaN(y)) {
                if (typeof yMax === "undefined") {
                    yMax = Math.abs(y);
                } else {
                    if (Math.abs(y) > yMax) yMax = Math.abs(y);
                }
            }

            let filtered = true;
            Object.keys(filter).forEach(filterColumn => {
                if (filterColumn !== "Player" && filterColumn !== "Team")
                    filtered = filtered && (filter[filterColumn].length == 0 || filter[filterColumn].includes(`${xscoreShots[filterColumn][index]}`));
            });

            if (filtered) {
                score = xscoreShots["Score"][index] == 6 ? "Goals" : xscoreShots["Score"][index] == 1 ? "Behinds" : "NoScore";

                data[score].push({ x: -y, y: -x });
                distance = Math.round(Math.sqrt(Math.pow(xscoreShots["x"][index], 2) + Math.pow(xscoreShots["y"][index], 2)));
                labels[score].push(`${score === "Goals" ? "Goal" : score === "Behinds" ? "Behind" : "No score"}, xScore: ${xscoreShots["xScore"][index].toFixed(1)}, Distance: ${distance}m (${xscoreShots["Season"][index]})`);
            }
        })
    }

    const datasetGoals = {
        data: data["Goals"],
        pointRadius: 4,
        order: 2,
        borderColor: '#670099',
        backgroundColor: '#d79ff5'
    }

    const datasetBehinds = {
        data: data["Behinds"],
        pointRadius: 4,
        order: 2,
        borderColor: '#ff8300',
        backgroundColor: '#ffce99'
    }

    const datasetNoScore = {
        data: data["NoScore"],
        pointRadius: 4,
        order: 2,
        borderColor: '#b3b3b3',
        backgroundColor: '#e6e6e6'
    }

    datasets.push(datasetGoals);
    datasets.push(datasetBehinds);
    datasets.push(datasetNoScore);

    chart.data.datasets = datasets;

    range = Math.max(xMax, yMax);

    chart.options.scales.x.min = -range * 1.025;
    chart.options.scales.x.max = range * 1.025;
    chart.options.scales.y.min = -range * 1.025;
    chart.options.scales.y.max = range * 0.025;

    chart.options.plugins.tooltip.callbacks.label = function (context) {
        if (context.datasetIndex == 0) {
            let tooltip = labels["Goals"][context.dataIndex];
            return tooltip;
        } else if (context.datasetIndex == 1) {
            let tooltip = labels["Behinds"][context.dataIndex];
            return tooltip;
        } else {
            let tooltip = labels["NoScore"][context.dataIndex];
            return tooltip;
        }
    };

    chart.options.animation = false;

    chart.update();
}