var tool = 2
var pen_radius = 0
var pfps = 16.6666666667
var paused = false
var bomb_radius = 0.9
var bombs = []
var bomb_blown = false
var instr = true
var p = 20
var mh = 42
var mw = 76

var m = Array(mw)
var n = Array(mw)
var d = Array(mw)

function setup() {
  for (var i = 0; i < mw; i++) {
    m[i] = Array(mh).fill(0)
    n[i] = Array(mh).fill(0)
    d[i] = Array(mh).fill(0)
  }
  
  createCanvas(p * mw, p * mh)
  background(255);
  frameRate(60)
  setInterval(updatephysics, pfps, 1)
}

function draw() {
  update_bombs()
  
  if (keyIsDown(32)) {
    if (!spaceBuffer) paused = !paused
    spaceBuffer = true
  }
  else {
    spaceBuffer = false
  }
  if (keyIsDown(82)) {
    reset_map()
  }
  if (keyIsDown(49)) tool = 0 // Eraser
  if (keyIsDown(50)) tool = 1 // Stone
  if (keyIsDown(51)) tool = 2 // Water
  if (keyIsDown(52)) tool = 3 // Bombs?
  if (keyIsDown(187)) {
  if (!radius_buffer) pen_radius++
    radius_buffer = true
  }
  else if(keyIsDown(189)) {
    if (!radius_buffer) pen_radius--
    radius_buffer = true
  }
  else {
    radius_buffer = false
  }
  if (mouseIsPressed) {
    if (!bomb_buffer) {
      for (i=0; i<bombs.length; i++) {
        if (dist(mouseX,mouseY,bombs[i].x,bombs[i].y) <= bomb_radius*p) {
          draw_pixels(floor(bombs[i].x/p),floor((bombs[i].y+1)/p),bombs[i].radius,3)
          bombs.splice(i)
          bomb_blown = true
          bomb_buffer = true
        }
      }
    }
    if (!bomb_blown && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      sX = floor(mouseX / p)
      sY = floor(mouseY / p)
      if (tool != 3) {
        draw_pixels(sX,sY,pen_radius,tool)
      }
      else {
        if (!bomb_buffer) {
          bombs.push({x:mouseX, y:mouseY, vel:0, radius:pen_radius})
          bomb_buffer = true
        }
      }
    }
  }
  else {
    bomb_buffer = false
  }
  bomb_blown = false

  noStroke()
  background('white')
  for (var y = 0; y < mh; y++) {
    for (var x = 0; x < mw; x++) {
      switch (m[x][y]) {
        case 0:
          fill('blue')
          rect(x * p, (y + 1) * p, p, -d[x][y] * p)
          break
        case 1:
          fill('grey')
          rect(x * p, y * p, p, p)
          break
        case 2:
          fill('orange')
          rect(x * p, y * p, p, p)
          break
        default:
          fill('purple')
          rect(x * p, y * p, p, p)
      }
    }
  }

  draw_bombs()
if (instr) {
    text('1, 2, 3, 4 keys to change placed block\nSpace to pause water physics\n- and + keys to change pen size\nr key to reset the canvas', 10, 30);
}
  
  // Cool Border
  stroke('black')
  fill(0,0,0,0)
  rect(0,0,width,height)
}

function updatephysics() {
  if (paused) {
    return 0
  }
  for (var y = mh-1; y >= 0; y--) {
    for (var x = 0; x < mw; x++) {
      if (m[x][y] == 2 && random() > 0.5) {
        m[x][y] = 0
      }
      if (d[x][y] != 0) {
        if (m[x][y + 1] != 1 && d[x][y + 1] != 1 && y != mh - 1) {
          fall(x,y,y+1)
        }
        else {
          a = (x != 0 && m[x - 1][y] == 0 && d[x - 1][y] < d[x][y])
          b = (x != mw - 1 && m[x + 1][y] == 0 && d[x + 1][y] < d[x][y])
          if (a && b) {
            flow(1 / 3, x, y, x - 1, y)
            flow(1 / 3, x, y, x + 1, y)
          }
          else if (a) {
            flow(1 / 2, x, y, x - 1, y)
          }
          else if (b) {
            flow(1 / 2, x, y, x + 1, y)
          }
        }
      }
    }
  }
  for (var y = mh-1; y >= 0; y--) {
    for (var x = 0; x < mw; x++) {
      d[x][y] = n[x][y]
    }
  }
}

function flow(amount, x1, y1, x2, y2) {
  n[x2][y2] += amount * (d[x1][y1] - d[x2][y2])
  n[x1][y1] -= amount * (d[x1][y1] - d[x2][y2])
}

function fall(x, y1, y2) {
  n[x][y2] += n[x][y1]
  n[x][y1] = 0
  if (n[x][y2] > 1) {
    n[x][y1] += n[x][y2] - 1
    n[x][y2] = 1
  }
}

function reset_map() {
  for (var i = 0; i < mw; i++) {
    m[i] = Array(mh).fill(0)
    n[i] = Array(mh).fill(0)
    d[i] = Array(mh).fill(0)
  }
}

function draw_pixels(x,y,radius,pixel_type) {
  for (j=x-radius;j<=x+radius;j++) {
    for (h=y-radius;h<=y+radius;h++) {
      if (dist(j,h,x,y) <= radius && j >= 0 && h >= 0 && j < mw && h < mh) {
        if (pixel_type == 2) {
          if (m[j][h] == 0) {
            d[j][h] = 1
            n[j][h] = 1
          }
        }
        else {
          if (pixel_type == 3) {
            if (random() > 0.01) {
              m[j][h] = 2
            }
          }
          else {
            m[j][h] = pixel_type
          }
          d[j][h] = 0
          n[j][h] = 0
        }
      }
    }
  }
}

function update_bombs() {
  for (i=0; i<bombs.length; i++) {
    temp_x = floor(bombs[i].x/p)
    temp_y = floor(bombs[i].y/p)
    if (bombs[i].y >= height) {
      bombs[i].vel = 0
      bombs[i].y = height
      if (d[temp_x][mh-1] > 0) {
        bombs[i].vel -= 0.5
      }
    } 
    else if (m[temp_x][temp_y] == 1) {
      bombs[i].vel = 0
      bombs[i].y = temp_y*p
    } 
    else if (bombs[i].y > (temp_y+1)*p - d[temp_x][temp_y]*p) {
      bombs[i].vel -= 0.5
    } 
    else {
      bombs[i].vel += 1
    }
    bombs[i].y += bombs[i].vel
    bombs[i].vel *= 0.95
  }
}

function draw_bombs() {
  for (i=0; i<bombs.length; i++) {
    push()
    fill(200,0,0)
    circle(bombs[i].x,bombs[i].y,p*bomb_radius)
    pop()
  }
}