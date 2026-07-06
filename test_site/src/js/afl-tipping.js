const teamFiltersDiv = document.querySelector("#team-filters");

const buttonCurrent = document.querySelector('#matches-current');
const buttonAll = document.querySelector('#matches-all');
const buttonComplete = document.querySelector('#matches-complete');
const buttonFuture = document.querySelector('#matches-future');

if (typeof teams.Team !== 'undefined') {
    for (i = 0; i < teams.Team.length; i++) {
        const teamLink = document.createElement('a');
        teamLink.classList = 'btn btn-sm p-1';
        teamLink.innerHTML = `<img src='${teams.Image[i]}' height='25px'>`;
        teamFiltersDiv.appendChild(teamLink);

        const team = teams.Team[i];

        teamLink.addEventListener('click', function (event) {
            Reactable.setAllFilters('tips-table', [
                { id: 'IsCurrent', value: undefined },
                { id: 'IsComplete', value: undefined },
                { id: 'Teams', value: team }
            ]);
            [buttonAll, buttonCurrent, buttonComplete, buttonFuture].forEach((b) => {
                b.classList.remove('btn-primary');
                b.classList.add('btn-light');
            });
        });
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    Reactable.setAllFilters('tips-table', [
        { id: 'IsCurrent', value: 'TRUE' },
        { id: 'IsComplete', value: undefined }
    ]);
});

buttonCurrent.addEventListener('click', (e) => {
    Reactable.setAllFilters('tips-table', [
        { id: 'IsCurrent', value: 'TRUE' },
        { id: 'IsComplete', value: undefined }
    ]);
    buttonCurrent.classList.add('btn-primary');
    buttonCurrent.classList.remove('btn-light');
    [buttonAll, buttonComplete, buttonFuture].forEach((b) => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-light');
    });
});

buttonAll.addEventListener('click', (e) => {
    Reactable.setAllFilters('tips-table', [
        { id: 'IsCurrent', value: undefined },
        { id: 'IsComplete', value: undefined }
    ]);
    buttonAll.classList.add('btn-primary');
    buttonAll.classList.remove('btn-light');
    [buttonCurrent, buttonComplete, buttonFuture].forEach((b) => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-light');
    });
});

buttonComplete.addEventListener('click', (e) => {
    Reactable.setAllFilters('tips-table', [
        { id: 'IsCurrent', value: undefined },
        { id: 'IsComplete', value: 'TRUE' }
    ]);
    buttonComplete.classList.add('btn-primary');
    buttonComplete.classList.remove('btn-light');
    [buttonCurrent, buttonAll, buttonFuture].forEach((b) => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-light');
    });
});

buttonFuture.addEventListener('click', (e) => {
    Reactable.setAllFilters('tips-table', [
        { id: 'IsCurrent', value: undefined },
        { id: 'IsComplete', value: 'FALSE' }
    ]);
    buttonFuture.classList.add('btn-primary');
    buttonFuture.classList.remove('btn-light');
    [buttonCurrent, buttonAll, buttonComplete].forEach((b) => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-light');
    });
});