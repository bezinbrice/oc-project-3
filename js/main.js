/*//On insère la carte
let myMap = L.map('map').setView([47.218371,-1.553621], 15);

//On charge les "tuiles"
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 10,
    maxZoom: 20,
}).addTo(myMap);

//On affiche les marqueurs sur la carte

var marker = L.marker([47.2183,-1.553621]).addTo(myMap);

//On intégre la requête API pour les vélos et les stations
var request = new XMLHttpRequest();
request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=ca4d9ec415c6fc10410facf985cac298579c24f1");
request.responseType = 'json';
request.send();
request.onload = function(){
    var stationsVelos = request.response;
    afficherStations(stationsVelos);
}

function afficherStations(jsonObj){
    let stations =jsonObj.name;
    
    for(let i = 0; i< jsonObj.length; i++){
    var gare = L.marker([jsonObj[i].position.lat,jsonObj[i].position.lng]).addTo(myMap);
    gare.bindPopup(jsonObj[i].name);
    }
} */

