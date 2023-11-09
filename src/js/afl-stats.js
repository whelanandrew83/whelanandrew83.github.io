function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

let playerStatSelections;

if (storageAvailable('localStorage')) {
    playerStatSelections = JSON.parse(localStorage.getItem("playerStatSelections"));
}

const statsColumnsAll = ["Age_Decimal", "Team", "Image", "RatingPoints_Avg", "Supercoach_Avg",
    "DreamTeamPoints_Avg", "CoachesVotes_Total", "CoachesVotes_Avg", "CoachesVotes_MatchesPolled", "TimeOnGround", "Kicks", "Handballs", "Disposals",
    "DisposalEfficiency", "KickingEfficiency", "HandballEfficiency", "KickPercentage", "Inside50s", "Rebound50s",
    "MetresGained", "MetresGainedPerDisposal", "Clangers", "DisposalsPerClanger", "Turnovers", "DisposalsPerTurnover",
    "ContestedPossessions", "UncontestedPossessions", "TotalPossessions", "ContestedPossessionRate", "Intercepts",
    "GroundBallGets", "CentreBounceAttendances", "CentreBounceAttendancePercentage", "CentreClearances", "CentreClearanceRate",
    "StoppageClearances", "TotalClearances", "Marks", "ContestedMarks", "MarksInside50", "InterceptMarks", "MarksOnLead",
    "FreesFor", "FreesAgainst", "FreesDiff", "RuckContests", "RuckContestPercentage", "Hitouts", "HitoutsWinPercentage",
    "HitoutsToAdvantage", "HitoutsToAdvantagePercentage", "Tackles", "TacklesInside50", "ContestDefensiveOneOnOnes",
    "ContestDefensiveLossPercentage", "ContestOffensiveOneOnOnes", "ContestOffensiveWinPercentage",
    "Goals_Total", "Goals_Avg", "Behinds", "ShotsAtGoal", "GoalAssists", "GoalAccuracy", "ScoreInvolvements",
    "ScoreInvolvementPercentage", "ScoreLaunches", "KickIns", "KickInPercentage", "KickInsPlayOnPercentage",
    "Bounces", "OnePercenters", "PressureActs", "Spoils"];

const statsColumns = {
    "Key stats": {
        "RatingPoints_Avg": null, "TimeOnGround": null, "Disposals": null, "MetresGained": null, "ContestedPossessions": null, "TotalPossessions": null,
        "CentreClearances": null, "TotalClearances": null, "Marks": null, "ContestedMarks": null, "Goals_Total": null, "Goals_Avg": null, "Tackles": null, "PressureActs": null, "Hitouts": null
    },
    "General": { "RatingPoints_Avg": "Player Rating", "Supercoach_Avg": "Supercoach Points", "DreamTeamPoints_Avg": "Fantasy Points", "CoachesVotes_Total": "Coaches Votes (Total)", "CoachesVotes_Avg": "Coaches Votes (Average)", "CoachesVotes_MatchesPolled": "Coaches Votes (Matches Polled)", "TimeOnGround": "Time On Ground" },
    "Disposals": {
        "Kicks": "Kicks", "Handballs": "Handballs", "Disposals": "Disposals", "KickPercentage": "Kick %",
        "Inside50s": "Inside 50s", "Rebound50s": "Rebound 50s", "MetresGained": "Metres Gained", "MetresGainedPerDisposal": "Metres Gained Per Disposal"
    },
    "Disposal Efficiency": {
        "KickingEfficiency": "Kicking Efficiency", "HandballEfficiency": "Handball Efficiency", "DisposalEfficiency": "Disposal Efficiency",
        "Clangers": "Clangers", "DisposalsPerClanger": "Disposals Per Clanger", "Turnovers": "Turnovers", "DisposalsPerTurnover": "Disposals Per Turnover"
    },
    "Possessions": { "ContestedPossessions": "Contested Possessions", "UncontestedPossessions": "Uncontested Possessions", "TotalPossessions": "Total Possessions", "ContestedPossessionRate": "Contested Possession %", "Intercepts": "Intercept Possessions", "GroundBallGets": "Ground Ball Gets" },
    "Clearances": { "CentreBounceAttendances": "Centre Bounce Attendances", "CentreBounceAttendancePercentage": "Centre Bounce Attendance %", "CentreClearances": "Centre Clearances", "CentreClearanceRate": "Centre Clearances Per CBA", "StoppageClearances": "Stoppage Clearances", "TotalClearances": "Total Clearances" },
    "Marks": { "Marks": "Marks", "ContestedMarks": "Contested Marks", "MarksInside50": "Marks Inside Forward 50", "InterceptMarks": "Intercept Marks", "MarksOnLead": "Marks On Lead" },
    "Scoring/Attack": {
        "Goals_Total": "Goals (Total)", "Goals_Avg": "Goals (Average)", "Behinds": "Behinds", "ShotsAtGoal": "Shots At Goal", "GoalAssists": "Goal Assists", "GoalAccuracy": "Goal Accuracy", "ScoreInvolvements": "Score Involvements", "ScoreInvolvementPercentage": "Score Involvement %", "ScoreLaunches": "Score Launches",
        "ContestOffensiveOneOnOnes": "Offensive One-On-One Contests", "ContestOffensiveWinPercentage": "Offensive One-On-One Contest Win %"
    },
    "Defence": { "ContestDefensiveOneOnOnes": "Defensive One-On-One Contests", "ContestDefensiveLossPercentage": "Defensive One-On-One Contest Loss %", "Tackles": "Tackles", "TacklesInside50": "Tackles Inside Forward 50", "PressureActs": "Pressure Acts", "Spoils": "Spoils" },
    "Ruck Contests": { "RuckContests": "Ruck Contests", "RuckContestPercentage": "Ruck Contest %", "Hitouts": "Hitouts", "HitoutsWinPercentage": "Hitout Win %", "HitoutsToAdvantage": "Hitouts To Advantage", "HitoutsToAdvantagePercentage": "Hitouts To Advantage %" },
    "Other": { "FreesFor": "Frees For", "FreesAgainst": "Frees Against", "FreesDiff": "Frees Differential", "KickIns": "Kick-Ins", "KickInPercentage": "Kick-In %", "KickInsPlayOnPercentage": "Kick-In Play On %", "Bounces": "Bounces", "OnePercenters": "One Percenters" }
};

