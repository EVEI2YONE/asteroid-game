class Projectile {
    constructor(x, y, size, speed, angle) {
        this.x = x
        this.y = y
        this.size = size
        this.speed = speed
        this.angle = angle
        this.step = speed/4
    }

    draw() {

    }

    calcX(angle) {
        return this.x + this.size*cos(this.angle)
    }

    calcY(angle) {
        return this.y + this.size*sin(this.angle)
    }

    rotate(alpha) {
        this.angle += alpha
        let a = this.angle
        if(a <= 0)
            this.angle = 360 + this.angle
        else if(a >= 360)
            this.angle %= 360
        
    }

    move(direction) {
        let a = this.angle
        let step = this.step*direction
        this.x += step*cos(a)
        this.y += step*sin(a)
    }

    wrap(w, h) {
        let x = this.x
        let y = this.y
        let changed = false
        if(x < 0) {
            this.x = w
            changed = true
        }
        else if(x > w) {
            this.x = 0
            changed = true
        }
        if(y < 0) {
            this.y = h
            changed = true
        }
        else if(y > h) {
            this.y = 0
            changed = true
        }
        return changed
    }

    collides(other) {

    }
}