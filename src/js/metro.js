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

let metroFavouriteStops = {};
let metroDefaultStop;

if (storageAvailable('localStorage')) {
    metroFavouriteStops = JSON.parse(localStorage.getItem("metroFavouriteStops"));
    if (!metroFavouriteStops)
        metroFavouriteStops = {};
    metroDefaultStop = JSON.parse(localStorage.getItem("metroDefaultStop"));
    if (!stop) {
        if (metroDefaultStop)
            stop = metroDefaultStop;
        else if (Object.keys(metroFavouriteStops).length > 0)
            stop = Object.keys(metroFavouriteStops)[0];
    }
}

const saveFavouriteStops = function () {
    if (storageAvailable('localStorage')) {
        if (Object.keys(metroFavouriteStops).length === 0)
            localStorage.removeItem("metroFavouriteStops");
        else
            localStorage.setItem("metroFavouriteStops", JSON.stringify(metroFavouriteStops));
        if (!metroDefaultStop) localStorage.removeItem("metroDefaultStop");
    }
}

const saveDefaultStop = function () {
    if (storageAvailable('localStorage')) {
        metroDefaultStop = stop_details.id;
        localStorage.setItem("metroDefaultStop", JSON.stringify(metroDefaultStop));
        defaultButton.disabled = true;
        refreshFavouriteView();
    }
}

const isFavouriteStop = function (id) {
    return Object.keys(metroFavouriteStops).includes(id);
}

let mapMarkers = {
    favourites: [],
    nearby: []
};

const markerPopupText = function (stopName, stopId) {
    return `<b>${stopName}</b><br><a href="#" onclick="selectStop('${stopId}')" style="color: #670099">View Stop</a>`
}

const refreshFavouriteView = function () {
    favouritesTableData = {
        id: [],
        name: []
    }
    if (mapMarkers.favourites.length > 0)
        mapMarkers.favourites.forEach(marker => marker.remove())
    mapMarkers.favourites = [];
    let marker;

    if (Object.keys(metroFavouriteStops).length === 0) {
        favouriteStopsDiv.classList.add("d-none");
        Reactable.setData("favourite-stops-table", favouritesTableData);
    } else {
        Object.keys(metroFavouriteStops).forEach(stop => {
            favouritesTableData.id.push(metroFavouriteStops[stop].id);
            favouritesTableData.name.push(metroFavouriteStops[stop].name);

            marker = L.marker([metroFavouriteStops[stop].location.latitude, metroFavouriteStops[stop].location.longitude], { opacity: 0.75, zIndexOffset: -10000 }).bindPopup(markerPopupText(metroFavouriteStops[stop].name, metroFavouriteStops[stop].id)).addTo(map);
            //marker = L.circle([metroFavouriteStops[stop].location.latitude, metroFavouriteStops[stop].location.longitude], { color: "red", radius: 50 }).bindPopup(`<b>${metroFavouriteStops[stop].name}</b>`).addTo(map);
            mapMarkers.favourites.push(marker);
        })
        Reactable.setData("favourite-stops-table", favouritesTableData);
        favouriteStopsDiv.classList.remove("d-none");
    }
}

const addRemoveFavouriteStop = function () {
    if (isFavouriteStop(stop_details.id)) {
        delete metroFavouriteStops[stop_details.id];
        favouriteButton.innerText = "Add Favourite"
        if (metroDefaultStop && metroDefaultStop === stop_details.id) {
            metroDefaultStop = null;
            defaultButton.disabled = false;
        }
    } else {
        metroFavouriteStops[stop_details.id] = stop_details;
        favouriteButton.innerText = "Remove Favourite"
    }

    saveFavouriteStops();
    refreshFavouriteView();
}

let view;

const setView = function () {
    if (view === "stops") {
        stopsTableDiv.classList.remove("d-none");
        stopsDisplayDiv.classList.add("d-none");

        window.setTimeout(() => {
            stopsTableDiv.scrollIntoView();
            map.invalidateSize();
        }, 100)
    } else if (view === "stops-display") {
        stopsTableDiv.classList.add("d-none");
        stopsDisplayTable.classList.remove("d-none");
        stopsDisplayDiv.classList.remove("d-none");
        window.setTimeout(() => {
            map.invalidateSize();
        }, 100)
    }
}

mainViewDiv = document.getElementById("main-view");

stopsTable = document.getElementById("stops-table");
stopsTableDiv = document.getElementById("stops-table-view");
favouriteStopsDiv = document.getElementById("favourite-stops-view");

stopsDisplayDiv = document.getElementById("stops-display");
stopsDisplayTable = document.getElementById("stops-display-table");

