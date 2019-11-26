function signatureCapture() {
    var canvas = document.getElementById("newSignature");
    var context = canvas.getContext("2d");
    canvas.width = 276;
    canvas.height = 180;
    context.fillStyle = "#fff";
    context.strokeStyle = "#444";
    context.lineWidth = 1.5;
    context.lineCap = "round";
    context.fillRect(0, 0, canvas.width, canvas.height);
    var disableSave = true;
    var pixels = [];
    var cpixels = [];
    var xyLast = {};
    var xyAddLast = {};
    var calculate = false;
    {   //functions
      function remove_event_listeners() {
        canvas.removeEventListener('mousemove', on_mousemove, false);
        canvas.removeEventListener('mouseup', on_mouseup, false);
        canvas.removeEventListener('touchmove', on_mousemove, false);
        canvas.removeEventListener('touchend', on_mouseup, false);
  
        document.body.removeEventListener('mouseup', on_mouseup, false);
        document.body.removeEventListener('touchend', on_mouseup, false);
      }
  
      function get_coords(e) {
        var x, y;
  
        if (e.changedTouches && e.changedTouches[0]) {
          var offsety = canvas.offsetTop || 0;
          var offsetx = canvas.offsetLeft || 0;
  
          x = e.changedTouches[0].pageX - offsetx;
          y = e.changedTouches[0].pageY - offsety;
        } else if (e.layerX || 0 == e.layerX) {
          x = e.layerX;
          y = e.layerY;
        } else if (e.offsetX || 0 == e.offsetX) {
          x = e.offsetX;
          y = e.offsetY;
        }
  
        return {
          x : x, y : y
        };
      };
  
      function on_mousedown(e) {
        e.preventDefault();
        e.stopPropagation();
  
        canvas.addEventListener('mouseup', on_mouseup, false);
        canvas.addEventListener('mousemove', on_mousemove, false);
        canvas.addEventListener('touchend', on_mouseup, false);
        canvas.addEventListener('touchmove', on_mousemove, false);
        document.body.addEventListener('mouseup', on_mouseup, false);
        document.body.addEventListener('touchend', on_mouseup, false);
  
        empty = false;
        var xy = get_coords(e);
        context.beginPath();
        pixels.push('moveStart');
        context.moveTo(xy.x, xy.y);
        pixels.push(xy.x, xy.y);
        xyLast = xy;
      };
  
      function on_mousemove(e, finish) {
        e.preventDefault();
        e.stopPropagation();
  
        var xy = get_coords(e);
        var xyAdd = {
          x : (xyLast.x + xy.x) / 2,
          y : (xyLast.y + xy.y) / 2
        };
  
        if (calculate) {
          var xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
          var yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
          pixels.push(xLast, yLast);
        } else {
          calculate = true;
        }
  
        context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
        pixels.push(xyAdd.x, xyAdd.y);
        context.stroke();
        context.beginPath();
        context.moveTo(xyAdd.x, xyAdd.y);
        xyAddLast = xyAdd;
        xyLast = xy;
  
      };
  
      function on_mouseup(e) {
        remove_event_listeners();
        disableSave = false;
        context.stroke();
        pixels.push('e');
        calculate = false;
      };
    }
    canvas.addEventListener('touchstart', on_mousedown, false);
    canvas.addEventListener('mousedown', on_mousedown, false);
  }
  
  function signatureSave() {
    var canvas = document.getElementById("newSignature");// save canvas image as data url (png format by default)
    var dataURL = canvas.toDataURL("image/png");
    document.getElementById("saveSignature").src = dataURL;
  };
  
  function signatureClear() {
    var canvas = document.getElementById("newSignature");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }


  /*<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script src="todataurl.js"></script>
    <script src="signature.js"></script>
  </head>
  <body>
    <div id="canvas">
      <canvas class="roundCorners" id="newSignature"
      style="position: relative; margin: 0; padding: 0; border: 1px solid #c4caac;"></canvas>
    </div>
    <script>signatureCapture();</script>
    <button type="button" onclick="signatureSave()">Save signature</button>
    <button type="button" onclick="signatureClear()">Clear signature</button>
    </br>
    Saved Image
    </br>
    <img id="saveSignature" alt="Saved image png"/>
  </body>
</html>
     
Here's the most straightforward way to create a drawing application with canvas:

    Attach a mousedown, mousemove, and mouseup event listener to the canvas DOM
   
    on mousedown, get the mouse coordinates, and use the moveTo() method to position your drawing cursor and the beginPath() method to begin a new drawing path.
   
    on mousemove, continuously add a new point to the path with lineTo(), and color the last segment with stroke().
  
    on mouseup, set a flag to disable the drawing.



*/



var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var painting = document.getElementById('canvasZone');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0};

canvas.addEventListener('mousemove', function(e) {
mouse.x = e.pageX - this.offsetLeft;
mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#00CC99';


canvas.addEventListener('mousedown', function(e) {
ctx.beginPath();
ctx.moveTo(mouse.x, mouse.y);
canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
canvas.removeEventListener('mousemove', onPaint, false);
}, false);

var onPaint = function() {
ctx.lineTo(mouse.x, mouse.y);
ctx.stroke();
};

/////////
signature() {
  stamp.canvas.addEventListener('mousemove', stamp.mouseMove(MouseEvent), false)
  stamp.canvas.addEventListener('mousedown', stamp.mouseDown(), false)
  stamp.canvas.addEventListener('mouseup', stamp.mouseUp(), false)
  stamp.drawSign()
},

mouseMove(MouseEvent) {
  stamp.mouse.x = MouseEvent.pageX - this.offsetLeft
  stamp.mouse.y =MouseEvent.pageY - this.offsetTop
},

mouseDown() {
  stamp.ctx.beginPath()
  stamp.ctx.moveTo(stamp.mouse.x, stamp.mouse.y)
  stamp.canvas.addEventListener('mousemove', stamp.drawSign, false)
},

mouseUp() {
  stamp.canvas.removeEventListener('mousemove', stamp.drawSign, false)
},

drawSign() {
  stamp.ctx.lineTo(stamp.mouse.x, stamp.mouse.y)
  stamp.ctx.stroke()
}
//////
function setStyles() {
  var currentColor = localStorage.getItem('bgcolor');
  var currentFont = localStorage.getItem('font');
  var currentImage = localStorage.getItem('image');

  document.getElementById('bgcolor').value = currentColor;
  document.getElementById('font').value = currentFont;
  document.getElementById('image').value = currentImage;

  htmlElem.style.backgroundColor = '#' + currentColor;
  pElem.style.fontFamily = currentFont;
  imgElem.setAttribute('src', currentImage);
}