import { imageOnSquare } from '/EchecEtMath/graphic.js'

export function displayBoard(boardData) {

  let p = document.getElementsByTagName("p");
  let li = document.getElementsByTagName("li");
  console.log(p)
  let count = 0
  for (let i = 0; i < boardData.length; i++) {

    for (let j = 0; j < boardData[i].length; j++) {
      // console.log(boardData[i][j])
      // console.log(p[i])
      p[count].innerHTML = boardData[i][j]
      li[count].setAttribute("id", `${i}${j}`)
      // console.log(boardData[i][j])
      count++

    }
  }
}

export function displayBlackAndWhite() {
  let on = false
  let li = document.getElementsByTagName("li");
  for (let i = 1; i < li.length + 1; i++) {

    if (i % 2 === 0 && on === true) {

      li[i - 1].classList.add("white")
    }
    else if (i % 2 === 1 && on === false) {

      li[i - 1].classList.add("white")
    }
    else {
      li[i - 1].classList.add("black")
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

export function listenerMove(selected, process) {

  let li = document.getElementsByTagName("li");
  let p = document.getElementsByTagName("p");



  for (let i = 0; i < li.length; i++) {

    li[i].addEventListener("click", function() {

// si 1er click
      if (selected.length === 0) {

        li[i].classList.add("selectedSquare")
        p[i].classList.add("selectedPiece")

        selected.push(li[i].getAttribute("id"))

        displayPossibleMooves(selected[0])


      }else
// si 2eme click
      if (selected.length === 1 && li[i].classList.contains("possibleMoove") === true) {

        selected.push(li[i].getAttribute("id"))
        console.log(selected)
        selected = move(selected)


      }else
      // si reclick sur une case deja selection
      if(selected.length === 1 && li[i].classList.contains("selectedSquare") === true){
        
         removePossibleMoves()
         selected=[]
         return selected
         
      }
      // }
    })

  }
}
// doit s'executer si le moove est autoriser
// deplace la piece 1 vers al piece 2
export function move(selected) {
  // console.log(selected[0])
  // console.log(selected[1])

  let square1 = document.getElementById(selected[0])
  let square2 = document.getElementById(selected[1])


  let identifiant1 = parseInt(selected[0].charAt(0) * 8) + parseInt(selected[0].charAt(1))
  let identifiant2 = parseInt(selected[1].charAt(0) * 8) + parseInt(selected[1].charAt(1))
  // console.log(identifiant1)
  // console.log(identifiant2)

  let elem1 = document.getElementsByTagName("p")[identifiant1]
  let elem2 = document.getElementsByTagName("p")[identifiant2]




  // console.log(selected)

  // console.log(elem1)
  // console.log(elem2)


// console.log(elem1.classList)
// console.log(elem2.classList)
// elem2.classlist[0] = elem1.classList[0]
// efface la classe de la case cible, la rempalce avec la case de l'attaquant + remove la classe de l'ataquant
elem2.classList= ""
elem2.classList= elem1.classList
elem1.classList= ""
  elem2.innerHTML = elem1.innerHTML

// remove toutes les image de la case d'ou vient la pièce
  elem1.innerHTML = "X"
  // elem1.classList.remove("imagePawnWhite")
  // elem1.classList.remove("imagePawnBlack")
  
  // elem1.classList.remove("imageRookWhite")
  // elem1.classList.remove("imageRookBlack")
  

  elem1.classList.remove("selectedPiece")
  elem2.classList.remove("selectedPiece")

  square1.classList.remove("selectedSquare")
  square2.classList.remove("selectedSquare")


  // console.log(elem1)
  // console.log(elem2)

  
selected = []
  imageOnSquare()
  removePossibleMoves()
  
  return selected

}

export function displayPossibleMooves(selected) {

  let li = document.getElementsByTagName("li");
  let p = document.getElementsByTagName("p");
  // if cavalier, pions etc 

  // find the P
  let identifiant = findP(selected)


  // si c'est un Pion Blanc
  if (p[identifiant].innerHTML === "PW") {

    // 7eme ligne (ligne de depart) 
    if (selected[0] === "6") {
      console.log(selected)
      let id1 = parseInt(selected[0]) - 1;
      let id2 = parseInt(selected[1]);

      let id3 = parseInt(selected[0]) - 2;
      let id4 = parseInt(selected[1]);

      let squareId1 = id1.toString() + id2.toString();
      let squareId2 = id3.toString() + id4.toString();
      // console.log(squareId1)
      // console.log(squareId2)
      let possibleSquare1 = document.getElementById(squareId1)
      let possibleSquare2 = document.getElementById(squareId2)
      // console.log(possibleSquare1)
      // console.log(possibleSquare2)
// si la case devant est inoccupé
      if (p[findP(squareId1)].innerHTML === "X") {

        possibleSquare1.classList.add("possibleMoove")


      }
      // si les deux cases devant sont innocupé
      if (p[findP(squareId1)].innerHTML === "X" && p[findP(squareId2)].innerHTML === "X") {

        possibleSquare2.classList.add("possibleMoove")



      }

    }
    else {
      // console.log(selected)
      let id1 = parseInt(selected[0]) - 1;
      let id2 = parseInt(selected[1]);
      let squareId1 = id1.toString() + id2.toString();

      let possibleSquare1 = document.getElementById(squareId1)
      // si il peux avancer 
      if (p[findP(squareId1)].innerHTML === "X") {

        possibleSquare1.classList.add("possibleMoove")

      }


    }

    // si le pions peux MANGER affiche les casses possibles
    let id5 = parseInt(selected[0]) - 1;
    let id6 = parseInt(selected[1]) + 1;


    let id7 = parseInt(selected[0]) - 1;
    let id8 = parseInt(selected[1]) - 1;

    let squareId3 = id5.toString() + id6.toString();
    let squareId4 = id7.toString() + id8.toString();

    let identifiantP3 = findP(squareId3)
    let identifiantP4 = findP(squareId4)

    let possibleSquare3 = document.getElementById(squareId3)
    let possibleSquare4 = document.getElementById(squareId4)
// console.log(possibleSquare3)
// console.log(possibleSquare4)


// console.log(selected)
// console.log(squareId3)
// console.log(squareId4)
// console.log(possibleSquare3)
// console.log(possibleSquare4)
    // si l'element cible est un ennemie
   if(possibleSquare3!== null){
      if (p[identifiantP3].innerHTML === "PB"
              ||p[identifiantP3].innerHTML === "RB" 
              ||p[identifiantP3].innerHTML === "CB" 
              ||p[identifiantP3].innerHTML === "BB" 
              ||p[identifiantP3].innerHTML === "KB"
              ||p[identifiantP3].innerHTML === "QB")
              {
      possibleSquare3.classList.add("possibleMoove")
    }
   
   }
   if(possibleSquare4!== null){
  // si l'element cible est un ennemie
            if (p[identifiantP4].innerHTML === "PB"
              ||p[identifiantP4].innerHTML === "RB" 
              ||p[identifiantP4].innerHTML === "CB" 
              ||p[identifiantP4].innerHTML === "BB" 
              ||p[identifiantP4].innerHTML === "KB"
              ||p[identifiantP4].innerHTML === "QB"){
      possibleSquare4.classList.add("possibleMoove")
    }
}

  }
  else
  // si c'est un pion noir
  if (p[identifiant].innerHTML === "PB") {
    // si c'est la 7eme Rangée
    console.log(selected[0])
    if (selected[0] === "1") {
      console.log(selected)
      let id1 = parseInt(selected[0]) + 1;
      let id2 = parseInt(selected[1]);
      let squareId1 = id1.toString() + id2.toString();

      let id3 = parseInt(selected[0]) + 2;
      let id4 = parseInt(selected[1]);

      let squareId2 = id3.toString() + id4.toString();
      // console.log(squareId1)
      // console.log(squareId2)
      let possibleSquare1 = document.getElementById(squareId1)
      let possibleSquare2 = document.getElementById(squareId2)
      // console.log(possibleSquare1)
      // console.log(possibleSquare2)
      
// si la case devant est inoccupé
      if (p[findP(squareId1)].innerHTML === "X") {

        possibleSquare1.classList.add("possibleMoove")


      }
      // si les deux cases devant sont innocupé
      if (p[findP(squareId1)].innerHTML === "X" && p[findP(squareId2)].innerHTML === "X") {

        possibleSquare2.classList.add("possibleMoove")



      }

    }
    else {
      // console.log(selected)
      let id1 = parseInt(selected[0]) + 1;
      let id2 = parseInt(selected[1]);
      let squareId1 = id1.toString() + id2.toString();

      let possibleSquare1 = document.getElementById(squareId1)
      // si il peux avancer 
      if (possibleSquare1 !== null && p[findP(squareId1)].innerHTML === "X") {

        possibleSquare1.classList.add("possibleMoove")

      }


    }

    // si le pions peux MANGER affiche les casses possibles
    let id5 = parseInt(selected[0]) + 1;
    let id6 = parseInt(selected[1]) - 1;


    let id7 = parseInt(selected[0]) + 1;
    let id8 = parseInt(selected[1]) + 1;

    let squareId3 = id5.toString() + id6.toString();
    let squareId4 = id7.toString() + id8.toString();

    let identifiantP3 = findP(squareId3)
    let identifiantP4 = findP(squareId4)

    let possibleSquare3 = document.getElementById(squareId3)
    let possibleSquare4 = document.getElementById(squareId4)
    // si pion= allié
    // if()
    console.log(p[identifiant])
     if(possibleSquare3!== null){
    // si l'element courent est le meme que l'element cible
    if (p[identifiantP3].innerHTML === "PW"
              ||p[identifiantP3].innerHTML === "RW" 
              ||p[identifiantP3].innerHTML === "CW" 
              ||p[identifiantP3].innerHTML === "BW" 
              ||p[identifiantP3].innerHTML === "KW"
              ||p[identifiantP3].innerHTML === "QW")
              {
      possibleSquare3.classList.add("possibleMoove")
    }
     }
     if(possibleSquare4!== null){
   
    // si l'element courent est le meme que l'element cible
            if (p[identifiantP4].innerHTML === "PW"
              ||p[identifiantP4].innerHTML === "RW" 
              ||p[identifiantP4].innerHTML === "CW" 
              ||p[identifiantP4].innerHTML === "BW" 
              ||p[identifiantP4].innerHTML === "KW"
              ||p[identifiantP4].innerHTML === "QW"){
      possibleSquare4.classList.add("possibleMoove")
    }

}
  }
  else
  if(p[identifiant].innerHTML === "RW"){
    
    console.log(p[findP(selected)])
    
    // bouger vers le haut
    for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) - i;
            let id2 = parseInt(selected[1]) ;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
            console.log( )
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              break;
            }
           
        }
      
      
    }
    // bouger vers le bas
    for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) + i;
            let id2 = parseInt(selected[1]) ;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
            console.log( )
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              break;
            }
           
        }
      
      
    }
    // // bouger vers la gauche 
    for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) ;
            let id2 = parseInt(selected[1]) - i ;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
          
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              break;
            }
           
        }
      
      
    }
    // // vers la droite
     for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) ;
            let id2 = parseInt(selected[1]) + i;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
            console.log( )
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              break;
            }
           
        }
      
      
    }
    
  }
  else
  if(p[identifiant].innerHTML === "RB"){
    
    console.log(p[findP(selected)])
    
    // bouger vers le haut
    for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) - i;
            let id2 = parseInt(selected[1]) ;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
            console.log( )
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              break;
            }
           
        }
      
      
    }
    // bouger vers le bas
    for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) + i;
            let id2 = parseInt(selected[1]) ;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
            console.log( )
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              break;
            }
           
        }
      
      
    }
    // // bouger vers la gauche 
    for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) ;
            let id2 = parseInt(selected[1]) - i ;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
          
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              break;
            }
           
        }
      
      
    }
    // // vers la droite
     for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) ;
            let id2 = parseInt(selected[1]) + i;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            // console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
            console.log( )
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              break;
            }
           
        }
      
      
    }
    
  }
  else
  if(p[identifiant].innerHTML === "BW"){
    
    // console.log(p[findP(selected)])
    
    // bouger en haut a droite
    for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) - i;
            let id2 = parseInt(selected[1]) + i;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
            console.log( )
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              break;
            }
           
        }
      
      
    }
    // bouger en haut a gauche
    for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) - i;
            let id2 = parseInt(selected[1]) - i ;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
            console.log( )
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              break;
            }
           
        }
      
      
    }
    // // bouger en bas a droite
    for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) +i;
            let id2 = parseInt(selected[1]) +i ;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
          
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              break;
            }
           
        }
      
      
    }
    // //bouger en bas a gauche
     for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) +i;
            let id2 = parseInt(selected[1]) -i;
            
            
            let squareId1 = id1.toString() + id2.toString();
        // console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            // console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
            console.log( )
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML ==="PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              break;
            }
           
        }
      
      
    }
    
  }
  else
  if(p[identifiant].innerHTML === "BB"){
    
    // console.log(p[findP(selected)])
    
    // bouger en haut a droite
    for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) - i;
            let id2 = parseInt(selected[1]) + i;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
            console.log( )
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              break;
            }
           
        }
      
      
    }
    // bouger en haut a gauche
    for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) - i;
            let id2 = parseInt(selected[1]) - i ;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
            console.log( )
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              break;
            }
           
        }
      
      
    }
    // // bouger en bas a droite
    for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) +i;
            let id2 = parseInt(selected[1]) +i ;
            let squareId1 = id1.toString() + id2.toString();
        console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
          
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              break;
            }
           
        }
      
      
    }
    // //bouger en bas a gauche
     for(let i = 1 ; i < 8 ; i ++){
      
            let id1 = parseInt(selected[0]) +i;
            let id2 = parseInt(selected[1]) -i;
            
            
            let squareId1 = id1.toString() + id2.toString();
        // console.log(squareId1)
            let possibleSquare1 = document.getElementById(squareId1)
        if(possibleSquare1 !== null){
          
            // console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
            console.log( )
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare1.classList.add("possibleMoove");
              break;
            }else
             if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              break;
            }
           
        }
      
      
    }
    
  }
  else
  if(p[identifiant].innerHTML === "CB"){
    
    console.log(p[findP(selected)])
    
    // bouger vers le haut
   
      
            let id1 = parseInt(selected[0]) - 2;
            let id2 = parseInt(selected[1]) -1;
            let id3 = parseInt(selected[0]) - 2;
            let id4 = parseInt(selected[1]) +1;
            let id5 = parseInt(selected[0]) - 1;
            let id6 = parseInt(selected[1]) +2;
            let id7 = parseInt(selected[0]) + 1;
            let id8 = parseInt(selected[1]) +2;
            let id9 = parseInt(selected[0]) + 2;
            let id10 = parseInt(selected[1]) +1;
            let id11 = parseInt(selected[0]) + 2;
            let id12 = parseInt(selected[1]) -1;
            let id13 = parseInt(selected[0]) - 1;
            let id14 = parseInt(selected[1]) -2;
            let id15 = parseInt(selected[0]) +1;
            let id16 = parseInt(selected[1]) -2;
            
            
            let squareId1 = id1.toString() + id2.toString();
            let squareId2 = id3.toString() + id4.toString();
            let squareId3 = id5.toString() + id6.toString();
            let squareId4 = id7.toString() + id8.toString();
            let squareId5 = id9.toString() + id10.toString();
            let squareId6 = id11.toString() + id12.toString();
            let squareId7 = id13.toString() + id14.toString();
            let squareId8 = id15.toString() + id16.toString();
        
            let possibleSquare1 = document.getElementById(squareId1)
            let possibleSquare2 = document.getElementById(squareId2)
            let possibleSquare3 = document.getElementById(squareId3)
            let possibleSquare4 = document.getElementById(squareId4)
            let possibleSquare5 = document.getElementById(squareId5)
            let possibleSquare6 = document.getElementById(squareId6)
            let possibleSquare7 = document.getElementById(squareId7)
            let possibleSquare8 = document.getElementById(squareId8)
        if(possibleSquare1 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare1.classList.add("possibleMoove");
              
            }else
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
             
            }
           
        }
        if(possibleSquare2 !== null){
          
            console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare2.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare2.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare2.classList.add("possibleMoove");
              
            }
        }
        if(possibleSquare3 !== null){
          

            let testIfSomebody = possibleSquare3.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare3.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare3.classList.add("possibleMoove");
              
            }
           
        }
        if(possibleSquare4 !== null){
          
            
            
            let testIfSomebody = possibleSquare4.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare4.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare4.classList.add("possibleMoove");
              
            }
           
        }
        if(possibleSquare5 !== null){
          
            // console.log(possibleSquare5)
            
            let testIfSomebody = possibleSquare5.getAttribute("id")
          console.log(p[findP(testIfSomebody)])
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare5.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare5.classList.add("possibleMoove");
              
            }
           
        }
        if(possibleSquare6 !== null){
          
            // console.log(possibleSquare6)
            
            let testIfSomebody = possibleSquare6.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare6.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare6.classList.add("possibleMoove");
              
            }
           
        }
        if(possibleSquare7 !== null){
          
            
            
            let testIfSomebody = possibleSquare7.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare7.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare7.classList.add("possibleMoove");
              
            }
           
        }
        if(possibleSquare8 !== null){
          
            
            let testIfSomebody = possibleSquare8.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare8.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PW"
              ||p[findP(testIfSomebody)].innerHTML === "RW" 
              ||p[findP(testIfSomebody)].innerHTML === "CW" 
              ||p[findP(testIfSomebody)].innerHTML === "BW" 
              ||p[findP(testIfSomebody)].innerHTML === "KW"
              ||p[findP(testIfSomebody)].innerHTML === "QW"){
              possibleSquare8.classList.add("possibleMoove");
              
            }
           
        }
      
      
    
  
    
  }
  else
  if(p[identifiant].innerHTML === "CW"){
    
    // console.log(p[findP(selected)])
    
    // bouger vers le haut
   
      
            let id1 = parseInt(selected[0]) - 2;
            let id2 = parseInt(selected[1]) -1;
            let id3 = parseInt(selected[0]) - 2;
            let id4 = parseInt(selected[1]) +1;
            let id5 = parseInt(selected[0]) - 1;
            let id6 = parseInt(selected[1]) +2;
            let id7 = parseInt(selected[0]) + 1;
            let id8 = parseInt(selected[1]) +2;
            let id9 = parseInt(selected[0]) + 2;
            let id10 = parseInt(selected[1]) +1;
            let id11 = parseInt(selected[0]) + 2;
            let id12 = parseInt(selected[1]) -1;
            let id13 = parseInt(selected[0]) - 1;
            let id14 = parseInt(selected[1]) -2;
            let id15 = parseInt(selected[0]) +1;
            let id16 = parseInt(selected[1]) -2;
            
            
            let squareId1 = id1.toString() + id2.toString();
            let squareId2 = id3.toString() + id4.toString();
            let squareId3 = id5.toString() + id6.toString();
            let squareId4 = id7.toString() + id8.toString();
            let squareId5 = id9.toString() + id10.toString();
            let squareId6 = id11.toString() + id12.toString();
            let squareId7 = id13.toString() + id14.toString();
            let squareId8 = id15.toString() + id16.toString();
        
            let possibleSquare1 = document.getElementById(squareId1)
            let possibleSquare2 = document.getElementById(squareId2)
            let possibleSquare3 = document.getElementById(squareId3)
            let possibleSquare4 = document.getElementById(squareId4)
            let possibleSquare5 = document.getElementById(squareId5)
            let possibleSquare6 = document.getElementById(squareId6)
            let possibleSquare7 = document.getElementById(squareId7)
            let possibleSquare8 = document.getElementById(squareId8)
           
        if(possibleSquare1 !== null){
          
            // console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare1.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare1.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare1.classList.add("possibleMoove");
              
            }
           
        }
        if(possibleSquare2 !== null){
          
            // console.log(possibleSquare1)
            
            let testIfSomebody = possibleSquare2.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare2.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare2.classList.add("possibleMoove");
              
            }
        }
        if(possibleSquare3 !== null){
          

            let testIfSomebody = possibleSquare3.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare3.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare3.classList.add("possibleMoove");
              
            }
           
        }
        if(possibleSquare4 !== null){
          
            
            
            let testIfSomebody = possibleSquare4.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare4.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare4.classList.add("possibleMoove");
              
            }
           
        }
        if(possibleSquare5 !== null){
          
            // console.log(possibleSquare5)
            
            let testIfSomebody = possibleSquare5.getAttribute("id")
          console.log(p[findP(testIfSomebody)])
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare5.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare5.classList.add("possibleMoove");
              
            }
           
        }
        if(possibleSquare6 !== null){
          
            // console.log(possibleSquare6)
            
            let testIfSomebody = possibleSquare6.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare6.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare6.classList.add("possibleMoove");
              
            }
           
        }
        if(possibleSquare7 !== null){
          
            
            
            let testIfSomebody = possibleSquare7.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare7.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare7.classList.add("possibleMoove");
              
            }
           
        }
        if(possibleSquare8 !== null){
          
            
            let testIfSomebody = possibleSquare8.getAttribute("id")
           
            if(p[findP(testIfSomebody)].innerHTML === "X"){
              possibleSquare8.classList.add("possibleMoove")
            }else
            // si c'est une piece ennemie
            if (p[findP(testIfSomebody)].innerHTML === "PB"
              ||p[findP(testIfSomebody)].innerHTML === "RB" 
              ||p[findP(testIfSomebody)].innerHTML === "CB" 
              ||p[findP(testIfSomebody)].innerHTML === "BB" 
              ||p[findP(testIfSomebody)].innerHTML === "KB"
              ||p[findP(testIfSomebody)].innerHTML === "QB"){
              possibleSquare8.classList.add("possibleMoove");
              
            }
           
        }
      
      
    
  
    
  }


  // selected[0]=selected[0]+"1
  // console.log(document.getElementById(squareId1))


}

export function removePossibleMoves() {
  let li = document.getElementsByTagName("li")
    let p = document.getElementsByTagName("p")


  for (let i = 0; i < li.length; i++) {
    // remove aussi les selected pieces
    p[i].classList.remove("selectedPiece")
    
    if (li[i].classList.contains("possibleMoove")) {
      li[i].classList.remove("possibleMoove")
      
    }
     if (li[i].classList.contains("selectedSquare")) {
      li[i].classList.remove("selectedSquare")
    }
  }
}

export function findP(id) {

  let identifiant = parseInt(id.charAt(0) * 8) + parseInt(id.charAt(1))

  return identifiant

}