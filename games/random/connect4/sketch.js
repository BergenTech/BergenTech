var offset = 3
var player = "Red"
var columns = [0, 0, 0, 0, 0, 0, 0]
var tokens = []
var started = false
var won = false

function setup() {
    createCanvas(500, 400);
    rectMode(CENTER)
    textAlign(CENTER)
    for (var i = 0; i < 42; i++) {
        tokens.push(0)
    }
    noLoop()
}

function draw() {
    background(100)
    noStroke()
    fill(player)
    ellipse(130 + offset * 40, 50, 30, 30)
    board()
    drawTokens()
    checkWin("-")
    checkWin("|")
    checkWin("/")
    checkWin("\\")
    mainScreen()
}

function board() {
    fill(0)
    rect(width / 2, height / 2, 300, 250)
    rect(width / 2, 362.5, 100, 50)
    fill(100)
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 6; j++)
            ellipse(130 + 40 * i, 300 - j * 40, 30, 30)
    }
    fill(255)
    textSize(20)
    text("Reset", width / 2, 369)
}



function keyPressed() {
    if (keyCode == 83 && columns[offset] < 6 && won == false) {
        tokens[offset + (7 * columns[offset])] = player
        columns[offset] += 1
        drawTokens()
        if (player == "Red") {
            player = "Yellow"
        } else {
            player = "Red"
        }
    }
    if (keyCode == 65) {
        offset -= 1
    }
    if (keyCode == 68) {
        offset += 1
    }
    if (offset > 6) {
        offset = 6
    }
    if (offset < 0) {
        offset = 0
    }
}

function mousePressed() {
    if (mouseX > 200 && mouseX < 300 && mouseY > 337.5 && mouseY < 387.7 && mouseIsPressed) {
        won = false
        player = "Red"
        columns = [0, 0, 0, 0, 0, 0, 0]
        tokens = []
        for (var i = 0; i < 42; i++) {
            tokens.push(0)
        }
        offset = 3
        loop()
    }
    if (started == false) {
        started = true
        loop()
    }
}

function drawTokens() {
    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i] != 0) {
            fill(tokens[i])
            ellipse(130 + (i % 7) * 40, 300 - round((i - (i % 7)) / 7) * 40, 30, 30)
        }
    }
}

function checkWin(type) {
    if (type == '-') {
        checkNext = 1
    }
    if (type == "|") {
        checkNext = 7
    }
    if (type == "/") {
        checkNext = 8
    }
    if (type == "\\") {
        checkNext = 6
    }
    for (var i = 0; i < 42; i += 7) {
        for (var j = 0; j < 7; j++) {
            if (tokens[j + i] != 0) {
                count = 0
                for (var l = 0; l < 4; l++) {
                    if (tokens[j + i + checkNext * l] == tokens[j + i]) {
                        count += 1
                    }
                    if (count > 3) {
                        won = true
                        gameWon()
                    }
                }
            }
        }
    }
}

function gameWon(){
    fill(255)
    textSize(50)
    text("Game Over", width / 2, height / 2 - 50)
    text(tokens[offset + (7 * columns[offset]) - 7] + " Player Wins!", width / 2, height / 2)
    noLoop()
}

function mainScreen() {
    if (started == false) {
        fill(100)
        rect(width / 2, height / 2, width, height)
        fill(0)
        textSize(90)
        text("Connect 4", width / 2, height / 3 + 20)
        textSize(55)
        text("Click anywhere", width / 2, height / 1.5 + 15)
        text("to begin", width / 2, height / 1.5 + 70)
        fill(100, 100, 100, 0)
        stroke(0)
        strokeWeight(10)
        rect(width / 2, height / 2, width / 1.05, height / 1.05, 100)
    }
} 