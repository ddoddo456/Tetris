document.addEventListener("keydown", control, false);

function control(e) {
  switch (e.which) {
    case 32: // SpaceBar
      for (let i = 0; i < board.length; i++) {
        work(A, 0, 1);
      }
      A.done(blockArray[0]);
      A.draw(blockArray[0]);
      drawSubBoard();
      break;
    case 37:    //left arrow key
      work(A, -1, 0);
      break;
    case 38:    //top arrow key
      if (A.rotateCheck(blockArray[0]) == 0) {
        A.rotate(blockArray[0]);
        A.collision(blockArray[0], 0);
        A.delete(blockArray[0]);
        A.draw(blockArray[0]);
      }
      break;
    case 39:    //right arrow key
      work(A, 1, 0);

      break;
    case 40:    //bottom arrow key
      work(A, 0, 1);
      break;

    case 65:    //A key
      console.log();
      break;

  }
}