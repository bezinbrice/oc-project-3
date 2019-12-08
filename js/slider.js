const slider = {
    leftBtn: document.getElementById("chevrons-left"),
    rightBtn: document.getElementById("chevrons-right"),
    pauseBtn: document.getElementById("pauseBtn"),
    sliderContainer: document.getElementById("slider-container"),
    currentPosition: 0,
    timer: null,
    milli: 6000,

    start() {
        slider.timer = setInterval(slider.handleSlider, slider.milli)
        slider.rightBtn.addEventListener("click", slider.next)
        slider.leftBtn.addEventListener("click", slider.previous)
        slider.pauseBtn.addEventListener("click", slider.stop)
        document.addEventListener("keydown", slider.keyPress)
        map.init()
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

    keyPress(e){
        if(e.keyCode === 37){
            slider.previous()
        }
        else if(e.keyCode === 39){
            slider.next()
        }
    },

    stop() {
        clearInterval(slider.timer)
    },
};



