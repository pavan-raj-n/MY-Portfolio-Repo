// ==========================
// HAMBURGER MENU
// ==========================
const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// ==========================
// SEND MESSAGE TO BACKEND
// ==========================
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, phone, message }),
        });

        const data = await response.json();
        document.getElementById("responseMsg").innerText = data.message;

        document.getElementById("contactForm").reset();
        loadMessages();
    } catch (error) {
        console.error(error);
    }
});

// ==========================
// LOAD MESSAGES
// ==========================
async function loadMessages() {
    const response = await fetch("/messages");
    const messages = await response.json();

    const messageList = document.getElementById("messageList");
    messageList.innerHTML = "";

    messages.forEach(msg => {
        const div = document.createElement("div");
        div.style.background = "#f2f2f2";
        div.style.margin = "10px";
        div.style.padding = "15px";
        div.style.borderRadius = "8px";

        div.innerHTML = `
            <h3>${msg.name}</h3>
            <p><strong>Email:</strong> ${msg.email}</p>
            <p><strong>Phone:</strong> ${msg.phone || "N/A"}</p>
            <p>${msg.message}</p>
        `;

        messageList.appendChild(div);
    });
}

loadMessages();
// ==========================
// PARTICLE BACKGROUND
// ==========================

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;
    }

    draw() {
        ctx.fillStyle = "#00f7ff";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#00f7ff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener("mousemove", function (e) {
    for (let i = 0; i < 5; i++) {
        particlesArray.push(
            new Particle(
                e.x,
                e.y,
                Math.random() * 5,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            )
        );
    }
});

animateParticles();

// ==========================
// RESPONSIVE CANVAS
// ==========================
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Create floating spores
function createSpore(){
    const spore = document.createElement("div");
    spore.classList.add("spore");
    spore.style.left = Math.random() * window.innerWidth + "px";
    spore.style.animationDuration = (Math.random() * 5 + 5) + "s";
    document.body.appendChild(spore);

    setTimeout(()=>{
        spore.remove();
    },10000);
}

setInterval(createSpore,300);
