const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

let input = InputReader.readFile("inputs/input_9.txt");

const pattern = /(.*) players; last marble is worth (.*) points/g;
const regex = new RegExp(pattern);
const inputData = regex.exec(input);

// As I couldn't get my previous code to handle such a big input,
// I got this amazing circular list implementation from the great Tiago Garcia
// https://dev.to/themindfuldev/comment/7e10

class Node {
  constructor(value) {
    this.value = value;
    this.right = this;
    this.left = this;
  }

  addToRight(neighbor) {
    if (this.right) {
      this.right.left = neighbor;
    }
    neighbor.right = this.right;
    neighbor.left = this;
    this.right = neighbor;
  }

  visitLeft(times = 1) {
    let node = this;
    for (let i = 0; i < times; i++) {
      node = node.left;
    }
    return node;
  }

  remove() {
    const left = this.left;
    const right = this.right;
    left.right = right;
    right.left = left;
    this.right = null;
    this.left = null;
  }
}

function getHighscoreOfMarbleGame(playersQty, marbleQty) {
  const playerTally = Array.from({length: playersQty }, p => 0);
  let currentMarble = new Node(0);

  for (let i = 1; i <= marbleQty; i++) {
    const newMarble = new Node(i);

    if (i % 23 > 0) {
      currentMarble.right.addToRight(newMarble);
      currentMarble = newMarble;
    } else {
      const currentPlayer = i % playersQty;
      const marbleToBeRemoved = currentMarble.visitLeft(7);
      playerTally[currentPlayer] += i + marbleToBeRemoved.value;
      currentMarble = marbleToBeRemoved.right;
      marbleToBeRemoved.remove();
    }
  }
  return Math.max(...playerTally);
}

AnswerPrinter.printAnswerWithTime(getHighscoreOfMarbleGame, inputData[1], inputData[2] * 100);
