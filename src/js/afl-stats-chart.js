const chartColumns = {
    "RatingPoints_Avg": { name: "Rating Points" },
    "Supercoach_Avg": { name: "Supercoach Points" },
    "DreamTeamPoints_Avg": { name: "Fantasy Points" },
    "CoachesVotes_Total": { name: "Coaches Votes", dec: 0 },
    "CoachesVotes_Avg": { name: "Coaches Votes (Average)" },
    "Age": { name: "Age", dec: 0 },
    "TimeOnGround": { name: "Time On Ground" },
    "Kicks": { name: "Kicks" },
    "Handballs": { name: "Handballs" },
    "Disposals": { name: "Disposals" },
    "DisposalEfficiency": { name: "Disposal Efficiency" },
    "KickingEfficiency": { name: "Kicking Efficiency" },
    "Inside50s": { name: "Inside 50s" },
    "MetresGained": { name: "Metres Gained" },
    "ContestedPossessions": { name: "Contested Possessions" },
    "CentreBounceAttendances": { name: "Centre Bounce Attendances" },
    "CentreClearances": { name: "Centre Clearances" },
    "TotalClearances": { name: "Total Clearances" },
    "Marks": { name: "Marks" },
    "ContestedMarks": { name: "Contested Marks" },
    "Goals_Total": { name: "Goals (Total)", dec: 0 },
    "Goals_Avg": { name: "Goals (Average)" },
    "ShotsAtGoal": { name: "Shots At Goal" },
    "GoalAssists": { name: "Goal Assists" },
    "GoalAccuracy": { name: "Goal Accuracy" },
    "ScoreInvolvements": { name: "Score Involvements" },
    "ScoreInvolvementPercentage": { name: "Score Involvement %" },
    "ContestOffensiveOneOnOnes": { name: "Offensive one-on-one contests" },
    "ContestOffensiveWinPercentage": { name: "Offensive one-on-one win %" },
    "ContestDefensiveOneOnOnes": { name: "Defensive one-on-one contests" },
    "ContestDefensiveLossPercentage": { name: "Defensive one-on-one loss %" },
    "Tackles": { name: "Tackles" },
    "Spoils": { name: "Spoils" },
    "RuckContests": { name: "Ruck Contests" },
    "Hitouts": { name: "Hitouts" },
    "HitoutsWinPercentage": { name: "Hitout Win %" },
    "HitoutsToAdvantagePercentage": { name: "Hitout To Advantage %" }
};

const defaultX = 'Disposals';
const defaultY = 'RatingPoints_Avg';
const reactableId = 'player-stats-table';

let labelColumns = ['Player', 'Team'];

let highlightColumns = {
    'Team': {
        name: 'Team',
        default: null
    },
    'Position': {
        name: 'Position',
        default: null
    },
    'Age': {
        name: 'Age',
        default: null
    }
};
let highlightColumn = 'Team';

const viewChartButtonTemp = document.createElement('button');
viewChartButtonTemp.id = "view-chart-button";
viewChartButtonTemp.classList = "btn btn-primary btn-sm mx-1 my-2";
viewChartButtonTemp.innerText = "View scatter chart";

filtersDiv.insertAdjacentElement('afterend', viewChartButtonTemp);