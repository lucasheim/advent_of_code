const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

let input = InputReader.readFile("inputs/input_6.txt");
//input = "1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9";

function findLargestNonInfiniteArea(coordinatesInput) {
  const coordinates = {};
  const pattern = /(\d*), (\d*)/g;
  const areaMapping = {};
  let index = 1;
  let minX = 9999999;
  let maxX = 0;
  let minY = 9999999;
  let maxY = 0;

  // Parse coordinates
  for (let coordinate of coordinatesInput) {
    const regex = new RegExp(pattern);
    const matches = regex.exec(coordinate);
    minX = +matches[1] < minX ? +matches[1] : minX;
    maxX = +matches[1] > maxX ? +matches[1] : maxX;
    minY = +matches[2] < minY ? +matches[2] : minY;
    maxY = +matches[2] > maxY ? +matches[2] : maxY;
    coordinates[index] = [+matches[1], +matches[2]];
    index++;
  }

  // Fill in matrix with closest coordinate available (by Manhattan distance)
  const matrix = [];
  for (let y = 0; y < maxY + 1; y++) {
    matrix[y] = matrix[y] ? matrix[y] : [];
    for (let x = 0; x < maxX + 1; x++) {
      matrix[y][x] = "";
      let minTaxicabDifference = 9999999;
      let chosenPoint = "";
      Object.keys(coordinates).map((point) => {
        const pointX = coordinates[point][0];
        const pointY = coordinates[point][1];
        const taxicabDifference = Math.abs(pointX - x) + Math.abs(pointY - y);
        if (taxicabDifference < minTaxicabDifference) {
          minTaxicabDifference = taxicabDifference;
          chosenPoint = point;
        } else if (taxicabDifference === minTaxicabDifference) {
          chosenPoint += `, ${point}`;
        }
      });
      if (chosenPoint.indexOf(",") > -1) {
        matrix[y][x] = ".";
      } else {
        areaMapping[chosenPoint] = areaMapping[chosenPoint] ? areaMapping[chosenPoint] + 1 : 1;
        matrix[y][x] = chosenPoint;
      }
    }
  }

  // Clear mapping of infinite ones (the ones who touch the borders)
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i === 0 || j === 0) {
        areaMapping[matrix[i][j]] = 0;
      }
    }
  }
  return Math.max(...Object.values(areaMapping));
}

AnswerPrinter.printAnswerWithTime(findLargestNonInfiniteArea, input.split("\n"));