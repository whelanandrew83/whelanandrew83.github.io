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

const statsColumnsAll = ["WebsiteId", "Team", "Image", "RatingPoints_Avg", "Supercoach_Avg",
    "DreamTeamPoints_Avg", "CoachesVotes_Total", "CoachesVotes_Avg", "TimeOnGround", "Kicks", "Handballs", "Disposals",
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
    "General": { "RatingPoints_Avg": "Player Rating", "Supercoach_Avg": "Supercoach Points", "DreamTeamPoints_Avg": "Fantasy Points", "CoachesVotes_Total": "Coaches Votes (Total)", "CoachesVotes_Avg": "Coaches Votes (Average)", "TimeOnGround": "Time On Ground" },
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
    "Other": { "FreesFor": "Frees For", "FreesAgainst": "Frees Against", "FreesDiff": "Frees Differential", "KickIns": "Kick-Ins", "KickInPercentage": "Kick-In %", "KickInsPlayOnPercentage": "Kick-Ins Play On %", "Bounces": "Bounces", "OnePercenters": "One Percenters" }
};

{/* <h4>Select statistical categories to include in the table</h4>
<div id="stat-select">
// <select id="stat-select-presets" class="form-select" aria-label="Select stats for include in table">
// </select>
</div>
<div id="stat-select-custom" class="d-flex flex-wrap d-none">
</div> */}

const statSelectDiv = document.querySelector("#stat-select-div");

const h4 = document.createElement("h4");
h4.innerText = "Select statistical categories to include in the table";

const statSelect = document.createElement("div");
statSelect.id = "stat-select";
const customStatDiv = document.createElement("div");
customStatDiv.id = "stat-select-custom";
customStatDiv.classList = "d-flex flex-wrap d-none";

statSelectDiv.appendChild(h4);
statSelectDiv.appendChild(statSelect);
statSelectDiv.appendChild(customStatDiv);

const paraCustomWarning = document.createElement('p');
paraCustomWarning.classList = "small text-danger d-none";
paraCustomWarning.innerHTML = "<b>Custom</b> needs to be selected and <b>Show all</b> needs to be de-selected for custom selections to be reflected."

const updateTableColumns = function (custom = false) {
    let showColumns = [];

    if (custom) { customTextSpan.innerText = `(${document.querySelectorAll("#stat-select-custom input:checked").length} selected)` };

    if (selectShowAll.checked) {
        Reactable.setHiddenColumns('player-stats-table', ["WebsiteId", "Team", "Image"]);
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

    if ((selectShowAll.checked || !selectCustom.checked) && document.querySelectorAll("#stat-select-custom input:checked").length) {
        paraCustomWarning.classList.remove("d-none");
    } else {
        paraCustomWarning.classList.add("d-none")
    };
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
    }

    saveButton.innerText = "Saved!";
    setTimeout(() => {
        saveButton.innerText = saveButtonInitialText;
    }, 500);
};

// const statDropdown = document.querySelector("#stat-select-presets");

const customTextSpan = document.createElement('span');
customTextSpan.classList = "ps-1 fw-bold";

for (c of [...Object.keys(statsColumns), 'Custom', 'Show all']) {
    // const option = new Option(c, c);
    // statDropdown.add(option);

    const div = document.createElement('div');
    div.classList = "form-check form-switch";

    const id = "select-" + c.toLowerCase().replaceAll(' ', '-');

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

    input.addEventListener('change', (e) => { updateTableColumns(); });

    const label = document.createElement('label');
    label.classList = "form-check-label"
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

const customButton = document.createElement('button');
customButton.id = "custom-button";
customButton.classList = "btn btn-primary btn-sm mx-1 my-2";
customButton.innerText = "Show/hide custom fields";

// customButton.addEventListener("click", () => customStatDiv.style.display === "none" ? customStatDiv.style.display = "" : customStatDiv.style.display = "none");
customButton.addEventListener("click", () => customStatDiv.classList.toggle("d-none"));

statSelect.appendChild(customButton)

if (storageAvailable("localStorage")) {
    saveButton.addEventListener("click", saveSelections);
    statSelect.appendChild(saveButton);
}

const para = document.createElement('p');
para.classList = "small my-2";
para.innerHTML = "<b>Custom</b> selection overrides other selected statistical categories. <b>Show all</b> overrides all other selections.";
statSelect.appendChild(para);

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

        input.addEventListener('change', (e) => { updateTableColumns(true); });

        const label = document.createElement('label');
        label.classList = "form-check-label"
        label.htmlFor = id;
        label.innerText = statsColumns[c][s];

        div.appendChild(input);
        div.appendChild(label);
        statCategoryDiv.appendChild(div)
    }

    customStatDiv.appendChild(statCategoryDiv)
}

statSelectDiv.appendChild(paraCustomWarning);

customTextSpan.innerText = `(${document.querySelectorAll("#stat-select-custom input:checked").length} selected)`;

// statDropdown.addEventListener('change', (e) => {
//   showColumns = statsColumns[statDropdown.value];
//   updateTableColumns();
// });

window.addEventListener('DOMContentLoaded', (event) => {
    updateTableColumns()
});

const checkbox = document.querySelector("#showColorScale");

checkbox.addEventListener('change', function () {
    const element = document.querySelector("#player-stats");
    element.classList.toggle("bg-hide");
    element.classList.toggle("bg-show");
});