const chartColumns = {
    "Match": { name: "Match Number" },
    "RatingPoints": { name: "Player Rating" },
    "EstimatedRating": { name: "Predicted Rating" },
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
    "GroundBallGets": { name: "Ground Ball Gets", dec: 0 },
    "PostClearanceContestedPossessions": { name: "Post-Clearance Contested Possessions", dec: 0 },
    "PostClearanceGroundBallGets": { name: "Post-Clearance Ground Ball Gets", dec: 0 },
    "HandballReceives": { name: "Handball Receives", dec: 0 },
    "Intercepts": { name: "Intercept Possessions", dec: 0 },
    "CentreBounceAttendancePercentage": { name: "Centre Bounce Attendance %", dec: 0 },
    "TotalClearances": { name: "Total Clearances", dec: 0 },
    "Marks": { name: "Marks", dec: 0 },
    "ContestedMarks": { name: "Contested Marks", dec: 0 },
    "InterceptMarks": { name: "Intercept Marks", dec: 0 },
    "Goals": { name: "Goals", dec: 0 },
    "ShotsAtGoal": { name: "Shots At Goal", dec: 0 },
    "xScore": { name: "xScore", dec: 1 },
    "xScoreRating": { name: "xScore +/-", dec: 1 },
    "GoalAssists": { name: "Goal Assists", dec: 0 },
    "ScoreInvolvements": { name: "Score Involvements", dec: 0 },
    "ScoreLaunches": { name: "Score Launches", dec: 0 },
    "Tackles": { name: "Tackles", dec: 0 },
    "PressureActs": { name: "Pressure Acts", dec: 0 },
    "Hitouts": { name: "Hitouts", dec: 0 }
};

const defaultX = 'Match';
const defaultY = 'RatingPoints';
const reactableId = 'match-stats';

let labelColumns = ['Season', 'RoundNumber'];

let highlightColumns = {
    'Season': {
        name: 'Season',
        default: null
    },
    'Result': {
        name: 'Result',
        default: null
    },
    'Milestone': {
        name: 'Milestone',
        default: 'Yes'
    },
    'Opposition': {
        name: 'Opposition',
        default: null
    }
};
let highlightColumn = 'Opposition';