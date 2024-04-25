const filterColumns = {
    'CoachesVotes': 'Coaches Votes',
    'RatingPoints': 'Rating Points'
}

//const filterColumnsDefault = ['Age', 'Matches_Career']

let matchId;
let roundId;
let seasonId;

const urlParams = new URLSearchParams(location.search);
const player = urlParams.get("ID");
const paramSeason = urlParams.get("Season");

const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const seasonList = document.querySelector("#season-list");
const playerDiv = document.querySelector("#player-div");
const statsDiv = document.querySelector("#stats-div");

let player_data = "";
let season;
let reactableData;

if (paramSeason) { season = parseInt(paramSeason) }

const columns = [];
const columnsMissing = [];
const seasonButtons = [];

const matchDisplay = function (cellInfo) {
    return `<a href='afl_match_stats.html?ID=${cellInfo.row['MatchId']}'>View</a>`
}

const noValidPlayer = function () {
    h1.innerText = 'AFL Match Stats';
    playerDiv.style.display = "none";
}

if (player) {
    document.querySelector("#profile-link").href = `afl_player_profile.html?ID=${player}`;

    const xmlhttp = new XMLHttpRequest();
    const url = `https://www.wheeloratings.com/src/match_stats_player/table_data/${player.slice(-2)}.json`;

    let data = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"Season","name":"Season","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center","defaultSortDesc":false,"className":"sticky","headerClassName":"sticky"},{"id":"RoundNumber","name":"Round","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","defaultSortDesc":false,"className":"sticky","style":{"left":60},"headerClassName":"sticky","headerStyle":{"left":60}},{"id":"MatchId","name":"Match Stats","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","cell":"function(cellInfo) { return matchDisplay(cellInfo) }","html":true},{"id":"Result","name":"W/L","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","filterable":true},{"id":"Match","name":"Match","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"sticky","style":{"left":115},"headerClassName":"sticky","headerStyle":{"left":115}},{"id":"Milestone","name":"Milestone","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Team","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","filterable":true,"defaultSortDesc":false},{"id":"Opposition","name":"Opp.","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","filterable":true,"defaultSortDesc":false},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"EstimatedRating","name":"Pred. Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center"},{"id":"DreamTeamPoints","name":"Fantasy Points","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center"},{"id":"TimeOnGround","name":"TOG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"CentreBounceAttendancePercentage","name":"CBA %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"xScore","name":"xSc","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":40,"align":"center"},{"id":"xScoreRating","name":"xSc +/-","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":40,"align":"center"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ScoreInvolvements","name":"SI","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Hitouts","name":"Hit Outs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"}],"defaultSortDesc":true,"defaultSorted":[{"id":"Match","desc":true}],"defaultPageSize":20,"showPageSizeOptions":true,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","rowStyle":"function(rowInfo) { if (rowInfo.values['TimeOnGround'] === 0) { return {color: '#828282'} } }","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"elementId":"match-stats","dataKey":"7f3dec049b1e449360d345aa2c7a3178"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.columns.2.cell","tag.attribs.rowStyle"],"jsHooks":[]}`;

    data = JSON.parse(data);

    for (col of data.x.tag.attribs.columns) {
        columns.push(col.id);
    }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            res = JSON.parse(this.responseText);

            if (res[player]) {
                player_data = {};
                player_data = res[player];
            }

            if (player_data) {
                reactableData = JSON.parse(JSON.stringify(player_data.Data));

                if (typeof reactableData.Season === "number") {
                    for (k of Object.keys(reactableData)) {
                        reactableData[k] = [reactableData[k]];
                    }
                }

                // Remove columns from data if column isn't defined in Reactable
                for (col of Object.keys(reactableData)) {
                    if (!columns.includes(col)) {
                        delete reactableData[col];
                    }
                }

                // Hide columns in Reactable if no player data exists
                for (col of columns) {
                    if (!Object.keys(reactableData).includes(col)) {
                        columnsMissing.push(col);
                    }
                }

                addEventListener('DOMContentLoaded', (event) => {
                    if (season) {
                        Reactable.setFilter('match-stats', 'Season', `${season}`);
                    }
                    Reactable.setHiddenColumns("match-stats", prevColumns => { return prevColumns.concat(columnsMissing) });
                });

                data.x.tag.attribs.data = reactableData;

                h1.innerText = `Match Stats - ${player_data.Summary.Player}`;
                document.title = `AFL Match Stats - ${player_data.Summary.Player}`;

                let div = document.querySelector("#react-div");

                const s = document.createElement('script');
                s.setAttribute('type', 'application/json');
                s.setAttribute('data-for', 'htmlwidget-stats');
                s.innerText = JSON.stringify(data);

                div.append(s);

                let button = document.createElement('button');
                button.id = "season-All";
                button.type = "button";
                button.classList = "btn btm-sm mx-1 my-2";
                button.innerText = "All seasons";
                if (season) {
                    button.classList.add("btn-light");
                } else {
                    button.classList.add("btn-primary");
                }
                seasonList.appendChild(button);
                seasonButtons.push(button);

                button.addEventListener('click', (e) => {
                    season = null;
                    Reactable.setFilter('match-stats', 'Season', undefined);
                    history.replaceState(null, '', `afl_match_stats_player.html?ID=${player}`);

                    for (btn of seasonButtons) {
                        if (btn.id === `season-${season}` || (!season && btn.id === "season-All")) {
                            btn.classList.add("btn-primary");
                            btn.classList.remove("btn-light");
                        } else {
                            btn.classList.add("btn-light");
                            btn.classList.remove("btn-primary");
                        }
                    }
                });

                for (const s of [...new Set(reactableData.Season)]) {
                    button = document.createElement('button');
                    button.id = `season-${s}`;
                    button.type = "button";
                    button.classList = "btn btm-sm mx-1 my-2";
                    button.innerText = `${s}`;
                    if (s === season) {
                        button.classList.add("btn-primary");
                    } else {
                        button.classList.add("btn-light");
                    }
                    seasonList.appendChild(button);
                    seasonButtons.push(button);

                    button.addEventListener('click', (e) => {
                        season = s;
                        Reactable.setFilter('match-stats', 'Season', undefined);
                        Reactable.setFilter('match-stats', 'Season', `${season}`);
                        history.replaceState(null, '', `afl_match_stats_player.html?ID=${player}&Season=${season}`);

                        for (btn of seasonButtons) {
                            if (btn.id === `season-${season}`) {
                                btn.classList.add("btn-primary");
                                btn.classList.remove("btn-light");
                            } else {
                                btn.classList.add("btn-light");
                                btn.classList.remove("btn-primary");
                            }
                        }
                    });

                }

                // div = document.querySelector("#summary-div");

                // const tbl = document.createElement("table");
                // tbl.id = "summary-table";
                // tbl.classList = "table table-condensed table-sm table-hover table-auto"
                // div.appendChild(tbl);
                // const tbody = tbl.createTBody();

                // let row = tbody.insertRow();
                // let cell = row.insertCell();
                // cell.classList = "fw-bold";
                // cell.innerText = "Player";

                // cell = row.insertCell();
                // cell.innerText = player_data.Summary.Player;

                // row = tbody.insertRow();
                // cell = row.insertCell();
                // cell.classList = "fw-bold";
                // cell.innerText = "Debut";

                // cell = row.insertCell();
                // cell.innerHTML = `${player_data.Summary.DebutSeason} v ${player_data.Summary.DebutOpposition}`;

                // if (parseInt(player_data.Summary.DebutMatchId)) {
                //     cell.innerHTML += ` (<a href='afl_match_stats.html?ID=${parseInt(player_data.Summary.DebutMatchId)}'>Match stats</a>)`;
                // }

                // row = tbody.insertRow();
                // cell = row.insertCell();
                // cell.classList = "fw-bold";
                // cell.innerText = "Last Match";

                // cell = row.insertCell();
                // cell.innerHTML = `${player_data.Summary.LastMatchSeason} v ${player_data.Summary.LastMatchOpposition}`;

                // if (parseInt(player_data.Summary.LastMatchId)) {
                //     cell.innerHTML += ` (<a href='afl_match_stats.html?ID=${parseInt(player_data.Summary.LastMatchId)}'>Match stats</a>)`;
                // }

                // row = tbody.insertRow();
                // cell = row.insertCell();
                // cell.classList = "fw-bold";
                // cell.innerText = "Career Matches";

                // cell = row.insertCell();
                // cell.innerText = `${player_data.Data.Matches.slice(-1)}`;

                // row = tbody.insertRow();
                // cell = row.insertCell();
                // cell.classList = "fw-bold";
                // cell.innerText = "Career Goals";

                // cell = row.insertCell();
                // cell.innerText = `${player_data.Data.Goals_Total.slice(-1)}`;
            } else {
                noValidPlayer();
            }
        } else if (this.readyState == 4) {
            noValidPlayer();
        }
    };

    xmlhttp.open("GET", url, false);
    xmlhttp.send();
} else {
    noValidPlayer();
}

const columnsAlwaysDisplayed = ["Season", "RoundNumber", "Match", "Team", "Opposition", "Result"];
const statsColumns = ["CoachesVotes", "RatingPoints", "EstimatedRating", "Supercoach", "DreamTeamPoints", "ExpVotes", "Votes3", "Votes2", "Votes1", "TimeOnGround", "Kicks", "Handballs", "Disposals", "DisposalEfficiency", "MetresGained", "Inside50s", "ContestedPossessions", "CentreBounceAttendancePercentage", "TotalClearances", "Marks", "ContestedMarks", "ShotsAtGoal", "Goals", "Behinds", "GoalAssists", "ScoreInvolvements", "Tackles", "Hitouts"];

const csvDownloadButton = document.querySelector('#download-csv-button');
csvDownloadButton.addEventListener('click', (e) => {
    let seasonString;
    if (season) {
        seasonString = season;
    } else {
        seasonString = "All";
    }

    Reactable.downloadDataCSV('match-stats', `afl-match-stats-player-${player_data.Summary.Player}-${seasonString}.csv`, { columnIds: [...new Set([...columnsAlwaysDisplayed, ...statsColumns])] });
    gtag('event', 'data_download');
});