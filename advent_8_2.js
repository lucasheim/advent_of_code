const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

let input = InputReader.readFile("inputs/input_8.txt");
//input = InputReader.readFile("inputs/input_8_test.txt");

const tree = {};
let charCode = 65;

class Node {
  constructor(id) {
    this.id = id;
    this.children = [];
    this.metadataSum = 0;
  }

  addChild(child) {
    this.children.push(child);
  }
}

function countMetadataEntries(entries) {
  buildTree(entries);
  return tree['A'].metadataSum;
}

function buildTree(entries, parent) {
  const id = String.fromCharCode(charCode++);
  const node = new Node(id);
  if (parent) {
    parent.addChild(node);
  } else {
    tree[id] = node;
  }
  const childQty = Number(entries.shift());
  const metadataQty = Number(entries.shift());

  for (var i = 0; i < childQty; i++) {
    entries = buildTree(entries, node);
  }

  let sum = 0;
  if (childQty === 0) {
    for (var i = 0; i < metadataQty; i++) {
      sum += Number(entries.shift());
    }
  } else {
    for (var i = 0; i < metadataQty; i++) {
      let value = Number(entries.shift()) - 1;
      if (node.children[value] && node.children[value].metadataSum) {
        sum += +node.children[value].metadataSum;
      }
    }
  }
  node.metadataSum = sum;

  return entries;
}

AnswerPrinter.printAnswerWithTime(countMetadataEntries, input.split(" "));