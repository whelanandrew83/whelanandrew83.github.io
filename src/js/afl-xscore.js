let xscore;
let filterLookups;
fetch(`https://www.wheeloratings.com/src/xscore/xscore_testing.json`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        xscore = data.Data[0];
        filterLookups = data.Filters;
    });


const aggregate = (obj, groupBy, filter) => {
    // using reduce() method to aggregate 
    const res = { Index: [], Grouping1: [], Grouping2: [], Shots: [], Score: [], xScore: [], Diff: [], ScorePerShot: [], xScorePerShot: [], DiffPerShot: [] };
    let groupByValue2;

    obj[groupBy[0]].forEach((groupByValue, i) => {

        let filtered = true;
        Object.keys(filter).forEach((filterColumn) => {
            filtered = filtered & (filter[filterColumn].length == 0 | filter[filterColumn].includes(obj[filterColumn][i]));
        });

        if (filtered) {
            if (groupBy.length > 1) {
                groupByValue2 = obj[groupBy[1]][i];
                groupByIndex = `${groupByValue}|${groupByValue2}`;
            } else groupByIndex = groupByValue;

            index = res.Index.indexOf(groupByIndex);

            if (index < 0) {
                res.Index.push(groupByIndex);
                res.Grouping1.push(groupByValue);
                res.Grouping2.push(groupByValue2);
                res.Shots.push(0);
                res.Score.push(0);
                res.xScore.push(0);
                index = res.Index.length - 1;
            }

            res.Shots[index] += obj.Shots[i];
            res.Score[index] += obj.Score[i];
            res.xScore[index] += obj.xScore[i];
        }
    });

    res.Index.forEach((groupByValue, i) => {
        res.Diff[i] = res.Score[i] - res.xScore[i];
        res.ScorePerShot[i] = res.Score[i] / res.Shots[i];
        res.xScorePerShot[i] = res.xScore[i] / res.Shots[i];
        res.DiffPerShot[i] = res.Diff[i] / res.Shots[i];
    });

    return res;
}


let filters = { Team: ["gc", "melb"], Pocket: [] };
filters = {};

aggregate(xscore, "PlayerIndex", filters)
aggregate(xscore, "Team", filters)
aggregate(xscore, "Team", {})

aggregate(xscore, "Distance", {})
aggregate(xscore, "Pocket", {})

Reactable.setData("xscore-table", aggregate(xscore, ["PlayerIndex"], filters))