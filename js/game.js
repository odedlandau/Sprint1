'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''


var gBoard
var gLevel
var gGame
var gCells


function test() {
    console.log('whello');
}

function initGame(elBtn) {
    updateLevel(elBtn)
    gBoard = createBoard(gLevel)
    randomizeMines(gLevel.mines)

    console.log(gBoard);
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j].isMine) continue
            var minesNegsCount = countNeighbors(i, j, board)
            gBoard[i][j].minesAroundCount = minesNegsCount

        }
    }
}


function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j]
    // console.log('elCell.innerText:', elCell.innerText) 
    if (!cell.isShown && cell.isMine) {
        elCell.innerText = MINE
    } else if (!cell.isShown && cell.minesAroundCount !== 0) {
        elCell.innerText = cell.minesAroundCount

    } else {
        elCell.innerText = ''
    }

    cell.isShown = false
    elCell.classList.remove('not-shown')
    elCell.classList.add('shown')

}

function cellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}

function updateLevel(elBtn) {

    var level = elBtn.innerText

    switch (level) {

        case 'Beginer':
            gLevel = { size: 4, mines: 2 }
            break
        case 'Medium':
            gLevel = { size: 8, mines: 12 }
            break
        case 'Expert':
            gLevel = { size: 12, mines: 30 }
            break
    }
}

function randomizeMines(minesNumber) {

    gCells = []
    gCells = getEmptyCells(gBoard)

    for (var i = 0; i < minesNumber; i++) {
        var randomCell = drawCell(gCells)
        gBoard[randomCell.i][randomCell.j].isMine = true

    }

}