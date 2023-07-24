import { returnStatement } from "babel-types";
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
    //looks for specific row in the game to delete letter. Have 6 rows, each time wrong guess made, one row disappears.
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    
    //inside that row, there are boxes, want to find the box where the last letter was placed. We know which box to find 'nextLetter'. Need to go back one step, to the box where the letter we want to delete is. "nextLetter - 1"
    let box = row.children[nextLetter - 1]

    //with right box found, we remove the letter from it
    box.textContent = ""

    //show box is empty now, by removing 'filled-box'
    box.classList.remove("filled-box")

    //update list of letters guessed
    currentGuess.pop()

    //tell game we removed a letter form box. move to previous box.
    nextLetter -=1
}

function checkGuesses() {
    let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]
    let get = guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length !=5) {
        toastr.error("Not enough Letters! ")
        return
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Word not in list!")
        returnStatement
    }

    for (let i = 0; i< 5; i++) {
        let letterColor = ''
        let box = row,children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        //is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            if (currentGuess[i] === rightGuess[i]) {
                //shade green
                letterColor = 'green'
            } else {
                //shade yellow
                letterColor = 'yellow'
            }
            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(() => {
            //shade box
            box.style.backgroundColor = letterColor
            ShadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        toastr.success("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!")
            toastr.info(`The right word was: "${rightGuessString}"`)
        }
    }
}

