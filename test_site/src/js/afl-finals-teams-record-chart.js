const chartColumns = {
    'Year': { name: 'Year', dec: 0 },
    'M_FinalsTeams': { name: 'Matches against finals teams' },
    'W_FinalsTeams': { name: 'Wins against finals teams' },
    'L_FinalsTeams': { name: 'Losses against finals teams' },
    'Percentage_FinalsTeams': { name: 'Percentage against finals teams' },
    'MR_FinalsTeams': { name: 'Match ratio against finals teams' },
    'Rank_FinalsTeams': { name: 'Rank against finals teams', dec: 0, reverse: true },
    'M_NonFinalsTeams': { name: 'Matches against non-finals teams' },
    'W_NonFinalsTeams': { name: 'Wins against non-finals teams' },
    'L_NonFinalsTeams': { name: 'Losses against non-finals teams' },
    'Percentage_NonFinalsTeams': { name: 'Percentage against non-finals teams' },
    'MR_NonFinalsTeams': { name: 'Match ratio against non-finals teams' },
    'Rank_NonFinalsTeams': { name: 'Rank against non-finals teams', dec: 0, reverse: true },
    'Percentage_Diff': { name: 'Percentage difference' },
    'MR_Diff': { name: 'Match ratio difference' }
};

const defaultX = 'MR_FinalsTeams';
const defaultY = 'MR_NonFinalsTeams';
const reactableId = 'finals-team-record-table';

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
    }
};
let highlightColumn = 'TeamName';
let pointImageColumn = 'Image';