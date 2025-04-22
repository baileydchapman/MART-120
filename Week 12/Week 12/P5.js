const canvas = document.getElementById("P5Canvas");
const ctx = canvas.getContext("2d");
let player = { x: 50, y: 50, size: 20, speed: 5 };
let obstacles = [
  { x: 100, y: 100, w: 30, h: 30, c: "pink", dx: 2, dy: 1 },
  { x: 300, y: 200, w: 40, h: 40, c: "purple", dx: -1, dy: 2 }
];
let exit = { x: 550, y: 350, w: 40, h: 40 };
let keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);
canvas.addEventListener("click", e => {
  let r = canvas.getBoundingClientRect();
  obstacles.push({ x: e.clientX - r.left, y: e.clientY - r.top, w: 20, h: 20, c: "green", dx: 0, dy: 0 });
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
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  for (let o of obstacles) {
    ctx.fillStyle = o.c;
    ctx.fillRect(o.x, o.y, o.w, o.h);
  }
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
function loop() {
  movePlayer();
  moveObstacles();
  draw();
  if (!checkWin()) requestAnimationFrame(loop);
}
loop();