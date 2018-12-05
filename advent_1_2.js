const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

var input = InputReader.readFile("inputs/input_1.txt");
//input = "+3, +3, +4, -2, -4";

function findFirstRepeatedSum(operations) {
    var reachedValues = {};
    var sum = 0;
    
    while (true) {
        for (let operation of operations) {
            sum += Number(operation);
            if (reachedValues[sum]) return sum;
            reachedValues[sum] = true;
        }
    }
}

AnswerPrinter.printAnswerWithTime(findFirstRepeatedSum, input.split("\r\n"));