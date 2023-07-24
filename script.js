import { WORDS} from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}
initBoard()
//set up event listener for the keyup event
document.addEventListener("keyup", (e) => {

    //event listerner will not execute further when gussesReamianing === 0
    if (guessesRemaining === 0) {
        return
    }
    //e.key is the pressed key from event, stored in variable 'pressedKey' as a string
    let pressedKey = String(e.key)

    //nextLetter !== 0: It checks if the variable nextLetter is not equal to 0. This suggests that there is a letter to delete (at the current cursor position)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

//define insertLetter function
function insertLetter (pressedKey) {
    if(nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-roe")[6 = guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add('filled-box')
    currentGuess.push(pressedKey)
    nextLetter += 1
}