const reservation = {
    idName: document.getElementById("last-name"),
    idPrenom: document.getElementById("first-name"),
    btnEnvoi: document.getElementById("validation-btn"),
    now: null,
    diff: null,
    time: 1200,  //seconds
    securSign: 0,
    hasReservation: false,
    countdownInterval: null,

    hasReserved(){
        slider.start()
        reservation.idName.value = localStorage.getItem("lastName")  //On attribue le nom et prénom si le visiteur est déjà venu
        reservation.idPrenom.value = localStorage.getItem("firstName")
        reservation.hasReservation = sessionStorage.getItem("hasReservation") //On vérifie s'il y a réservation
        if(reservation.hasReservation === false || reservation.hasReservation === null){
           reservation.btnEvents()
        } else {
            reservation.now = sessionStorage.getItem("timer")
            map.reservedStation = sessionStorage.getItem("reservedStation")
            document.getElementById("footer--no-reservation").style.display = "none"
            document.getElementById("footer--reservation").style.display = "block"
            document.getElementById("reservation-name").textContent = localStorage.getItem("lastName") + " " + localStorage.getItem("firstName")
            document.getElementById("reservation-station").textContent = sessionStorage.getItem("reservedStation")
            reservation.countdown() //On appelle la fonction pour ne pas avoir une seconde sans affichage
            reservation.countdownInterval = setInterval(reservation.countdown, 1000)
            reservation.btnEvents()
        }
    },

    btnEvents() {
        reservation.btnEnvoi.addEventListener("click", reservation.sendReservation)
    },

    showBtn() { //On réaffiche le bouton de réservation si on clique sur une autre station et si le canvas est visible
        if(document.getElementById("thankMessage").style.display = "block" && stamp.reset === 1){
            reservation.btnEnvoi.style.display = "block"
            document.getElementById("thankMessage").style.display = "none"
        }
    },

    sendReservation() {
        if (reservation.idName.value.length > 2 && reservation.idPrenom.value.length > 2 && reservation.securSign > 10){
            reservation.now = Date.now()
            sessionStorage.setItem("timer", reservation.now)
            reservation.addReservation()
        }else if (reservation.idName.value.length < 2 || reservation.idPrenom.value.length < 2 || reservation.securSign < 10){
            reservation.isEmpty()
        } 
    },

    addReservation() {
        reservation.btnEnvoi.style.display = "none"
        document.getElementById("thankMessage").style.display = "block"
        localStorage.setItem("lastName", reservation.idName.value)
        localStorage.setItem("firstName", reservation.idPrenom.value)
        document.getElementById("errorMessage").style.display = "none"
        document.getElementById("footer--no-reservation").style.display = "none"
        document.getElementById("footer--reservation").style.display = "block"
        map.reservedStation = map.selectedStation //Lors du clic on attribue la valeur de la station sélectionnée à la variable reservedStation
        sessionStorage.setItem("reservedStation", map.reservedStation)
        document.getElementById("reservation-name").textContent = localStorage.getItem("lastName") + " " + localStorage.getItem("firstName")
        document.getElementById("reservation-station").textContent = sessionStorage.getItem("reservedStation")
        reservation.hasReservation = true           //On actualise l'état de reservation ainsi que le sessionStorage
        sessionStorage.setItem("hasReservation", reservation.hasReservation)
        reservation.countdown() //On appelle la fonction pour ne pas avoir une seconde sans affichage
        reservation.countdownInterval = setInterval(reservation.countdown, 1000)
    },

    isEmpty() {
        document.getElementById("errorMessage").style.display = "block"
    },

    countdown() {
        reservation.diff = reservation.time - ((Date.now() - reservation.now) /1000)
        if (reservation.diff > 0){
            let minutes = Math.floor(reservation.diff%3600 / 60)
            let seconds = Math.floor(reservation.diff % 60)

            minutes = minutes < 10 ? "0" + minutes : minutes
            seconds = seconds < 10 ? "0" + seconds : seconds

            document.getElementById("timeResa").textContent =  minutes + " minutes et " + seconds + " secondes "
    
        }else {
            clearInterval(reservation.countdownInterval)
            document.getElementById("footer--reservation").style.display = "none"
            document.getElementById("footer--cancel").style.display = "block"
            setTimeout(reservation.cancel, 5000)
        }
    },

    cancel() {
        sessionStorage.clear()
        reservation.hasReservation = false
        map.reservedStation = null
        document.getElementById("footer--no-reservation").style.display = "block"
        document.getElementById("footer--cancel").style.display = "none"
        document.getElementById("reserved-messages").innerHTML = ""
        document.getElementById("noBikes").innerHTML = ""
    },
};

