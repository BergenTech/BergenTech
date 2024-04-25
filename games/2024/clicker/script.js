let game

function preload() {
}

function setup() {
    createCanvas(500, 500);
    game = new ClickerGame(500, 500)
    game.load()
}

function draw() {
    clear()
    game.display(deltaTime)
}

function keyPressed() {
    //game.checkKeysPressed()
}

function mousePressed() {
    game.mousePressed()
}