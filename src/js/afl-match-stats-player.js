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

const columns = [];
const columnsMissing = [];
const seasonButtons = [];

// const playerDisplay = function (cellInfo) {
//     return `<img src='${cellInfo.row['Image']}' height='15px' width='15px' alt=''> <a href='afl_player_profile.html?ID=${cellInfo.row['WebsiteId']}'>${cellInfo.row['Player']}</a>`
// }

// const teamDisplay = function (cellInfo) {
//     return `<img src='${cellInfo.row['Image']}' height='15px' width='15px' alt=''> ${cellInfo.row['Abbreviation']}`
// }

const noValidPlayer = function () {
    h1.innerText = 'Player Match Stats';
    playerDiv.style.display = "none";
}

if (player) {
    const xmlhttp = new XMLHttpRequest();
    const url = `https://www.wheeloratings.com/src/match_stats_player/table_data/${player.slice(-2)}.json`;

    let data = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"MatchId","name":"MatchId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Player","name":"Player","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":180,"align":"left","defaultSortDesc":false,"cell":"function(cellInfo) { return playerDisplay(cellInfo) }","html":true,"className":"sticky","headerClassName":"sticky"},{"id":"WebsiteId","name":"WebsiteId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Team","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Abbreviation","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","defaultSortDesc":false},{"id":"Image","name":"Image","type":["glue","character"],"sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"EstimatedRating","name":"Est. Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center"},{"id":"DreamTeamPoints","name":"Fantasy Points","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center"},{"id":"ExpVotes","name":"Exp. Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":2},"aggregated":{"digits":2}},"minWidth":50,"align":"center"},{"id":"Votes3","name":"% 3 Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Votes2","name":"% 2 Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Votes1","name":"% 1 Vote","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"TimeOnGround","name":"TOG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"CentreBounceAttendancePercentage","name":"CBA %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ScoreInvolvements","name":"SI","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Hitouts","name":"Hit Outs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"}],"defaultSortDesc":true,"defaultSorted":[{"id":"RatingPoints","desc":true}],"defaultPageSize":50,"showPageSizeOptions":true,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","rowStyle":"function(rowInfo) { if (rowInfo.values['TimeOnGround'] === 0) { return {color: '#828282'} } }","height":"600px","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"elementId":"match-stats","dataKey":"f8c851c0e4434a6fe61e9b2484e6b1bb"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.columns.1.cell","tag.attribs.rowStyle"],"jsHooks":[]}`;

    data = JSON.parse(data);

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            res = JSON.parse(this.responseText);

            if (res[player]) {
                player_data = {};
                player_data[player] = res[player];
            }

            if (player_data) {
                data.x.tag.attribs.data = player_data[player].Data;

                h1.innerText = `Player Profile - ${player_data[player].Summary.Player}`;
                document.title = `AFL Player Profile - ${player_data[player].Summary.Player}`;

                let div = document.querySelector("#react-div");

                const s = document.createElement('script');
                s.setAttribute('type', 'application/json');
                s.setAttribute('data-for', 'htmlwidget-stats');
                s.innerText = JSON.stringify(data);

                div.append(s);

                div = document.querySelector("#summary-div");

                const tbl = document.createElement("table");
                tbl.id = "summary-table";
                tbl.classList = "table table-condensed table-sm table-hover table-auto"
                div.appendChild(tbl);
                const tbody = tbl.createTBody();

                let row = tbody.insertRow();
                let cell = row.insertCell();
                cell.classList = "fw-bold";
                cell.innerText = "Player";

                cell = row.insertCell();
                cell.innerText = player_data[player].Summary.Player;

                row = tbody.insertRow();
                cell = row.insertCell();
                cell.classList = "fw-bold";
                cell.innerText = "Debut";

                cell = row.insertCell();
                cell.innerHTML = `${player_data[player].Summary.DebutSeason} v ${player_data[player].Summary.DebutOpposition}`;

                if (parseInt(player_data[player].Summary.DebutMatchId)) {
                    cell.innerHTML += ` (<a href='afl_match_stats.html?ID=${parseInt(player_data[player].Summary.DebutMatchId)}'>Match stats</a>)`;
                }

                row = tbody.insertRow();
                cell = row.insertCell();
                cell.classList = "fw-bold";
                cell.innerText = "Last Match";

                cell = row.insertCell();
                cell.innerHTML = `${player_data[player].Summary.LastMatchSeason} v ${player_data[player].Summary.LastMatchOpposition}`;

                if (parseInt(player_data[player].Summary.LastMatchId)) {
                    cell.innerHTML += ` (<a href='afl_match_stats.html?ID=${parseInt(player_data[player].Summary.LastMatchId)}'>Match stats</a>)`;
                }

                row = tbody.insertRow();
                cell = row.insertCell();
                cell.classList = "fw-bold";
                cell.innerText = "Career Matches";

                cell = row.insertCell();
                cell.innerText = `${player_data[player].Data.Matches.slice(-1)}`;

                row = tbody.insertRow();
                cell = row.insertCell();
                cell.classList = "fw-bold";
                cell.innerText = "Career Goals";

                cell = row.insertCell();
                cell.innerText = `${player_data[player].Data.Goals_Total.slice(-1)}`;
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



if (validYears.includes(seasonId)) {
    fetch(`https://www.wheeloratings.com/src/match_stats/table_data/${seasonId}.json`)
        .then((res) => res.json())
        .then((data) => {
            if (typeof data.RoundId === "string") {
                for (key of Object.keys(data)) {
                    data[key] = [data[key]];
                }
            }
            if (!roundId && data.RoundId.slice(-1)) {
                window.location.href = `afl_match_stats.html?ID=${data.RoundId.slice(-1)}`;
            } else {
                if (data.RoundId.length > 1) {
                    for (let i = 0; i < data.RoundId.length; i++) {
                        const li = document.createElement('option');
                        li.value = data.RoundId[i];
                        li.innerText = `Round ${data.RoundNumber[i]}`;
                        if (data.RoundId[i] === roundId) {
                            li.selected = true;
                        }
                        roundList.appendChild(li);
                    }

                    document.querySelector("#round-select-div").classList.remove("d-none");

                    if (roundList.selectedIndex > 0) {
                        document.querySelector("#first-round-button").classList.remove("disabled");
                        document.querySelector("#previous-round-button").classList.remove("disabled");
                    }
                    if (roundList.selectedIndex < (roundList.length - 1)) {
                        document.querySelector("#next-round-button").classList.remove("disabled");
                        document.querySelector("#last-round-button").classList.remove("disabled");
                    }

                    document.querySelector("#first-round-button").addEventListener('click', (e) => {
                        roundList.selectedIndex = 0;
                        goToRound();
                    });
                    document.querySelector("#previous-round-button").addEventListener('click', (e) => {
                        roundList.selectedIndex -= 1;
                        goToRound();
                    });
                    document.querySelector("#next-round-button").addEventListener('click', (e) => {
                        roundList.selectedIndex += 1;
                        goToRound();
                    });
                    document.querySelector("#last-round-button").addEventListener('click', (e) => {
                        roundList.selectedIndex = roundList.length - 1;
                        goToRound();
                    });

                    roundList.addEventListener('change', (e) => {
                        goToRound();
                    })
                }
            }
        });

    document.querySelector(`#year-${seasonId}`).classList = "active";

    if (roundId) {
        const xmlhttp = new XMLHttpRequest();
        const url = `https://www.wheeloratings.com/src/match_stats/table_data/${roundId}.json`;

        //let data = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"MatchId","name":"MatchId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Player","name":"Player","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":180,"align":"left","defaultSortDesc":false,"cell":[],"html":true,"className":"sticky","headerClassName":"sticky"},{"id":"PlayerDisplay","name":"PlayerDisplay","type":["glue","character"],"sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"WebsiteId","name":"WebsiteId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Abbreviation","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","defaultSortDesc":false,"className":"sticky","style":{"left":150},"headerClassName":"sticky","headerStyle":{"left":150}},{"id":"Image","name":"Image","type":["glue","character"],"sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center"},{"id":"DreamTeamPoints","name":"Fantasy Points","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center"},{"id":"TimeOnGround","name":"TOG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ScoreInvolvements","name":"SI","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Hitouts","name":"Hit Outs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"}],"defaultSortDesc":true,"defaultSorted":[{"id":"RatingPoints","desc":true}],"defaultPageSize":50,"showPageSizeOptions":true,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","rowStyle":"function(rowInfo) { if (rowInfo.values['TimeOnGround'] === 0) { return {color: '#828282'} } }","height":"600px","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"elementId":"match-stats","dataKey":"31ceac9b43cef13252eb0342ba9b1e3d"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.rowStyle"],"jsHooks":[]}`;
        //let data = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"MatchId","name":"MatchId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Player","name":"Player","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":180,"align":"left","defaultSortDesc":false,"cell":"function(cellInfo) { return cellInfo.row['PlayerDisplay'] || '' }","html":true,"className":"sticky","headerClassName":"sticky"},{"id":"PlayerDisplay","name":"PlayerDisplay","type":["glue","character"],"sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"WebsiteId","name":"WebsiteId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Abbreviation","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","defaultSortDesc":false},{"id":"Image","name":"Image","type":["glue","character"],"sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center"},{"id":"DreamTeamPoints","name":"Fantasy Points","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center"},{"id":"TimeOnGround","name":"TOG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ScoreInvolvements","name":"SI","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Hitouts","name":"Hit Outs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"}],"defaultSortDesc":true,"defaultSorted":[{"id":"RatingPoints","desc":true}],"defaultPageSize":50,"showPageSizeOptions":true,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","rowStyle":"function(rowInfo) { if (rowInfo.values['TimeOnGround'] === 0) { return {color: '#828282'} } }","height":"600px","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"elementId":"match-stats","dataKey":"59ae9a840746c578127bf34a367ee0b6"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.columns.1.cell","tag.attribs.rowStyle"],"jsHooks":[]}`;
        let data = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"MatchId","name":"MatchId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Player","name":"Player","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":180,"align":"left","defaultSortDesc":false,"cell":"function(cellInfo) { return playerDisplay(cellInfo) }","html":true,"className":"sticky","headerClassName":"sticky"},{"id":"WebsiteId","name":"WebsiteId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Team","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Abbreviation","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","defaultSortDesc":false},{"id":"Image","name":"Image","type":["glue","character"],"sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"EstimatedRating","name":"Est. Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center"},{"id":"DreamTeamPoints","name":"Fantasy Points","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center"},{"id":"ExpVotes","name":"Exp. Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":2},"aggregated":{"digits":2}},"minWidth":50,"align":"center"},{"id":"Votes3","name":"% 3 Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Votes2","name":"% 2 Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Votes1","name":"% 1 Vote","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"TimeOnGround","name":"TOG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"CentreBounceAttendancePercentage","name":"CBA %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ScoreInvolvements","name":"SI","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Hitouts","name":"Hit Outs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"}],"defaultSortDesc":true,"defaultSorted":[{"id":"RatingPoints","desc":true}],"defaultPageSize":50,"showPageSizeOptions":true,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","rowStyle":"function(rowInfo) { if (rowInfo.values['TimeOnGround'] === 0) { return {color: '#828282'} } }","height":"600px","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"elementId":"match-stats","dataKey":"f8c851c0e4434a6fe61e9b2484e6b1bb"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.columns.1.cell","tag.attribs.rowStyle"],"jsHooks":[]}`;
        let dataTeam = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"RoundId","name":"RoundId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"MatchId","name":"MatchId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Team","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":180,"align":"left","defaultSortDesc":false},{"id":"Abbreviation","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"left","defaultSortDesc":false,"cell":"function(cellInfo) { return teamDisplay(cellInfo) }","html":true,"className":"sticky","headerClassName":"sticky"},{"id":"Image","name":"Image","type":["glue","character"],"sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center"},{"id":"DreamTeamPoints","name":"Fantasy Points","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"ScoreInvolvements","name":"ScoreInvolvements","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"Hitouts","name":"Hit Outs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"}],"defaultSortDesc":true,"defaultSorted":[{"id":"RatingPoints","desc":true}],"defaultPageSize":50,"showPageSizeOptions":false,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"elementId":"match-stats-team","dataKey":"a4152be744d06e11eaa5d2b1bbd7c78b"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.columns.3.cell"],"jsHooks":[]}`;

        data = JSON.parse(data);
        dataTeam = JSON.parse(dataTeam);

        for (col of data.x.tag.attribs.columns) {
            columns.push(col.id);
        }
        for (col of dataTeam.x.tag.attribs.columns) {
            columnsTeam.push(col.id);
        }

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                res = JSON.parse(this.responseText);

                if (res) {
                    round_data = res;

                    const matches = round_data.Matches[0];

                    if (typeof matches.MatchId === "string") {
                        for (key of Object.keys(matches)) {
                            matches[key] = [matches[key]];
                        }
                    }

                    if (matchId) {
                        match_number = matches.MatchId.indexOf(matchId);
                    } else {
                        match_number = -1;
                    }
                    if (match_number < 0 && matches.MatchId.length === 1) {
                        match_number = 0;
                        matchId = matches.MatchId[match_number];
                        history.replaceState(null, '', `afl_match_stats.html?ID=${matchId}`);
                    }

                    reactableData = JSON.parse(JSON.stringify(round_data.Data[0]));
                    reactableDataTeam = JSON.parse(JSON.stringify(round_data.TeamData[0]));

                    // Remove columns from data if column isn't defined in Reactable
                    for (col of Object.keys(reactableData)) {
                        if (!columns.includes(col)) {
                            delete reactableData[col];
                        }
                    }
                    for (col of Object.keys(reactableDataTeam)) {
                        if (!columnsTeam.includes(col)) {
                            delete reactableDataTeam[col];
                        }
                    }

                    // Hide columns in Reactable if no player data exists
                    for (col of columns) {
                        if (!Object.keys(reactableData).includes(col)) {
                            columnsMissing.push(col);
                        }
                    }
                    for (col of columnsTeam) {
                        if (!Object.keys(reactableDataTeam).includes(col)) {
                            columnsTeamMissing.push(col);
                        }
                    }

                    addEventListener('DOMContentLoaded', (event) => {
                        if (matchId) {
                            Reactable.setFilter('match-stats', 'MatchId', matchId);
                            Reactable.setFilter('match-stats-team', 'MatchId', matchId);
                        }
                        Reactable.setHiddenColumns("match-stats", prevColumns => { return prevColumns.concat(columnsMissing) });
                        Reactable.setHiddenColumns("match-stats-team", prevColumns => { return prevColumns.concat(columnsTeamMissing) });
                    });

                    data.x.tag.attribs.data = reactableData;
                    dataTeam.x.tag.attribs.data = reactableDataTeam;
                    //data.x.tag.attribs.columns.find(element => element.id === "Player").cell = reactableData.PlayerDisplay;

                    let div = document.querySelector("#react-div");

                    let s = document.createElement('script');
                    s.setAttribute('type', 'application/json');
                    s.setAttribute('data-for', 'htmlwidget-stats');
                    s.innerText = JSON.stringify(data);

                    div.append(s);

                    div = document.querySelector("#react-div-team");

                    s = document.createElement('script');
                    s.setAttribute('type', 'application/json');
                    s.setAttribute('data-for', 'htmlwidget-stats-team');
                    s.innerText = JSON.stringify(dataTeam);

                    div.append(s);

                    h2.innerText = `Round ${round_data.Summary[0].RoundNumber}, ${round_data.Summary[0].Season}`;

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
                            Reactable.setFilter('match-stats-team', 'MatchId', undefined);
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
                            match_number = round_data.Matches[0].MatchId.indexOf(matchId);
                            loadMatch();
                            Reactable.setFilter('match-stats', 'MatchId', undefined);
                            Reactable.setFilter('match-stats', 'MatchId', matchId);
                            Reactable.setFilter('match-stats-team', 'MatchId', undefined);
                            Reactable.setFilter('match-stats-team', 'MatchId', matchId);
                            history.replaceState(null, '', `afl_match_stats.html?ID=${matchId}`);

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
                    roundDiv.classList.add("d-none");
                }
            } else if (this.readyState == 4) {
                roundDiv.classList.add("d-none");
            }
        };

        xmlhttp.open("GET", url, false);
        xmlhttp.send();
    } else {
        roundDiv.classList.add("d-none");
    }
} else {
    seasonDiv.classList.add("d-none");
}

