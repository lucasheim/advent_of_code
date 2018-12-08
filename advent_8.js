const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

let input = InputReader.readFile("inputs/input_8.txt");
//input = InputReader.readFile("inputs/input_8_test.txt");

let sum = 0;

function countMetadataEntries(entries) {
  buildTree(entries);
  return sum;
}

function buildTree(entries) {
  const childQty = Number(entries.shift());
  const metadataQty = Number(entries.shift());

  for (var i = 0; i < childQty; i++) {
    entries = buildTree(entries);
  }

  for (var i = 0; i < metadataQty; i++) {
    sum += Number(entries.shift());
  }

  return entries;
}

AnswerPrinter.printAnswerWithTime(countMetadataEntries, input.split(" "));