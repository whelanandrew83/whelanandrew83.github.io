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

const forButton = document.querySelector('#for-stats');
const againstButton = document.querySelector('#against-stats');
const differenceButton = document.querySelector('#difference-stats');

let player_data = "";
let season;
let reactableData;
let ct_sharedData_temp;

if (paramSeason) { season = parseFloat(paramSeason).toString() }

const columns = [];
const columnsMissing = [];
const seasonButtons = [];

const columnsAlwaysDisplayed = ["Season", "RoundNumber", "Match", "MatchId", "Team", "Opposition", "Result", "Margin", "xMargin"];
const columnsAlwaysHidden = ["GoalsFromKickIn", "BehindsFromKickIn", "GoalsFromStoppage", "BehindsFromStoppage", "GoalsFromTurnover", "BehindsFromTurnover", "GoalsFromDefensiveHalf", "BehindsFromDefensiveHalf", "GoalsFromForwardHalf", "BehindsFromForwardHalf", "GoalsFromCentreBounce", "BehindsFromCentreBounce", "GoalsFromKickIn_Opposition", "BehindsFromKickIn_Opposition", "GoalsFromStoppage_Opposition", "BehindsFromStoppage_Opposition", "GoalsFromTurnover_Opposition", "BehindsFromTurnover_Opposition", "GoalsFromDefensiveHalf_Opposition", "BehindsFromDefensiveHalf_Opposition", "GoalsFromForwardHalf_Opposition", "BehindsFromForwardHalf_Opposition", "GoalsFromCentreBounce_Opposition", "BehindsFromCentreBounce_Opposition"];

let columnsToHide;
let hiddenColumns;

const statsColumns = {
    "For": ["Age", "Experience", "CoachesVotes", "RatingPoints", "Supercoach", "DreamTeamPoints", "Kicks", "Handballs", "Disposals", "DisposalEfficiency", "MetresGained", "Inside50s", "ContestedPossessions", "GroundBallGets", "Intercepts", "TotalClearances", "Marks", "ContestedMarks", "InterceptMarks", "ShotsAtGoal", "Goals", "Behinds", "Score", "xScore", "xScoreRating", "GoalAssists", "Tackles", "Hitouts", "GoalsFromKickIn", "BehindsFromKickIn", "PointsFromKickIn", "GoalsFromStoppage", "BehindsFromStoppage", "PointsFromStoppage", "GoalsFromTurnover", "BehindsFromTurnover", "PointsFromTurnover", "GoalsFromDefensiveHalf", "BehindsFromDefensiveHalf", "PointsFromDefensiveHalf", "GoalsFromForwardHalf", "BehindsFromForwardHalf", "PointsFromForwardHalf", "GoalsFromCentreBounce", "BehindsFromCentreBounce", "PointsFromCentreBounce"],
    "Against": ["Age_Opposition", "Experience_Opposition", "RatingPoints_Opposition", "Kicks_Opposition", "Handballs_Opposition", "Disposals_Opposition", "MetresGained_Opposition", "Inside50s_Opposition", "ContestedPossessions_Opposition", "GroundBallGets_Opposition", "Intercepts_Opposition", "TotalClearances_Opposition", "Marks_Opposition", "ContestedMarks_Opposition", "InterceptMarks_Opposition", "ShotsAtGoal_Opposition", "Goals_Opposition", "Behinds_Opposition", "Score_Opposition", "xScore_Opposition", "xScoreRating_Opposition", "GoalAssists_Opposition", "Tackles_Opposition", "GoalsFromKickIn_Opposition", "BehindsFromKickIn_Opposition", "PointsFromKickIn_Opposition", "GoalsFromStoppage_Opposition", "BehindsFromStoppage_Opposition", "PointsFromStoppage_Opposition", "GoalsFromTurnover_Opposition", "BehindsFromTurnover_Opposition", "PointsFromTurnover_Opposition", "GoalsFromDefensiveHalf_Opposition", "BehindsFromDefensiveHalf_Opposition", "PointsFromDefensiveHalf_Opposition", "GoalsFromForwardHalf_Opposition", "BehindsFromForwardHalf_Opposition", "PointsFromForwardHalf_Opposition", "GoalsFromCentreBounce_Opposition", "BehindsFromCentreBounce_Opposition", "PointsFromCentreBounce_Opposition"],
    "Difference": ["Age_Diff", "Experience_Diff", "RatingPoints_Diff", "Kicks_Diff", "Handballs_Diff", "Disposals_Diff", "MetresGained_Diff", "Inside50s_Diff", "ContestedPossessions_Diff", "GroundBallGets_Diff", "Intercepts_Diff", "TotalClearances_Diff", "Marks_Diff", "ContestedMarks_Diff", "InterceptMarks_Diff", "ShotsAtGoal_Diff", "xScoreRating_Diff", "GoalAssists_Diff", "Tackles_Diff", "PointsFromKickIn_Diff", "PointsFromStoppage_Diff", "PointsFromTurnover_Diff", "PointsFromDefensiveHalf_Diff", "PointsFromForwardHalf_Diff", "PointsFromCentreBounce_Diff"]
};

