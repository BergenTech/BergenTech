import { mouseHovering } from "../collision.js";

let time = 0;

let pauseButton = {
    width: 50,
    height: 50,
    get x() {
        return width / 2 - 45;
    },
    get y() {
        return height / 2 + 40;
    }
}

let stopButton = {
    width: 50,
    height: 50,
    get x() {
        return width / 2 + 45;
    },
    get y() {
        return height / 2 + 40;
    }
}

let fontSize = 19;

export function pauseMenu(game) {
    time ++;

    graphic.push();

    graphic.rectMode(CORNER);

    graphic.fill(0, 0, 0, 255 * ((time > 20 ? 20 : time) / 20) * 0.5);
    graphic.rect(0, 0, graphic.width, graphic.height);

    graphic.fill(255);
    graphic.textSize(40);
    graphic.textAlign(CENTER, CENTER);
    graphic.text("Paused", width / 2, height / 2 - 50);

    graphic.rectMode(CENTER);

    graphic.fill("yellow");
    graphic.rect(pauseButton.x, pauseButton.y, pauseButton.width, pauseButton.height);
    graphic.image(game.assets.images.pause_image, pauseButton.x, pauseButton.y, pauseButton.width * 0.65, pauseButton.height * 0.65)

    graphic.fill("red");
    graphic.rect(stopButton.x, stopButton.y, stopButton.width, stopButton.height);
    graphic.image(game.assets.images.exit_image, stopButton.x, stopButton.y, stopButton.width * 0.65, stopButton.height * 0.65)

    graphic.pop();

    if (mouseHovering(pauseButton)) {
        if (mouseIsPressed) {
            resume(game);
        }

        cursor(HAND);
    }

    if (mouseHovering(stopButton)) {
        if (mouseIsPressed) {
            game.exit();
        }

        cursor(HAND);
    }
}

function resume(game) {
    time = 0;

    game.screen = "game";
}