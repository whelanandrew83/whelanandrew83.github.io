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
const teamstatsDiv = document.querySelector("#single-match-div-team");

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

const teamStatsColumns = {
    "Summary_Heading": { name: "Summary", heading: true },
    "Age": { name: "Average Age", decimals: 1 },
    "Experience": { name: "Average Experience", decimals: 1 },
    "Stats_Heading": { name: "Key Stats", heading: true },
    "CoachesVotes": { name: "Coaches Votes" },
    "RatingPoints": { name: "Player Rating", decimals: 1 },
    "Supercoach": { name: "Supercoach" },
    "DreamTeamPoints": { name: "Fantasy Points" },
    "Kicks": { name: "Kicks" },
    "Handballs": { name: "Handballs" },
    "Disposals": { name: "Disposals" },
    "DisposalEfficiency": { name: "Disposal Efficiency", decimals: 1, percentage: true },
    "MetresGained": { name: "Metres Gained" },
    "KickMetresGained": { name: "Kick Metres Gained" },
    "HandballMetresGained": { name: "Handball Metres Gained" },
    "Inside50s": { name: "Inside 50s" },
    "ForwardHalf": { name: "Time in Forward Half", decimals: 1, percentage: true },
    "Tackles": { name: "Tackles" },
    "Possessions_Heading": { name: "Possessions", heading: true },
    "ContestedPossessions": { name: "Contested Possessions" },
    "GroundBallGets": { name: "Ground Ball Gets" },
    "PostClearanceContestedPossessions": { name: "Post-Clearance CP" },
    "PostClearanceGroundBallGets": { name: "Post-Clearance GBG" },
    "Intercepts": { name: "Intercept Possessions" },
    "Marks": { name: "Marks" },
    "ContestedMarks": { name: "Contested Marks" },
    "InterceptMarks": { name: "Intercept Marks" },
    "Stoppages_Heading": { name: "Stoppages", heading: true },
    "RuckContests": { name: "Ruck Contests" },
    "Hitouts": { name: "Hitouts" },
    "HitoutsToAdvantage": { name: "Hitouts to Advantage" },
    "HitoutToFirstPossession": { name: "Hitout to 1st Poss. %", decimals: 1, percentage: true },
    "FirstPossessions": { name: "1st Possessions" },
    "FirstPossessionToClearance": { name: "1st Poss. To Clearance %", decimals: 1, percentage: true },
    "TotalClearances": { name: "Clearances" },
    "CentreClearances": { name: "Centre Clearances" },
    "Scoring_Heading": { name: "Scoring", heading: true },
    "ShotsAtGoal": { name: "Shots At Goal" },
    "Score": { name: "Score", fields: ["Goals", "Behinds", "Score"], format: "{1}.{2} ({3})" },
    "xScore": { name: "Expected Score", decimals: 1 },
    "xScoreRating": { name: "Expected Score +/-", decimals: 1 },
    "ScoresPerInside50": { name: "Scores / Inside 50", decimals: 1, percentage: true },
    "xWins": { name: "xWin %", decimals: 1, percentage: true },
    "GoalAssists": { name: "Goal Assists" },
    "xChainScore_Heading": { name: "xChainScore", heading: true },
    "xChainScore": { name: "Total", decimals: 1 },
    "xChainScoreFromStoppage": { name: "Stoppage", decimals: 1 },
    "xChainScoreFromTurnover": { name: "Turnover", decimals: 1 },
    "ScoreSource_Heading": { name: "Score Source", heading: true },
    "PointsFromKickIn": { name: "Kick-In", fields: ["GoalsFromKickIn", "BehindsFromKickIn", "PointsFromKickIn"], format: "{1}.{2} ({3})" },
    "PointsFromStoppage": { name: "Stoppage", fields: ["GoalsFromStoppage", "BehindsFromStoppage", "PointsFromStoppage"], format: "{1}.{2} ({3})" },
    "PointsFromTurnover": { name: "Turnover", fields: ["GoalsFromTurnover", "BehindsFromTurnover", "PointsFromTurnover"], format: "{1}.{2} ({3})" },
    "ScoreOrigin_Heading": { name: "Score Origin", heading: true },
    "PointsFromDefensiveHalf": { name: "Defensive Half", fields: ["GoalsFromDefensiveHalf", "BehindsFromDefensiveHalf", "PointsFromDefensiveHalf"], format: "{1}.{2} ({3})" },
    "PointsFromForwardHalf": { name: "Forward Half", fields: ["GoalsFromForwardHalf", "BehindsFromForwardHalf", "PointsFromForwardHalf"], format: "{1}.{2} ({3})" },
    "PointsFromCentreBounce": { name: "Centre Bounce", fields: ["GoalsFromCentreBounce", "BehindsFromCentreBounce", "PointsFromCentreBounce"], format: "{1}.{2} ({3})" },
    "Equity_Heading": { name: "Equity Points", heading: true },
    "Equity_PreClearance": { name: "Pre-Clearance", decimals: 1 },
    "Equity_PostClearance": { name: "Post-Clearance", decimals: 1 },
    "Equity_Possession": { name: "Ball Winning", decimals: 1 },
    "Equity_BallUse": { name: "Ball Use", decimals: 1 },
    "Transition_Heading": { name: "Transition", heading: true },
    "ChainToScore": { name: "Chain to Score %", decimals: 1, percentage: true },
    "D50ToF50": { name: "Def. 50 to F50 %", decimals: 1, percentage: true },
    "D50ToScore": { name: "Def. 50 to Score %", decimals: 1, percentage: true },
    "DefHalfToF50": { name: "Def. Half to F50 %", decimals: 1, percentage: true },
    "DefHalfToScore": { name: "Def. Half to Score %", decimals: 1, percentage: true }
}

