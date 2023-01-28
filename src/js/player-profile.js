let compare_players = [];
let compare_players_season = {};
const max_compare_players = 4;

if (player_data) {
    compare_players_season[player] = player_data[player].Data['Season'].length - 1;

    if (parseInt(player_data[player].Data.Season[player_data[player].Data.Season.length - excludeRows])) {
        excludeRows = excludeRows - 1;
    }
}

const toggleCompare = function (id, e) {
    if (!compare_players.includes(id)) {
        if (compare_players.length < max_compare_players) {
            compare_players.push(id);
            e.classList = 'btn btn-success btn-sm mx-1';
            e.innerText = "Remove";
            updateCompareMessage();
            fetch(`${tableDataUrl}/${id.slice(-2)}.json`)
                .then((response) => response.json())
                .then((data) => {
                    player_data[id] = data[id];
                    compare_players_season[id] = data[id].Data['Season'].length - 1;
                    gtag('event', 'player_compare_added');

                    printCompare();
                    updateChart();
                })
        }
    } else {
        const index = compare_players.indexOf(id);
        if (index > -1) {
            compare_players.splice(index, 1);
        }

        e.classList = 'btn btn-primary btn-sm mx-1';
        e.innerText = "Compare";
        updateCompareMessage();

        printCompare();
        updateChart();
    }
};

const searchButton = document.querySelector("#search-button");
const searchCompareButton = document.querySelector("#search-compare-button");
const closeSearchButton = document.querySelector("#close-search-button");
const clearSearchButton = document.querySelector("#clear-search-button");
const overlay = document.querySelector("#overlay");
const search = document.querySelector('#player-search-text');
const results = document.querySelector('#results');
const compareMessage = document.querySelector('#compare-message');
const resultsMessage = document.querySelector('#results-message');

const updateCompareMessage = function () {
    if (compare_players.length < max_compare_players) {
        compareMessage.innerText = `Select up to ${max_compare_players - compare_players.length} more player(s) to compare to ${player_data[player].Summary.Player} or view another player's profile.`;
        compareMessage.classList = "small me-1";
    } else {
        compareMessage.innerText = `You have already selected ${max_compare_players} players.`;
        compareMessage.classList = "small me-1 text-danger";
    }
}

if (player_data) {
    updateCompareMessage();
} else {
    compareMessage.display = 'none';
}

const clearSearch = function () {
    search.value = "";
    results.innerHTML = '';
    resultsMessage.innerText = 'No results.';
};

const openSearch = function () {
    overlay.style.display = "block";
    search.focus();
};

searchButton.addEventListener('click', () => { openSearch() });
searchCompareButton.addEventListener('click', () => { openSearch() });
closeSearchButton.addEventListener('click', () => { overlay.style.display = "none"; clearSearch() });
clearSearchButton.addEventListener('click', () => { clearSearch(); search.focus() })

let search_term = '';

