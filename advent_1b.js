const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

const input = InputReader.readFile("inputs/input_1.txt");
//input = "+3, +3, +4, -2, -4";

function findFirstRepeatedSum(operations) {
    const reachedValues = {};
    let sum = 0;
    
    while (true) {
        for (let operation of operations) {
            sum += Number(operation);
            if (reachedValues[sum]) return sum;
            reachedValues[sum] = true;
        }
    }
}

AnswerPrinter.printAnswerWithTime(findFirstRepeatedSum, input.split("\r\n"));