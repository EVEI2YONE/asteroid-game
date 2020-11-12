class Ship extends Projectile {
    constructor(x, y, size, speed, angle) {
        super(x, y, size, speed, angle)
    }
    //draw triangle based on vector
    draw() {
        let x = this.x
        let y = this.y
        let rot = this.angle
        let d = this.size;
        angleMode(DEGREES)
        let shape = 145
        let x1 = x + d*cos(rot)
        let y1 = y + d*sin(rot)
        let x2 = x + d*cos(rot+shape)
        let y2 = y + d*sin(rot+shape)
        let x3 = x + d*cos(rot-shape)
        let y3 = y + d*sin(rot-shape)
        triangle(x1, y1, x2, y2, x3, y3)
    }

    shoot() {
        let laserSize = 5
        //end of the ship
        let x1 = this.x + laserSize*cos(rot)
        let y1 = this.y + laserSize*sin(rot)
        //create a new laster with increased speed
        return new Laser(x1, y1, laserSize, this.speed*1.5, this.angle)
    }

    collides(asteroid) {
        let x = this.x
        let y = this.y
        let rot = this.angle
        let d = this.size;
        angleMode(DEGREES)
        let shape = 145
        let x1 = x + d*cos(rot)
        let y1 = y + d*sin(rot)
        let x2 = x + d*cos(rot+shape)
        let y2 = y + d*sin(rot+shape)
        let x3 = x + d*cos(rot-shape)
        let y3 = y + d*sin(rot-shape)
        if(asteroid.distance(x1, y1) < asteroid.size/2) {
            return true
        }
        else if(asteroid.distance(x2, y2) < asteroid.size/2) {
            return true
        }
        else if(asteroid.distance(x3, y3) < asteroid.size/2) {
            return true
        }
        else
            return false
    }

    getTargets(asteroids, distance, vision) {
        let list = []
        for(let i = 0; i < asteroids.length; i++) {
            let asteroid = asteroids[i]
            let x = 20
            let y = 25
            let d = mag(this.x-asteroid.x, this.y-asteroid.y)
            if(d < distance) {
                angleMode(DEGREES)
                let relative = atan2(asteroid.y-this.y, asteroid.x-this.x)
                //360-range+ship.angle, range+ship.angle
                let v = 30
                line(ship.x, ship.y, ship.x+cos(relative)*v, ship.y+sin(relative)*v)
                if(this.inRange(relative, vision)) {
                    ellipse(asteroid.x, asteroid.y, 2)
                    list.push(asteroid)
                }
            }
        }
        return list
    }

    inRange(relative, vision) {
        let start = this.angle-vision
        let end = start+vision*2
        if(start <= relative && relative <= end)
            return true
        return false
    }

    drawFOV(fovRange, fov) {
        let start = this.angle-fov
        let end = start+fov*2
        let distance = 150
        noFill()
        arc(this.x, this.y, fovRange*2, fovRange*2, start, end, PIE)
        fill(255)
    }
}