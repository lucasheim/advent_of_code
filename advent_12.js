const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

let input = InputReader.readFile("inputs/input_12.txt");

let initialState = "..............................##.#..#.#..#.####.#########.#...#.#.#......##.#.#...##.....#...#...#.##.#...##...#.####.##..#.#..#..............................";
const pattern = /(?<pattern>[\.#]{5}) => (?<result>[\.#])/;
const combinations = {};

for (let combination of input.split("\n")) {
  const groups = combination.match(pattern).groups;
  combinations[groups.pattern] = groups.result;
}

for (let i = 0; i < 20; i++) {
  const currentCombinations = [];
  for (let i = 0; i < initialState.length; i++) {
    let currentCombination = "";
    currentCombination += initialState.charAt(i - 2) ? initialState.charAt(i - 2) : ".";
    currentCombination += initialState.charAt(i - 1) ? initialState.charAt(i - 1) : ".";
    currentCombination += initialState.charAt(i);
    currentCombination += initialState.charAt(i + 1) ? initialState.charAt(i + 1) : ".";
    currentCombination += initialState.charAt(i + 2) ? initialState.charAt(i + 2) : ".";
    currentCombinations.push(currentCombination);
  }

  let counter = 0;
  for (let currentCombination of currentCombinations) {
    if (combinations[currentCombination]) {
      let result = combinations[currentCombination];
      initialState = initialState.substr(0, counter) + result + initialState.substr(counter + 1);
    } else {
      initialState = initialState.substr(0, counter) + "." + initialState.substr(counter + 1);
    }
    counter++;
  }
}

let sum = 0;
for (let i = -30; i < initialState.length + 30; i++) {
  if (initialState.charAt(i + 30) === "#") {
    sum += i;
  }
}

console.log(sum);