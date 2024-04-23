// Image Credits
// snowman image: https://64.media.tumblr.com/9186e348ef33d15806e42b23e8da9319/tumblr_inline_opb1j3M5841r4q36m_250.png
// snowball image: https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/2a/Snowball_JE3_BE3.png/revision/latest?cb=20190522005550
// easy, hard, medium button images: https://www.shutterstock.com/image-vector/easy-medium-hard-round-button-260nw-2111126015.jpg
// instruction button image: http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/5ec3a229d482e70.png
// ice background image: https://media.istockphoto.com/id/1249953934/vector/ice-cave-game-background.jpg?s=170667a&w=0&k=20&c=gh-EhnVxhIcTSWiQTqqzRlSu2eBZxFid3jzaSNdMR-M=

/********* GLOBAL VARIABLES ********/
var screen = 1;

var snowballCount;
var snowballs = [];
var player;

var timeLeft = 0;
var gameTime = 0;
var lives = 9;

var randomNum;
var buttonClicked = false;

var currentAbility = 0;
var abilities = ["freeze","accel","reset"];
var activeCooldowns = [5,10,15];
var cooldownsCheck = [5,10,15];
var runtimes = [0,0,0];
var statuses = [false,false,false];

/********* SETUP BLOCK ********/
function preload(){
    snowballImg = loadImage('images/snowball.webp');
    snowmanImg = loadImage('images/snowman.png');
    easyImg = loadImage('images/easybutton.png');
    mediumImg = loadImage('images/mediumbutton.png');
    hardImg = loadImage('images/hardbutton.png');
    instructionImg = loadImage('images/instructionbutton.png');
    bg = loadImage('images/icebackground.jpeg');
}

function setup(){
    createCanvas(600, 400);
    player = new Player(snowmanImg);
}

/********* DRAW BLOCK *********/
function draw(){
    // this if statement checks if the lives are less than or equal to 0, then switches to the Game Over screen
    if (lives <= 0){
        screen = 6;
    }
    
    // the following if statements check the screen value and calls the corresponding screen function
    if (screen == 1) {
        welcomeScreen();
    } 
    else if (screen == 2){
        playScreen();
        displayStatus();
    }
    else if (screen == 3){
        freezeScreen(runtimes[currentAbility]);
        displayStatus();
    }
    else if (screen == 4){
        accelScreen(runtimes[currentAbility]);
        displayStatus();        
    }
    else if (screen == 5){
        resetScreen();
    }
    else if (screen == 6){
        endScreen();
    }
    else if (screen == 7){
        instructionScreen();
    }
}

/******* SCREEN CONTENTS *****/

// this function displays the starting screen by setting a background color, displaying text, and displaying images
function welcomeScreen(){
    push();
    background(185,232,234);
    textSize(45);
    textAlign(CENTER);
    textFont("courier new");
    text("Time Freeze", width/2, 75);

    textSize(20);
    text("Choose a difficulty:", width/2, 125);

    imageMode(CENTER);
    image(easyImg,200,height/2, 75, 75);
    image(mediumImg,300,height/2,75, 75);
    image(hardImg,400,height/2, 75, 75);

    image(instructionImg,width/2,300,330,97.5);
    pop();
}

// this function displays the instruction screen by displaying text
function instructionScreen(){
    push();
    background(185,232,234);
    textAlign(CENTER);
    textSize(40);
    textFont("courier new");
    text("Instructions",width/2,50)

    textSize(15);
    text("(Press 'esc' to go back)",width/2,75);

    textSize(20);
    textFont("Copperplate");
    text("Objective: Survive as long as possible",width/2,100)

    textAlign(LEFT)
    textFont("Trebuchet MS");
    text("Controls:",25,150);
    text("Abilities (shown in top left):",300,150);
    textSize(12);
    text("Arrow keys to move",25,175);
    text("'A' and 'D' keys to change the current ability",25,200);
    text("'Space' to activate the current ability",25,225);
    text("Time Freeze - Allows you to stop time for 2 seconds and reposition yourself to dodge projectiles (5 second cooldown)",300,175,275);
    text("Time Acceleration - Allows you to move faster for 5 seconds with a 66% chance to phase through objects (10 second cooldown)",300,225,275);
    text("Time Reset - Allows you to reset all objects on the screen and resets your lives back to the default. If used before surviving for 30 seconds, the cooldown is doubled and there is a 75% chance of your time resetting to 0, otherwise there is a 25% chance of your time resetting to 0 (15 second cooldown)",300,275,275);
    pop();
}