const filterColumns = {
    'Season': 'Season',
    'Margin': 'Margin',
    'xMargin': 'xMargin',
    'Age': 'Age',
    'Experience': 'Experience',
    'RatingPoints': 'Player Rating',
    'Supercoach': 'Supercoach Points',
    'CoachesVotes': 'Coaches Votes',
    'Inside50s': 'Inside 50s',
    'ContestedMarks': 'Contested Marks',
    'InterceptMarks': 'Intercept Marks',
    'ShotsAtGoal': 'Shots At Goal',
    'Goals': 'Goals',
    'Score': 'Score',
    'xScore': 'xScore',
    'xScoreRating': 'xScore +/-',
    'PointsFromKickIn': 'Points from Kick-in',
    'PointsFromStoppage': 'Points from Stoppage',
    'PointsFromTurnover': 'Points from Turnover',
    'PointsFromDefensiveHalf': 'Points from Defensive Half',
    'PointsFromForwardHalf': 'Points from Forward Half',
    'PointsFromCentreBounce': 'Points from Centre Bounce',

    'Inside50s_Opposition': 'Inside 50s (Opposition)',
    "ContestedMarks_Opposition": "Contested Marks (Opposition)",
    "InterceptMarks_Opposition": "Intercept Marks (Opposition)",
    "ShotsAtGoal_Opposition": "Shots At Goal (Opposition)",
    "Goals_Opposition": "Goals (Opposition)",
    "Score_Opposition": "Score (Opposition)",
    "xScore_Opposition": "xScore (Opposition)",
    "xScoreRating_Opposition": "xScore +/- (Opposition)",
    "PointsFromKickIn_Opposition": "Points from Kick-in (Opposition)",
    "PointsFromStoppage_Opposition": "Points from Stoppage (Opposition)",
    "PointsFromTurnover_Opposition": "Points from Turnover (Opposition)",
    "PointsFromDefensiveHalf_Opposition": "Points from Defensive Half (Opposition)",
    "PointsFromForwardHalf_Opposition": "Points from Forward Half (Opposition)",
    "PointsFromCentreBounce_Opposition": "Points from Centre Bounce (Opposition)",

    "Age_Diff": "Age (Difference)",
    "Experience_Diff": "Experience (Difference)",
    "RatingPoints_Diff": "Player Rating (Difference)",
    "Disposals_Diff": "Disposals (Difference)",
    "Inside50s_Diff": "Inside 50s (Difference)",
    "MetresGained_Diff": "Metres Gained (Difference)",
    "ContestedPossessions_Diff": "Contested Possessions (Difference)",
    "GroundBallGets_Diff": "Ground Ball Gets (Difference)",
    "Intercepts_Diff": "Intercept Possessions (Difference)",
    "TotalClearances_Diff": "Total Clearances (Difference)",
    "Marks_Diff": "Marks (Difference)",
    "ContestedMarks_Diff": "Contested Marks (Difference)",
    "InterceptMarks_Diff": "Intercept Marks (Difference)",
    "ShotsAtGoal_Diff": "Shots At Goal (Difference)",
    "Goals_Diff": "Goals (Difference)",
    "xScoreRating_Diff": "xScore +/- (Difference)",
    "GoalAssists_Diff": "Goal Assists (Difference)",
    "Tackles_Diff": "Tackles (Difference)",
    "PointsFromKickIn_Diff": "Points from Kick-in (Difference)",
    "PointsFromStoppage_Diff": "Points from Stoppage (Difference)",
    "PointsFromTurnover_Diff": "Points from Turnover (Difference)",
    "PointsFromDefensiveHalf_Diff": "Points from Defensive Half (Difference)",
    "PointsFromForwardHalf_Diff": "Points from Forward Half (Difference)",
    "PointsFromCentreBounce_Diff": "Points from CentreBounce (Difference)"
}

