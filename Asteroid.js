class Asteroid extends Projectile {
    constructor(x, y, size, speed, angle) {
        super(x, y, (size < 16) ? 16: size, speed, angle)
        this.xPoints = []
        this.yPoints = []
        this.generateShape()
    }

    generateShape() {
        let lim = 360
        let inc = lim/25
        for(let i = 0; i < lim; i += inc) {
            let offset = this.size/2 * (1 - random()*.3)
            let x = cos(i) * offset
            let y = sin(i) * offset
            this.xPoints.push(x)
            this.yPoints.push(y)
        }
    }

    draw() {
        strokeWeight(1)
        stroke(255)
        let lim = this.xPoints.length
        for(let i = 0; i < this.xPoints.length; i++) {
            let next = (i+1) % lim
            let x1 = this.x + this.xPoints[i]
            let y1 = this.y + this.yPoints[i]
            let x2 = this.x + this.xPoints[next]
            let y2 = this.y + this.yPoints[next]

            line(x1, y1, x2, y2);
        }
        strokeWeight(1)
        stroke(0)
    }

    move(direction) {
        let a = this.angle
        let step = this.step
        this.x += step*cos(a)
        this.y += step*sin(a)
    }

    split(asteroids, laser) {
        if(this.size < 20) return
        let size = this.size
        let speed = this.speed
        let a = this.angle
        let x1 = cos(a) * speed * size
        let y1 = sin(a) * speed * size
        let x2 = cos(laser.angle) * laser.speed * laser.size
        let y2 = sin(laser.angle) * laser.speed * laser.size
        let netX = (x2 + x1) / (size + laser.size)
        let netY = (y2 + y1) / (size + laser.size)
        let asteroid1 = this.genAsteroid(netX, netY, .4)
        let asteroid2 = this.genAsteroid(netX*(2/3), netY*(2/3), .6)
        asteroids.push(asteroid1)
        asteroids.push(asteroid2)
    }

    genAsteroid(netX, netY, multiplier) {
        let newSize = this.size*multiplier
        let x = netX
        let y = netY
        let s = Math.sqrt(x*x+y*y)
        angleMode(DEGREES)
        let a = atan2(netY, netX)
        x += this.x
        y += this.y
        return new Asteroid(x, y, newSize, s, a)
    }

    collides(other) {
        let lx1 = other.x
        let ly1 = other.y
        let lx2 = lx1 + cos(other.angle) * other.size
        let ly2 = ly1 + sin(other.angle) * other.size
        if(this.distance(lx1, ly1) < this.size) {
            return true
        }
        else if(this.distance(lx2, ly2) < this.size) {
            return true
        }
        return false
    }

    clearShape() {
        this.xPoints.length = 0
        this.yPoints.length = 0
    }

    distance(x, y) {
        let x2 = (x-this.x)
        x2 *= x2
        let y2 = (y-this.y)
        y2 *= y2
        return sqrt(x2+y2)
    }
}