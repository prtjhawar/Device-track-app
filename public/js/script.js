const socket = io();

console.log("hey");

//alredy inbulid
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude })

        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );


}

//lef;id ek specfic cij deta
const map = L.map("map").setView([0,0], 16)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
).addTo(map)

const markers = {};

socket.on("recive-loction", (data) => {
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude], 16);
    if (markers[id]) {
        markers[id].setLatLang([latitude, longitude]);
    }
    else {
        markers[id] = L.marker([latitude, longitude]).addTo(map)
    }
});

socket.on("user-disconnect", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id]
    }



})

