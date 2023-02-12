const chartColumns = {
    "Minutes_A": { name: "Minutes" },
    "FieldGoalsMade_A": { name: "Field goals made" },
    "FieldGoalsAttempted_A": { name: "Field goal attempts" },
    "FieldGoalPercentage": { name: "Field goal percentage " },
    "ThreePointersMade_A": { name: "Three-point shots made" },
    "ThreePointersAttempted_A": { name: "Three-point shot attempts" },
    "ThreePointPercentage": { name: "Three-point percentage" },
    "EffectiveFieldGoalPercentage": { name: "Effective field goal percentage" },
    "FreeThrowsMade_A": { name: "Free throws made" },
    "FreeThrowsAttempted_A": { name: "Free throw attempts" },
    "FreeThrowPercentage": { name: "Free throw percentage" },
    "OffensiveRebounds_A": { name: "Offensive rebounds" },
    "DefensiveRebounds_A": { name: "Defensive rebounds" },
    "TotalRebounds_A": { name: "Total rebounds" },
    "Assists_A": { name: "Assists" },
    "PersonalFouls_A": { name: "Personal Fouls" },
    "Steals_A": { name: "Steals" },
    "Turnovers_A": { name: "Turnovers" },
    "Blocks_A": { name: "Blocks" },
    "Points_A": { name: "Points" },
    "PlusMinusPoints_A": { name: "Plus-Minus points" },
    "TOR": { name: "Turnover ratio" },
    "PPP": { name: "Points per possession" },
    "PIE": { name: "Player Impact Estimate" },
    "FP": { name: "Fantasy points" },
    "FIC": { name: "Floor Impact Counter" },
    "ARR": { name: "All-Round Rating" }
};

const defaultX = 'Points_A';
const defaultY = 'PlusMinusPoints_A';
const reactableId = 'player-stats-table';

let labelColumns = ['Player', 'Team'];

let highlightColumn = 'Team';

const viewChartButtonTemp = document.createElement('button');
viewChartButtonTemp.id = "view-chart-button";
viewChartButtonTemp.classList = "btn btn-primary btn-sm mx-1 my-2";
viewChartButtonTemp.innerText = "View scatter chart";