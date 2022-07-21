'use strict'

// Gets a random Integer without maximum
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

// Gets array of numbers and returns it shuffled
function shuffleNums(nums) {
    var shuffledNums = []
    for (var i = 0; i < gMaxNum; i++) {
        var randIdx = getRandomInt(0, nums.length)
        var num = nums[randIdx]
        nums.splice(randIdx, 1)
        shuffledNums[i] = num
    }
    return shuffledNums
}

// returns a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Gets date
function getTime() {
    return new Date().toString().split(' ')[4];
}


// creates a mat copy
function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}

// rednders cell
function renderCell(i, j, value) {
    // var elCell = document.querySelector(`[data-i][data-j]`)
    var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    elCell.innerText = value
    return elCell
}

// counts neighbors
function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) neighborsCount++;
        }
    }
    return neighborsCount;
}

// returning a fixed number from array
function drawCell(cells) {
    var randIdx = getRandomInt(0, cells.length)
    var cell = cells[randIdx]
    cells.splice(randIdx, 1)
    return cell
}

// Move the player by keyboard arrows
function handleKey(event) {
    console.log('event.key:', event.key)
    switch (event.key) {
        case 'ArrowLeft':
            break;
    }
}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

// Convert a location object {i, j} (cell-1-2) to a selector and render a value in that element
function renderCellByLocation(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

function getEmptyCells(board) {
    var cells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            // var cell = board[i][j]

            var coord = { i, j }
            cells.push(coord)

        }
    }
    // var randomCell = drawNum(cells)
    // return randomCell
    return cells
}

function createCell(rowIdx, colIdx, inCell = '') {
    return {
        i: rowIdx,
        j: colIdx,
        element: inCell
    }


}



