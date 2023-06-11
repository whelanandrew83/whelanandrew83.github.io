const chartColumns = {
    "Match": { name: "Match Number" },
    "RatingPoints": { name: "Player Rating" },
    "EstimatedRating": { name: "Estimated Rating" },
    "Supercoach": { name: "Supercoach Points", dec: 0 },
    "DreamTeamPoints": { name: "Fantasy Points", dec: 0 },
    "CoachesVotes": { name: "Coaches Votes", dec: 0 },
    "TimeOnGround": { name: "Time On Ground", dec: 0 },
    "Kicks": { name: "Kicks", dec: 0 },
    "Handballs": { name: "Handballs", dec: 0 },
    "Disposals": { name: "Disposals", dec: 0 },
    "DisposalEfficiency": { name: "Disposal Efficiency" },
    "Inside50s": { name: "Inside 50s", dec: 0 },
    "MetresGained": { name: "Metres Gained", dec: 0 },
    "ContestedPossessions": { name: "Contested Possessions", dec: 0 },
    "CentreBounceAttendancePercentage": { name: "Centre Bounce Attendance %", dec: 0 },
    "TotalClearances": { name: "Total Clearances", dec: 0 },
    "Marks": { name: "Marks", dec: 0 },
    "ContestedMarks": { name: "Contested Marks", dec: 0 },
    "Goals": { name: "Goals", dec: 0 },
    "ShotsAtGoal": { name: "Shots At Goal", dec: 0 },
    "GoalAssists": { name: "Goal Assists", dec: 0 },
    "ScoreInvolvements": { name: "Score Involvements", dec: 0 },
    "Tackles": { name: "Tackles", dec: 0 },
    "Hitouts": { name: "Hitouts", dec: 0 }
};

const defaultX = 'Match';
const defaultY = 'RatingPoints';
const reactableId = 'match-stats';

let labelColumns = ['Player', 'Match'];

let highlightColumns = {
    'Season': {
        name: 'Season',
        default: '_max'
    },
    'Opposition': {
        name: 'Opposition',
        default: null
    }
};
let highlightColumn = 'Opposition';