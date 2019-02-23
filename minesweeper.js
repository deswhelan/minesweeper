document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  // Choose number rows and columns here
  cells: makeCells(5)
}

// Create cells array
function makeCells (numberOfRowsAndCols) {
  var cells = [];
  for (i = 0; i < numberOfRowsAndCols; i++) {
    for (j = 0; j < numberOfRowsAndCols; j++) {
      cell = {
        row: i,
        col: j,
        isMine: false,
        hidden: true
      }
      cells.push(cell);
    }
  }
  return cells;
}

function getRandomInt (max) {
  return Math.floor(Math.random()*Math.floor(max))
}

function plantRandomMine () {
  board.cells[getRandomInt(board.cells.length)].isMine = true;
}

function countTotalMines (mineCounter) {
  board.cells.forEach(function (cell) {
    if(cell.isMine == true) {
      mineCounter++; 
    }
  })
  return mineCounter;
}

function plantMines () {
  var mineCounter = 0;
  // Choose how many mines you want here
  var maxMines = board.cells.length/4
  while (mineCounter < maxMines) {
    mineCounter = 0;
    plantRandomMine ();
    mineCounter = countTotalMines(mineCounter);
  }
  console.log("Total mines: " + mineCounter)
}

function assignSurroundingMinesValues () {
  board.cells.forEach(function(cell) {
    cell.surroundingMines = countSurroundingMines(cell)
    }
  ) 
}

function startGame () {
  plantMines()
  assignSurroundingMinesValues()
  addEventListener("click", checkForWin)
  addEventListener("contextmenu", checkForWin)
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function checkAllCellsAreCompleted (cellCompletedCounter) {
  board.cells.forEach(function (cell) {
    if ((cell.isMine == true && cell.isMarked == true) || (cell.isMine == false && cell.hidden == false)) {
      cellCompletedCounter++
      } 
    } 
  )
  return cellCompletedCounter;
}

function checkForWin () {
  var cellCompletedCounter = 0;
  if (checkAllCellsAreCompleted(cellCompletedCounter) == board.cells.length) {
    lib.displayMessage('You win!')
    playAgainPrompt()
  }
}

function playAgainPrompt () {
  setTimeout(function () {
    if (confirm("Play again?")) {
      location.reload()
    }
  }, 750)
}


function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  var mineCounter = 0;
  surroundingCells.forEach(function (cell) {
      if(cell.isMine == true) {
        mineCounter++;
      }
    }
  )
  return mineCounter;
}

