let canvasArray = [];
let number = 0;
let ctx = 0;
let i = 0;
let mainCanvas = document.querySelectorAll(".canvas")[0];
let A = new Control(5, 1);
mainCanvas.width = 600;
mainCanvas.height = 900;
document.querySelectorAll(".canvasWrapper").forEach(function (elem) {
  let queryCount_X = 0;
  let queryCount_Y = 0;
  for (let i = 0; i < elem.clientWidth / 50; i++) {
    elem.innerHTML += "<div class='X'></div>";
  }
  for (let i = 0; i < elem.clientHeight / 50; i++) {
    elem.innerHTML += "<div class='Y'></div>";
  }
  if (number > 0) {
    elem.style.left = 650 + "px";
    elem.style.top = (number - 1) * 250 + 150 + "px";
  }
  elem.querySelectorAll(".X").forEach(e => {
    e.style.height = elem.clientHeight + "px";
    e.style.left = 50 * queryCount_X + "px";
    queryCount_X++;
  });
  elem.querySelectorAll(".Y").forEach(e => {
    e.style.width = elem.clientWidth + "px";
    e.style.top = 50 * queryCount_Y + "px";
    queryCount_Y++;
  });
  number++;
});
document.querySelectorAll(".canvas").forEach(elem => {
  canvasArray[i] = elem.getContext("2d");
  i++;
});
ctx = canvasArray[0];
let board = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
let subBoard = [
  [
    [], [], [], []
  ], // 첫번째 서브보드가 담는 block
  [
    [], [], [], []
  ], // 두번째 서브보드가 담는 block
  [
    [], [], [], []
  ]  // 세번째 서브보드가 담는 block
];
let color = [
    /*하늘*/["00f0f0", "a7fafa", "007878", "00d8d8"],
    /*파랑*/["0000f0", "b3b3fb", "000078", "0000d8"],
    /*주황*/["f0a000", "fbe3b3", "785000", "d89000"],
    /*노랑*/["f0f000", "fbfbb3", "787800", "d8d800"],
    /*초록*/["00f000", "b3fbb3", "007800", "00d800"],
    /*보라*/["a000f0", "e3b3fb", "500078", "9000d8"],
    /*빨강*/["f00000", "fbb3b3", "780000", "d80000"],
    /*회색*/["b4b4b4", "d1d1d1", "424242", "8b8b8b"]
];
let form = [
    /*O*/[[0, 0], [1, 0], [0, 1], [1, 1]],
    /*I*/[[0, -1], [0, 0], [0, 1], [0, 2]],
    /*S*/[[0, 0], [1, 0], [-1, 1], [0, 1]],
    /*Z*/[[-1, 0], [0, 0], [0, 1], [1, 1]],
    /*T*/[[0, 0], [0, 1], [-1, 1], [1, 1],],
    /*J*/[[0, -1], [0, 0], [0, 1], [-1, 1]],
    /*L*/[[0, -1], [0, 0], [0, 1], [1, 1]]
];
let blockArray = [];
let blockColorArray = [];
let drawArray = [[-25, -25], [25, -25], [17, -17], [-17, -17]];
let Random = getRandom();
let shadowArray = [];
let score = 0;
let speed = 60;
let timer = 0;

function reverseArr(Arr) {
  let copy = [...Arr];
  let save = Arr[0];
  copy[0] = -1 * copy[1];
  copy[1] = save;
  return copy;
}
function clearSubBoard(index) {
  canvasArray[index].clearRect(0, 0, 200, 200);
}
function drawSubBoard() {
  for (let j = 0; j < 3; j++) {
    clearSubBoard(j + 1);
    for (let i = 0; i < 4; i++) {
      subBoard[j][1 + blockArray[j + 1][i][1]][1 + blockArray[j + 1][i][0]].draw();
    }
  }
}
function work(This, toX, toY) {
  if (This.check(blockArray[0], toX, toY) == 0) {
    This.collision(blockArray[0], toX);
    This.delete(blockArray[0]);
    This.x += toX;
    This.y += toY;
    This.draw(blockArray[0]);
  }
}

function getRandom() {
  let number = parseInt(Math.random() * 10);
  return (number < 7 ? number : getRandom());
}



function column(row) {
  let count = 0;
  for (let i = 1; i < 11; i++) {
    if (row[i].boolean == true) {
      count++;
    }
  }
  return count;
}



function time() {
  requestAnimationFrame(time);
  timer++;
  if (timer % speed == 0) {
    A.check(blockArray[0], 0, 1) == 0 ? down(1) : down(0);
  }

  function down(dy) {
    dy == 1 ? A.delete(blockArray[0]) : A.done(blockArray[0]);
    A.y += dy;
    A.draw(blockArray[0]);
  }
}
time();