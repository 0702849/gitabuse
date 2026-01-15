//tower logic
//two offensive towers(ranged, melee), econ tower(money production), buff tower(defense/offense buff, does not work with econ tower)

let spawningAllowed = true;

let towers = [];


class Offense{
    constructor(x, y, damage, range){
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.range = range
        this.level = 1;
    }

    update(){}
    display(){
        noStroke();
        fill("red");
        circle(x, y, 60);
    }
    fire(cooldown){}
    upgrade(){}
}

class OffenseTwo extends Offense{
    constructor(x, y, damage, range){
        super(x, y, damage);
        this.range = range;
    }
    update(){
        super.update;
    }
    display(){
        fill("blue");
        noStroke();
        triangle(x, y+70, x-40, y, x+40, y);
    }
    fire(cooldown){
        super.fire;
    }
    upgrade(){
        super.upgrade;
    }
}

class Econ{
    constructor(x, y, moneyProduction){
        this.x = x;
        this.y = y;
        this.produce = moneyProduction;
        this.levelMultiplier = 1;
    }

    produce(){}
    display(){}
    upgrade(){}
}

class Buff{
    constructor(gridX, gridY){
        //CANNOT UPGRADE
        this.x = gridX;
        this.y = gridY;
        this.hp = health;
    }

    update(){}
    display(){}
    Buff(){}
}
class DefenseBuff extends Buff{
    constructor(gridX, gridY, health){
        super(gridX, gridY);
        this.health = health;
    }
    update(){}
    display(){}
    takeDamage(){}
}

function spawnDebugTower(){
    if(spawningAllowed){
        fill("green");
        towers.push(new Offense(mouseX, mouseY, 10, 10));
    }
    else{
        return;
    }
}