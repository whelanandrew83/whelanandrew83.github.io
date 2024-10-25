const columnsAlwaysHidden = ["Image", "ContestOffensiveWins", "ContestDefensiveLosses"];
const columnsAlwaysDisplayed = ["Team", "Abbreviation", "Matches"];

const statsColumns = {
    "For": ["Players", "Age", "Experience", "RatingPoints", "Supercoach", "DreamTeamPoints", "CoachesVotes", "Kicks", "Handballs", "Disposals", "DisposalEfficiency", "KickingEfficiency", "HandballEfficiency", "KickPercentage", "DisposalsPerOppositionTackle", "Inside50s", "Rebound50s", "Rebound50sPerOppositionInside50s", "MetresGained", "MetresGainedPerDisposal", "Clangers", "DisposalsPerClanger", "Turnovers", "DisposalsPerTurnover", "ContestedPossessions", "UncontestedPossessions", "TotalPossessions", "ContestedPossessionRate", "Intercepts", "GroundBallGets", "HardBallGets", "LooseBallGets", "GathersFromHitout", "CrumbingPossessions", "HandballReceives", "CentreClearances", "StoppageClearances", "TotalClearances", "Marks", "ContestedMarks", "MarksInside50", "MarksInside50PerInside50", "InterceptMarks", "MarksOnLead", "GoalScorers_Total", "GoalScorers", "Goals", "Behinds", "RushedBehinds", "ShotsAtGoal", "GoalAssists", "GoalAccuracy", "GoalsPerInside50", "ScoringShotsPerInside50", "ShotsPerInside50", "ScoreInvolvements", "ScoreLaunches", "ContestOffensiveOneOnOnes", "ContestOffensiveWinPercentage", "xScore", "xScoreRating", "xScorePerShot", "xScoreRatingPerShot", "xScorePerShot_Set", "xScoreRatingPerShot_Set", "xScorePerShot_General", "xScoreRatingPerShot_General", "PointsFromKickIn", "PointsFromStoppage", "PointsFromTurnover", "PointsFromDefensiveHalf", "PointsFromForwardHalf", "PointsFromCentreBounce", "ContestDefensiveOneOnOnes", "ContestDefensiveLossPercentage", "Tackles", "TacklesInside50", "PressureActs", "Spoils", "RuckContests", "Hitouts", "HitoutsWinPercentage", "HitoutsToAdvantage", "HitoutsToAdvantagePercentage", "RuckHardBallGets", "FreesFor", "FreesAgainst", "FreesDiff", "KickIns", "KickInsPlayOnPercentage", "Bounces", "OnePercenters", "InterchangeCount"],
    "Against": ["RatingPoints_Opposition", "Supercoach_Opposition", "DreamTeamPoints_Opposition", "CoachesVotes_Opposition", "Kicks_Opposition", "Handballs_Opposition", "Disposals_Opposition", "DisposalEfficiency_Opposition", "KickingEfficiency_Opposition", "HandballEfficiency_Opposition", "OppositionDisposalsPerTackle", "Inside50s_Opposition", "Rebound50s_Opposition", "OppositionRebound50sPerInside50s", "MetresGained_Opposition", "MetresGainedPerDisposal_Opposition", "Clangers_Opposition", "DisposalsPerClanger_Opposition", "Turnovers_Opposition", "DisposalsPerTurnover_Opposition", "ContestedPossessions_Opposition", "UncontestedPossessions_Opposition", "TotalPossessions_Opposition", "ContestedPossessionRate_Opposition", "Intercepts_Opposition", "GroundBallGets_Opposition", "HardBallGets_Opposition", "LooseBallGets_Opposition", "GathersFromHitout_Opposition", "CrumbingPossessions_Opposition", "HandballReceives_Opposition", "CentreClearances_Opposition", "StoppageClearances_Opposition", "TotalClearances_Opposition", "Marks_Opposition", "ContestedMarks_Opposition", "MarksInside50_Opposition", "MarksInside50PerInside50_Opposition", "InterceptMarks_Opposition", "MarksOnLead_Opposition", "Goals_Opposition", "Behinds_Opposition", "RushedBehinds_Opposition", "ShotsAtGoal_Opposition", "GoalAssists_Opposition", "GoalAccuracy_Opposition", "GoalsPerInside50_Opposition", "ScoringShotsPerInside50_Opposition", "ShotsPerInside50_Opposition", "ScoreInvolvements_Opposition", "ScoreLaunches_Opposition", "xScore_Opposition", "xScoreRating_Opposition", "xScorePerShot_Opposition", "xScoreRatingPerShot_Opposition", "xScorePerShot_Set_Opposition", "xScoreRatingPerShot_Set_Opposition", "xScorePerShot_General_Opposition", "xScoreRatingPerShot_General_Opposition", "PointsFromKickIn_Opposition", "PointsFromStoppage_Opposition", "PointsFromTurnover_Opposition", "PointsFromDefensiveHalf_Opposition", "PointsFromForwardHalf_Opposition", "PointsFromCentreBounce_Opposition", "Tackles_Opposition", "TacklesInside50_Opposition", "PressureActs_Opposition", "Spoils_Opposition", "Hitouts_Opposition", "HitoutsWinPercentage_Opposition", "HitoutsToAdvantage_Opposition", "HitoutsToAdvantagePercentage_Opposition", "RuckHardBallGets_Opposition", "KickIns_Opposition", "KickInsPlayOnPercentage_Opposition", "Bounces_Opposition", "OnePercenters_Opposition", "InterchangeCount_Opposition"],
    "Difference": ["RatingPoints_Diff", "Supercoach_Diff", "DreamTeamPoints_Diff", "CoachesVotes_Diff", "Kicks_Diff", "Handballs_Diff", "Disposals_Diff", "Inside50s_Diff", "MetresGained_Diff", "Clangers_Diff", "Turnovers_Diff", "ContestedPossessions_Diff", "UncontestedPossessions_Diff", "TotalPossessions_Diff", "Intercepts_Diff", "GroundBallGets_Diff", "HardBallGets_Diff", "LooseBallGets_Diff", "GathersFromHitout_Diff", "CrumbingPossessions_Diff", "HandballReceives_Diff", "CentreClearances_Diff", "StoppageClearances_Diff", "TotalClearances_Diff", "Marks_Diff", "ContestedMarks_Diff", "MarksInside50_Diff", "InterceptMarks_Diff", "MarksOnLead_Diff", "Goals_Diff", "Behinds_Diff", "ShotsAtGoal_Diff", "GoalAssists_Diff", "ScoreInvolvements_Diff", "ScoreLaunches_Diff", "xScore_Diff", "xScoreRating_Diff", "xScorePerShot_Diff", "PointsFromKickIn_Diff", "PointsFromStoppage_Diff", "PointsFromTurnover_Diff", "PointsFromDefensiveHalf_Diff", "PointsFromForwardHalf_Diff", "PointsFromCentreBounce_Diff", "Tackles_Diff", "TacklesInside50_Diff", "PressureActs_Diff", "Spoils_Diff", "Hitouts_Diff", "HitoutsToAdvantage_Diff", "RuckHardBallGets_Diff", "Bounces_Diff", "OnePercenters_Diff", "InterchangeCount_Diff"]
};

