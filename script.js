const Player = (name, symbol) => ({ name, symbol });

const GameBoard = (() => {
  const board = new Array(9).fill(undefined);

  const setDiv = (index, symbol) => {
    if (index >= board.length) return;
    board[index] = symbol;
  };

  const getDiv = (index) => {
    if (index >= board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i += 1) {
      board[i] = undefined;
    }
  };

  return { setDiv, getDiv, reset, board };
})();

const Game = (() => {
  const popUp = document.querySelector(".bg-modal");
  const inputs = document.querySelectorAll("input");
  const winnerText = document.getElementById("winnerText");
  const squares = document.querySelectorAll(".boardDiv");
  const resetButton = document.getElementById("reset");
  let playerOne;
  let playerTwo;
  let currentPlayer;
  let endGame = false;
  const list = new Array(9).fill(undefined);

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

  const updateGameboard = () => {
    for (let i = 0; i < squares.length; i++) {
      if (GameBoard.getDiv(i) === undefined) {
        squares[i].innerText = "";
      } else {
        squares[i].innerText = GameBoard.getDiv(i);
      }
    }
  };

  resetButton.addEventListener("click", () => {
    GameBoard.reset();
    for (let i = 0; i < list.length; i += 1) {
      list[i] = undefined;
    }
    currentPlayer = playerOne;
    updateGameboard();
    winnerText.innerText = "";
    endGame = false;
  });

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

  function clickedBox(e) {
    const squareArray = Array.from(squares);
    const index = squareArray.indexOf(e.target);

    if (
      e.target.textContent === "" &&
      endGame === false &&
      list[index] === undefined
    ) {
      e.target.innerText = currentPlayer.symbol;
      GameBoard.setDiv(index, currentPlayer.symbol);
      updateGameboard();

      if (currentPlayer === playerOne) {
        list[index] = 1;
      } else if (currentPlayer === playerTwo) {
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
