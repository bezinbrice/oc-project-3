
<<<<<<< Updated upstream
var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([ -1.553621, 47.218371]),
      zoom: 17
    })
  });



  var req = new XMLHttpRequest();

req.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract={nantes}&apiKey={ca4d9ec415c6fc10410facf985cac298579c24f1}");

req.open("GET", "https://api.jcdecaux.com/vls/v3/stations?contract={nantes} HTTP/1.1");

=======
window.onload = reservation.hasReserved()
>>>>>>> Stashed changes
