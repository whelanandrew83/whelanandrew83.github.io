const columnsAlwaysHidden = ["WebsiteId", "Image", "Colour", "SurfaceLong", "TieBreaksLost"];
const columnsAlwaysDisplayed = ["Player", "PlayerIOC", "Surface", "Matches"];
const columnsAlwaysExported = ["TieBreaksLost"];

const statsColumns = {
    "Summary": ["EloRank", "Elo", "EloRankSurface", "Wins", "Losses", "WinPercentage", "Titles",
        "PointsWonPercentage", "GamesWonPercentage", "SetsWonPercentage", "TieBreaks", "TieBreaksWon", "TieBreaksWonPercentage",
        "ServiceGamesWonPercentage", "ReturnGamesWonPercentage"],
    "Serve": ["EloServeRank", "EloServe", "FirstServePercentage", "FirstServeWonPercentage", "SecondServeWonPercentage",
        "ServicePointsWonPercentage", "ServiceGamesWonPercentage", "Aces", "AcePercentage", "AcesPerServiceGame",
        "DoubleFaultPercentage", "DoubleFaultsPerServiceGame", "AcesPerDoubleFault", "BreakPointsFacedPerServiceGame", "BreakPointsSavedPercentage"],
    "Return": ["EloReturnRank", "EloReturn", "FirstServeReturnPointsWonPercentage", "SecondServeReturnPointsWonPercentage",
        "ReturnPointsWonPercentage", "ReturnGamesWonPercentage", "AceAgainstPercentage", "AcesAgainstPerReturnGame",
        "BreakPointChancesPerReturnGame", "BreakPointsConvertedPercentage"]
};

const columnsToHide = [...columnsAlwaysHidden, ...statsColumns.Summary, ...statsColumns.Serve, ...statsColumns.Return];
const hiddenColumns = {
    "Summary": columnsToHide.filter((value) => { return !statsColumns.Summary.includes(value) }),
    "Serve": columnsToHide.filter((value) => { return !statsColumns.Serve.includes(value) }),
    "Return": columnsToHide.filter((value) => { return !statsColumns.Return.includes(value) })
}

const summaryButton = document.querySelector('#summary-stats');
const serveButton = document.querySelector('#serve-stats');
const returnButton = document.querySelector('#return-stats');

summaryButton.addEventListener('click', (e) => {
    Reactable.setHiddenColumns('player-stats-table', hiddenColumns.Summary);
    summaryButton.classList.add('btn-primary');
    summaryButton.classList.remove('btn-light');
    serveButton.classList.remove('btn-primary');
    serveButton.classList.add('btn-light');
    returnButton.classList.remove('btn-primary');
    returnButton.classList.add('btn-light');
});
serveButton.addEventListener('click', (e) => {
    Reactable.setHiddenColumns('player-stats-table', hiddenColumns.Serve);
    summaryButton.classList.remove('btn-primary');
    summaryButton.classList.add('btn-light');
    serveButton.classList.add('btn-primary');
    serveButton.classList.remove('btn-light');
    returnButton.classList.remove('btn-primary');
    returnButton.classList.add('btn-light');
});
returnButton.addEventListener('click', (e) => {
    Reactable.setHiddenColumns('player-stats-table', hiddenColumns.Return);
    summaryButton.classList.remove('btn-primary');
    summaryButton.classList.add('btn-light');
    serveButton.classList.remove('btn-primary');
    serveButton.classList.add('btn-light');
    returnButton.classList.add('btn-primary');
    returnButton.classList.remove('btn-light');
});

window.addEventListener('DOMContentLoaded', (event) => {
    Reactable.setHiddenColumns('player-stats-table', hiddenColumns.Summary);
});

const csvDownloadButton = document.querySelector('#download-csv-button');
csvDownloadButton.addEventListener('click', (e) => {
    Reactable.downloadDataCSV('player-stats-table', `tennis-player-stats-${competition}.csv`, { columnIds: [...new Set([...columnsAlwaysDisplayed, ...statsColumns.Summary, ...statsColumns.Serve, ...statsColumns.Return])] });
    gtag('event', 'data_download');
});