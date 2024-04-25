import Butterfly from "./enemies/butterfly.js";
import Zombie from "./enemies/zombie.js";
import ZombieBoss from "./enemies/zombieBoss.js";
import FinalBoss from "./enemies/finalBoss.js";
import Dog from "./enemies/dog.js";

export default class Enemies {
    types = {
        Zombie,
        Butterfly,
        FinalBoss,
        ZombieBoss,
        Dog
    }

    constructor(game) {
        this.enemies = game.enemies_arr;
        this.game = game;

        this.loadZombieSprites([
            game.assets.images.zombie_idle,
            game.assets.images.zombie_walk,
            game.assets.images.zombie_death,
            game.assets.images.zombie_attack
        ]);

        this.loadBossSprites([
            game.assets.images.boss_idle,
            game.assets.images.boss_attack,
            game.assets.images.boss_death,
            game.assets.images.boss_hurt,
            game.assets.images.boss_run
        ]);
    }

    spawnEnemy(type = "zombie", x = 0, y = 0) {
        switch (type) {
            default:
            case "zombie":
                this.enemies.push(new Zombie(...this.randomSpawnPoint()));
                break;
            case "butterfly":
                this.enemies.push(new Butterfly(...this.randomSpawnPoint()));
                break;
            case "zombie_boss":
                this.enemies.push(new ZombieBoss(...this.randomSpawnPoint()));
                break;
            case "dog":
                this.enemies.push(new Dog(...this.randomSpawnPoint()));
                break;
            case "final_boss":
                this.enemies.push(new FinalBoss(x, y));
                break;
        }
    }

    randomSpawnPoint() {
        // generate a few random ints to decide whether or not it spawns at the top, bottom, left, or right

        var rand = Math.floor(random(0, 3));

        let x = 0;
        let y = random(-20, height + 20);
      
        switch(rand) {
          case 0:
            x = -10;
            break;
          case 1:
            x = random(0, width);
            
            if (Math.floor(random(0, 2))) {
              y = random(-50, -20);
            } else {
              y = random(height + 50, height + 20);
            }
            break;
          case 2:
            x = width + 10;
            break;
          default:
            break;
        }

        if (
            (x - window.game.player.x) + window.game.player.coords.x > 3000 ||
            (x - window.game.player.x) + window.game.player.coords.x < 0 ||
            (y - window.game.player.y) + window.game.player.coords.y > 3000 ||
            (y - window.game.player.y) + window.game.player.coords.y < 0
        ) {
            return this.randomSpawnPoint();
        }

        return [x, y]
    }

    draw(enemies) {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].draw();
        }
    }

    update(enemies) {
        var cloned = this.game.getTargets().slice(0);

        for (var i = 0; i < enemies.length; i++) {
            enemies[i].update();
            enemies[i].checkCollisions(cloned);
        }
    }

    loadZombieSprites([
        idleSheet = [],
        walkingSheet = [],
        dyingSheet = [],
        attackingSheet = []
    ]) {
        var idleWidth = idleSheet.width / 6;
        var idleHeight = idleSheet.height / 4;

        for (let i = 0; i < 5; i ++) {
            for (let j = 0; j < 4; j ++) {
                var sprite = idleSheet.get(i * idleWidth, j * idleHeight, idleWidth, idleHeight);
                this.types.Zombie.prototype.sprites.idle[j].push(sprite);
            }
        }

        var walkingWidth = walkingSheet.width / 11;
        var walkingHeight = walkingSheet.height / 4;

        for (let i = 0; i < 10; i ++) {
            for (let j = 0; j < 4; j ++) {
                var sprite = walkingSheet.get(i * walkingWidth, j * walkingHeight, walkingWidth, walkingHeight);
                this.types.Zombie.prototype.sprites.walking[j].push(sprite);
            }
        }

        var dyingWidth = dyingSheet.width / 8;
        var dyingHeight = dyingSheet.height / 4;

        for (let i = 0; i < 7; i ++) {
            for (let j = 0; j < 4; j ++) {
                var sprite = dyingSheet.get(i * dyingWidth, j * dyingHeight, dyingWidth, dyingHeight);
                this.types.Zombie.prototype.sprites.dying[j].push(sprite);
            }
        }

        var attackingWidth = attackingSheet.width / 9;
        var attackingHeight = attackingSheet.height / 4;

        for (let i = 0; i < 8; i ++) {
            for (let j = 0; j < 4; j ++) {
                var sprite = attackingSheet.get(i * attackingWidth, j * attackingHeight, attackingWidth, attackingHeight);
                this.types.Zombie.prototype.sprites.attacking[j].push(sprite);
            }
        }

        return true;
    }

    loadBossSprites([
        idleSheet = [],
        attackSheet = [],
        deathSheet = [],
        hurtSheet = [],
        runSheet = []
    ]) {
        var idleWidth = idleSheet.width / 3;
        var idleHeight = idleSheet.height;

        for (let i = 0; i < 3; i ++) {
            var sprite = idleSheet.get(i * idleWidth, 0, idleWidth, idleHeight);
            this.types.FinalBoss.prototype.sprites.idle.push(sprite);
        }

        var attackWidth = attackSheet.width / 6;
        var attackHeight = attackSheet.height;

        for (let i = 0; i < 6; i ++) {
            var sprite = attackSheet.get(i * attackWidth, 0, attackWidth, attackHeight);
            this.types.FinalBoss.prototype.sprites.attacking.push(sprite);
        }

        var deathWidth = deathSheet.width / 7;
        var deathHeight = deathSheet.height;

        for (let i = 0; i < 7; i ++) {
            var sprite = deathSheet.get(i * deathWidth, 0, deathWidth, deathHeight);
            this.types.FinalBoss.prototype.sprites.dying.push(sprite);
        }

        var hurtWidth = hurtSheet.width / 3;
        var hurtHeight = hurtSheet.height;

        for (let i = 0; i < 3; i ++) {
            var sprite = hurtSheet.get(i * hurtWidth, 0, hurtWidth, hurtHeight);
            this.types.FinalBoss.prototype.sprites.hurt.push(sprite);
        }

        var runWidth = runSheet.width / 3;
        var runHeight = runSheet.height;

        for (let i = 0; i < 3; i ++) {
            var sprite = runSheet.get(i * runWidth, 0, runWidth, runHeight);
            this.types.FinalBoss.prototype.sprites.running.push(sprite);
        }
    }
}