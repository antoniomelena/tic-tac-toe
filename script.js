const gameBoard = (() => {
  // const _board = [
  //   ["X", "0", "X"],
  //   ["0", "X", "X"],
  //   ["0", "X", "0"],
  // ];
  const _board = ["", "", "", "", "", "", "O", "X", "O"];
  // const _board = new Array(9);
  for (let i = 0; i <= 8; i++) {
    const divContent = _board.splice(0, 1);
    const boardDiv = document.createElement("div");
    boardDiv.innerText = divContent;
    document.getElementById("boardContainer").appendChild(boardDiv);
  }

  const squares = document.querySelectorAll(".boardContainer div")
  squares.forEach(square => {
    square.addEventListener("click", clickOutcome)
  })

  function clickOutcome(e) {
    // if (!this.innerText) {
    //   this.innerText = "X";
    // } else if (this.innerText === "O" || this.innerText === "X") {
    //   return;
    // }
    const squareArray = Array.from(squares)
    const index = squareArray.indexOf(e.target)
    console.log(index)
  }
})();

const players = (() => {
  const player = (symbol) => {
    const playerSymbol = symbol;
    return playerSymbol;
  };

  const playerX = player("X");
  const playerO = player("O");
  const currentPlayer = playerX;

})();