const refreshButton = document.querySelector("#refresh-button");
refreshButton.addEventListener('click', (e) => { fetchStopDisplay() });

const refreshButtonText = document.querySelector("#refresh-button-text");

const loadingIcon = document.querySelector("#loading-icon");
const refreshIcon = document.querySelector("#refresh-icon");

const favouriteButton = document.querySelector("#favourite-button");
favouriteButton.addEventListener('click', (e) => { addRemoveFavouriteStop() });

const parentStation = document.querySelector("#parent-station");

const defaultButton = document.querySelector("#default-button");
defaultButton.addEventListener('click', (e) => { saveDefaultStop() });

const pageLoading = function (loading = true) {
    if (loading) {
        mainViewDiv.classList.add("d-none");
        loadingIcon.classList.remove("d-none");
    } else {
        mainViewDiv.classList.remove("d-none");
        loadingIcon.classList.add("d-none");
    }
}

const stopsLoading = function (loading = true, error = false) {
    if (loading) {
        refreshButtonText.innerText = "Loading";
        refreshButton.disabled = true;
        //refreshError.classList.add("d-none");
        refreshIcon.classList.remove("d-none");
    } else {
        refreshButtonText.innerText = "Refresh";
        refreshButton.disabled = false;
        refreshIcon.classList.add("d-none");
        if (error) {
            //refreshError.classList.remove("d-none");
        } else {
            //refreshError.classList.add("d-none");
        }
        window.setTimeout(() => {
            document.getElementById("current-stop").scrollIntoView();
        }, 100)

    }
}

stops = {
    id: [],
    name: [],
    latitude: [],
    longitude: [],
    distance: []
}

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

// const successCallback = (position) => {
//     let lat = position.coords.latitude;
//     let lng = position.coords.longitude;
//     console.log({ lat, lng })

//     for (let i = 0; i < stops.id.length; i++) {
//         stops.distance[i] = Math.round(distance(stops.latitude[i], stops.longitude[i], lat, lng, "K") * 100) / 100;
//     }
//     Reactable.setData("stops-table", stops);
//     Reactable.setHiddenColumns("stops-table", ["latitude", "longitude"]);
// };

// const errorCallback = (error) => {
//     console.log(error);
// };

// const calculateDistance = function () {
//     const options = {
//         enableHighAccuracy: true,
//         timeout: 10000,
//     };

//     navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
// }

// document.getElementById("distance-button").addEventListener('click', (e) => { calculateDistance() });

const clearNearbyStops = function () {
    if (mapMarkers.nearby.length > 0)
        mapMarkers.nearby.forEach(marker => marker.remove())
    mapMarkers.nearby = [];
}

const findNearbyStops = function (latlng) {
    let lat = latlng.lat;
    let lng = latlng.lng;

    clearNearbyStops();
    let marker;

    for (let i = 0; i < stops.id.length; i++) {
        stops.distance[i] = Math.round(distance(stops.latitude[i], stops.longitude[i], lat, lng, "K") * 100) / 100;

        if (stops.distance[i] <= 0.5) {
            marker = L.marker([stops.latitude[i], stops.longitude[i]], { opacity: 0.75, zIndexOffset: -10000 }).bindPopup(markerPopupText(stops.name[i], stops.id[i])).addTo(map);
            marker._icon.style.filter = "hue-rotate(75deg)"
            //marker = L.circle([metroFavouriteStops[stop].location.latitude, metroFavouriteStops[stop].location.longitude], { color: "red", radius: 50 }).bindPopup(`<b>${metroFavouriteStops[stop].name}</b>`).addTo(map);
            mapMarkers.nearby.push(marker);
        }
    }
    Reactable.setData("stops-table", stops);
    Reactable.setHiddenColumns("stops-table", ["latitude", "longitude"]);
};

const fetchStops = function (changeView = true) {
    if (stops.id.length == 0) {

        if (changeView) pageLoading(true);

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
                //console.log(data)

                data.forEach(stop => {

                    stops.id.push(stop.id);
                    stops.name.push(stop.name);
                    stops.latitude.push(stop.location.latitude);
                    stops.longitude.push(stop.location.longitude);
                    stops.distance.push(null);
                });

                Reactable.setData("stops-table", stops);
                if (changeView) {
                    setView();
                    pageLoading(false);
                }
            });
    } else {
        if (changeView) {
            setView();
        }
    }
}

