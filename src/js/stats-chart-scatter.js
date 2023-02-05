const viewChartButton = document.querySelector("#view-chart-button");
const closeSearchButton = document.querySelector("#close-search-button");
const overlay = document.querySelector("#overlay");

viewChartButton.addEventListener('click', () => { overlay.style.display = "block"; updateChart(); });
closeSearchButton.addEventListener('click', () => { overlay.style.display = "none"; });

const statDropdownX = document.querySelector("#stat-select-x");
const statDropdownY = document.querySelector("#stat-select-y");

let optionGroupX;
let optionGroupY;

const nonHeadingOptions = [];

for (col of Object.keys(chartColumns)) {
    if (chartColumns[col].heading) {
        optionGroupX = document.createElement("optgroup");
        optionGroupX.label = chartColumns[col].name;
        optionGroupY = optionGroupX.cloneNode(true);
        statDropdownX.appendChild(optionGroupX);
        statDropdownY.appendChild(optionGroupY);
    } else {
        const option = document.createElement("option");
        option.value = col;
        option.text = chartColumns[col].name;
        nonHeadingOptions.push(col);
        if (optionGroupX) {
            optionGroupX.appendChild(option);
            optionGroupY.appendChild(option.cloneNode(true));
        } else {
            statDropdownX.appendChild(option);
            statDropdownY.appendChild(option.cloneNode(true));
        }
    }
}

statDropdownX.selectedIndex = nonHeadingOptions.indexOf(defaultX) < 0 ? 0 : nonHeadingOptions.indexOf(defaultX);
statDropdownY.selectedIndex = nonHeadingOptions.indexOf(defaultY) < 0 ? 0 : nonHeadingOptions.indexOf(defaultY);

let chartStats = {};
for (col of [...labelColumns, ...Object.keys(chartColumns)]) {
    chartStats[col] = [];
}

// let filteredRowCountPrevious = 0;
// let filteredRowCount = 0;

window.addEventListener('DOMContentLoaded', (event) => {
    // Reactable.onStateChange(reactableId, state => {
    //     filteredRowCount = Reactable.getInstance(reactableId).filteredRows.length;
    //     if (filteredRowCount !== filteredRowCountPrevious) {
    //         updateChart();
    //         filteredRowCountPrevious = filteredRowCount;
    //     }
    // })

    const dataTemp = Reactable.getInstance(reactableId).data;
    for (dataRow of dataTemp) {
        for (col of [...new Set([...labelColumns, ...Object.keys(chartColumns)])]) {
            chartStats[col].push(dataRow[col])
        }
    }
    updateChart();
});

statDropdownX.addEventListener('change', (e) => { updateChart(); });
statDropdownY.addEventListener('change', (e) => { updateChart(); });

const updateChart = function () {
    const datasets = [];

    const data = [];
    const labels = [];
    let x;

    const filteredRows = Object.keys(Reactable.getInstance(reactableId).filteredRowsById);

    chartStats[statDropdownX.value].forEach((element, index) => {
        if (filteredRows.includes(index.toString())) {
            x = parseFloat(element);
            data.push({ x: x, y: chartStats[statDropdownY.value][index] });
            labels.push(chartStats[labelColumns[0]][index] + (labelColumns.length == 1 ? "" : " (" + chartStats[labelColumns[1]][index] + ")"));
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

    if (typeof chartColumns !== 'undefined' && chartColumns[statDropdownX.value].reverse) {
        chart.options.scales.x.reverse = true;
    } else {
        chart.options.scales.x.reverse = false;
    }
    if (typeof chartColumns !== 'undefined' && chartColumns[statDropdownY.value].reverse) {
        chart.options.scales.y.reverse = true;
    } else {
        chart.options.scales.y.reverse = false;
    }

    chart.options.scales.x.title.text = xLabel;
    chart.options.scales.y.title.text = yLabel;
    chart.options.plugins.tooltip.callbacks.label = function (context) {
        let tooltip = xLabel + ": " + context.parsed.x.toFixed(xDec);
        tooltip += ", " + yLabel + ": " + context.parsed.y.toFixed(yDec);
        return tooltip;
    };
    chart.options.plugins.tooltip.callbacks.beforeLabel = function (context) {
        let tooltip = labels[context.dataIndex];
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
                    text: "",
                    font: {
                        weight: "bold"
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: "",
                    font: {
                        weight: "bold"
                    }
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