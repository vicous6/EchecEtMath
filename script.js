// R = Rook
// B = Bishop
// H = Horse
// Q = Queen
// K = King
// P = Pawn

import Board from './models.js'

let board = new Board
let boardData = board.getBoard()

board.displayBoard(boardData)

board.displayBlackAndWhite()

board.listenerMove()
console.log(board.getSelectCount())
console.log(board)
