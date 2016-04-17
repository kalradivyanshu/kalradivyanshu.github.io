var x1 = -1,x2 = -1,y1 = -1,y2 = -1;
var clicked = false;
var eraser = false;
window.previouscolor = "cornflowerblue";
window.color = "#6495ED";
window.draw = true;
var size = 10;
var psize = 10;
var points = [ ];

$(".eraser").click(function () {
  console.log("wow1")
  if(eraser == false)
  {
    window.previouscolor = window.color;
    window.color = "white";
    eraser = true;
    window.brushtype = "eraser";
    psize = size;
    size = 10;
	}
	else
	{
    eraser = false;
    window.color = window.previouscolor;
    size = psize;
	}
});
$('#drawcanvas').mousedown(function() {
	clicked = true;
  points = [];
});
$('#drawcanvas').mouseup(function() {
	clicked = false;
	x1 = -1;
  clearTimeout(timeout);
});
$('#drawcanvas').mouseleave(function() {
	clicked = false;
	x1 = -1;
});
$('#drawcanvas').mousemove(function(evt) {
	var left = $("#canvasc")[0].offsetLeft;
	var top = $("#canvasc")[0].offsetTop;
	var x = evt.pageX - this.offsetLeft;
	var y = evt.pageY - this.offsetTop;
	var coor = "X coords: " + x + ", Y coords: " + y;
	drawstroke($('#drawcanvas')[0].getContext('2d'),x,y);
});
function drawstroke(canvas,x,y) {
	//console.log(canvas)
  if(window.draw == true)
  {
  	if(clicked == true)
  	{
      var flag = false;
      if(x1 == -1|| y1 == -1)
      {
  	     x1 = x;
         y1 = y;
         flag = true;
       }
       else
       {
         x2 = x1;
         y2 = y1;
         x1 = x;
         y1 = y;
       }
       /*canvas.beginPath();
       //canvas.arc(x,y,size/2,0,2*Math.PI);
       canvas.lineWidth = 0;
       canvas.shadowBlur = size;
       canvas.shadowColor = window.color;
       canvas.fillStyle = window.color;
  	   canvas.fill();*/
  	    if(flag == false) {
          if(window.brushtype == "eraser"){
            console.log("eraser");
            joincircles(canvas);
          }
          else if(window.brushtype == "marker") {
  	    	  joincircles(canvas);
          }
          else if(window.brushtype == "pen") {
            shaded(canvas);
          }
          else if(window.brushtype == "brush") {
            spray(canvas);
          }
          else {
            console.log("error");
          }
        }
  	}
  }
}
$('#brushsize').change(function() {
	size = this.value;
})
$(".window.colorselect").change(function() {
	if(eraser == false)
window.color = this.value;
	else
window.previouscolor = this.value;
})
$(".bgwindow.colorselect").change(function() {
	$('#drawcanvas').css('background-window.color',this.value);
})
function joincircles(canvas)
{
	if(x1 != -1 && x2 != -1)
	{
canvas.beginPath();
canvas.lineWidth = size;
canvas.shadowBlur = size;
canvas.lineJoin = canvas.lineCap = 'round';
canvas.shadowColor = window.color;
canvas.strokeStyle = window.color;
canvas.moveTo(x2,y2);
canvas.lineTo(x1,y1);
canvas.stroke();
	}
}
var clientX, clientY, timeout;
var density = 5;

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function spray(ctx)
{
  ctx.lineJoin = ctx.lineCap = 'round';
  clientX = x1;
  clientY = y1;
  ctx.fillStyle = window.color;

  timeout = setTimeout(function draw() {
    for (var i = density; i--; ) {
      var angle = getRandomFloat(0, Math.PI*2);
      var radius = getRandomFloat(0, 20);
      ctx.fillRect(
        clientX + radius * Math.cos(angle),
        clientY + radius * Math.sin(angle),
        1, 1);
    }
    if (!timeout) return;
    if (!clicked) return;
    timeout = setTimeout(draw, 50);
  }, 50);
}
function shaded(ctx)
{
  ctx.lineWidth = 1;
  ctx.lineJoin = ctx.lineCap = 'round';

    if (!clicked) return;
    points.push({ x: x1, y: y1});

    ctx.beginPath();
    ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();

    for (var i = 0, len = points.length; i < len; i++) {
      dx = points[i].x - points[points.length-1].x;
      dy = points[i].y - points[points.length-1].y;
      d = dx * dx + dy * dy;

      if (d < 1000) {
        ctx.beginPath();
        ctx.strokeStyle = window.color;
        ctx.moveTo( points[points.length-1].x + (dx * 0.2), points[points.length-1].y + (dy * 0.2));
        ctx.lineTo( points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
        ctx.stroke();
      }
    }
};
