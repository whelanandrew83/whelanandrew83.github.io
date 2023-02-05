const chartColumns = {
    "Elo_Heading": { name: "Elo Stats", heading: true },
    "Elo": { name: "Elo Rating", dec: 0 },
    "EloRank": { name: "Elo Rank", dec: 0, reverse: true },
    "EloServe": { name: "Elo Serve Rating", dec: 0 },
    "EloServeRank": { name: "Elo Serve Rank", dec: 0, reverse: true },
    "EloReturn": { name: "Elo Return Rating", dec: 0 },
    "EloReturnRank": { name: "Elo Return Rank", dec: 0, reverse: true },
    "Summary_Heading": { name: "Summary Stats", heading: true },
    "Wins": { name: "Wins", dec: 0 },
    "WinPercentage": { name: "Win %", dec: 3 },
    "PointsWonPercentage": { name: "Points Won %", dec: 3 },
    "GamesWonPercentage": { name: "Games Won %", dec: 3 },
    "SetsWonPercentage": { name: "Sets Won %", dec: 3 },
    "Serve_Heading": { name: "Serve Stats", heading: true },
    "FirstServePercentage": { name: "1st Serve %", dec: 3 },
    "FirstServeWonPercentage": { name: "1st Serve Won %", dec: 3 },
    "SecondServeWonPercentage": { name: "2nd Serve Won %", dec: 3 },
    "ServicePointsWonPercentage": { name: "Service Points Won %", dec: 3 },
    "ServiceGamesWonPercentage": { name: "Service Games Won %", dec: 3 },
    "AcePercentage": { name: "Ace %", dec: 3 },
    "DoubleFaultPercentage": { name: "Double Fault %", dec: 3 },
    "BreakPointsSavedPercentage": { name: "Break Points Saved %", dec: 3 },
    "Return_Heading": { name: "Return Stats", heading: true },
    "FirstServeReturnPointsWonPercentage": { name: "1st Serve Return Won %", dec: 3 },
    "SecondServeReturnPointsWonPercentage": { name: "2nd Serve Return Won %", dec: 3 },
    "ReturnPointsWonPercentage": { name: "Return Points Won %", dec: 3 },
    "ReturnGamesWonPercentage": { name: "Return Games Won %", dec: 3 },
    "AceAgainstPercentage": { name: "Opponent's Ace %", dec: 3 },
    "BreakPointsConvertedPercentage": { name: "Break Points Converted %", dec: 3 }
};

const defaultX = 'Elo';
const defaultY = 'WinPercentage';
const reactableId = 'player-stats-table';

let labelColumns = ['Player', 'Surface'];