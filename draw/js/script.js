var drawingUtil = null;
var theCanvas;
var outlineImage = new Image();
outlineImage.src = "images/interface.png";


var isDrawing, points = [ ],color,shcolor="rgba(210, 206, 205,0.6)";
$(function() {
	String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
	theCanvas = document.getElementById("theCanvas");
	var outlineImage = document.getElementById("outlineimage");;
	$(theCanvas).css({"margin-top":outlineImage.clientHeight*0.07});
	$("#drawingtools").css({"height":outlineImage.clientHeight*0.25});
	$("#drawingtools").css({"width":document.body.clientWidth*0.78 });
	$(".elemfull").css({"height":outlineImage.clientHeight*0.25});
	$(".elemhalf1").css({"height":outlineImage.clientHeight*0.25*0.5});
	$(".elemhalf2").css({"height":outlineImage.clientHeight*0.25*0.5});
	theCanvas.width =document.body.clientWidth*0.78 ; //theCanvas.width =document.body.clientWidth;
	theCanvas.height = outlineImage.clientHeight *0.88 ;//theCanvas.height = document.body.clientHeight;
	drawingUtil = new DrawingUtil(theCanvas);
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function DrawingUtil(aCanvas) {
	var canvas = aCanvas;
	var context = canvas.getContext("2d");
	var isDrawing = false;
	var pentype="brush";
	//context.drawImage(outlineImage,0,0,document.body.clientWidth,document.body.clientHeight);
	var grd =context.createRadialGradient(75,50,5,90,60,100);
	grd.addColorStop(0, "rgba(224, 219, 235,0.1)");
	grd.addColorStop(1, "rgba(210, 206, 205,0.1)");
	color=grd;"green";
	init();
	
	function start(event) {
		isDrawing = true;
		context.beginPath();
		points.push({ 
			x: getX(event), 
			y: getY(event),
			width: getRandomInt(0, 13),
			color:color,
			shcolor:shcolor
		});
		context.moveTo(getX(event),getY(event));
		event.preventDefault();
	}
	
	function draw(event) {
		if(isDrawing) {
			points.push({ 
			x: getX(event), 
			y: getY(event),
			width: getRandomInt(0, 13),
			color:color,
			shcolor:shcolor
		});
		
			//context.lineTo(getX(event),getY(event));
			//context.stroke();
		if(pentype=="brush"){
				for (var i = 1; i < points.length; i++) {
					context.beginPath();
					context.moveTo(points[i-1].x+getRandomInt(0, 10), points[i-1].y+getRandomInt(-5,5));
					context.lineWidth = getRandomInt(3, 7);//points[i].width;
					context.bezierCurveTo(points[i].x, points[i].y, points[i].x+getRandomInt(0, 1), points[i].y+getRandomInt(0, 1), points[i].x+getRandomInt(0, 2), points[i].y+getRandomInt(0, 2));
					
					context.strokeStyle = points[i-1].color;
					context.lineJoin = context.lineCap = 'round';
					context.shadowBlur = getRandomInt(4,7);
					context.shadowColor =points[i-1].shcolor;
					context.stroke();
				}
		}else  if(pentype=="pen"){
				var p1 = points[0];
				var p2 = points[1];
				context.beginPath();
				context.moveTo(p1.x, p1.y);
				context.lineWidth = 8;
				context.lineJoin = context.lineCap = 'round';
				for (var i = 1; i < points.length; i++) {
					var midPoint = midPointBtw(p1, p2);
					context.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
					p1 = points[i];
					p2 = points[i+1];
				}
				context.strokeStyle = points[i-1].color;
				context.shadowBlur = context.lineWidth/7;
				context.shadowColor =points[i-1].shcolor;;
				context.lineTo(p1.x, p1.y);
				context.stroke();
		}else  if(pentype=="sharper"){
				for (var i = 1; i < points.length; i++) {
					context.beginPath();
					context.moveTo(points[i-1].x, points[i-1].y);
					context.lineTo(points[i].x, points[i].y);
					context.closePath();
					context.strokeStyle = points[i-1].color;
					context.shadowBlur = 0;
					context.shadowColor =points[i-1].shcolor;;
					context.lineWidth = 3;
					context.stroke();
				}
		}else  if(pentype=="eraser"){
				for (var i = 1; i < points.length; i++) {
					context.beginPath();
					context.moveTo(points[i-1].x, points[i-1].y);
					context.lineTo(points[i].x, points[i].y);
					context.closePath();
					context.strokeStyle = "white";
					context.shadowBlur = 0;
					context.shadowColor ="white";
					context.lineWidth = 20;
					context.stroke();
				}
		}
			
		
		}
		
		event.preventDefault();
	}
	
	function stop(event) {
		if(isDrawing) {
			context.stroke();
			context.closePath();
			points.length = 0;
			isDrawing = false;
		}
		event.preventDefault();
	}
	
	function getX(event) {
		if(event.type.contains("touch")) {
			return event.targetTouches[0].pageX-theCanvas.offsetLeft;
		}
		else {
			return event.layerX-theCanvas.offsetLeft;
		}
	}
	
	function getY(event) {
		if(event.type.contains("touch")) {
			return event.targetTouches[0].pageY-theCanvas.offsetTop;
		}
		else {
			return event.layerY-theCanvas.offsetTop;
		}
	}
	
	this.clear = function() {
		context.clearRect(0,0,canvas.width,canvas.height);
	}
	
	this.toImage = function() {
    	var imageData = canvas.toDataURL();
    	$("#thePopupImage").attr("src",imageData);
    	$.mobile.popup.prototype.options.initSelector = "#popupPhoto";
    	$('#popupPhoto').popup('open',0,0);
	}
	
	this.setStrokeWeight = function(weight) {
    	context.lineWidth = weight;
	}
	function midPointBtw(p1, p2) {
	  return {
		x: p1.x + (p2.x - p1.x) / 2,
		y: p1.y + (p2.y - p1.y) / 2
	  };
	}
	function distanceBetween(point1, point2) {
	  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	}
	function angleBetween(point1, point2) {
	  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
	}
	function init() {
		canvas.addEventListener("touchstart",start,false);
		canvas.addEventListener("touchmove",draw,false);
		canvas.addEventListener("touchend",stop,false);
		canvas.addEventListener("mousedown",start,false);
		canvas.addEventListener("mousemove",draw,false);
		canvas.addEventListener("mouseup",stop,false);
		canvas.addEventListener("mouseout",stop,false);
		$(".drawingtool").click(function(){
			pentype=$(this).attr("id");
			if(pentype=="pen")
			{	
				$(this).css({"background-image": "url('images/clicked pen.png')"});
				$(this).next().css({"background-image": "url('images/pen2.png')"});
				$(this).prev().css({"background-image": "url('images/brush .png')"});
			};
			if(pentype=="brush")
			{	
				$(this).css({"background-image": "url('images/clicked brush.png')"})
				$(this).next().css({"background-image": "url('images/pen.png')"});
				$(this).next().next().css({"background-image": "url('images/pen2.png')"});
			};
			if(pentype=="sharper")
			{
				$(this).css({"background-image": "url('images/clicked pen2.png')"});
				$(this).prev().css({"background-image": "url('images/pen.png')"});
				$(this).prev().prev().css({"background-image": "url('images/brush .png')"});
			};
			
		});
		
	}
}