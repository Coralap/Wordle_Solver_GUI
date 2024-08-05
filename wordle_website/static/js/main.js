import { bestWords, averageLetterPosition } from './words.js';
import { words } from './contents.js';
import { listMatches } from './wordle.js';

var spam = false;

// document.addEventListener('DOMContentLoaded', () => {
function getRandom() {
    return words[Math.floor(Math.random() * words.length)];
}
var word = getRandom();


const grid = document.querySelector('.grid');
const bot_grid = document.querySelector('.bot_body').querySelector('.grid');
const keys = document.querySelectorAll('.key');
const keyMap = {};
let currentRow = 0;
let currentCell = 0;
     let answers = [];
// console.log("kys")

// console.log(bestWords(words, averageLetterPosition));
keys.forEach(button => {
    keyMap[button.getAttribute('data-key')] = button;
});
// Handle keypress events
document.addEventListener('keydown', (e) => {
    const key = getKeyFromEvent(e);
    handleKeyPress(key);
});

// Handle button clicks
keys.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');
        if (key) {
            handleKeyPress(key);
        }
    });
});

function getKeyFromEvent(e) {
    if (e.key === 'Enter') {
        return 'Enter';
    } else if (e.key === 'Backspace') {
        return 'Backspace';
    } else {
        return e.key; // For Hebrew letters
    }
}
            let correct_letters = [];
            let correct_positions = [];
            let wrong_letters = [];
function handleKeyPress(key) {
    if (key === 'Enter') {

        // Handle enter key logic
        if (currentCell === 5) {
            let cells=[]
            let cells_word = '';
            let isCorrect =true;
            
            for(let i =0; i<5; i++){
                cells.push(getCell(currentRow,i));
                cells_word +=getCell(currentRow,i).textContent;
            }
            if (!words.includes(cells_word)) {
                
                fadeOut(document.querySelector('.warning'))
                return;
            };
            
            let letters_in_word = Array.from(word);
            
            const result = cells.filter((word,index) => word.textContent ===letters_in_word[index]);
            
            cells.forEach((element,index) =>{
                //if there are more letters in the actual word then the answer given no more yellow boys
                const num_letters_in_result = (result.filter(x => x.textContent===element.textContent)).length;
                const num_letters_in_word = (letters_in_word.filter(x => x===element.textContent)).length;
                const num_letters_in_cells= (cells.filter(x => x.textContent===element.textContent)).length;
                const is_yellow = (num_letters_in_word>=num_letters_in_cells)
                if(letters_in_word.includes(element.textContent)){
                    element.classList.add("yellow_letter");
                } else if (element.textContent !== letters_in_word[index]) {
                    element.classList.add("wrong_letter");
                }
                if (num_letters_in_word === num_letters_in_result) {
                    element.classList.remove("yellow_letter");
                    element.classList.add("wrong_letter");
                }
                
                // Update button colors
                const button = keyMap[element.textContent];
                if (button) {
                    button.classList.add("wrong_letter");
                }
            });
            
            if (result.length !== 5) {
                isCorrect = false;
            }
            result.forEach((element) => {
                element.classList.add("correct");
                element.classList.remove("wrong_letter");
                 element.classList.remove("yellow_letter");
                // Update button colors
                const button = keyMap[element.textContent];
                if (button) {
                    button.classList.add("correct");
                    button.classList.remove("wrong_letter");
                }
            });
            

            // BOT
       const bot_cells = []
            for(let i =0; i<5; i++){
                bot_cells.push(getBotCell(currentRow,i));
            }

            let bot_guess = listMatches(correct_letters, words, correct_positions, wrong_letters,answers, currentRow);
            answers = [];

            bot_cells.forEach((element, index) => {
                element.textContent = Array.from(bot_guess)[index];
            });


            console.log(bot_cells);

            console.log(answers);
            //bot section


            const bot_result = bot_cells.filter((word,index) => word.textContent ===letters_in_word[index]);


            bot_cells.forEach((element,index) =>{
                //if there are more letters in the actual word then the answer given no more yellow boys
                const bott_num_letters_in_result = (bot_result.filter(x => x.textContent===element.textContent)).length;
                const bot_num_letters_in_word = (letters_in_word.filter(x => x===element.textContent)).length;
                const bot_num_letters_in_cells= (bot_cells.filter(x => x.textContent===element.textContent)).length;

                const is_yellow = (bot_num_letters_in_word>=bot_num_letters_in_cells);

                if(letters_in_word.includes(element.textContent)){
                    element.classList.add("yellow_letter");
                } else if (element.textContent !== letters_in_word[index]) {
                    element.classList.add("wrong_letter");
                }
                if (bot_num_letters_in_word === bott_num_letters_in_result) {
                    element.classList.remove("yellow_letter");
                    element.classList.add("wrong_letter");
                }
            });
            bot_result.forEach((element) => {
                element.classList.add("correct");
                element.classList.remove("wrong_letter");
                 element.classList.remove("yellow_letter");
                // Update button colors
            });
          bot_cells.forEach((element, index) => {
                if (element.classList.contains("correct")) {

                    correct_letters.push([element.textContent, index]);
                    answers.push(1);
                }
                if (element.classList.contains("yellow_letter")) {
                    correct_positions.push([element.textContent, index]);
                    answers.push(0);
                }
                if (element.classList.contains("wrong_letter")) {
                    wrong_letters.push(element.textContent);
                    answers.push(-1);
                }
            });




            currentRow++;
            currentCell = 0;

        }
    } else if (key === 'Backspace') {
        // Handle backspace logic
        if (currentCell > 0) {
            currentCell--;
            const cell = getCell(currentRow, currentCell);
            cell.textContent = '';
        }
    } else if (/^[א-ת]$/.test(key)) {
        // Handle letter key logic
        if (currentCell < 5) {
            const cell = getCell(currentRow, currentCell);
            cell.textContent = key;
            cell.style.direction = 'rtl'; // Ensure text is right-to-left
            currentCell++;
        }
    }
}


function getCell(row, cell) {
    return grid.children[row].children[4-cell];
}

function getBotCell(row, cell) {
    return bot_grid.children[row].children[4 - cell];
}
// });

function fadeOut(el) {
    if (spam) return;
    var opacity = 1; // Initial opacity
    var interval = setInterval(function () {
        spam = true;
        if (opacity > 0) {
            opacity -= 0.1;
            el.style.opacity = opacity;
        } else {
            clearInterval(interval); // Stop the interval when opacity reaches 0
            spam = false;
        }
    }, 150);
}

