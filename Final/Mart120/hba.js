let huck, boone;
let groundY = 500;
let gravity = 0.5;
let treats = [];
let friends = [];
let keys = {};
function setup() {
  createCanvas(800, 600);
  huck = new Dog(100, groundY, 'black', "Huck");
  boone = new Dog(150, groundY, 'blue', "Boone");
  for (let i = 0; i < 5; i++) {
    treats.push(new Bone(random(100, 700), groundY - 20));
  }
  for (let i = 0; i < 3; i++) {
    friends.push(new FriendDog(random(200, 700), groundY - 40));
  }
}
function draw() {
  background(180, 230, 255);
  fill(100, 200, 100);
  rect(0, groundY + 30, width, height - groundY);
  handleMovement();
  huck.update();
  boone.update();
  huck.display();
  boone.display();
  for (let treat of treats) {
    treat.display();
    if (!treat.collected && huck.hits(treat)) treat.collected = true;
    if (!treat.collected && boone.hits(treat)) treat.collected = true;
  }
  for (let friend of friends) {
    friend.display();
    if (!friend.met && huck.hits(friend)) friend.met = true;
    if (!friend.met && boone.hits(friend)) friend.met = true;
  }
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text("Huck and Boone's Adventure", width / 2, 40);
}
function keyPressed() {
  keys[keyCode] = true;
  if (key === ' ') {
    huck.jump();
    boone.jump();
  }
}
function keyReleased() {
  keys[keyCode] = false;
}
function handleMovement() {
  if (keys[LEFT_ARROW]) huck.move(-5);
  if (keys[RIGHT_ARROW]) huck.move(5);
  if (keys[65]) boone.move(-5);
  if (keys[68]) boone.move(5);
}
class Dog {
  constructor(x, y, type, name) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.type = type;
    this.ySpeed = 0;
    this.name = name;
  }
  move(step) {
    this.x += step;
  }
  jump() {
    if (this.y >= groundY) {
      this.ySpeed = -10;
    }
  }
  update() {
    this.y += this.ySpeed;
    this.ySpeed += gravity;
    if (this.y > groundY) {
      this.y = groundY;
      this.ySpeed = 0;
    }
  }
  display() {
    if (this.type === 'black') fill(30);
    else fill(150, 180, 255);
    ellipse(this.x, this.y, this.size + 10, this.size);
    ellipse(this.x - 15, this.y - 10, 15, 15);
    ellipse(this.x + 15, this.y - 10, 15, 15);
    fill(255);
    ellipse(this.x - 5, this.y - 5, 5, 5);
    ellipse(this.x + 5, this.y - 5, 5, 5);
    fill(255, 0, 0);
    ellipse(this.x, this.y + 10, 10, 5);
    fill(0);
    textSize(12);
    textAlign(CENTER);
    text(this.name, this.x, this.y - 35);
  }
  hits(obj) {
    return dist(this.x, this.y, obj.x, obj.y) < (this.size + obj.size) / 2;
  }
}
class Bone {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.collected = false;
  }
  display() {
    if (!this.collected) {
      fill(255, 255, 200);
      ellipse(this.x - 6, this.y, 10, 10);
      ellipse(this.x + 6, this.y, 10, 10);
      rect(this.x - 5, this.y - 3, 10, 6, 2);
    }
  }
}
class FriendDog {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.met = false;
  }
  display() {
    if (!this.met) {
      fill(100, 60, 20);
      ellipse(this.x, this.y, this.size + 5, this.size);
      ellipse(this.x - 10, this.y - 10, 12, 12);
      ellipse(this.x + 10, this.y - 10, 12, 12);
      fill(255);
      textSize(10);
      textAlign(CENTER);
      text("Friend", this.x, this.y - 25);
    }
  }
}