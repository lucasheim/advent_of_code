const InputReader = require("./inputReader");

var input = InputReader.readFile("inputs/input_1.txt");
//input = "+3, +3, +4, -2, -4";

var operations = input.split("\n");
var reachedValues = {};
var sum = 0;
var repeatedNumber;

while (!repeatedNumber) {
    operations.every((number) => {
        sum += Number(number);
        if (reachedValues[sum]) {
          repeatedNumber = sum;
          return false;
        }
        reachedValues[sum] = true;
        return true;
    });
}

console.log(repeatedNumber);