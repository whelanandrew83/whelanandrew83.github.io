const viewChartButton = document.querySelector("#view-chart-button");
const closeSearchButton = document.querySelector("#close-search-button");
const overlay = document.querySelector("#overlay");

viewChartButton.addEventListener('click', () => { overlay.style.display = "block" });
closeSearchButton.addEventListener('click', () => { overlay.style.display = "none"; });

const chartColumns = {
    "RatingPoints_Avg": { name: "Rating Points" },
    "Supercoach_Avg": { name: "Supercoach Points" },
    "DreamTeamPoints_Avg": { name: "Fantasy Points" },
    "CoachesVotes_Total": { name: "Coaches Votes", dec: 0 },
    "CoachesVotes_Avg": { name: "Coaches Votes (Average)" },
    "TimeOnGround": { name: "Time On Ground" },
    "Kicks": { name: "Kicks" },
    "Handballs": { name: "Handballs" },
    "Disposals": { name: "Disposals" },
    "DisposalEfficiency": { name: "Disposal Efficiency" },
    "KickingEfficiency": { name: "Kicking Efficiency" },
    "Inside50s": { name: "Inside 50s" },
    "MetresGained": { name: "Metres Gained" },
    "ContestedPossessions": { name: "Contested Possessions" },
    "CentreBounceAttendances": { name: "Centre Bounce Attendances" },
    "CentreClearances": { name: "Centre Clearances" },
    "TotalClearances": { name: "Total Clearances" },
    "Marks": { name: "Marks" },
    "ContestedMarks": { name: "Contested Marks" },
    "RuckContests": { name: "Ruck Contests" },
    "Hitouts": { name: "Hitouts" },
    "HitoutsWinPercentage": { name: "Hitout Win %" },
    "HitoutsToAdvantage": { name: "Hitout To Advantage" },
    "Tackles": { name: "Tackles" },
    "ContestDefensiveOneOnOnes": { name: "Defensive one-on-one contests" },
    "ContestDefensiveLossPercentage": { name: "Defensive one-on-one loss %" },
    "ContestOffensiveOneOnOnes": { name: "Offensive one-on-one contests" },
    "ContestOffensiveWinPercentage": { name: "Offensive one-on-one win %" },
    "Goals_Total": { name: "Goals (Total)", dec: 0 },
    "Goals_Avg": { name: "Goals (Average)" },
    "ShotsAtGoal": { name: "Shots At Goal" },
    "GoalAssists": { name: "Goal Assists" },
    "GoalAccuracy": { name: "Goal Accuracy" },
    "ScoreInvolvements": { name: "Score Involvements" },
    "ScoreInvolvementPercentage": { name: "Score Involvement %" },
    "Spoils": { name: "Spoils" }
};

const statDropdownX = document.querySelector("#stat-select-x");
const statDropdownY = document.querySelector("#stat-select-y");

for (col of Object.keys(chartColumns)) {
    const option = document.createElement("option");
    option.value = col;
    option.text = chartColumns[col].name;
    statDropdownX.appendChild(option);
    statDropdownY.appendChild(option.cloneNode(true));
}

statDropdownX.selectedIndex = 8;
statDropdownY.selectedIndex = 0;

let playerStats = {
    Player: [],
    Team: []
};
for (col of Object.keys(chartColumns)) {
    playerStats[col] = [];
}

let filteredRowCountPrevious = 0;
let filteredRowCount = 0;

window.addEventListener('DOMContentLoaded', (event) => {
    const dataTemp = Reactable.getInstance('player-stats-table').data;
    Reactable.onStateChange('player-stats-table', state => {
        filteredRowCount = Reactable.getInstance('player-stats-table').filteredRows.length;
        if (filteredRowCount !== filteredRowCountPrevious) {
            updateChart();
            filteredRowCountPrevious = filteredRowCount;
        }
    })

    for (dataRow of dataTemp) {
        for (col of ['Player', 'Team', ...Object.keys(chartColumns)]) {
            playerStats[col].push(dataRow[col])
        }
    }
    updateChart();
});

statDropdownX.addEventListener('change', (e) => { updateChart(); });
statDropdownY.addEventListener('change', (e) => { updateChart(); });

const updateChart = function () {
    const datasets = [];

    const data = [];
    const players = [];
    let x;

    const filteredRows = Object.keys(Reactable.getInstance('player-stats-table').filteredRowsById);

    playerStats[statDropdownX.value].forEach((element, index) => {
        if (filteredRows.includes(index.toString())) {
            x = parseFloat(element);
            data.push({ x: x, y: playerStats[statDropdownY.value][index] });
            players.push(playerStats.Player[index]);
        }
    });

    const dataset = {
        data: data,
        pointRadius: 4
    }
    datasets.push(dataset);

    chart.data.datasets = datasets;

    const xLabel = statDropdownX.options[statDropdownX.selectedIndex].text;
    const yLabel = statDropdownY.options[statDropdownY.selectedIndex].text;
    let xDec = chartColumns[statDropdownX.value].dec;
    let yDec = chartColumns[statDropdownY.value].dec;

    if (typeof xDec === 'undefined') { xDec = 1 };
    if (typeof yDec === 'undefined') { yDec = 1 };

    chart.options.scales.x.title.text = xLabel;
    chart.options.scales.y.title.text = yLabel;
    chart.options.plugins.tooltip.callbacks.label = function (context) {
        let tooltip = xLabel + ": " + context.parsed.x.toFixed(xDec);
        tooltip += ", " + yLabel + ": " + context.parsed.y.toFixed(yDec);
        return tooltip;
    };
    chart.options.plugins.tooltip.callbacks.beforeLabel = function (context) {
        let tooltip = players[context.dataIndex];
        return tooltip;
    };
    chart.update();
}

const ctx = document.getElementById('stats-chart');

const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: []
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: ""
                }
            },
            y: {
                title: {
                    display: true,
                    text: ""
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {}
            }
        }
    }

});