// this function displays the play screen by setting the background and running the method to display and move the player
function playScreen(){
    background(bg);

    player.display();
    player.move(false);

    for (var i = 0; i < snowballs.length; i++){
        snowballs[i].display();
        snowballs[i].move(false);
        snowballs[i].collide(false);
    }
}

// this function displays the freeze screen by stopping all projectiles from moving
function freezeScreen(active){
    if (active >= 2){
        screen = 2;
        statuses[0] = false;
        clearInterval(activeInterval);
        cooldownInterval = setInterval(cooldownTimer,1000);
        gameTimeInterval = setInterval(gameTimer,1000);
    }
        
    else {
        push();
        background(bg);
        fill(220,220,220,150);
        rect(0,0,600,400);
        pop();

        player.display();
        player.move(false);

        for (var i = 0; i < snowballs.length; i++){
            snowballs[i].display();
            snowballs[i].collide(false);
        }
    }
    
}

// this function displays the accel screen by passing parameters that speed up the player and slow down the projectiles
function accelScreen(active){
    if (active >= 5){
        screen = 2;
        statuses[1] = false;
        clearInterval(activeInterval);
        cooldownInterval = setInterval(cooldownTimer,1000);
        clearInterval(gameTimeInterval);
        gameTimeInterval = setInterval(gameTimer,1000);
    }
    else {
        background(bg);

        player.display();
        player.move(true);

        for (var i = 0; i < snowballs.length; i++){
            snowballs[i].display();
            snowballs[i].move(true);
            snowballs[i].collide(true)
        }
    }
}

// this function displays the reset screen by setting the projectiles' positions to outside the screen and resetting the lives back to 9
function resetScreen(time){
    randomNum = round(random(4));
    if (time >= 30){
        if (randomNum == 3){
            gameTime = 0;
        }
    }
    else {
        if (randomNum != 0){
            gameTime = 0;
        }
        activeCooldowns[currentAbility] = -cooldownsCheck[currentAbility];
    }
    for (var i = 0; i < snowballs.length; i++){
        snowballs[i].x = random(width)
        snowballs[i].y = random(-height*2,-height)
    }
    lives = 9;
    clearInterval(activeInterval);
    cooldownInterval = setInterval(cooldownTimer,1000);
    statuses[currentAbility] = false;
    screen = 2;
}

// this function displays the end screen with text showing the score 
function endScreen(){
    push();

    background(32,195,208);
    clearInterval(gameTimeInterval);
    
    fill(255);
    textAlign(CENTER);
    textSize(45);
    textFont("Papyrus")
    text("GAME OVER",width/2,100);
    textSize(30);
    text("Score: " + str(gameTime),width/2,height/2);
    textSize(20);
    text("Press 'esc' to go back to starting screen",width/2,300)
    
    pop();
}

// this function checks whether an ability is ready to be used or not
function abilityCheck(){
    if (!statuses[currentAbility] && activeCooldowns[currentAbility] >= cooldownsCheck[currentAbility]){
        return true;
    }
    else {
        return false;
    }
}


