class Laser extends Projectile {
    constructor(x, y, size, speed, angle, type) {
        super(x, y, size, speed, angle)
        this.target;
        this.type = type
        this.damage
        this.stroke
        this.setup()
    }

    draw() {
        let x1 = this.x + cos(this.angle)*this.size
        let y1 = this.y + sin(this.angle)*this.size
        strokeWeight(this.stroke)
        stroke(255)
        line(this.x, this.y, x1, y1)
        strokeWeight(1)
        stroke(0)
    }

    setTarget(target) {
        this.target = target
    }

    track() {
        if(this.target == null) return
        if(this.target.health <= 0) return
        angleMode(DEGREES)
        let dx = this.target.x-this.x
        let dy = this.target.y-this.y
        //angle was from Q1 to Q2 from 0 to -180
        let a = atan2(dy, dx)
        a = this.normalizeAngle(a)
        //had to convert to 360 degrees and use modulus for angle change
        a -= this.angle
        a %= 360
        this.angle += a/abs(a)*2
    }

    detonate(lasers, asteroids) {
        if(this.type == 'laser') return false
        let targets
        let blastRadius = 60
        if(this.target != null)  {
            if(mag(this.x-this.target.x, this.y-this.target.y) > this.target.size) {
                return false;
            }
        }
        targets = this.getTargets(asteroids, blastRadius, 360)
        if(targets.length == 0) return false
        for(let i = 0; i < targets.length; i++) {
            targets[i].health -= this.damage
        }

        let lim = 3
        for(let i = 0; i < lim; i++) {
            let burstAngle = 90
            let offset = burstAngle * (random() - 1/2)
            let temp = new Laser(this.x, this.y, this.size, this.speed*.7, this.angle+offset, 'laser')
            if(this.target != null && this.target.health > 0)
                temp.setTarget(this.target)
            else
                temp.setTarget(targets[0])
            lasers.push(temp)
        }
        return true
    }

    setup(){ 
        if(this.type == 'laser'){
            this.stroke = 2
            this.damage = 6
        }
        else if(this.type == 'missile') {
            this.stroke = 4
            this.damage = 15
        }
    }
}