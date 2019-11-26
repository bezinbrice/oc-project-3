//PARTIE CARTE INTERACTIVE

const map = {
    myMap: L.map('map').setView([47.218371,-1.553621], 15), //On insère la carte
    stations: [],
    gare: null,
    marker: null,
    markersGroup: L.markerClusterGroup(),  //On ajoute les clusters à une variable
    selectedStation: "",
    reservedStation: null,

    init() {
        //On charge les "tuiles"
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 10,
            maxZoom: 20,
        }).addTo(map.myMap);
        map.getStations()
        },
    
    getStations() {
         //On intégre la requête API pour les vélos et les stations
         var request = new XMLHttpRequest();
         request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=ca4d9ec415c6fc10410facf985cac298579c24f1");
         request.responseType = 'json';
         request.send();
         request.onload = function(){
             var stationsVelos = request.response;
             map.stations = stationsVelos ;
             map.iconsColor();
            }
    },     
    
    iconsColor() {
        //On personnalise les icones
        let Icones = L.Icon.extend({
            options: { 
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -52]
            }
        });
        let greenIcons = new Icones({iconUrl: "../assets/icon_bicycle_green.svg"}),
            redIcons = new Icones({iconUrl: "../assets/icon_bicycle_red.svg"}),
            yellowIcons = new Icones({iconUrl: "../assets/icon_bicycle_yellow.svg"});
        
        map.getIcons(greenIcons,redIcons,yellowIcons)
    },

    getIcons(greenIcons,redIcons,yellowIcons) {
        for(let i = 0; i< map.stations.length; i++){
            let station = map.stations[i];
            if(station.status === "OPEN" && station.available_bikes > 3 ){  
                map.gare = L.marker([station.position.lat,station.position.lng],{icon: greenIcons});
                } else if (station.status === "CLOSE" || station.available_bikes === 0 ){
                map.gare = L.marker([station.position.lat,station.position.lng],{icon: redIcons});
                } else if (station.available_bikes <= 5){
                map.gare = L.marker([station.position.lat,station.position.lng],{icon: yellowIcons});  //.addTo(myMap); Pas besoin avec l'utilisation des markerClusters
                }

            if(typeof map.gare !== 'undefined'){
                map.marker = map.gare.bindPopup(station.name.substring(station.name.indexOf("-") + 1)) //On affiche le pop up avec le nom de la gare raccourci
            }
        map.getMarkersGroup()
        map.marker.addEventListener("click", function(){ 
            map.getInfos(i) 
            }) 
        } 
    },

    getMarkersGroup(){
        //On intégre les clusters à notre carte
        map.markersGroup.addLayer(map.gare)
        map.myMap.addLayer(map.markersGroup)
    },
        
    getInfos(i) {   
        map.selectedStation = map.stations[i].name.substring(map.stations[i].name.indexOf("-") + 1) //La variable obtient la valeur du nom de la station selectionner
        document.getElementById("aside_map__hidding_info").style.display = "block"
        document.getElementById("aside_info").innerHTML = "<h4>Station : " + map.stations[i].name.substring(map.stations[i].name.indexOf("-") + 1) + "</h4><p>Adresse : " + map.stations[i].address + "</p><p>Vélos disponible : " + map.stations[i].available_bikes + "</p>"           
                
        if(map.stations[i].status === "CLOSE" || map.stations[i].available_bikes === 0) {
            document.getElementById("noBikes").textContent = "Désolé pas de vélos ou gare fermée, veuillez sélectionner une autre stations"
            reservation.btnEnvoi.removeEventListener("click",reservation.sendReservation)
        } 
        
        else if (map.selectedStation === map.reservedStation){
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








