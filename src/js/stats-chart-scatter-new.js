const viewChartButton = document.querySelector("#view-chart-button");
const closeSearchButton = document.querySelector("#close-search-button");
const overlay = document.querySelector("#overlay");

viewChartButton.addEventListener('click', () => { overlay.style.display = "block"; statDropdownX.focus(); updateChart(); });
closeSearchButton.addEventListener('click', () => { overlay.style.display = "none"; if (isTableSelect) Reactable.setFilter('player-stats-table', 'Select', undefined); });
document.addEventListener('keyup', (e) => {
    if (e.code === "Escape") {
        if (document.activeElement.id === "close-search-button") {
            overlay.style.display = "none";
            if (isTableSelect) Reactable.setFilter('player-stats-table', 'Select', undefined);
        } else
            closeSearchButton.focus();
    }
});

const statDropdownX = document.querySelector("#stat-select-x");
const statDropdownY = document.querySelector("#stat-select-y");
const statHighlightColumn = document.querySelector("#stat-highlight-column");
const statHighlight = document.querySelector("#stat-highlight");

let isTableSelect = false;

// if (typeof selectedRows !== "undefined") {
//     highlightColumns.Selection = { name: "Selected", default: null };
// }

const updateHighlightOptions = function () {
    if (statHighlight) {
        statHighlight.innerHTML = "";
        let option = document.createElement("option");
        option.value = "";
        option.text = "";
        statHighlight.appendChild(option);

        highlightColumn = statHighlightColumn ? statHighlightColumn.value : highlightColumn;

        for (col of highlightValueOptions[highlightColumn].sort()) {
            if (col) {
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
}

let pointStyleImages = {};
let pointStyleImageSource = [];
const highlightValueOptions = {};

if (statHighlightColumn && highlightColumns) {
    if (typeof selectedRows !== "undefined") {
        let option = document.createElement("option");
        option.value = 'Selection';
        option.text = 'Selected';
        statHighlightColumn.appendChild(option);

        highlightValueOptions['Selection'] = [];
    }

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

let chartStats = {};
let chartStatColumns = [];

const updateChartColumns = (cols) => {
    if (cols.indexOf('Select') >= 0) isTableSelect = true;

    Object.keys(chartColumns).forEach(key => {
        if (cols.indexOf(key) === -1 && !chartColumns[key].heading) { delete chartColumns[key] }
    });

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

    chartStatColumns = [...labelColumns, ...Object.keys(chartColumns)];
    if (typeof highlightColumns !== "undefined") {
        chartStatColumns = [...new Set([...chartStatColumns, ...Object.keys(highlightColumns)])]
    }
    if (typeof highlightColumn !== "undefined") {
        chartStatColumns = [...new Set([...chartStatColumns, highlightColumn])]
    };
    // if (chartStatColumns.indexOf('Selection') >= 0) {
    //     chartStatColumns.splice(chartStatColumns.indexOf('Selection'), 1);
    // }

    for (col of chartStatColumns) {
        chartStats[col] = [];
    }
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
    updateChartColumns(Object.keys(Reactable.getInstance(reactableId).data[0]));
    let imgSrc;
    let img;

    for (dataRow of dataTemp) {
        for (col of chartStatColumns) {
            chartStats[col].push(dataRow[col]);
            if ((typeof highlightColumns !== 'undefined' && Object.keys(highlightColumns).indexOf(col) >= 0 ||
                typeof highlightColumn !== 'undefined' && col === highlightColumn) && !highlightValueOptions[col].includes(dataRow[col])) {
                highlightValueOptions[col].push(dataRow[col]);
            }
        }
        if (typeof pointImageColumn !== "undefined") {
            if (dataRow[pointImageColumn]) {
                imgSrc = dataRow[pointImageColumn];

                img = new Image();
                img.src = imgSrc;
                if (window.innerWidth < 800) {
                    img.height = "15";
                    img.width = "15";
                } else {
                    img.height = "20";
                    img.width = "20";
                }
            } else {
                imgSrc = 'circle';
                img = 'circle';
            }
            if (!pointStyleImages[imgSrc]) {
                pointStyleImages[imgSrc] = img;
            }
            pointStyleImageSource.push(imgSrc);
        }
    }

    updateHighlightOptions();
    updateChart();
});

statDropdownX.addEventListener('change', (e) => { updateChart(); });
statDropdownY.addEventListener('change', (e) => { updateChart(); });

const updateChart = function (animation = false) {
    const datasets = [];

    const data = [];
    const dataHighlight = [];
    const labels = [];
    const labelsHighlight = [];
    const pointStyles = [];
    const pointStylesHighlight = [];
    let x;
    const xRange = [];
    const drawDiagonalLine = typeof diagonalLines !== "undefined" && diagonalLines[statDropdownX.value] === statDropdownY.value;

    const filteredRows = Object.keys(Reactable.getInstance(reactableId).filteredRowsById);

    const highlightValue = statHighlight ? statHighlight.options[statHighlight.selectedIndex].text : null;

    chartStats[statDropdownX.value].forEach((element, index) => {
        if (filteredRows.includes(index.toString())) {
            x = parseFloat(element);
            if (typeof highlightColumn === 'string' && ((highlightColumn === 'Selection' && selectedRows.indexOf(index) >= 0) || (highlightValue && chartStats[highlightColumn][index] && chartStats[highlightColumn][index].toString() === highlightValue))) {
                dataHighlight.push({ x: x, y: chartStats[statDropdownY.value][index], index: index });
                labelsHighlight.push(chartStats[labelColumns[0]][index] + (labelColumns.length == 1 ? "" : " (" + chartStats[labelColumns[1]][index] + ")"));
                if (Object.keys(pointStyleImages).length > 0) {
                    pointStylesHighlight.push(pointStyleImages[pointStyleImageSource[index]]);
                }
            } else {
                data.push({ x: x, y: chartStats[statDropdownY.value][index], index: index });
                labels.push(chartStats[labelColumns[0]][index] + (labelColumns.length == 1 ? "" : " (" + chartStats[labelColumns[1]][index] + ")"));
                if (Object.keys(pointStyleImages).length > 0) {
                    pointStyles.push(pointStyleImages[pointStyleImageSource[index]]);
                }
            }
            if (drawDiagonalLine) {
                if (xRange.length === 0) {
                    xRange.push(x, x);
                } else {
                    if (x < xRange[0]) xRange[0] = x;
                    if (x > xRange[1]) xRange[1] = x;
                }
            }
        }
    });

    const dataset = {
        data: data,
        pointRadius: 4,
        order: 2,
        borderColor: '#58afed',
        backgroundColor: '#9ad0f5'
    }
    if (Object.keys(pointStyleImages).length > 0 && pointStylesHighlight.length == 0 && pointStyles.length <= 50) {
        dataset.pointStyle = pointStyles;
    }
    datasets.push(dataset);

    if (typeof highlightColumn === 'string' && (highlightColumn === 'Selection' || highlightValue)) {
        const datasetHighlight = {
            data: dataHighlight,
            pointRadius: 4,
            order: 1,
            borderColor: '#ed5858',
            backgroundColor: '#f59a9a'
        }
        if (Object.keys(pointStyleImages).length > 0 && pointStylesHighlight.length <= 50) {
            datasetHighlight.pointStyle = pointStylesHighlight;
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
    if (drawDiagonalLine && xRange[0] < xRange[1]) {
        chart.options.plugins.annotation = {
            annotations: {
                diagonalLine: {
                    drawTime: 'beforeDatasetsDraw',
                    type: 'line',
                    borderWidth: 1,
                    xMin: xRange[0] - 0.05 * (xRange[1] - xRange[0]),
                    xMax: xRange[1] + 0.05 * (xRange[1] - xRange[0]),
                    yMin: xRange[0] - 0.05 * (xRange[1] - xRange[0]),
                    yMax: xRange[1] + 0.05 * (xRange[1] - xRange[0])
                }
            }
        }
    } else {
        delete chart.options.plugins.annotation;
    }

    if (animation) {
        chart.update();
    } else {
        chart.update('none');
    }
}

const ctx = document.getElementById('stats-chart');

let selectedPoints;

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
        },
        onClick: (event, elements, chart) => {
            if (highlightColumn === 'Selection' && elements[0]) {
                for (i = 0; i < elements.length; i++) selectRow(elements[i].element.$context.raw.index);
                updateChart(false);
            }
        }
    }

});