const filterColumns = {
    'Matches': 'Matches',
    'TimeOnGround': 'Time On Ground %',
    'RatingPoints_Avg': 'Player Rating',
    'Supercoach_Avg': 'Supercoach',
    'Disposals': 'Disposals',
    'ContestedPossessions': 'Contested Possessions',
    'CentreBounceAttendancePercentage': 'Centre Bounce Attendance %',
    'CentreClearances': 'Centre Clearances',
    'TotalClearances': 'Clearances',
    'MetresGained': 'Metres Gained',
    'Marks': 'Marks',
    'ContestedMarks': 'Contested Marks',
    'Goals_Total': 'Goals (Total)',
    'Goals_Avg': 'Goals (Average)',
    'ShotsAtGoal': 'Shots at Goal',
    'GoalAssists': 'Goal Assists',
    'Tackles': 'Tackles',
    'Hitouts': 'Hitouts'
}

/* <h4>Select statistical categories to include in the table</h4>
<div id="stat-select">
// <select id="stat-select-presets" class="form-select" aria-label="Select stats for include in table">
// </select>
</div>
<div id="stat-select-custom" class="d-flex flex-wrap d-none">
</div> */

// const filtersDiv = document.querySelector("#filters");

// const statSelectAccordian = document.createElement('div');
// statSelectAccordian.classList = "accordion-item";

// const statSelectAccordianCollapse = document.createElement('div');
// statSelectAccordianCollapse.id = "collapse-stat-categories";
// statSelectAccordianCollapse.classList = "accordion-collapse collapse show";

// let statSelectDiv = document.querySelector("#stat-select-div");
// statSelectDiv.remove();

// statSelectDiv = document.createElement('div');
// statSelectDiv.id = "stat-select-div";
// statSelectDiv.classList = "accordion-body px-3 py-2";
// // statSelectDiv.ariaLabelledby = "stat-categories-select";
// statSelectDiv.dataset.bsParent = "#filters";

// // const h4 = document.createElement("h4");
// // h4.innerText = "Select statistical categories to include in the table";

// const h2 = document.createElement("h2");
// h2.id = "stat-categories-select";
// h2.classList = "accordion-header mt-0";

// const statCategoryButton = document.createElement('button');
// statCategoryButton.classList = "accordion-button";
// statCategoryButton.type = "button";
// statCategoryButton.dataset.bsToggle = "collapse";
// statCategoryButton.dataset.bsTarget = "#collapse-stat-categories";
// statCategoryButton.ariaExpanded = false;
// statCategoryButton.ariaControls = "collapse-stat-categories";
// statCategoryButton.innerText = "Select statistical categories";
// h2.appendChild(statCategoryButton);

const statSelectDiv = document.querySelector('#stat-select-div');
// const playerStatsDiv = document.querySelector('#player-stats-div');
const filtersDiv = document.querySelector("#filters");

