// 0: Screen 0
var screen = 0
var bg
var cabbageimg

var capybara = { w: 50, h: 50, speed: 0, x: 50, y: 300, a: 0.2, f: 8 }
var bgs = { x: 0, x2: 800, l: 800, l2: 800, h: 400, h2: 400, speed: capybara.speed }
var cabbages = []
var cabbagey
var bricks = []
var watermelons = []
var breaker = 0
var jump = false
var jumpCounter = 0
var sec = 20
var score = 0
/********* SETUP BLOCK ********/
function setup() {
    createCanvas(800, 400)

}
function preload() {
    // https://www.freepik.com/premium-vector/jungle-game-background_5844339.htm game background image credit
    bg = loadImage('background.jpg')
    // Capybara image credit: https://rainloaf.itch.io/capybara-sprite-sheet
    capyImg = loadImage('capygame.png')
    //cabbage image credit: https://terrariafanideas.fandom.com/wiki/Cabbage cabbage item image credit
    cabbageimg = loadImage('cabbage.png')
    // https://www.mariowiki.com/Gallery:Empty_Block startup screen block imgag credit
    startblock = loadImage('block.png')
    //https://fontmeme.com/super-mario-font/ font maker for the starting screen text
    text1 = loadImage('Capybario.png')
    text2 = loadImage('instructions.png')
    text3 = loadImage('instructions2.png')
    //Capybara running gif credit: https://rainloaf.itch.io/capybara-sprite-sheet
    runningcapy = loadImage('runningcapygif.gif')
    //Brick image credit: https://www.mariowiki.com/Block
    fullbrick = loadImage('fullbrick.png')
    emptybrick = loadImage('emptybrick.png')

    //Watermelon image credit: https://www.pngegg.com/en/png-ewsrh
    watermelon = loadImage('watermelon.png')


}

/********* DRAW BLOCK *********/
function draw() {
    if (screen == 0) {
        screen0()
    } if (screen == 1) {
        screen1()
    }if(screen == 2){
        screen2()
    }
}

/******* SCREEN CONTENTS *****/
function screen0() {
    background(bg);
    fill(255, 255, 255)
    push()
    imageMode(CENTER)
    image(startblock, width / 2, height / 2, 450, 200)
    image(text1, width / 2, height / 2)
    image(text2,width/2,height/2+35,300,20)
    image(text3,width/2,height/2+55,395,25)
    pop()

}

function screen1() {
    moveBackground()
    makeCapy()
    capyGravity()
    //make cabbages
    for (var i = 0; i < cabbages.length; i++) {
        image(cabbageimg, cabbages[i].x, cabbages[i].y, cabbages[i].w, cabbages[i].h)
        if (capybara.speed == 5) {
            cabbages[i].x -= cabbages.speed
        }
    }

    //brick making
    for (var i = 0; i < bricks.length; i++) {

        if (bricks[i].rng <= 400) {
            bricks[i].name2 = 'emptybrick'
            image(emptybrick, bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h)

        }
        else if (bricks[i].rng > 400) {
            bricks[i].name2 = 'fullbrick'
            image(fullbrick, bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h)

        }
        if (capybara.speed > 0) {
            bricks[i].x -= bricks[i].speed
        }
    }
    //watermelon making
    for (var i = 0; i < watermelons.length; i++) {
        image(watermelon, watermelons[i].x, watermelons[i].y, watermelons[i].w, watermelons[i].h)
    }
    moveWatermelons()
    //collision
    collision(bricks)
    collision(cabbages)
    collision(watermelons)
    push()
    textSize(30)
    text('Time: '+ sec,10,20,150,150)
    text('Score: '+score,675,20,150,150)
    pop()
    if(sec <=0){
        screen = 2
        clearInterval
    }
}
function screen2(){
    background(0)
    push()
    textSize(50)
    text('GAME OVER!', 250,height/2)
    text('Your score: '+ score,250,height/2+80)
    pop()
}
/********* INPUTS *********/
function mousePressed() {
    if (screen == 0) {
        screen = 1
        makeCabbage()
        makeBricks()
        setInterval(makeCabbage, 3000)
        setInterval(makeBricks, 5000)
        setInterval(timer,1000)
    }

}

function keyPressed() {
    // if(jump == false){
    //     if (keyIsDown(UP_ARROW)) {
    //         capybara.f = -8
    //     }
    // }
    // if (capybara.y + capybara.h >= 355) {
    //     jump == false
    // }
}
function keyTyped() {
if(jumpCounter == 0){
    if (key == 'w') {
        jump = true
    }else{
        jump = false
    }
    }}


