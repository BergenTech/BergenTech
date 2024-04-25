import Generic from './generic.js';

import { isColliding } from '../collision.js';

export default class Spawner extends Generic {
    constructor(x = 0, y = 0) {
        super(x, y, 60, 60, 0, 0, "red", window.game.assets.images.portal);
    }

    draw() {
        const coords = this.getCoords();

        graphic.push();
        graphic.noStroke();
        this.update?.call(this);
        graphic.fill(this.color);
        if (this.image) {
            graphic.image(this.image, coords.x, coords.y, this.width, this.height);
        } else {
            graphic.fill(this.color);
            graphic.rect(coords.x, coords.y, this.width, this.height);
        }

        if (coords.x < 0 || coords.x > width || coords.y < 0 || coords.y > height) {
            var angle = atan2(coords.y - height / 2, coords.x - width / 2);

            graphic.push();
            graphic.translate(width / 2, height / 2);
            graphic.rotate(angle);
            graphic.translate(40, 0);
            graphic.fill("red");
            graphic.triangle(0, -10, 0, 10, 20, 0);
            graphic.pop();
        }

        graphic.pop();
    }

    update() {
        var coords = this.getCoords();

        if (this.spawned === true) {
            return false;
        }

        if (isColliding({
            x: coords.x,
            y: coords.y,
            width: this.width,
            height: this.height
        }, window.game.player)) {
            this.spawned = true;

            setTimeout(() => {
                var { x, y } = window.game.getLocation(this.x, this.y);
                
                window.game.enemies.spawnEnemy("final_boss", x, y);
            }, 1500);

            this.kill();
        }
    }
    
    kill() {
        this.draw = () => {
            var { x, y } = this.getCoords();
            graphic.fill("red");
            graphic.circle(x, y, this.width, this.height);
        }
        setTimeout(() => {
            super.kill();
        }, 1500);
    }
}