let currentView = "For";

let columnsToHide = [...statsColumns.For, ...statsColumns.Against, ...statsColumns.Difference];
const hiddenColumns = {
    "For": [],
    "Against": [],
    "Difference": []
}

const updateHiddenColumns = function () {
    hiddenColumns.For = [...columnsToHide.filter((value) => { return !statsColumns.For.includes(value) }), ...columnsAlwaysHidden, ...missing_columns];
    hiddenColumns.Against = [...columnsToHide.filter((value) => { return !statsColumns.Against.includes(value) }), ...columnsAlwaysHidden, ...missing_columns];
    hiddenColumns.Difference = [...columnsToHide.filter((value) => { return !statsColumns.Difference.includes(value) }), ...columnsAlwaysHidden, ...missing_columns];

    updateView();
}

const updateView = function () {
    Reactable.setHiddenColumns(reactableId, hiddenColumns[currentView]);
}

const forButton = document.querySelector('#for-stats');
const againstButton = document.querySelector('#against-stats');
const differenceButton = document.querySelector('#difference-stats');

forButton.addEventListener('click', (e) => {
    currentView = "For";
    updateView();

    forButton.classList.add('btn-primary');
    forButton.classList.remove('btn-light');
    againstButton.classList.remove('btn-primary');
    againstButton.classList.add('btn-light');
    differenceButton.classList.remove('btn-primary');
    differenceButton.classList.add('btn-light');
});
againstButton.addEventListener('click', (e) => {
    currentView = "Against";
    updateView();
    forButton.classList.remove('btn-primary');
    forButton.classList.add('btn-light');
    againstButton.classList.add('btn-primary');
    againstButton.classList.remove('btn-light');
    differenceButton.classList.remove('btn-primary');
    differenceButton.classList.add('btn-light');
});
differenceButton.addEventListener('click', (e) => {
    currentView = "Difference";
    updateView();
    forButton.classList.remove('btn-primary');
    forButton.classList.add('btn-light');
    againstButton.classList.remove('btn-primary');
    againstButton.classList.add('btn-light');
    differenceButton.classList.add('btn-primary');
    differenceButton.classList.remove('btn-light');
});

window.addEventListener('DOMContentLoaded', (event) => {
    Reactable.setHiddenColumns(reactableId, hiddenColumns.For);
});

const csvDownloadButton = document.querySelector('#download-csv-button');
csvDownloadButton.addEventListener('click', (e) => {
    Reactable.downloadDataCSV(reactableId, `${comp}-team-stats-${season}.csv`, { columnIds: [...new Set([...columnsAlwaysDisplayed, ...statsColumns.For, ...statsColumns.Against, ...statsColumns.Difference])].filter((el) => { return !missing_columns.includes(el) }) });
    gtag('event', 'data_download');
});