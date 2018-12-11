const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

let input = InputReader.readFile("inputs/input_11.txt");

const matrix = Array.from({length: 300}, p => Array.from({length: 300}, p => 0));

let serialNumber = +input;

let maxPower = 0;
let maxPowerX;
let maxPowerY;
let maxPowerN;

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

for (let n = 1; n <= 300; n++) {
  for (let y = 0; y < (matrix.length - (n-1)); y++) {
    for (let x = 0; x < (matrix[y].length - (n-1)); x++) {
      let power = calculatePowerCell(y, x, n); 
      if (power > maxPower) {
        maxPower = power;
        maxPowerX = x;
        maxPowerY = y;
        maxPowerN = n;
      }
    }
  }
}



function calculatePowerCell(yInitial, xInitial, n) {
  let sum = 0;
  for (let y = yInitial; y < (yInitial + n); y++) {
    for (let x = xInitial; x < (xInitial + n); x++) {
      sum += matrix[y][x];
    }
  }
  return sum;
}

console.log(`${maxPowerX},${maxPowerY},${maxPowerN}`);