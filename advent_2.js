const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

const input = InputReader.readFile("inputs/input_2.txt");
//input = "abcdef,bababc,abbcde,abcccd,aabcdd,abcdee,ababab"

function countTwoAndThree(words) {
  let wordsContainingTwoRepeatedLetters = 0;
  let wordsContainingThreeRepeatedLetters = 0;

  for (let word of words) {
    const letterMap = {};
    for (let letter of word.split("")) {
      letterMap[letter] = (letterMap[letter] || 0) + 1;
    }
    const values = Object.values(letterMap);
    if (values.includes(2)) {
      wordsContainingTwoRepeatedLetters++;
    }
    if (values.includes(3)) {
      wordsContainingThreeRepeatedLetters++;
    }
  }
  return wordsContainingTwoRepeatedLetters * wordsContainingThreeRepeatedLetters;
}

AnswerPrinter.printAnswerWithTime(countTwoAndThree, input.split("\n"));