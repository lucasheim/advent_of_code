const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

const input = InputReader.readFile("inputs/input_3.txt");
//input = "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2";


function findNonOverlappingClaim(boxes) {
  const pattern = /\#([\d]*) @ ([\d]*),([\d]*): (\d*)x(\d*)/g;
  const matrix = {};
  const boxesArea = {};

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
      }
    }
  }

  for (let box of boxes) {
    const regex = new RegExp(pattern);
    const matches = regex.exec(box);
    const id = matches[1];
    const x = Number(matches[3]) + 1;
    const y = Number(matches[2]) + 1;
    const width = Number(matches[4]);
    const height = Number(matches[5]);
    let overlap = false;

    for (let i = x; i < x + height && !overlap; i++) {
      for (let j = y; j < y + width && !overlap; j++) {
        if (matrix[i][j] > 1) overlap = true;
      }
    }

    if (!overlap) return id;
  }
}

AnswerPrinter.printAnswerWithTime(findNonOverlappingClaim, input.split("\n"));