//const filterColumnsDefault = ['Matches']

const colClass = function (rowInfo, column, state) {
    for (let i = 0; i < state.sorted.length; i++) {
        if (state.sorted[i].id === column.id)
            return 'fw-bold'
    }
}

const matchDisplay = function (cellInfo) {
    return `<a href='afl_match_stats.html?id=${cellInfo.row['MatchId']}'>View</a>`
}

const scoreDisplay = function (cellInfo, goalsField, behindsField, scoreField) {
    return (typeof cellInfo.row[goalsField] === 'number' ? `${cellInfo.row[goalsField]}.${cellInfo.row[behindsField]}.${cellInfo.row[scoreField]}` : null)
}

const noValidPlayer = function () {
    h1.innerText = 'AFL Match Stats';
    playerDiv.style.display = "none";
}

const teamFiltersDiv = document.querySelector("#team-filters");

if (typeof teams !== 'undefined' & typeof teams.Team !== 'undefined') {
    for (i = 0; i < teams.Team.length; i++) {
        const teamLink = document.createElement('a');
        teamLink.classList = 'btn btn-sm p-1';
        teamLink.href = `${window.location.pathname}?id=${teams.WebsiteId[i]}`;
        teamLink.innerHTML = `<img src='${teams.Image[i]}' height='25px'>`;

        teamFiltersDiv.appendChild(teamLink);
    }
}

