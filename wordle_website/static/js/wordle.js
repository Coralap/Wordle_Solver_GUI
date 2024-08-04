const deepcopy = require('deepcopy');
const contents = require('./contents');
const getRandomWord = require('./get_random_word');
const words = require('./words');

let word = "";
let i = 0;

function startGame() {
    i = 0;
    word = getRandomWord.getRandom();
    // word="קלזיו"
    // console.log(word);
}

function gameLoop(wordGuess) {
    while (i < 6) {
        const wordTry = wordGuess;
        if (wordTry.length !== 5 || !contents.contents.includes(wordTry)) {
            console.log("please enter a real 5 letter word: ", wordTry);
            continue;
        }
        const charList = [...wordTry];
        const answer = [];
        for (let n = 0; n < 5; n++) {
            // if letter is correct make green
            if ([...word][n] === charList[n]) {
                answer.push(1);
            }
            // else if letter is in the word make yellow
            else if (charList[n] in [...word]) {
                answer.push(0);
            }
            // else make gray
            else {
                answer.push(-1);
            }
        }
        // if all letters are correct
        if (answer.every(val => val === 1)) {
            // console.log("guessed result: ", wordGuess);
            console.log("you won!");
            return answer;
        }

        i += 1;
        return answer;
    }
}

function match(word, greenLetters, yellowLetters, wrongLetters) {
    // if the pattern is longer than the word, it can't be a match
    if (greenLetters.length > word.length) {
        throw new Error(`pattern is longer than word: ${greenLetters} ${word}`);
    }

    // green letters must appear in the word in the correct place
    if (!greenLetters.every(([c, pos]) => word[pos] === c)) {
        return false;
    }

    // if a letter appears in the same place as the same yellow letter then bad.
    // stops at first wrong letter
    if (yellowLetters.some(([c, pos]) => word[pos] === c)) {
        return false;
    }

    // yellow letters must appear in the word
    if (yellowLetters.some(([c]) => !word.includes(c))) {
        return false;
    }

    // gray letters must not appear in the word
    if (wrongLetters.some(c => word.includes(c))) {
        return false;
    }

    return true;
}

function getWordWithoutUsedWords(words, lettersToAvoid) {
    return !lettersToAvoid.some(c => words.includes(c));
}

function countAmountFromListToList(list1, list2) {
    const commonLetters = list1.filter(letter => list2.includes(letter));
    return commonLetters.length;
}

function listMatches(correctLetters, allWords, yellowLetters, wrongLetters, guessResults, turn) {
    console.log(guessResults);
    const common = (
        correctLetters.some(([letter]) => words.commonLetters.includes(letter)) &&
        countAmountFromListToList(words.commonLetters, correctLetters.map(([letter]) => letter)) >= 2
    );

    if (
        ((guessResults.filter(val => val === 1).length >= 3 && guessResults.filter(val => val === -1).length <= 2) && turn < 4) ||
        (common && turn < 4 && yellowLetters.length === 0)
    ) {
        console.log("run");

        let lettersToAvoid = [];

        correctLetters.forEach(([letter]) => lettersToAvoid.push(letter));
        yellowLetters.forEach(([letter]) => lettersToAvoid.push(letter));
        lettersToAvoid = [...new Set([...lettersToAvoid, ...wrongLetters])];

        const newMatch = allWords.filter(word => getWordWithoutUsedWords(word, lettersToAvoid));
        console.log(lettersToAvoid);
        const [newBestWords, bestScore] = words.bestWords(newMatch, words.averageLetterPosition);
        console.log(newBestWords);
        if (newBestWords.length > 0) {
            console.log("new word time!");
            return newBestWords[0];
        }
    }

    const matches = allWords.filter(word => match(word, correctLetters, yellowLetters, wrongLetters));
    const [bestWords, bestScore] = words.bestWords(matches, words.averageLetterPosition);
    return bestWords[0];
}

function guesser() {
    startGame();
    let yellowLetters = [];
    let wrongLetters = [];
    let greenLetters = [];
    let wordGuess = "ליורה";

    for (let i = 0; i < 6; i++) {
        greenLetters = [...new Set(greenLetters)];
        // console.log("guessed word: ", wordGuess);
        console.log(wordGuess);
        const guessResults = gameLoop(wordGuess);

        // const guessResults = [];
        // for (let l = 0; l < 5; l++) {
        //     const guessResult = parseInt(prompt("enter result"));
        //     guessResults.push(guessResult);
        // }

        if (i === 5) {
            console.log("guessed word: ", wordGuess);
            console.log(guessResults);
        }

        const dictionary = contents.words;
        if (guessResults.every(val => val === 1)) {
            return true;
        }

        if (!guessResults) {
            return;
        }
        for (let n = 0; n < 5; n++) {
            if (guessResults[n] === 1) {
                if (!greenLetters.some(([letter, pos]) => letter === wordGuess[n] && pos === n)) {
                    greenLetters.push([wordGuess[n], n]);
                }
            } else if (guessResults[n] === 0) {
                yellowLetters.push([wordGuess[n], n]);
            } else {
                wrongLetters.push(wordGuess[n]);
            }
        }

        if (greenLetters.length > 0 || yellowLetters.length > 0 || wrongLetters.length > 0) {
            wordGuess = listMatches(greenLetters, dictionary, yellowLetters, wrongLetters, guessResults, i);
        } else {
            wordGuess = getRandomWord.getRandom();
        }
        if (!wordGuess) {
            wordGuess = getRandomWord.getRandom();
        }
    }

    console.log("you lost");
    return false;
}

if (require.main === module) {
    let correct = 0;
    for (let i = 0; i < 100; i++) {
        if (guesser()) {
            correct += 1;
        }
        console.log("=========================================");
    }
    console.log(correct / 100);
}