const csvDownloadButton = document.createElement('button');
csvDownloadButton.id = "download-csv-button";
csvDownloadButton.classList = "btn btn-primary btn-sm mx-1 my-2";
csvDownloadButton.innerText = "Download as CSV";
csvDownloadButton.addEventListener('click', (e) => {
    Reactable.downloadDataCSV('player-stats-table', `afl-player-stats-${year}.csv`, { columnIds: [...['Player', 'Team', 'Age', 'Age_Decimal', 'Position', 'Matches'], ...statsColumnsAll.filter((value) => { return !["WebsiteId", "Team", "Image"].includes(value) })] });
    gtag('event', 'data_download');
});
// playerStatsDiv.appendChild(csvDownloadButton);
filtersDiv.insertAdjacentElement('afterend', csvDownloadButton);

const statCategoryAccordian = document.querySelector('#accordion-stat-categories');
statCategoryAccordian.classList.remove('d-none');

const statCategoryCollapse = document.querySelector('#collapse-stat-categories');
const statCategoryButton = document.querySelector('#collapse-stat-categories-button');

if (playerStatSelections && playerStatSelections.length > 0) {
    statCategoryCollapse.classList.remove("show");
    statCategoryButton.classList.add("collapsed");
    statCategoryButton.ariaExpanded = "false";
} else {
    const newAlert = document.createElement("span");
    newAlert.classList = "badge bg-primary mx-2";
    newAlert.innerText = "New";
    statCategoryButton.appendChild(newAlert);
}

const statSelect = document.createElement("div");
statSelect.id = "stat-select";
const customStatDiv = document.createElement("div");
customStatDiv.id = "stat-select-custom";
customStatDiv.classList = "d-flex flex-wrap";

const customStatDivParent = document.createElement("div");
customStatDivParent.classList = "d-none";

// statSelectDiv.appendChild(h4);
// statSelectAccordian.appendChild(h2);
// statSelectAccordianCollapse.appendChild(statSelectDiv);
// statSelectAccordian.appendChild(statSelectAccordianCollapse);
// filtersDiv.appendChild(statSelectAccordian);

const paraCustomWarning = document.createElement('p');
paraCustomWarning.classList = "small my-1 text-danger d-none";
paraCustomWarning.innerHTML = "<b>Custom</b> needs to be selected and <b>Show all</b> needs to be de-selected for custom selections to be reflected."

statSelectDiv.appendChild(statSelect);
statSelectDiv.appendChild(customStatDivParent);
customStatDivParent.appendChild(paraCustomWarning);
customStatDivParent.appendChild(customStatDiv);

const updateTableColumns = function (id = null, custom = false) {
    let showColumns = [];

    const customSelections = document.querySelectorAll("#stat-select-custom input:checked").length;

    if (custom) { customTextSpan.innerText = `(${customSelections} selected)` };

    if (selectShowAll.checked) {
        Reactable.setHiddenColumns('player-stats-table', ["Age_Decimal", "Team", "Image"]);
    } else if (selectCustom.checked) {
        const selectedInputs = document.querySelectorAll("#stat-select-custom input:checked");

        for (input of selectedInputs) {
            showColumns = [...showColumns, input.value];
        }

        Reactable.setHiddenColumns('player-stats-table', statsColumnsAll.filter((el) => !showColumns.includes(el)));
    } else if (!custom) {
        const selectedInputs = document.querySelectorAll("#stat-select input:checked");

        for (input of selectedInputs) {
            showColumns = [...showColumns, ...Object.keys(statsColumns[input.value])];
        }

        Reactable.setHiddenColumns('player-stats-table', statsColumnsAll.filter((el) => !showColumns.includes(el)));
    }

    if (selectShowAll.checked || !selectCustom.checked) {
        paraCustomWarning.classList.remove("d-none");
    } else {
        paraCustomWarning.classList.add("d-none")
    };

    if (!custom) {
        const inputs = document.querySelectorAll("#stat-select input");

        for (input of inputs) {
            if (input === selectCustom) {
                input.disabled = selectShowAll.checked;
            } else if (input !== selectShowAll) {
                input.disabled = (selectShowAll.checked || selectCustom.checked);
            }
        }
    }

    if (id === "select-custom" && selectCustom.checked) {
        toggleCustomStatDivDisplay(true);
    } else if (id === "select-custom" && !selectCustom.checked) {
        toggleCustomStatDivDisplay(false);
    }
};

const saveButton = document.createElement('button');
const saveButtonInitialText = "Save selections";
saveButton.id = "save-button";
saveButton.classList = "btn btn-primary btn-sm mx-1 my-2";
saveButton.innerText = saveButtonInitialText;
saveButton.style.width = "130px";

