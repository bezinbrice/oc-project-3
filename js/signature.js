//Canvas
const stamp = {
    canvas: document.getElementById('canvas'),
    ctx: document.getElementById('canvas').getContext('2d'),
    painting: document.getElementById('canvasZone'),
    mouse: {x: 0, y: 0},
    reset: 0,
    btnResa: document.getElementById("button_signature"),
    btnEnvoi: document.getElementById("btnEnvoi"),

    start() {
        stamp.btnResa.onclick = function() {
            if(stamp.reset === 0){
                document.getElementById("aside-canvas").style.border = "5px solid #0f7c00"
                stamp.btnResa.value = "Effacer"
                stamp.zoneCanvas()
                stamp.reset = 1
                stamp.signature()
                stamp.btnEnvoi.style.display = "block"
            } else if (stamp.reset === 1) {
                stamp.zoneCanvas()
                stamp.signature()
                reservation.securSign = 0
            }
        }
    },

    zoneCanvas() {
        paint_style = getComputedStyle(stamp.painting)
        stamp.canvas.style.display = "block"
        stamp.canvas.width = parseInt(paint_style.getPropertyValue('width'))
        stamp.canvas.height = parseInt(paint_style.getPropertyValue('height'))
        stamp.ctx.lineWidth = 2
        stamp.ctx.lineJoin = 'round'
        stamp.ctx.lineCap = 'round'
        stamp.ctx.strokeStyle = '#0F7C00'
    },

    signature() {
        stamp.canvas.addEventListener('mousemove', function(e) {
            stamp.mouse.x = e.pageX - this.offsetLeft;
            stamp.mouse.y = e.pageY - this.offsetTop;
            }, false)
        stamp.canvas.addEventListener('mousedown', function() {
            stamp.ctx.beginPath();
            stamp.ctx.moveTo(stamp.mouse.x, stamp.mouse.y);
            stamp.canvas.addEventListener('mousemove', stamp.drawSign, false);
            }, false)
        stamp.canvas.addEventListener('mouseup', function() {
            stamp.canvas.removeEventListener('mousemove', stamp.drawSign, false);
            }, false)      
        stamp.drawSign()
    },

    drawSign() {
        stamp.ctx.lineTo(stamp.mouse.x, stamp.mouse.y)
        stamp.ctx.stroke()
        reservation.securSign++
    }
    
}; 