let matchId;
let roundId;
let seasonId;
let roundName;

const urlParams = new URLSearchParams(location.search);
let paramId = urlParams.get("id");
if (!paramId) paramId = urlParams.get("ID");

if (paramId) {
    if (paramId.length === 8) {
        matchId = parseInt(paramId).toString();
    }
    if (paramId.length >= 6) {
        roundId = parseInt(paramId.slice(0, 6)).toString();
    }
    if (paramId.length >= 4) {
        seasonId = parseInt(paramId.slice(0, 4));
    }
}
if (!seasonId) {
    seasonId = Math.max(...validYears);
}

const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const roundList = document.querySelector("#round-list");
const matchList = document.querySelector("#match-list");
const matchBanner = document.querySelector("#match-banner");
const seasonDiv = document.querySelector("#season-div");
const roundDiv = document.querySelector("#round-div");
const statsDiv = document.querySelector("#stats-div");

let season_data = "";
let round_data = "";
let match_number;
let reactableData;

const columns = [];
const columnsMissing = [];
const columnsTeam = [];
const columnsTeamMissing = [];
const matchButtons = [];

const playerDisplay = function (cellInfo) {
    return `<img src='${cellInfo.row['Image']}' height='15px' width='15px' alt=''> <a href='afl_player_profile.html?id=${cellInfo.row['WebsiteId']}'>${cellInfo.row['Player']}</a>`
}

const teamDisplay = function (cellInfo) {
    return `<img src='${cellInfo.row['Image']}' height='15px' width='15px' alt=''> ${cellInfo.row['Abbreviation']}`
}

const scoreDisplay = function (cellInfo, goalsField, behindsField, scoreField) {
    return (typeof cellInfo.row[goalsField] === 'number' ? `${cellInfo.row[goalsField]}.${cellInfo.row[behindsField]}.${cellInfo.row[scoreField]}` : null)
}

const loadMatch = function () {
    if (match_number >= 0) {
        matchBanner.innerHTML = `<img src="${round_data.Matches[0].HomeImage[match_number]}" height="40px" alt=""> ${round_data.Matches[0].HomeTeam[match_number]} v ${round_data.Matches[0].AwayTeam[match_number]} <img src="${round_data.Matches[0].AwayImage[match_number]}" height="40px" alt="">`;
        document.title = `AFL Match Stats - ${round_data.Summary[0].Season}, ${roundName} - ${round_data.Matches[0].HomeTeam[match_number]} v ${round_data.Matches[0].AwayTeam[match_number]}`;
    } else {
        matchBanner.innerHTML = `All ${roundName} Matches`;
        document.title = `AFL Match Stats - ${round_data.Summary[0].Season}, ${roundName}`;
    }
}

