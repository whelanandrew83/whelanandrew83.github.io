const fetchStops = function () {
    stops = {
        id: [],
        name: [],
        latitude: [],
        longitude: []
    }
    fetch(`https://tas.mattersoft.fi/timetable/rest/stops`)
        .then((res) => res.json())
        .then((data) => {
            data;
            console.log(data)

            data.forEach(stop => {
                stops.id.push(stop.id);
                stops.name.push(stop.name);
                stops.latitude.push(stop.location.latitude);
                stops.longitude.push(stop.location.longitude);
            });

            Reactable.setData("stops-table", stops);
        });
}

const formatTime = function (unix_timestamp) {
    var utc = new Date();
    var offset = utc.getTimezoneOffset();
    var local = new Date(unix_timestamp + offset * 60000);

    return local.toLocaleTimeString().substring(0, 5);
}

const fetchStopDisplay = function () {
    stopDisplay = {
        route: [],
        destination: [],
        estimatedDuration: [],
        scheduledDuration: [],
        scheduledTime: [],
        estimatedDurationNext: [],
        scheduledDurationNext: [],
        scheduledTimeNext: []
    }
    if (stop)
        fetch(`https://tas.mattersoft.fi/timetable/rest/stopdisplays/${stop}`)
            .then((res) => res.json())
            .then((data) => {
                data;
                console.log(data)

                stop_details = data.stop;
                console.log(stop_details);

                data.nextStopVisits.forEach(stopVisit => {
                    stopDisplay.route.push(stopVisit.directionOfLine.lineNumber);
                    stopDisplay.destination.push(stopVisit.directionOfLine.destinationName);
                    stopDisplay.estimatedDuration.push(stopVisit.stopVisits[0].estimatedMinutesUntilDeparture);
                    stopDisplay.scheduledDuration.push(stopVisit.stopVisits[0].scheduledMinutesUntilDeparture);
                    stopDisplay.scheduledTime.push(formatTime(stopVisit.stopVisits[0].scheduledArrivalTime));

                    if (stopVisit.stopVisits.length > 1) {
                        stopDisplay.estimatedDurationNext.push(stopVisit.stopVisits[1].estimatedMinutesUntilDeparture);
                        stopDisplay.scheduledDurationNext.push(stopVisit.stopVisits[1].scheduledMinutesUntilDeparture);
                        stopDisplay.scheduledTimeNext.push(formatTime(stopVisit.stopVisits[1].scheduledArrivalTime));
                    }
                });

                Reactable.setData("stops-display-table", stopDisplay);
            });
}

if (!stop) {
    fetchStops();
    document.getElementById("stops-table").classList.remove("d-none");
    document.getElementById("stops-display-table").classList.add("d-none");
} else {
    fetchStopDisplay();
    document.getElementById("stops-table").classList.add("d-none");
    document.getElementById("stops-display-table").classList.remove("d-none");
}