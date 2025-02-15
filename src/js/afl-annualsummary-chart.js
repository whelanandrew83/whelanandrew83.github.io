const chartColumns = {
    "RatingOverallSeason": { name: "Overall Season Rating" },
    "RatingOverallSeasonZ": { name: "Overall Season Rating (Relative)", dec: 2 },
    "RatingAttSeason": { name: "Overall Season Attack Rating" },
    "RatingAttSeasonZ": { name: "Overall Season Attack Rating (Relative)", dec: 2 },
    "RatingDefSeason": { name: "Overall Season Defense Rating" },
    "RatingDefSeasonZ": { name: "Overall Season Defense Rating (Relative)", dec: 2 },
    "Rating_Percentage": { name: "Adjusted Percentage", dec: 1 },
    "CompositeRating": { name: "Adjusted Rating", dec: 3 },
    "RatingOverall": { name: "End-of-season Rating" },
    "RatingOverallZ": { name: "End-of-season Rating (Relative)", dec: 2 },
    "RatingAtt": { name: "End-of-season Attack Rating" },
    "RatingAttZ": { name: "End-of-season Attack Rating (Relative)", dec: 2 },
    "RatingDef": { name: "End-of-season Defense Rating" },
    "RatingDefZ": { name: "End-of-season Defense Rating (Relative)", dec: 2 },
    "Year": { name: "Year", dec: 0 },
    "Age": { name: "Age" },
    "Experience": { name: "Experience" },
    "Losses": { name: "Losses", dec: 0 },
    "For": { name: "For (Total)", dec: 0 },
    "For_Avg": { name: "For (Average)" },
    "For_Acc": { name: "Accuracy" },
    "Against": { name: "Against (Total)", dec: 0 },
    "Against_Avg": { name: "Against (Average)" },
    "Against_Acc": { name: "Accuracy Against" },
    "Percentage": { name: "Percentage" },
    "MR": { name: "Match Ratio" },
    "HALadderPosition": { name: "Home & Away Ladder Position", dec: 0, reverse: true }
};

const defaultX = 'RatingDefSeason';
const defaultY = 'RatingAttSeason';
const reactableId = 'annual-summary-table';

let labelColumns = ['TeamName', 'Year'];
let labelColumnsSticky = 2;
let selectionObjectType = 'team';

// let highlightColumn = 'Year';
// let defaultHighlight = '_max';

let highlightColumns = {
    'TeamName': {
        name: 'Team',
        default: null
    },
    'Year': {
        name: 'Year',
        default: '_max'
    },
    'IsPremier': {
        name: 'Premiership teams',
        default: "Yes"
    },
    'IsGrandFinalist': {
        name: 'Grand final teams',
        default: "Yes"
    },
    'IsFinalist': {
        name: 'Finals teams',
        default: "Yes"
    },
    'IsWoodenSpoon': {
        name: 'Wooden spoon teams',
        default: "Yes"
    }
};
let highlightColumn = 'TeamName';
let pointImageColumn = 'Image';