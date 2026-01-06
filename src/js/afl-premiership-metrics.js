const showCurrentTeamsButton = document.querySelector('#show-current');
const showPremiersButton = document.querySelector('#show-premiers');
const showAllTeamsButton = document.querySelector('#show-all');

const updateView = function () {
    Reactable.getInstance(reactableId).setMeta()
}

showCurrentTeamsButton.addEventListener('click', (e) => {
    Reactable.setAllFilters('premiership-metrics-table', [
        { id: 'IsCurrent', value: '1' },
        { id: 'IsPremier', value: undefined }
    ]);
    showCurrentTeamsButton.classList.add('btn-primary');
    showCurrentTeamsButton.classList.remove('btn-light');
    [showAllTeamsButton, showPremiersButton].forEach((b) => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-light');
    });
});

showPremiersButton.addEventListener('click', (e) => {
    Reactable.setAllFilters('premiership-metrics-table', [
        { id: 'IsPremier', value: '1' },
        { id: 'IsCurrent', value: undefined }
    ]);
    showPremiersButton.classList.add('btn-primary');
    showPremiersButton.classList.remove('btn-light');
    [showCurrentTeamsButton, showAllTeamsButton].forEach((b) => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-light');
    });
});

showAllTeamsButton.addEventListener('click', (e) => {
    Reactable.setAllFilters('premiership-metrics-table', [
        { id: 'IsCurrent', value: undefined },
        { id: 'IsPremier', value: undefined }
    ]);
    showAllTeamsButton.classList.add('btn-primary');
    showAllTeamsButton.classList.remove('btn-light');
    [showCurrentTeamsButton, showPremiersButton].forEach((b) => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-light');
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    Reactable.setAllFilters('premiership-metrics-table', [
        { id: 'IsCurrent', value: '1' },
        { id: 'IsPremier', value: undefined }
    ])
});

const csvDownloadButton = document.querySelector('#download-csv-button');
csvDownloadButton.addEventListener('click', (e) => {
    Reactable.downloadDataCSV(reactableId, `${comp}-team-stats-${season}.csv`, { columnIds: [...new Set([...columnsAlwaysDisplayed, ...statsColumns.For, ...statsColumns.Against, ...statsColumns.Difference])].filter((el) => { return !missing_columns.includes(el) }) });
    gtag('event', 'data_download');
});