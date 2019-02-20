document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: makeCells(3)
}

function makeCells (numberOfCellsWide) {
  var cells = [];
  for (i = 0; i < numberOfCellsWide; i++) {
    for (j = 0; j < numberOfCellsWide; j++) {
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

function startGame () {
  board.cells[0].isMine = true;
  board.cells[2].isMine = true;
  board.cells[5].isMine = true;
  
  board.cells.forEach(function(cell) {
      cell.surroundingMines = countSurroundingMines(cell)
    }
  ) 

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
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

