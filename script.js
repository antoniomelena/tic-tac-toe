const gameBoard = (() => {
  const playerX = "X";
  const playerO = "O";
  let currentPlayer = playerX;

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
      board[index] = currentPlayer;
      e.target.innerText = currentPlayer;
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }
  }

  squares.forEach((square) => {
    square.addEventListener("click", clickedBox);
  });
})();
