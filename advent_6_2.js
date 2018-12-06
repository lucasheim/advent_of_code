const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

let input = InputReader.readFile("inputs/input_6.txt");
//input = "1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9";

function findRegion(coordinatesInput) {
  const coordinates = {};
  const pattern = /(\d*), (\d*)/g;
  let charCode = 1;

  let minX = 9999999;
  let maxX = 0;
  let minY = 9999999;
  let maxY = 0;

  for (let coordinate of coordinatesInput) {
    const regex = new RegExp(pattern);
    const matches = regex.exec(coordinate);
    minX = +matches[1] < minX ? +matches[1] : minX;
    maxX = +matches[1] > maxX ? +matches[1] : maxX;
    minY = +matches[2] < minY ? +matches[2] : minY;
    maxY = +matches[2] > maxY ? +matches[2] : maxY;
    coordinates[charCode] = [+matches[1], +matches[2]];
    charCode++;
  }

  const matrix = [];

  let regionSize = 0;

  for (let y = 0; y < maxY + 1; y++) {
    matrix[y] = matrix[y] ? matrix[y] : [];
    for (let x = 0; x < maxX + 1; x++) {
      matrix[y][x] = "";
      let taxiCabDifferenceSum = 0;
      Object.keys(coordinates).map((point) => {
        const pointX = coordinates[point][0];
        const pointY = coordinates[point][1];
        const taxicabDifference = Math.abs(pointX - x) + Math.abs(pointY - y);
        taxiCabDifferenceSum += taxicabDifference;
      });
      if (taxiCabDifferenceSum < 10000) {
        regionSize++;
      }
    }
  }
  return regionSize;
}

AnswerPrinter.printAnswerWithTime(findRegion, input.split("\n"));