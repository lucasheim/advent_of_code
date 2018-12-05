const InputReader = require("./inputReader");

var input = InputReader.readFile("inputs/input_1.txt");
//input = "+3, +3, +4, -2, -4";

console.log(
  input.split("\n").reduce((acc, operation) => acc + Number(operation), 0)
);