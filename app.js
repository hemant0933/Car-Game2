let score = document.querySelector(".score");
let gameScreen = document.querySelector(".gameScreen");
let startScreen = document.querySelector(".startScreen");

startScreen.addEventListener("click", startGame);

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

let controls = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

let player = {
  speed: 3, // 5px per sec
  score: 0,
  start: false,
};

function moveLines() {
  let line = document.querySelectorAll(".line");
  line.forEach(function (item) {
    if (item.y >= 700) {
      item.y -= 750;
    }
    item.y = item.y + player.speed;
    item.style.top = item.y + "px";
  });
}
function endGame() {
  player.start = false;
  gameScreen.classList.add("hide");
  startScreen.classList.remove("hide");
}
function moveCars(car) {
  let enemy = document.querySelectorAll(".enemy");

//   car = car.getBoundingClientRect();
  enemy.forEach(function (item) {
    // check if player car collides

    other = item.getBoundingClientRect();
    // if player car bottm hits other car top
    // if player car top hits ,or car left hits, or the player car right hits other car
    if (
      (!(car.bottom < other.top) ||
      (car.top > other.bottom) ||
      (car.left > other.right) ||
      (car.right < other.left)
    )) {
      //    stop driving
        player.start = false;
    }
    if (item.y >= 750) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y = item.y + player.speed;
    item.style.top = item.y + "px";
  });
}
function start() {
  console.log("Car");

  let car = document.querySelector(".car");
  let road = gameScreen.getBoundingClientRect();
  // console.log('road area' ,road)

  // let carRect = car.getBoundingClientRect();
  // move the car
  // console.log(player.x, player.y, player.speed)
  if (player.start) {
    if (controls.ArrowUp && player.x > (road.top > 80)) {
      player.x -= player.speed;
    }
    if (controls.ArrowDown && player.x < road.bottom - 120) {
      player.x += player.speed;
    }
    if (controls.ArrowLeft && player.y > 0) {
      player.y -= player.speed;
    }
    if (controls.ArrowRight && player.y < road.width - 75) {
      player.y += player.speed;
    }

    moveLines();
    // moveCars()
    moveCars(car);
    car.style.top = player.x + "px";
    car.style.left = player.y + "px";
    player.score = player.score + 1;
    score.innerHTML = player.score
    requestAnimationFrame(start);
  }
}

function keyPressed(e) {
  console.log("Pressed", e.key);
  if (controls[e.key] == false) {
    controls[e.key] = true;
    //   console.log(controls);
  }
}

function keyReleased(e) {
  console.log("Released", e.key);
  if (controls[e.key] == true) {
    controls[e.key] = false;
    // console.log(controls);
  }
}

// startScreen.classList.add('hide');
function startGame() {
  console.log("Clicked");

  player.start = true; // 1nd
  player.score = 0;
  // add or remove a calss from certain element
  //  console.log(startScreen.classList)
  startScreen.classList.add("hide");
  gameScreen.classList.remove("hide");

  // create a car
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameScreen.appendChild(car);

  //  white line

  for (let i = 0; i < 5; i++) {
    let line = document.createElement("div");

    line.setAttribute("class", "line");
    line.y = i * 150;
    line.style.top = line.y + "px";
    gameScreen.appendChild(line);
  }

  // other vehclies
  for (let j = 0; j < 2; j++) {
    let enemy = document.createElement("div");
    enemy.setAttribute("class", "enemy");
    enemy.y = (j + 1) * 300 * -1;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = Math.floor(Math.random() * 300) + "px";
    // roadwidth=450 , enemy car width = 50
    enemy.style.backgroundColor = randomColor();

    function randomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    gameScreen.appendChild(enemy);
  }
  player.y = car.offsetLeft;
  player.x = car.offsetTop;

  requestAnimationFrame(start);
}
