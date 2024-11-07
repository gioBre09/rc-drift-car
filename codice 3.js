// Configurazione canvas e contesto
const canvas = document.getElementById('track');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Proprietà della macchina
let car = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    speed: 0,
    maxSpeed: 5,
    driftFactor: 0.05,
    friction: 0.97
};

// Event listener per i controlli
let keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// Funzione di aggiornamento della posizione
function updateCar() {
    // Sterzata e drift
    if (keys["ArrowLeft"]) car.angle -= 0.05;
    if (keys["ArrowRight"]) car.angle += 0.05;
    
    // Accelerazione e frenata
    if (keys["ArrowUp"]) car.speed = Math.min(car.speed + 0.1, car.maxSpeed);
    if (keys["ArrowDown"]) car.speed = Math.max(car.speed - 0.1, -car.maxSpeed / 2);

    // Calcolo del drift
    car.speed *= car.friction;
    const driftX = Math.sin(car.angle) * car.speed * car.driftFactor;
    const driftY = -Math.cos(car.angle) * car.speed * car.driftFactor;
    car.x += Math.sin(car.angle) * car.speed + driftX;
    car.y -= Math.cos(car.angle) * car.speed + driftY;

    // Bordo del canvas
    car.x = Math.max(0, Math.min(canvas.width, car.x));
    car.y = Math.max(0, Math.min(canvas.height, car.y));
}

// Funzione di disegno della macchina
function drawCar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);
    ctx.fillStyle = 'red';
    ctx.fillRect(-15, -10, 30, 20); // Corpo della macchina
    ctx.restore();
}

// Ciclo di animazione
function animate() {
    updateCar();
    drawCar();
    requestAnimationFrame(animate);
}

// Avvia l'animazione
animate();
