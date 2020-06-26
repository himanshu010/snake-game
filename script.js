var start = document.getElementById("start");
var reset = document.getElementById("reset");

function init() {
  canvas = document.getElementById("mycanvas");
  W = H = canvas.width = canvas.height = 1000;
  pen = canvas.getContext("2d");
  cs = 66;
  game_over = false;
  score = 5;
  var up = document.getElementById("up");
  var left = document.getElementById("left");
  var right = document.getElementById("right");
  var down = document.getElementById("down");

  //Create a Image Object for food
  food_img = new Image();
  food_img.src = "Assets/apple.png";

  trophy = new Image();
  trophy.src = "Assets/trophy.png";

  food = getRandomFood();

  snake = {
    init_len: 5,
    color: "red",
    cells: [],
    cells_temp: [],
    direction: "right",

    createSnake: function () {
      for (var i = this.init_len; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
        this.cells_temp.push({ x: i, y: 0 });
      }
    },
    drawSnake: function () {
      var gradient1 = pen.createLinearGradient(50, 10, 700, 10);
      gradient1.addColorStop(0, "darkred");
      gradient1.addColorStop(1, "rgba(20, 00, 205, 0.8)");
      pen.fillStyle = gradient1;
      for (var i = 0; i < this.cells.length; i++) {
        pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs, cs);
      }
    },

    updateSnake: function () {
      //console.log("updating snake according to the direction property");
      //check if the snake has eaten food, increase the length of the snake and
      //generate new food object
      var headX = this.cells[0].x;
      var headY = this.cells[0].y;

      if (headX == food.x && headY == food.y) {
        console.log("Food eaten");
        food = getRandomFood();
        score++;
      } else {
        this.cells.pop();
      }

      var nextX, nextY;

      if (this.direction == "right") {
        nextX = headX + 1;
        nextY = headY;
      } else if (this.direction == "left") {
        nextX = headX - 1;
        nextY = headY;
      } else if (this.direction == "down") {
        nextX = headX;
        nextY = headY + 1;
      } else {
        nextX = headX;
        nextY = headY - 1;
      }

      this.cells.unshift({ x: nextX, y: nextY });

      /*Write a Logic that prevents snake from going out*/
      var last_x = Math.round(W / cs);
      var last_y = Math.round(H / cs);

      if (
        this.cells[0].y < 0 ||
        this.cells[0].x < 0 ||
        this.cells[0].x > last_x ||
        this.cells[0].y > last_y
      ) {
        game_over = true;
      }

      var f = this.cells[0].x;
      var k = this.cells[0].y;

      for (var i = 1; i < this.cells.length; i++) {
        if (f == this.cells[i].x && k == this.cells[i].y) {
          console.log("game over");
          game_over = true;
          return;
        }
      }
    },
  };

  snake.createSnake();
  //Add a Event Listener on the Document Object
  function keyPressed(e) {
    if (e.key == "ArrowRight" && snake.direction !== "left") {
      snake.direction = "right";
    } else if (e.key == "ArrowLeft" && snake.direction !== "right") {
      snake.direction = "left";
    } else if (e.key == "ArrowDown" && snake.direction !== "up") {
      snake.direction = "down";
    } else if (e.key == "ArrowUp" && snake.direction !== "down") {
      snake.direction = "up";
    }
  }

  document.addEventListener("keydown", keyPressed);
  up.onclick = function () {
    if (snake.direction !== "down") {
      snake.direction = "up";
    }
  };
  left.onclick = function () {
    if (snake.direction !== "right") {
      snake.direction = "left";
    }
  };
  right.onclick = function () {
    if (snake.direction !== "left") {
      snake.direction = "right";
    }
  };
  down.onclick = function () {
    if (snake.direction !== "up") {
      snake.direction = "down";
    }
  };
}

function draw() {
  //console.log("In Draw");

  //erase the old frame
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();

  pen.fillStyle = food.color;
  pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);

  pen.drawImage(trophy, 18, 20, cs, cs);
  pen.fillStyle = "blue";
  pen.font = "20px Roboto";
  pen.fillText(score, 50, 50);
}

function update() {
  //console.log("In Update");
  snake.updateSnake();
}

function getRandomFood() {
  var foodX = Math.round((Math.random() * (W - cs)) / cs);
  var foodY = Math.round((Math.random() * (H - cs)) / cs);

  var food = {
    x: foodX,
    y: foodY,
    color: "red",
  };
  return food;
}
// start1.onclick = function () {
//   var f = setInterval(gameloop, 100);
// };
var go = document.getElementById("gameover");
go.style.display = "none";
function gameloop() {
  if (game_over == true) {
    clearInterval(gameloop);
    // game_over_true();
    go.style.display = "block";
    reset.style.display = "block";
    return;
  }
  draw();
  update();
}
reset.style.display = "none";
reset.onclick = function () {
  init();
  go.style.display = "none";
  reset.style.display = "none";
};
init();
start.onclick = function () {
  // init();
  var f = setInterval(gameloop, 100);
  start.style.display = "none";
};

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

var animateButton = function (e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");

  e.target.classList.add("animate");
  setTimeout(function () {
    e.target.classList.remove("animate");
  }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener("click", animateButton, false);
}