/******* OTHER FUNCTIONS *******/
function moveBackground() {
    image(bg, bgs.x, 0, 800, 400)
    image(bg, bgs.x2, 0, 800, 400)
    if (capybara.speed == 5) {
        bgs.x -= capybara.speed / 1.5
        bgs.x2 -= capybara.speed / 1.5
    }
    if (bgs.x <= -width) {
        bgs.x = width
    }
    if (bgs.x2 <= -width) {
        bgs.x2 = width
    }


}
function makeCapy() {

    if (keyIsDown(68)) {
        image(runningcapy, capybara.x, capybara.y, capybara.w, capybara.h)
        capybara.speed = 5
        if (capybara.x <= width / 2) {
            capybara.x += capybara.speed / 1.5
        }
    } 
    else if (keyIsDown(65)) {
        push()
        scale(-1, 1)
        image(runningcapy, -capybara.x - capybara.w, capybara.y, capybara.w, capybara.h)
        if (capybara.x >= 0) {
            capybara.x += capybara.speed
            capybara.speed = -5
        }
        pop()
    }
    else {
        image(capyImg, capybara.x, capybara.y, capybara.w, capybara.h)
        capybara.speed = 0
    }
    if (jump == true && jumpCounter == 0) {
        capybara.f = -8
        jump = false
        jumpCounter = 1
    }
    if(capybara.y+capybara.h>358){
        jumpCounter = 0
    }
    if(capybara.y<0){
        capybara.y = 0
    }
}        
function capyGravity() {
    capybara.y += capybara.f
    capybara.f += capybara.a
    if (capybara.y + capybara.h >= 355) {
        capybara.f = 0
        capybara.a = 0
        jumpCounter = 0
    } else {
        capybara.a = 0.2
    }
}
function makeCabbage() {
    cabbagey = random(100, 300)

    for (var i = 0; i <= 3; i++) {
        cabbages.push({ x: 800 + i * 50, y: cabbagey, w: 50, h: 50, name: 'cabbage', speed: capybara.speed })
    }
}
function makeBricks() {

    bricky = random(70, 250)

    for (var i = 0; i < 1; i++) {
        bricks.push({ x: 800 + i * 50, y: bricky, w: 50, h: 50, rng: random(0, 500), name: 'brick', name2: 'typeBrick', speed: capybara.speed })

    }
}
function moveWatermelons() {
    for (var i = 0; i < watermelons.length; i++) {
        watermelons[i].x -= 3.3
        if (watermelons[i].y < 305) {
            watermelons[i].y += 3
        }
    }
}
function collision(object) {
    for (var i = 0; i < object.length; i++) {
        if (object[i].name == 'brick') {
            //bottom collision
            if (capybara.y < object[i].y + object[i].h && capybara.x +
                capybara.w > object[i].x + 10 && capybara.x < object[i].x +
                object[i].w - 10 && capybara.y > object[i].y) {
                capybara.f = 5
                if (object[i].name2 == 'fullbrick') {
                    watermelons.push({ x: object[i].x, y: object[i].y -
                        object[i].h, w: 50, h: 50, name: 'watermelon', speed: 1 })
                    object.splice(i, 1)}
                else if (object[i].name2 == 'emptybrick') {
                    cabbages.push({ x: object[i].x, y: object[i].y -
                        object[i].h, w: 50, h: 50, name: 'cabbage', speed: capybara.speed })
                    object.splice(i, 1)                }}
            //top collision 
            else if (capybara.y < object[i].y && capybara.y > object[i].y -
                     capybara.h && capybara.x + capybara.w >= object[i].x &&
                     capybara.x <= object[i].x + object[i].w) {
                capybara.f = 0
                capybara.a = 0
                capybara.y = object[i].y - capybara.h
                object[i].speed = 5
                cabbages.speed = 0
                jumpCounter = 0
                jump = false           }
                //left side
            else if (capybara.x + capybara.w > object[i].x && capybara.x +
                     capybara.w < object[i].x + object[i].w &&
                     capybara.y > object[i].y - capybara.h && capybara.y +
                     capybara.h < object[i].y + object[i].h) {
                capybara.x = object[i].x - capybara.w
                capybara.speed = 0}
            else { cabbages.speed = capybara.speed
                object[i].speed = capybara.speed}  }
        else if (object[i].name == 'cabbage') {
            if (capybara.x + capybara.w > object[i].x && capybara.x < object[i].x +
                object[i].w && capybara.y < 
                object[i].y + object[i].h && capybara.y + capybara.h > object[i].y) {
                            object.splice(i, 1)
                            score++  }}         
        else if (object[i].name == 'watermelon') {
            if (capybara.x + capybara.w > object[i].x && capybara.x < object[i].x +
                object[i].w && capybara.y < object[i].y + object[i].h && capybara.y +
                capybara.h > object[i].y) {
                object.splice(i, 1)
                score+=10}}}}
function timer(){
    sec--
}
/******* CLASSES *******/