const tableDataUrl = 'https://www.wheeloratings.com/src/player_profiles_tennis/table_data';
const profileUrl = `tennis_player_profile.html?ID`;
const excludeRows = 2;

const compareColumns = {
    "Age": { name: "Age", dec: 0 },
    "Matches": { name: "Matches", dec: 0 },
    "Wins": { name: "Wins", dec: 0 },
    "WinPercentage": { name: "Win %", dec: 1 },
    "EndOfYearElo": { name: "Elo (at year end)", dec: 0 },
    "EndOfYearEloRank": { name: "Elo Rank (at year end)", dec: 0, reverse: true },
    "EndOfYearEloServeRank": { name: "Elo Serve Rank (at year end)", dec: 0, reverse: true },
    "EndOfYearEloReturnRank": { name: "Elo Return Rank (at year end)", dec: 0, reverse: true },
    "RacePoints": { name: "Race Points", dec: 1 },
    "RacePoints_Avg": { name: "Race Points (average)", dec: 1 },
    "PointsWonPercentage": { name: "Points Won %", dec: 1 },
    "GamesWonPercentage": { name: "Games Won %", dec: 1 },
    "SetsWonPercentage": { name: "Sets Won %", dec: 1 },
    "ServeHeading": { name: "Serve Stats", heading: true },
    "FirstServePercentage": { name: "1st Serve %", dec: 1 },
    "FirstServeWonPercentage": { name: "1st Serve Won %", dec: 1 },
    "SecondServeWonPercentage": { name: "2nd Serve Won %", dec: 1 },
    "ServicePointsWonPercentage": { name: "Service Points Won %", dec: 1 },
    "ServiceGamesWonPercentage": { name: "Service Games Won %", dec: 1 },
    "AcePercentage": { name: "Ace %", dec: 1 },
    "DoubleFaultPercentage": { name: "Double Fault %", dec: 1, reverse: true },
    "BreakPointsSavedPercentage": { name: "Break Points Saved %", dec: 1 },
    "ReturnHeading": { name: "Return Stats", heading: true },
    "FirstServeReturnPointsWonPercentage": { name: "1st Serve Return Won %", dec: 1 },
    "SecondServeReturnPointsWonPercentage": { name: "2nd Serve Return Won %", dec: 1 },
    "ReturnPointsWonPercentage": { name: "Return Points Won %", dec: 1 },
    "ReturnGamesWonPercentage": { name: "Return Games Won %", dec: 1 },
    "AceAgainstPercentage": { name: "Opponent's Ace %", dec: 1, reverse: true },
    "BreakPointsConvertedPercentage": { name: "Break Points Converted %", dec: 1 }
};
