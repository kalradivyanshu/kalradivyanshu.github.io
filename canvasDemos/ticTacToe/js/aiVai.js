function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    var width = window.innerWidth;
    var height = window.innerHeight;
    colorMode(HSB);
    stroke(255);
    gravity = createVector(0, 0.2);
    strokeWeight(4);
    window.gameState = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    window.nextStateAvailable = true;
    envir = new env();
    AI = new agent();
    AI2 = new agent();
    window.humanWins = 0;
    window.AIWins = 0;
    window.draws = 0;
    window.AImode = true;
    button = createButton('toggle AI mode');
    button.position(0,0);
    button.mousePressed(toggleAI);
    //window.steps = 0;
}

function toggleAI() {
    window.AImode = !window.AImode;
}
function drawGrid() {
    line(width/3, 0, width/3, height);
    line(2*width/3, 0, 2*width/3, height);
    line(0, height/3, width, height/3);
    line(0, 2*height/3, width, 2*height/3);
}
function drawX(x, y) {
    var posX = (2*x + 1)*(width/6);
    var posY = (2*y + 1)*(height/6);
    var r = (width/6)*0.8;
    textSize(r);
    textAlign(CENTER);
    text("X", posX, posY+ r/2);
}
window.reset = function() {
    window.gameState = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
}
function drawO(x, y) {
    var r = (width/6)*0.8;
    var posX = (2*x + 1)*(width/6);
    var posY = (2*y + 1)*(height/6);
    var r = (width/6)*0.8;
    textSize(r);
    textAlign(CENTER);
    text("O", posX, posY+ r/2);
}
function drawGameState() {
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            if(gameState[i][j] == 0)
                drawO(i, j);
            else if(gameState[i][j] == 1)
                drawX(i, j);
        }
    }
}
window.isdone = function() {
    state = window.gameState;
    for(var i = 0; i < 3; i++) {
        if((state[i][0] != -1) && (state[i][0] == state[i][1]) && (state[i][1] == state[i][2]))
            return state[i][0];
    }
    for(var i = 0; i < 3; i++) {
        if((state[0][i] != -1) && (state[0][i] == state[1][i]) && (state[1][i] == state[2][i]))
            return state[0][i];
    }
    if((state[0][0] != -1) && (state[0][0] == state[1][1]) && (state[1][1] == state[2][2]))
        return state[0][0];
    if((state[0][0] != -1) && (state[0][0] == state[1][1]) && (state[1][1] == state[2][2]))
        return state[0][0];
    if((state[0][2] != -1) && (state[0][2] == state[1][1]) && (state[1][1] == state[2][0]))
        return state[0][2];
    flat = flatten(window.gameState);
    if(!flat.includes(-1))
        return 10;
    return -1;
}
function draw() {
    if(!window.AImode)
        colorMode(RGB);
    if(!window.AImode)
        background(0,25);
    isDone = window.isdone();
    document.title = "X: " + window.humanWins + " O: " + window.AIWins +" D: " + window.draws + " t: " + (window.humanWins + window.AIWins + window.draws);
    if(isDone != -1) {
        if(isDone == 10)
            window.draws += 1;
        if(isDone == 0)
            window.AIWins += 1;
        else
            window.humanWins += 1;
        AI.replay();
        //AI2.replay();
        window.reset();
    }
    if(!window.AImode)
        drawGrid();
    if(!window.AImode)
        drawGameState();
    console.log(":wadabflalefbna: ", window.nextStateAvailable)
    if(window.nextStateAvailable) {
        action = AI.action(window.gameState);
        console.log(action);
        para = envir.action(action, 0);
        oldpara = para;
        console.log(para);
        while(para[2] == -10) {
            action = int(Math.random()*9);
            para = envir.action(action, 0);
            if(window.isdone() != -1) {
                break;
            }
        }
        para = oldpara;
        //[flatten(this_state), flatten(window.gameState), reward, done]
        //state, action, next_state, reward, done
        AI.remember(para[0], action, para[1], para[2], para[3]);
        //window.steps += 1;
        window.nextStateAvailable = false;
    }
    if(window.AImode && !window.nextStateAvailable) {
        action = int(Math.random()*9);
        console.log(action);
        para = envir.action(action, 1);
        oldpara = para;
        console.log(para);
        while(para[2] == -10) {
            action = int(Math.random()*9);
            para = envir.action(action, 1);
            if(window.isdone() != -1) {
                break;
            }
        }
        para = oldpara;
        //[flatten(this_state), flatten(window.gameState), reward, done]
        //state, action, next_state, reward, done
        //AI2.remember(para[0], action, para[1], para[2], para[3]);
        //window.steps += 1;
        window.nextStateAvailable = true;
    }
}
function mouseClicked() {
    if(!window.AImode)
    {
        console.log(mouseX, mouseY);
        var x,y;
        if(mouseX < width/3)
            x = 0;
        else if(mouseX < 2*width/3)
            x = 1
        else
            x = 2
        if(mouseY < height/3)
            y = 0;
        else if(mouseY < 2*height/3)
            y = 1
        else
            y = 2
        console.log(x, y);
        if(window.gameState[x][y] == -1) {
            window.gameState[x][y] = 1;
            window.nextStateAvailable = true;
        }
    }
}