const displaySingleMatchTeamStats = function () {
    teamstatsDiv.innerHTML = '';

    const homeTeam = round_data.Matches[0].HomeAbbreviation[match_number];
    const awayTeam = round_data.Matches[0].AwayAbbreviation[match_number];

    const homeTeamIndex = round_data.TeamData[0].MatchId.findIndex((m, i) => m == matchId && round_data.TeamData[0].Abbreviation[i] == homeTeam)
    const awayTeamIndex = round_data.TeamData[0].MatchId.findIndex((m, i) => m == matchId && round_data.TeamData[0].Abbreviation[i] == awayTeam)

    let colNumber = 0;
    let statNumber = 0;
    let previousHeading = false;

    const colDivs = [document.createElement('div'), document.createElement('div')];
    colDivs[0].classList = "col-lg-6 px-3";
    colDivs[1].classList = "col-lg-6 px-3";
    teamstatsDiv.appendChild(colDivs[0]);
    teamstatsDiv.appendChild(colDivs[1]);

    Object.keys(teamStatsColumns).forEach((key) => {
        statNumber += 1;
        if (teamStatsColumns[key].heading && statNumber > (Object.keys(teamStatsColumns).length / 2)) colNumber = 1;

        const rowDiv = document.createElement('div');
        rowDiv.classList = "row";

        const colDivHeading = document.createElement('div');
        colDivHeading.innerText = teamStatsColumns[key].name;

        if (teamStatsColumns[key].heading) {
            previousHeading = true;
            rowDiv.style = "padding: 2px 0; background-color: #ededed;";
            colDivHeading.classList = "col-5 ps-1 fw-bold";

            const colDivHeadingHome = document.createElement('div');
            colDivHeadingHome.classList = "col text-center ps-1 pe-0";
            colDivHeadingHome.innerHTML = `<img src="${round_data.Matches[0].HomeImage[match_number]}" height="18px" alt=""></img>`;

            const colDivHeadingAway = document.createElement('div');
            colDivHeadingAway.classList = "col text-center ps-1 pe-0";
            colDivHeadingAway.innerHTML = `<img src="${round_data.Matches[0].AwayImage[match_number]}" height="18px" alt=""></img>`;

            rowDiv.appendChild(colDivHeading);
            rowDiv.appendChild(colDivHeadingHome);
            rowDiv.appendChild(colDivHeadingAway);
        } else {
            rowDiv.style = "padding: 2px 0 0 0;";
            if (!previousHeading) rowDiv.classList.add("border-top");
            rowDiv.classList.add("hover-row");

            colDivHeading.classList = "col-5 ps-1";

            let decimals = teamStatsColumns[key].decimals ? teamStatsColumns[key].decimals : 0;

            let metric_range = season_data.Metrics ? season_data.Metrics[key] : null;

            const colDivHome = document.createElement('div');
            const colDivHomeText = document.createElement('div');
            const colDivHomeBarContainer = document.createElement('div');
            const colDivHomeBarPadding = document.createElement('div');
            const colDivHomeBar = document.createElement('div');

            const colDivAway = document.createElement('div');
            const colDivAwayText = document.createElement('div');
            const colDivAwayBarContainer = document.createElement('div');
            const colDivAwayBarPadding = document.createElement('div');
            const colDivAwayBar = document.createElement('div');

            colDivHome.classList = "col stat d-block ps-1 pe-0";
            colDivAway.classList = "col stat d-block ps-1 pe-0";

            // Home team
            let labelHome;
            let valueHome = parseFloat(round_data.TeamData[0][key][homeTeamIndex]);

            if (teamStatsColumns[key].fields) {
                labelHome = teamStatsColumns[key].format;
                teamStatsColumns[key].fields.forEach((field, index) => {
                    value = round_data.TeamData[0][field][homeTeamIndex];
                    labelHome = isNaN(parseFloat(value)) ? '' : labelHome.replace(`{${index + 1}}`, value);
                })
            } else {
                labelHome = isNaN(valueHome) ? "" : valueHome.toFixed(decimals);
                if (teamStatsColumns[key].percentage && labelHome) labelHome = `${labelHome}%`;
            }

            colDivHomeText.innerText = labelHome;

            // Away team
            let labelAway;
            let valueAway = parseFloat(round_data.TeamData[0][key][awayTeamIndex]);

            if (teamStatsColumns[key].fields) {
                labelAway = teamStatsColumns[key].format;
                teamStatsColumns[key].fields.forEach((field, index) => {
                    value = round_data.TeamData[0][field][awayTeamIndex];
                    labelAway = isNaN(parseFloat(value)) ? '' : labelAway.replace(`{${index + 1}}`, value);
                })

            } else {
                labelAway = isNaN(valueAway) ? "" : valueAway.toFixed(decimals);
                if (teamStatsColumns[key].percentage && labelAway) labelAway = `${labelAway}%`;
            }

            colDivAwayText.innerText = labelAway;

            if (metric_range && metric_range.length === 2) {
                let relativeValueHome = (valueHome - metric_range[0]) / metric_range[1];
                Math.abs(relativeValueHome) > 1 ? relativeValueHome = 1 * Math.sign(relativeValueHome) : relativeValueHome;
                let relativeValueAway = (valueAway - metric_range[0]) / metric_range[1];
                Math.abs(relativeValueAway) > 1 ? relativeValueAway = 1 * Math.sign(relativeValueAway) : relativeValueAway;

                const colorHome = relativeValueHome > relativeValueAway ? `hsl(279 80% ${relativeValueHome >= 0 ? 62 : 75}%)` : `hsl(0 0% ${relativeValueHome >= 0 ? 70 : 85}%)`;
                const colorAway = relativeValueAway > relativeValueHome ? `hsl(36 80% ${relativeValueAway >= 0 ? 62 : 75}%)` : `hsl(0 0% ${relativeValueAway >= 0 ? 70 : 85}%)`;

                colDivHomeBarPadding.style = `width: ${(relativeValueHome >= 0 ? 1 : 1 + relativeValueHome) * 49}%; height: 5px; float: left; background-color: hsl(0 0% 100% 100% );`;
                colDivHomeBar.style = `width: ${Math.abs(relativeValueHome) * 49}%; height: 5px; float: left; background-color: ${colorHome}; border-radius: ${relativeValueHome < 0 ? '2.5px 0px 0px 2.5px' : '0px 2.5px 2.5px 0px'};`;
                colDivAwayBarPadding.style = `width: ${(relativeValueAway >= 0 ? 1 : 1 + relativeValueAway) * 49}%; height: 5px; float: left; background-color: hsl(0 0% 100% 100% );`;
                colDivAwayBar.style = `width: ${Math.abs(relativeValueAway) * 49}%; height: 5px; float: left; background-color: ${colorAway}; border-radius: ${relativeValueAway < 0 ? '2.5px 0px 0px 2.5px' : '0px 2.5px 2.5px 0px'};`;

                colDivHomeBarContainer.appendChild(colDivHomeBarPadding);
                colDivHomeBarContainer.appendChild(colDivHomeBar);

                colDivAwayBarContainer.appendChild(colDivAwayBarPadding);
                colDivAwayBarContainer.appendChild(colDivAwayBar);
            } else {
                colDivHomeBarPadding.style = `width: 100%; height: 5px; float: left; background-color: hsl(0 0% 100% 100% );`;
                colDivAwayBarPadding.style = `width: 100%; height: 5px; float: left; background-color: hsl(0 0% 100% 100% );`;

                colDivHomeBarContainer.appendChild(colDivHomeBarPadding);
                colDivAwayBarContainer.appendChild(colDivAwayBarPadding);
            }

            if (valueHome > valueAway) colDivHome.classList.add("fw-bold");
            if (valueAway > valueHome) colDivAway.classList.add("fw-bold");

            colDivHome.appendChild(colDivHomeText);
            colDivHome.appendChild(colDivHomeBarContainer);
            colDivAway.appendChild(colDivAwayText);
            colDivAway.appendChild(colDivAwayBarContainer);

            rowDiv.appendChild(colDivHeading);
            rowDiv.appendChild(colDivHome);
            rowDiv.appendChild(colDivAway);

            previousHeading = false;
        }

        colDivs[colNumber].appendChild(rowDiv);
    });
}

