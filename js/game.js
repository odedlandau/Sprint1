'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''


var gBoard
var gLevel
var gGame


function initGame() {
    gBoard = createBoard(4)
    console.log(gBoard);
    // renderBoard(gBoard)
}

function createBoard(size) {
    const board = []


    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = EMPTY
        }
    }

    board[0][3] = MINE
    board[2][2] = MINE
    return board
}


function setMinesNegsCount(board) {

}

function renderBoard(board) {
    // var strHtml = '';
    // for (var i = 0; i < board.length; i++) {
    //     var row = board[i];
    //     strHtml += '<tr>';
    //     for (var j = 0; j < row.length; j++) {
    //         var cell = row[j];
    //         // figure class name

    //         var tdId = `cell-${i}-${j}`;
    //         strHtml += `<td id="${tdId}" onclick="cellClicked(this)">${cell}</td>`;
    //     }
    //     strHtml += '</tr>';
    // }
    // var elMat = document.querySelector('.board');
    // elMat.innerHTML = strHtml;

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            currCell = EMPTY

            var cellClass = getClassName({ i, j })

            strHTML += `\t<td class="${cellClass}"  onclick="cellClicked(this)" >\n`;

            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


function cellClicked(elCell, i, j) {

}

function cellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}
