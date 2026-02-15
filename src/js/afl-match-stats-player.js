const urlParams = new URLSearchParams(location.search);
let player = urlParams.get("id");
if (!player) player = urlParams.get("ID");
let paramSeason = urlParams.get("season");
if (!paramSeason) paramSeason = urlParams.get("Season");

const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const seasonList = document.querySelector("#season-list");
const playerDiv = document.querySelector("#player-div");
const statsDiv = document.querySelector("#stats-div");

let player_data = "";
let season;
let reactableData;

if (paramSeason) { season = parseFloat(paramSeason).toString() }

const columns = [];
const columnsMissing = [];
const seasonButtons = [];

const filterColumns = {
    'Season': 'Season',
    "Match": "Match Number",
    "RatingPoints": "Player Rating",
    "EstimatedRating": "Predicted Rating",
    "Supercoach": "Supercoach Points",
    "DreamTeamPoints": "Fantasy Points",
    "CoachesVotes": "Coaches Votes",
    "TimeOnGround": "Time On Ground",
    "Kicks": "Kicks",
    "Handballs": "Handballs",
    "Disposals": "Disposals",
    "DisposalEfficiency": "Disposal Efficiency",
    "MetresGained": "Metres Gained",
    "Inside50s": "Inside 50s",
    "ContestedPossessions": "Contested Possessions",
    "GroundBallGets": "Ground Ball Gets",
    "PostClearanceContestedPossessions": "Post-Clearance Contested Possessions",
    "PostClearanceGroundBallGets": "Post-Clearance Ground Ball Gets",
    "HandballReceives": "Handball Receives",
    "Intercepts": "Intercept Possessions",
    "CentreBounceAttendancePercentage": "Centre Bounce Attendance %",
    "TotalClearances": "Total Clearances",
    "Marks": "Marks",
    "ContestedMarks": "Contested Marks",
    "InterceptMarks": "Intercept Marks",
    "ShotsAtGoal": "Shots At Goal",
    "Goals": "Goals",
    "xScore": "xScore",
    "xScoreRating": "xScore +/-",
    "GoalAssists": "Goal Assists",
    "ScoreInvolvements": "Score Involvements",
    "ScoreLaunches": "Score Launches",
    "Tackles": "Tackles",
    "PressureActs": "Pressure Acts",
    "Hitouts": "Hitouts"
}

const colClass = function (rowInfo, column, state) {
    for (let i = 0; i < state.sorted.length; i++) {
        if (state.sorted[i].id === column.id)
            return 'fw-bold'
    }
}

const matchDisplay = function (cellInfo) {
    return `<a href='afl_match_stats.html?id=${cellInfo.row['MatchId']}'>View</a>`
}

const noValidPlayer = function () {
    h1.innerText = 'AFL Match Stats';
    playerDiv.style.display = "none";
}

