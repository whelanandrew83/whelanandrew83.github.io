const chartColumns = {
    "RatingPoints_Avg": { name: "Player Rating" },
    "Supercoach_Avg": { name: "Supercoach Points" },
    "DreamTeamPoints_Avg": { name: "Fantasy Points" },
    "CoachesVotes_Total": { name: "Coaches Votes", dec: 0 },
    "CoachesVotes_Avg": { name: "Coaches Votes (Average)" },
    "Age": { name: "Age", dec: 0 },
    "Age_Decimal": { name: "Age (Decimal)" },
    "TimeOnGround": { name: "Time On Ground" },
    "Kicks": { name: "Kicks" },
    "Handballs": { name: "Handballs" },
    "Disposals": { name: "Disposals" },
    "DisposalEfficiency": { name: "Disposal Efficiency" },
    "KickingEfficiency": { name: "Kicking Efficiency" },
    "Inside50s": { name: "Inside 50s" },
    "Rebound50s": { name: "Rebound 50s" },
    "MetresGained": { name: "Metres Gained" },
    "MetresGainedPerDisposal": { name: "Metres Gained / Disposal" },
    "Turnovers": { name: "Turnovers" },
    "xThreatPerKick": { name: "xThreat / Kick" },
    "ThreatRating": { name: "Threat Rating" },
    "xRetainPerKick": { name: "xRetain / Kick" },
    "RetentionRating": { name: "Retention Rating" },
    "ContestedPossessions": { name: "Contested Possessions" },
    "TotalPossessions": { name: "Total Possessions" },
    "Intercepts": { name: "Intercept Possessions" },
    "GroundBallGets": { name: "Ground Ball Gets" },
    "HardBallGets": { name: "Hard Ball Gets" },
    "LooseBallGets": { name: "Loose Ball Gets" },
    "PostClearanceContestedPossessions": { name: "Post-Clearance Contested Possessions" },
    "PostClearanceGroundBallGets": { name: "Post-Clearance Ground Ball Gets" },
    "GathersFromHitout": { name: "Gathers from Hitout" },
    "CrumbingPossessions": { name: "Crumbing Possessions" },
    "HandballReceives": { name: "Handball Receives" },
    "CentreBounceAttendances": { name: "Centre Bounce Attendances" },
    "CentreBounceAttendancePercentage": { name: "Centre Bounce Attendance %" },
    "CentreClearances": { name: "Centre Clearances" },
    "TotalClearances": { name: "Total Clearances" },
    "FirstPossessions": { name: "First Possessions" },
    "FirstPossessionToClearance": { name: "First Possession To Clearance %" },
    "Marks": { name: "Marks" },
    "MarksInside50": { name: "Marks Inside 50" },
    "ContestedMarks": { name: "Contested Marks" },
    "InterceptMarks": { name: "Intercept Marks" },
    "Goals_Total": { name: "Goals (Total)", dec: 0 },
    "Goals_Avg": { name: "Goals (Average)" },
    "ShotsAtGoal": { name: "Shots At Goal" },
    "GoalAssists": { name: "Goal Assists" },
    "GoalAccuracy": { name: "Goal Accuracy" },
    "ScoreInvolvements": { name: "Score Involvements" },
    "ScoreInvolvementPercentage": { name: "Score Involvement %" },
    "xScorePerShot": { name: "xScore / Shot", dec: 2 },
    "xScoreRatingPerShot": { name: "xScore Rating / Shot", dec: 2 },
    "xScorePerShot_Set": { name: "xScore / Shot (Set Shots)", dec: 2 },
    "xScoreRatingPerShot_Set": { name: "xScore Rating / Shot (Set Shots)", dec: 2 },
    "xScorePerShot_General": { name: "xScore / Shot (General Play)", dec: 2 },
    "xScoreRatingPerShot_General": { name: "xScore Rating / Shot (General Play)", dec: 2 },
    "ContestOffensiveOneOnOnes": { name: "Offensive one-on-one contests" },
    "ContestOffensiveWinPercentage": { name: "Offensive one-on-one win %" },
    "ContestDefensiveOneOnOnes": { name: "Defensive one-on-one contests" },
    "ContestDefensiveLossPercentage": { name: "Defensive one-on-one loss %" },
    "Tackles": { name: "Tackles" },
    "TacklesInside50": { name: "Tackles Inside 50" },
    "PressureActs": { name: "Pressure Acts" },
    "PressureActsDefensiveHalf": { name: "Defensive Half Pressure Acts" },
    "Spoils": { name: "Spoils" },
    "RuckContests": { name: "Ruck Contests" },
    "RuckContestPercentage": { name: "Ruck Contest %" },
    "Hitouts": { name: "Hitouts" },
    "HitoutsWinPercentage": { name: "Hitout Win %" },
    "HitoutsToAdvantagePercentage": { name: "Hitout To Advantage %" },
    "RuckHardBallGets": { name: "Ruck Hard Ball Gets" }
};

const defaultX = 'Disposals';
const defaultY = 'RatingPoints_Avg';

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
let pointImageColumn = 'Image';

const viewChartButtonTemp = document.createElement('button');
viewChartButtonTemp.id = "view-chart-button";
viewChartButtonTemp.classList = "btn btn-primary btn-sm mx-1 my-2";
viewChartButtonTemp.innerText = "View scatter chart";

filtersDiv.insertAdjacentElement('afterend', viewChartButtonTemp);