//tower logic
//two offensive towers(ranged, melee), econ tower(money production), buff tower(defense/offense buff, does not work with econ tower)

class Offense{
    constructor(x, y, damage, range){
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.range = range
        this.level = 1;
    }

    update(){}
    display(){}
    fire(){}
    upgrade(){}
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
    constructor(gridX, gridY, health){
        //CANNOT UPGRADE
        this.x = gridX;
        this.y = gridY;
        this.hp = health;
    }

    update(){}
    display(){}
    takeDamage(){}
}