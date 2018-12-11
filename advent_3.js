const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

const input = InputReader.readFile("inputs/input_3.txt");
//input = "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 4,4: 2x2";

function countOverlappingFabric(boxes) {
  const pattern = /\#([\d]*) @ (?<yValue>[\d]*),(?<xValue>[\d]*): (?<widthValue>\d*)x(?<heightValue>\d*)/;
  const matrix = {};
  let count = 0;

  for (let box of boxes) {
    const { xValue, yValue, widthValue, heightValue } = box.match(pattern).groups;
    const x = +xValue + 1;
    const y = +yValue + 1;
    const width = +widthValue;
    const height = +heightValue;  

    for (let i = x; i < x + height; i++) {
      matrix[i] = matrix[i] ? matrix[i] : {};
      for (let j = y; j < y + width; j++) {
        matrix[i][j] = matrix[i][j] ? matrix[i][j] + 1 : 1;
        if (matrix[i][j] === 2) {
          count++;
        }
      }
    }
  }
  return count;
}

AnswerPrinter.printAnswerWithTime(countOverlappingFabric, input.split("\n"));