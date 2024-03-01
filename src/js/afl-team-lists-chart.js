const chartColumns = {
    "CareerSummary_Heading": { name: "Player Details", heading: true },
    "Age": { name: "Age", dec: 0 },
    "Age_Decimal": { name: "Age (Decimal)" },
    "Height": { name: "Height (cm)", dec: 0 },
    "DebutYear": { name: "Debut Year", dec: 0 },
    // "DraftYear": { name: "Draft Year" },
    // "DraftPosition": { name: "Draft Position" },
    "CareerSummary_Heading": { name: "Career Summary", heading: true },
    "Matches_Career": { name: "Matches (Career)", dec: 0 },
    "Goals_Total_Career": { name: "Total Goals (Career)", dec: 0 },
    "Matches_Finals": { name: "Matches (Finals)", dec: 0 },
    "Goals_Finals": { name: "Total Goals (Finals)", dec: 0 },
    "CareerStats_Heading": { name: "Career Stats", heading: true },
    "RatingPoints_Career": { name: "Rating Points (Career)" },
    "Supercoach_Career": { name: "Supercoach (Career)" },
    "Disposals_Career": { name: "Disposals (Career)" },
    "ContestedPossessions_Career": { name: "Contested Possessions (Career)" },
    "Goals_Career": { name: "Average Goals (Career)" },
    "RecentStats_Heading": { name: "Last 20 Matches", heading: true },
    "RatingPoints_Recent": { name: "Rating Points (Last 20)" },
    "Supercoach_Recent": { name: "Supercoach (Last 20)" },
    "Disposals_Recent": { name: "Disposals (Last 20)" },
    "ContestedPossessions_Recent": { name: "Contested Possessions (Last 20)" },
    "Goals_Recent": { name: "Average Goals (Last 20)" }
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