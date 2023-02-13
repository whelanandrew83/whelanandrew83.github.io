const chartColumns = {
    "Summary_Heading": { name: "Summary Stats", heading: true },
    "Wins": { name: "Wins" },
    "Losses": { name: "Losses" },
    "Percentage": { name: "Percentage" },
    "WinPercentage": { name: "Win Percentage" },
    "Team_Heading": { name: "Team Averages", heading: true },
    "FieldGoalsMade": { name: "Field goals made" },
    "FieldGoalsAttempted": { name: "Field goal attempts" },
    "FieldGoalPercentage": { name: "Field goal percentage" },
    "ThreePointersMade": { name: "Three-point shots made" },
    "ThreePointersAttempted": { name: "Three-point shot attempts" },
    "ThreePointPercentage": { name: "Three-point percentage" },
    "EffectiveFieldGoalPercentage": { name: "Effective field goal percentage" },
    "FreeThrowsMade": { name: "Free throws made" },
    "FreeThrowsAttempted": { name: "Free throw attempts" },
    "FreeThrowPercentage": { name: "Free throw percentage" },
    "OffensiveRebounds": { name: "Offensive rebounds" },
    "DefensiveRebounds": { name: "Defensive rebounds" },
    "TotalRebounds": { name: "Total rebounds" },
    "Assists": { name: "Assists" },
    "PersonalFouls": { name: "Personal Fouls" },
    "Steals": { name: "Steals" },
    "Turnovers": { name: "Turnovers" },
    "Blocks": { name: "Blocks" },
    "Points": { name: "Points" },
    "TimeLeading": { name: "Time Leading" },
    "TOR": { name: "Turnover ratio" },
    "PPP": { name: "Points per possession" },
    "Opposition_Heading": { name: "Opposition Averages", heading: true },
    "FieldGoalsMade_Against": { name: "Field goals made (Opposition)" },
    "FieldGoalsAttempted_Against": { name: "Field goal attempts (Opposition)" },
    "FieldGoalPercentage_Against": { name: "Field goal percentage (Opposition)" },
    "ThreePointersMade_Against": { name: "Three-point shots made (Opposition)" },
    "ThreePointersAttempted_Against": { name: "Three-point shot attempts (Opposition)" },
    "ThreePointPercentage_Against": { name: "Three-point percentage (Opposition)" },
    "EffectiveFieldGoalPercentage_Against": { name: "Effective field goal percentage (Opposition)" },
    "FreeThrowsMade_Against": { name: "Free throws made (Opposition)" },
    "FreeThrowsAttempted_Against": { name: "Free throw attempts (Opposition)" },
    "FreeThrowPercentage_Against": { name: "Free throw percentage (Opposition)" },
    "OffensiveRebounds_Against": { name: "Offensive rebounds (Opposition)" },
    "DefensiveRebounds_Against": { name: "Defensive rebounds (Opposition)" },
    "TotalRebounds_Against": { name: "Total rebounds (Opposition)" },
    "Assists_Against": { name: "Assists (Opposition)" },
    "PersonalFouls_Against": { name: "Personal Fouls (Opposition)" },
    "Steals_Against": { name: "Steals (Opposition)" },
    "Turnovers_Against": { name: "Turnovers (Opposition)" },
    "Blocks_Against": { name: "Blocks (Opposition)" },
    "Points_Against": { name: "Points (Opposition)" },
    "TOR_Against": { name: "Turnover ratio (Opposition)" },
    "PPP_Against": { name: "Points per possession (Opposition)" }
};

const defaultX = 'WinPercentage';
const defaultY = 'Percentage';
const reactableId = 'team-stats-table';

let labelColumns = ['Team'];

let highlightColumn = 'Team';
let pointImageColumn = 'Image';