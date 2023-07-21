import { WORDS} from "./words.js";

const NUMBER_OF_GUESSES = 6;
let GuessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0; //the index of array
//  generating a random no.between 0 - 1, take this number and multiply buy
let rightGuessString = WORDS[Math.floor(Math.random() * words.length )]
console.log (rightGuessString)

function initBoard() {
    // Create a function named 'initBoard'.
    let board = document.getElementById('game-board');
    // Look for an HTML element with the ID 'game-board' and store it in the variable 'board'.
  
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
      // Start a loop that counts from 0 up to the value of 'NUMBER_OF_GUESSES'.
  
      let row = document.createElement("div");
      // Create a new HTML element (a <div> element) and store it in the variable 'row'.
  
      box.className = "letter-box";
      // Add a CSS class name 'letter-box' to the variable 'box' (it seems like 'box' was intended to be 'row').
  
      row.appendChild(box);
      // Add the 'box' (which has a class 'letter-box') as a child inside the 'row'.
  
    }
    // End of the loop. The loop will repeat 'NUMBER_OF_GUESSES' times.
  
    board.appendChild(row);
    // Add the 'row' to the 'game-board'. (Note: This line should be inside the loop to work as expected)
  }
  // End of the 'initBoard' function.

initBoard