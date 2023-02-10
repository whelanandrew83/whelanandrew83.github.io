const viewChartButton = document.querySelector("#view-chart-button");
const closeSearchButton = document.querySelector("#close-search-button");
const overlay = document.querySelector("#overlay");

viewChartButton.addEventListener('click', () => { overlay.style.display = "block"; updateChart(); });
closeSearchButton.addEventListener('click', () => { overlay.style.display = "none"; });

const statDropdownX = document.querySelector("#stat-select-x");
const statDropdownY = document.querySelector("#stat-select-y");
const statHighlightColumn = document.querySelector("#stat-highlight-column");
const statHighlight = document.querySelector("#stat-highlight");

const updateHighlightOptions = function () {
    if (statHighlight) {
        statHighlight.innerHTML = "";
        let option = document.createElement("option");
        option.value = "";
        option.text = "";
        statHighlight.appendChild(option);

        highlightColumn = statHighlightColumn ? statHighlightColumn.value : highlightColumn;

        for (col of highlightValueOptions[highlightColumn].sort()) {
            const option = document.createElement("option");
            option.value = col;
            option.text = col;
            if (typeof highlightColumns !== "undefined" && highlightColumns[highlightColumn].default) {
                option.selected = col.toString() === highlightColumns[highlightColumn].default.toString() ||
                    (highlightColumns[highlightColumn].default === "_max" && col === Math.max(...highlightValueOptions[highlightColumn])) ||
                    (highlightColumns[highlightColumn].default === "_min" && col === Math.min(...highlightValueOptions[highlightColumn])) ? true : false;
            }
            statHighlight.appendChild(option);
        }
    }
}

const highlightValueOptions = {};

if (statHighlightColumn && highlightColumns) {
    for (col of Object.keys(highlightColumns)) {
        let option = document.createElement("option");
        option.value = col;
        option.text = highlightColumns[col].name;
        statHighlightColumn.appendChild(option);

        highlightValueOptions[col] = [];
    }

    statHighlightColumn.addEventListener('change', () => {
        updateHighlightOptions();
        updateChart(false);
    });
} else if (typeof highlightColumn !== 'undefined') {
    highlightValueOptions[highlightColumn] = [];
}

if (statHighlight) {
    statHighlight.addEventListener('change', () => {
        if (typeof highlightColumns !== "undefined" && highlightColumns[highlightColumn]) {
            highlightColumns[highlightColumn].default = statHighlight.value;
        }
        updateChart(false);
    });
}

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
let chartStatColumns = [...labelColumns, ...Object.keys(chartColumns)];
if (typeof highlightColumns !== "undefined") {
    chartStatColumns = [...new Set([...chartStatColumns, ...Object.keys(highlightColumns)])]
}
if (typeof highlightColumn !== "undefined") {
    chartStatColumns = [...new Set([...chartStatColumns, highlightColumn])]
};

for (col of chartStatColumns) {
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
        for (col of chartStatColumns) {
            chartStats[col].push(dataRow[col]);
            if ((typeof highlightColumns !== 'undefined' && Object.keys(highlightColumns).indexOf(col) >= 0 ||
                typeof highlightColumn !== 'undefined' && col === highlightColumn) && !highlightValueOptions[col].includes(dataRow[col])) {
                highlightValueOptions[col].push(dataRow[col]);
            }
        }
    }

    updateHighlightOptions();
    updateChart();
});

statDropdownX.addEventListener('change', (e) => { updateChart(); });
statDropdownY.addEventListener('change', (e) => { updateChart(); });

const updateChart = function (animation = true) {
    const datasets = [];

    const data = [];
    const dataHighlight = [];
    const labels = [];
    const labelsHighlight = [];
    let x;

    const filteredRows = Object.keys(Reactable.getInstance(reactableId).filteredRowsById);

    const highlightValue = statHighlight ? statHighlight.options[statHighlight.selectedIndex].text : null;

    chartStats[statDropdownX.value].forEach((element, index) => {
        if (filteredRows.includes(index.toString())) {
            x = parseFloat(element);
            if (typeof highlightColumn === 'string' && highlightValue && chartStats[highlightColumn][index].toString() === highlightValue) {
                dataHighlight.push({ x: x, y: chartStats[statDropdownY.value][index] });
                labelsHighlight.push(chartStats[labelColumns[0]][index] + (labelColumns.length == 1 ? "" : " (" + chartStats[labelColumns[1]][index] + ")"));
            } else {
                data.push({ x: x, y: chartStats[statDropdownY.value][index] });
                labels.push(chartStats[labelColumns[0]][index] + (labelColumns.length == 1 ? "" : " (" + chartStats[labelColumns[1]][index] + ")"));
            }
        }
    });

    const dataset = {
        data: data,
        pointRadius: 4,
        order: 2,
        borderColor: '#58afed',
        backgroundColor: '#9ad0f5'
        //,
        // borderColor: function (context) {
        //     var index = context.dataIndex;
        //     return highlightedValues[index] ? '#ed5858' : '#58afed';
        // },
        // backgroundColor: function (context) {
        //     var index = context.dataIndex;
        //     return highlightedValues[index] ? '#f59a9a' : '#9ad0f5';
        // }
    }
    datasets.push(dataset);

    if (typeof highlightColumn === 'string' && highlightValue) {
        const datasetHighlight = {
            data: dataHighlight,
            pointRadius: 4,
            order: 1,
            borderColor: '#ed5858',
            backgroundColor: '#f59a9a'
        }
        datasets.push(datasetHighlight);
    }

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
        if (context.datasetIndex == 0) {
            let tooltip = labels[context.dataIndex];
            return tooltip;
        } else {
            let tooltip = labelsHighlight[context.dataIndex];
            return tooltip;
        }
    };

    if (animation) {
        chart.update();
    } else {
        chart.update('none');
    }
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