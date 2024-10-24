const fetchComps = function () {
    if (dataset) {
        fetch(`https://www.wheeloratings.com/src/afl_stats/${dataset}/meta.json`)
            .then((res) => res.json())
            .then((data) => {
                comps = data;

                if (!(comp && comps.CompPaths.includes(comp)))
                    comp = "afl"

                fetchCompSeasons();
                updateComps();
            });
    }
}

const fetchCompSeasons = function () {
    if (dataset && comp) {
        fetch(`https://www.wheeloratings.com/src/afl_stats/${dataset}/${comp}/meta.json`)
            .then((res) => res.json())
            .then((data) => {
                comp_meta = data;

                if (!(season && comp_meta.Seasons.includes(season)))
                    season = comp_meta.Seasons.slice(-1)[0];

                fetchCompSeasonData();
                updateTitle();
                history.replaceState(null, '', `?comp=${comp}&season=${season}`);
                if (comp_changed) updateSeasons();
            });
    }
}

const fetchCompSeasonData = function () {
    tableLoading(true);
    if (dataset && comp && season) {
        fetch(`https://www.wheeloratings.com/src/afl_stats/${dataset}/${comp}/${season}.json`)
            .then((res) => res.json())
            .then((data) => {
                season_data = data;
                Reactable.setData(reactableId, season_data);
                tableLoading(false);
            });
    }
}

const updateTitle = function () {
    if (comp_meta) {
        document.title = `${comp_meta.Name} Team Statistics - ${season}`;
        document.querySelector('meta[name="description"]').setAttribute('content', `${comp_meta.Name} team statistics for ${season}.`);
        document.querySelector('h1').innerText = `${comp_meta.Name} Team Statistics - ${season}`;
    }
}

const tableLoading = function (loading = true) {
    if (loading) {
        loadingIcon.classList.remove("d-none");
        statsTable.classList.add("d-none");
    } else {
        loadingIcon.classList.add("d-none");
        statsTable.classList.remove("d-none");
    }
}

const compButtons = [];
const seasonButtons = [];

const updateComps = function () {
    compSelect.innerHTML = "";
    if (comps) {
        comps.CompPaths.forEach((element, index) => {
            button = document.createElement('button');
            button.id = `comp-${element}`;
            button.type = "button";
            button.innerText = comps.Comps[index];
            if (comp && comp == element)
                button.classList = "btn btm-sm mx-1 my-2 btn-primary";
            else
                button.classList = "btn btm-sm mx-1 my-2 btn-light";

            compSelect.appendChild(button);
            compButtons.push(button);

            button.addEventListener('click', (e) => {
                comp = element;
                // window.location.href = `${window.location.pathname}?comp=${element}`;
                history.replaceState(null, '', `?comp=${comp}`);
                comp_changed = true;
                fetchCompSeasons();

                for (btn of compButtons) {
                    if (btn.id === `comp-${element}`) {
                        btn.classList.add("btn-primary");
                        btn.classList.remove("btn-light");
                    } else {
                        btn.classList.add("btn-light");
                        btn.classList.remove("btn-primary");
                    }
                }
            });
        });
    }
}

const updateSeasons = function () {
    seasonSelect.innerHTML = "";
    if (comp_meta) {
        comp_meta.Seasons.forEach(element => {
            button = document.createElement('button');
            button.id = `season-${element.replaceAll(".", "-")}`;
            button.type = "button";
            button.innerText = element;
            if (season && season == element)
                button.classList = "btn btm-sm mx-1 my-2 btn-primary";
            else
                button.classList = "btn btm-sm mx-1 my-2 btn-light";

            seasonSelect.appendChild(button);
            seasonButtons.push(button);

            button.addEventListener('click', (e) => {
                season = element;
                history.replaceState(null, '', `?comp=${comp}&season=${season}`);
                updateTitle();
                fetchCompSeasonData();

                for (btn of seasonButtons) {
                    if (btn.id === `season-${element.replaceAll(".", "-")}`) {
                        btn.classList.add("btn-primary");
                        btn.classList.remove("btn-light");
                    } else {
                        btn.classList.add("btn-light");
                        btn.classList.remove("btn-primary");
                    }
                }
            });
        });
    }

    comp_changed = false;
}