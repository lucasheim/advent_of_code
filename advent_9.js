const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

let input = InputReader.readFile("inputs/input_9.txt");

const pattern = /(.*) players; last marble is worth (.*) points/g;
const regex = new RegExp(pattern);
const inputData = regex.exec(input);

function getHighscoreOfMarbleGame(playersQty, marbleQty) {
  const marbleChain = [ 0 ];
  const playerTally = Array.from({length: playersQty}, p => 0);
  let currentMarble = 0;

  for (let i = 1; i <= marbleQty; i++) {
    const currentMarbleIndex = marbleChain.findIndex((val) => val === currentMarble);

    if (isUsualMarble(i)) {
      const indexToInsert = getCircularIndex(currentMarbleIndex + 1, marbleChain) + 1;
      marbleChain.splice(indexToInsert, 0, i);
      currentMarble = i;
    } else {
      const currentPlayer = i % playersQty;
      const indexToRemove = getCircularIndex(currentMarbleIndex - 7, marbleChain);
      currentMarble = marbleChain[indexToRemove + 1];
      playerTally[currentPlayer] += i + +marbleChain.splice(indexToRemove, 1);
    }
  }
  return Math.max(...playerTally);
}

function isUsualMarble(marbleNumber) {
  return marbleNumber % 23 > 0;
}

function getCircularIndex(index, marbleChain) {
  if (index < 0) {
    if (index % marbleChain.length === 0) {
      return 0;
    }
    return marbleChain.length + (index % marbleChain.length);
  }
  return index % marbleChain.length;
}

AnswerPrinter.printAnswerWithTime(getHighscoreOfMarbleGame, inputData[1], inputData[2]);
