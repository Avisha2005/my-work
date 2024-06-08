let boxes =document.querySelectorAll(".box");
let resetBtn =document.querySelector("#reset-btn");
let Newgamebtn =document.querySelector("#new-btn");
let msgcontainer =document.querySelector(".msg-container");
let msg =document.querySelector("#msg");

let turnO = true;//playerx,playery

const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

// test my code

const resetgame =() => {
   trunO=true;
   enableBoxes();
   msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText ="O";
            turnO=false;
        }else{
            box.innerText ="X";
            turnO=true;

        }
        box.disabled =true;

        checkWinner();
    }); 
});

const disableBoxes =() => {
    for(let box of boxes) {
        box.disabled =true;
    }
};
const enableBoxes =() => {
    for(let box of boxes) {
        box.disabled =false;
        box.innerText ="";
    }
};

const showWinner =(winner) => {
     msg.innerText =`congratulations,winner is ${winner}`;
     msgcontainer.classList.remove("hide");
     disableBoxes();
}

const checkWinner = () => {
 for( let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
       

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val ===pos2Val && pos2Val=== pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

Newgamebtn.addEventListener("click",resetgame);
resetBtn.addEventListener("click",resetgame);