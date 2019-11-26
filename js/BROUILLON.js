    //Avant déplacement des fonctions dans l'objet "stations"


//PARTIE CARTE INTERACTIVE

const stations = {
    myMap: L.map('map').setView([47.218371,-1.553621], 15), //On insère la carte

    
    
}        



//On charge les "tuiles"
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 10,
    maxZoom: 20,
}).addTo(stations.myMap);

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

//On intégre la requête API pour les vélos et les stations
var request = new XMLHttpRequest();
request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=ca4d9ec415c6fc10410facf985cac298579c24f1");
request.responseType = 'json';
request.send();
request.onload = function(){
    var stationsVelos = request.response;
    afficherStations(stationsVelos);
    infosAside(stationsVelos);
}

//On ajoute les clusters à une variable
const marqueursGares = L.markerClusterGroup(); 



//On affiche les marqueurs sur la carte
function afficherStations(jsonObj){

    for(let i = 0; i< jsonObj.length; i++){
        let stations =jsonObj[i];
        let gare = null;

            if(stations.status === "OPEN" && stations.available_bikes > 3 ){  
                gare = L.marker([stations.position.lat,stations.position.lng],{icon: greenIcons});
                } else if (stations.status === "CLOSE" || stations.available_bikes === 0 ){
                gare = L.marker([stations.position.lat,stations.position.lng],{icon: redIcons});
                } else if (stations.available_bikes <= 5){
                gare = L.marker([stations.position.lat,stations.position.lng],{icon: yellowIcons});  //.addTo(myMap); Pas besoin avec l'utilisation des markerClusters
                }
            
            gare.bindPopup(stations.name);
            gare.bindPopup(stations.name).addEventListener("click", function(){
                document.getElementById("aside_info").innerHTML = "<h3>name :" + stations.name + "</h3>"
            });
            marqueursGares.addLayer(gare);
            }
    }
               
//On intégre les clusters à notre carte
stations.myMap.addLayer(marqueursGares);


//On affiche les infos dans aside
function infosAside(stations){
    for(let i = 0; i< stations.length; i++){
document.getElementById("aside_info").innerHTML = "<ul><li>name :" + stations[i].name + "</li></ul>";
/*bindPopup.addEventListener("click", function(){
   document.getElementById("aside_info").innerHTML = "<h2>name :" + stations[i].name + "</h2>"
});*/
    }
} 


//Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);

// DANS MAIN.JS

//On permet de cliquer sur les chevrons

/*const boutonGauche = document.getElementsByClassName("header-chevron-left")[0];

function scrollingDiapo(){
    let emplacementDiapo = document.querySelector("#diaporama").style.left;
        
       // switch (emplacementDiapo)
           // case "0px":

            if(emplacementDiapo = "-100%"){
                
                emplacementDiapo = "0px";
            } else if (emplacementDiapo = "0px"){
                emplacementDiapo = "-100%";
            }
    
            return emplacementDiapo;
}

boutonGauche.addEventListener("click", scrollingDiapo);
setInterval(scrollingDiapo, 2000); */



/*var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);*/

                // Animation

/*
let slides = document.getElementsByClassName("diaporama-bloc");
const boutonGauche = document.getElementById("header-chevron-left");
const boutonDroit = document.getElementById("header-chevron-right");
    
let i = 0;  
let intervalDiapo = setInterval(nextSlide, 5000);  //Slideshow automatique

    // Fonction slideShow image suivante
function nextSlide() {
    
    document.getElementById("diaporama").appendChild(slides[i]);
    i++;
    if(i = slides.length){ i = 0 };
    }

    //Evenement de clique
boutonDroit.addEventListener("click", function(){
    
    clearInterval(intervalDiapo);
    nextSlide();
    });

boutonGauche.addEventListener("click", function(){
    
    clearInterval(intervalDiapo);
    i--;
    if(i === -1 ){ i = slides.length };
    console.log("la ça va");
    updateDiapo(i);
    console.log("et là ça va");
});

function updateDiapo(i){
    document.getElementById("diaporama").appendChild(slides[i]);
} 

*/



