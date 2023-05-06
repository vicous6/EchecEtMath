// R = Rook
// B = Bishop
// H = Horse
// Q = Queen
// K = King
// P = Pawn

import { displayBoard,displayBlackAndWhite,listenerMove } from '/EchecEtMath/models.js'
import { imageOnSquare,rotate180} from '/EchecEtMath/graphic.js'
let finish =0 ;
let board = [
      ["RB", "CB", "BB", "QB", "KB", "BB", "CB", "RB"],
      ["PB", "PB", "PB", "PB", "PB", "PB", "PB", "PB"],
      ["X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X"],
      ["PW", "PW", "PW", "PW", "PW", "PW", "PW", "PW"],
      ["RW", "CW", "BW", "QW", "KW", "BW", "CW", "RW"]
    ]
let selected = []
let process = 0
displayBoard(board)


imageOnSquare()
rotate180()

displayBlackAndWhite()
listenerMove(selected,process)




