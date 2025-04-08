var redColor = 220;
var greenColor = 100;
var blueColor = 150;
var x1 = Math.random() * 800;
var x2 = Math.random() * 800;
var y1 = Math.random() * 600;
var y2 = Math.random() * 600;
var diagonalX = Math.random() * 800;
var diagonalY = Math.random() * 600;
var dx1 = Math.floor(Math.random() * 5) + 2;
var dx2 = Math.floor(Math.random() * 5) + 2;
var dy1 = Math.floor(Math.random() * 5) + 2;
var dy2 = Math.floor(Math.random() * 5) + 2;
var dDiagonalX = Math.floor(Math.random() * 5) + 2;
var dDiagonalY = Math.floor(Math.random() * 5) + 2;
var color1 = [255, 0, 0];
var color2 = [0, 255, 0];
var color3 = [0, 0, 255];
var color4 = [255, 255, 0];
var colorDiagonal = [0, 255, 255];
var titleSize = 20;
var titleGrowing = true;
var titleCycleCount = 0;
var maxCycles = 5;
var nameX = 200;
var nameY = 300;
var nameStep = 0;
var headSize = 100;
var headGrowing = true;
function setup() {
  createCanvas(800, 600);
}
function draw() {
  background(redColor, greenColor, blueColor);
  fill(255);
  ellipse(width / 2, height / 2, headSize, headSize);
  fill(50, 30, 20);
  ellipse(width / 2 - 20, height / 2 - 20, 10, 10);
  ellipse(width / 2 + 20, height / 2 - 20, 10, 10);
  fill(255, 0, 0);
  arc(width / 2, height / 2 + 20, 30, 15, 0, PI);
  fill(100, 100, 255);
  rect(width / 2 - 30, height / 2 + 50, 60, 100);
  fill(255);
  line(width / 2 - 30, height / 2 + 60, width / 2 - 80, height / 2 + 80);
  line(width / 2 + 30, height / 2 + 60, width / 2 + 80, height / 2 + 80);
  line(width / 2 - 10, height / 2 + 150, width / 2 - 30, height / 2 + 200);
  line(width / 2 + 10, height / 2 + 150, width / 2 + 30, height / 2 + 200);
  animateHead();
  animateTitle();
  animateShapes();
  drawShapes();
  textSize(20);
  text("Bailey Chapman", nameX, nameY);
  moveName();
}
function animateHead() {
  if (headGrowing) {
    headSize += 1;
    if (headSize >= 120) headGrowing = false;
  } else {
    headSize -= 1;
    if (headSize <= 100) headGrowing = true;
  }
}
function animateTitle() {
  textAlign(CENTER);
  fill(0);
  textSize(titleSize);
  text("Bailey Chapman Portrait - MART 120", width / 2, 50);
  if (titleGrowing) {
    titleSize += 1;
    if (titleSize >= 30) {
      titleCycleCount++;
      titleGrowing = false;
    }
  } else {
    titleSize -= 1;
    if (titleSize <= 20) {
      titleCycleCount++;
      titleGrowing = true;
    }
  }
  if (titleCycleCount >= 10) {
    titleCycleCount = 0;
  }
}
function animateShapes() {
  x1 += dx1;
  x2 += dx2;
  if (x1 <= 0 || x1 >= width) {
    dx1 *= -1;
    color1 = randomColor();
  }
  if (x2 <= 0 || x2 >= width) {
    dx2 *= -1;
    color2 = randomColor();
  }
  y1 += dy1;
  y2 += dy2;
  if (y1 <= 0 || y1 >= height) {
    dy1 *= -1;
    color3 = randomColor();
  }
  if (y2 <= 0 || y2 >= height) {
    dy2 *= -1;
    color4 = randomColor();
  }
  diagonalX += dDiagonalX;
  diagonalY += dDiagonalY;
  if (diagonalX <= 0 || diagonalX >= width) {
    dDiagonalX *= -1;
    colorDiagonal = randomColor();
  }
  if (diagonalY <= 0 || diagonalY >= height) {
    dDiagonalY *= -1;
    colorDiagonal = randomColor();
  }
}
function drawShapes() {
  noStroke();
  fill(color1);
  ellipse(x1, 100, 30, 30);
  fill(color2);
  rect(x2, 200, 30, 30);
  fill(color3);
  ellipse(100, y1, 30, 30);
  fill(color4);
  rect(200, y2, 30, 30);
  fill(colorDiagonal);
  ellipse(diagonalX, diagonalY, 40, 40);
}
function moveName() {
  switch (nameStep) {
    case 0:
      nameX += 2;
      if (nameX >= 600) nameStep = 1;
      break;
    case 1:
      nameY += 2;
      if (nameY >= 450) nameStep = 2;
      break;
    case 2:
      nameX -= 2;
      if (nameX <= 200) nameStep = 3;
      break;
    case 3:
      nameY -= 2;
      if (nameY <= 300) nameStep = 0;
      break;
  }
}
function randomColor() {
  return [random(255), random(255), random(255)];
}
