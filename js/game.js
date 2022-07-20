'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''


var gBoard
var gLevel
var gGame


function initGame() {
    gBoard = createBoard(4)
    renderBoard(gBoard)
}

function setMinesNegsCount(board) {

}


function cellClicked(elCell, i, j) {
    console.log('hello');

}

function cellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}
