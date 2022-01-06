
const canvas = document.querySelector("#canvas")
const c = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
}

addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})

const gravity = 0.005
const friction = 0.99

class Particle {
    constructor (x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }

    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.velocity.y += gravity
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.005

    }
}

let particles 

function init() {   
    particles = []
}   

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0, 0.05)'
    c.fillRect(0,0, canvas.width, canvas.height);

    particles = particles.filter(p => p.alpha > 0)
    particles.forEach(p => {
        p.update()
    });
}


init()  
animate()

addEventListener('click', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY

    const particlesCount = 1000
    const angleIncrement = (Math.PI * 2) / particlesCount    
    const power = 3

    console.log(mouse);
    for (let i = 0; i < particlesCount; i++) {
        particles.push(new Particle(
            mouse.x, 
            mouse.y, 
            2, 
            '#' + ((0xFFFF * Math.random() << 0).toString(16)) , 
            { 
                x: Math.cos(angleIncrement * i) * Math.random() * power, 
                y: Math.sin(angleIncrement * i) * Math.random() * power
            }
        ))
    }
})
