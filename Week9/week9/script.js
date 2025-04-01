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
var titleSize = 20;
var growing = true;
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
  if (headGrowing) {
    headSize += 1;
    if (headSize >= 120) headGrowing = false;
  } else {
    headSize -= 1;
    if (headSize <= 100) headGrowing = true;
  }
  textSize(titleSize);
  textAlign(CENTER);
  fill(0);
  text("Bailey Chapman Portrait - MART 120", width / 2, 50);
  if (growing) {
    titleSize += 1;
    if (titleSize >= 30) growing = false;
  } else {
    titleSize -= 1;
    if (titleSize <= 20) growing = true;
  }
  textSize(20);
  text("Bailey Chapman", nameX, nameY);
  moveName();
}
function moveName() {
  switch (nameStep) {
    case 0: nameX += 2; if (nameX >= 600) nameStep = 1; break;
    case 1: nameY += 2; if (nameY >= 450) nameStep = 2; break;
    case 2: nameX -= 2; if (nameX <= 200) nameStep = 3; break;
    case 3: nameY -= 2; if (nameY <= 300) nameStep = 0; break;
  }
}
function changeColor() {
  redColor = Math.floor(Math.random() * 255);
  greenColor = Math.floor(Math.random() * 255);
  blueColor = Math.floor(Math.random() * 255);
}