const formatTime = function (unix_timestamp) {
    if (!unix_timestamp) return "";

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
    stopsLoading(true);

    stopDisplay = {
        stopName: [],
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
    //try { Reactable.setData("stops-display-table", stopDisplay); } catch (error) { };

    stopsTableDiv.classList.add("d-none");

    if (stop)
        fetch(`https://tas.mattersoft.fi/timetable/rest/stopdisplays/${stop}`)
            .then((res) => res.json())
            .then((data) => {
                data;
                //console.log(data)

                stop_details = data.stop;
                document.getElementById("current-stop").innerText = stop_details.name;

                let d = new Date();
                document.getElementById("refresh-time").innerText = `Refreshed at ${d.toLocaleTimeString()}, ${d.toLocaleDateString()}`;

                if (isFavouriteStop(stop_details.id))
                    favouriteButton.innerText = "Remove Favourite"
                else
                    favouriteButton.innerText = "Add Favourite"
                if (stop === metroDefaultStop)
                    defaultButton.disabled = true;
                else
                    defaultButton.disabled = false;
                if (stop_details.parentStation) {
                    parentStation.setAttribute('onclick', `selectStop('${stop_details.parentStation}')`);
                    parentStation.classList.remove("d-none");
                } else {
                    parentStation.setAttribute('onclick', "");
                    parentStation.classList.add("d-none");
                }
                if (currentMarker) {
                    currentMarker = currentMarker.setLatLng([stop_details.location.latitude, stop_details.location.longitude]);
                    currentMarker.setPopupContent(`${markerPopupText(stop_details.name, stop_details.id)}`)
                } else {
                    currentMarker = L.marker([stop_details.location.latitude, stop_details.location.longitude]).bindPopup(markerPopupText(stop_details.name, stop_details.id)).addTo(map);
                    currentMarker._icon.style.filter = "hue-rotate(150deg)"
                }
                clearNearbyStops();
                map.setView([stop_details.location.latitude, stop_details.location.longitude], 14);
                map.closePopup();
                //console.log(stop_details);

                data.nextStopVisits.forEach(stopVisit => {
                    stopDisplay.route.push(stopVisit.directionOfLine.lineNumber);
                    stopDisplay.destination.push(stopVisit.directionOfLine.destinationName);

                    let visit = stopVisit.stopVisits[0];
                    stopDisplay.stopName.push(visit.stopName);

                    if (visit.estimatedMinutesUntilDeparture == null) {
                        stopDisplay.scheduledDuration.push(visit.scheduledMinutesUntilDeparture);
                        stopDisplay.scheduledTime.push(formatTime(visit.scheduledDepartureTime));
                        stopDisplay.isEstimate.push(0);
                        stopDisplay.delay.push(null);
                    } else {
                        stopDisplay.scheduledDuration.push(visit.estimatedMinutesUntilDeparture);
                        stopDisplay.scheduledTime.push(formatTime(visit.estimatedDepartureTime));
                        stopDisplay.isEstimate.push(1);
                        stopDisplay.delay.push(visit.estimatedMinutesUntilDeparture - visit.scheduledMinutesUntilDeparture);
                    }

                    if (stopVisit.stopVisits.length > 1) {
                        visit = stopVisit.stopVisits[1];
                        if (visit.estimatedMinutesUntilDeparture == null) {
                            stopDisplay.scheduledDurationNext.push(visit.scheduledMinutesUntilDeparture);
                            stopDisplay.scheduledTimeNext.push(formatTime(visit.scheduledDepartureTime));
                            stopDisplay.isEstimateNext.push(0);
                        } else {
                            stopDisplay.scheduledDurationNext.push(visit.estimatedMinutesUntilDeparture);
                            stopDisplay.scheduledTimeNext.push(formatTime(visit.estimatedDepartureTime));
                            stopDisplay.isEstimateNext.push(1);
                        }
                    }
                });

                Reactable.setData("stops-display-table", stopDisplay);
                setView();
                stopsLoading(false);
                pageLoading(false);
            });
}

window.addEventListener('DOMContentLoaded', (event) => { refreshFavouriteView() });

if (!stop) {
    view = "stops"
    fetchStops();
} else {
    view = "stops-display"
    fetchStops(false);
    fetchStopDisplay();
}

const selectStop = function (stopId) {
    pageLoading(true);
    view = "stops-display";
    stop = stopId;
    fetchStopDisplay();
    history.replaceState(null, '', `metro.html?stop=${stop}`);
}

document.getElementById("view-stops").addEventListener('click', (e) => {
    view = "stops";
    fetchStops();
    history.replaceState(null, '', `metro.html`);
})

let map = L.map('map').setView([-42.88, 147.33], 13);
let currentMarker;
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', function (ev) {
    if (stops.id.length === 0) fetchStops(false);
    findNearbyStops(ev.latlng)
});