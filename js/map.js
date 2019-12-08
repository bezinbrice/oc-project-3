//On insère la carte
const map = {
    myMap: L.map('map').setView([47.218371,-1.553621], 15),
    stations: [],
    markerCluster: L.markerClusterGroup(),
    request: new XMLHttpRequest(),
    iconColor: null,
    selectedStation: "",
    reservedStation: null,
    
    init() {
        //On charge les "tuiles"
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 10,
            maxZoom: 20,
        }).addTo(map.myMap);
        map.getJson()
        stamp.start()   
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
        if(map.stations[station].status === "OPEN" && map.stations[station].available_bikes >= 5){
            map.iconColor = greenIcons
        } else if(map.stations[station].status === "CLOSED" || map.stations[station].available_bikes === 0){
            map.iconColor = redIcons
        } else if (map.stations[station].status === "OPEN" && map.stations[station].available_bikes < 5){
            map.iconColor = yellowIcons 
        }
    },

    getMarkers(greenIcons, redIcons, yellowIcons) {
        //On affiche les marqueurs sur la carte
        for(let station = 0; station < map.stations.length; station++){
            map.colorIcons(station, greenIcons, redIcons, yellowIcons) //Retour sur la fonction colorIcons pour obtenir la couleur des marqueurs
            var markers = L.marker([map.stations[station].position.lat, map.stations[station].position.lng], {icon: map.iconColor}) ; //.addTo(myMap); Inutile avec les clusters
            var clickPopup = markers.addEventListener("click", function() {map.getInformations(station)})
            var shortName = map.stations[station].name.substring(map.stations[station].name.indexOf("-") + 1) //On raccourci la partie inutile du nom de la station
            markers.bindPopup(clickPopup)
            markers.bindPopup(shortName)
            
        //On ajoute les marqueurs "stations" aux clusters
            map.markerCluster.addLayer(markers);
            map.myMap.addLayer(map.markerCluster);
        }    
    },

    getInformations(station){
        map.selectedStation = map.stations[station].name.substring(map.stations[station].name.indexOf("-") + 1) //La variable obtient la valeur du nom de la station selectionner
        document.getElementById("aside-infos--select-station").style.display = "none"
        document.getElementById("aside_map__hidding_info").style.display = "block"
        document.getElementById("station-name").textContent = map.stations[station].name.substring(map.stations[station].name.indexOf("-") + 1)
        document.getElementById("station-address").textContent = map.stations[station].address
        document.getElementById("station-bike_stands").textContent = map.stations[station].bike_stands
        document.getElementById("station-bikes").textContent = map.stations[station].available_bikes
        map.reservedInformations()
        map.status(station)
    },   

    status(station){
        if(map.stations[station].status === "CLOSE" || map.stations[station].available_bikes === 0) {
            document.getElementById("noBikes").textContent = "Désolé pas de vélos ou station fermée, veuillez sélectionner une autre station"
            document.getElementById("thankMessage").style.display = "block"
            reservation.btnEnvoi.removeEventListener("click",reservation.sendReservation)
            if(stamp.reset === 1){
                stamp.btnEnvoi.style.display = "none"
            } else if(map.reservedStation != null) {
                document.getElementById("noBikes").textContent = "Désolé pas de vélos ou station fermée, veuillez sélectionner une autre station"
                stamp.btnEnvoi.style.display = "none"
                }
        } else if(map.stations[station].status === "OPEN" && map.stations[station].available_bikes > 0){
            stamp.start()
            document.getElementById("noBikes").innerHTML = ""
            document.getElementById("thankMessage").style.display = "none"
            reservation.btnEnvoi.addEventListener("click",reservation.sendReservation)
            if(stamp.reset === 1){
                stamp.btnEnvoi.style.display = "block"
            }
        }  
    },
        //Reserved Information
    reservedInformations(){
        if (map.selectedStation === map.reservedStation){
            document.getElementById("reserved-messages").innerHTML = "<p>Vous avez déjà reserver un vélo à cette station</p>" //Si les deux valeurs sont égales cela veut dire qu'elle a déjà été réservé
            reservation.btnEnvoi.removeEventListener("click",reservation.sendReservation)
            document.getElementById("noBikes").innerHTML = ""
        } 
        
        else if(map.reservedStation != null) { //Si reservedStation a une valeur, alors c'est qu'une station a déjà été reservé mais ce n'est pas celle qui est sélectionné
            document.getElementById("reserved-messages").innerHTML = "<p>Attention ! Vous avez déjà reserver un vélo à la station de " + map.reservedStation + " si vous continuez, vous perdrez votre ancienne reservation pour la nouvelle.</p>"
            document.getElementById("noBikes").innerHTML = ""
            reservation.showBtn()
            reservation.btnEvents()
        }
    },
}; 












