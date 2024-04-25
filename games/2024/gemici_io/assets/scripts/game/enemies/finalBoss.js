import { isColliding, isCollidingCircle } from "../collision.js";
import Enemy from "./generic.js";

export default class FinalBoss extends Enemy {
    spriteState = "idle";
    currentSprite = 0;

    _state = "idle";

    runningAngle = 0;
    runningTime = 0;

    idleRandom = 0;
    idleTime = 0;

    chaseTime = 0;
    chaseRandom = 0;

    firing = false;
    facing = "left";

    time = 0;

    bullets = [];

    constructor(x = 0, y = 0) {
        super(x, y, 60 * 1.5, 50 * 1.5, 30000, 10, 0, 0, "black", null);

        window.game.boss_bullets = this.bullets;
    }

    get center() {
        return {
            x: 1500 - game.dimensions.position.x,
            y: 1500 - game.dimensions.position.y
        }
    }

    draw() {
        graphic.push();
        graphic.rectMode(CENTER);
        graphic.imageMode(CENTER);
        graphic.fill(this.color);
        //graphic.rect(this.x, this.y, this.width, this.height);
        var imageWidth = this.width * 1.3;
        var imageHeight = this.sprites[this.spriteState][this.currentSprite].height * (imageWidth / this.sprites[this.spriteState][this.currentSprite].width);
        if (this.facing === "left") {
            graphic.image(this.sprites[this.spriteState][this.currentSprite], this.x, this.y, imageWidth, imageHeight);
        } else {
            graphic.push();
            graphic.scale(-1, 1);
            graphic.image(this.sprites[this.spriteState][this.currentSprite], -this.x, this.y, imageWidth, imageHeight);
            graphic.pop();
        }

        graphic.stroke("red");
        graphic.strokeWeight(2);
        graphic.fill(0, 0, 0, 0);
        graphic.rect(this.x, this.y, this.width, this.height);

        this.drawBorders();

        graphic.pop();
    }

    drawBorders() {
        var center = this.center;
        var radius = 650 / 2;

        graphic.push();
        graphic.noFill();
        graphic.stroke("red");
        graphic.strokeWeight(4);
        graphic.ellipse(center.x, center.y, radius * 2, radius * 2);
        graphic.pop();
    }

    get state() {
        return this._state;
    }

    set state(val = "idle") {
        this._state = val;

        this.currentSprite = 0;
        this.firing = false;

        if (val === "idle") {
            this.idleTime = 0;
            this.idleRandom = random(0, 1);

            this.spriteState = "idle";
        } else if (val === "chasing") {
            this.chaseRandom = random(0, 1);
            this.chaseTime = 0;

            this.spriteState = "running";
        } else if (val === "running") {
            this.runningAngle = atan2(window.game.player.y - this.y, window.game.player.x - this.x);
            this.runningTime = 0;

            this.spriteState = "running";
        } else if (val === "dying") {
            this.spriteState = "dying";
        } else if (val === "attacking") {
            this.spriteState = "attacking";
        } else if (val === "hurt") {
            this.spriteState = "hurt";
        }
    }

    idle() {
        this.idleTime ++;

        if (this.idleRandom < 0.55) {
            this.state = "chasing";

            if (this.idleRandom < 0.2) {
                this.firing = true;
            }
        }

        if (this.idleTime > 100) {
            if (this.idleRandom > 0.55) {
                this.state = "running";
            }
        }
    }

    chase() {
        this.chaseTime ++;

        var angle = atan2(window.game.player.y - this.y, window.game.player.x - this.x);
        var speedX = 1.2 * cos(angle);
        var speedY = 1.2 * sin(angle);

        if (angle > -90 && angle < 90) {
            this.facing = "right";
        } else {
            this.facing = "left";
        }
    
        this.x += speedX;
        this.y += speedY;

        if (this.firing) {
            if (frameCount % 60 === 0) {
                this.fire();
            }
        }

        if (this.chaseTime > this.chaseRandom * 500) {
            this.state = "idle";
        }
    }

    run() {
        this.runningTime ++;

        var angle = this.runningAngle;
        var speedX = 4.8 * cos(angle);
        var speedY = 4.8 * sin(angle);

        if (angle > -90 && angle < 90) {
            this.facing = "right";
        } else {
            this.facing = "left";
        }
    
        this.x += speedX;
        this.y += speedY;

        if (this.runningTime > 100) {
            this.state = "idle";
        }
    }

    fire() {
        for (var i = 0; i < 8; i ++) {
            var angle = i * 45;
            this.bullets.push(new Bullet(this.x, this.y, angle, this));
        }
    }

    update() {
        this.time ++;

        if (this.state === "chasing") {
            if (frameCount % 20 === 0) {
                this.currentSprite ++;
            }
        } else if (this.state === "running") {
            if (frameCount % 10 === 0) {
                this.currentSprite ++;
            }
        } else {
            if (frameCount % 15 === 0) {
                this.currentSprite ++;
            }
        }

        if (this.currentSprite >= this.sprites[this.spriteState].length) {
            this.currentSprite = 0;
        }

        var center = this.center;
        var radius = 650 / 2;

        var x = this.x;
        var y = this.y;

        if (this.state === "idle") {
            this.idle();
        } else if (this.state === "chasing") {
            this.chase();
        } else if (this.state === "running") {
            this.run();
        }

        if (this.checkBounds()) {
            this.x = x;
            this.y = y;
        }

        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw();
            this.bullets[i].update();
        }

        if (dist(window.game.player.x, window.game.player.y, center.x, center.y) > radius - 10) {
            if (frameCount % 10 === 0) {
                window.game.player.hurt(4);
            }
        }
    }

    kill() {
        window.game.enemies_arr.splice(window.game.enemies_arr.indexOf(this), 1);

        window.game.objects.spawnObject("chest", [this.coords.x, this.coords.y])
    }

    checkBounds() {
        var center = this.center;
        var radius = 650 / 2;

        return (dist(center.x, center.y, this.x, this.y) > radius - 30);
    }
}

FinalBoss.prototype.sprites = {
    idle: [],
    running: [],
    dying: [],
    attacking: [],
    hurt: []
}

function lerpAngle(a, b, t) {
    var angle = atan2(sin(b - a), cos(b - a));
    return a + angle * t;
}

class Bullet {
    cooldown = 0;

    constructor(x, y, angle, parent) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.parent = parent;
        this.speed = 3.5;
        this.radius = 4;
        this.color = "black";
    }

    draw() {
        graphic.push();
        graphic.fill(this.color);
        graphic.ellipse(this.x, this.y, this.radius * 2);
        graphic.pop();
    }

    update() {
        this.cooldown--;

        var speedX = this.speed * cos(this.angle);
        var speedY = this.speed * sin(this.angle);

        var targetAngle = atan2(window.game.player.y - this.y, window.game.player.x - this.x);
        var angle = lerpAngle(this.angle, targetAngle, 0.01);

        this.angle = angle;

        this.x += speedX;
        this.y += speedY;

        if (this.checkBounds()) {
            this.kill();
        }

        if (isCollidingCircle(window.game.player, this) && this.cooldown < 0) {
            window.game.player.hurt(8);
            this.cooldown = 60;
        }
    }

    checkBounds() {
        var center = this.parent.center;
        var radius = 650 / 2;

        return (dist(center.x, center.y, this.x, this.y) > radius - 5);
    }

    kill() {
        this.parent.bullets.splice(this.parent.bullets.indexOf(this), 1);
    }
}