//This is a partner project that was worked on by Junhyun and Robert

var chartData
var screen = 0
var data = []
var score = "0000000"
var perfect
var marvelousScore = 0
var judgementLine = 550
var lane1 = []
var lane2 = []
var lane3 = []
var lane4 = []
var music
var judgementText = ""

function preload() {
  // using this to load the chartdata
  chartData = loadStrings("chart.txt");
  fontRegular = loadFont('FredokaOne-Regular.ttf');
  soundFormats("mp3");
  music = loadSound("audio.mp3")


}
/********* SETUP BLOCK ********/
function setup() {
  createCanvas(900, 600)
  frameRate(60)
  noStroke()
  for (var i = 0; i < chartData.length; i++) {
    chartData[i] = int(chartData[i].split(" "))
    data.push([chartData[i][0], chartData[i][1]])
  }

  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == 1) {
      lane1.push(data[i])
    }
    else if (data[i][0] == 2) {
      lane2.push(data[i])
    }
    else if (data[i][0] == 3) {
      lane3.push(data[i])
    }
    else if (data[i][0] == 4) {
      lane4.push(data[i])
    }
    
    }



  perfect = 1000000 / chartData.length
  great = perfect * 2 / 3
  good = perfect * 1 / 3
  okay = perfect * 1 / 6
  marvelous = perfect + 0.0000001 // differentiates from perfect

  marvelousTime = 20
  perfectTime = 25
  greatTime = 35
  goodTime = 45
  okayTime = 60




}

/********* DRAW BLOCK *********/
function draw() {
  if (screen == 0) {
    welcomeScreen()
  }

  else if (screen == 1) {
    playScreen()
  }
}

/******* SCREEN CONTENTS *****/
function welcomeScreen() {
  background(0);
  fill(255, 255, 255)
  textSize(60);
  textAlign(CENTER);
  textFont(fontRegular);
  text("PROJECT: UD", width / 2, height / 2)
  text("PRESS SPACE TO PLAY", width/2, height/2 + 100)

}

function playScreen() {
  background(0);
  fill("white")
  rect(295, 0, 5, height)
  rect(600, 0, 5, height)
  rect(300, judgementLine, 300, 10)

  fill("white")
  textSize(20)
  textAlign(CENTER)
  text(judgementText, width / 2, 550 - 100)

  spawnNote(lane1)
  spawnNote(lane2)
  spawnNote(lane3)
  spawnNote(lane4)
  killNote(lane1)
  killNote(lane2)
  killNote(lane3)
  killNote(lane4)
  


  textFont(fontRegular);
  textSize(50)
  textAlign(RIGHT)
  text(score, width, 50);
  text(marvelousScore + " / " + chartData.length, width, 100);

  if (score == "1000000") {
    textAlign(CENTER)
    textSize(50)
    if (marvelousScore == chartData.length) {
      fill(185, 242, 255)
      text("ALL MARVELOUS!!!", width / 2, height / 2)
    }
    else {
      fill(255, 215, 0)
      text("ALL PERFECT!!", width / 2, height / 2)
    }
  }
}


/********* INPUTS *********/
function mousePressed() {

}

function keyPressed() {
  if (keyIsDown(32) && keyCode == 32 && screen == 0){
      screen = 1
      music.play()
  }

  if (keyIsDown(68) && keyCode == 68 && lane1[0][0] == 1) {
    judgementMoment(lane1)
        if (score.length < 7) {
          while (score.length < 7) {
            score = "0" + score
            if (int(score) > 1000000 - chartData.length) {
              score = "1000000"
            }
          }
        }
    }
  
      
   if (keyIsDown(70) && keyCode == 70) {
        judgementMoment(lane2)
        if (score.length < 7) {
          while (score.length < 7) {
            score = "0" + score
            if (int(score) > 1000000 - chartData.length) {
              score = "1000000"
            }
          }
        }
    }
  
      
   if (keyIsDown(74) && keyCode == 74) {
        judgementMoment(lane3)

        if (score.length < 7) {
          while (score.length < 7) {
            score = "0" + score
            if (int(score) > 1000000 - chartData.length) {
              score = "1000000"
            }
          }
        }
    }
  
      
   if (keyIsDown(75) && keyCode == 75) {
        judgementMoment(lane4)

        if (score.length < 7) {
          while (score.length < 7) {
            score = "0" + score
            if (int(score) > 1000000 - chartData.length) {
              score = "1000000"
            }
          }
        }
    }
  }


        
    

/******* OTHER FUNCTIONS *******/

function judgementMoment(lane) {
  if (lane[0][1] <= 550 + marvelousTime && lane[0][1] >= 550 - marvelousTime) { // marvelous
      judgementText = "MARVELOUS"
      print(1)
      judgement = marvelous

      lane.splice(lane[0], 1)
        score = str(floor(int(score) + judgement))
        if (judgement == marvelous) {
          marvelousScore += 1
        }
}

  else if (lane[0][1] <= 550 + perfectTime && lane[0][1] >= 550 - perfectTime) { // perfect
      judgementText = "PERFECT"
      judgement = perfect

      lane.splice(lane[0], 1)
        score = str(floor(int(score) + judgement))
        }
    
  else if (lane[0][1] <= 550 + greatTime && lane[0][1] >= 550 - greatTime) { // great
      judgementText = "GREAT"
      judgement = great

      lane.splice(lane[0], 1)
        score = str(floor(int(score) + judgement))
        }
  else if (lane[0][1] <= 550 + goodTime && lane[0][1] >= 550 - goodTime) { // good
      judgementText = "GOOD"
      judgement = good

      lane.splice(lane[0], 1)
        score = str(floor(int(score) + judgement))
        }
    else if (lane[0][1] <= 550 + okayTime && lane[0][1] >= 550 - okayTime) { // okay
      judgementText = "OKAY"
      judgement = okay

      lane.splice(lane[0], 1)
        score = str(floor(int(score) + judgement))
        }


    
}
//spawns notes and according to it's lane, assigns a color
function spawnNote(list) {
  for (var i = 0; i < list.length; i++) {
    if (list == lane2 || list == lane3) {
      
      fill(0, 200, 255)
    }
    else {
      fill(255, 255, 255)
    }
    rect(225 + list[i][0] * 75, list[i][1], 75, 15)

    list[i][1] += 5.998

  }
}
//after notes are off the screen, the notes are spliced, and if notes are not clicked, then a text appears that indicates that the user missed the note
function killNote(list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i][1] > 600) {
      list.splice(i, 1)
      judgementText = "MISS"
    }
  }
} 

// credits:
// song used: Plum - Tempest