const LindoScript = (scenery, myMove) => {
  function showScenery(scenery) {
    // Transpõe o cenário e substitui undefined por um espaço vazio
    const transposedScenery = scenery[0].map((_, colIndex) => {
      return scenery.map((row) => {
        return (row[colIndex] === undefined && " ") || row[colIndex];
      });
    });

    // Exibe a matriz de uma maneira bonitinha
    console.table(transposedScenery);
  }

  showScenery(scenery);
  var teste = [
    [1, undefined, undefined, undefined, undefined, 0],
    [1, undefined, 0, 0, 0, 0],
    [1, undefined, undefined, undefined, undefined, 0],
    [1, undefined, undefined, undefined, undefined, 0],
    [1, undefined, undefined, undefined, undefined, 0],
    [1, undefined, undefined, undefined, undefined, 0],
    [1, undefined, undefined, undefined, undefined, 0],
    [1, undefined, undefined, undefined, undefined, 0],
  ];

  console.log(scenery);
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

    let openSpots = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 8; j++) {
        if (typeof scenery[i][j] === "undefined") {
          openSpots++;
        }
      }
    }

    // console.log({ winner });
    if (winner == null && openSpots == 0) {
      return "tie";
    } else {
      return winner;
    }
  }

  function minimax(scenery, depth, bool) {
    let result = checkWinner();
    if (result !== null) {
      return points[result];
    }

    if (bool) {
      //maquina
      let bestTest = -Infinity;
      let startPosition = 0;

      for (let l = 0; l < 1; l++) {
        for (let c = 0; c < 8; c++) {
          while (
            typeof scenery[c][startPosition] != "undefined" &&
            startPosition < 5
          ) {
            startPosition++;
          }
          scenery[c][startPosition] = 1;

          let best = minimax(scenery, parseInt(depth + 1), false);
          scenery[c][startPosition] = undefined;
          bestTest = Math.max(best, bestTest);
        }
      }

      return bestTest;
    } else {
      //humano
      let bestTest = Infinity;
      let startPosition = 0;
      for (let l = 0; l < 1; l++) {
        for (let c = 0; c < 8; c++) {
          console.log(scenery[c][startPosition])
          while (
            typeof scenery[c][startPosition] != "undefined" &&
            startPosition < 5
          ) {
            startPosition++;
          }
          scenery[c][startPosition] = 0;

          let best = minimax(scenery, parseInt(depth + 1), true);
          scenery[c][startPosition]= undefined;
          bestTest = Math.min(best, bestTest);
        }
      }
      return bestTest;
    }
  }

  let bestMove = -Infinity;
  let move;
  for (let l = 0; l < 6; l++) {
    for (let c = 0; c < 8; c++) {
      if (typeof scenery[l][c] === "undefined") {
        scenery[l][c] = myMove;

        let best = minimax(scenery, +0, false);
        scenery[l][c] = undefined;
        console.log({ best });
        console.log({ bestMove });
        if (best > bestMove) {
          bestMove = best;
          console.log("if", l, c);
          move = l;
        }
      }
    }
  }
  console.log("move :>> ", move);

  return Math.floor(Math.random() * 8);
};

export default LindoScript;