const columnsAlwaysDisplayed = ["MatchId", "Player", "Team"];
const statsColumns = ["CoachesVotes", "RatingPoints", "EstimatedRating", "Supercoach", "DreamTeamPoints", "ExpVotes", "Votes3", "Votes2", "Votes1", "TimeOnGround", "Kicks", "Handballs", "Disposals", "DisposalEfficiency", "MetresGained", "Inside50s", "ContestedPossessions", "CentreBounceAttendancePercentage", "TotalClearances", "Marks", "ContestedMarks", "ShotsAtGoal", "Goals", "Behinds", "GoalAssists", "ScoreInvolvements", "Tackles", "Hitouts"];

const csvDownloadButton = document.querySelector('#download-csv-button');
csvDownloadButton.addEventListener('click', (e) => {
    let matchString;
    if (match_number >= 0) {
        matchString = `${round_data.Matches[0].HomeAbbreviation[match_number]}v${round_data.Matches[0].AwayAbbreviation[match_number]}`;
    } else {
        matchString = "All";
    }

    Reactable.downloadDataCSV('match-stats', `afl-match-stats-${round_data.Summary[0].Season}-Round${round_data.Summary[0].RoundNumber}-${matchString}.csv`, { columnIds: [...new Set([...columnsAlwaysDisplayed, ...statsColumns])] });
    gtag('event', 'data_download');
});