let boxs = document.querySelectorAll(".box");
let newGame = document.querySelector(".new-game");
let result = document.getElementsByTagName("h2")[0];
window.scrollTo({ left: 0, top: 0, behavior: "smooth" });


let turnOfX = true;
let count = 0;
let rounds = 1;

let arr=[[1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9], 
        [1,5,9],
        [3,5,7]];

const checkWinner = () =>{
    arr.forEach((ele) => {
        if((boxs[ele[0]-1].innerHTML === boxs[ele[1]-1].innerHTML) && (boxs[ele[1]-1].innerHTML === boxs[ele[2]-1].innerHTML) &&(boxs[ele[2]-1].innerHTML !== "")){
            result.innerHTML = "<pre><p>&#127882;&#127882;Congratulations&#127882;&#127882;</p>    Winner: Player " + boxs[ele[2]-1].innerHTML + "&#127942;</pre>";
            document.querySelector(".box-container").classList.add("disabledbutton");
            document.getElementsByTagName("td")[+ turnOfX].innerHTML = 1 + +(document.getElementsByTagName("td")[+ turnOfX].innerHTML);
            rounds = rounds + 1;
        }
    })
}

const reset = () =>{
    document.querySelector(".box-container").classList.remove("disabledbutton");
    result.innerHTML = "Round #"+ rounds;
    count = 0;
    boxs.forEach((val) => {
        val.innerHTML = "";
        val.disabled = false;
    })
}

const mark = (e) =>{
    if(turnOfX){
        e.target.innerHTML = "X";
    }
    else{
        e.target.innerHTML = "O";
    }
    if(e.target.disabled = true){
        count = count + 1;
    }
    if(count == 9){
        result.innerHTML = "Draw";
        rounds = rounds + 1;
    }
    checkWinner()
    turnOfX = !turnOfX;
}

boxs.forEach((val) => {
    val.addEventListener("click", (evt) => {mark(evt)});
})

newGame.addEventListener("click",() => {
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    document.getElementsByTagName("td")[0].innerHTML = "0";
    document.getElementsByTagName("td")[1].innerHTML = "0";
    setTimeout(() => {newGame.innerHTML = "New Game";}, 1000);
    rounds = 1;
    reset();
})

const backToHome = () =>{
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
}