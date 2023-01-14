const tableDataUrl = 'https://www.wheeloratings.com/src/player_profiles/table_data';
const profileUrl = "afl_player_profile.html?ID";
const excludeRows = 1;

const compareColumns = {
    "Age": { name: "Age", dec: 0 },
    "Matches": { name: "Matches", dec: 0 },
    "RatingPoints_Avg": { name: "Player Rating", dec: 2 },
    "Supercoach_Avg": { name: "Supercoach Points", dec: 1 },
    "DreamTeamPoints_Avg": { name: "Fantasy Points", dec: 1 },
    "CoachesVotes_Total": { name: "Coaches Votes", dec: 0 },
    "CoachesVotes_Avg": { name: "Coaches Votes (Average)", dec: 2 },
    "TimeOnGround": { name: "Time On Ground", dec: 1 },
    "Disposals": { name: "Disposals", dec: 1 },
    "DisposalEfficiency": { name: "Disposal Efficiency", dec: 1 },
    "KickingEfficiency": { name: "Kicking Efficiency", dec: 1 },
    "Inside50s": { name: "Inside 50s", dec: 1 },
    "MetresGained": { name: "Metres Gained", dec: 1 },
    "ContestedPossessions": { name: "Contested Possessions", dec: 1 },
    "CentreClearances": { name: "Centre Clearances", dec: 1 },
    "TotalClearances": { name: "Total Clearances", dec: 1 },
    "Marks": { name: "Marks", dec: 1 },
    "ContestedMarks": { name: "Contested Marks", dec: 1 },
    "Hitouts": { name: "Hitouts", dec: 1 },
    "HitoutsWinPercentage": { name: "Hitout Win %", dec: 1 },
    "HitoutsToAdvantage": { name: "Hitout To Advantage", dec: 1 },
    "Tackles": { name: "Tackles", dec: 1 },
    "Goals_Total": { name: "Goals (Total)", dec: 0 },
    "Goals_Avg": { name: "Goals (Average)", dec: 1 },
    "ShotsAtGoal": { name: "Shots At Goal", dec: 1 },
    "GoalAssists": { name: "Goal Assists", dec: 1 },
    "ScoreInvolvements": { name: "Score Involvements", dec: 1 },
    "ScoreInvolvementPercentage": { name: "Score Involvement %", dec: 1 }
};
