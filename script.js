const Player = (name, symbol) => ({ name, symbol });

const game = (() => {})();

const GameBoard = (() => {
  const popUp = document.querySelector(".bg-modal");
  const inputs = document.querySelectorAll("input");
  let playerOne;
  let playerTwo;
  let currentPlayer;

  // CLOSE MODAL
  function closeModal() {
    popUp.style.display = "none";
  }

  document.querySelector(".close").addEventListener("click", closeModal);

  function clearFields() {
    inputs.forEach((input) => (input.value = ""));
  }

  function getInputValue(e) {
    e.preventDefault();

    const playerOneInputVal = document.getElementById("playerOne").value;
    const playerTwoInputVal = document.getElementById("playerTwo").value;

    playerOne = Player(`${playerOneInputVal}`, "X");
    playerTwo = Player(`${playerTwoInputVal}`, "O");
    currentPlayer = playerOne;

    clearFields();
    closeModal();
  }
  popUp.addEventListener("submit", getInputValue);

  const winnerText = document.getElementById("winnerText");
  let endGame = false;
  const list = new Array(9).fill(undefined);

  const board = new Array(9).fill(undefined);
  for (let i = 0; i <= 8; i += 1) {
    const divContent = board.splice(0, 1);
    const boardDiv = document.createElement("div");
    boardDiv.innerText = divContent;
    document.getElementById("boardContainer").appendChild(boardDiv);
  }

  const tictactoe = (list) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < win.length; i += 1) {
      const sum = list[win[i][0]] + list[win[i][1]] + list[win[i][2]];
      if (sum === 3) return "A";
      if (sum === 0) return "B";
    }
    return !list.reduce((a, b) => a - b) ? "Pending" : "Draw";
  };

  const squares = document.querySelectorAll(".boardContainer div");
  function clickedBox(e) {
    const squareArray = Array.from(squares);
    const index = squareArray.indexOf(e.target);

    if (!board[index] && endGame === false) {
      board[index] = currentPlayer.symbol;
      e.target.innerText = currentPlayer.symbol;

      if (currentPlayer.symbol === "X") {
        list[index] = 1;
      } else if (currentPlayer.symbol === "O") {
        list[index] = 0;
      }

      const gameResult = tictactoe(list);

      if (gameResult === "A" || gameResult === "B") {
        winnerText.innerText = `${currentPlayer.name} Won!`;
        endGame = true;
      } else if (gameResult === "Draw") {
        winnerText.innerText = "Draw!";
        endGame = true;
      }

      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
  }

  squares.forEach((square) => {
    square.addEventListener("click", clickedBox);
  });
})();

// function openModal() {
//   popUp.style.display = "flex";
// }
// const popUp = document.querySelector(".bg-modal");
// popUp.addEventListener("submit", getInputValue);

// const inputs = document.querySelectorAll("input");

// // CLOSE MODAL
// function closeModal() {
//   popUp.style.display = "none";
// }

// document.querySelector(".close").addEventListener("click", closeModal);

// function clearFields() {
//   inputs.forEach((input) => (input.value = ""));
// }

// function getInputValue(e) {
//   e.preventDefault();

//   const playerOneInputVal = document.getElementById("playerOne").value;
//   const playerTwoInputVal = document.getElementById("playerTwo").value;

//   const playerOne = Player(`${playerOneInputVal}`, "X");
//   const playerTwo = Player(`${playerTwoInputVal}`, "O");

//   closeModal();

//   clearFields();
// }
