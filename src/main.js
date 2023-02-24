var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

gameOver = false;

// Make the canvas for game

pixel_count = 20;
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

for (let x = 0; x < pixel_count; x++) {
    for (let y = 0; y < pixel_count; y++) {
        if ((x + y) % 2) {
            ctx.fillStyle = "black";
            ctx.fillRect(x * pixel_size, y * pixel_size, pixel_size, pixel_size);
            ctx.fillStyle = "white";
            ctx.fillText(pixels[x][y], x * pixel_size + 10, y * pixel_size + 20);
            ctx.lineWidth = 2;
            ctx.strokeStyle="#FF0000";
            ctx.strokeRect(x * pixel_size, y * pixel_size, pixel_size, pixel_size);
        } else {
            ctx.fillStyle = "white";
            ctx.fillRect(x * pixel_size, y * pixel_size, pixel_size, pixel_size);
            ctx.fillStyle = "black";
            ctx.fillText(pixels[x][y], x * pixel_size + 10, y * pixel_size + 20);
            ctx.lineWidth = 2;
            ctx.strokeStyle="#FF0000";
            ctx.strokeRect(x * pixel_size, y * pixel_size, pixel_size, pixel_size);
        }
    }
}


// Create a snake

default_length = 3;

var clearCanvas = function () {
    setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.moveTo();
    }, 0);
}    

var snake = {
    x: 0,
    y: 0,
    xSpeed: 0,
    ySpeed: 0,
    total: 0,
    tail: [],
    tailLenght: default_length,
    color: "red",
    direction: "D", // D = Down, U = Up, L = Left, R = Right
    draw: function (snakeX, snakeY) {
        this.x = snakeX;
        this.y = snakeY;
        ctx.fillStyle = this.color;
        for (let i = 0; i < this.tailLenght; i++) {
            if(this.direction == "R"){
                ctx.fillRect((snakeX + i) * pixel_size, snakeY * pixel_size, pixel_size, pixel_size);
            } else if (this.direction == "L"){
                ctx.fillRect((snakeX - i) * pixel_size, snakeY * pixel_size, pixel_size, pixel_size);
            } else if (this.direction == "U"){
                ctx.fillRect(snakeX * pixel_size, (snakeY - i) * pixel_size, pixel_size, pixel_size);
            } else if (this.direction == "D"){
                ctx.fillRect(snakeX * pixel_size, (snakeY + i) * pixel_size, pixel_size, pixel_size);
            }
        }
    },
    moveToY: function () {
        if (this.direction == "U") {
            snake.clear();
            this.y -= 1;
            snake.draw(this.x, this.y);
        } else if (this.direction == "D") {
            snake.clear();
            this.y += 1;
            snake.draw(this.x, this.y);
        }
    },
    moveToX: function () {
        if (this.direction == "L") {
            snake.clear();
            this.x -= 1;
            snake.draw(this.x, this.y);
        } else if (this.direction == "R") {
            snake.clear();
            this.x += 1;
            snake.draw(this.x, this.y);
        }
    },
    clear: function () {
        if (this.direction == "R"){
            for (let i = 0; i < this.tailLenght; i++) {
                ctx.clearRect((this.x + i) * pixel_size, this.y * pixel_size, pixel_size, pixel_size);
            }
        } else if (this.direction == "L"){
            for (let i = 0; i < this.tailLenght; i++) {
                ctx.clearRect((this.x - i) * pixel_size, this.y * pixel_size, pixel_size, pixel_size);
            }
        } else if (this.direction == "U"){
            for (let i = 0; i < this.tailLenght; i++) {
                ctx.clearRect(this.x * pixel_size, (this.y - i) * pixel_size, pixel_size, pixel_size);
            }
        } else if (this.direction == "D"){
            for (let i = 0; i < this.tailLenght; i++) {
                ctx.clearRect(this.x * pixel_size, (this.y + i) * pixel_size, pixel_size, pixel_size);
            }
        }
    },
}

snake.x = pixel_size + 1;
snake.y = pixel_size + 1;
snake.xSpeed = 1;
snake.ySpeed = 1;
snake.direction = "D";
snake.draw(1,1);

test = document.addEventListener("keydown", keyDown);

function keyDown(event) {
    switch (event.keyCode) {
        //case "KeyS":
        case 40:
            snake.direction = "D";
            break;
        //case "KeyW":
        case 38:
            snake.direction = "U";
            break;
        //case "KeyA":
        case 37:
            snake.direction = "L";
            break;
        //case "KeyD":
        case 39:
            snake.direction = "R";
            break;     
        default:
            break;
    }
}

for (let i = 0; i < 100; i++) {
    setTimeout(function () {
        snake.moveToY();
    }, 1000 * i);
}