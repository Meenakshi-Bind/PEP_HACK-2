
let Pause=document.querySelector(".pause");
let Play=document.querySelector(".play");
let ScoreCard1=document.querySelector(".Card"); 


let dead = new Audio();
dead.src = "Space/dead.mp3";
let bulletSound = new Audio();
bulletSound.src = "Space/bullet.mp3";
let blastSound = new Audio();
blastSound.src = "Space/blast.mp3";

let SCORE=0;
let Name="USER";
let GAME_O=false;
let isPaused=false;
let move;
let gener;
let NameDivRemoved=0;
ScoreCard1.addEventListener("click" , function(){
    window.location.assign("spaceScorecard.html");
  })

let modal=document.createElement("div");
modal.classList.add("Details");
modal.innerHTML=`
            <div class="candidate">
                 <input type="text" id="txt" class="id" placeholder="enter your name"  spellcheck="false" autocomplete="off">
            </div>
            <div class="Action">
             <button class="btn">OK</button>
         `
         board.appendChild(modal);
         let OMK=document.querySelector('.Action');
         OMK.addEventListener("click",function(){
         Name=document.getElementById('txt').value
         let NAMEappend=document.createElement("div");
          NAMEappend.classList.add("Name_text");
           NAMEappend.innerHTML=`
            ${Name}`
         
         board.appendChild(NAMEappend);
        console.log(Name);
        document.querySelector(".Details").remove();
        NameDivRemoved=1;
        
    
})

function runGame()
{
    
    generaterocks()
    moverocks();
    
    let jet=document.getElementById("jet");
    let board=document.getElementById("board");
    let points=document.getElementById("points");
   window.addEventListener("keydown",function(e){
    console.log(e.key);
    let left=parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    if(e.key=="ArrowLeft" && left>0){
         jet.style.left=left - 10 + "px";
    }
    //board w-jet w=500-40=460
    else if(e.key=="ArrowRight" && left <=460){
        jet.style.left=left + 10 + "px";
    }
    if(e.key == "ArrowUp"|| e.keyCode == 32)
    {  bulletSound.play();
       let bullet=document.createElement("div");
       bullet.classList.add("bullets");
       board.appendChild(bullet);

       let movebullet=setInterval(() => {
       let rocks=document.getElementsByClassName("rocks");

       for(let i=0;i<rocks.length;i++)
       {
          let rock=rocks[i];

          if(rock != undefined)
          {
              let rockBound=rock.getBoundingClientRect();
              let bulletBound=bullet.getBoundingClientRect();
              //Condition to check whether the rock/alien and the bullet are at the same position..!
              //If so,then we have to destroy that rock

              if(bulletBound.left >= rockBound.left &&
                bulletBound.right <= rockBound.right &&
                bulletBound.top <= rockBound.top &&
                bulletBound.bottom <= rockBound.bottom
                )
                { 
                    
                    // bullet.style.display="none";
                    
                 if(!isPaused) 
                 {  
                  
                  blastSound.play();
                  bullet.parentElement.removeChild(bullet);
                  rock.parentElement.removeChild(rock);
                  
                  
                   //removing that particular rock;
                 //bullets ko bhi remove krna padhega;

                  //Score
                  SCORE=points.innerHTML=parseInt((points).innerHTML) +1;
                 }
                }
          }

       }
       let bulletbottom = parseInt(
           window.getComputedStyle(bullet).getPropertyValue("bottom")

       );
       if(bulletbottom >= 500)
       {
           clearInterval(movebullet);
       }
       bullet.style.left=left + "px"; //bullet placed at top of the jet!
       bullet.style.bottom=bulletbottom + 3 + "px";
    });
       }
    
});

function generaterocks(){
     gener=setInterval(()=>{
    let rock=document.createElement("div");
    rock.classList.add("rocks");
    //Just getting the left of the rock to place it in random position..

    let rockleft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));
    //  console.log(rockleft);
    //generate random value between given inst...
    rock.style.left=Math.floor (Math.random() * 441) + "px";
    board.appendChild(rock);
    
},1000)
};



function moverocks(){
     move=setInterval(() => {
    let rocks=document.getElementsByClassName("rocks");

    if(rocks !=undefined){
        for(let i=0;i<rocks.length;i++)
        {
            let rock=rocks[i];
            let rocktop=parseInt(window.getComputedStyle(rock).getPropertyValue("top"));
            //475 => boardheight - rockheight + 25
            if (rocktop >= 647) {
                // alert("Game Over");
                if(!isPaused)
                {
                    
                GAME_O=true;
                dead.play();
                board.innerHTML=`<div class="Over">Game Over
                <div > <button class="Ok">OK</button></div>
                </div>`
                addMedia(Name,SCORE);
                let next=document.querySelector(".Ok");  
                next.addEventListener("click",function(){
                    clearInterval(move);
                    clearInterval(gener);
                    window.location.reload();
                    
                })                
                 }
              }
        
              rock.style.top = rocktop + 25 + "px";
        }
    
    }
},450);
}
}


  Pause.addEventListener("click",function(e){
    if(!GAME_O && NameDivRemoved)
    {
    if(!isPaused)
    {
    let stop=document.createElement("div");
       stop.classList.add("PAUSE");
       stop.textContent = "PAUSE";
       
    board.appendChild(stop);
    
    isPaused=true;
    
    clearInterval(move);
    clearInterval(gener);
    
    }
    }
})
Play.addEventListener("click",function(e){
   
    if(NameDivRemoved) 
    {
    runGame();
   
    if(isPaused)
    {
        isPaused=false;
        document.querySelector(".PAUSE").remove();
    }
}

})
    



