const chartColumns = {
    "CareerSummary_Heading": { name: "Player Details", heading: true },
    "Age": { name: "Age", dec: 0 },
    "Age_Decimal": { name: "Age (Decimal)" },
    "DebutYear": { name: "Debut Year" },
    // "DraftYear": { name: "Draft Year" },
    // "DraftPosition": { name: "Draft Position" },
    "CareerSummary_Heading": { name: "Career Summary", heading: true },
    "Matches_Career": { name: "Matches (Career)" },
    "Goals_Total_Career": { name: "Total Goals (Career)" },
    "Matches_Finals": { name: "Matches (Finals)" },
    "Goals_Finals": { name: "Total Goals (Finals)" },
    "CareerStats_Heading": { name: "Career Stats", heading: true },
    "RatingPoints_Career": { name: "Rating Points (Career)" },
    "Supercoach_Career": { name: "Supercoach (Career)" },
    "Disposals_Career": { name: "Disposals (Career)" },
    "ContestedPossessions_Career": { name: "Contested Possessions (Career)" },
    "Goals_Career": { name: "Average Goals (Career)" },
    "RecentStats_Heading": { name: "Last 20 matches", heading: true },
    "RatingPoints_Recent": { name: "Rating Points (Last 20 matches)" },
    "Supercoach_Recent": { name: "Supercoach (Last 20 matches)" },
    "Disposals_Recent": { name: "Disposals (Last 20 matches)" },
    "ContestedPossessions_Recent": { name: "Contested Possessions (Last 20 matches)" },
    "Goals_Recent": { name: "Average Goals (Last 20 matches)" }
};

const defaultX = 'Age_Decimal';
const defaultY = 'RatingPoints_Recent';
const reactableId = 'team-lists-table';
const diagonalLines = {
    "RatingPoints_Career": "RatingPoints_Recent",
    "Supercoach_Career": "Supercoach_Recent",
    "Disposals_Career": "Disposals_Recent",
    "ContestedPossessions_Career": "ContestedPossessions_Recent",
    "Goals_Career": "Goals_Recent"
};

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
    }//,
    // 'DraftYear': {
    //     name: 'Draft Year',
    //     default: '_max'
    // },
    // 'DebutYear': {
    //     name: 'Debut Year',
    //     default: '_max'
    // }
};
let highlightColumn = 'Team';
let pointImageColumn = 'Image';