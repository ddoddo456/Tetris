/* 보드판을 그림 */
for (let y = 0; y < 18; y++) {
  /* 블록을 생성한다 */
  for (let x = 0; x < 18; x++) {
    board[y][x] = new Block(50 * x, 50 * y);
  }

  /*  */
  board[y][0].draw(color[7]);
  board[y][0].crash = true;
  board[y][11].draw(color[7]);
  board[y][11].crash = true;
}
for (let y = 1; y < 12; y++) {
  board[17][y].draw(color[7]);
  board[17][y].crash = true;
}
for (let y = 0; y < 4; y++) {
  blockArray[y] = form[getRandom()];
  blockColorArray[y] = color[getRandom()];
}
for (let k = 0; k < 3; k++) {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      subBoard[k][y][x] = new subBlock(50 * x, 50 * y, canvasArray[k + 1], k + 1);
    }
  }
}
A.ynyt(blockArray[0]);