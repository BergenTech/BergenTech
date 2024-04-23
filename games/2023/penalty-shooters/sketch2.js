var soccerField;
var kicker;
var keeper;
var ball;
var ballType = [];
var goal;
var score;
var mode;
var screen;
var homeImage;
var start;

function preload() {
    soccerField = loadImage("images/soccerField.png");
    kicker = loadImage("images/kicker.png");
    keeper = loadImage("images/keeper.png");
    for (var i = 0; i < 5; i++) {
        ballType[i] = loadImage("images/ball" + (i + 1) + ".png")
    }
    goal = loadImage("images/goal.png");
    homeImage = loadImage("images/homeImage.png");
    start = loadImage("images/start.png");
}

function setup() {
    createCanvas(600, 400);
    kicker = {
        x: 0,
        y: height / 2 - 65,
        width: 150,
        height: 130,
        image: kicker
    };
    keeper = {
        x: width - 150,
        y: height / 2 - 50,
        width: 100,
        height: 90,
        image: keeper
    };
    ball = {
        x: 70,
        y: kicker.y + kicker.height / 2 + 30,
        width: 30,
        height: 30,
        image: ballType[0]
    };
    goal = {
        x: width - 100,
        y: 75,
        width: 100,
        height: 250,
        image: goal
    };
    score = 0;
    ballReleased = false;
    screen = 1;
}

// Update ball movement and check for goals or collisions.
function updateBall(mode) {
    var dx = 5;
    var fx = 30;

    for (var i = 0; i < mode; i++) {
        dx += 5;
        fx -= 10;
    }

    if (ball.image == ballType[3]) {
        ball.y = random(120, 280);
        ball.x += dx;
    }
    if (ball.image == ballType[0]) {
        ball.x += dx;
    }
    if (ball.image == ballType[1]) {
        ball.x += dx + 10;
    }
    if (ball.image == ballType[2]) {
        ball.x += dx - 5;
    }
    if (ball.image == ballType[4]) {
        ball.x += dx;
    }

    keeper.y = 160 + Math.sin(frameCount / fx) * 95;

    //Change keeper position based on mode chosen. 
    
}

function updateScore() {
    if (ballReleased) {
        if (ball.x > width) {
            // Ball has crossed the goal line.
            if (ball.y > goal.y && ball.y < goal.y + goal.height) {
                // Ball is within the height of the goal.
                // Check ball type and update score.
                if (ball.image === ballType[0]) {
                    score++;
                } else if (ball.image === ballType[1]) {
                    score += 3;
                } else if (ball.image === ballType[2]) {
                    score += 2;
                } else if (ball.image === ballType[3]) {
                    score++;
                } else if (ball.image === ballType[4]) {
                    score += 5;
                }
            } else {
                // Ball is not within the height of the goal.
                // Check ball type and update score.
                if (ball.image === ballType[0]) {
                    score--;
                } else if (ball.image === ballType[1]) {
                    score -= 5;
                } else if (ball.image === ballType[2]) {
                    score -= 10;
                } else if (ball.image === ballType[3]) {
                    score--;
                } else if (ball.image === ballType[4]) {
                    score -= 2;
                }
            }
            resetBall();
            ballReleased = false;
        } else if (ball.x + ball.width > width - keeper.width) {
            // Ball has collided with keeper.
            if (ball.y > keeper.y && ball.y < keeper.y + keeper.height) {
                // Ball is within the height of the keeper.
                if (ball.image === ballType[0]) {
                    score--;
                } else if (ball.image === ballType[1]) {
                    score -= 5;
                } else if (ball.image === ballType[2]) {
                    score -= 10;
                } else if (ball.image === ballType[3]) {
                    score--;
                } else if (ball.image === ballType[4]) {
                    score -= 2;
                }
                resetBall();
                ballReleased = false;
            }
        }
    } 
}

// Reset ball to its starting position.
function resetBall() {
    ball.x = 70;
    ball.y = kicker.y + kicker.height / 2 + 30;
    ball.image = ballType[int(random(0, 5))];
}

function draw() {
    background(soccerField);
    changeScreen();
}

function keyPressed() {
    if (keyCode != 32 && keyCode != 38 && keyCode != 40) {
        ballReleased = false;
    } else {
        if (keyCode == 38 && kicker.y > 0) {
            kicker.y -= 25;
        }
        else if (keyCode == 40 && kicker.y + kicker.height < height) {
            kicker.y += 25;
        }
        else if (keyCode == 32 && score < 20 || score > -10) {
            // Reset ball to its starting position and select random ball image.
            resetBall();
            ballReleased = true;
        }
    }
    if (keyCode == 32 && score >= 20 || score <= -10) {
        score = 0;
        ballReleased = false;
    }
}

function mousePressed() {
    if (screen == 1) {
        if (mouseX >= width / 2 - 60 && mouseX <= width / 2 + 60 && mouseY >= height / 2 + 100 && mouseY <= height / 2 + 160) {
            screen = 2;
        }
    }
}

function checkGameOver() {
    if (score >= 20) {
        push();
        textAlign(CENTER);
        textFont('Monospace');
        fill(255, 0, 0);
        textSize(40);
        text("YOU WON!", width / 2, height / 2);
        fill(255);
        textSize(20);
        text("Tap spacebar to play again.", width / 2, height / 2 + 100);
        pop();
    } else if (score <= -10) {
        push();
        textAlign(CENTER);
        textFont('Monospace');
        fill(255, 0, 0);
        textSize(50);
        text("YOU LOST!", width / 2, height / 2);
        fill(255);
        textSize(20);
        text("Tap spacebar to play again.", width / 2, height / 2 + 100);
        pop();
    }
}

function changeScreen() {
    if (screen == 1) {
        homeScreen();
    } else {
        playScreen();
    }
}

function homeScreen() {
    image(homeImage, width / 2 - 150, height / 2 - 125, 300, 200);
    image(start, width / 2 - 60, height / 2 + 100, 120, 60);
}

function playScreen() {
    image(kicker.image, kicker.x, kicker.y, kicker.width, kicker.height);
    image(keeper.image, keeper.x, keeper.y, keeper.width, keeper.height);
    if (ballReleased == true) {
        image(ball.image, ball.x, ball.y, ball.width, ball.height);
    }
    image(goal.image, goal.x, goal.y, goal.width, goal.height);
    updateBall(1);
    textSize(32);
    textFont('Monospace');
    fill(255);
    text("SCORE: " + score, 20, 40);
    checkGameOver();
    updateScore();
}