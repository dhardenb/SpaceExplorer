// app.js

var mainCanvas = document.getElementById("myCanvas");
 
var circles = new Array();
         
var requestAnimationFrame = window.requestAnimationFrame || 
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

var screenWidth = window.innerWidth - 20;
var screenHeight = window.innerHeight - 20;

var mainContext = mainCanvas.getContext('2d');

var numberOfCircles = 100;

mainContext.canvas.width  = screenWidth;
mainContext.canvas.height = screenHeight;
 
 
function Circle(radius, speed, width, xPos, yPos) {
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.opacity = .05 + Math.random() * .5;

    this.counter = 0;

    var signHelper = Math.floor(Math.random() * 2);

    if (signHelper == 1) {
        this.sign = -1;
    } else {
        this.sign = 1;
    }
}
 
Circle.prototype.update = function () {

    this.counter += this.sign * this.speed;

    mainContext.beginPath();
     
    mainContext.arc(this.xPos + Math.cos(this.counter / 100) * this.radius, 
                    this.yPos + Math.sin(this.counter / 100) * this.radius, 
                    this.width, 
                    0, 
                    Math.PI * 2,
                    false);
                     
    mainContext.closePath();

    mainContext.fillStyle = 'rgba(185, 211, 238,' + this.opacity + ')';
    mainContext.fill();
};
 
function createCircles() {
    for (var i = 0; i < numberOfCircles; i++) {
        var randomX = Math.round(Math.random() * screenWidth);
        var randomY = Math.round(Math.random() * screenHeight);
        var speed = .2 + Math.random() * 3;
        var size = 5 + Math.random() * 100;

        var circle = new Circle(100, speed, size, randomX, randomY);
        circles.push(circle);
    }
}
 
function draw() {
    mainContext.clearRect(0, 0, screenWidth, screenHeight);

    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        myCircle.update();
    }
    requestAnimationFrame(draw);
}

function init() {
    createCircles();
    draw();
}