const saveSelections = function () {
    const selections = [];

    const selectedInputs = [...document.querySelectorAll("#stat-select input:checked"), ...document.querySelectorAll("#stat-select-custom input:checked")];
    for (input of selectedInputs) {
        selections.push(input.id);
    }

    if (storageAvailable("localStorage")) {
        localStorage.setItem("playerStatSelections", JSON.stringify(selections));
        gtag('event', 'save_stat_selections');

        saveButton.innerText = "Saved!";
        setTimeout(() => {
            saveButton.innerText = saveButtonInitialText;
        }, 500);
    }
};

// const statDropdown = document.querySelector("#stat-select-presets");

const customTextSpan = document.createElement('span');
customTextSpan.classList = "ps-1 fw-bold";

for (c of [...Object.keys(statsColumns), 'Custom', 'Show all']) {
    // const option = new Option(c, c);
    // statDropdown.add(option);

    const div = document.createElement('div');
    div.classList = "form-check form-switch";

    const id = "select-" + c.toLowerCase().replace(/[\W_]+/g, '-');

    const input = document.createElement('input');
    input.classList = "form-check-input"
    input.type = "checkbox"
    input.value = c;
    input.id = id;

    if (playerStatSelections && playerStatSelections.includes(id)) {
        input.checked = true
    } else if (!playerStatSelections && c === Object.keys(statsColumns)[0]) {
        input.checked = true;
    }

    input.addEventListener('change', (e) => {
        updateTableColumns(id);
    });

    const label = document.createElement('label');
    label.classList = "form-check-label stat-selection-label"
    if (c === "Custom" || c === 'Show all') { label.classList += " fw-bold" }
    label.htmlFor = id;
    label.innerText = c;

    if (c === "Custom") {
        label.appendChild(customTextSpan)
    }

    div.appendChild(input)
    div.appendChild(label)

    statSelect.appendChild(div);
}

const selectShowAll = document.querySelector("#select-show-all");
const selectCustom = document.querySelector("#select-custom");

let customStatDivDisplayed = false;

const toggleCustomStatDivDisplay = function (show = null) {
    if (show === null) {
        customStatDivDisplayed = !customStatDivDisplayed;
    } else {
        customStatDivDisplayed = show;
    }

    if (customStatDivDisplayed) {
        customButton.innerText = "Hide custom fields";
        customStatDivParent.classList.remove("d-none")
    } else {
        customButton.innerText = "Show custom fields";
        customStatDivParent.classList.add("d-none")
    }
}

const customButton = document.createElement('button');
customButton.id = "custom-button";
customButton.classList = "btn btn-primary btn-sm mx-1 my-2";
customButton.style.width = "150px";

toggleCustomStatDivDisplay(false);

// customButton.addEventListener("click", () => customStatDiv.style.display === "none" ? customStatDiv.style.display = "" : customStatDiv.style.display = "none");
customButton.addEventListener("click", () => toggleCustomStatDivDisplay());

statSelect.appendChild(customButton)

if (storageAvailable("localStorage")) {
    saveButton.addEventListener("click", saveSelections);
    statSelect.appendChild(saveButton);
}

for (c of Object.keys(statsColumns).splice(1)) {
    const statCategoryDiv = document.createElement('div');
    statCategoryDiv.classList = "m-2";

    const h5 = document.createElement('h5');
    h5.classList = "my-1"
    h5.innerText = c;

    statCategoryDiv.appendChild(h5)

    for (s of Object.keys(statsColumns[c])) {
        const div = document.createElement('div');
        div.classList = "form-check form-switch";

        const id = "select-custom-" + s.toLowerCase().replaceAll(' ', '-');

        const input = document.createElement('input');
        input.classList = "form-check-input"
        input.type = "checkbox"
        input.value = s;
        input.id = id;

        if (playerStatSelections && playerStatSelections.includes(id)) {
            input.checked = true
        }

        input.addEventListener('change', (e) => { updateTableColumns(id, true); });

        const label = document.createElement('label');
        label.classList = "form-check-label stat-selection-label"
        label.htmlFor = id;
        label.innerText = statsColumns[c][s];

        div.appendChild(input);
        div.appendChild(label);
        statCategoryDiv.appendChild(div)
    }

    customStatDiv.appendChild(statCategoryDiv)
}

customTextSpan.innerText = `(${document.querySelectorAll("#stat-select-custom input:checked").length} selected)`;

// statDropdown.addEventListener('change', (e) => {
//   showColumns = statsColumns[statDropdown.value];
//   updateTableColumns();
// });

window.addEventListener('DOMContentLoaded', (event) => { updateTableColumns() });

const checkbox = document.querySelector("#showColorScale");

checkbox.addEventListener('change', function () {
    const element = document.querySelector("#player-stats");
    element.classList.toggle("bg-hide");
    element.classList.toggle("bg-show");
});