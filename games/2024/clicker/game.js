class ClickerGame {
    constructor(height, width) {
        this.bg = { img: null, speed: 0.0002 };

        this.mainClicker = { y: height / 2, x: width / 2, img: null, width: 72, height: 72, scale: 1 }
        this.clickedParticle = { img: null, width: 20, lifetime: 700 }
        this.particles = []

        this.clickUpgrades = [
            { cost: 100, perClick: 2 },
            { cost: 200, perClick: 5 },
            { cost: 400, perClick: 10 },
            { cost: 1500, perClick: 20 },
            { cost: 5000, perClick: 50 },
            { cost: 8000, perClick: 75 },
            { cost: 12000, perClick: 100 },
            { cost: 20000, perClick: 120 },
            { cost: 30000, perClick: 200 },
            { cost: 50000, perClick: 500 },
            { cost: 100000, perClick: 1000 },
        ]
        this.upgradeClickButton = {
            x: 10, y: height - 90, width: 140, height: 80, index: 0, color: color(120, 120, 140), lockImg: null
        }
        this.moneyPerClick = 1

        this.farmUpgrades = [
            { cost: 10, perSecond: 1 },
            { cost: 500, perSecond: 2 },
            { cost: 1000, perSecond: 5 },
            { cost: 3000, perSecond: 10 },
            { cost: 8000, perSecond: 15 },
            { cost: 15000, perSecond: 25 },
            { cost: 25000, perSecond: 40 },
            { cost: 40000, perSecond: 60 },
            { cost: 60000, perSecond: 80 },
            { cost: 80000, perSecond: 100 },
        ]
        this.upgradeFarmButton = {
            x: 160, y: height - 90, width: 140, height: 80, index: 0, color: color(120, 120, 140), lockImg: null
        }
        this.moneyPerSecond = 0

        this.conveyor = {
            x: width - 120, y: 0, width: 100, height: height - 100, color: color(120, 120, 140), speed: 0.1
        }
        this.farmItem = {
            y: -20, width: 30, height: 30, img: null
        }
        this.farmItems = []
        this.farmTimer = 0

        this.money = 0

        this.height = height
        this.width = width
        this.time = 0
    }

    load() {
        this.bg.img = loadImage('assets/background.png');
        this.mainClicker.img = loadImage('assets/smiley.png')
        this.clickedParticle.img = loadImage('assets/smiley.png')
        this.upgradeClickButton.lockImg = loadImage('assets/lock.png')
        this.upgradeFarmButton.lockImg = loadImage('assets/lock.png')
        this.farmItem.img = loadImage('assets/smiley.png')
    }

    display(deltaTime) {
        this.time += deltaTime
        this.updateFarmItems()
        // particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i]
            p.time += deltaTime
            p.y += deltaTime * p.speed
            p.speed -= p.accel * deltaTime
            if (p.time > this.clickedParticle.lifetime) {
                this.particles.splice(i, 1)
            }
        }
        // farmItems
        for (let i = 0; i < this.farmItems.length; i++) {
            this.farmItems[i].y += this.conveyor.speed * deltaTime
            if (this.farmItems[i].y > this.conveyor.y + this.conveyor.height) {
                this.farmItems.splice(i, 1)
                this.money += 1
            }
        }
        this.drawBackground()
        this.drawEffects()
        this.drawClicker()
        this.drawUI()
        if (this.moneyPerSecond != 0) {
            this.farmTimer += deltaTime
            this.drawFarm()
        }
    }

    mousePressed() {
        if (this.checkMainClickerHover()) {
            this.clickClicker()
        } else if (this.checkBoxHover(this.upgradeClickButton.x, this.upgradeClickButton.y, this.upgradeClickButton.width, this.upgradeClickButton.height) && this.clickUpgrades[this.upgradeClickButton.index].cost <= this.money) {
            this.upgradeClick()
        } else if (this.checkBoxHover(this.upgradeFarmButton.x, this.upgradeFarmButton.y, this.upgradeFarmButton.width, this.upgradeFarmButton.height) && this.farmUpgrades[this.upgradeFarmButton.index].cost <= this.money) {
            this.upgradeFarm()
        }
    }

    // drawing

    drawBackground() {
        push()
        translate(this.width / 2, this.height / 2)
        rotate(this.bg.speed * this.time % 2 * PI)
        imageMode(CENTER)
        image(this.bg.img, 0, 0)
        pop()
    }

    drawClicker() {
        push()
        imageMode(CENTER)
        this.mainClicker.scale = this.checkMainClickerHover() ? 1.5 : 1.3
        image(this.mainClicker.img, this.mainClicker.x, this.mainClicker.y, this.mainClicker.width * this.mainClicker.scale, this.mainClicker.height * this.mainClicker.scale)
        pop()
    }

    drawEffects() {
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i]
            push()
            translate(this.width / 2, this.height / 2)
            rotate(p.rotate)
            imageMode(CENTER)
            tint(255, 255 - (p.time / this.clickedParticle.lifetime) * 255)
            image(this.clickedParticle.img, 0, p.y, this.clickedParticle.width, this.clickedParticle.width)
            pop()
        }
    }

    drawUI() {
        // score
        push()
        textAlign(CENTER, TOP)
        textSize(20)
        text("CLICKS", this.width / 2, 6)
        textSize(50)
        text(this.money, this.width / 2, 30)
        pop()

        //upgrade click button
        push()
        let b = this.upgradeClickButton
        let cost = this.clickUpgrades[b.index]
        fill(b.color)
        if (this.checkBoxHover(b.x, b.y, b.width, b.height) && this.money >= cost.cost) {
            stroke("white")
            if (mouseIsPressed) {
                fill(b.color)
            }
        } else {
            noStroke()
        }
        rect(b.x, b.y, b.width, b.height)
        pop()
        // label
        push()
        fill("white")
        textAlign(CENTER, TOP)
        textSize(18)
        text("PER CLICK", b.x + (b.width / 2), b.y + 6)
        // price
        textAlign(LEFT, TOP)
        textSize(20)
        text("$" + cost.cost, b.x + 10, b.y + 30)
        textAlign(RIGHT, TOP)
        text(this.moneyPerClick + "->" + cost.perClick, b.x + b.width - 10, b.y + 54)
        pop()
        // if locked
        if (this.money < cost.cost) {
            push()
            imageMode(CENTER)
            image(this.upgradeClickButton.lockImg, b.x + (b.width / 2), b.y + (b.height / 2))
            pop()
        }

        // farm button
        push()
        b = this.upgradeFarmButton
        cost = this.farmUpgrades[b.index]
        fill(b.color)
        if (this.checkBoxHover(b.x, b.y, b.width, b.height) && this.money >= cost.cost) {
            stroke("white")
            if (mouseIsPressed) {
                fill(b.color)
            }
        } else {
            noStroke()
        }
        rect(b.x, b.y, b.width, b.height)
        pop()
        // label
        push()
        fill("white")
        textAlign(CENTER, TOP)
        textSize(18)
        text("AUTO CLICK", b.x + (b.width / 2), b.y + 6)
        // price
        textAlign(LEFT, TOP)
        textSize(20)
        text("$" + cost.cost, b.x + 10, b.y + 30)
        textAlign(RIGHT, TOP)
        text(this.moneyPerSecond + "->" + cost.perSecond, b.x + b.width - 10, b.y + 54)
        pop()
        // if locked
        if (this.money < cost.cost) {
            push()
            imageMode(CENTER)
            image(this.upgradeClickButton.lockImg, b.x + (b.width / 2), b.y + (b.height / 2))
        }
    }

    drawFarm() {
        // conveyor
        push()
        fill(this.conveyor.color)
        noStroke()
        rect(this.conveyor.x, this.conveyor.y, this.conveyor.width, this.conveyor.height)
        pop()
        // conveyor lines
        push()
        stroke("black")
        strokeWeight(3)
        for (let i = 0; i < 10; i++) {
            let lineY = (i * this.conveyor.height / 10 + this.time * this.conveyor.speed) % this.conveyor.height
            line(this.conveyor.x, lineY, this.conveyor.x + this.conveyor.width, lineY)
        }
        pop()
        //farm items
        push()
        for (let i = 0; i < this.farmItems.length; i++) {
            let item = this.farmItems[i]
            image(this.farmItem.img, item.x, item.y, this.farmItem.width, this.farmItem.height)
        }
        pop()
    }

    // checks, util

    checkMainClickerHover() {
        return (dist(this.mainClicker.x, this.mainClicker.y, mouseX, mouseY) < this.mainClicker.width / 2)
    }

    checkBoxHover(x, y, width, height) {
        return (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height)
    }

    // on event

    clickClicker() {
        // spawn effect
        for (let i = 0; i < this.moneyPerClick; i++) {
            this.particles.push(
                { rotate: random(0, 2 * PI), time: 0, y: 20, speed: 0.2, accel: 0.00025 }
            )
        }
        this.money += this.moneyPerClick
    }

    upgradeClick() {
        this.money -= this.clickUpgrades[this.upgradeClickButton.index].cost
        this.moneyPerClick = this.clickUpgrades[this.upgradeClickButton.index].perClick
        this.upgradeClickButton.index += 1
    }

    upgradeFarm() {
        this.money -= this.farmUpgrades[this.upgradeFarmButton.index].cost
        this.moneyPerSecond = this.farmUpgrades[this.upgradeFarmButton.index].perSecond
        this.upgradeFarmButton.index += 1
    }

    updateFarmItems() {
        if (this.farmTimer > 1000 / this.moneyPerSecond) {
            print(this.farmTimer)
            // spawn floor(this.farmTimer*this.moneyPerSecond)
            for (let i = 0; i < floor(this.farmTimer * this.moneyPerSecond / 1000); i++) {
                this.farmItems.push({
                    x: random(this.conveyor.x + 20, this.conveyor.x + this.conveyor.width - 20), y: this.farmItem.y
                })
            }
            this.farmTimer %= 1 / this.moneyPerSecond
        }
    }
}