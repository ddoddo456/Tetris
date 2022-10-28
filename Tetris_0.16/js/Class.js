class customCanvas extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
      `
      <div class="canvasWrapper">
        <canvas class="canvas" width="200" height="200"></canvas>
      </div>
      `
      ;
  }
}
customElements.define("custom-canvas", customCanvas);

class Control {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  init(form) {
    drawSubBoard();
    this.collision(form, 0);
    this.draw(form);
  }

  draw(form) {
    for (let k = 0; k < 4; k++) {
      board[this.y + form[k][1]][this.x + form[k][0]].draw(blockColorArray[0]);
    }
  }
  rotate(form) {
    for (let i = 0; i < 4; i++) {
      form[i].reverse();
      form[i][0] *= -1;
    }
  }
  delete(form) {
    for (let i = 0; i < 4; i++) {
      board[this.y + form[i][1]][this.x + form[i][0]].delete(blockColorArray[0]);
    }
  }
  done(currentForm) {
    Random = getRandom();
    let sort = [];
    for (let i = 0; i < 4; i++) {
      sort[i] = [currentForm[i][1]];
    }
    sort.sort(function (a, b) {
      return a - b;
    });
    for (let i = 0; i < 4; i++) {
      board[this.y + currentForm[i][1]][this.x + currentForm[i][0]].crash = true;
    }
    for (let i = 0; i < 4; i++) {
      board[this.y + sort[i][0]][this.x + currentForm[i][0]].clear();
    }
    sort = [];
    this.x = 5;
    this.y = 1;
    this.defeat(currentForm);
    blockArray.shift();
    blockColorArray.shift();
    blockArray.push(form[getRandom()]);
    blockColorArray.push(color[getRandom()]);
    this.collision(blockArray[0], 0);
  }
  check(form, toX, toY) {
    let count = 0;
    for (let i = 0; i < 4; i++) {
      if (board[this.y + form[i][1] + toY][this.x + form[i][0] + toX].crash == true) {
        count++;
      }
    }
    return count;
  }
  rotateCheck(form) {
    let count = 0;
    for (let i = 0; i < 4; i++) {
      if (board[this.y + reverseArr(form[i])[1]][this.x + reverseArr(form[i])[0]].crash == true) {
        count++;
      }
    }
    return count;
  }
  defeat(form) {
    for (let i = 0; i < 4; i++) {
      if (board[this.y + form[i][1]][this.x + form[i][0]].crash == true) {
        document.getElementById("defeat").style.display = "block";
        ctx.clearRect(0, 0, 1000, 1000);
      }
    }
  }

  collision(form, dx) {
    if (this.check(form, dx, 0) == 0) {
      for (let i = 0; i < 4; i++) {
        board[this.y + form[i][1]][this.x + form[i][0] + dx].collisionCheck();
      }

      for (let i = 0; i < 18; i++) {
        for (let j = 0; j < 18; j++) {
          if (board[i][j].crash == false) {
            board[i][j].delete();
          }
        }
      }
      for (let i = 0; i < 4; i++) {
        board[this.y + Math.min(...shadowArray) - 1 + form[i][1]][this.x + form[i][0] + dx].drawShadow(blockColorArray[0]);
      }
      shadowArray = [];
    }
  }
}



class subBlock {
  constructor(x, y, canvas, index) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.index = index;
  }

  draw() {
    this.color = blockColorArray[this.index];
    this.canvas.fillStyle = "#" + this.color[0];
    this.canvas.fillRect(this.x + 8, this.y + 8, 34, 34);
    for (let j = 0; j < 4; j++) {
      this.canvas.fillStyle = "#" + this.color[j]
      this.canvas.beginPath();
      for (let i = 0; i < 4; i++) {
        this.canvas.lineTo(this.x + 25 + drawArray[i][0], this.y + 25 + drawArray[i][1]);
        drawArray[i].reverse();
        drawArray[i][0] *= -1;
      }
      this.canvas.closePath();
      this.canvas.fill();
    }
  }
}

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.crash = false;
    this.color = [];
  }
  draw(colorArray) {
    this.color = colorArray;
    ctx.fillStyle = "#" + this.color[0];
    ctx.fillRect(this.x + 8, this.y + 8, 34, 34);
    for (let j = 0; j < 4; j++) {
      ctx.fillStyle = "#" + this.color[j]
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(this.x + 25 + drawArray[i][0], this.y + 25 + drawArray[i][1]);
        drawArray[i].reverse();
        drawArray[i][0] *= -1;
      }
      ctx.closePath();
      ctx.fill();
    }
  }

  drawShadow(color) {
    ctx.beginPath();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#" + color[0];
    ctx.fillRect(this.x, this.y, 50, 50);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  delete() {
    ctx.clearRect(this.x, this.y, 50, 50);
  }
  clear() {
    if (column(board[this.y / 50]) == 10) {
      for (let i = 1; i < 11; i++) {
        board[this.y / 50][i].delete();
        board[this.y / 50][i].crash = false;
      }
      for (let i = this.y / 50; i > 1; i--) {
        for (let j = 1; j < 11; j++) {
          if (board[i][j].crash == true) {
            board[i][j].delete(this.color);
            board[i][j].crash = false;
            board[i + 1][j].draw(board[i][j].color);
            board[i + 1][j].crash = true;
          }
        }
      }
    }
  }

  defeat(form) {
    for (let i = 0; i < 4; i++) {
      if (board[this.y + form[i][1]][this.x + form[i][0]].crash == true) {
        document.getElementById("defeat").style.display = "block";
        ctx.clearRect(0, 0, 1000, 1000);
      }
    }
  }

  collisionCheck() {
    let i = 1;
    while (board[this.y / 50 + i][this.x / 50].crash == false) {
      i++;
    }
    shadowArray.push(i);
  }
}