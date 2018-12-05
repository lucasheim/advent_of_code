const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

var input = InputReader.readFile("inputs/input_1.txt");
//input = "+3, +3, +4, -2, -4";

function sumOperations(operations) {
  return operations.reduce((acc, operation) => acc + Number(operation), 0);
}

AnswerPrinter.printAnswerWithTime(sumOperations, input.split("\r\n"));

