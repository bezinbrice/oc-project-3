const slider = {
    leftBtn: document.getElementById("chevrons-left"),
    rightBtn: document.getElementById("chevrons-right"),
    sliderContainer: document.getElementById("slider-container"),
    
    currentPosition: 0,
    timer: null,
    milli: 7000,

    start() {
        slider.timer = setInterval(slider.handleSlider, slider.milli)
        slider.rightBtn.addEventListener("click", slider.next)
        slider.leftBtn.addEventListener("click", slider.previous)
        
    },

    handleSlider() {
            slider.currentPosition++
            if(slider.currentPosition > 5){
                slider.currentPosition = 0
            }
            slider.sliderContainer.style.marginLeft = `-${(slider.currentPosition * 100)}%`
    },

    next() {
        slider.stop()
        slider.handleSlider()
    },

    previous() {
        slider.stop()
        slider.currentPosition--
        if(slider.currentPosition < 0){
            slider.currentPosition = 5
        }
        slider.sliderContainer.style.marginLeft = `-${(slider.currentPosition * 100)}%`
    },

    stop() {
        clearInterval(slider.timer)
    },
};



