        // ANIMATION SLIDER
const slider = {
    sliderContainer: document.getElementById("diaporama"),
    sliderContain: document.getElementsByClassName("diaporama-bloc"),
    boutonGauche: document.getElementById("header-chevron-left"),
    boutonDroit: document.getElementById("header-chevron-right"),
    i: 0,
    timer: null,

    // Fonction démarrage du slide
    start() {
        slider.boutonDroit.addEventListener("click", slider.next)
        slider.boutonGauche.addEventListener("click", slider.previous)
        slider.timer = setInterval(slider.handleSlider, 5000)
    },
    
    //Evenement de clique
    handleSlider() {
        slider.i++
        if(slider.i > slider.sliderContain.length - 1){ 
            slider.i = 0 
        }
        slider.sliderContainer.style.marginLeft = `${-Math.abs(slider.i * 100)}%`
    },

    next() {
        slider.stop()
        slider.handleSlider()
    },

    previous() {
        slider.stop()
        slider.i--
        if(slider.i < 0 ){ 
            slider.i = slider.sliderContain.length - 1
        }
        slider.sliderContainer.style.marginLeft = `${-slider.i * 100}%`
    },

    stop() {
        clearInterval(slider.timer)
    }
}