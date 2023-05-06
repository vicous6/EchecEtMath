export function imageOnSquare() {
  
    let li = document.getElementsByTagName("li")
    let p = document.getElementsByTagName("p")
   
    for(let i = 0 ; i < li.length; i ++){
      
        if(p[i].innerHTML==="PW"){
          
          
            p[i].classList.add("imagePawnWhite")
        }
        if(p[i].innerHTML==="PB"){
          
          
            p[i].classList.add("imagePawnBlack")
        }
        if(p[i].innerHTML==="RB"){
          
          
            p[i].classList.add("imageRookBlack")
        }
        if(p[i].innerHTML==="RW"){
          
          
            p[i].classList.add("imageRookWhite")
        }
        if(p[i].innerHTML==="BW"){
          
          
            p[i].classList.add("imageBishopWhite")
        }
        if(p[i].innerHTML==="BB"){
          
          
            p[i].classList.add("imageBishopBlack")
        }
        if(p[i].innerHTML==="CB"){
          
          
            p[i].classList.add("imageKnightBlack")
        }
        if(p[i].innerHTML==="CW"){
          
          
            p[i].classList.add("imageKnightWhite")
        }
        if(p[i].innerHTML==="QW"){
          
          
            p[i].classList.add("imageQueenWhite")
        }
        if(p[i].innerHTML==="QB"){
          
          
            p[i].classList.add("imageQueenBlack")
        }
        if(p[i].innerHTML==="KB"){
          
          
            p[i].classList.add("imageKingBlack")
        }
        if(p[i].innerHTML==="KW"){
          
          
            p[i].classList.add("imageKingWhite")
        }
    }
}

export function rotate180() {
    
    let h1 = document.getElementsByTagName("h1")[0]
    h1.addEventListener("click", function(){
        
        let board = document.getElementById("board")
        
        if(board.classList.contains("rotate")){
        board.classList.remove("rotate")

        }else{
        board.classList.add("rotate")
            
        }
        
        
        
    })
}