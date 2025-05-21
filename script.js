
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dino = { x: 50, y: 200, width: 40, height: 40, vy: 0, jumping: false };
let gravity = 1.5;
let ground = 240;
let obstacles = [];
let score = 0;

document.addEventListener("keydown", function(e) {
    if (e.code === "Space" && !dino.jumping) {
        dino.vy = -20;
        dino.jumping = true;
    }
});

function spawnObstacle() {
    obstacles.push({
        x: canvas.width,
        width: 30 + Math.random() * 20,
        height: 30 + Math.random() * 40
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dino
    dino.y += dino.vy;
    dino.vy += gravity;
    if (dino.y > ground) {
        dino.y = ground;
        dino.jumping = false;
    }
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // Obstacles
    ctx.fillStyle = 'red';
    for (let i = 0; i < obstacles.length; i++) {
        let ob = obstacles[i];
        ob.x -= 6;
        ctx.fillRect(ob.x, ground + 10 - ob.height, ob.width, ob.height);

        // Collision
        if (
            dino.x < ob.x + ob.width &&
            dino.x + dino.width > ob.x &&
            dino.y + dino.height > ground + 10 - ob.height
        ) {
            alert("Game Over! Score: " + score);
            document.location.reload();
        }
    }

    // Score
    score++;
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText("Score: " + score, 10, 30);

    // Remove off-screen obstacles
    if (obstacles.length > 0 && obstacles[0].x + obstacles[0].width < 0) {
        obstacles.shift();
    }

    if (Math.random() < 0.02) spawnObstacle();

    requestAnimationFrame(draw);
}

draw();
