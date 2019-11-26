//On insère la carte
const map = {
    myMap: L.map('map').setView([47.218371,-1.553621], 15),
    stations: [],
    markerCluster: L.markerClusterGroup(),
    request: new XMLHttpRequest(),
    iconColor: null,
    
    init() {
        //On charge les "tuiles"
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 10,
            maxZoom: 20,
        }).addTo(map.myMap);
        map.getJson()   
    },

    getJson() {
        //On intégre la requête API pour les vélos et les stations
        map.request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=ca4d9ec415c6fc10410facf985cac298579c24f1");
        map.request.responseType = 'json';
        map.request.send();
        map.request.onload = function(){
            map.stations = map.request.response ;
            map.getIcons()
        }
    },

    getIcons() {
        //On personnalise nos marqueurs
       var Icons = L.Icon.extend({
            options: {
                iconSize: [50, 50],
                iconAnchor:[25, 50],
                popupAnchor: [0, -50]
            }   
        });
        var greenIcons = new Icons({iconUrl: "../assets/marker-green.svg"}),
              redIcons = new Icons({iconUrl: "../assets/marker-red.svg"}),
              yellowIcons = new Icons({iconUrl: "../assets/marker-yellow.svg"});
        
        map.getMarkers(greenIcons, redIcons, yellowIcons) 
        
    },

    colorIcons(station, greenIcons, redIcons, yellowIcons) {
        if(map.stations[station].status === "OPEN" && map.stations[station].available_bikes > 5){
            map.iconColor = greenIcons
        } else if (map.stations[station].available_bikes < 4){
            map.iconColor = yellowIcons 
        }else if(map.stations[station].status === "CLOSE" && map.stations[station].available_bikes === 0){
            map.iconColor = redIcons
        }
     
    },

    getMarkers(greenIcons, redIcons, yellowIcons) {
        //On affiche les marqueurs sur la carte
     
        for(let station = 0; station < map.stations.length; station++){
            map.colorIcons(station, greenIcons, redIcons, yellowIcons)
            var markers = L.marker([map.stations[station].position.lat, map.stations[station].position.lng], {icon: map.iconColor}) ; //.addTo(myMap); Inutile avec les clusters
            var lien = markers.addEventListener("click", function() {map.afficherInfos(station)})
            
            markers.bindPopup(lien);
            markers.bindPopup(map.stations[station].name)
            
        //On ajoute les marqueurs "stations" aux clusters
            map.markerCluster.addLayer(markers);
            map.myMap.addLayer(map.markerCluster);
            
           // map.markers.bindPopup(map.stations[station].name).onclick = map.afficherInfos
          
        }
     
     
        
    },

    afficherInfos(station){
        
        document.getElementById("aside-infos--select-station").style.display = "none";
        document.getElementById("station-name").textContent = map.stations[station].name
          
        
      
    },

};












