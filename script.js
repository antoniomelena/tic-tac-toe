const Player = (name, symbol) => {
  return { name, symbol };
};

const GameBoard = (() => {
  const playerOne = Player("Guero", "X");
  console.log(playerOne);
  const playerTwo = Player("Random", "O");
  let currentPlayer = playerOne;

  const board = new Array(9);
  for (let i = 0; i <= 8; i += 1) {
    const divContent = board.splice(0, 1);
    const boardDiv = document.createElement("div");
    boardDiv.innerText = divContent;
    document.getElementById("boardContainer").appendChild(boardDiv);
  }

  const squares = document.querySelectorAll(".boardContainer div");
  function clickedBox(e) {
    const squareArray = Array.from(squares);
    const index = squareArray.indexOf(e.target);

    if (!board[index]) {
      board[index] = currentPlayer.symbol;
      e.target.innerText = currentPlayer.symbol;
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    if (
      board[0] === playerOne.symbol &&
      board[1] === playerOne.symbol &&
      board[2] === playerOne.symbol
    ) {
      console.log("working");
    }
  }

  squares.forEach((square) => {
    square.addEventListener("click", clickedBox);
  });
})();

const Game = () => {
  function checkValidity() {
    board;
  }

  function getOccurrence(array, value) {
    var count = 0;
    array.forEach((ele) => {
      if (ele === value) {
        count += 1;
      }
    });
    return count;
  }
};
