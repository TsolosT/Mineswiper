let cards = document.querySelectorAll(".card");
let fhamsters;
let hams_pos=[],
    cats_pos = [];
const playAgainBtn=document.querySelector("#playAgainBtn");
const modal=document.querySelector("#modal");
const modalBtnClose=document.querySelector("#closeModalBtn");

modalBtnClose.addEventListener("click", () => {
    modal.classList.remove('is-open');
    modal.classList.add("modal--offscreen");
});

init();
flipCardOnClick(cards);




//functions
//basic initial of game
function init()
{
    fhamsters=0; // init 0 found hamsters
    setCards(cards);
}
//Prepares the cards
function setCards(cards)
{
    preLoadAnimationOn();
    setCardsPosition();

    setCardsValues(cats_pos,"cat","assets/imgs/cat_80px.png",3);

    setCardsValues(hams_pos,'hamster',"assets/imgs/hamster_80px.png",9);  
    preLoadAnimationOff();
}
//Get random positions for the cards
function setCardsPosition()
{
  while ( cats_pos.length < 3 )
  {
      var rnum = Math.floor(Math.random() * 11 ) +1;
       if(cats_pos.indexOf(rnum) === -1) { cats_pos.push(rnum); }
  }
  for(let i=0;i<12;i++)
  {
      if(!cats_pos.includes(i)) { hams_pos.push(i); }
  }
}
//Set the values of the cards (imgs and bg color)
function setCardsValues(positions,class_name,img_src,length)
{   
     for(let i=0;i<positions.length;i++)
    {   
        document.querySelectorAll(".back")[positions[i]].classList.add(class_name);
        document.querySelectorAll(".back")[positions[i]].children[0].src=img_src;
    }
}
//Enable flipping cards on click 
 function flipCardOnClick(arrayCards)
{
    for(let i=0;i<arrayCards.length;i++)
        {
            arrayCards[i].addEventListener('click',()=>
            {
                arrayCards[i].children[0].lastElementChild.classList.add('flipped');
                 deactivateCard(arrayCards[i]);
                 winCheck(arrayCards[i]);
            });
        }
}
// Disables the clicked card
function deactivateCard(card){
    card.classList.add('card--deactived');
}
//Checks if the user won or just lost
function winCheck(block)
{
    if(block.children[0].lastElementChild.classList.contains('cat'))
    { 
        showMessage("Whoops,You lost...");
        gameOver();
    }
    else  if(fhamsters===7)
    {
        showMessage("Awesome,You Nailed it...");
        gameOver();
    }    
    fhamsters++;
}
//Deactives all cards & actives playagain btn
function gameOver()
{   
    
    for(let i=0;i<cards.length;i++)
    {
        cards[i].classList.add('card--deactived');
    }
    playAgainBtn.addEventListener("click",()=>{
        playAgainBtn.classList.add("hide");
        reset();
    });
}
//resets the game
function reset()
{   
    //remove flipped, cat/hamster,card--deactived class
    cards.forEach(card=>{
        card.children[0].lastElementChild.classList.remove("flipped");
        card.children[0].lastElementChild.classList.remove("cat");
        card.children[0].lastElementChild.classList.remove("hamster");
        card.classList.remove("card--deactived");
    });
    //reassign values
    init();
}
//Modal Message
function showMessage(message)
{
    const msg=document.querySelector("#msg");
     msg.innerText=message;
     modal.classList.remove('modal--offscreen');
     modal.classList.add('is-open');
     setInterval(()=>{
            modal.classList.remove('is-open');
            modal.classList.add('modal--offscreen');
            playAgainBtn.classList.remove('hide');
     },2800);
     
}

// Preloading animation
function preLoadAnimationOn()
{
    document.querySelector("#main").style.display = "none";
    document.getElementById("loader").classList.add("loader");
}
function preLoadAnimationOff()
{
    setTimeout(()=>{
            document.getElementById("loader").classList.remove("loader");
            document.querySelector("#main").style.display="flex";          
        },1050);
}