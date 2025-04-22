const canvas = document.getElementById("P5Canvas");
const ctx = canvas.getContext("2d");
let player = { x: 50, y: 50, size: 20, speed: 5 };
let obstacles = [
  { x: 100, y: 100, w: 30, h: 30, c: "pink", dx: 2, dy: 1 },
  { x: 300, y: 200, w: 40, h: 40, c: "purple", dx: -1, dy: 2 }
];
let exit = { x: 550, y: 350, w: 40, h: 40 };
let keys = {};
let borders = 10;
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);
canvas.addEventListener("click", e => {
  let r = canvas.getBoundingClientRect();
  obstacles.push({
    x: e.clientX - r.left,
    y: e.clientY - r.top,
    w: Math.random() * 30 + 10,
    h: Math.random() * 30 + 10,
    c: getRandomColor(),
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2
  });
});
function movePlayer() {
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;
}
function moveObstacles() {
  for (let o of obstacles) {
    o.x += o.dx;
    o.y += o.dy;
    if (o.x > canvas.width) o.x = 0;
    if (o.x + o.w < 0) o.x = canvas.width;
    if (o.y > canvas.height) o.y = 0;
    if (o.y + o.h < 0) o.y = canvas.height;
  }
}
function background() {
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawBorders() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, borders);
  ctx.fillRect(0, canvas.height - borders, canvas.width, borders);
  ctx.fillRect(0, 0, borders, canvas.height);
  ctx.fillRect(canvas.width - borders, 0, borders, canvas.height);
}
function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
}
function drawObstacles() {
  for (let o of obstacles) {
    ctx.fillStyle = o.c;
    ctx.fillRect(o.x, o.y, o.w, o.h);
  }
}
function drawExit() {
  ctx.fillStyle = "red";
  ctx.fillRect(exit.x, exit.y, exit.w, exit.h);
}
function checkWin() {
  if (player.x > exit.x && player.x < exit.x + exit.w &&
      player.y > exit.y && player.y < exit.y + exit.h) {
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText("You Win", 230, 200);
    return true;
  }
  return false;
}
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}
function draw() {
  background();
  drawBorders();
  drawPlayer();
  drawObstacles();
  drawExit();
}
function loop() {
  movePlayer();
  moveObstacles();
  draw();
  if (!checkWin()) requestAnimationFrame(loop);
}
loop();