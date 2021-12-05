for (let i = 0; i < 18; i++) {
  for (let j = 0; j < 18; j++) {
    board[i][j] = new Block(50 * j, 50 * i);
  }
  board[i][0].draw(color[7]);
  board[i][0].boolean = true;
  board[i][11].draw(color[7]);
  board[i][11].boolean = true;
}
for (let i = 1; i < 12; i++) {
  board[17][i].draw(color[7]);
  board[17][i].boolean = true;
}
for (let i = 0; i < 4; i++) {
  blockArray[i] = form[getRandom()];
  blockColorArray[i] = color[getRandom()];
}
for (let k = 0; k < 3; k++) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      subBoard[k][i][j] = new subBlock(50 * j, 50 * i, canvasArray[k + 1], k + 1);
    }
  }
}
A.init(blockArray[0]);