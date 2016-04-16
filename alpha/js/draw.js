var x1 = -1,x2 = -1,y1 = -1,y2 = -1;
var clicked = false;
var eraser = false;
window.previouscolor = "cornflowerblue";
window.color = "#6495ED";
window.draw = true;
var size = 10;
var psize = 10;

$(".eraser").click(function () {
  console.log("wow1")
  if(eraser == false)
  {
    window.previouscolor = window.color;
    window.color = "white";
    eraser = true;
    psize = size;
    size = 30;
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
});
$('#drawcanvas').mouseup(function() {
	clicked = false;
	x1 = -1;
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
       canvas.beginPath();
       canvas.arc(x,y,size/2,0,2*Math.PI);
       canvas.lineWidth = 0;
       canvas.fillStyle = window.color;
  	   canvas.fill();
  	    if(flag == false)
  	    	joincircles(canvas);
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
canvas.strokeStyle = window.color;
canvas.moveTo(x2,y2);
canvas.lineTo(x1,y1);
canvas.stroke();
	}
}
