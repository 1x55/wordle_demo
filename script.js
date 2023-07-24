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
    //check if 5 letters have already been placed, If yes, function stop here and do nothing.
    if(nextLetter === 5) {
        return
    }
    //convert pressedKey to lowercase (this allows us to handle both upper and lowercases)
    pressedKey = pressedKey.toLowerCase()

    //looks at rows in the game. Imagine you have 6 rows and each time you make a guess, one row disappears. We want to find the row where you should put the next letter. so we look for row thats still not missing
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    
    //Each row has 5 boxes, and we want to find the empty one to put the letter in. So we look at the box number that matched the number of letters we already guessed (if we guessed one letter its box number 1)
    let box = row.children[nextLetter]

    //found the right box, place letter pressed into that box.
    box.textContent = pressedKey

    //show that this box is not empty anymore, so add special sticker "filled-box"
    box.classList.add('filled-box')

    //to remember the letters guessed,
    currentGuess.push(pressedKey)

    nextLetter += 1
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6 = guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -=1
}