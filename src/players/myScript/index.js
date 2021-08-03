const LindoScript = (scenery, myMove) => {
  let points = {
    0: 10,
    1: -10,
    tie: 0,
  };

  function equals(a, b, c, d) {
    return a == b && b == c && c == d && a != undefined;
  }

  function checkWinner() {
    let winner = null;

    //horizontal verifica ganhadores
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          equals(
            scenery[i][j],
            scenery[i][j + 1],
            scenery[i][j + 2],
            scenery[i][j + 3]
          )
        ) {
          winner = +scenery[i][j];
        }
      }
    }

    //vertical verifica ganhadores
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 8; j++) {
        if (
          equals(
            scenery[i][j],
            scenery[i + 1][j],
            scenery[i + 2][j],
            scenery[i + 3][j]
          )
        ) {
          winner = +scenery[i][j];
        }
      }
    }

    //diagonal verifica ganhadores
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          equals(
            scenery[i][j],
            scenery[i + 1][j + 1],
            scenery[i + 2][j + 2],
            scenery[i + 3][j + 3]
          )
        ) {
          winner = +scenery[i][j];
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      //i = 0
      for (let j = 0; j < 4; j++) {
        // j = 1

        var test = j + i;

        if (test != 4) continue;

        if (
          equals(
            scenery[i][j], // 01
            scenery[i + 1][j + 1], // 12
            scenery[i + 2][j + 2], // 23
            scenery[i + 3][j + 3] // 34
          )
        ) {
          winner = +scenery[i][j];
        }
      }
    }

    let openSpots = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 8; j++) {
        if (typeof scenery[i][j] === "undefined") {
          openSpots++;
        }
      }
    }

    if (winner == null && openSpots == 0) {
      return "tie";
    } else {
      return winner;
    }
  }

  function newBoard(scenery) {
    const newScenary = new Array();

    for (var i = 0; i < scenery.length; i++) {
      newScenary.push(scenery[i].slice());
    }
    return newScenary;
  }

  function minimax(scenery, depth, bool) {
    let result = checkWinner();
    if (result !== null) {
      console.log(scenery);
      console.log(points[result]);
      return points[result];
    }

    if (depth > 7) return points.tie;

    let bestTest;

    bool ? (bestTest = -Infinity) : (bestTest = Infinity);

    for (let c = 0; c < 6; c++) {
      let startPosition = 0;
      while (
        typeof scenery[startPosition][c] != "undefined" &&
        startPosition < 7
      ) {
        startPosition++;
      }

      if (startPosition === 7) {
        continue;
      }
      scenery[startPosition][c] = bool ? myMove : !myMove;

      let best = minimax(scenery, parseInt(depth + 1), !bool);

      scenery[startPosition][c] = undefined;

      bool
        ? (bestTest = Math.max(best, bestTest))
        : (bestTest = Math.min(best, bestTest));
    }

    return bestTest;
  }

  let bestMove = -Infinity;
  let move;
  let startPosition = 0;
  let board = newBoard(scenery);

  for (let c = 0; c < 8; c++) {
    while (typeof board[startPosition][c] != "undefined" && startPosition < 7) {
      startPosition++;
    }
    if (startPosition === 7) {
      continue;
    }
    board[startPosition][c] = myMove;

    let best = minimax(board, +0, false);
    board[startPosition][c] = undefined;
    if (best > bestMove) {
      bestMove = best;
      move = startPosition;
    }
  }

  return move;
};

export default LindoScript;
