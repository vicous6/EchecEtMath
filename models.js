export default class Board {

  constructor() {

    this.board = [
      ["R", "C", "B", "Q", "K", "B", "C", "R"],
      ["P", "P", "P", "P", "P", "P", "P", "P"],
      ["X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X"],
      ["P", "P", "P", "P", "P", "P", "P", "P"],
      ["R", "C", "B", "Q", "K", "B", "C", "R"]
    ]

    this.selectCount = 0
    this.selectSquare = []

  }

  getBoard {

    return this.board;
  }
  getSelectCount() {

    return this.selectCount;
  }

  displayBoard(boardData) {

    let li = document.getElementsByTagName("li");
    console.log(li)
    let count = 0
    for (let i = 0; i < boardData.length; i++) {

      for (let j = 0; j < boardData[i].length; j++) {

        li[count].innerHTML = boardData[i][j]
        li[count].classList.add(`${i}${j}`)
        // console.log(boardData[i][j])
        count++

      }
    }
  }
  displayBlackAndWhite() {
    let on = true
    let li = document.getElementsByTagName("li");
    for (let i = 1; i < li.length + 1; i++) {

      if (i % 2 === 0 && on === true) {

        li[i - 1].style.background = "white"
      }
      else if (i % 2 === 1 && on === false) {

        li[i - 1].style.background = "white"
      }


      if (i % 8 === 0 && on === true) {
        on = false
      }
      else if (i % 8 === 0 && on === false) {
        on = true
      }
      // console.log(i)
      // console.log(i % 2)
    }
  }
  listenerMove() {

    let li = document.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {

      li[i].addEventListener("click", function() {
  if( li[i].style.background !== "yellow"){
        li[i].style.background = "yellow"
        
        this.selectCount = this.selectCount+1;
        let coordinates = li[i].classList[0]
        // this.selectSquare.pushInSelectedSquare(coordinates)
        // pushInSelectedSquare(coordinates)
        // console.log(this.selectSquare)
        console.log(coordinates)

        if (this.selectCount === 2) {

          this.selectCount = 0;
          
          console.log(this.selectSquare)

        }
      }

      })

    }
  }
  pushInSelectedSquare(value){
    this.selectSquare.push(value)
  }
}
