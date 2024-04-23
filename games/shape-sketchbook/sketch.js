// INTRO: Screen = 0
// SKETCHBOOK: Screen = 1
// CONTROLS: Screen = 2

//variables used in the code
var screen = 0
var buttonCstart = 104; buttonCcontrol = 104; buttonCback = 104
var colors = ['black', 'green','blue','red','purple', 'orange', 'gray']
var i = 0; j = 0; k = 0
var inkColor = 'black'
var sec = 0
var size = 20
var shapes = ['circle','triangle','square']
var tools = ['marker', 'eraser', 'eraseAll']
var d = 0
var dusts = []
/********* SETUP BLOCK ********/

//Creates the Canvas

function setup() {
  createCanvas(600,400)
}

/********* DRAW BLOCK *********/

//Makes everything show up and run
function draw() {
    noStroke()
    if(screen == 0){
        intro()
    }else if(screen == 1){
        usedTool = tools[k]
        sketch(usedTool)
        sec+=1
    }else if(screen == 2){
        controls()
    }
    
}

/******* SCREEN CONTENTS *****/

//Constructs the Start Screen 
function intro() {
  background(204,204,255)
  //text
  textAlign(CENTER)
  fill(104)
    textSize(50)
  text('Shape Sketchbook', width/2, height/2)
    //buttons
    rectMode(CENTER)
    fill(buttonCstart)
    rect(width/2, 325, 100, 50)
    fill(buttonCcontrol)
    rect(width/2+200,325,100,50)
    textSize(25)
    fill(180)
    text('START', width/2, 325)
    textSize(15)
    text('CONTROLS', width/2+200,325)
    //button changes color if hovered on top of
    if(mouseX>=250&&mouseX<=350&&mouseY>=300&&mouseY<=350){
        buttonCstart = 'green'
        if(mouseIsPressed==true){
            fill('pink')
            push()
            rectMode(CORNER)
            rect(0,0,width,height)
            pop()
            screen = 1
        }
    }else{
        buttonCstart = 104
    }
    if(mouseX>=450&&mouseX<=550&&mouseY>=300&&mouseY<=350){
        buttonCcontrol = 'green'
        if(mouseIsPressed==true){
            fill(145,190,255)
            push()
            rectMode(CORNER)
            rect(0,0,width,height)
            pop()
            screen = 2
        }
    }else{
        buttonCcontrol = 104
    }
    
}

//The Sketchbook itself
function sketch(tool){
    //cycle through shapes
    shape = shapes[j]
    //changes behavior of what happens when mouse pressed depending on the tool 
    if(tool=='marker'){
        inkColor = colors[i]
    }
    else if(tool=='eraser'){
        inkColor = 'pink'
    } else if(tool=='eraseAll'){
        if(mouseIsPressed==true){
            push()
            fill('pink')
            rect(width/2,height/2,width,height)
            pop()
        }
    }
    if(mouseIsPressed==true && (mouseX>=width-100&&mouseX<=width&&mouseY>=100&&mouseY<=300)==false&&sec>=30){
         fill(inkColor)
            noStroke()
            shapee()
     }
    //displays toolbox on the right
    info(usedTool,shape)
}

/********* INPUTS *********/
//changes the size when you press on each circle accordingly
function mousePressed() {
   if(mouseY>=height/2+62.5&&mouseY<=height/2+100){
       if(mouseX>=width-100&&mouseX<=width-80){
           size = 5
       } else if(mouseX>=width-80&&mouseX<=width-60){
           size = 10
       } else if(mouseX>=width-60&&mouseX<=width-40){
           size = 15
       }else if(mouseX>=width-40&&mouseX<=width-20){
           size = 20
       }else if(mouseX>=width-20&&mouseX<=width){
           size = 25
       }
   }
}


function keyPressed() {
if(screen==1){
    //'c' to change color
 if(keyCode==67&&usedTool =='marker'){
     i+=1
     if(i>=colors.length){
         i=0
     }
     
 }
    //'z' to change shape
 if(keyCode==90&&usedTool!='eraseAll'){
     j+=1
     if(j>=3){
         j=0
     }
 }
    //'spacebar' to change tool
 if(keyCode==32){
     k+=1
     if(k>=3){
         k=0
     }
 }
}
}

/***** OTHER FUNCTIONS *****/
//
function info(tool,Usedshape){
    //create rectangular region
    fill('white')
    rect(width-50,height/2,100,200)
    textSize(10)
    fill('black')
    text('Color:',width-50,height/2-75) 
    text('Shape:',width-50, height/2-25)
    text('Tool:',width-50,height/2+25)
    text('Size:', width-50,height/2+62.5)
    //draw circles under "Size:"
    for(z=1;z<6;z++){
        circle(width-110+(z*20),height/2+75,3*z)
    }
    //Changes shape displayed according to the shape being used
    if(Usedshape=='square'){
        fill('black')
        rect(width-50,height/2,20,20)
    }else if(Usedshape == 'triangle'){
        fill('black')
        angleMode(DEGREES)
        triangle(width-50,height/2-20,width-50+(cos(30.0)*20),height/2+10,width-50-(cos(30.0)*20),height/2+10)
    }else if(Usedshape=='circle'){
        fill('black')
        circle(width-50,height/2,20)
    }
    //Changes text displayed accroding to the tool being used
    push()
    textSize(20)
    if(tool=='marker'){
        text('MARKER',width-50,height/2+50)
        fill(inkColor)
        rect(width-50, height/2-50, 30,30)
    }else if(tool=='eraser'){
        text('ERASER',width-50,height/2+50)
        text('NONE',width-50,height/2-50)
    }
    if(tool=='eraseAll'){
        text('RESET',width-50,height/2+50)
        text('NONE',width-50,height/2-50)
    }
    pop()
    
}
//draws shape at the mouse's location according to the shape being used
function shapee(){
    if(shape=='square'){
            rect(mouseX,mouseY,size,size)
        } if(shape=='triangle'){
            angleMode(DEGREES)
            triangle(mouseX,mouseY-size/2,mouseX+(cos(30.0)*size/2),mouseY+(0.5*size/2),mouseX-(cos(30.0)*size/2),mouseY+(0.5*size/2))
            
        }  if(shape=='circle'){
            circle(mouseX,mouseY,size)
        }

}
//Controls Page
function controls(){
    fill(0)
    textSize(30)
    textAlign(CENTER)
    text('"c" to switch color',width/2, height/4-20)
    text('"z" to switch shape',width/2, height/2-20)
    text('"spacebar" to switch tool',width/2, height*3/4-20)
    text('click to switch size',width/2, height-20)
    push()
    rectMode(CORNER)
    fill(buttonCback)
    rect(0,0,100,50)
    pop()
    text('BACK',50,30)
    //changes button if hovered on top of
    if(mouseX>=0&&mouseX<=100&&mouseY>=0&&mouseY<=50){
        buttonCback = 'green'
        if(mouseIsPressed){
        screen= 0
        }
    }else{
        buttonCback = 104
    }
}
