let matchId;
let roundId;
let seasonId;

const urlParams = new URLSearchParams(location.search);
const paramId = urlParams.get("ID");
// if (paramId.length === 8) {
//     matchId = parseInt(paramId);
// }
if (paramId.length >= 6) {
    roundId = parseInt(paramId.slice(0, 6));
}
if (paramId.length >= 4) {
    seasonId = parseInt(paramId.slice(0, 4));
}
if (!seasonId) {
    seasonId = Math.max(validYears);
}

const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const roundList = document.querySelector("#round-list");
const matchList = document.querySelector("#match-list");
const matchBanner = document.querySelector("#match-banner");
const roundDiv = document.querySelector("#round-div");
const statsDiv = document.querySelector("#stats-div");

let season_data = "";
let round_data = "";
let match_number;
let reactableData;

const columns = [];
const columnsMissing = [];
const matchButtons = [];

const loadMatch = function () {
    if (match_number >= 0) {
        matchBanner.innerHTML = `<img src="${round_data.Matches[0].HomeImage[match_number]}" height="40px" alt=""> ${round_data.Matches[0].HomeTeam[match_number]} v ${round_data.Matches[0].AwayTeam[match_number]} <img src="${round_data.Matches[0].AwayImage[match_number]}" height="40px" alt="">`;
        document.title = `AFL Match Stats - ${round_data.Summary[0].Season}, Round ${round_data.Summary[0].RoundNumber} - ${round_data.Matches[0].HomeTeam[match_number]} v ${round_data.Matches[0].AwayTeam[match_number]}`;
    } else {
        matchBanner.innerHTML = `All Round ${round_data.Summary[0].RoundNumber} Stats`;
        document.title = `AFL Match Stats - ${round_data.Summary[0].Season}, Round ${round_data.Summary[0].RoundNumber}`;
    }
}