function showList() {
    search_term = search.value.toLowerCase();
    results.innerHTML = '';

    if (search_term !== '') {
        // search_results = player_search_list.Player.filter((item, index) => {
        //   return(item.toLowerCase().includes(search_term));
        //   if(item.toLowerCase().includes(search_term)) {
        //     return(index);
        //   }
        // });

        search_results = [];
        player_search_list.Player.forEach((item, index) => {
            if (player_search_list.WebsiteId[index] !== player && item.toLowerCase().includes(search_term)) {
                search_results.push(index);
            }
        });

        if (search_results.length) {
            resultsMessage.innerText = `${search_results.length} results.`;
            if (search_results.length > 100) {
                resultsMessage.innerText += ' Displaying first 100 results only.';
            }

            const searchTableDiv = document.createElement('div');
            searchTableDiv.id = "results-table-div";
            // searchTableDiv.classList = 'table-responsive';
            searchTableDiv.classList = 'table';

            const searchTable = document.createElement('table');
            searchTable.id = "results-table";
            searchTable.classList = 'table table-condensed table-sm';

            searchTableDiv.appendChild(searchTable);
            results.appendChild(searchTableDiv);

            const tbody = searchTable.createTBody();

            search_results.slice(0, 100).forEach((e) => {
                let row = tbody.insertRow();

                let cell = row.insertCell();
                cell.classList = "results-button py-0 text-center";

                const profileLink = document.createElement('a');
                profileLink.classList = 'btn btn-primary btn-sm mx-1';
                profileLink.href = `${profileUrl}=${player_search_list.WebsiteId[e]}`;
                profileLink.innerText = "Profile";
                cell.appendChild(profileLink);

                if (player_data) {
                    cell = row.insertCell();
                    cell.classList = "results-button py-0 text-center";

                    const compareLink = document.createElement('a');

                    if (compare_players.includes(player_search_list.WebsiteId[e])) {
                        compareLink.classList = 'btn btn-success btn-sm mx-1';
                        compareLink.innerText = "Remove";
                    } else {
                        compareLink.classList = 'btn btn-primary btn-sm mx-1';
                        compareLink.innerText = "Compare";
                    }

                    compareLink.addEventListener('click', function (event) {
                        toggleCompare(player_search_list.WebsiteId[e], event.target);
                    });

                    cell.appendChild(compareLink);
                }

                cell = row.insertCell();
                cell.innerText = player_search_list.Player[e];

                // const row = document.createElement('div');
                // row.classList = 'd-flex flex-row my-1';

                // const colPlayer = document.createElement('div');
                // // colPlayer.classList = 'col-8';

                // const colPlayerText = document.createElement('span');
                // colPlayerText.innerHTML = player_search_list.Player[e];
                // colPlayer.appendChild(colPlayerText);

                // const colProfile = document.createElement('div');
                // // colProfile.classList = 'col-2';

                // const profileLink = document.createElement('a');
                // profileLink.classList = 'btn btn-primary btn-sm mx-1';
                // profileLink.href = `${profileUrl}=${player_search_list.WebsiteId[e]}`;
                // profileLink.innerText = "Profile";
                // colProfile.appendChild(profileLink);

                // row.appendChild(colProfile);

                // if (player_data) {
                //     const colCompare = document.createElement('div');
                //     // colCompare.classList = 'col-2';

                //     const compareLink = document.createElement('a');
                //     compareLink.classList = 'btn btn-primary btn-sm mx-1';
                //     compareLink.innerText = "Compare";

                //     if (compare_players.includes(player_search_list.WebsiteId[e])) {
                //         compareLink.classList.toggle('disabled');
                //     }

                //     compareLink.addEventListener('click', function (event) {
                //         addCompare(player_search_list.WebsiteId[e]);
                //         event.target.classList.toggle('disabled');
                //     });

                //     colCompare.appendChild(compareLink);

                //     row.appendChild(colCompare);
                // }

                // row.appendChild(colPlayer);

                // results.appendChild(row);
            });
        } else {
            resultsMessage.innerText = 'No results.';
        }
    } else {
        resultsMessage.innerText = 'No results.';
    }
};

let timerId;

// Throttle function: Input as function which needs to be throttled and delay is the time interval in milliseconds
const throttleFunction = function (func, delay) {
    // If setTimeout is already scheduled, no need to do anything
    if (timerId) {
        return
    }

    // Schedule a setTimeout after delay seconds
    timerId = setTimeout(() => {
        func();

        // Once setTimeout function execution is finished, timerId = undefined so that in <br>
        // the next scroll event function execution can be scheduled by the setTimeout
        timerId = undefined;
    }, delay);
}

search.addEventListener('input', (event) => {
    throttleFunction(showList, 200);
});

const statDropdown = document.querySelector("#stat-select");
const chartAgeSelect = document.querySelector("#age-select");

statDropdown.addEventListener('change', (e) => {
    // chart.data.datasets[0].label = statDropdown.options[statDropdown.selectedIndex].text;
    chart.options.scales.y.title.text = statDropdown.options[statDropdown.selectedIndex].text;
    updateChart();
}
);

chartAgeSelect.addEventListener('change', (e) => { updateChart(); });

