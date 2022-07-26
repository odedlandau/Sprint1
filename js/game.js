'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''


var gBoard
var gLevel = { size: 4, mines: 2 }
var gGame
var gCells
var gIsFirstClick
var gTimeStart
var gTimeIntervalId
var gLivesCount = 3



var gElTimer = document.querySelector('.time')




function initGame() {

    gGame = gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gBoard = createBoard(gLevel)
    randomizeMines(gLevel.mines)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)

    gElTimer.innerText = ''
    gIsFirstClick = false
    var elMsg = document.querySelector('.msg')
    elMsg.innerText = ''
}

// creates a board and returns it
function createBoard(level) {
    const board = []

    for (var i = 0; i < level.size; i++) {
        board.push([])

        for (var j = 0; j < level.size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false

            }
        }
    }

    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j]
            var cell = ''
            // if (currCell.isMine) {
            //     cell = MINE
            // } else if (currCell.minesAroundCount !== 0)  {
            //     cell = currCell.minesAroundCount
            // } else {
            //     cell = ''
            // }

            var classId = getClassName({ i, j })
            var className = (currCell.isShown) ? 'shown' : 'not-shown'

            strHTML += `<td class="cell ${className} ${classId}" oncontextmenu="cellMarked(this,${i},${j},event)" onclick="cellClicked(this, ${i}, ${j})">${cell}</td>`

        }

        strHTML += '</tr>'

        var elBoard = document.querySelector('.board')
        elBoard.innerHTML = strHTML

    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j].isMine) continue
            var minesNegsCount = countNeighbors(i, j, board)
            gBoard[i][j].minesAroundCount = minesNegsCount

        }
    }
    return minesNegsCount
}


function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j]

    if (!gIsFirstClick) {

        setTimer()
        // gBoard[i][j].isMine = false
        // elCell.innerText = ''
        // cell.isShown = true
        // elCell.classList.remove('not-shown')
        // elCell.classList.add('shown')
        gGame.shownCount++
        


        gIsFirstClick = !gIsFirstClick
    }

    if (cell.isShown) return
    if (cell.isMarked) return
    // if (cell.isMine) {
    // var elBtn = document.querySelector('btn-restart')
    // elBtn.innerText = '😣'
    // var elMsg = document.querySelector('.msg')
    // elMsg.innerText = 'LOOSER'



    // }


    /// step on mine
    if (!cell.isShown && cell.isMine) {
        elCell.innerText = MINE
        cell.isShown = true
        elCell.classList.remove('not-shown')
        elCell.classList.add('shown')
        gLivesCount--
        checkLives()

        // var elBtn = document.querySelector('.btn-restart')
        // elBtn.innerText = '😣'
        // console.log(elBtn);


    } else if (!cell.isShown && cell.minesAroundCount !== 0) {
        elCell.innerText = cell.minesAroundCount
        cell.isShown = true
        elCell.classList.remove('not-shown')
        elCell.classList.add('shown')
        gGame.shownCount++



    } else {
        elCell.innerText = ''
        cell.isShown = true
        elCell.classList.remove('not-shown')
        elCell.classList.add('shown')
        gGame.shownCount++

    }

    checkGameWin()


}


function cellMarked(elCell, i, j, ev) {
    var cell = gBoard[i][j]

    if (cell.isShown) return
    if (gGame.markedCount === gLevel.mines) return

    if (ev.which === 3 && cell.isMarked) {
        removeMarked(elCell, i, j)
    }

    else if (ev.which === 3 && !cell.isMarked) {

        elCell.innerText = FLAG
        cell.isMarked = true
        gGame.markedCount++

    }


    checkGameWin()
}


function removeMarked(elCell, i, j) {

    elCell.innerText = ''
    gBoard[i][j].isMarked = false
    gGame.markedCount--


}

function checkGameWin() {


    if (gGame.markedCount + gGame.shownCount === gLevel.size ** 2) {

        clearInterval(gTimeIntervalId)
        var elMsg = document.querySelector('.msg')
        elMsg.innerText = 'CONGRATS...YOU WIN!!!'
        var elBtn = document.querySelector('.btn-restart')
        elBtn.innerText = '😍'

    }


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

    initGame()
}

function randomizeMines(minesNumber) {

    gCells = []
    gCells = getEmptyCells(gBoard)

    for (var i = 0; i < minesNumber; i++) {
        var randomCell = drawCell(gCells)
        gBoard[randomCell.i][randomCell.j].isMine = true

    }

}

document, addEventListener('contextmenu', (event) => {
    event.preventDefault()


})

function setTimer() {
    gTimeStart = Date.now()
    gTimeIntervalId = setInterval(() => {
        gGame.secsPassed = (Date.now() - gTimeStart) / 1000
        gElTimer.innerText = `${(gGame.secsPassed).toFixed(0)} `
    }, 100);
}

function checkLives() {
    var elLives = document.querySelector('.lives')

    if (gLivesCount > 0) {


        switch (gLivesCount) {
            case 3:
                elLives.innerText = '💗 💗 💗'
                break
            case 2:
                elLives.innerText = '💗 💗'
                break
            case 1:
                elLives.innerText = '💗'
                break
        }
    } else {


        var elMsg = document.querySelector('.msg')
        elMsg.innerText = 'LOOSER'
        clearInterval(gTimeIntervalId)
    }
}