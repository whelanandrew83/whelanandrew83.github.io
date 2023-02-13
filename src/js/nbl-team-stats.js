const columnsAlwaysHidden = ["Season", "Image", "M_OT", "Margin"];
const columnsAlwaysDisplayed = ["Team", "Matches", "Wins", "Losses"];

const statsColumns = {
    "For": ["Percentage", "WinPercentage", "Period1", "Period2", "Period3", "Period4", "Overtime", "Score", "Period1_Percentage", "Period2_Percentage", "Period3_Percentage", "Period4_Percentage", "Overtime_Percentage", "FieldGoalsMade", "FieldGoalsAttempted", "FieldGoalPercentage", "ThreePointersMade", "ThreePointersAttempted", "ThreePointPercentage", "EffectiveFieldGoalPercentage", "FreeThrowsMade", "FreeThrowsAttempted", "FreeThrowPercentage", "OffensiveRebounds", "DefensiveRebounds", "TotalRebounds", "Assists", "PersonalFouls", "Steals", "Turnovers", "Blocks", "Points", "PointsSecondChance", "PointsFastBreak", "PointsInThePaint", "TimeLeading", "TOR", "PPP"],
    "Against": ["Period1_Against", "Period2_Against", "Period3_Against", "Period4_Against", "Overtime_Against", "Score_Against", "FieldGoalsMade_Against", "FieldGoalsAttempted_Against", "FieldGoalPercentage_Against", "ThreePointersMade_Against", "ThreePointersAttempted_Against", "ThreePointPercentage_Against", "EffectiveFieldGoalPercentage_Against", "FreeThrowsMade_Against", "FreeThrowsAttempted_Against", "FreeThrowPercentage_Against", "OffensiveRebounds_Against", "DefensiveRebounds_Against", "TotalRebounds_Against", "Assists_Against", "PersonalFouls_Against", "Steals_Against", "Turnovers_Against", "Blocks_Against", "Points_Against", "PointsSecondChance_Against", "PointsFastBreak_Against", "PointsInThePaint_Against", "TOR_Against", "PPP_Against"]
};

const columnsToHide = [...columnsAlwaysHidden, ...statsColumns.For, ...statsColumns.Against];
const hiddenColumns = {
    "For": columnsToHide.filter((value) => { return !statsColumns.For.includes(value) }),
    "Against": columnsToHide.filter((value) => { return !statsColumns.Against.includes(value) })
}

const forButton = document.querySelector('#for-stats');
const againstButton = document.querySelector('#against-stats');

forButton.addEventListener('click', (e) => {
    Reactable.setHiddenColumns('team-stats-table', hiddenColumns.For);
    forButton.classList.add('btn-primary');
    forButton.classList.remove('btn-light');
    againstButton.classList.remove('btn-primary');
    againstButton.classList.add('btn-light');
});
againstButton.addEventListener('click', (e) => {
    Reactable.setHiddenColumns('team-stats-table', hiddenColumns.Against);
    forButton.classList.remove('btn-primary');
    forButton.classList.add('btn-light');
    againstButton.classList.add('btn-primary');
    againstButton.classList.remove('btn-light');
});

window.addEventListener('DOMContentLoaded', (event) => {
    Reactable.setHiddenColumns('team-stats-table', hiddenColumns.For);
});

const csvDownloadButton = document.querySelector('#download-csv-button');
csvDownloadButton.addEventListener('click', (e) => {
    Reactable.downloadDataCSV('team-stats-table', `nbl-team-stats.csv`, { columnIds: [...new Set([...columnsAlwaysDisplayed, ...statsColumns.For, ...statsColumns.Against])] });
    gtag('event', 'data_download');
});