const updateChart = function () {
    const datasets = [];
    let chartRange = [];
    const chartSeasons = [];

    for (id of [player, ...compare_players]) {
        const data = [];
        let x;
        player_data[id].Data.Season.slice(0, -excludeRows).forEach((element, index) => {
            if (chartAgeSelect.checked) {
                x = player_data[id].Data.Age[index];
            } else {
                x = parseInt(element);
            }
            data.push({ x: x, y: player_data[id].Data[statDropdown.value][index] });
            if (chartRange.length) {
                if (x < chartRange[0]) {
                    chartRange[0] = x;
                }
                if (x > chartRange[1]) {
                    chartRange[1] = x;
                }
            } else {
                chartRange = [x, x];
            }
        });

        const dataset = {
            label: player_data[id].Summary.Player,
            data: data,
            borderWidth: 1.5
        }
        datasets.push(dataset);
    }

    for (s = chartRange[0]; s <= chartRange[1]; s++) {
        chartSeasons.push(s);
    }

    chart.data.datasets = datasets;
    chart.options.scales.x.labels = chartSeasons;
    if (typeof chartColumns !== 'undefined' && chartColumns[statDropdown.value].reverse) {
        chart.options.scales.y.reverse = true;
    } else {
        chart.options.scales.y.reverse = false;
    }

    // const chartConfig = chart.config;
    // chart = new Chart(ctx, chartConfig);

    if (typeof chartColumns !== 'undefined' && chartColumns[statDropdown.value].line) {
        chart.config.type = 'line';
        chart.options.scales.y.beginAtZero = false;
    } else {
        chart.config.type = 'bar';
        chart.options.scales.y.beginAtZero = true;
    }
    chart.update();
}

const ctx = document.getElementById('stats-chart');

const chart = new Chart(ctx, {
    type: 'bar',
    // type: 'line',
    data: {
        // labels: player_data[player].Data.Season.slice(0, -excludeRows),
        datasets: []
    },
    options: {
        scales: {
            x: {
                labels: []
            },
            y: {
                title: {
                    display: true,
                    text: statDropdown.options[statDropdown.selectedIndex].text
                },
                beginAtZero: true
            }
        }
    }
});

if (player_data) { updateChart() };

const tblDiv = document.querySelector('#compare-tbl-div');

