document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  // Choose number rows and columns here
  cells: makeCells(4)
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

// Randomly assign mines to cells
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

function makeMines () {
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
  makeMines()
  assignSurroundingMinesValues()
  addEventListener("click", checkForWin)
  addEventListener("contextmenu", checkForWin)
  
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  var cellCompletedCounter = 0;

  board.cells.forEach(function (cell) {
      if ((cell.isMine == true && cell.isMarked == true) || (cell.isMine == false && cell.hidden == false)) {
        cellCompletedCounter++
      } 
    }
  )
  if (cellCompletedCounter == board.cells.length) {
    lib.displayMessage('You win!')
  }
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
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

