let xscore;
fetch(`https://www.wheeloratings.com/src/js/xscore_testing.json`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        xscore = data;
    });


const aggregate = (obj, groupBy, filter) => {
    // using reduce() method to aggregate 
    const res = { Grouping: [], Shots: [], Score: [], xScore: [], Diff: [], ScorePerShot: [], xScorePerShot: [], DiffPerShot: [] };

    obj[groupBy].forEach((groupByValue, i) => {

        let filtered = true;
        Object.keys(filter).forEach((filterColumn) => {
            filtered = filtered & (filter[filterColumn].length == 0 | filter[filterColumn].includes(obj[filterColumn][i]));
        });

        if (filtered) {
            index = res.Grouping.indexOf(groupByValue);

            if (index < 0) {
                res.Grouping.push(groupByValue);
                res.Shots.push(0);
                res.Score.push(0);
                res.xScore.push(0);
                index = res.Grouping.length - 1;
            }

            res.Shots[index] += obj.Shots[i];
            res.Score[index] += obj.Score[i];
            res.xScore[index] += obj.xScore[i];
        }
    });

    res.Grouping.forEach((groupByValue, i) => {
        res.Diff[i] = res.Score[i] - res.xScore[i];
        res.ScorePerShot[i] = res.Score[i] / res.Shots[i];
        res.xScorePerShot[i] = res.xScore[i] / res.Shots[i];
        res.DiffPerShot[i] = res.Diff[i] / res.Shots[i];
    });

    return res;
}


const filters = { Team: ["gc", "melb"], Pocket: [] };

aggregate(xscore, "Player", filters)
aggregate(xscore, "Team", filters)
aggregate(xscore, "Team", {})