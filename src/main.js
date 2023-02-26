var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var gamePlay = document.getElementById("gamePlay");
var gameOverDiv = document.getElementById("gameOver");
var scoreText = document.getElementById("scoreText");
var score = 0;

gamePlay.classList.toggle("gamePlayShow");

if(screen.width >= 768){
    canvas.width = 600;
    canvas.height = 600;
} else {
    canvas.width = screen.width - 48;
    canvas.height = screen.width - 48;
}


// Make the canvas for game

pixel_count = 40;
pixel_size = canvas.width / pixel_count;

var pixels = new Array(pixel_count);

for (var i = 0; i < pixels.length; i++) {
    pixels[i] = new Array(pixel_count);
}

sayi = 0;
for (let i = 0; i < pixel_count; i++) {
    for (let j = 0; j < pixel_count; j++) {
        pixels[i][j] = sayi;
        sayi++;
    }
}

// Create a snake

default_length = 5;

var Snake = function () {
    this.x = 1;
    this.y = 1;
    this.moveX = 1;
    this.moveY = 0;
    this.length = default_length;
    this.body = [];
    this.color = "red";
    this.lastPart = [];
    this.draw = function () {
        for (let i = 0; i < this.body.length; i++) {
            let part = this.body[i];
            ctx.fillStyle = this.color;
            ctx.fillRect(part.x * pixel_size, part.y * pixel_size, pixel_size, pixel_size);
        }
    };
    this.move = function () {
        body = this.body;
        for (let i = 0; i < this.body.length; i++) {
            ctx.clearRect(body[i].x * pixel_size, body[i].y * pixel_size, pixel_size, pixel_size);
        }
        firstItem = {
            x: body[0].x + this.moveX,
            y: body[0].y + this.moveY
        };
        this.lastPart = {
            x: body[0].x,
            y: body[0].y
        };
        body.unshift(firstItem);
        body.pop();
    };
    this.clear = function () {
        ctx.clearRect(0,0,canvas.width, canvas.height);
    };
}

var food = {
    x: 0,
    y: 0,
    color: "green",
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * pixel_size, this.y * pixel_size, pixel_size, pixel_size);
    },
    clear: function () {
        ctx.clearRect(this.x * pixel_size, this.y * pixel_size, pixel_size, pixel_size);
    },
    random: function () {
        this.x = Math.floor(Math.random() * pixel_count);
        this.y = Math.floor(Math.random() * pixel_count);
    }
}

function writeScore() {
    scoreText.innerHTML = score;
}

function controlBorders(snakeParams){
    return snakeParams.body[0].x < 0 || snakeParams.body[0].x > pixel_count - 1 || snakeParams.body[0].y < 0 || snakeParams.body[0].y > pixel_count - 1;
}


function gameOverFunc(snakeParam) {
    snakeParam.clear();
    gameOverDiv.classList.toggle("gameOverShow");
}



function main() {
    var snake = new Snake();
    score = 0;
    for (let i = 0; i < default_length; i++) {
        snake.body.push({
            x: snake.x + i,
            y: snake.y
        });
    }
    snake.draw();
    document.addEventListener("keydown", function (e) {
        right = snake.moveX === 1 && snake.moveY === 0;
        left = snake.moveX === -1 && snake.moveY === 0;
        up = snake.moveX === 0 && snake.moveY === -1;
        down = snake.moveX === 0 && snake.moveY === 1;
        console.log(right, left, up, down);
        if (e.keyCode == 37 && !left && !right) {
            snake.moveX = -1;
            snake.moveY = 0;
        } else if (e.keyCode == 38 && !up && !down) {
            snake.moveX = 0;
            snake.moveY = -1;
        } else if (e.keyCode == 39 && !right && !left) {
            snake.moveX = 1;
            snake.moveY = 0;
        } else if (e.keyCode == 40 && !down && !up) {
            snake.moveX = 0;
            snake.moveY = 1;
        }
    });
    food.random();
    food.draw();
    if(gamePlay.classList.contains("gamePlayShow")){
        gamePlay.classList.remove("gamePlayShow");
    }
    interval = setInterval(function () {
        if (snake.body[0].x === food.x && snake.body[0].y === food.y) {
            snake.body.push(snake.lastPart);
            food.clear();
            score++;
            food.random();
            food.draw();
        }
        writeScore();
        snake.move();
        snake.draw();
        if (controlBorders(snake)){
            gameOverFunc(snake);
            clearInterval(interval);
        }
    }, 100);
    return interval;
}

function restartGame(){
    main();
    gameOverDiv.classList.remove("gameOverShow");
}