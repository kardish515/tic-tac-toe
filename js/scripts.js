//back-end logic
var winScenarios = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
]

function Player(mark){
  this.mark = mark;
  this.markedSpaces = [];
};

function Board(){
  this.spaces = [];
}

function Space(number){
  this.name = number;
  this.markedAs = "";
}

function Game(mark1, mark2){
  this.player1 = new Player(mark1);
  this.player1Spaces = [];
  this.player2Spaces = [];
  this.player2 = new Player(mark2);
  this.board = new Board();
  this.currentPlayer = Math.floor((Math.random()*2)+1);
  this.gameOver = false;
}

Space.prototype.checkForMark = function() {
  if (this.markedAs) {
    return true;
  } else {
    return false;
  }
}

Space.prototype.makeMark = function(player) {
  this.markedAs = player.mark;
}

Game.prototype.setNewBoard = function() {
  for (var i = 0; i < 9; i++) {
    newSpace = new Space(i);
    this.board.spaces.push(newSpace);
  };
}

Game.prototype.tallyMarks = function(){
  playerOneSpaces = this.board.spaces.filter(space => space.markedAs === this.player1.mark);
  playerTwoSpaces = this.board.spaces.filter(space => space.markedAs === this.player2.mark);

  this.player1Spaces = playerOneSpaces.map(space => space.name);
  this.player2Spaces = playerTwoSpaces.map(space => space.name);
}

Game.prototype.changePlayer = function() {
  if (this.currentPlayer === 1) {
    this.currentPlayer = 2;
  } else {
    this.currentPlayer = 1;
  }
}

Game.prototype.checkWin = function(){
  //Needs to be figured out
  for (var i = 0; i < 8; i++) {
    var tallyPlayerOne = 0;
    var tallyPlayerTwo = 0;

    for (j = 0; j < 3; j++) {
      if (this.player1Spaces.includes(winScenarios[i][j])){
        tallyPlayerOne += 1;
      } else if (this.player2Spaces.includes(winScenarios[i][j])) {
        tallyPlayerTwo += 1;
      }
    };
    if (tallyPlayerTwo === 3 || tallyPlayerOne === 3) {
      this.gameOver = true;
    }
  };
}

// frontend logic
$(document).ready(function(){
  $("button").click(function(){
    if (this.textContent.includes("X")) {
      newGame = new Game("X", "O");
    } else {
      newGame = new Game("O", "X");
    }
    newGame.setNewBoard();
    var gameCounter = 0;
    $("td").click(function(){
      gameCounter++;
      var currentSpace = newGame.board.spaces[this.id];

      if (currentSpace.checkForMark() === false) {
        if (newGame.currentPlayer === 1) {
          currentSpace.makeMark(newGame.player1);
          $(this).text(newGame.player1.mark);
          newGame.tallyMarks();
          newGame.checkWin();

          if (newGame.gameOver === true) {
            alert("Player One wins!")
          } else {
            newGame.changePlayer();
          }
        } else {
          currentSpace.makeMark(newGame.player2);
          $(this).text(newGame.player2.mark);
          newGame.tallyMarks();
          newGame.checkWin();

          if (newGame.gameOver === true) {
            alert("Player Two wins!")
          } else {
            newGame.changePlayer();
          }
        }
      }
      if(gameCounter === 9 && newGame.gameOver === false){
        alert("Draw!");
      }
    });
  });
});
