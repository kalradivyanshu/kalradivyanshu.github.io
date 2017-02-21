var fireworks = [];
var gravity;
var fontLight;
var buttonX, buttonY;
function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  colorMode(HSB);
  stroke(255);
  gravity = createVector(0, 0.2);
  strokeWeight(4);
  firework = new Particle(random(width),height);
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
function draw() {
  Write();
  colorMode(RGB);
  background(0,25);
  if(random(1) < 0.03)
      fireworks.push(new Firework());
  for(var i = fireworks.length-1 ; i >= 0; i--)
  {
      fireworks[i].update();
      fireworks[i].show();
      if(fireworks[i].done())
          fireworks.splice(i,1);
  }
  //rotate(angle);
  //endShape();
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