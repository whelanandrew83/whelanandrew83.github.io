const viewWindowButton = document.querySelector("#view-window-button");
const closeSearchButton = document.querySelector("#close-search-button");

viewWindowButton.addEventListener('click', () => { overlay.style.display = "block"; chart.update() });
closeSearchButton.addEventListener('click', () => { overlay.style.display = "none" });
document.addEventListener('keyup', (e) => {
    if (e.code === "Escape") {
        if (document.activeElement.id === "close-search-button") {
            overlay.style.display = "none";
        } else
            closeSearchButton.focus();
    }
});

const showCurrentTeamsButton = document.querySelector('#show-current');
const showPremiersButton = document.querySelector('#show-premiers');
const showAllTeamsButton = document.querySelector('#show-all');

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
    window.setTimeout(() => {
        if (typeof chart !== 'undefined') chart.update();
    }, 1000)

    if (typeof premiership_metrics !== 'undefined')
        Reactable.getInstance(reactableId).setData(premiership_metrics);

    Reactable.setAllFilters('premiership-metrics-table', [
        { id: 'IsCurrent', value: '1' },
        { id: 'IsPremier', value: undefined }
    ])
});