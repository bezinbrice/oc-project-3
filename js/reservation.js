const reservation = {
    idName: document.getElementById("nameId"),
    idPrenom: document.getElementById("prenomId"),
    btnEnvoi: document.getElementById("btnEnvoi"),
    now: null,
    diff: null,
    time: 1200000,
    securSign: 0,
    hasReservation: false,

    hasReserved(){
        reservation.hasReservation = localStorage.getItem("hasReservation")
        if(reservation.hasReservation === false || reservation.hasReservation === null){
            reservation.btnEvents()
        } else {
            reservation.now = localStorage.getItem("timer")
            map.reservedStation = localStorage.getItem("reservedStation")
            document.getElementById("footer").style.display = "block"
            reservation.countdown()
            reservation.btnEvents()
        }
    },

    btnEvents() {
        reservation.btnEnvoi.addEventListener("click", reservation.sendReservation)
    },

    showBtn() { //On réaffiche le bouton de réservation si on clique sur une autre station et si le canvas est visible
        if(document.getElementById("reservedMessage").style.display = "block" && stamp.reset === 1){
            reservation.btnEnvoi.style.display = "block"
            document.getElementById("reservedMessage").style.display = "none"
        }
    },

    sendReservation() {
        if (reservation.idName.value.length > 2 && reservation.idPrenom.value.length > 2 && reservation.securSign > 10){
            reservation.now = Date.now()
            localStorage.setItem("timer", reservation.now)
            reservation.addReservation()
        }else if (reservation.idName.value.length < 2 || reservation.idPrenom.value.length < 2 || reservation.securSign < 10){
            reservation.isEmpty()
        } 
    },

    addReservation() {
            reservation.btnEnvoi.style.display = "none"
            document.getElementById("reservedMessage").style.display = "block"
            localStorage.setItem("lastName", reservation.idName.value)
            localStorage.setItem("firstName", reservation.idPrenom.value)
            document.getElementById("errorMessage").style.display = "none"
            document.getElementById("footer").style.display = "block"
            map.reservedStation = map.selectedStation //Lors du clic on attribue la valeur de la station sélectionnée à la variable reservedStation
            localStorage.setItem("reservedStation", map.reservedStation)
            reservation.hasReservation = true           //On actualise l'état de reservation ainsi que le localStorage
            localStorage.setItem("hasReservation", reservation.hasReservation)
            reservation.countdown()
    },

    isEmpty() {
            document.getElementById("errorMessage").style.display = "block"
    },

    countdown() {
        let countdownInterval = setInterval(reservation.countdown, 1000)
        reservation.diff = reservation.time - ((Date.now() - reservation.now) /1000)
        if (reservation.diff > 1){
           
            let minutes = Math.floor(reservation.diff%3600 / 60)
            let seconds = Math.floor(reservation.diff % 60)

            minutes = minutes < 10 ? "0" + minutes : minutes
            seconds = seconds < 10 ? "0" + seconds : seconds

            document.getElementById("timeResa").textContent =  minutes + " minutes et " + seconds + " secondes "
    
        }else {
            clearInterval(countdownInterval)
        }
    },

};

