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
        let padding = 15
        let xLeft = 0-padding
        let xRight = w+padding
        let yTop = 0-padding
        let yBottom = h+padding
        let x = this.x
        let y = this.y
        let changed = false
        if(x < xLeft) {
            this.x = xRight
            changed = true
        }
        else if(x > xRight) {
            this.x = xLeft
            changed = true
        }
        if(y < yTop) {
            this.y = yBottom
            changed = true
        }
        else if(y > yBottom) {
            this.y = yTop
            changed = true
        }
        return changed
    }

    collides(other) {

    }
}