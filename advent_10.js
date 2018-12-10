const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

let input = InputReader.readFile("inputs/input_10.txt");
//input = InputReader.readFile("inputs/input_10_test.txt");

class PointGrid {
  constructor() {
    this.points = [];
    this.grid = [];
  }

  initializeGrid() {
    this.grid = Array.from({length: this.getMaxWidth() + 1}, p => Array.from({length: this.getMaxHeight() + 1}, i => "."));
  }

  insertPoint(point) {
    this.points.push(point);
  }

  movePoints() {
    for (let point of this.points) {
      point.move();
    }
  }

  movePointsBack() {
    for (let point of this.points) {
      point.moveBack();
    }
  }

  getMaxHeight() {
    const yPositions = this.points.map(p => p.y);
    const maxY = Math.max(...yPositions);
    const minY = Math.min(...yPositions);
    return maxY - minY;
  }

  getMaxWidth() {
    const xPositions = this.points.map(p => p.x);
    const maxX = Math.max(...xPositions);
    const minX = Math.min(...xPositions);
    return maxX - minX;
  }

  drawPoints() {
    for (let point of this.points) {
      const x = point.x - this.getMinX();
      const y = point.y - this.getMinY();
      this.grid[x][y] = "#";
    }
  }

  drawGrid() {
    for (let row of this.grid) {
      console.log(row.join(""));
    }
  }

  getMinX() {
    const xPositions = this.points.map(p => p.x);
    const minX = Math.min(...xPositions);
    return minX;
  }

  getMinY() {
    const yPositions = this.points.map(p => p.y);
    const minY = Math.min(...yPositions);
    return minY;
  }
}

class Point {
  constructor(x, y, xVel, yVel) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
  }

  move() {
    this.x += this.xVel;
    this.y += this.yVel;
  }

  moveBack() {
    this.x -= this.xVel;
    this.y -= this.yVel;
  }
}

const pattern = /position=<(?<y>.*),(?<x>.*)> velocity=<(?<yVel>.*),(?<xVel>.*)>/;

function printStarsPosition(entries) {
  const grid = new PointGrid();

  for (let entry of entries) {
    const { x, y, xVel, yVel } = entry.match(pattern).groups;
    const point = new Point(+x, +y, +xVel, +yVel);
    grid.insertPoint(point);
  }

  let minHeight = grid.getMaxHeight();
  let foundMinimumHeight = false;
  let secondsPassed = 0;

  while (!foundMinimumHeight) {
    secondsPassed++;
    grid.movePoints();
    const maxGridHeight = grid.getMaxHeight(); 
    if (maxGridHeight < minHeight) {
      minHeight = maxGridHeight;
    } else {
      foundMinimumHeight = true;
      secondsPassed--;
      grid.movePointsBack();
    }
  }

  grid.initializeGrid();
  grid.drawPoints();
  grid.drawGrid();

  return secondsPassed;
}

AnswerPrinter.printAnswerWithTime(printStarsPosition, input.split("\r\n"));
