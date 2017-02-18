var x = 0.01, y = 0, z = 0;
var a = 10, b = 28, c = 8.0/3.0;
var angle = 0;
var buttonX, buttonY;
var points = Array();
var fontLight;
function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  colorMode(HSB);
  fontLight = loadFont("fonts/OpenSansLight.ttf");
}
function Write()
{
  textSize(64);
  fill(219, 58, 93);
  textFont(fontLight);
  noStroke();
  textAlign(CENTER);
  text("Divyanshu Kalra", width/2,100);
  noFill();
  stroke(88, 62, 76);
  textSize(20);
  textAlign(LEFT);
  textFont(fontLight);
  text("Resume", buttonX+15, buttonY+25);
  buttonX = width/2-50, buttonY = height-100;
  rect(buttonX,buttonY,100,35);
}
function PVector(x,y,z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}
function draw() {
  background(0);
  Write();
  angle += 0.01;
  var dt = 0.01;
  var dx = (a * (y - x))*dt;
  var dy = (x * (b - z) - y)*dt;
  var dz = (x * y - c * z)*dt;
  x += dx;
  y += dy;
  z += dz;
  //console.log(x,y,z);
  points.push(new PVector(x,y,z));
  translate(width/2,height/2);
  scale(5);
  var hu = 0;
  noFill();
  beginShape();
  for(var i = 0; i < points.length; i++)
  {
    var v = points[i];
    stroke(hu, 255,255);
    vertex(v.x,v.y);
    hu += 0.1;
    if(hu > 255)
      hu = 0;
  }
  //rotate(angle);
  endShape();
}

function mouseClicked() {
  if(mouseX >= buttonX && mouseX <= buttonX+100 && mouseY >= buttonY && mouseY <= buttonY+35)
  {
      console.log("Button Clicked");
      var link = document.createElement("a");
      link.download = "Resume_Divyanshu_Kalra_NSIT.pdf";
      link.href = "./resume.pdf";
      link.click();
  }
  console.log(mouseX,mouseY, buttonX, buttonY, buttonX+100, buttonY+35);
}