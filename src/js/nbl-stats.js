const columnsAlwaysHidden = ["Season", "Image"];
const columnsAlwaysDisplayed = ["Player", "Team", "Matches", "Starter", "Minutes_A"];

const statsColumns = {
    "Averages": ["FieldGoalsMade_A", "FieldGoalsAttempted_A", "FieldGoalPercentage", "ThreePointersMade_A", "ThreePointersAttempted_A", "ThreePointPercentage", "EffectiveFieldGoalPercentage", "FreeThrowsMade_A", "FreeThrowsAttempted_A", "FreeThrowPercentage", "OffensiveRebounds_A", "DefensiveRebounds_A", "TotalRebounds_A", "Assists_A", "PersonalFouls_A", "FoulsOn_A", "Steals_A", "Turnovers_A", "Blocks_A", "BlocksReceived_A", "Points_A", "PointsSecondChance_A", "PointsFastBreak_A", "PointsInThePaint_A", "DD", "TD", "PlusMinusPoints_A", "TOR", "PPP", "PIE", "Supercoach", "FP", "FIC", "ARR"],
    "Per40": ["FieldGoalsMade_40", "FieldGoalsAttempted_40", "ThreePointersMade_40", "ThreePointersAttempted_40", "FreeThrowsMade_40", "FreeThrowsAttempted_40", "OffensiveRebounds_40", "DefensiveRebounds_40", "TotalRebounds_40", "Assists_40", "PersonalFouls_40", "FoulsOn_40", "Steals_40", "Turnovers_40", "Blocks_40", "BlocksReceived_40", "Points_40", "PointsSecondChance_40", "PointsFastBreak_40", "PointsInThePaint_40", "PlusMinusPoints_40", "Supercoach_40", "FP_40", "FIC_40", "ARR_40"]
};

const filterColumns = {
    'Matches': 'Games played',
    'Starter': 'Games started',
    'Minutes_A': 'Minutes per game',
    "FieldGoalsMade_A": "Field goals made per game",
    "FieldGoalsAttempted_A": "Field goal attempts per game",
    "FieldGoalPercentage": "Field goal percentage",
    "ThreePointersMade_A": "Three-point shots made per game",
    "ThreePointersAttempted_A": "Three-point shot attempts per game",
    "ThreePointPercentage": "Three-point percentage",
    "EffectiveFieldGoalPercentage": "Effective field goal percentage",
    "FreeThrowsMade_A": "Free throws made per game",
    "FreeThrowsAttempted_A": "Free throw attempts per game",
    "FreeThrowPercentage": "Free throw percentage",
    "OffensiveRebounds_A": "Offensive rebounds per game",
    "DefensiveRebounds_A": "Defensive rebounds per game",
    "TotalRebounds_A": "Total rebounds per game",
    "Assists_A": "Assists per game",
    "PersonalFouls_A": "Personal fouls per game",
    "Steals_A": "Steals per game",
    "Turnovers_A": "Turnovers per game",
    "Blocks_A": "Blocks per game",
    "Points_A": "Points per game",
    "PlusMinusPoints_A": "Plus-Minus points per game"
}

const filterColumnsDefault = ['Matches', 'Minutes_A']

const columnsToHide = [...columnsAlwaysHidden, ...statsColumns.Averages, ...statsColumns.Per40];
const hiddenColumns = {
    "Averages": columnsToHide.filter((value) => { return !statsColumns.Averages.includes(value) }),
    "Per40": columnsToHide.filter((value) => { return !statsColumns.Per40.includes(value) })
}

const averagesButton = document.querySelector('#average-stats');
const per40Button = document.querySelector('#per40-stats');

averagesButton.addEventListener('click', (e) => {
    Reactable.setHiddenColumns('player-stats-table', hiddenColumns.Averages);
    averagesButton.classList.add('btn-primary');
    averagesButton.classList.remove('btn-light');
    per40Button.classList.remove('btn-primary');
    per40Button.classList.add('btn-light');
});
per40Button.addEventListener('click', (e) => {
    Reactable.setHiddenColumns('player-stats-table', hiddenColumns.Per40);
    averagesButton.classList.remove('btn-primary');
    averagesButton.classList.add('btn-light');
    per40Button.classList.add('btn-primary');
    per40Button.classList.remove('btn-light');
});

window.addEventListener('DOMContentLoaded', (event) => {
    Reactable.setHiddenColumns('player-stats-table', hiddenColumns.Averages);
});

const csvDownloadButton = document.querySelector('#download-csv-button');
csvDownloadButton.addEventListener('click', (e) => {
    Reactable.downloadDataCSV('player-stats-table', `nbl-player-stats.csv`, { columnIds: [...new Set([...columnsAlwaysDisplayed, ...statsColumns.Averages, ...statsColumns.Per40])] });
    gtag('event', 'data_download');
});