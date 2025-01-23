stops = {
    id: [],
    name: [],
    latitude: [],
    longitude: []
}

const fetchStops = function () {
    if (stops.id.length == 0) {

        // stops = {
        //     id: [],
        //     name: [],
        //     latitude: [],
        //     longitude: []
        // }

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
}

const formatTime = function (unix_timestamp) {
    let utc = new Date();
    let offset = utc.getTimezoneOffset();
    let local = new Date(unix_timestamp + offset * 60000);
    let hours = local.getHours();
    let minutes = local.getMinutes();

    hours = `0${hours}`;
    hours = hours.substr(hours.length - 2);

    minutes = `0${minutes}`;
    minutes = minutes.substr(minutes.length - 2);

    //return local.toLocaleTimeString().substring(0, 5);
    return `${hours}:${minutes}`
}

const fetchStopDisplay = function () {
    stopDisplay = {
        route: [],
        destination: [],
        scheduledDuration: [],
        scheduledTime: [],
        isEstimate: [],
        delay: [],
        scheduledDurationNext: [],
        scheduledTimeNext: [],
        isEstimateNext: []
    }
    try { Reactable.setData("stops-display-table", stopDisplay); } catch (error) { };

    document.getElementById("stops-table").classList.add("d-none");
    document.getElementById("stops-display").classList.remove("d-none");
    document.getElementById("current-stop").innerText = "";

    if (stop)
        fetch(`https://tas.mattersoft.fi/timetable/rest/stopdisplays/${stop}`)
            .then((res) => res.json())
            .then((data) => {
                data;
                console.log(data)

                stop_details = data.stop;
                document.getElementById("current-stop").innerText = stop_details.name;
                console.log(stop_details);

                data.nextStopVisits.forEach(stopVisit => {
                    stopDisplay.route.push(stopVisit.directionOfLine.lineNumber);
                    stopDisplay.destination.push(stopVisit.directionOfLine.destinationName);
                    if (stopVisit.stopVisits[0].estimatedMinutesUntilDeparture == null) {
                        stopDisplay.scheduledDuration.push(stopVisit.stopVisits[0].scheduledMinutesUntilDeparture);
                        stopDisplay.scheduledTime.push(formatTime(stopVisit.stopVisits[0].scheduledArrivalTime));
                        stopDisplay.isEstimate.push(0);
                        stopDisplay.delay.push(null);
                    } else {
                        stopDisplay.scheduledDuration.push(stopVisit.stopVisits[0].estimatedMinutesUntilDeparture);
                        stopDisplay.scheduledTime.push(formatTime(stopVisit.stopVisits[0].estimatedArrivalTime));
                        stopDisplay.isEstimate.push(1);
                        stopDisplay.delay.push(stopVisit.stopVisits[0].estimatedMinutesUntilDeparture - stopVisit.stopVisits[0].scheduledMinutesUntilDeparture);
                    }

                    if (stopVisit.stopVisits.length > 1) {
                        if (stopVisit.stopVisits[1].estimatedMinutesUntilDeparture == null) {
                            stopDisplay.scheduledDurationNext.push(stopVisit.stopVisits[1].scheduledMinutesUntilDeparture);
                            stopDisplay.scheduledTimeNext.push(formatTime(stopVisit.stopVisits[1].scheduledArrivalTime));
                            stopDisplay.isEstimateNext.push(0);
                        } else {
                            stopDisplay.scheduledDurationNext.push(stopVisit.stopVisits[1].estimatedMinutesUntilDeparture);
                            stopDisplay.scheduledTimeNext.push(formatTime(stopVisit.stopVisits[1].estimatedArrivalTime));
                            stopDisplay.isEstimateNext.push(1);
                        }
                    }
                });

                Reactable.setData("stops-display-table", stopDisplay);
            });
}

if (!stop) {
    fetchStops();
    document.getElementById("stops-table").classList.remove("d-none");
    document.getElementById("stops-display").classList.add("d-none");
} else {
    fetchStopDisplay();
}

const selectStop = function (stopId) {
    stop = stopId;
    fetchStopDisplay();
    history.replaceState(null, '', `?stop=${stop}`);
}

document.getElementById("view-stops").addEventListener('click', (e) => {
    fetchStops();
    document.getElementById("stops-table").classList.remove("d-none");
    document.getElementById("stops-display").classList.add("d-none");
})