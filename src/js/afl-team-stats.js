const columnsAlwaysHidden = ["Image", "ContestOffensiveWins", "ContestDefensiveLosses"];
const columnsAlwaysDisplayed = ["Team", "Abbreviation", "Matches"];

const statsColumns = {
    "For": ["Players", "RatingPoints", "Supercoach", "DreamTeamPoints", "CoachesVotes", "Kicks", "Handballs", "Disposals", "DisposalEfficiency", "KickingEfficiency", "HandballEfficiency", "KickPercentage", "DisposalsPerOppositionTackle", "Inside50s", "Rebound50s", "Rebound50sPerOppositionInside50s", "MetresGained", "MetresGainedPerDisposal", "Clangers", "DisposalsPerClanger", "Turnovers", "DisposalsPerTurnover", "ContestedPossessions", "UncontestedPossessions", "TotalPossessions", "ContestedPossessionRate", "Intercepts", "GroundBallGets", "CentreClearances", "StoppageClearances", "TotalClearances", "Marks", "ContestedMarks", "MarksInside50", "MarksInside50PerInside50", "InterceptMarks", "MarksOnLead", "GoalScorers_Total", "GoalScorers", "Goals", "Behinds", "RushedBehinds", "ShotsAtGoal", "GoalAssists", "GoalAccuracy", "GoalsPerInside50", "ScoringShotsPerInside50", "ShotsPerInside50", "ScoreInvolvements", "ScoreLaunches", "ContestOffensiveOneOnOnes", "ContestOffensiveWinPercentage", "ContestDefensiveOneOnOnes", "ContestDefensiveLossPercentage", "Tackles", "TacklesInside50", "PressureActs", "Spoils", "RuckContests", "Hitouts", "HitoutsWinPercentage", "HitoutsToAdvantage", "HitoutsToAdvantagePercentage", "FreesFor", "FreesAgainst", "FreesDiff", "KickIns", "KickInsPlayOnPercentage", "Bounces", "OnePercenters"],
    "Against": ["RatingPoints_Opposition", "Supercoach_Opposition", "DreamTeamPoints_Opposition", "CoachesVotes_Opposition", "Kicks_Opposition", "Handballs_Opposition", "Disposals_Opposition", "DisposalEfficiency_Opposition", "KickingEfficiency_Opposition", "HandballEfficiency_Opposition", "OppositionDisposalsPerTackle", "Inside50s_Opposition", "Rebound50s_Opposition", "OppositionRebound50sPerInside50s", "MetresGained_Opposition", "MetresGainedPerDisposal_Opposition", "Clangers_Opposition", "DisposalsPerClanger_Opposition", "Turnovers_Opposition", "DisposalsPerTurnover_Opposition", "ContestedPossessions_Opposition", "UncontestedPossessions_Opposition", "TotalPossessions_Opposition", "ContestedPossessionRate_Opposition", "Intercepts_Opposition", "GroundBallGets_Opposition", "CentreClearances_Opposition", "StoppageClearances_Opposition", "TotalClearances_Opposition", "Marks_Opposition", "ContestedMarks_Opposition", "MarksInside50_Opposition", "MarksInside50PerInside50_Opposition", "InterceptMarks_Opposition", "MarksOnLead_Opposition", "Goals_Opposition", "Behinds_Opposition", "RushedBehinds_Opposition", "ShotsAtGoal_Opposition", "GoalAssists_Opposition", "GoalAccuracy_Opposition", "GoalsPerInside50_Opposition", "ScoringShotsPerInside50_Opposition", "ShotsPerInside50_Opposition", "ScoreInvolvements_Opposition", "ScoreLaunches_Opposition", "Tackles_Opposition", "TacklesInside50_Opposition", "PressureActs_Opposition", "Spoils_Opposition", "Hitouts_Opposition", "HitoutsWinPercentage_Opposition", "HitoutsToAdvantage_Opposition", "HitoutsToAdvantagePercentage_Opposition", "KickIns_Opposition", "KickInsPlayOnPercentage_Opposition", "Bounces_Opposition", "OnePercenters_Opposition"],
    "Difference": ["RatingPoints_Diff", "Supercoach_Diff", "DreamTeamPoints_Diff", "CoachesVotes_Diff", "Kicks_Diff", "Handballs_Diff", "Disposals_Diff", "Inside50s_Diff", "MetresGained_Diff", "Clangers_Diff", "Turnovers_Diff", "ContestedPossessions_Diff", "UncontestedPossessions_Diff", "TotalPossessions_Diff", "Intercepts_Diff", "GroundBallGets_Diff", "CentreClearances_Diff", "StoppageClearances_Diff", "TotalClearances_Diff", "Marks_Diff", "ContestedMarks_Diff", "MarksInside50_Diff", "InterceptMarks_Diff", "MarksOnLead_Diff", "Goals_Diff", "Behinds_Diff", "ShotsAtGoal_Diff", "GoalAssists_Diff", "ScoreInvolvements_Diff", "ScoreLaunches_Diff", "Tackles_Diff", "TacklesInside50_Diff", "PressureActs_Diff", "Spoils_Diff", "Hitouts_Diff", "HitoutsToAdvantage_Diff", "Bounces_Diff", "OnePercenters_Diff"]
};

const columnsToHide = [...columnsAlwaysHidden, ...statsColumns.For, ...statsColumns.Against, ...statsColumns.Difference];
const hiddenColumns = {
    "For": columnsToHide.filter((value) => { return !statsColumns.For.includes(value) }),
    "Against": columnsToHide.filter((value) => { return !statsColumns.Against.includes(value) }),
    "Difference": columnsToHide.filter((value) => { return !statsColumns.Difference.includes(value) })
}

const forButton = document.querySelector('#for-stats');
const againstButton = document.querySelector('#against-stats');
const differenceButton = document.querySelector('#difference-stats');

forButton.addEventListener('click', (e) => {
    Reactable.setHiddenColumns('team-stats-table', hiddenColumns.For);
    forButton.classList.add('btn-primary');
    forButton.classList.remove('btn-light');
    againstButton.classList.remove('btn-primary');
    againstButton.classList.add('btn-light');
    differenceButton.classList.remove('btn-primary');
    differenceButton.classList.add('btn-light');
});
againstButton.addEventListener('click', (e) => {
    Reactable.setHiddenColumns('team-stats-table', hiddenColumns.Against);
    forButton.classList.remove('btn-primary');
    forButton.classList.add('btn-light');
    againstButton.classList.add('btn-primary');
    againstButton.classList.remove('btn-light');
    differenceButton.classList.remove('btn-primary');
    differenceButton.classList.add('btn-light');
});
differenceButton.addEventListener('click', (e) => {
    Reactable.setHiddenColumns('team-stats-table', hiddenColumns.Difference);
    forButton.classList.remove('btn-primary');
    forButton.classList.add('btn-light');
    againstButton.classList.remove('btn-primary');
    againstButton.classList.add('btn-light');
    differenceButton.classList.add('btn-primary');
    differenceButton.classList.remove('btn-light');
});

window.addEventListener('DOMContentLoaded', (event) => {
    Reactable.setHiddenColumns('team-stats-table', hiddenColumns.For);
});

const csvDownloadButton = document.querySelector('#download-csv-button');
csvDownloadButton.addEventListener('click', (e) => {
    Reactable.downloadDataCSV('team-stats-table', `afl-team-stats-${year}.csv`, { columnIds: [...new Set([...columnsAlwaysDisplayed, ...statsColumns.For, ...statsColumns.Against, ...statsColumns.Difference])] });
    gtag('event', 'data_download');
});