if (player) {
    document.querySelector("#profile-link").href = `afl_player_profile.html?id=${player}`;

    const xmlhttp = new XMLHttpRequest();
    const url = `https://www.wheeloratings.com/src/match_stats_player/table_data/${player.slice(-2)}.json`;

    let data = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"Season","name":"Season","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center","defaultSortDesc":false,"className":"sticky","headerClassName":"sticky"},{"id":"RoundNumber","name":"Round","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","defaultSortDesc":false,"className":"sticky","style":{"left":60},"headerClassName":"sticky","headerStyle":{"left":60}},{"id":"MatchId","name":"Match Stats","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","cell":"function(cellInfo) { return matchDisplay(cellInfo) }","html":true},{"id":"Result","name":"W/L","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","filterable":true},{"id":"Match","name":"Match","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"sticky","style":{"left":115},"headerClassName":"sticky","headerStyle":{"left":115}},{"id":"Milestone","name":"Milestone","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Team","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","filterable":true,"defaultSortDesc":false},{"id":"Opposition","name":"Opp.","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","filterable":true,"defaultSortDesc":false},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center","className":"colClass"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center","className":"colClass"},{"id":"EstimatedRating","name":"Pred. Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center","className":"colClass"},{"id":"Equity_PreClearance","name":"Pre Cl Equity","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":55,"align":"center","className":"colClass"},{"id":"Equity_PostClearance","name":"Post Cl Equity","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":55,"align":"center","className":"colClass"},{"id":"Equity_Possession","name":"Ball Win.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Equity_BallUse","name":"Ball Use","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"DreamTeamPoints","name":"Fantasy Points","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center","className":"colClass"},{"id":"TimeOnGround","name":"TOG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"GroundBallGets","name":"GB Gets","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PostClearanceContestedPossessions","name":"Post Cl CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"PostClearanceGroundBallGets","name":"Post Cl GBG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"HandballReceives","name":"HB Rec","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Intercepts","name":"Int","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"CentreBounceAttendancePercentage","name":"CBA %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"InterceptMarks","name":"Int Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"xScore","name":"xSc","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":40,"align":"center","className":"colClass"},{"id":"xScoreRating","name":"xSc +/-","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":40,"align":"center","className":"colClass"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ScoreInvolvements","name":"SI","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ScoreLaunches","name":"Launch","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center","className":"colClass"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PressureActs","name":"Pr. Acts","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Hitouts","name":"Hit Outs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"}],"defaultSortDesc":true,"defaultSorted":[{"id":"Match","desc":true}],"defaultPageSize":20,"showPageSizeOptions":true,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","rowStyle":"function(rowInfo) { if (rowInfo && rowInfo.values['TimeOnGround'] === 0) { return {color: '#828282'} } }","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"crosstalkKey":["1"],"crosstalkGroup":"SharedDatace8bfa19","elementId":"match-stats","dataKey":"527b693e7c9a706e9c3e1c37625e0684"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.columns.2.cell","tag.attribs.columns.8.className","tag.attribs.columns.9.className","tag.attribs.columns.10.className","tag.attribs.columns.11.className","tag.attribs.columns.12.className","tag.attribs.columns.13.className","tag.attribs.columns.14.className","tag.attribs.columns.15.className","tag.attribs.columns.16.className","tag.attribs.columns.17.className","tag.attribs.columns.18.className","tag.attribs.columns.19.className","tag.attribs.columns.20.className","tag.attribs.columns.21.className","tag.attribs.columns.22.className","tag.attribs.columns.23.className","tag.attribs.columns.24.className","tag.attribs.columns.25.className","tag.attribs.columns.26.className","tag.attribs.columns.27.className","tag.attribs.columns.28.className","tag.attribs.columns.29.className","tag.attribs.columns.30.className","tag.attribs.columns.31.className","tag.attribs.columns.32.className","tag.attribs.columns.33.className","tag.attribs.columns.34.className","tag.attribs.columns.35.className","tag.attribs.columns.36.className","tag.attribs.columns.37.className","tag.attribs.columns.38.className","tag.attribs.columns.39.className","tag.attribs.columns.40.className","tag.attribs.columns.41.className","tag.attribs.columns.42.className","tag.attribs.columns.43.className","tag.attribs.columns.44.className","tag.attribs.columns.45.className","tag.attribs.rowStyle"],"jsHooks":[]}`;

    data = JSON.parse(data);

    ct_sharedData_temp = data.x.tag.attribs.crosstalkGroup;

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

                if (typeof reactableData.Season === "string") {
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

                data.x.tag.attribs.crosstalkKey = Array.from({ length: reactableData[Object.keys(reactableData)[0]].length }, (value, index) => (index + 1).toString());

                addEventListener('DOMContentLoaded', (event) => {
                    if (season) {
                        Reactable.setFilter('match-stats', 'Season', `${season}`);
                    }
                    Reactable.setHiddenColumns("match-stats", prevColumns => { return prevColumns.concat(columnsMissing) });
                });

                data.x.tag.attribs.data = reactableData;

                h1.innerText = `Match Stats - ${player_data.Summary.Player}`;
                document.title = `AFL Match Stats - ${player_data.Summary.Player}`;
                if (parseInt(player_data.Summary.xScoreAvailable)) {
                    document.querySelector("#shot-chart-link").href = `afl_xscores.html?id=${player}`;
                    document.querySelector("#shot-chart-link").classList.remove("d-none");
                }

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
                    history.replaceState(null, '', `afl_match_stats_player.html?id=${player}`);

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
                        history.replaceState(null, '', `afl_match_stats_player.html?id=${player}&season=${season}`);

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
                //     cell.innerHTML += ` (<a href='afl_match_stats.html?id=${parseInt(player_data.Summary.DebutMatchId)}'>Match stats</a>)`;
                // }

                // row = tbody.insertRow();
                // cell = row.insertCell();
                // cell.classList = "fw-bold";
                // cell.innerText = "Last Match";

                // cell = row.insertCell();
                // cell.innerHTML = `${player_data.Summary.LastMatchSeason} v ${player_data.Summary.LastMatchOpposition}`;

                // if (parseInt(player_data.Summary.LastMatchId)) {
                //     cell.innerHTML += ` (<a href='afl_match_stats.html?id=${parseInt(player_data.Summary.LastMatchId)}'>Match stats</a>)`;
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
const statsColumns = ["CoachesVotes", "RatingPoints", "EstimatedRating", "Supercoach", "DreamTeamPoints", "TimeOnGround", "Kicks", "Handballs", "Disposals", "DisposalEfficiency", "MetresGained", "Inside50s", "ContestedPossessions", "GroundBallGets", "PostClearanceContestedPossessions", "PostClearanceGroundBallGets", "Intercepts", "CentreBounceAttendancePercentage", "TotalClearances", "Marks", "ContestedMarks", "InterceptMarks", "ShotsAtGoal", "Goals", "Behinds", "GoalAssists", "ScoreInvolvements", "ScoreLaunches", "Tackles", "PressureActs", "Hitouts"];

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