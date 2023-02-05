const chartColumns = {
    "RatingOverallSeason": { name: "Overall Season Rating" },
    "RatingOverallSeasonZ": { name: "Overall Season Rating (Relative)", dec: 2 },
    "RatingAttSeason": { name: "Overall Season Attack Rating" },
    "RatingAttSeasonZ": { name: "Overall Season Attack Rating (Relative)", dec: 2 },
    "RatingDefSeason": { name: "Overall Season Defense Rating" },
    "RatingDefSeasonZ": { name: "Overall Season Defense Rating (Relative)", dec: 2 },
    "Wins": { name: "Wins", dec: 0 },
    "Losses": { name: "Losses", dec: 0 },
    "For": { name: "For (Total)", dec: 0 },
    "For_Avg": { name: "For (Average)" },
    "For_Acc": { name: "Accuracy" },
    "Against": { name: "Against (Total)", dec: 0 },
    "Against_Avg": { name: "Against (Average)" },
    "Against_Acc": { name: "Accuracy Against" },
    "Percentage": { name: "Percentage" },
    "MR": { name: "Match Ratio" },
    "HALadderPosition": { name: "Home & Away Ladder Position", dec: 0 }
};

const defaultX = 'RatingDefSeason';
const defaultY = 'RatingAttSeason';
const reactableId = 'annual-summary-table';

let labelColumns = ['TeamName', 'Year'];
