
const canvas = document.querySelector("#canvas")
const c = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})

const gravity = 0.005
const friction = 0.99

class Particle {
    constructor (x, y, radius, color, velocity, gravity, friction) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
        this.gravity = gravity
        this.friction = friction
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
        this.velocity.x *= this.friction
        this.velocity.y *= this.friction
        this.velocity.y += this.gravity
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.005
    }
}


let particles 

function init() {   
    particles = []
}   

function animateExplosition() {
    requestAnimationFrame(animateExplosition)
    
    c.fillStyle = 'rgba(10,10,10, 0.09)'
    c.fillRect(0,0, canvas.width, canvas.height);

    particles = particles.filter(p => p.alpha > 0)
    particles.forEach(p => {
        p.update()
    });
}

function animateFirework(){
    requestAnimationFrame(animateFirework)    
}


init()  
animateExplosition()

addEventListener('click', (e) => {
    const mouse = {}
    mouse.x = e.clientX
    mouse.y = e.clientY

    const particlesCount = 400
    const angleIncrement = (Math.PI * 2) / particlesCount
    const power = 3
    const color = '#' + ((0xFFFF * Math.random() << 0).toString(16));

    (() => {
        const f = new Particle(
            mouse.x, 
            mouse.y + 300, 
            2, 
            color, 
            { 
                x: 0, 
                y: -2
            },
            -0.04,
            1
        )
        
        const firework = () => {
            if (f.y >= mouse.y) {
                f.update()
                c.fillStyle = 'rgba(10,10,10, 0.0005)'
                c.fillRect(0,0, canvas.width, canvas.height);
                requestAnimationFrame(firework)
            } else {
                for (let i = 0; i < particlesCount; i++) {
                    particles.push(new Particle(
                        mouse.x, 
                        mouse.y, 
                        2, 
                        color , 
                        { 
                            x: Math.cos(angleIncrement * i) * Math.random() * power, 
                            y: Math.sin(angleIncrement * i) * Math.random() * power
                        },
                        gravity,
                        friction
                    ))
                }
            }
        }
        firework()
    })()
})