if (player) {
    player = player.toLowerCase();

    // document.querySelector("#profile-link").href = `afl_player_profile.html?id=${player}`;

    const xmlhttp = new XMLHttpRequest();
    const url = `https://www.wheeloratings.com/src/match_stats_team/table_data/${player}.json`;

    let data = `{"x":{"tag":{"name":"Reactable","attribs":{"data":{},"columns":[{"id":"Season","name":"Season","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":60,"align":"center","defaultSortDesc":false,"className":"sticky","headerClassName":"sticky"},{"id":"RoundNumber","name":"Round","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","defaultSortDesc":false,"className":"sticky","style":{"left":60},"headerClassName":"sticky","headerStyle":{"left":60}},{"id":"MatchId","name":"Match Stats","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","cell":"function(cellInfo) { return matchDisplay(cellInfo) }","html":true},{"id":"Match","name":"Match","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center"},{"id":"Opposition","name":"Opp.","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","filterable":true,"defaultSortDesc":false,"className":"sticky","style":{"left":115},"headerClassName":"sticky","headerStyle":{"left":115}},{"id":"Result","name":"W/L","type":"character","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","filterable":true,"className":"colClass"},{"id":"Margin","name":"Margin","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"xMargin","name":"xMarg.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":55,"align":"center","className":"colClass"},{"id":"xWins","name":"xWin %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Age","name":"Age","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Experience","name":"Exp.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"CoachesVotes","name":"Coaches Votes","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center","className":"colClass"},{"id":"RatingPoints","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center","className":"colClass"},{"id":"Supercoach","name":"Super Coach","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":55,"align":"center","className":"colClass"},{"id":"Kicks","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Handballs","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Disposals","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"DisposalEfficiency","name":"Dis. Eff %","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"MetresGained","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Inside50s","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedPossessions","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"GroundBallGets","name":"GB Gets","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PostClearanceContestedPossessions","name":"PCl CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PostClearanceGroundBallGets","name":"PCl GBG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Intercepts","name":"Int","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"TotalClearances","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Marks","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedMarks","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"InterceptMarks","name":"Int Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ShotsAtGoal","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Goals","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"Behinds","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Score","name":"Score","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"xScore","name":"xSc","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"xScoreRating","name":"xSc +/-","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"GoalAssists","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Tackles","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"GoalsFromKickIn","name":"GoalsFromKickIn","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromKickIn","name":"BehindsFromKickIn","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromKickIn","name":"Kick In","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromKickIn', 'BehindsFromKickIn', 'PointsFromKickIn') }","html":true,"className":"colClass"},{"id":"GoalsFromStoppage","name":"GoalsFromStoppage","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromStoppage","name":"BehindsFromStoppage","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromStoppage","name":"Stoppage","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":75,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromStoppage', 'BehindsFromStoppage', 'PointsFromStoppage') }","html":true,"className":"colClass"},{"id":"GoalsFromTurnover","name":"GoalsFromTurnover","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromTurnover","name":"BehindsFromTurnover","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromTurnover","name":"Turnover","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":75,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromTurnover', 'BehindsFromTurnover', 'PointsFromTurnover') }","html":true,"className":"colClass"},{"id":"GoalsFromDefensiveHalf","name":"GoalsFromDefensiveHalf","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromDefensiveHalf","name":"BehindsFromDefensiveHalf","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromDefensiveHalf","name":"Def Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":70,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromDefensiveHalf', 'BehindsFromDefensiveHalf', 'PointsFromDefensiveHalf') }","html":true,"className":"colClass"},{"id":"GoalsFromForwardHalf","name":"GoalsFromForwardHalf","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromForwardHalf","name":"BehindsFromForwardHalf","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromForwardHalf","name":"Forward Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":70,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromForwardHalf', 'BehindsFromForwardHalf', 'PointsFromForwardHalf') }","html":true,"className":"colClass"},{"id":"GoalsFromCentreBounce","name":"GoalsFromCentreBounce","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromCentreBounce","name":"BehindsFromCentreBounce","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromCentreBounce","name":"Centre Bounce","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":70,"align":"center","cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromCentreBounce', 'BehindsFromCentreBounce', 'PointsFromCentreBounce') }","html":true,"className":"colClass"},{"id":"Age_Opposition","name":"Age","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Experience_Opposition","name":"Exp.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"RatingPoints_Opposition","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"Kicks_Opposition","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"Handballs_Opposition","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"Disposals_Opposition","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"MetresGained_Opposition","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"Inside50s_Opposition","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"ContestedPossessions_Opposition","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"GroundBallGets_Opposition","name":"GB Gets","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PostClearanceContestedPossessions_Opposition","name":"PCl CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"PostClearanceGroundBallGets_Opposition","name":"PCl GBG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Intercepts_Opposition","name":"Int","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"TotalClearances_Opposition","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"Marks_Opposition","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"ContestedMarks_Opposition","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"InterceptMarks_Opposition","name":"Int Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"ShotsAtGoal_Opposition","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"Goals_Opposition","name":"Goals","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"Behinds_Opposition","name":"Beh","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"Score_Opposition","name":"Score","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"xScore_Opposition","name":"xSc","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"xScoreRating_Opposition","name":"xSc +/-","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"GoalAssists_Opposition","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"Tackles_Opposition","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","defaultSortDesc":false,"className":"colClass"},{"id":"GoalsFromKickIn_Opposition","name":"GoalsFromKickIn_Opposition","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromKickIn_Opposition","name":"BehindsFromKickIn_Opposition","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromKickIn_Opposition","name":"Kick In","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":65,"align":"center","defaultSortDesc":false,"cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromKickIn_Opposition', 'BehindsFromKickIn_Opposition', 'PointsFromKickIn_Opposition') }","html":true,"className":"colClass"},{"id":"GoalsFromStoppage_Opposition","name":"GoalsFromStoppage_Opposition","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromStoppage_Opposition","name":"BehindsFromStoppage_Opposition","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromStoppage_Opposition","name":"Stoppage","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":75,"align":"center","defaultSortDesc":false,"cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromStoppage_Opposition', 'BehindsFromStoppage_Opposition', 'PointsFromStoppage_Opposition') }","html":true,"className":"colClass"},{"id":"GoalsFromTurnover_Opposition","name":"GoalsFromTurnover_Opposition","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromTurnover_Opposition","name":"BehindsFromTurnover_Opposition","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromTurnover_Opposition","name":"Turnover","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":75,"align":"center","defaultSortDesc":false,"cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromTurnover_Opposition', 'BehindsFromTurnover_Opposition', 'PointsFromTurnover_Opposition') }","html":true,"className":"colClass"},{"id":"GoalsFromDefensiveHalf_Opposition","name":"GoalsFromDefensiveHalf_Opposition","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromDefensiveHalf_Opposition","name":"BehindsFromDefensiveHalf_Opposition","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromDefensiveHalf_Opposition","name":"Def Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":70,"align":"center","defaultSortDesc":false,"cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromDefensiveHalf_Opposition', 'BehindsFromDefensiveHalf_Opposition', 'PointsFromDefensiveHalf_Opposition') }","html":true,"className":"colClass"},{"id":"GoalsFromForwardHalf_Opposition","name":"GoalsFromForwardHalf_Opposition","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromForwardHalf_Opposition","name":"BehindsFromForwardHalf_Opposition","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromForwardHalf_Opposition","name":"Forward Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":70,"align":"center","defaultSortDesc":false,"cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromForwardHalf_Opposition', 'BehindsFromForwardHalf_Opposition', 'PointsFromForwardHalf_Opposition') }","html":true,"className":"colClass"},{"id":"GoalsFromCentreBounce_Opposition","name":"GoalsFromCentreBounce_Opposition","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"BehindsFromCentreBounce_Opposition","name":"BehindsFromCentreBounce_Opposition","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","show":false},{"id":"PointsFromCentreBounce_Opposition","name":"Centre Bounce","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":70,"align":"center","defaultSortDesc":false,"cell":"function(cellInfo) { return scoreDisplay(cellInfo, 'GoalsFromCentreBounce_Opposition', 'BehindsFromCentreBounce_Opposition', 'PointsFromCentreBounce_Opposition') }","html":true,"className":"colClass"},{"id":"Age_Diff","name":"Age","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Experience_Diff","name":"Exp.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"RatingPoints_Diff","name":"Player Rating","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":60,"align":"center","className":"colClass"},{"id":"Kicks_Diff","name":"Kick","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Handballs_Diff","name":"HB","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Disposals_Diff","name":"Dis.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"MetresGained_Diff","name":"Mtrs Gnd","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"Inside50s_Diff","name":"In 50s","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedPossessions_Diff","name":"CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"GroundBallGets_Diff","name":"GB Gets","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PostClearanceContestedPossessions_Diff","name":"PCl CP","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PostClearanceGroundBallGets_Diff","name":"PCl GBG","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Intercepts_Diff","name":"Int","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"TotalClearances_Diff","name":"Clr","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Marks_Diff","name":"Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ContestedMarks_Diff","name":"CM","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"InterceptMarks_Diff","name":"Int Mks","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"ShotsAtGoal_Diff","name":"Shots","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":50,"align":"center","className":"colClass"},{"id":"xScoreRating_Diff","name":"xSc +/-","type":"numeric","sortNALast":true,"format":{"cell":{"digits":1},"aggregated":{"digits":1}},"minWidth":45,"align":"center","className":"colClass"},{"id":"GoalAssists_Diff","name":"Goal Ass.","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"Tackles_Diff","name":"Tack","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center","className":"colClass"},{"id":"PointsFromKickIn_Diff","name":"Kick In","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"PointsFromStoppage_Diff","name":"Stop","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"PointsFromTurnover_Diff","name":"Turn over","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"PointsFromDefensiveHalf_Diff","name":"Def Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"GoalsFromForwardHalf_Diff","name":"GoalsFromForwardHalf_Diff","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"BehindsFromForwardHalf_Diff","name":"BehindsFromForwardHalf_Diff","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"PointsFromForwardHalf_Diff","name":"Fwd Half","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"},{"id":"GoalsFromCentreBounce_Diff","name":"GoalsFromCentreBounce_Diff","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"BehindsFromCentreBounce_Diff","name":"BehindsFromCentreBounce_Diff","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":40,"align":"center"},{"id":"PointsFromCentreBounce_Diff","name":"Ctr Bnc","type":"numeric","sortNALast":true,"format":{"cell":{"digits":0},"aggregated":{"digits":0}},"minWidth":45,"align":"center","className":"colClass"}],"columnGroups":[{"name":"Result","columns":["Result","Margin","xMargin"]},{"name":"Stats","columns":["Age","Experience","CoachesVotes","RatingPoints","Supercoach","Kicks","Handballs","Disposals","DisposalEfficiency","MetresGained","Inside50s","ContestedPossessions","GroundBallGets","PostClearanceContestedPossessions","PostClearanceGroundBallGets","Intercepts","TotalClearances","Marks","ContestedMarks","InterceptMarks","ShotsAtGoal","Goals","Behinds","Score","xScore","xScoreRating","GoalAssists","Tackles"]},{"name":"Score sources","columns":["GoalsFromKickIn","BehindsFromKickIn","PointsFromKickIn","GoalsFromStoppage","BehindsFromStoppage","PointsFromStoppage","GoalsFromTurnover","BehindsFromTurnover","PointsFromTurnover"]},{"name":"Score origin","columns":["GoalsFromDefensiveHalf","BehindsFromDefensiveHalf","PointsFromDefensiveHalf","GoalsFromForwardHalf","BehindsFromForwardHalf","PointsFromForwardHalf","GoalsFromCentreBounce","BehindsFromCentreBounce","PointsFromCentreBounce"]},{"name":"Opposition Stats","columns":["Age_Opposition","Experience_Opposition","RatingPoints_Opposition","Kicks_Opposition","Handballs_Opposition","Disposals_Opposition","MetresGained_Opposition","Inside50s_Opposition","ContestedPossessions_Opposition","GroundBallGets_Opposition","PostClearanceContestedPossessions_Opposition","PostClearanceGroundBallGets_Opposition","Intercepts_Opposition","TotalClearances_Opposition","Marks_Opposition","ContestedMarks_Opposition","InterceptMarks_Opposition","ShotsAtGoal_Opposition","Goals_Opposition","Behinds_Opposition","Score_Opposition","xScore_Opposition","xScoreRating_Opposition","GoalAssists_Opposition","Tackles_Opposition"]},{"name":"Opp. score sources","columns":["GoalsFromKickIn_Opposition","BehindsFromKickIn_Opposition","PointsFromKickIn_Opposition","GoalsFromStoppage_Opposition","BehindsFromStoppage_Opposition","PointsFromStoppage_Opposition","GoalsFromTurnover_Opposition","BehindsFromTurnover_Opposition","PointsFromTurnover_Opposition"]},{"name":"Opp. score origin","columns":["GoalsFromDefensiveHalf_Opposition","BehindsFromDefensiveHalf_Opposition","PointsFromDefensiveHalf_Opposition","GoalsFromForwardHalf_Opposition","BehindsFromForwardHalf_Opposition","PointsFromForwardHalf_Opposition","GoalsFromCentreBounce_Opposition","BehindsFromCentreBounce_Opposition","PointsFromCentreBounce_Opposition"]},{"name":"Stats Differential","columns":["Age_Diff","Experience_Diff","RatingPoints_Diff","Kicks_Diff","Handballs_Diff","Disposals_Diff","MetresGained_Diff","Inside50s_Diff","ContestedPossessions_Diff","GroundBallGets_Diff","PostClearanceContestedPossessions_Diff","PostClearanceGroundBallGets_Diff","Intercepts_Diff","TotalClearances_Diff","Marks_Diff","ContestedMarks_Diff","InterceptMarks_Diff","ShotsAtGoal_Diff","xScoreRating_Diff","GoalAssists_Diff","Tackles_Diff"]},{"name":"Score source diff.","columns":["PointsFromKickIn_Diff","PointsFromStoppage_Diff","PointsFromTurnover_Diff"]},{"name":"Score origin diff.","columns":["PointsFromDefensiveHalf_Diff","GoalsFromForwardHalf_Diff","BehindsFromForwardHalf_Diff","PointsFromForwardHalf_Diff","GoalsFromCentreBounce_Diff","BehindsFromCentreBounce_Diff","PointsFromCentreBounce_Diff"]}],"defaultSortDesc":true,"defaultSorted":[{"id":"Match","desc":true}],"defaultPageSize":20,"showPageSizeOptions":true,"pageSizeOptions":[10,15,20,50,100],"striped":true,"showSortIcon":false,"className":"afl-table table-condensed","theme":{"borderColor":"#dfe2e5","highlightColor":"#f0f5f9","cellPadding":"4px 5px","searchInputStyle":{"width":"100%"}},"language":{"filterPlaceholder":"search","noData":"No entries found","pageNext":"❯","pagePrevious":"❮","pageInfo":"{rowStart}–{rowEnd} of {rows} entries","pageNextLabel":"Next page","pagePreviousLabel":"Previous page"},"crosstalkKey":["1"],"crosstalkGroup":"SharedData61607a17","elementId":"match-stats","dataKey":"880017df4d601a69788086a46e42ddc7"},"children":[]},"class":"reactR_markup"},"evals":["tag.attribs.columns.2.cell","tag.attribs.columns.5.className","tag.attribs.columns.6.className","tag.attribs.columns.7.className","tag.attribs.columns.8.className","tag.attribs.columns.9.className","tag.attribs.columns.10.className","tag.attribs.columns.11.className","tag.attribs.columns.12.className","tag.attribs.columns.13.className","tag.attribs.columns.14.className","tag.attribs.columns.15.className","tag.attribs.columns.16.className","tag.attribs.columns.17.className","tag.attribs.columns.18.className","tag.attribs.columns.19.className","tag.attribs.columns.20.className","tag.attribs.columns.21.className","tag.attribs.columns.22.className","tag.attribs.columns.23.className","tag.attribs.columns.24.className","tag.attribs.columns.25.className","tag.attribs.columns.26.className","tag.attribs.columns.27.className","tag.attribs.columns.28.className","tag.attribs.columns.29.className","tag.attribs.columns.30.className","tag.attribs.columns.31.className","tag.attribs.columns.32.className","tag.attribs.columns.33.className","tag.attribs.columns.34.className","tag.attribs.columns.35.className","tag.attribs.columns.36.className","tag.attribs.columns.39.cell","tag.attribs.columns.39.className","tag.attribs.columns.42.cell","tag.attribs.columns.42.className","tag.attribs.columns.45.cell","tag.attribs.columns.45.className","tag.attribs.columns.48.cell","tag.attribs.columns.48.className","tag.attribs.columns.51.cell","tag.attribs.columns.51.className","tag.attribs.columns.54.cell","tag.attribs.columns.54.className","tag.attribs.columns.55.className","tag.attribs.columns.56.className","tag.attribs.columns.57.className","tag.attribs.columns.58.className","tag.attribs.columns.59.className","tag.attribs.columns.60.className","tag.attribs.columns.61.className","tag.attribs.columns.62.className","tag.attribs.columns.63.className","tag.attribs.columns.64.className","tag.attribs.columns.65.className","tag.attribs.columns.66.className","tag.attribs.columns.67.className","tag.attribs.columns.68.className","tag.attribs.columns.69.className","tag.attribs.columns.70.className","tag.attribs.columns.71.className","tag.attribs.columns.72.className","tag.attribs.columns.73.className","tag.attribs.columns.74.className","tag.attribs.columns.75.className","tag.attribs.columns.76.className","tag.attribs.columns.77.className","tag.attribs.columns.78.className","tag.attribs.columns.79.className","tag.attribs.columns.82.cell","tag.attribs.columns.82.className","tag.attribs.columns.85.cell","tag.attribs.columns.85.className","tag.attribs.columns.88.cell","tag.attribs.columns.88.className","tag.attribs.columns.91.cell","tag.attribs.columns.91.className","tag.attribs.columns.94.cell","tag.attribs.columns.94.className","tag.attribs.columns.97.cell","tag.attribs.columns.97.className","tag.attribs.columns.98.className","tag.attribs.columns.99.className","tag.attribs.columns.100.className","tag.attribs.columns.101.className","tag.attribs.columns.102.className","tag.attribs.columns.103.className","tag.attribs.columns.104.className","tag.attribs.columns.105.className","tag.attribs.columns.106.className","tag.attribs.columns.107.className","tag.attribs.columns.108.className","tag.attribs.columns.109.className","tag.attribs.columns.110.className","tag.attribs.columns.111.className","tag.attribs.columns.112.className","tag.attribs.columns.113.className","tag.attribs.columns.114.className","tag.attribs.columns.115.className","tag.attribs.columns.116.className","tag.attribs.columns.117.className","tag.attribs.columns.118.className","tag.attribs.columns.119.className","tag.attribs.columns.120.className","tag.attribs.columns.121.className","tag.attribs.columns.122.className","tag.attribs.columns.125.className","tag.attribs.columns.128.className"],"jsHooks":[]}`;

    data = JSON.parse(data);

    ct_sharedData_temp = data.x.tag.attribs.crosstalkGroup;

    for (col of data.x.tag.attribs.columns) {
        columns.push(col.id);
    }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            res = JSON.parse(this.responseText);

            if (res) {
                player_data = res;

                reactableData = JSON.parse(JSON.stringify(player_data.TeamData[0]));

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

                //columnsToHide = [...columnsMissing, ...statsColumns.For, ...statsColumns.Against, ...statsColumns.Difference];
                columnsToHide = columns.filter((value) => { return !columnsAlwaysDisplayed.includes(value) });
                hiddenColumns = {
                    "For": columnsToHide.filter((value) => { return !statsColumns.For.includes(value) | columnsAlwaysHidden.includes(value) }),
                    "Against": columnsToHide.filter((value) => { return !statsColumns.Against.includes(value) | columnsAlwaysHidden.includes(value) }),
                    "Difference": columnsToHide.filter((value) => { return !statsColumns.Difference.includes(value) | columnsAlwaysHidden.includes(value) })
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
                    history.replaceState(null, '', `afl_match_stats_team.html?id=${player}`);

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
                        history.replaceState(null, '', `afl_match_stats_team.html?id=${player}&season=${season}`);

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