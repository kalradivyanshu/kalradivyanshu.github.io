var fireworks = [];
var gravity;
function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    colorMode(HSB);
    stroke(255);
    gravity = createVector(0, 0.2);
    strokeWeight(4);
    firework = new Particle(random(width),height);
}

function draw() {
    colorMode(RGB);
    background(0,25);
    if(random(1) < 0.1)
        fireworks.push(new Firework());
    for(var i = fireworks.length-1 ; i >= 0; i--)
    {
        fireworks[i].update();
        fireworks[i].show();
        if(fireworks[i].done())
            fireworks.splice(i,1);
    }
}