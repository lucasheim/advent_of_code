const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");
const assert = require ("assert");

//let input = InputReader.readFile("inputs/input_9.txt");
//input = InputReader.readFile("inputs/input_8_test.txt");

const playersQty = 404;
const marbleQty = 71852;

let marbleChain = [ 0 ];
const playerTally = {};
let currentMarble = 0;
let currentPlayer = 1;

function getHighscoreOfMarbleGame() {
  for (let i = 1; i <= marbleQty; i++) {
    const currentMarbleIndex = marbleChain.findIndex((val) => val === currentMarble);
    if (i % 23 === 0) {
      playerTally[currentPlayer] = playerTally[currentPlayer] ? playerTally[currentPlayer] + i : i;
      const indexToRemove = currentMarbleIndex - 7;
      currentMarble = marbleChain[indexToRemove + 1];
      const removedMarble = marbleChain.splice(indexToRemove, 1);
      playerTally[currentPlayer] += removedMarble[0];
    } else {
      const indexToInsert = getIndex(currentMarbleIndex + 1) + 1;
      marbleChain.splice(indexToInsert, 0, i);
      currentMarble = i;
    }
    currentPlayer++;
    if (currentPlayer > playersQty) currentPlayer = 1;
  }

  return Math.max(...Object.values(playerTally));
}

function getIndex(index) {
  if (index < 0) {
    if (index % marbleChain.length === 0) {
      return 0;
    }
    return marbleChain.length + (index % marbleChain.length);
  }
  return index % marbleChain.length;
}

AnswerPrinter.printAnswerWithTime(getHighscoreOfMarbleGame);