/*//On insère la carte
let myMap = L.map('map').setView([47.218371,-1.553621], 15);

//On charge les "tuiles"
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 10,
    maxZoom: 20,
}).addTo(myMap);

//On personnalise les icones
let icone = L.icon({
    iconUrl: "../assets/icon_bicycle_green.svg",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -52]
});

//On intégre la requête API pour les vélos et les stations
var request = new XMLHttpRequest();
request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=ca4d9ec415c6fc10410facf985cac298579c24f1");
request.responseType = 'json';
request.send();
request.onload = function(){
    var stationsVelos = request.response;
    afficherStations(stationsVelos);
}

//On ajoute les clusters à une variable
const marqueursGares = L.markerClusterGroup(); 

                    //On crée un tableau pour regrouper tous les marqueurs
                    //let tableauGares = [];

//On affiche les marqueurs sur la carte
function afficherStations(jsonObj){
    
    for(let i = 0; i< jsonObj.length; i++){
    let stations =jsonObj[i];
    var gare = L.marker([stations.position.lat,stations.position.lng],{icon: icone}); //.addTo(myMap); Pas besoin avec l'utilisation des markerClusters
    gare.bindPopup(stations.name);
    
    marqueursGares.addLayer(gare);

                //tableauGares.push(gare);
    }
}
                /*
                //On regroupe les marqueurs dans un groupes Leaflet
                let groupeMarqueurs = new L.featureGroup(tableauGares);

                //On adapte le zoom avec le groupe
                myMap.fitBounds(groupeMarqueurs.getBounds().pad(0.2));

//On intégre les clusters à notre carte
myMap.addLayer(marqueursGares);


//On affiche les infos dans aside
document.getElementById("aside_info").addEventListener("click", function(){
console.log("fonctionne ?");
console.log(stations.name);
});


//Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100); */




        //PARTIE CARTE INTERACTIVE

//On intégre la requête API pour les vélos et les stations



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

const stations = {
    myMap: L.map('map').setView([47.218371,-1.553621], 15), //On insère la carte
    gares: [],

    start: function() {
      
      
        stations.afficherMarqueurs()
    },

    infosGares: function () {
        var request = new XMLHttpRequest()
        request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=ca4d9ec415c6fc10410facf985cac298579c24f1")
        request.responseType = 'json'
        request.send()
            request.onload = function(){
                var stationsVelos = request.response
                for(let i = 0; i< stationsVelos.length; i++){
                    stations.gares = stationsVelos[i]
                    }
            }
    },

    couleursMarqueurs: function (){
        if (stations.gares.status === "OPEN" && stations.gares.available_bikes > 3 ){  
            gare = L.marker([stations.gares.position.lat,stations.gares.position.lng],{icon: greenIcons})
            } else if (stations.gares.status === "CLOSE" || stations.gares.available_bikes === 0 ){
            gare = L.marker([stations.gares.position.lat,stations.gares.position.lng],{icon: redIcons})
            } else if (stations.gares.available_bikes <= 5){
            gare = L.marker([stations.gares.position.lat,stations.gares.position.lng],{icon: yellowIcons}) //.addTo(myMap); Pas besoin avec l'utilisation des markerClusters
            }

            console.log("CouelursMarker")
    },

    afficherMarqueurs: function (){
        //On ajoute les clusters à une variable
        const marqueursGares = L.markerClusterGroup() 

        marqueursGares.addLayer(stations.couleursMarqueurs())
        //On intégre les clusters à notre carte
        stations.myMap.addLayer(marqueursGares)
        console.log("affichermarquer()")
    }

}

//On charge les "tuiles"
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 10,
    maxZoom: 20,
}).addTo(stations.myMap);




    window.onload = stations.start();
    

            
    //        gare.bindPopup(stations.name);
      //      gare.bindPopup(stations.name).addEventListener("click", function(){
        //        document.getElementById("aside_info").innerHTML = "<h3>name :" + stations.name + "</h3>"
        



/*//On affiche les infos dans aside
function infosAside(stations){
    for(let i = 0; i< stations.length; i++){
document.getElementById("aside_info").innerHTML = "<ul><li>name :" + stations[i].name + "</li></ul>";
/*bindPopup.addEventListener("click", function(){
   document.getElementById("aside_info").innerHTML = "<h2>name :" + stations[i].name + "</h2>"
});
}
} */
        
        
        //Canvas
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'green';
        ctx.fillRect(10, 10, 100, 100);




        //MAP.JS

//PARTIE CARTE INTERACTIVE

const map = {
    myMap: L.map('map').setView([47.218371,-1.553621], 15), //On insère la carte


 
}        

//On charge les "tuiles"
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 10,
    maxZoom: 20,
}).addTo(map.myMap);

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

//On intégre la requête API pour les vélos et les stations
var request = new XMLHttpRequest();
request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=ca4d9ec415c6fc10410facf985cac298579c24f1");
request.responseType = 'json';
request.send();
request.onload = function(){
    var stationsVelos = request.response;
    afficherStations(stationsVelos);
}

//On ajoute les clusters à une variable
const marqueursGares = L.markerClusterGroup(); 

