var start = document.getElementById("start"),
  reset = document.getElementById("reset");
function init() {
  (canvas = document.getElementById("mycanvas")),
    (W = H = canvas.width = canvas.height = 1e3),
    (pen = canvas.getContext("2d")),
    (cs = 66),
    (game_over = !1),
    (score = 5);
  var e = document.getElementById("up"),
    t = document.getElementById("left"),
    n = document.getElementById("right"),
    o = document.getElementById("down");
  (food_img = new Image()),
    (food_img.src = "Assets/apple.png"),
    (trophy = new Image()),
    (trophy.src = "Assets/trophy.png"),
    (food = getRandomFood()),
    (snake = {
      init_len: 5,
      color: "red",
      cells: [],
      cells_temp: [],
      direction: "right",
      createSnake: function () {
        for (var e = this.init_len; e > 0; e--)
          this.cells.push({ x: e, y: 0 }), this.cells_temp.push({ x: e, y: 0 });
      },
      drawSnake: function () {
        var e = pen.createLinearGradient(50, 10, 700, 10);
        e.addColorStop(0, "darkred"),
          e.addColorStop(1, "rgba(20, 00, 205, 0.8)"),
          (pen.fillStyle = e);
        for (var t = 0; t < this.cells.length; t++)
          pen.fillRect(this.cells[t].x * cs, this.cells[t].y * cs, cs, cs);
      },
      updateSnake: function () {
        var e,
          t,
          n = this.cells[0].x,
          o = this.cells[0].y;
        n == food.x && o == food.y
          ? (console.log("Food eaten"), (food = getRandomFood()), score++)
          : this.cells.pop(),
          "right" == this.direction
            ? ((e = n + 1), (t = o))
            : "left" == this.direction
            ? ((e = n - 1), (t = o))
            : "down" == this.direction
            ? ((e = n), (t = o + 1))
            : ((e = n), (t = o - 1)),
          this.cells.unshift({ x: e, y: t });
        var s = Math.round(W / cs),
          i = Math.round(H / cs);
        (this.cells[0].y < 0 ||
          this.cells[0].x < 0 ||
          this.cells[0].x > s ||
          this.cells[0].y > i) &&
          (console.log("Boundary Touched😭😭"), (game_over = !0));
        for (
          var l = this.cells[0].x, c = this.cells[0].y, a = 1;
          a < this.cells.length;
          a++
        )
          if (l == this.cells[a].x && c == this.cells[a].y)
            return console.log("Touched Himself😭😭"), void (game_over = !0);
      },
    }),
    snake.createSnake(),
    document.addEventListener("keydown", function (e) {
      "ArrowRight" == e.key && "left" !== snake.direction
        ? ((snake.direction = "right"), console.log("right"))
        : "ArrowLeft" == e.key && "right" !== snake.direction
        ? ((snake.direction = "left"), console.log("left"))
        : "ArrowDown" == e.key && "up" !== snake.direction
        ? ((snake.direction = "down"), console.log("down"))
        : "ArrowUp" == e.key &&
          "down" !== snake.direction &&
          ((snake.direction = "up"), console.log("up"));
    }),
    (e.onclick = function () {
      "down" !== snake.direction && (snake.direction = "up");
    }),
    (t.onclick = function () {
      "right" !== snake.direction && (snake.direction = "left");
    }),
    (n.onclick = function () {
      "left" !== snake.direction && (snake.direction = "right");
    }),
    (o.onclick = function () {
      "up" !== snake.direction && (snake.direction = "down");
    });
}
function draw() {
  pen.clearRect(0, 0, W, H),
    snake.drawSnake(),
    (pen.fillStyle = food.color),
    pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs),
    pen.drawImage(trophy, 18, 20, cs, cs),
    (pen.fillStyle = "blue"),
    (pen.font = "20px Roboto"),
    pen.fillText(score, 50, 50);
}
function update() {
  snake.updateSnake();
}
function getRandomFood() {
  return {
    x: Math.round((Math.random() * (W - cs)) / cs),
    y: Math.round((Math.random() * (H - cs)) / cs),
    color: "red",
  };
}
var go = document.getElementById("gameover");
function gameloop() {
  if (1 == game_over)
    return (
      console.log("Game Over!!!!!"),
      clearInterval(gameloop),
      (go.style.display = "block"),
      void (reset.style.display = "block")
    );
  draw(), update();
}
(go.style.display = "none"),
  (reset.style.display = "none"),
  (reset.onclick = function () {
    console.log("restart"),
      init(),
      (go.style.display = "none"),
      (reset.style.display = "none");
  }),
  init(),
  (start.onclick = function () {
    console.log("start");
    setInterval(gameloop, 100);
    start.style.display = "none";
  });
for (
  var animateButton = function (e) {
      e.preventDefault,
        e.target.classList.remove("animate"),
        e.target.classList.add("animate"),
        setTimeout(function () {
          e.target.classList.remove("animate");
        }, 700);
    },
    bubblyButtons = document.getElementsByClassName("bubbly-button"),
    i = 0;
  i < bubblyButtons.length;
  i++
)
  bubblyButtons[i].addEventListener("click", animateButton, !1);
sbut = document.getElementById("s-but");
function switchSheet() {
  let theme = document.getElementById("theme");

  if (theme.getAttribute("href") == "light-theme.css") {
    theme.href = "dark-theme.css";
    sbut.innerHTML = "Light🌞";
  } else {
    theme.href = "light-theme.css";
    sbut.innerHTML = "Dark🌚";
  }
}