/********* INPUTS *********/
function mouseClicked(){
    // checks if any of the difficulty buttons or the instruction button is clicked
    if (screen == 1){
        if (dist(mouseX,mouseY,200,height/2) <= 75/2 || dist(mouseX,mouseY,300,height/2) <= 75/2 || dist(mouseX,mouseY,400,height/2) <= 75/2){
            buttonClicked = true;
        }
        if (dist(mouseX,mouseY,200,height/2) <= 75/2){
            snowballCount = 5;
        }
        else if (dist(mouseX,mouseY,300,height/2) <= 75/2){
            snowballCount = 15;
        }
        else if (dist(mouseX,mouseY,400,height/2) <= 75/2){
            snowballCount = 25;
        }
        else if (mouseX > 135 && mouseX < 465 && mouseY > 281.25 && mouseY < 378.75){
            screen = 7;
        }
        // if any of the difficulty buttons are clicked, projectiles are created and the game is started
        if (buttonClicked){
            for (var i = 0; i < snowballCount; i++){
                snowballs.push(new Snowball(snowballImg,random(width),random(-2*height,-height)));
            }
            screen = 2;
            gameTimeInterval = setInterval(gameTimer, 1000);
            buttonClicked = false;
        }
    }
}

function keyPressed(){
    // if the 'd' key is pressed, the next ability is selected
    if (keyCode == 68 && activeCooldowns[currentAbility] >= cooldownsCheck[currentAbility]){
        if (currentAbility == abilities.length-1){
            currentAbility = 0;
        }
        else {
            currentAbility += 1;
        }
    }
    // if the 'a' key is pressed, the previous ability is selected
    if (keyCode == 65 && activeCooldowns[currentAbility] >= cooldownsCheck[currentAbility]){
        if (currentAbility == 0){
            currentAbility = abilities.length-1;
        }
        else {
            currentAbility -= 1;
        }
    }
    // if the space key is pressed and the ability is able to be used, the ability will be activated
    if (keyCode == 32 && screen == 2){
        if(abilityCheck()){
            activeCooldowns[currentAbility] = 0;
            statuses[currentAbility] = true;
            runtimes[currentAbility] = 0;
            activeInterval = setInterval(activeTimer,1000,currentAbility);
            if (abilities[currentAbility] == "freeze"){
                screen = 3;
                clearInterval(gameTimeInterval);
            }
            else if (abilities[currentAbility] == "accel"){
                screen = 4;
                clearInterval(gameTimeInterval);
                gameTimeInterval = setInterval(gameTimer,500);
            }
            else if (abilities[currentAbility] == "reset"){
                resetScreen(gameTime);
            }
        }
    }
    // checks if the 'esc' key is pressed on the intruction or end screen and changes the screen to the starting screen if it is
    if (keyCode == 27 && (screen == 6 || screen == 7)){
        snowballs = [];
        if (activeCooldowns != cooldownsCheck){
            clearInterval(cooldownTimer);
            activeCooldowns = [5,10,15];
        }
        if (runtimes != [0,0,0]){
            clearInterval(activeTimer);
            runtimes = [0,0,0];
        }
        statuses = [false,false,false]
        player.x = width/2;
        player.y = height/2;
        lives = 9;
        gameTime = 0;
        screen = 1;
        currentAbility = 0;
    }
}

/******* OTHER FUNCTIONS *******/

// this function manages the time that an ability is active
function activeTimer(index){
    runtimes[index] += 1;
}

// this function manages the cooldown times of the abilities
function cooldownTimer(){
    if (activeCooldowns[currentAbility] >= cooldownsCheck[currentAbility] || statuses[currentAbility]){
        clearInterval(cooldownInterval);
        return;
    } 
    activeCooldowns[currentAbility] += 1;
}

// this function manages the time the game has been running
function gameTimer(){
    gameTime += 1;
}