const goToRound = () => { window.location.href = `afl_match_stats.html?id=${roundList.value}` };

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
                window.location.href = `afl_match_stats.html?id=${data.RoundId.slice(-1)}`;
            } else {
                if (data.RoundId.length > 1) {
                    for (let i = 0; i < data.RoundId.length; i++) {
                        const li = document.createElement('option');
                        li.value = data.RoundId[i];
                        if (Object.keys(data).includes("RoundName"))
                            li.innerText = data.RoundName[i];
                        else
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

        let data = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"MatchId","name":"MatchId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Player","name":"Player","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":180,"align":"left","defaultSortDesc":false,"cell":"function(cellInfo) { return playerDisplay(cellInfo) }","html":true,"className":"sticky","headerClassName":"sticky"},{"id":"WebsiteId","name":"WebsiteId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Team","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Abbreviation","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","defaultSortDesc":false},{"id":"Image","name":"Image","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center","className":"colClass"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center","className":"colClass"},{"id":"EstimatedRating","name":"Pred. Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center","className":"colClass"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"DreamTeamPoints","name":"Fantasy Points","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center","className":"colClass"},{"id":"ExpVotes","name":"Exp. Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":2},"aggregated":{"digits":2}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Votes3","name":"% 3 Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Votes2","name":"% 2 Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Votes1","name":"% 1 Vote","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"TimeOnGround","name":"TOG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"GroundBallGets","name":"GB Gets","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PostClearanceContestedPossessions","name":"Post Cl CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"PostClearanceGroundBallGets","name":"Post Cl GBG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"HandballReceives","name":"HB Rec","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Intercepts","name":"Int","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"CentreBounceAttendancePercentage","name":"CBA %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"InterceptMarks","name":"Int Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"xScore","name":"xSc","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":40,"align":"center","className":"colClass"},{"id":"xScoreRating","name":"xSc +/-","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":40,"align":"center","className":"colClass"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ScoreInvolvements","name":"SI","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ScoreLaunches","name":"Launch","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center","className":"colClass"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PressureActs","name":"Pr. Acts","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Hitouts","name":"Hit Outs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"}],"defaultSortDesc":true,"defaultSorted":[{"id":"RatingPoints","desc":true}],"defaultPageSize":50,"showPageSizeOptions":true,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","rowStyle":"function(rowInfo) { if (rowInfo && rowInfo.values['TimeOnGround'] === 0) { return {color: '#828282'} } }","height":"600px","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"elementId":"match-stats","dataKey":"c6350ecd44b56870607314e74feec8db"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.columns.1.cell","tag.attribs.columns.6.className","tag.attribs.columns.7.className","tag.attribs.columns.8.className","tag.attribs.columns.9.className","tag.attribs.columns.10.className","tag.attribs.columns.11.className","tag.attribs.columns.12.className","tag.attribs.columns.13.className","tag.attribs.columns.14.className","tag.attribs.columns.15.className","tag.attribs.columns.16.className","tag.attribs.columns.17.className","tag.attribs.columns.18.className","tag.attribs.columns.19.className","tag.attribs.columns.20.className","tag.attribs.columns.21.className","tag.attribs.columns.22.className","tag.attribs.columns.23.className","tag.attribs.columns.24.className","tag.attribs.columns.25.className","tag.attribs.columns.26.className","tag.attribs.columns.27.className","tag.attribs.columns.28.className","tag.attribs.columns.29.className","tag.attribs.columns.30.className","tag.attribs.columns.31.className","tag.attribs.columns.32.className","tag.attribs.columns.33.className","tag.attribs.columns.34.className","tag.attribs.columns.35.className","tag.attribs.columns.36.className","tag.attribs.columns.37.className","tag.attribs.columns.38.className","tag.attribs.columns.39.className","tag.attribs.columns.40.className","tag.attribs.columns.41.className","tag.attribs.columns.42.className","tag.attribs.columns.43.className","tag.attribs.rowStyle"],"jsHooks":[]}`;
        let dataTeam = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"RoundId","name":"RoundId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"MatchId","name":"MatchId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Team","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":180,"align":"left","defaultSortDesc":false},{"id":"Abbreviation","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"left","defaultSortDesc":false,"cell":"function(cellInfo) { return teamDisplay(cellInfo) }","html":true,"className":"sticky","headerClassName":"sticky"},{"id":"Image","name":"Image","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Age","name":"Age","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Experience","name":"Exp.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center","className":"colClass"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center","className":"colClass"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"DreamTeamPoints","name":"Fantasy Points","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center","className":"colClass"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ForwardHalf","name":"Fwd Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"GroundBallGets","name":"GB Gets","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PostClearanceContestedPossessions","name":"Post Cl CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"PostClearanceGroundBallGets","name":"Post Cl GBG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"Intercepts","name":"Int","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"FirstPossessions","name":"1st Poss","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"FirstPossessionToClearance","name":"1st Poss to Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":65,"align":"center","className":"colClass"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"InterceptMarks","name":"Int Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Score","name":"Score","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"xScore","name":"xSc","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"xScoreRating","name":"xSc +/-","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"xWins","name":"xWin %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Hitouts","name":"Hit Outs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ChainToScore","name":"Chain to Sc.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":55,"align":"center","className":"colClass"},{"id":"D50ToF50","name":"D50 to F50","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":50,"align":"center","className":"colClass"},{"id":"D50ToScore","name":"D50 to Sc.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":50,"align":"center","className":"colClass"},{"id":"DefHalfToF50","name":"Def Half to F50","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":65,"align":"center","className":"colClass"},{"id":"DefHalfToScore","name":"Def Half to Sc.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":65,"align":"center","className":"colClass"},{"id":"GoalsFromKickIn","name":"GoalsFromKickIn","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromKickIn","name":"BehindsFromKickIn","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromKickIn","name":"Kick In","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromKickIn', 'BehindsFromKickIn', 'PointsFromKickIn') }","html":true,"className":"colClass"},{"id":"GoalsFromStoppage","name":"GoalsFromStoppage","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromStoppage","name":"BehindsFromStoppage","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromStoppage","name":"Stoppage","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":75,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromStoppage', 'BehindsFromStoppage', 'PointsFromStoppage') }","html":true,"className":"colClass"},{"id":"GoalsFromTurnover","name":"GoalsFromTurnover","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromTurnover","name":"BehindsFromTurnover","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromTurnover","name":"Turnover","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":75,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromTurnover', 'BehindsFromTurnover', 'PointsFromTurnover') }","html":true,"className":"colClass"},{"id":"GoalsFromDefensiveHalf","name":"GoalsFromDefensiveHalf","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromDefensiveHalf","name":"BehindsFromDefensiveHalf","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromDefensiveHalf","name":"Def Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":70,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromDefensiveHalf', 'BehindsFromDefensiveHalf', 'PointsFromDefensiveHalf') }","html":true,"className":"colClass"},{"id":"GoalsFromForwardHalf","name":"GoalsFromForwardHalf","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromForwardHalf","name":"BehindsFromForwardHalf","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromForwardHalf","name":"Forward Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":70,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromForwardHalf', 'BehindsFromForwardHalf', 'PointsFromForwardHalf') }","html":true,"className":"colClass"},{"id":"GoalsFromCentreBounce","name":"GoalsFromCentreBounce","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromCentreBounce","name":"BehindsFromCentreBounce","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromCentreBounce","name":"Centre Bounce","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":70,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromCentreBounce', 'BehindsFromCentreBounce', 'PointsFromCentreBounce') }","html":true,"className":"colClass"}],"columnGroups":[{"name":"Transition","columns":["ChainToScore","D50ToF50","D50ToScore","DefHalfToF50","DefHalfToScore"]},{"name":"Score sources","columns":["GoalsFromKickIn","BehindsFromKickIn","PointsFromKickIn","GoalsFromStoppage","BehindsFromStoppage","PointsFromStoppage","GoalsFromTurnover","BehindsFromTurnover","PointsFromTurnover"]},{"name":"Score origin","columns":["GoalsFromDefensiveHalf","BehindsFromDefensiveHalf","PointsFromDefensiveHalf","GoalsFromForwardHalf","BehindsFromForwardHalf","PointsFromForwardHalf","GoalsFromCentreBounce","BehindsFromCentreBounce","PointsFromCentreBounce"]}],"defaultSortDesc":true,"defaultSorted":[{"id":"RatingPoints","desc":true}],"defaultPageSize":50,"showPageSizeOptions":false,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","height":"600px","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"elementId":"match-stats-team","dataKey":"baf3d14521a5aea60f0fbf30327ff5d3"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.columns.3.cell","tag.attribs.columns.5.className","tag.attribs.columns.6.className","tag.attribs.columns.7.className","tag.attribs.columns.8.className","tag.attribs.columns.9.className","tag.attribs.columns.10.className","tag.attribs.columns.11.className","tag.attribs.columns.12.className","tag.attribs.columns.13.className","tag.attribs.columns.14.className","tag.attribs.columns.15.className","tag.attribs.columns.16.className","tag.attribs.columns.17.className","tag.attribs.columns.18.className","tag.attribs.columns.19.className","tag.attribs.columns.20.className","tag.attribs.columns.21.className","tag.attribs.columns.22.className","tag.attribs.columns.23.className","tag.attribs.columns.24.className","tag.attribs.columns.25.className","tag.attribs.columns.26.className","tag.attribs.columns.27.className","tag.attribs.columns.28.className","tag.attribs.columns.29.className","tag.attribs.columns.30.className","tag.attribs.columns.31.className","tag.attribs.columns.32.className","tag.attribs.columns.33.className","tag.attribs.columns.34.className","tag.attribs.columns.35.className","tag.attribs.columns.36.className","tag.attribs.columns.37.className","tag.attribs.columns.38.className","tag.attribs.columns.39.className","tag.attribs.columns.40.className","tag.attribs.columns.41.className","tag.attribs.columns.42.className","tag.attribs.columns.43.className","tag.attribs.columns.46.cell","tag.attribs.columns.46.className","tag.attribs.columns.49.cell","tag.attribs.columns.49.className","tag.attribs.columns.52.cell","tag.attribs.columns.52.className","tag.attribs.columns.55.cell","tag.attribs.columns.55.className","tag.attribs.columns.58.cell","tag.attribs.columns.58.className","tag.attribs.columns.61.cell","tag.attribs.columns.61.className"],"jsHooks":[]}`;

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
                        history.replaceState(null, '', `afl_match_stats.html?id=${matchId}`);
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

                    if (Object.keys(round_data.Summary[0]).includes("RoundName"))
                        roundName = `${round_data.Summary[0].RoundName}`;
                    else
                        roundName = `Round ${round_data.Summary[0].RoundNumber}`;

                    h2.innerText = `${roundName}, ${round_data.Summary[0].Season}`;

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
                            history.replaceState(null, '', `afl_match_stats.html?id=${roundId}`);

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
                            history.replaceState(null, '', `afl_match_stats.html?id=${matchId}`);

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
const statsColumns = ["CoachesVotes", "RatingPoints", "EstimatedRating", "Supercoach", "DreamTeamPoints", "ExpVotes", "Votes3", "Votes2", "Votes1", "TimeOnGround", "Kicks", "Handballs", "Disposals", "DisposalEfficiency", "MetresGained", "Inside50s", "ContestedPossessions", "GroundBallGets", "PostClearanceContestedPossessions", "PostClearanceGroundBallGets", "Intercepts", "CentreBounceAttendancePercentage", "TotalClearances", "Marks", "InterceptMarks", "ContestedMarks", "ShotsAtGoal", "Goals", "Behinds", "GoalAssists", "ScoreInvolvements", "Tackles", "PressureActs", "Hitouts"];

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