const urlParams = new URLSearchParams(location.search);
const player = urlParams.get("ID");
const paramSeason = urlParams.get("Season").toLowerCase();

const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const seasonList = document.querySelector("#season-list");
const playerDiv = document.querySelector("#player-div");
const statsDiv = document.querySelector("#stats-div");

const forButton = document.querySelector('#for-stats');
const againstButton = document.querySelector('#against-stats');
const differenceButton = document.querySelector('#difference-stats');

let player_data = "";
let season;
let reactableData;

if (paramSeason) { season = parseInt(paramSeason) }

const columns = [];
const columnsMissing = [];
const seasonButtons = [];

const columnsAlwaysDisplayed = ["Season", "RoundNumber", "MatchId", "Team", "Opposition", "Result", "Margin", "xMargin"];

let columnsToHide;
let hiddenColumns;

const statsColumns = {
    "For": ["Age", "Experience", "CoachesVotes", "RatingPoints", "Supercoach", "DreamTeamPoints", "Kicks", "Handballs", "Disposals", "DisposalEfficiency", "MetresGained", "Inside50s", "ContestedPossessions", "Intercepts", "TotalClearances", "Marks", "ContestedMarks", "InterceptMarks", "ShotsAtGoal", "Goals", "Behinds", "Score", "xScore", "xScoreRating", "GoalAssists", "Tackles", "Hitouts", "PointsFromKickIn", "PointsFromStoppage", "PointsFromTurnover", "PointsFromDefensiveHalf"],
    "Against": ["Age_Opposition", "Experience_Opposition", "RatingPoints_Opposition", "Kicks_Opposition", "Handballs_Opposition", "Disposals_Opposition", "MetresGained_Opposition", "Inside50s_Opposition", "ContestedPossessions_Opposition", "Intercepts_Opposition", "TotalClearances_Opposition", "Marks_Opposition", "ContestedMarks_Opposition", "InterceptMarks_Opposition", "ShotsAtGoal_Opposition", "Goals_Opposition", "Behinds_Opposition", "Score_Opposition", "xScore_Opposition", "xScoreRating_Opposition", "GoalAssists_Opposition", "Tackles_Opposition", "PointsFromKickIn_Opposition", "PointsFromStoppage_Opposition", "PointsFromTurnover_Opposition", "PointsFromDefensiveHalf_Opposition"],
    "Difference": ["Age_Diff", "Experience_Diff", "RatingPoints_Diff", "Kicks_Diff", "Handballs_Diff", "Disposals_Diff", "MetresGained_Diff", "Inside50s_Diff", "ContestedPossessions_Diff", "Intercepts_Diff", "TotalClearances_Diff", "Marks_Diff", "ContestedMarks_Diff", "InterceptMarks_Diff", "ShotsAtGoal_Diff", "xScoreRating_Diff", "GoalAssists_Diff", "Tackles_Diff", "PointsFromKickIn_Diff", "PointsFromStoppage_Diff", "PointsFromTurnover_Diff", "PointsFromDefensiveHalf_Diff"]
};

const matchDisplay = function (cellInfo) {
    return `<a href='afl_match_stats.html?ID=${cellInfo.row['MatchId']}'>View</a>`
}

const noValidPlayer = function () {
    h1.innerText = 'AFL Match Stats';
    playerDiv.style.display = "none";
}