const printCompare = function () {
    if (player_data) {
        const tbl = document.createElement('table');
        tbl.id = "compare-tbl";
        tbl.classList = "table table-condensed table-sm table-hover table-auto";
        const thead = tbl.createTHead();
        // thead.classList = "table-primary";
        let row = thead.insertRow();

        let th = document.createElement("th");
        th.innerText = "Player";
        row.appendChild(th);

        for (id of [player, ...compare_players]) {
            th = document.createElement("th");
            if (id === player) {
                th.innerText = player_data[id].Summary.Player;
            } else {
                const a = document.createElement('a');
                a.href = `${profileUrl}=${player_data[id].Summary.WebsiteId}`;
                a.innerText = player_data[id].Summary.Player;
                th.appendChild(a);
            }
            th.classList = "text-center";
            row.appendChild(th);
        }

        // SEASON SELECTOR
        row = thead.insertRow();

        th = document.createElement("th");
        th.innerText = "Season (Age)";
        row.appendChild(th);

        th = document.createElement("th");
        th.classList = "text-center";

        let selectList = document.createElement("select");

        for (id of [player, ...compare_players]) {
            th = document.createElement("th");
            th.classList = "text-center";

            selectList = document.createElement("select");

            for (let i = 0; i < player_data[id].Data['Season'].length; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.text = player_data[id].Data['Season'][i];
                if (parseInt(player_data[id].Data['Age'][i])) {
                    option.text += ` (${player_data[id].Data['Age'][i]})`
                };
                selectList.appendChild(option);
            }
            selectList.dataset.id = id;
            selectList.selectedIndex = compare_players_season[id];

            selectList.addEventListener('change', (event) => {
                compare_players_season[event.target.dataset.id] = event.target.selectedIndex;
                printCompare();
            });

            th.appendChild(selectList);
            row.appendChild(th);
        }

        // DELETE BUTTON
        if (compare_players.length > 0) {
            row = thead.insertRow();

            th = document.createElement("th");
            row.appendChild(th);

            th = document.createElement("th");
            row.appendChild(th);

            th = document.createElement("th");

            for (id of compare_players) {
                th = document.createElement("th");
                th.classList = "text-center";

                const deleteLink = document.createElement('a');
                deleteLink.classList = 'btn btn-primary btn-sm mx-1';
                deleteLink.innerText = "Delete";
                deleteLink.dataset.id = id;

                deleteLink.addEventListener('click', (event) => {
                    const index = compare_players.indexOf(event.target.dataset.id);
                    if (index > -1) {
                        compare_players.splice(index, 1);
                    }
                    printCompare();
                    updateChart();
                });

                th.appendChild(deleteLink);

                row.appendChild(th);
            }
        }

        // TABLE BODY
        const tbody = tbl.createTBody();
        let nonHeadingRow = true;
        let lastHeadingRow;

        for (col of Object.keys(compareColumns)) {
            if (compareColumns[col].heading || player_data[player].Data[col]) {
                row = tbody.insertRow();

                let cell = row.insertCell();
                cell.innerText = compareColumns[col].name;

                if (compareColumns[col].heading) {
                    row.classList = "fw-bold d-none";
                    nonHeadingRow = false;
                    lastHeadingRow = row;
                    // cell.classList = "fw-bold bg-primary";
                    // cell.colSpan = compare_players.length + 2;
                    if (Object.keys(compareColumns).indexOf(col) > 0) {
                        // Don't add player names if it's the first row
                        for (id of [player, ...compare_players]) {
                            td = document.createElement("td");
                            td.innerText = player_data[id].Summary.Player;
                            td.classList = "text-center";
                            row.appendChild(td);
                        }
                    }
                } else {
                    if (!nonHeadingRow) {
                        lastHeadingRow.classList.remove("d-none");
                        nonHeadingRow = true;
                    }
                    let statValues = [parseFloat(player_data[player].Data[col][compare_players_season[player]])];

                    for (id of compare_players) {
                        statValues.push(parseFloat(player_data[id].Data[col][compare_players_season[id]]));
                    }

                    let statValuesValid = statValues.filter((v) => { return !Number.isNaN(v) });

                    for (value of statValues) {
                        let cell = row.insertCell();
                        cell.classList = "text-center";
                        let dec = compareColumns[col].dec;
                        let best;
                        if (compareColumns[col].reverse) {
                            best = Math.min(...statValuesValid).toFixed(dec);
                        } else {
                            best = Math.max(...statValuesValid).toFixed(dec);
                        }
                        if (!isNaN(value)) {
                            if (statValues.length > 1 && value.toFixed(dec) === best) {
                                // cell.innerHTML = "<span class='rounded' style='display: inline-block; width: 75px; background-color: #91D1A2'><b>" + value.toFixed(dec) + "</b></span>";
                                cell.innerHTML = "<span class='rounded' style='display: inline-block; width: 75px; background-color: #e0baf2'><b>" + value.toFixed(dec) + "</b></span>";
                            } else {
                                cell.innerText = value.toFixed(dec);
                            }
                        }
                    }
                }
            }
        }

        const tfoot = tbl.createTFoot();
        // thead.classList = "table-primary";
        row = tfoot.insertRow();
        row.classList = "fw-bold";

        td = document.createElement("td");
        td.innerText = "Player";
        row.appendChild(td);

        for (id of [player, ...compare_players]) {
            td = document.createElement("td");
            td.innerText = player_data[id].Summary.Player;
            td.classList = "text-center";
            row.appendChild(td);
        }

        tblDiv.innerHTML = "";
        tblDiv.appendChild(tbl);
    }
}

printCompare();

// const refreshButton = document.querySelector('#refresh-compare');
// refreshButton.addEventListener('click', printCompare );