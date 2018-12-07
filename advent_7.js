const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

let input = InputReader.readFile("inputs/input_7.txt");
//input = InputReader.readFile("inputs/input_7_test.txt");

function findOrderOfStatements(statements) {
  const pattern = /Step (.) must be finished before step (.) can begin./g;
  const prerequirements = {};
  for (let statement of statements) {
    const regex = new RegExp(pattern);
    const matches = regex.exec(statement);
    const step = matches[2];
    const preRequisite = matches[1];
    prerequirements[step] = prerequirements[step] ? prerequirements[step] : {};
    prerequirements[preRequisite] = prerequirements[preRequisite] ? prerequirements[preRequisite] : {};
    prerequirements[step][preRequisite] = true;
  }

  let stepOrder = "";
  let stepQuantity = Object.keys(prerequirements).length

  while (stepOrder.length < stepQuantity) {
    const nextRequirement = getNextRequirement(prerequirements);
    stepOrder += nextRequirement;
    updateRequirements(prerequirements, nextRequirement);
  }

  return stepOrder;
}

function getNextRequirement(prerequirements) {
  const nextRequirement = [];
  for (let step of Object.keys(prerequirements)) {
    if (Object.keys(prerequirements[step]).length === 0) {
      nextRequirement.push(step);
    }
  }
  const orderedRequirements = nextRequirement.sort();
  return orderedRequirements[0];
}

function updateRequirements(prerequirements, lastRequirement) {
  delete prerequirements[lastRequirement];
  for (let step of Object.keys(prerequirements)) {
    delete prerequirements[step][lastRequirement]
  }
}

AnswerPrinter.printAnswerWithTime(findOrderOfStatements, input.split("\n"));