import checkCollisions from "./checkCollisions.js";

class Unit {
    constructor({position, speed = 3, size = {width: 48, height: 48}, spells, shootRate = 100, mapSize, isEnemy, point, colorSpell = '#FFFFFF'}){
        this.position = position;
        this.size = size;
        this.speed = speed;
        this.spells = spells;
        this.mapSize = mapSize;
        this.isMovingRight = isEnemy;
        this.shootRate = shootRate;
        this.isEnemy = isEnemy;
        this.initializeMouseTracking();
        this.point = {score:point};
        this.colorSpell = {color:colorSpell};
        this.animateUnit();
    }

    draw(c){
        c.fillStyle = 'red';
        c.beginPath();
        c.arc(
            this.position.x + this.size.width / 2, // x - координата центра окружности
            this.position.y + this.size.height / 2, // y - координата центра окружности
            Math.min(this.size.width, this.size.height) / 2, // радиус - меньшее из двух размеров
            0, // startAngle - начальный угол
            Math.PI * 2 // endAngle - конечный угол (полный круг)
        );

        c.fill();
    }

    animateUnit(){
        let count = 0;

        const move = () => {
            if (this.position.x <= 0 || this.position.x >= this.mapSize.x - this.size.width){
                this.changeDirection(!this.isMovingRight);
            }

            count += 1;
            if (1 <= count){
                if (this.isMovingRight) {
                    this.position.x += this.speed;
                } else {
                    this.position.x -= this.speed;
                }
                count = 0
            } 
            this.checkCursorPosition();
            window.requestAnimationFrame(move);
        }

        move();
    }

    changeDirection (bool){
        this.isMovingRight = bool;
    }

    initializeMouseTracking() {
        window.addEventListener('mousemove', (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        });
        window.addEventListener('click', ()=> {
            if(this.isCursorInside(this.mouseX, this.mouseY)){
                const setting = document.querySelector('.setting')
                setting.classList.remove('unActive');
            }
        })
    }

    checkCursorPosition() {
        if (this.isCursorInside(this.mouseX, this.mouseY)) {
            if (this.mouseX < this.position.x + this.size.width / 2) {
                this.changeDirection(true)
            } else {
                this.changeDirection(false)
            }
        }
    }
    isCursorInside(mouseX, mouseY) {
        return (
            mouseX >= this.position.x &&
            mouseX <= this.position.x + this.size.width &&
            mouseY >= this.position.y &&
            mouseY <= this.position.y + this.size.height
        );
    }
    changeColor(color){
        this.colorSpell.color = color;
    }
    attack(enemyUnitPosition){
        let count = 0;
        const shoot = () => {
            count += 1;

            if (count >= 200 - this.shootRate){
                // console.log(this.colorSpell.color)
                count = 0;
                const spell = new Spell({
                    position: {
                        x: this.position.x ,
                        y: this.position.y,
                    },
                    isEnemy: this.isEnemy,
                    mapSize: {
                        x: this.mapSize.x,
                        y: this.mapSize.y,
                    },
                    point:this.point,
                    colorSpell:this.colorSpell.color,
                })

                if (this.isEnemy){
                    this.spells.enemy.push(spell);
                    if (this.spells.enemy.length === this.shootRate){
                        this.spells.enemy = this.spells.enemy.slice(2)
                    }
                } else {
                    this.spells.player.push(spell);
                    if (this.spells.player.length === this.shootRate){
                        this.spells.player = this.spells.player.slice(2)
                    }
                }

                spell.animateSpell(0,enemyUnitPosition);
            }
            window.requestAnimationFrame(shoot);
        }
        shoot();
    }


}

class Spell {
    constructor({ position, size = {width: 48, height: 48}, isDelete = false, isEnemy, spellSpeed = 1, mapSize, point, colorSpell}){
        this.position = position;
        this.size = size;
        this.isDelete = isDelete;
        this.isEnemy = isEnemy;
        this.spellSpeed = spellSpeed; 
        this.mapSize = mapSize;
        this.point = point;
        this.colorSpell = colorSpell;
    }
    delete(){
        this.isDelete = true;
    }

    draw(c) {
        if (this.isDelete){
            return;
        }

        c.fillStyle = this.colorSpell
        c.beginPath();
        c.arc(
            this.position.x + this.size.width / 2, // x - координата центра окружности
            this.position.y + this.size.height / 2, // y - координата центра окружности
            Math.min(this.size.width, this.size.height) / 2, // радиус - меньшее из двух размеров
            0, // startAngle - начальный угол
            Math.PI * 2 // endAngle - конечный угол (полный круг)
        );
    
        c.fill();
    }

    hit(enemyUnitPosition){
        if (checkCollisions(
            {rectangle1: {
                position: this.position, 
                width: this.size.width, 
                height: this.size.height
            }, 
            rectangle2: {
                position: enemyUnitPosition.position,
                width: enemyUnitPosition.size.width, 
                height: enemyUnitPosition.size.height
            }})
        ) {
            this.point.score += 1;
            this.delete();
        } 
    }

    animateSpell(lastTime = 0, enemyUnitPosition){
        const move = (timestamp) => {

           this.hit(enemyUnitPosition);

            const deltaTime = timestamp - lastTime;
            if (deltaTime > this.spellSpeed) {
                this.position.y += !this.isEnemy ? 10 : -10;
                lastTime = timestamp;
            }
            if (!this.isEnemy && this.position.y >= this.mapSize.y) {
                this.delete();
            } else if (this.isEnemy && this.position.y <= 0) {
                this.delete();
            }
            if (!this.isDelete) {
                window.requestAnimationFrame(move);
            }
        };
        window.requestAnimationFrame(move);
    }
    
}

export {Unit}