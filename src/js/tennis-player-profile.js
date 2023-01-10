const tableDataUrl = 'https://www.wheeloratings.com/src/player_profiles_tennis/table_data';
const profileUrl = `tennis_player_profile.html?ID`;

const compareColumns = {
    "Age": { name: "Age", dec: 0 },
    "Matches": { name: "Matches", dec: 0 },
    "Wins": { name: "Wins", dec: 0 },
    "WinPercentage": { name: "Win %", dec: 1 },
    "RacePoints": { name: "Race Points", dec: 1 },
    "PointsWonPercentage": { name: "Points Won %", dec: 1 },
    "GamesWonPercentage": { name: "Games Won %", dec: 1 },
    "SetsWonPercentage": { name: "Sets Won %", dec: 1 },
    "FirstServePercentage": { name: "1st Serve %", dec: 1 },
    "FirstServeWonPercentage": { name: "1st Serve Won %", dec: 1 },
    "SecondServeWonPercentage": { name: "2nd Serve Won %", dec: 1 },
    "ServicePointsWonPercentage": { name: "Service Points Won %", dec: 1 },
    "ServiceGamesWonPercentage": { name: "Service Games Won %", dec: 1 },
    "Aces": { name: "Aces", dec: 0 },
    "AcePercentage": { name: "Ace %", dec: 1 },
    "DoubleFaultPercentage": { name: "Double Fault %", dec: 1, reverse: true },
    "BreakPointsSavedPercentage": { name: "Break Points Saved %", dec: 1 },
    "FirstServeReturnPointsWonPercentage": { name: "1st Serve Return Won %", dec: 1 },
    "SecondServeReturnPointsWonPercentage": { name: "2nd Serve Return Won %", dec: 1 },
    "ReturnPointsWonPercentage": { name: "Return Points Won %", dec: 1 },
    "ReturnGamesWonPercentage": { name: "Return Games Won %", dec: 1 },
    "AceAgainstPercentage": { name: "Opponent's Ace %", dec: 1, reverse: true },
    "BreakPointsConvertedPercentage": { name: "Break Points Converted %", dec: 1 }
};