//On affiche les marqueurs sur la carte
function afficherStations(jsonObj){
    for(let i = 0; i< jsonObj.length; i++){
        let stations =jsonObj[i];
        let gare = null;
        if(stations.status === "OPEN" && stations.available_bikes > 3 ){  
            gare = L.marker([stations.position.lat,stations.position.lng],{icon: greenIcons});
            } else if (stations.status === "CLOSE" || stations.available_bikes === 0 ){
            gare = L.marker([stations.position.lat,stations.position.lng],{icon: redIcons});
            } else if (stations.available_bikes <= 5){
            gare = L.marker([stations.position.lat,stations.position.lng],{icon: yellowIcons});  //.addTo(myMap); Pas besoin avec l'utilisation des markerClusters
            }
            infosAside(stations,gare);
    }
}

//On affiche les infos dans aside
function infosAside(stations,gare){
    if(typeof gare !== 'undefined'){
        gare.bindPopup(stations.name);
        afficherInfos(stations,gare);
        marqueursGares.addLayer(gare);
        }
}

function afficherInfos(stations,gare){
    gare.bindPopup(stations.name).addEventListener("click", function(){
            document.getElementById("aside_info").innerHTML = "<h4>Station :" + stations.name + "</h4><p>Adresse : " + stations.address + "</p><p>Vélos disponible : " + stations.available_bikes + "</p>";
    });
}
           
//On intégre les clusters à notre carte
map.myMap.addLayer(marqueursGares);


///////

const map = {
    myMap: L.map('map').setView([47.218371,-1.553621], 15), //On insère la carte
    stations: [],

    icones(color) {
        //On personnalise les icones
        let green= null, red = null, yellow = null ;
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
            
        if (color === green){
            return greenIcons
        } else if (color === red) {
            return redIcons
        } else if (color === yellow) {
            return yellowIcons
        }
    },

    init() {
        //On charge les "tuiles"
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 10,
            maxZoom: 20,
        }).addTo(map.myMap);
        map.initStations()
        },
    
    initStations() {
         //On intégre la requête API pour les vélos et les stations
         var request = new XMLHttpRequest();
         request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=ca4d9ec415c6fc10410facf985cac298579c24f1");
         request.responseType = 'json';
         request.send();
         request.onload = function(){
             var stationsVelos = request.response;
             map.stations = stationsVelos ;
             map.getStations();
            }
    },     
       
    //On affiche les marqueurs sur la carte
    getStations() {
        //On ajoute les clusters à une variable
        const marqueursGares = L.markerClusterGroup(); 
        let green= null, red = null, yellow = null ;
        for(let i = 0; i< map.stations.length; i++){
            let stations = map.stations[i];
            let gare = null;
            if(stations.status === "OPEN" && stations.available_bikes > 3 ){  
                gare = L.marker([stations.position.lat,stations.position.lng],{icon: map.icones(green)});
                } else if (stations.status === "CLOSE" || stations.available_bikes === 0 ){
                gare = L.marker([stations.position.lat,stations.position.lng],{icon: map.icones(red)});
                } else if (stations.available_bikes <= 5){
                gare = L.marker([stations.position.lat,stations.position.lng],{icon: map.icones(yellow)});  //.addTo(myMap); Pas besoin avec l'utilisation des markerClusters
                }

                //On affiche les infos dans aside

                //infosAside(stations,gare);
                //function infosAside(stations,gare){
                    if(typeof gare !== 'undefined'){
                        gare.bindPopup(stations.name);
                       // afficherInfos(stations,gare);
                        marqueursGares.addLayer(gare);
                        }
               // } function afficherInfos(stations,gare){
            gare.bindPopup(stations.name).addEventListener("click", function(){
                document.getElementById("aside_info").innerHTML = "<h4>Station :" + stations.name + "</h4><p>Adresse : " + stations.address + "</p><p>Vélos disponible : " + stations.available_bikes + "</p>";
        });
        //On intégre les clusters à notre carte
        map.myMap.addLayer(marqueursGares);
    //}
        
        }
    },

    //infosStations() {

   // },

   closesStations(i){
    if(map.stations[i].status === "CLOSE" || map.stations[i].available_bikes === 0){
        document.getElementById("noBikes").textContent = "Désolé pas de vélos ou gare fermée, veuillez sélectionner une autre stations"
    }



}

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
    <link rel="stylesheet" href="../css/style.css"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Location de vélo</title>
