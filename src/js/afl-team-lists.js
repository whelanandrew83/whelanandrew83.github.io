const filterColumns = {
    'Age': 'Age',
    'JumperNumber': 'Player Number',
    'Height': 'Height (cm)',
    'DebutYear': 'Debut',
    // 'DraftYear': 'Draft Year',
    // 'DraftPosition': 'Draft Position',
    'Matches_Career': 'Career Matches',
    'Goals_Total_Career': 'Career Goals',
    'Matches_Finals': 'Finals Matches',
    'Goals_Finals': 'Finals Goals',
    'RatingPoints_Career': 'Rating Points (Career)',
    'Supercoach_Career': 'Supercoach (Career)',
    'Disposals_Career': 'Disposals (Career)',
    'ContestedPossessions_Career': 'Contested Possessions (Career)',
    'Goals_Career': 'Average Goals (Career)',
    'RatingPoints_Recent': 'Rating Points (Last 20 matches)',
    'Supercoach_Recent': 'Supercoach (Last 20 matches)',
    'Disposals_Recent': 'Disposals (Last 20 matches)',
    'ContestedPossessions_Recent': 'Contested Possessions (Last 20 matches)',
    'Goals_Recent': 'Average Goals (Last 20 matches)'
}

const filterColumnsDefault = ['Age', 'Matches_Career']

const teamFiltersDiv = document.querySelector("#team-filters");

if (typeof teams.Team !== 'undefined') {
    for (i = 0; i <= teams.Team.length; i++) {
        const teamLink = document.createElement('a');
        if (i == teams.Team.length) {
            teamLink.classList = 'btn btn-primary btn-sm mx-1 my-1';
            teamLink.innerText = `ALL`;
        } else {
            teamLink.classList = 'btn btn-sm p-1';
            teamLink.innerHTML = `<img src='${teams.Image[i]}' height='25px'>`;
        }
        teamFiltersDiv.appendChild(teamLink);

        const team = i == teams.Team.length ? undefined : teams.Team[i];

        teamLink.addEventListener('click', function (event) {
            Reactable.setAllFilters('team-lists-table', [
                { id: 'Abbreviation', value: team }
            ]);
        });
    }
}

const csvDownloadButton = document.querySelector('#download-csv-button');
csvDownloadButton.addEventListener('click', (e) => {
    Reactable.downloadDataCSV('team-lists-table', `afl-team-lists.csv`, {
        columnIds: ['Player', 'Team', 'JumperNumber', 'Age', 'Age_Decimal', 'Height', 'Position', 'DebutYear', 'Matches_Career', 'Goals_Total_Career', 'Matches_Finals', 'Goals_Total_Finals', 'RatingPoints_Career', 'Supercoach_Career', 'Disposals_Career', 'ContestedPossessions_Career', 'Goals_Career', 'RatingPoints_Recent', 'Supercoach_Recent', 'Disposals_Recent', 'ContestedPossessions_Recent', 'Goals_Recent']
    });
    gtag('event', 'data_download');
});