const loadMatch = function () {
    if (match_number >= 0) {
        matchBanner.innerHTML = `<img src="${round_data.Matches[0].HomeImage[match_number]}" height="40px" alt=""> ${round_data.Matches[0].HomeTeam[match_number]} v ${round_data.Matches[0].AwayTeam[match_number]} <img src="${round_data.Matches[0].AwayImage[match_number]}" height="40px" alt="">`;
        document.title = `AFL Match Stats - ${round_data.Summary[0].Season}, ${roundName} - ${round_data.Matches[0].HomeTeam[match_number]} v ${round_data.Matches[0].AwayTeam[match_number]}`;

        displaySingleMatchTeamStats();
        document.querySelector("#single-match-div-team-container").classList.remove('d-none');
        document.querySelector("#react-div-team").classList.add('d-none');
    } else {
        matchBanner.innerHTML = `All ${roundName} Matches`;
        document.title = `AFL Match Stats - ${round_data.Summary[0].Season}, ${roundName}`;

        document.querySelector("#single-match-div-team-container").classList.add('d-none');
        document.querySelector("#react-div-team").classList.remove('d-none');
        teamstatsDiv.innerHTML = '';
    }
}

const goToRound = () => { window.location.href = `afl_match_stats.html?id=${roundList.value}` };