</head>
<body>
    <div id="page-totale">
        <header> <!-- On créer l'emplacement pour le diaporama et l'animation sera en css -->
            <div class="header-chevron" id="header-chevron-left"><img class="header-chevron_img" src="../assets/chevron-circle-left-solid.svg" /></div>
            <section id="diaporama">
                <div class="diaporama-bloc diaporama_1">
                    <aside class="diaporama_texts">
                        <p>Bienvenu cher(e) visiteur(euse) !</p>
                        <p>Vous désirez louer un vélo ?</p>
                        <p>On vous explique tout !</p>
                    </aside>
                    <div class="diaporama_photos">
                        <img class="bloc-photos_img" src="../assets/img1.jpg" alt="Femme souriante en vélo" />
                    </div>     
                </div>
                <div class="diaporama-bloc diaporama_2">
                    <aside class="diaporama_texts">
                            <p>Sélectionnez sur la carte, le lieu de réservation que vous désirez.</p>
                    </aside>
                    <div class="diaporama_photos">
                        <img class="bloc-photos_img" src="../assets/img2.png" alt="Capture d'écran de la carte sur une gare" />
                    </div>     
                </div>
                <div class="diaporama-bloc diaporama_3">
                    <aside class="diaporama_texts">
                            <p>Vérifiez bien les différentes informations sur la station</p>
                            <p>Reste t-il des vélos ?</p>
                            <p>Attention à ce que la gare ne soit pas fermée !</p>
                    </aside>
                    <div class="diaporama_photos">
                        <img class="bloc-photos_img" src="../assets/img3.jpg" alt="Vélos alignés sur un parking à vélos" />
                    </div>     
                </div>
                <div class="diaporama-bloc diaporama_4">
                    <aside class="diaporama_texts">
                            <p>Renseignez votre nom et prénom</p>
                    </aside>
                    <div class="diaporama_photos">
                        <img class="bloc-photos_img" src="../assets/img4.png" alt="Information sur la carte de réservation" />
                    </div>     
                </div>
                <div class="diaporama-bloc diaporama_5">
                    <aside class="diaporama_texts">
                            <p>Votre vélo est réservé !</p> 
                            <p>Mais attention vous avez 20 min pour venir le récupérer sinon la réservation sera annulée</p>
                    </aside>
                    <div class="diaporama_photos">
                        <img class="bloc-photos_img" src="../assets/img5.jpg" alt="Jeune homme allant à toute vitesse sur son vélo" />
                    </div>     
                </div>
                <div class="diaporama-bloc diaporama_6">
                    <aside class="diaporama_texts">
                            <p>Bonne route !</p>
                    </aside>
                    <div class="diaporama_photos">
                        <img class="bloc-photos_img" src="../assets/img6.jpg" alt="Plusieurs vélos alignés" />
                    </div>     
                </div>
            </section>
            <div class="header-chevron" id="header-chevron-right"><img class="header-chevron_img" src="../assets/chevron-circle-right-solid.svg" /></div>
        </header>
        <div class="container">
            <div class="row">
                <div id="main_screen" class="col-lg-12">
                    <section id="map" class="col-lg-6"></section>
                    <aside id="aside_map" class="col-lg-6">
                        <div id="messages">
                            <p>Bienvenue cher visiteur(e) ! Veuillez sélectionner la station voulu pour effectuer une réservation.</p>
                        </div>
                        <div id="aside_map__hidding_info">
                            <fieldset>
                                <div id="aside_info"></div>
                                <div id="reserved-messages"></div>
                                <div id="noBikes"></div>
                                <legend>Détails de la station</legend>
                                <form id="formReservation">
                                    <p>
                                        <label for="name">Nom : </label>
                                        <input type="text" name="name" id="nameId" value="" size="20" maxlength="30" required/>
                                    </p>
                                    <p>
                                        <label for="prenom">Prénom : </label>
                                        <input type="text" name="prenom" id="prenomId" value="" size="20" maxlength="30" required/>
                                    </p>
                                    <input type="button" value="Signer" id="button_signature"/>
                                </form>
                            </fieldset>
                            <div id=aside-canvas>
                                <div id="canvasZone">
                                    <canvas id="canvas"></canvas>
                                </div>
                            </div>
                            <input type="button" value="Réserver" id="btnEnvoi"/>
                            <div id="reservedMessage">
                                <p>Merci à vous !</p>
                            </div>
                            <div id="errorMessage">
                                <p>Attention, veuillez remplir les champs 'nom', 'prénom', et signé dans le cadre ci-dessus.</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
        <footer id="footer">
            <p>Votre réservatioon a été enregisté ! Vous avez <span id="timeResa"></span> pour récuperer votre vélo.</p>
            <p>Bonne route !</p>
        </footer>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin=""></script>
        <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
        <script src="../js/slider.js" async></script>
        <script src="../js/map.js" async></script>
        <script src="../js/signature.js" async></script>
        <script src="../js/reservation.js" async></script>
        <script src="../js/main.js" async></script>
    </div>
</body>
</html>