if (player) {
    // document.querySelector("#profile-link").href = `afl_player_profile.html?ID=${player}`;

    const xmlhttp = new XMLHttpRequest();
    const url = `https://www.wheeloratings.com/src/match_stats_team/table_data/${player}.json`;

    let data = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"Season","name":"Season","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center","defaultSortDesc":false,"className":"sticky","headerClassName":"sticky"},{"id":"RoundNumber","name":"Round","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","defaultSortDesc":false,"className":"sticky","style":{"left":60},"headerClassName":"sticky","headerStyle":{"left":60}},{"id":"MatchId","name":"Match Stats","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","cell":"function(cellInfo) { return matchDisplay(cellInfo) }","html":true},{"id":"Match","name":"Match","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Opposition","name":"Opp.","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","filterable":true,"defaultSortDesc":false,"className":"sticky","style":{"left":115},"headerClassName":"sticky","headerStyle":{"left":115}},{"id":"Result","name":"W/L","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","filterable":true},{"id":"Margin","name":"Margin","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center"},{"id":"xMargin","name":"xMarg.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":55,"align":"center"},{"id":"Age","name":"Age","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"Experience","name":"Exp.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Intercepts","name":"Int","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"InterceptMarks","name":"Int Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Score","name":"Score","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"xScore","name":"xSc","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"xScoreRating","name":"xSc +/-","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"PointsFromKickIn","name":"Kick In","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"PointsFromStoppage","name":"Stop","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"PointsFromTurnover","name":"Turn over","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"PointsFromDefensiveHalf","name":"Def Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Age_Opposition","name":"Age","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"Experience_Opposition","name":"Exp.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"RatingPoints_Opposition","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"Kicks_Opposition","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Handballs_Opposition","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Disposals_Opposition","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"MetresGained_Opposition","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Inside50s_Opposition","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedPossessions_Opposition","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Intercepts_Opposition","name":"Int","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"TotalClearances_Opposition","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Marks_Opposition","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedMarks_Opposition","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"InterceptMarks_Opposition","name":"Int Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ShotsAtGoal_Opposition","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Goals_Opposition","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Behinds_Opposition","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Score_Opposition","name":"Score","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"xScore_Opposition","name":"xSc","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"xScoreRating_Opposition","name":"xSc +/-","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"GoalAssists_Opposition","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Tackles_Opposition","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"PointsFromKickIn_Opposition","name":"Kick In","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"PointsFromStoppage_Opposition","name":"Stop","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"PointsFromTurnover_Opposition","name":"Turn over","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"PointsFromDefensiveHalf_Opposition","name":"Def Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Age_Diff","name":"Age","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"Experience_Diff","name":"Exp.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"RatingPoints_Diff","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"Kicks_Diff","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Handballs_Diff","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Disposals_Diff","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"MetresGained_Diff","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Inside50s_Diff","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedPossessions_Diff","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Intercepts_Diff","name":"Int","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"TotalClearances_Diff","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Marks_Diff","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedMarks_Diff","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"InterceptMarks_Diff","name":"Int Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ShotsAtGoal_Diff","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"xScoreRating_Diff","name":"xSc +/-","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"GoalAssists_Diff","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Tackles_Diff","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"PointsFromKickIn_Diff","name":"Kick In","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"PointsFromStoppage_Diff","name":"Stop","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"PointsFromTurnover_Diff","name":"Turn over","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"PointsFromDefensiveHalf_Diff","name":"Def Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"}],"columnGroups":[{"name":"Result","columns":["Result","Margin","xMargin"]},{"name":"Stats","columns":["Age","Experience","CoachesVotes","RatingPoints","Supercoach","Kicks","Handballs","Disposals","DisposalEfficiency","MetresGained","Inside50s","ContestedPossessions","Intercepts","TotalClearances","Marks","ContestedMarks","InterceptMarks","ShotsAtGoal","Goals","Behinds","Score","xScore","xScoreRating","GoalAssists","Tackles"]},{"name":"Score sources","columns":["PointsFromKickIn","PointsFromStoppage","PointsFromTurnover","PointsFromDefensiveHalf"]},{"name":"Stats","columns":["Age_Opposition","Experience_Opposition","RatingPoints_Opposition","Kicks_Opposition","Handballs_Opposition","Disposals_Opposition","MetresGained_Opposition","Inside50s_Opposition","ContestedPossessions_Opposition","Intercepts_Opposition","TotalClearances_Opposition","Marks_Opposition","ContestedMarks_Opposition","InterceptMarks_Opposition","ShotsAtGoal_Opposition","Goals_Opposition","Behinds_Opposition","Score_Opposition","xScore_Opposition","xScoreRating_Opposition","GoalAssists_Opposition","Tackles_Opposition"]},{"name":"Score sources","columns":["PointsFromKickIn_Opposition","PointsFromStoppage_Opposition","PointsFromTurnover_Opposition","PointsFromDefensiveHalf_Opposition"]},{"name":"Stats","columns":["Age_Diff","Experience_Diff","RatingPoints_Diff","Kicks_Diff","Handballs_Diff","Disposals_Diff","MetresGained_Diff","Inside50s_Diff","ContestedPossessions_Diff","Intercepts_Diff","TotalClearances_Diff","Marks_Diff","ContestedMarks_Diff","InterceptMarks_Diff","ShotsAtGoal_Diff","xScoreRating_Diff","GoalAssists_Diff","Tackles_Diff"]},{"name":"Score sources","columns":["PointsFromKickIn_Diff","PointsFromStoppage_Diff","PointsFromTurnover_Diff","PointsFromDefensiveHalf_Diff"]}],"defaultSortDesc":true,"defaultSorted":[{"id":"Match","desc":true}],"defaultPageSize":20,"showPageSizeOptions":true,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"elementId":"match-stats","dataKey":"40d9f0ccdd62c5500a4e1f4369355df9"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.columns.2.cell"],"jsHooks":[]}`;

    data = JSON.parse(data);

    for (col of data.x.tag.attribs.columns) {
        columns.push(col.id);
    }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            res = JSON.parse(this.responseText);

            if (res) {
                player_data = res;

                reactableData = JSON.parse(JSON.stringify(player_data.TeamData[0]));

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

                columnsToHide = [...columnsMissing, ...statsColumns.For, ...statsColumns.Against, ...statsColumns.Difference];
                hiddenColumns = {
                    "For": columnsToHide.filter((value) => { return !statsColumns.For.includes(value) }),
                    "Against": columnsToHide.filter((value) => { return !statsColumns.Against.includes(value) }),
                    "Difference": columnsToHide.filter((value) => { return !statsColumns.Difference.includes(value) })
                }

                addEventListener('DOMContentLoaded', (event) => {
                    if (season) {
                        Reactable.setFilter('match-stats', 'Season', `${season}`);
                    }
                    Reactable.setHiddenColumns('match-stats', hiddenColumns.For);

                    forButton.addEventListener('click', (e) => {
                        Reactable.setHiddenColumns('match-stats', hiddenColumns.For);
                        forButton.classList.add('btn-primary');
                        forButton.classList.remove('btn-light');
                        againstButton.classList.remove('btn-primary');
                        againstButton.classList.add('btn-light');
                        differenceButton.classList.remove('btn-primary');
                        differenceButton.classList.add('btn-light');
                    });
                    againstButton.addEventListener('click', (e) => {
                        Reactable.setHiddenColumns('match-stats', hiddenColumns.Against);
                        forButton.classList.remove('btn-primary');
                        forButton.classList.add('btn-light');
                        againstButton.classList.add('btn-primary');
                        againstButton.classList.remove('btn-light');
                        differenceButton.classList.remove('btn-primary');
                        differenceButton.classList.add('btn-light');
                    });
                    differenceButton.addEventListener('click', (e) => {
                        Reactable.setHiddenColumns('match-stats', hiddenColumns.Difference);
                        forButton.classList.remove('btn-primary');
                        forButton.classList.add('btn-light');
                        againstButton.classList.remove('btn-primary');
                        againstButton.classList.add('btn-light');
                        differenceButton.classList.add('btn-primary');
                        differenceButton.classList.remove('btn-light');
                    });

                });

                data.x.tag.attribs.data = reactableData;

                h1.innerText = `Match Stats - ${player_data.Summary[0].Team}`;
                document.title = `AFL Match Stats - ${player_data.Summary[0].Team}`;

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
                    history.replaceState(null, '', `afl_match_stats_team.html?ID=${player}`);

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
                        history.replaceState(null, '', `afl_match_stats_team.html?ID=${player}&Season=${season}`);

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

const csvDownloadButton = document.querySelector('#download-csv-button');
csvDownloadButton.addEventListener('click', (e) => {
    let seasonString;
    if (season) {
        seasonString = season;
    } else {
        seasonString = "All";
    }

    Reactable.downloadDataCSV('match-stats', `afl-match-stats-team-${player_data.Summary[0].Team}-${seasonString}.csv`, { columnIds: [...new Set([...columnsAlwaysDisplayed, ...statsColumns.For, ...statsColumns.Against, ...statsColumns.Difference])] });
    gtag('event', 'data_download');
});