if (validYears.includes(seasonId)) {
    document.querySelector(`#year-${seasonId}`).classList = "active";

    if (!roundId) {
        roundDiv.classList.add("d-none");
    }

    const xmlhttpSeason = new XMLHttpRequest();
    const urlSeason = `https://www.wheeloratings.com/src/match_stats/table_data/${seasonId}.json`;

    xmlhttpSeason.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            res = JSON.parse(this.responseText);

            if (typeof res.RoundId === "string") {
                for (key of Object.keys(res)) {
                    res[key] = [res[key]];
                }
            }
            if (!roundId && res.RoundId.slice(-1)) {
                window.location.href = `afl_match_stats.html?id=${res.RoundId.slice(-1)}`;
            } else {
                if (res.RoundId.length > 1) {
                    season_data = res;

                    for (let i = 0; i < res.RoundId.length; i++) {
                        const li = document.createElement('option');
                        li.value = res.RoundId[i];
                        if (Object.keys(res).includes("RoundName"))
                            li.innerText = res.RoundName[i];
                        else
                            li.innerText = `Round ${res.RoundNumber[i]}`;
                        if (res.RoundId[i] === roundId) {
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

            if (roundId) {
                const xmlhttp = new XMLHttpRequest();
                const url = `https://www.wheeloratings.com/src/match_stats/table_data/${roundId}.json`;

                let data = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"MatchId","name":"MatchId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Player","name":"Player","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":180,"align":"left","defaultSortDesc":false,"cell":"function(cellInfo) { return playerDisplay(cellInfo) }","html":true,"className":"sticky","headerClassName":"sticky"},{"id":"WebsiteId","name":"WebsiteId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Team","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Abbreviation","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","defaultSortDesc":false},{"id":"Image","name":"Image","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center","className":"colClass"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center","className":"colClass"},{"id":"EstimatedRating","name":"Pred. Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center","className":"colClass"},{"id":"Equity_PreClearance","name":"Pre Cl Equity","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":55,"align":"center","className":"colClass"},{"id":"Equity_PostClearance","name":"Post Cl Equity","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":55,"align":"center","className":"colClass"},{"id":"Equity_Possession","name":"Ball Win.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Equity_BallUse","name":"Ball Use","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"DreamTeamPoints","name":"Fantasy Points","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center","className":"colClass"},{"id":"ExpVotes","name":"Exp. Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":2},"aggregated":{"digits":2}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Votes3","name":"% 3 Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Votes2","name":"% 2 Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Votes1","name":"% 1 Vote","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"TimeOnGround","name":"TOG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"AssistedMetresGained","name":"Ass. Mtrs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"GroundBallGets","name":"GB Gets","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PostClearanceContestedPossessions","name":"Post Cl CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"PostClearanceGroundBallGets","name":"Post Cl GBG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"HandballReceives","name":"HB Rec","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Intercepts","name":"Int","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"CentreBounceAttendancePercentage","name":"CBA %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"InterceptMarks","name":"Int Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"xScore","name":"xSc","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":40,"align":"center","className":"colClass"},{"id":"xScoreRating","name":"xSc +/-","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ScoreInvolvements","name":"SI","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ScoreLaunches","name":"Launch","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center","className":"colClass"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PressureActs","name":"Pr. Acts","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Hitouts","name":"Hit Outs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"}],"defaultSortDesc":true,"defaultSorted":[{"id":"RatingPoints","desc":true}],"defaultPageSize":50,"showPageSizeOptions":true,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","rowStyle":"function(rowInfo) { if (rowInfo && rowInfo.values['TimeOnGround'] === 0) { return {color: '#828282'} } }","height":"600px","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"elementId":"match-stats","dataKey":"616ff9da0c8b70ec57343fd49aa9074a"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.columns.1.cell","tag.attribs.columns.6.className","tag.attribs.columns.7.className","tag.attribs.columns.8.className","tag.attribs.columns.9.className","tag.attribs.columns.10.className","tag.attribs.columns.11.className","tag.attribs.columns.12.className","tag.attribs.columns.13.className","tag.attribs.columns.14.className","tag.attribs.columns.15.className","tag.attribs.columns.16.className","tag.attribs.columns.17.className","tag.attribs.columns.18.className","tag.attribs.columns.19.className","tag.attribs.columns.20.className","tag.attribs.columns.21.className","tag.attribs.columns.22.className","tag.attribs.columns.23.className","tag.attribs.columns.24.className","tag.attribs.columns.25.className","tag.attribs.columns.26.className","tag.attribs.columns.27.className","tag.attribs.columns.28.className","tag.attribs.columns.29.className","tag.attribs.columns.30.className","tag.attribs.columns.31.className","tag.attribs.columns.32.className","tag.attribs.columns.33.className","tag.attribs.columns.34.className","tag.attribs.columns.35.className","tag.attribs.columns.36.className","tag.attribs.columns.37.className","tag.attribs.columns.38.className","tag.attribs.columns.39.className","tag.attribs.columns.40.className","tag.attribs.columns.41.className","tag.attribs.columns.42.className","tag.attribs.columns.43.className","tag.attribs.columns.44.className","tag.attribs.columns.45.className","tag.attribs.columns.46.className","tag.attribs.columns.47.className","tag.attribs.columns.48.className","tag.attribs.rowStyle"],"jsHooks":[]}`;
                let dataTeam = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"RoundId","name":"RoundId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"MatchId","name":"MatchId","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Team","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":180,"align":"left","defaultSortDesc":false},{"id":"Abbreviation","name":"Team","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"left","defaultSortDesc":false,"cell":"function(cellInfo) { return teamDisplay(cellInfo) }","html":true,"className":"sticky","headerClassName":"sticky"},{"id":"Image","name":"Image","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"Age","name":"Age","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Experience","name":"Exp.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center","className":"colClass"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center","className":"colClass"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"DreamTeamPoints","name":"Fantasy Points","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center","className":"colClass"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"KickMetresGained","name":"Kick MG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"HandballMetresGained","name":"HB MG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ForwardHalf","name":"Fwd Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"GroundBallGets","name":"GB Gets","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PostClearanceContestedPossessions","name":"Post Cl CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"PostClearanceGroundBallGets","name":"Post Cl GBG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"Intercepts","name":"Int","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"InterceptMarks","name":"Int Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"RuckContests","name":"RC","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Hitouts","name":"Hit Outs","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"HitoutsToAdvantage","name":"To Adv","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"HitoutToFirstPossession","name":"To 1st","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":40,"align":"center","className":"colClass"},{"id":"FirstPossessions","name":"1st Poss","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"FirstPossessionToClearance","name":"1st Poss to Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":65,"align":"center","className":"colClass"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"CentreClearances","name":"Ctr Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Score","name":"Score","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"xScore","name":"xSc","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"xScoreRating","name":"xSc +/-","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"xWins","name":"xWin %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"ScoresPerInside50","name":"Sc / In 50","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":50,"align":"center","className":"colClass"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Equity_PreClearance","name":"Pre Cl Equity","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":55,"align":"center","className":"colClass"},{"id":"Equity_PostClearance","name":"Post Cl Equity","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":55,"align":"center","className":"colClass"},{"id":"Equity_Possession","name":"Ball Win.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Equity_BallUse","name":"Ball Use","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"ChainToScore","name":"Chain to Sc.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":55,"align":"center","className":"colClass"},{"id":"D50ToF50","name":"D50 to F50","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":50,"align":"center","className":"colClass"},{"id":"D50ToScore","name":"D50 to Sc.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":50,"align":"center","className":"colClass"},{"id":"DefHalfToF50","name":"Def Half to F50","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":65,"align":"center","className":"colClass"},{"id":"DefHalfToScore","name":"Def Half to Sc.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":65,"align":"center","className":"colClass"},{"id":"xChainScore","name":"Total","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":50,"align":"center","className":"colClass"},{"id":"xChainScoreFromStoppage","name":"Stoppage","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":75,"align":"center","className":"colClass"},{"id":"xChainScoreFromTurnover","name":"Turnover","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":75,"align":"center","className":"colClass"},{"id":"GoalsFromKickIn","name":"GoalsFromKickIn","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromKickIn","name":"BehindsFromKickIn","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromKickIn","name":"Kick In","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromKickIn', 'BehindsFromKickIn', 'PointsFromKickIn') }","html":true,"className":"colClass"},{"id":"GoalsFromStoppage","name":"GoalsFromStoppage","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromStoppage","name":"BehindsFromStoppage","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromStoppage","name":"Stoppage","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":75,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromStoppage', 'BehindsFromStoppage', 'PointsFromStoppage') }","html":true,"className":"colClass"},{"id":"GoalsFromTurnover","name":"GoalsFromTurnover","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromTurnover","name":"BehindsFromTurnover","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromTurnover","name":"Turnover","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":75,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromTurnover', 'BehindsFromTurnover', 'PointsFromTurnover') }","html":true,"className":"colClass"},{"id":"GoalsFromDefensiveHalf","name":"GoalsFromDefensiveHalf","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromDefensiveHalf","name":"BehindsFromDefensiveHalf","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromDefensiveHalf","name":"Def Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":70,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromDefensiveHalf', 'BehindsFromDefensiveHalf', 'PointsFromDefensiveHalf') }","html":true,"className":"colClass"},{"id":"GoalsFromForwardHalf","name":"GoalsFromForwardHalf","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromForwardHalf","name":"BehindsFromForwardHalf","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromForwardHalf","name":"Forward Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":70,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromForwardHalf', 'BehindsFromForwardHalf', 'PointsFromForwardHalf') }","html":true,"className":"colClass"},{"id":"GoalsFromCentreBounce","name":"GoalsFromCentreBounce","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromCentreBounce","name":"BehindsFromCentreBounce","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromCentreBounce","name":"Centre Bounce","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":70,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromCentreBounce', 'BehindsFromCentreBounce', 'PointsFromCentreBounce') }","html":true,"className":"colClass"}],"columnGroups":[{"name":"Possessions","columns":["ContestedPossessions","GroundBallGets","PostClearanceContestedPossessions","PostClearanceGroundBallGets","Intercepts","Marks","ContestedMarks","InterceptMarks"]},{"name":"Stoppages","columns":["RuckContests","Hitouts","HitoutsToAdvantage","HitoutToFirstPossession","FirstPossessions","FirstPossessionToClearance","TotalClearances","CentreClearances"]},{"name":"Scoring","columns":["ShotsAtGoal","Goals","Behinds","Score","xScore","xScoreRating","xWins","ScoresPerInside50","GoalAssists"]},{"name":"Equity","columns":["Equity_PreClearance","Equity_PostClearance","Equity_Possession","Equity_BallUse"]},{"name":"Transition","columns":["ChainToScore","D50ToF50","D50ToScore","DefHalfToF50","DefHalfToScore"]},{"name":"xChainScore","columns":["xChainScore","xChainScoreFromStoppage","xChainScoreFromTurnover"]},{"name":"Score sources","columns":["GoalsFromKickIn","BehindsFromKickIn","PointsFromKickIn","GoalsFromStoppage","BehindsFromStoppage","PointsFromStoppage","GoalsFromTurnover","BehindsFromTurnover","PointsFromTurnover"]},{"name":"Score origin","columns":["GoalsFromDefensiveHalf","BehindsFromDefensiveHalf","PointsFromDefensiveHalf","GoalsFromForwardHalf","BehindsFromForwardHalf","PointsFromForwardHalf","GoalsFromCentreBounce","BehindsFromCentreBounce","PointsFromCentreBounce"]}],"defaultSortDesc":true,"defaultSorted":[{"id":"RatingPoints","desc":true}],"defaultPageSize":50,"showPageSizeOptions":false,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","height":"600px","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"elementId":"match-stats-team","dataKey":"bbf54e063591c4791ddf94f4426e139d"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.columns.3.cell","tag.attribs.columns.5.className","tag.attribs.columns.6.className","tag.attribs.columns.7.className","tag.attribs.columns.8.className","tag.attribs.columns.9.className","tag.attribs.columns.10.className","tag.attribs.columns.11.className","tag.attribs.columns.12.className","tag.attribs.columns.13.className","tag.attribs.columns.14.className","tag.attribs.columns.15.className","tag.attribs.columns.16.className","tag.attribs.columns.17.className","tag.attribs.columns.18.className","tag.attribs.columns.19.className","tag.attribs.columns.20.className","tag.attribs.columns.21.className","tag.attribs.columns.22.className","tag.attribs.columns.23.className","tag.attribs.columns.24.className","tag.attribs.columns.25.className","tag.attribs.columns.26.className","tag.attribs.columns.27.className","tag.attribs.columns.28.className","tag.attribs.columns.29.className","tag.attribs.columns.30.className","tag.attribs.columns.31.className","tag.attribs.columns.32.className","tag.attribs.columns.33.className","tag.attribs.columns.34.className","tag.attribs.columns.35.className","tag.attribs.columns.36.className","tag.attribs.columns.37.className","tag.attribs.columns.38.className","tag.attribs.columns.39.className","tag.attribs.columns.40.className","tag.attribs.columns.41.className","tag.attribs.columns.42.className","tag.attribs.columns.43.className","tag.attribs.columns.44.className","tag.attribs.columns.45.className","tag.attribs.columns.46.className","tag.attribs.columns.47.className","tag.attribs.columns.48.className","tag.attribs.columns.49.className","tag.attribs.columns.50.className","tag.attribs.columns.51.className","tag.attribs.columns.52.className","tag.attribs.columns.53.className","tag.attribs.columns.54.className","tag.attribs.columns.55.className","tag.attribs.columns.56.className","tag.attribs.columns.57.className","tag.attribs.columns.60.cell","tag.attribs.columns.60.className","tag.attribs.columns.63.cell","tag.attribs.columns.63.className","tag.attribs.columns.66.cell","tag.attribs.columns.66.className","tag.attribs.columns.69.cell","tag.attribs.columns.69.className","tag.attribs.columns.72.cell","tag.attribs.columns.72.className","tag.attribs.columns.75.cell","tag.attribs.columns.75.className"],"jsHooks":[]}`;

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

                            let heading;
                            let keepHeading = false;
                            Object.keys(teamStatsColumns).forEach(key => {
                                if (teamStatsColumns[key].heading) {
                                    if (heading && !keepHeading) delete teamStatsColumns[heading];
                                    heading = key;
                                    keepHeading = false;
                                } else {
                                    // if (Object.keys(reactableDataTeam).includes(key))
                                    if (Object.keys(round_data.TeamData[0]).includes(key))
                                        keepHeading = true;
                                    else
                                        delete teamStatsColumns[key];
                                }
                            })
                            if (heading && !keepHeading) delete teamStatsColumns[heading];

                            addEventListener('DOMContentLoaded', (event) => {
                                if (matchId) {
                                    Reactable.setFilter('match-stats', 'MatchId', matchId);
                                    // Reactable.setFilter('match-stats-team', 'MatchId', matchId);
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
                                    // console.log("match clicked")

                                    matchId = null;
                                    match_number = -1;
                                    loadMatch();
                                    Reactable.setFilter('match-stats', 'MatchId', undefined);
                                    // Reactable.setFilter('match-stats-team', 'MatchId', undefined);
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
                                    // console.log("match clicked")

                                    matchId = matches.MatchId[i];
                                    match_number = round_data.Matches[0].MatchId.indexOf(matchId);
                                    loadMatch();
                                    // Reactable.setFilter('match-stats', 'MatchId', undefined);
                                    Reactable.setFilter('match-stats', 'MatchId', matchId);
                                    // Reactable.setFilter('match-stats-team', 'MatchId', undefined);
                                    // Reactable.setFilter('match-stats-team', 'MatchId', matchId);
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
            }
        }
    };

    xmlhttpSeason.open("GET", urlSeason, false);
    xmlhttpSeason.send();

} else {
    seasonDiv.classList.add("d-none");
}

const columnsAlwaysDisplayed = ["MatchId", "Player", "Team"];
const statsColumns = ["CoachesVotes", "RatingPoints", "EstimatedRating", "Equity_PreClearance", "Equity_PostClearance", "Equity_Possession", "Equity_BallUse", "Supercoach", "DreamTeamPoints", "ExpVotes", "Votes3", "TimeOnGround", "Kicks", "Handballs", "Disposals", "DisposalEfficiency", "MetresGained", "AssistedMetresGained", "Inside50s", "ContestedPossessions", "GroundBallGets", "PostClearanceContestedPossessions", "PostClearanceGroundBallGets", "HandballReceives", "Intercepts", "CentreBounceAttendancePercentage", "TotalClearances", "Marks", "InterceptMarks", "ContestedMarks", "ShotsAtGoal", "Goals", "Behinds", "xScore", "xScoreRating", "GoalAssists", "ScoreInvolvements", "ScoreLaunches", "Tackles", "PressureActs", "Hitouts"];

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