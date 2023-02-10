const chartColumns = {
    "Team_Heading": { name: "Team Averages", heading: true },
    "RatingPoints": { name: "Rating Points" },
    "Supercoach": { name: "Supercoach Points" },
    "DreamTeamPoints": { name: "Fantasy Points" },
    "CoachesVotes": { name: "Coaches Votes (Average)" },
    "Kicks": { name: "Kicks" },
    "Handballs": { name: "Handballs" },
    "Disposals": { name: "Disposals" },
    "DisposalEfficiency": { name: "Disposal Efficiency" },
    "KickingEfficiency": { name: "Kicking Efficiency" },
    "Inside50s": { name: "Inside 50s" },
    "MetresGained": { name: "Metres Gained" },
    "ContestedPossessions": { name: "Contested Possessions" },
    "CentreClearances": { name: "Centre Clearances" },
    "TotalClearances": { name: "Total Clearances" },
    "Marks": { name: "Marks" },
    "ContestedMarks": { name: "Contested Marks" },
    "Goals": { name: "Goals" },
    "ShotsAtGoal": { name: "Shots At Goal" },
    "GoalAssists": { name: "Goal Assists" },
    "GoalAccuracy": { name: "Goal Accuracy" },
    "GoalsPerInside50": { name: "Goals / Inside50" },
    "ScoringShotsPerInside50": { name: "Scoring Shots / Inside50" },
    "GoalAccuracy": { name: "Goal Accuracy" },
    "ContestOffensiveOneOnOnes": { name: "Offensive one-on-one contests" },
    "ContestOffensiveWinPercentage": { name: "Offensive one-on-one win %" },
    "ContestDefensiveOneOnOnes": { name: "Defensive one-on-one contests" },
    "ContestDefensiveLossPercentage": { name: "Defensive one-on-one loss %" },
    "Tackles": { name: "Tackles" },
    "Spoils": { name: "Spoils" },
    "HitoutsWinPercentage": { name: "Hitout Win %" },
    "HitoutsToAdvantagePercentage": { name: "Hitout To Advantage %" },
    "Opposition_Heading": { name: "Opposition Averages", heading: true },
    "RatingPoints_Opposition": { name: "Rating Points (Opposition)" },
    "Disposals_Opposition": { name: "Disposals (Opposition)" },
    "Inside50s_Opposition": { name: "Inside 50s (Opposition)" },
    "MetresGained_Opposition": { name: "Metres Gained (Opposition)" },
    "ContestedPossessions_Opposition": { name: "Contested Possessions (Opposition)" },
    "CentreClearances_Opposition": { name: "Centre Clearances (Opposition)" },
    "TotalClearances_Opposition": { name: "Total Clearances (Opposition)" },
    "Marks_Opposition": { name: "Marks (Opposition)" },
    "ContestedMarks_Opposition": { name: "Contested Marks (Opposition)" },
    "Goals_Opposition": { name: "Goals (Opposition)" },
    "ShotsAtGoal_Opposition": { name: "Shots At Goal (Opposition)" },
    "GoalAccuracy_Opposition": { name: "Goal Accuracy (Opposition)" },
    "GoalsPerInside50_Opposition": { name: "Goals / Inside50 (Opposition)" },
    "ScoringShotsPerInside50_Opposition": { name: "Scoring Shots / Inside50 (Opposition)" },
    "GoalAccuracy_Opposition": { name: "Goal Accuracy (Opposition)" },
    "HitoutsToAdvantagePercentage_Opposition": { name: "Hitout To Advantage % (Opposition)" },
    "Difference_Heading": { name: "Differences", heading: true },
    "RatingPoints_Diff": { name: "Rating Points (Difference)" },
    "Disposals_Diff": { name: "Disposals (Difference)" },
    "Inside50s_Diff": { name: "Inside 50s (Difference)" },
    "MetresGained_Diff": { name: "Metres Gained (Difference)" },
    "ContestedPossessions_Diff": { name: "Contested Possessions (Difference)" },
    "CentreClearances_Diff": { name: "Centre Clearances (Difference)" },
    "TotalClearances_Diff": { name: "Total Clearances (Difference)" },
    "Marks_Diff": { name: "Marks (Difference)" },
    "ContestedMarks_Diff": { name: "Contested Marks (Difference)" },
    "Goals_Diff": { name: "Goals (Difference)" },
    "ShotsAtGoal_Diff": { name: "Shots At Goal (Difference)" }
};

const defaultX = 'Goals';
const defaultY = 'RatingPoints';
const reactableId = 'team-stats-table';

let labelColumns = ['Team'];

let highlightColumn = 'Team';

const viewChartButtonTemp = document.createElement('button');
viewChartButtonTemp.id = "view-chart-button";
viewChartButtonTemp.classList = "btn btn-primary btn-sm mx-1 my-2";
viewChartButtonTemp.innerText = "View scatter chart";

const csvDownloadButtonTemp = document.querySelector('#download-csv-button');
csvDownloadButtonTemp.insertAdjacentElement('beforebegin', viewChartButtonTemp);