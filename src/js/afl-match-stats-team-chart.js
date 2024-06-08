const chartColumns = {
    "Match": { name: "Match Number" },
    "Margin": { name: "Margin" },
    "xMargin": { name: "xMargin" },
    "RatingPoints": { name: "Player Rating" },

    "Team_Heading": { name: "Team Averages", heading: true },
    "Age": { name: "Age" },
    "Experience": { name: "Experience" },
    "RatingPoints": { name: "Player Rating" },
    "Supercoach": { name: "Supercoach Points", dec: 0 },
    "CoachesVotes": { name: "Coaches Votes", dec: 0 },
    "Kicks": { name: "Kicks", dec: 0 },
    "Handballs": { name: "Handballs", dec: 0 },
    "Disposals": { name: "Disposals", dec: 0 },
    "DisposalEfficiency": { name: "Disposal Efficiency" },
    "Inside50s": { name: "Inside 50s", dec: 0 },
    "MetresGained": { name: "Metres Gained", dec: 0 },
    "ContestedPossessions": { name: "Contested Possessions", dec: 0 },
    "GroundBallGets": { name: "Ground Ball Gets", dec: 0 },
    "Intercepts": { name: "Intercept Possessions", dec: 0 },
    "TotalClearances": { name: "Total Clearances", dec: 0 },
    "Marks": { name: "Marks", dec: 0 },
    "ContestedMarks": { name: "Contested Marks", dec: 0 },
    "InterceptMarks": { name: "Intercept Marks", dec: 0 },
    "ShotsAtGoal": { name: "Shots At Goal", dec: 0 },
    "Goals": { name: "Goals", dec: 0 },
    "Score": { name: "Score", dec: 0 },
    "xScore": { name: "xScore", dec: 1 },
    "xScoreRating": { name: "xScore +/-", dec: 1 },
    "GoalAssists": { name: "Goal Assists", dec: 0 },
    "Tackles": { name: "Tackles", dec: 0 },
    "PointsFromKickIn": { name: "Points from Kick-in", dec: 0 },
    "PointsFromStoppage": { name: "Points from Stoppage", dec: 0 },
    "PointsFromTurnover": { name: "Points from Turnover", dec: 0 },
    "PointsFromDefensiveHalf": { name: "Points from Defensive Half", dec: 0 },
    "PointsFromForwardHalf": { name: "Points from Forward Half", dec: 0 },
    "PointsFromCentreBounce": { name: "Points from Centre Bounce", dec: 0 },

    "Opposition_Heading": { name: "Opposition Averages", heading: true },
    "Age_Opposition": { name: "Age (Opposition)" },
    "Experience_Opposition": { name: "Experience (Opposition)" },
    "RatingPoints_Opposition": { name: "Player Rating (Opposition)" },
    "Kicks_Opposition": { name: "Kicks (Opposition)", dec: 0 },
    "Handballs_Opposition": { name: "Handballs (Opposition)", dec: 0 },
    "Disposals_Opposition": { name: "Disposals (Opposition)", dec: 0 },
    "Inside50s_Opposition": { name: "Inside 50s (Opposition)", dec: 0 },
    "MetresGained_Opposition": { name: "Metres Gained (Opposition)", dec: 0 },
    "ContestedPossessions_Opposition": { name: "Contested Possessions (Opposition)", dec: 0 },
    "GroundBallGets_Opposition": { name: "Ground Ball Gets (Opposition)", dec: 0 },
    "Intercepts_Opposition": { name: "Intercept Possessions (Opposition)", dec: 0 },
    "TotalClearances_Opposition": { name: "Total Clearances (Opposition)", dec: 0 },
    "Marks_Opposition": { name: "Marks (Opposition)", dec: 0 },
    "ContestedMarks_Opposition": { name: "Contested Marks (Opposition)", dec: 0 },
    "InterceptMarks_Opposition": { name: "Intercept Marks (Opposition)", dec: 0 },
    "ShotsAtGoal_Opposition": { name: "Shots At Goal (Opposition)", dec: 0 },
    "Goals_Opposition": { name: "Goals (Opposition)", dec: 0 },
    "Score_Opposition": { name: "Score (Opposition)", dec: 0 },
    "xScore_Opposition": { name: "xScore (Opposition)", dec: 1 },
    "xScoreRating_Opposition": { name: "xScore +/- (Opposition)", dec: 1 },
    "GoalAssists_Opposition": { name: "Goal Assists (Opposition)", dec: 0 },
    "Tackles_Opposition": { name: "Tackles (Opposition)", dec: 0 },
    "PointsFromKickIn_Opposition": { name: "Points from Kick-in (Opposition)", dec: 0 },
    "PointsFromStoppage_Opposition": { name: "Points from Stoppage (Opposition)", dec: 0 },
    "PointsFromTurnover_Opposition": { name: "Points from Turnover (Opposition)", dec: 0 },
    "PointsFromDefensiveHalf_Opposition": { name: "Points from Defensive Half (Opposition)", dec: 0 },
    "PointsFromForwardHalf_Opposition": { name: "Points from Forward Half (Opposition)", dec: 0 },
    "PointsFromCentreBounce_Opposition": { name: "Points from Centre Bounce (Opposition)", dec: 0 },

    "Difference_Heading": { name: "Differences", heading: true },
    "Age_Diff": { name: "Age (Difference)" },
    "Experience_Diff": { name: "Experience (Difference)" },
    "RatingPoints_Diff": { name: "Player Rating (Difference)" },
    "Kicks_Diff": { name: "Kicks (Difference)", dec: 0 },
    "Handballs_Diff": { name: "Handballs (Difference)", dec: 0 },
    "Disposals_Diff": { name: "Disposals (Difference)", dec: 0 },
    "Inside50s_Diff": { name: "Inside 50s (Difference)", dec: 0 },
    "MetresGained_Diff": { name: "Metres Gained (Difference)", dec: 0 },
    "ContestedPossessions_Diff": { name: "Contested Possessions (Difference)", dec: 0 },
    "GroundBallGets_Diff": { name: "Ground Ball Gets (Difference)", dec: 0 },
    "Intercepts_Diff": { name: "Intercept Possessions (Difference)", dec: 0 },
    "TotalClearances_Diff": { name: "Total Clearances (Difference)", dec: 0 },
    "Marks_Diff": { name: "Marks (Difference)", dec: 0 },
    "ContestedMarks_Diff": { name: "Contested Marks (Difference)", dec: 0 },
    "InterceptMarks_Diff": { name: "Intercept Marks (Difference)", dec: 0 },
    "ShotsAtGoal_Diff": { name: "Shots At Goal (Difference)", dec: 0 },
    "Goals_Diff": { name: "Goals (Difference)", dec: 0 },
    "xScoreRating_Diff": { name: "xScore +/- (Difference)", dec: 1 },
    "GoalAssists_Diff": { name: "Goal Assists (Difference)", dec: 0 },
    "Tackles_Diff": { name: "Tackles (Difference)", dec: 0 },
    "PointsFromKickIn_Diff": { name: "Points from Kick-in (Difference)", dec: 0 },
    "PointsFromStoppage_Diff": { name: "Points from Stoppage (Difference)", dec: 0 },
    "PointsFromTurnover_Diff": { name: "Points from Turnover (Difference)", dec: 0 },
    "PointsFromDefensiveHalf_Diff": { name: "Points from Defensive Half (Difference)", dec: 0 },
    "PointsFromForwardHalf_Diff": { name: "Points from Forward Half (Difference)", dec: 0 },
    "PointsFromCentreBounce_Diff": { name: "Points from Centre Bounce (Difference)", dec: 0 }
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
    'Opposition': {
        name: 'Opposition',
        default: null
    }
};
let highlightColumn = 'Opposition';