if (validYears.includes(seasonId)) {
    fetch(`https://www.wheeloratings.com/src/match_stats/table_data/${seasonId}.json`)
        .then((res) => res.json())
        .then((data) => {
            if (typeof data.RoundId === "string") {
                for (key of Object.keys(data)) {
                    data[key] = [data[key]];
                }
            }
            if (!roundId && data.RoundId[0]) {
                window.location.href = `afl_match_stats.html?ID=${data.RoundId[0]}`;
            } else {
                for (let i = 0; i < data.RoundId.length; i++) {
                    const li = document.createElement('option');
                    li.value = data.RoundId[i];
                    li.innerText = `Round ${data.RoundNumber[i]}`;
                    if (data.RoundId[i] === roundId.toString()) {
                        li.selected = true;
                    }
                    roundList.appendChild(li);
                }

                roundList.addEventListener('change', (e) => {
                    window.location.href = `afl_match_stats.html?ID=${roundList.value}`;
                })
            }
        });

    document.querySelector(`#year-${seasonId}`).classList = "active";

    if (roundId) {
        const xmlhttp = new XMLHttpRequest();
        const url = `https://www.wheeloratings.com/src/match_stats/table_data/${roundId}.json`;

        let data = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"MatchId","name":"MatchId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Player","name":"Player","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":180,"align":"left","defaultSortDesc":false,"className":"sticky","headerClassName":"sticky"},{"id":"WebsiteId","name":"WebsiteId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Abbreviation","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","defaultSortDesc":false,"className":"sticky","style":{"left":150},"headerClassName":"sticky","headerStyle":{"left":150}},{"id":"Image","name":"Image","type":["glue","character"],"sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center"},{"id":"DreamTeamPoints","name":"Fantasy Points","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center"},{"id":"TimeOnGround","name":"TOG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ScoreInvolvements","name":"SI","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Hitouts","name":"Hit Outs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"}],"defaultSortDesc":true,"defaultSorted":[{"id":"RatingPoints","desc":true}],"defaultPageSize":50,"showPageSizeOptions":true,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","rowStyle":"function(rowInfo) { if (rowInfo.values['TimeOnGround'] === 0) { return {color: '#828282'} } }","height":"600px","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"elementId":"match-stats","dataKey":"c76f85b90feb6586227b21eab04b4364"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.rowStyle"],"jsHooks":[]}`;

        data = JSON.parse(data);

        for (col of data.x.tag.attribs.columns) {
            columns.push(col.id);
        }

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                res = JSON.parse(this.responseText);

                if (res) {
                    round_data = res;
                    if (matchId) {
                        match_number = round_data.Matches[0].MatchId.indexOf(matchId.toString());
                    }
                    if (match_number < 0 && round_data.Matches[0].MatchId.length === 1) {
                        match_number = 0;
                        matchId = round_data.Matches[0].MatchId[match_number];
                        //history.replaceState(null, '', `afl_match_stats.html?ID=${matchId}`);
                    }
                }

                if (round_data) {
                    reactableData = JSON.parse(JSON.stringify(round_data.Data[0]));

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
                        // if (matchId) {
                        //     Reactable.setFilter('match-stats', 'MatchId', matchId);
                        // }
                        Reactable.setHiddenColumns("match-stats", prevColumns => { return prevColumns.concat(columnsMissing) });
                    });

                    data.x.tag.attribs.data = reactableData;

                    let div = document.querySelector("#react-div");

                    const s = document.createElement('script');
                    s.setAttribute('type', 'application/json');
                    s.setAttribute('data-for', 'htmlwidget-stats');
                    s.innerText = JSON.stringify(data);

                    div.append(s);

                    h2.innerText = `Round ${round_data.Summary[0].RoundNumber}, ${round_data.Summary[0].Season}`;

                    const matches = round_data.Matches[0];

                    if (typeof matches.MatchId === "string") {
                        for (key of Object.keys(matches)) {
                            matches[key] = [matches[key]];
                        }
                    }

                    if (matches.MatchId.length > 1) {
                        const button = document.createElement('button');
                        button.id = "match-All";
                        button.type = "button";
                        button.classList = "btn btm-sm mx-1 my-2";
                        button.innerText = "All matches";
                        if (matchId) {
                            button.classList.add("btn-light");
                        } else {
                            button.classList.add("btn-primary");
                        }
                        matchList.appendChild(button);
                        matchButtons.push(button);

                        button.addEventListener('click', (e) => {
                            matchId = null;
                            match_number = -1;
                            loadMatch();
                            Reactable.setFilter('match-stats', 'MatchId', undefined);
                            history.replaceState(null, '', `afl_match_stats.html?ID=${roundId}`);

                            for (btn of matchButtons) {
                                if (btn.id === `match-${matchId}` || (!matchId && btn.id === "match-All")) {
                                    btn.classList.add("btn-primary");
                                    btn.classList.remove("btn-light");
                                } else {
                                    btn.classList.add("btn-light");
                                    btn.classList.remove("btn-primary");
                                }
                            }
                        });
                    }

                    for (let i = 0; i < matches.MatchId.length; i++) {
                        // const li = document.createElement('li');
                        // li.innerHTML = `<a href="afl_match_stats.html?ID=${matches.MatchId[i]}">${matches.HomeAbbreviation[i]} v ${matches.AwayAbbreviation[i]}`
                        // if (matches.MatchId[i] === matchId) {
                        //     li.classList = "active";
                        // }
                        // matchList.appendChild(li);

                        const button = document.createElement('button');
                        button.id = `match-${matches.MatchId[i]}`;
                        button.type = "button";
                        button.classList = "btn btm-sm mx-1 my-2";
                        button.innerText = `${matches.HomeAbbreviation[i]} v ${matches.AwayAbbreviation[i]}`;
                        if (matches.MatchId[i] === matchId) {
                            button.classList.add("btn-primary");
                        } else {
                            button.classList.add("btn-light");
                        }
                        matchList.appendChild(button);
                        matchButtons.push(button);

                        button.addEventListener('click', (e) => {
                            matchId = matches.MatchId[i];
                            match_number = round_data.Matches[0].MatchId.indexOf(matchId.toString());
                            loadMatch();
                            Reactable.setFilter('match-stats', 'MatchId', matchId);
                            //history.replaceState(null, '', `afl_match_stats.html?ID=${matchId}`);

                            for (btn of matchButtons) {
                                if (btn.id === `match-${matchId}`) {
                                    btn.classList.add("btn-primary");
                                    btn.classList.remove("btn-light");
                                } else {
                                    btn.classList.add("btn-light");
                                    btn.classList.remove("btn-primary");
                                }
                            }
                        });

                    }

                    loadMatch();
                } else {
                    roundDiv.style.display = "none";
                }
            } else if (this.readyState == 4) {
                roundDiv.style.display = "none";
            }
        };

        xmlhttp.open("GET", url, false);
        xmlhttp.send();
    } else {
        roundDiv.style.display = "none";
    }
} else {
    roundDiv.style.display = "none";
}