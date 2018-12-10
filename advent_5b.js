const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

const input = InputReader.readFile("inputs/input_5.txt");
//input = "dabAcCaCBAcCcaDA";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Props to Ali Spittel for the stack solution https://dev.to/aspittel/comment/7bid
function react(letters) {
  const stack = [];
  for (let char of letters.split("")) {
    const top = stack[stack.length - 1];
    if (top && top.toLowerCase() === char.toLowerCase() && top !== char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  return stack.length;
}

function findShortestPolymer(letters) {
  let min = 99999999;
  for (let letter of alphabet.split("")) {
    const polymerQuantity = react(letters.replace(new RegExp(letter, "ig"), ""));
    min = polymerQuantity < min ? polymerQuantity : min;
  }
  return min;
}

AnswerPrinter.printAnswerWithTime(findShortestPolymer, input);