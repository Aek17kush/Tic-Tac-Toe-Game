let boxs = document.querySelectorAll(".box");
let newGame = document.querySelector(".new-game");
let result = document.getElementsByTagName("h2")[0];
let opponent = document.querySelectorAll('input[name="opponent"]');
window.scrollTo({ left: 0, top: 0, behavior: "smooth" });

let vsComp = true;
let turnOfX = true;
let count = 0;
let rounds = 1;
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let arr = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];

const checkWinner = () => {
    for (let ele of arr) {
        if ((board[ele[0]] === board[ele[1]]) && (board[ele[1]] === board[ele[2]]) && (board[ele[2]] !== 0)) {
            result.innerHTML = "<pre><p>&#127882;&#127882;Congratulations&#127882;&#127882;</p>    Winner: Player " + boxs[ele[2]].innerHTML + "&#127942;</pre>";
            document.querySelector(".box-container").classList.add("disabledbutton");
            document.getElementsByTagName("td")[+ turnOfX].innerHTML = 1 + +(document.getElementsByTagName("td")[+ turnOfX].innerHTML);
            rounds = rounds + 1;
            return true
        }
    }
}

/////////////// code to play vs AI

const analyzeboard = () => {
    for (let i = 0; i < 8; i++) {
        if (board[arr[i][0]] != 0 && board[arr[i][0]] == board[arr[i][1]] && board[arr[i][0]] == board[arr[i][2]])
            return board[arr[i][0]]
    }
    return 0
}

const minmax = (player) => {
    let x = analyzeboard(board)
    if (x != 0) {
        return x * player
    }
    let pos = -1
    let value = -2
    for (let i = 0; i < 9; i++) {
        if (board[i] == 0) {
            board[i] = player
            let score = -minmax(player * -1)
            board[i] = 0
            if (score > value) {
                value = score
                pos = i
            }
        }
    }
    if (pos == -1) {
        return 0
    }
    return value
}

const computerTurn = () => {
    let pos = -1;
    let value = -2
    for (let i = 0; i < 9; i++) {
        if (board[i] == 0) {
            board[i] = 1
            let score = -minmax(-1)
            board[i] = 0;
            if (score > value) {
                value = score
                pos = i
            }
        }
    }
    board[pos] = 1
    return pos
}

////////////////////////////////

const reset = () => {
    document.querySelector(".box-container").classList.remove("disabledbutton");
    result.innerHTML = "Round #" + rounds;
    count = 0;
    boxs.forEach((val, index) => {
        val.innerHTML = "";
        val.disabled = false;
        board[index] = 0
    })
}

const mark = (e) => {
    if (!vsComp) {
        if (turnOfX) {
            e.target.innerHTML = "X";
            board[Number(e.target.id)] = -1;
        }
        else {
            e.target.innerHTML = "O";
            board[Number(e.target.id)] = 1;
        }
        if (e.target.disabled = true) {
            count = count + 1;
        }
        turnOfX = !turnOfX;
        if (!checkWinner() && count == 9) {
            result.innerHTML = "Draw";
            rounds = rounds + 1;
        }
    }
    else {
        e.target.innerHTML = "X";
        board[Number(e.target.id)] = -1;
        e.target.disabled = true;
        count = count + 1;
        turnOfX = !turnOfX;
        if (!checkWinner() && count == 9) {
            result.innerHTML = "Draw";
            rounds = rounds + 1;
            return;
        }

        // computers turn 

        setTimeout(() => {
            let pos = computerTurn()
            boxs[pos].innerHTML = "O";
            boxs[pos].disabled = true;
            count = count + 1;
            if (!checkWinner() && count == 9) {
                result.innerHTML = "Draw";
                rounds = rounds + 1;
            }
            turnOfX = !turnOfX;
        }, 500);
    }
}

boxs.forEach((val) => {
    val.addEventListener("click", (evt) => { mark(evt) });
})

newGame.addEventListener("click", () => {
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    document.getElementsByTagName("td")[0].innerHTML = "0";
    document.getElementsByTagName("td")[1].innerHTML = "0";
    for (const oppo of opponent) {
        if (oppo.checked) {
            vsComp = Boolean(Number(oppo.value));
            break;
        }
    }
    setTimeout(() => { newGame.innerHTML = "New Game"; }, 1000);
    rounds = 1;
    reset();
})

const backToHome = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
}
