const filterColumns = {
    'Year': 'Year',
    'Teams': 'Team Count',
    'HALadderPosition': 'Home & Away Ladder Position',
    'Matches': 'Matches',
    'Age': 'Age',
    'Experience': 'Experience',
    'Wins': 'Wins',
    'Losses': 'Losses',
    'Draws': 'Draws',
    'For': 'For (Total)',
    'For_Avg': 'For (Average)',
    "For_Acc": "Accuracy",
    'Against': 'Against (Total)',
    'Against_Avg': 'Against (Average)',
    "Against_Acc": "Accuracy Against",
    'Percentage': 'Percentage',
    'MR': 'Match Ratio',
    'RankOverallSeason': 'Overall Season Ranking',
    'RankAttSeason': 'Overall Season Attack Ranking',
    'RankDefSeason': 'Overall Season Defense Ranking'
}

const filterColumnsDefault = ['Year', 'HALadderPosition']

const csvDownloadButton = document.querySelector('#download-csv-button');
csvDownloadButton.addEventListener('click', (e) => {
    Reactable.downloadDataCSV(reactableId, `afl-annual-sumary.csv`, { columnIds: save_columns });
    gtag('event', 'data_download');
});