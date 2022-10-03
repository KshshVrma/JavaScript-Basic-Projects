function startOver() {
  //snake game
  //author innocent chidera shammah

  //get canvas element
  let canvasEle = document.getElementById('canvas');
  //get context
  let ctx = canvasEle.getContext('2d');
  let canvasWidth = canvasEle.width;
  let CanvasHeight = canvasEle.height;
  let heightOfBoxes = 20;
  let numberOfBoxes = canvasWidth / heightOfBoxes;

  /*

 PRESENTATION SECTION

*/
  //function which controls the presentation of the borders around the gaming area
  let drawBorders = () => {
    ctx.fillStyle = 'grey';
    // i'd love to give the gaming area this structure

    // ======================
    // |                     |
    // |                     |
    // |                     |
    // |                     |
    // |=====================|

    ctx.fillRect(0, 0, heightOfBoxes, CanvasHeight);
    ctx.fillRect(0, 0, canvasWidth, heightOfBoxes);
    ctx.fillRect(canvasWidth - heightOfBoxes, 0, heightOfBoxes, CanvasHeight);
    ctx.fillRect(0, CanvasHeight - heightOfBoxes, canvasWidth, heightOfBoxes);
  };
  let score = 0;
  //function which controls what happens when the game ends.
  let endGame = () => {
    clearInterval(shammah);
    ctx.fillStyle = 'black';
    ctx.font = '80px courier';
    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvasWidth / 2, CanvasHeight / 2);
    ctx.fillStyle = 'green';
    ctx.font = '40px courier';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('score:' + score, canvasWidth / 2, CanvasHeight / 2 + 50);
    ctx.fillStyle = 'black';
    ctx.font = '25px courier';
    ctx.fillText('codewarsfx', canvasWidth - 100, CanvasHeight - heightOfBoxes);
    let continueGame = confirm('Would you like to restart?');
    if (continueGame) startOver();
  };

  //function that handles th displaying of the score

  let scoreDisplay = () => {
    ctx.fillStyle = 'black';
    ctx.font = '25px monospace';
    ctx.textBaseline = 'top';
    ctx.fillText('score:' + score, heightOfBoxes + 5, heightOfBoxes + 5);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  class Box {
    constructor(row, col) {
      this.col = col;
      this.row = row;
    }
    //method for drawing a square at the given column and row
    drawSquare(color) {
      ctx.fillStyle = color;
      ctx.fillRect(
        this.col * heightOfBoxes,
        this.row * heightOfBoxes,
        heightOfBoxes,
        heightOfBoxes
      );
    }

    //method for drawing circle at the given column and row
    drawCircle() {
      ctx.beginPath();
      ctx.arc(
        this.col * heightOfBoxes + heightOfBoxes / 2,
        this.row * heightOfBoxes + heightOfBoxes / 2,
        heightOfBoxes / 2,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();
    }
    //checks if any two boxes are located at the same position on the gaming area
    checkEquality(bodyPart) {
      return this.row === bodyPart.row && this.col === bodyPart.col;
    }
  }

  //snake constructor class

  class Snake {
    constructor() {
      this.snakeSegments = [new Box(5, 8), new Box(5, 7), new Box(5, 6)];
      this.direction = 'right';
      this.newDirection = 'right';
    }
    drawSnake() {
      for (let i in this.snakeSegments) {
        if (i == 0) {
          this.snakeSegments[i].drawSquare('red');
        } else if (i % 2 == 0) this.snakeSegments[i].drawSquare('green');
        else this.snakeSegments[i].drawSquare('yellow');
      }
    }
    moveSnake() {
      let newHead;
      let head = this.snakeSegments[0];
      this.direction = this.newDirection;
      if (this.direction === 'right') {
        newHead = new Box(head.row, head.col + 1);
      }
      if (this.direction === 'left') {
        newHead = new Box(head.row, head.col - 1);
      }
      if (this.direction === 'up') {
        newHead = new Box(head.row - 1, head.col);
      }
      if (this.direction === 'down') {
        newHead = new Box(head.row + 1, head.col);
      }
      //check if new ball collides with itself or wall
      if (this.checkCollision(newHead)) {
        endGame();
        return;
      }
      this.snakeSegments.unshift(newHead);
      if (newHead.checkEquality(myApple.position)) {
        score++;
        myApple.moveApple();
      } else {
        this.snakeSegments.pop();
      }
    }
    checkCollision(bodyPart) {
      let selfCollision = false;
      let leftCollision = bodyPart.col === 0;
      let topCollision = bodyPart.row === 0;
      let rightCollision = bodyPart.col === numberOfBoxes - 1;
      let bottomColision = bodyPart.row === numberOfBoxes - 1;
      let wallCollision =
        leftCollision || rightCollision || bottomColision || topCollision;
      for (let j of this.snakeSegments) {
        if (bodyPart.checkEquality(j)) {
          selfCollision = true;
        }
      }
      return wallCollision || selfCollision;
    }
    changeDirection(newDirection) {
      if (this.direction === 'right' && newDirection === 'left') return;
      if (this.direction === 'left' && newDirection === 'right') return;
      if (this.direction === 'up' && newDirection === 'down') return;
      if (this.direction === 'down' && newDirection === 'up') return;

      this.newDirection = newDirection;
    }
  }

  class Apple {
    constructor() {
      this.position = new Box(10, 6);
    }
    drawApple() {
      this.position.drawCircle();
    }
    moveApple() {
      this.position.col = Math.floor(Math.random() * (numberOfBoxes - 15) + 4);
      this.position.row = Math.floor(Math.random() * (numberOfBoxes - 15) + 4);
      for (let i of mySnake.snakeSegments) {
        if (myApple.position.checkEquality(i)) {
          myApple.moveApple();
        } else {
          myApple.drawApple();
        }
      }
    }
  }
  let mySnake = new Snake();
  let myApple = new Apple();

  let shammah = setInterval(() => {
    ctx.clearRect(0, 0, canvasWidth, CanvasHeight);
    mySnake.moveSnake();
    mySnake.drawSnake();
    myApple.drawApple();
    scoreDisplay();

    drawBorders();
  }, 100);
  let keyControllers = {
    37: 'left',
    39: 'right',
    40: 'down',
    38: 'up',
  };

  window.addEventListener('keydown', (e) => {
    if (e.keyCode in keyControllers) {
      mySnake.changeDirection(keyControllers[`${e.keyCode}`]);
    }
  });
}
window.addEventListener('load', () => {
  startOver();
});
