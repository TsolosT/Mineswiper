//variables
const cards=document.querySelectorAll(".card");
const playAgainBtn=document.querySelector("#playAgainBtn");
const modal=document.querySelector("#modal");
const modalBtnClose=document.querySelector("#closeModalBtn");
let fhamster;

modalBtnClose.addEventListener("click", () => {
    modal.classList.remove('is-open');
    modal.classList.add("modal--offscreen");
});
//init
flipCardOnClick(cards);
init();

//functions
function gameOver()
{   
    playAgainBtn.classList.remove('hide');
    for(let i=0;i<cards.length;i++)
    {
        cards[i].classList.add('card--deactived');
    }
    playAgainBtn.addEventListener("click",()=>{
        playAgainBtn.classList.add("hide");
        reset();
    });
}
//Function Reveals the card,and deactivates it 
function flipCardOnClick(arrayCards)
{
    for(let i=0;i<arrayCards.length;i++)
        {
            arrayCards[i].addEventListener('click',()=>
            {
                arrayCards[i].children[0].lastElementChild.classList.add('flipped');
                deactivateCard(arrayCards[i]);
                gameLogic(arrayCards[i]);
            });
        }
}
//Function that disable the card
function deactivateCard(card){
    card.classList.add('card--deactived');
}
//Function that set random values(cats & hamsters) to cards
 function setCards(cards){
    //generate cat's position random
    let cats_position = [];
    while (cats_position.length < 4) {
        var r = Math.floor(Math.random() * 12) + 1;
        if (cats_position.indexOf(r) === -1) cats_position.push(r);
    }
    //generate rest of positions 
    let mouse_position=[];
    for(let i=0;i<=12;i++)
    {
        if(!cats_position.includes(i))
        {
            mouse_position.push(i);
        }
    }
    //now add cats values to cards
      addValues(cards,cats_position,"cat","assets/imgs/cat_80px.png");
    //now add mouse values to cards
      addValues(cards,mouse_position,'hamster',"assets/imgs/hamster_80px.png");
}

function addValues(cards,positions,class_name,img_src)
{  
    for(let i=0;i<positions.length;i++)
    {   
        cards[positions[i]].children[0].lastElementChild.classList.add(class_name);
        cards[positions[i]].children[0].lastElementChild.children[0].src=img_src;
    }
}
//reset game
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
     },2500);
     
}
//init function
 function init() {
    fhamster = 0;
     setCards(cards);
}
//function that checks for win or lose condition
function gameLogic(block)
{
    if(block.children[0].lastElementChild.classList.contains('cat'))
    { 
        showMessage("Whoops,You lost..");
        gameOver();
    }
    else  if(fhamster===7)
    {
        showMessage("Awesome,You Nailed it..");
        gameOver();
    }    
    fhamster++;
}