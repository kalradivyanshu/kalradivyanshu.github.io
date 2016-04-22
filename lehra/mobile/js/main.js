var totalWidth = window.innerWidth;
var totalHeight = window.innerHeight;
img = new Image();
img.src = './assets/images/lehra.png';
var canvas = $('.gamearea')[0];
var ctx = canvas.getContext('2d');
var i = 0;
var widthd = window.innerWidth/10;
var heightd;
var score = 0;
var life = 3;
var lspeed = 0.4;
var alive = true;
var paddle = function() {
  this.centerx = window.innerWidth/2;
  this.x0 = this.centerx - window.innerWidth*0.05;
  this.y0 = window.innerHeight*0.8;
  this.x1 = this.centerx + window.innerWidth*0.05;
  this.y1 = window.innerHeight*0.8;
}
function displaytext()
{
  var text = window.innerHeight*0.03;
  ctx.textAlign = "left";
  ctx.fillStyle = "black";
  ctx.font = text+"px Arial";
  ctx.fillText("Life: "+life+" Score: "+score,0,30);
  if(alive == false)
  {
    var text = window.innerHeight*0.1;
    ctx.font = text+"px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "cornflowerblue";
    ctx.fillText("Game Over!",window.innerWidth/2,window.innerHeight/2);
  }
}
paddle.prototype.updatecenter = function(centralx) {
  if(alive == true)
    this.centerx = centralx;
  else
    this.centerx = -100;
  this.x0 = centralx - window.innerWidth*0.05;
  this.x1 = centralx + window.innerWidth*0.05;
}
var pad = new paddle();
function drawpaddle()
{
  ctx.beginPath();
  ctx.moveTo(pad.x0,pad.y0);
  ctx.lineTo(pad.x1,pad.y1);
  ctx.lineWidth = 5;
  ctx.stroke();
}

$('#gamearea').mousemove(function(e){
  var mouse_x = e.pageX - this.offsetLeft;
  //console.log(mouse_x);
  if(alive == true)
    pad.updatecenter(mouse_x);
});
$('#gamearea').on("vmousemove", function(e){
  var mouse_x = e.pageX - this.offsetLeft;
  //console.log(mouse_x);
  if(alive == true)
    pad.updatecenter(mouse_x);
});

var lahra = function(speed,x1) {
  this.x1 = x1;
  this.y1 = 0;
  this.speed = speed;
}


function resizing() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  totalWidth = window.innerWidth;
  totalHeight = window.innerHeight;
  widthd = window.innerWidth/10;
  heightd = widthd*img.height/img.width;
}
window.onresize = function() {
  resizing();
}
function loadlehra() {
  img.onload = function() {
    heightd = widthd*img.height/img.width;
  }
}
function main(){
  resizing();
  loadlehra();
  setInterval(animated,15);
}
var a = new lahra(5,0);
var lahras = [];
lahras.push(a);
function animated() {
  if(lahras[lahras.length-1].y1 > window.innerHeight*lspeed)
  {
    var randx = Math.random()*window.innerWidth*0.9;
    var b = new lahra(5,randx);
    lahras.push(b);
  }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (var j = 0; j < lahras.length; j++) {
    lahras[j].y1 += lahras[j].speed;
    drawpaddle();
    displaytext();
    ctx.drawImage(img, lahras[j].x1,lahras[j].y1,widthd,heightd);
    if(lahras[j].y1 > (window.innerHeight*0.8-heightd) && lahras[j].y1 < (window.innerHeight*0.8+heightd*0.1))
    {
      if((lahras[j].x1+widthd/2) >= pad.x0 && (lahras[j].x1+widthd/2) <= pad.x1)
      {
        lahras.splice(j,1);
        score += 10;
        if(score%50 == 0)
          lspeed -= 0.02;
        console.log(score);
      }
    }
    else if(lahras[j].y1 > window.innerHeight)
    {
      lahras.splice(j,1);
      if(life>0)
        life--;
      if(life == 0)
      {
        alive = false;
        lspeed = 1;
        pad.updatecenter(-100);
      }
    }
    //console.log(lahras.length)
  }
}
$(document).ready(main);
