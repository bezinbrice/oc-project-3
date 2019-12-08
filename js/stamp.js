//Canvas
const stamp = {
    canvas: document.getElementById('canvas'),
    ctx: document.getElementById('canvas').getContext('2d'),
    painting: document.getElementById('canvasZone'),
    mouse: {x: 0, y: 0},
    reset: 0,
    btnResa: document.getElementById("button_signature"),
    btnEnvoi: document.getElementById("validation-btn"),

    start() {
        stamp.btnResa.addEventListener("click", function(){
            if(stamp.reset === 0){
                document.getElementById("aside-canvas").style.border = "5px solid #0f7c00"
                stamp.btnResa.textContent = "Effacer"
                stamp.zoneCanvas()
                stamp.reset = 1
                stamp.signature()
                stamp.btnEnvoi.style.display = "block"
            } else if (stamp.reset === 1) {
                stamp.ctx.clearRect(0, 0, stamp.canvas.width, stamp.canvas.height)
                stamp.zoneCanvas()
                stamp.signature()
                reservation.securSign = 0
            }
        })
    },

    zoneCanvas() {
            let paint_style = getComputedStyle(stamp.painting)
            stamp.canvas.style.display = "block"
            stamp.canvas.width = parseInt(paint_style.getPropertyValue('width'))
            stamp.canvas.height = parseInt(paint_style.getPropertyValue('height'))
            stamp.ctx.lineWidth = 2
            stamp.ctx.lineJoin = 'round'
            stamp.ctx.lineCap = 'round'
            stamp.ctx.strokeStyle = '#18700C'
    },

    signature() {
        //stamp.ctx.clearRect(0, 0, stamp.canvas.width, stamp.canvas.height)
        var BB=stamp.canvas.getBoundingClientRect();
        var offsetX=BB.left;
        var offsetY=BB.top;  
        if(window.scrollY){
            offsetY= BB.top + window.scrollY  // On détermine la nouvelle position du canvas s'il y a un scrolling
           }
        stamp.canvas.addEventListener('mousemove', function(e) {
            stamp.mouse.x =  e.pageX - offsetX;
            stamp.mouse.y =  e.pageY - offsetY;
            }, false)
        stamp.canvas.addEventListener('mousedown', function() {
            stamp.ctx.beginPath();
            stamp.ctx.moveTo(stamp.mouse.x, stamp.mouse.y);
            stamp.canvas.addEventListener('mousemove', stamp.drawSign, false);
            }, false)
        stamp.canvas.addEventListener('mouseup', function() {
            stamp.canvas.removeEventListener('mousemove', stamp.drawSign, false);
            }, false)      	
    },

    drawSign() {
        stamp.ctx.lineTo(stamp.mouse.x, stamp.mouse.y)
        stamp.ctx.stroke()
        reservation.securSign++
    }
}; 