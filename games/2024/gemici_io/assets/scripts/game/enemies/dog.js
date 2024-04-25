import Enemy from "./generic.js";

export default class Dog extends Enemy {
    constructor(x = 0, y = 0) {
        super(x, y, 20, 15, 18, 2, 1.3, 0.50, "black", null);
        
        if (Dog.prototype.health) {
            this.health = Dog.prototype.health;
        }

        this.state = "idle";
        this.currentSprite = 0;

        this.offsetY = 2;

        this.update = () => {
            if (frameCount % 15 === 0) {
                this.currentSprite ++;
            }

            if (this.currentSprite >= this.sprites[this.state][0].length) {
                this.currentSprite = 0;
            }

            this.img = this.sprites[this.state][this.currentSprite];

            this.checkBounds();

            var angle = atan2(window.game.player.y - this.y, window.game.player.x - this.x);
            var speedX = this.speed * cos(angle);
            var speedY = this.speed * sin(angle);

            if (abs(speedX) > 0.1 || abs(speedY) > 0.1) {
                this.state = "walking";
            } else {
                this.state = "idle";
            }
        
            this.x += speedX;
            this.y += speedY;
        }

        this.draw = () => {
            if (!this.onScreen) {
                return;
            }
    
            graphic.push();
            if (this.img) {
                var imgWidth = 20 * 1.7;
                var imgHeight = this.img.height * (this.width / (this.img.width * 0.75)) * 1.7;
    
                graphic.fill(this.color);
    
                graphic.image(this.img, this.x, this.y - (this.offsetY || 0), imgWidth, imgHeight);
            } else {
                graphic.fill(this.color);
                graphic.rect(this.x, this.y, this.width, this.height);
            }
            graphic.pop();
        }
    }
}

Dog.prototype.sprites = {
    idle: [],
    walking: [],
    dying: [],
    attacking: []
}