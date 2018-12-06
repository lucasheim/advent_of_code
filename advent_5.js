const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

const input = InputReader.readFile("inputs/input_5.txt");
//var input = "dabAcCaCBAcCcaDA";

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

AnswerPrinter.printAnswerWithTime(react, input);

