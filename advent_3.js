const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

const input = InputReader.readFile("inputs/input_3.txt");
//input = "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 4,4: 2x2";

function countOverlappingFabric(boxes) {
  const pattern = /\#([\d]*) @ ([\d]*),([\d]*): (\d*)x(\d*)/g;
  const matrix = {};
  let count = 0;

  for (let box of boxes) {
    const regex = new RegExp(pattern);
    const matches = regex.exec(box);
    const id = matches[1];
    const x = Number(matches[3]) + 1;
    const y = Number(matches[2]) + 1;
    const width = Number(matches[4]);
    const height = Number(matches[5]);

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