// this function displays the current ability, the time the game has been running, the cooldown, and the number of lives
function displayStatus(){
    push();
    textSize(20);
    fill(255);
    textFont("Garamond");
    if (activeCooldowns[currentAbility] >= cooldownsCheck[currentAbility]){
        if (abilities[currentAbility] == "freeze"){
            text("Ability: Time Freeze",15,25);
            text("Freeze: Ready", 450, 25);
        }
        else if (abilities[currentAbility] == "accel"){
            text("Ability: Time Acceleration",15,25);
            text("Accel: Ready",450,25);
        }
        else if (abilities[currentAbility] == "reset"){
            text("Ability: Time Reset",15,25);
            text("Reset: Ready",450,25);
        }
    }
    else {
        timeLeft = cooldownsCheck[currentAbility]-activeCooldowns[currentAbility]
        if (abilities[currentAbility] == "freeze"){
            text("Ability: Time Freeze",15,25);
            text("Freeze: " + str(timeLeft), 450, 25);
        }
        else if (abilities[currentAbility] == "accel"){
            text("Ability: Time Acceleration",15,25);
            text("Accel: " + str(timeLeft),425,25);
        }
        else if (abilities[currentAbility] == "reset"){
            text("Ability: Time Reset",15,25);
            text("Reset: " + str(timeLeft),425,25);
        }
    }

    text("Time Survived: " + str(gameTime),250,25);
    text("Lives: " + str(lives),250,375)
    pop();
}

/******* CLASSES *******/

// this class is used to manage the player attributes
class Player{
    constructor(img){
        this.img = img;
        this.x = width/2;
        this.y = height/2;
        this.d = 38;
        this.defaultSpeed = 8;
        this.speed = 8;
        this.accelSpeed = 16;
    }

    display(){
        push();
        imageMode(CENTER);
        image(this.img,this.x,this.y,this.d,this.d);
        pop();
    }

    move(accel){
        if (accel){
            this.speed = this.accelSpeed;
        }
        else {
            this.speed = this.defaultSpeed;
        }
        if (keyIsDown(37) && this.x - this.d/2 > 0){
            this.x -= this.speed;
        }
        if (keyIsDown(39) && this.x + this.d/2 < width){
            this.x += this.speed;
        }
        if (keyIsDown(38) && this.y - this.d/2 > 0){
            this.y -= this.speed;
        }
        if (keyIsDown(40) && this.y + this.d/2 < height){
            this.y += this.speed;
        }
    }
}

// this class is used to manage the snowball projectiles' attributes
class Snowball{
    constructor(img,x,y){
        this.img = img;
        this.x = x;
        this.y = y;
        this.defaultSpeed = 10;
        this.speed = 10;
        this.accelSpeed = 5;

        if (this.x < player.x){
            this.flag = true;
        }
        else {
            this.flag = false;
        }

        this.xdist = abs(player.x - this.x);
        this.ydist = abs(player.y - this.y);
        this.angle = atan(this.ydist/this.xdist);
    }

    display(){
        push();
        imageMode(CENTER);
        image(this.img,this.x,this.y,25,25);
        pop();
    }

    move(accel){
        if (accel){
            this.speed = this.accelSpeed;
        }
        else {
            this.speed = this.defaultSpeed;
        }
        if (this.flag){
            this.x += this.speed*cos(this.angle);
        }
        else {
            this.x -= this.speed*cos(this.angle);
        }
        this.y += this.speed*sin(this.angle);
    }

    collide(test){
        if (dist(this.x,this.y,player.x,player.y) < player.d/2){
            randomNum = round(random(3))
            if (!test || randomNum == 0){
                lives -= 1;
            }
        }
        if ((dist(this.x,this.y,player.x,player.y) < player.d/2 || this.x < 0 || this.x > width || this.y > height) && (!test || randomNum == 0)){
            this.x = random(width);
            this.y = random(-height,0);

            if (this.x < player.x){
                this.flag = true;
            }
            else {
                this.flag = false;
            }
            
            this.xdist = abs(player.x - this.x);
            this.ydist = abs(player.y - this.y);
            this.angle = atan(this.ydist/this.xdist);
        }
    }
}