const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

let input = InputReader.readFile("inputs/input_11.txt");

const matrix = Array.from({length: 300}, p => Array.from({length: 300}, p => 0));
const powerCells = {};

let serialNumber = input;
serialNumber = 8868;

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    let rackId = x + 10;
    let power = rackId * y;
    power += Number(serialNumber);
    power *= rackId;
    if (String(power).length >= 3) {
      power = String(power).charAt(String(power).length - 3);
    } else {
      power = 0;
    }
    power -= 5;
    matrix[y][x] = power;
  }
}

for (let y = 0; y < matrix.length - 2; y++) {
  for (let x = 0; x < matrix[y].length - 2; x++) {
    powerCells[`${x},${y}`] = calculatePowerCell(y, x);
  }
}

function calculatePowerCell(yInitial, xInitial) {
  let sum = 0;
  for (let y = yInitial; y < yInitial + 3; y++) {
    for (let x = xInitial; x < xInitial + 3; x++) {
      sum += matrix[y][x];
    }
  }
  return sum;
}

let highestSum = Math.max(...Object.values(powerCells));
console.log(Object.keys(powerCells).find(c => powerCells[c] === highestSum));