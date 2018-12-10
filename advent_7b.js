const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

let input = InputReader.readFile("inputs/input_7.txt");
//input = InputReader.readFile("inputs/input_7_test.txt");
const pattern = /Step (.) must be finished before step (.) can begin./g;
const prerequirements = {};
const stepEffort = {};
const workload = {};
const stepBeingWorkedOn = {};
const workersQuantity = 5;
const offset = 0;
let previousRequirements = "";

function findOrderOfStatements(statements) {
  setup(statements);
  let stepOrder = "";
  let stepQuantity = Object.keys(prerequirements).length;
  let time = 0;

  while (stepOrder.length < stepQuantity) {
    const nextRequirement = getNextRequirement();
    if (hasRequirementsChanged(nextRequirement)) {
      previousRequirements = nextRequirement;
      for (let req of nextRequirement) {
        if (!stepOrder.includes(req) && !Object.values(stepBeingWorkedOn).includes(req)) {
          for (let worker of Object.keys(workload)) {
            if (workload[worker] === 0) {
              workload[worker] += stepEffort[req];
              stepBeingWorkedOn[worker] = req;
              break;
            }
          }
        }  
      }
    }
    for (let worker of Object.keys(workload)) {
      if (workload[worker] > 0) workload[worker]--;
      if (workload[worker] === 0 && stepBeingWorkedOn[worker]) {
        stepOrder += stepBeingWorkedOn[worker];
        updateRequirements(stepBeingWorkedOn[worker]);
        stepBeingWorkedOn[worker] = "";
      }
    }
    time++;
  }
  return time;
}

function setup(statements) {
  for (let statement of statements) {
    const regex = new RegExp(pattern);
    const matches = regex.exec(statement);
    const step = matches[2];
    const preRequisite = matches[1];
    prerequirements[step] = prerequirements[step] ? prerequirements[step] : {};
    prerequirements[preRequisite] = prerequirements[preRequisite] ? prerequirements[preRequisite] : {};
    prerequirements[step][preRequisite] = true;
    stepEffort[step] = stepEffort[step] ? stepEffort[step] : step.charCodeAt(0) - (offset + 4); 
    stepEffort[preRequisite] = stepEffort[preRequisite] ? stepEffort[preRequisite] : preRequisite.charCodeAt(0) - (offset + 4);
  }

  for (let i = 0; i < workersQuantity; i++) {
    workload[i] = 0;
  }
  
}

function getNextRequirement() {
  const nextRequirement = [];
  for (let step of Object.keys(prerequirements)) {
    if (Object.keys(prerequirements[step]).length === 0) {
      nextRequirement.push(step);
    }
  }
  const orderedRequirements = nextRequirement.sort();
  return orderedRequirements;
}

function updateRequirements(lastRequirement) {
  delete prerequirements[lastRequirement];
  for (let step of Object.keys(prerequirements)) {
    delete prerequirements[step][lastRequirement]
  }
}

function hasRequirementsChanged(requirements) {
  if (!requirements[0]) return false;
  if (requirements.length !== previousRequirements.length) return true;
  for (let i = 0; i < requirements.length; i++) {
    if (requirements[i] !== previousRequirements[i]) {
      return true;
    }
  }
  return false;
}

AnswerPrinter.printAnswerWithTime(findOrderOfStatements, input.split("\n"));