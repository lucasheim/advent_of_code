const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

const input = InputReader.readFile("inputs/input_2.txt");
//input = "abcde,fghij,klmno,pqrst,fguij,axcye,wvxyz";

function findCommonBoxIdLetters(words) {
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    for (let j = i + 1; j < words.length; j++) {
      const otherWord = words[j];
      let differentLetters = 0;
      let differentLetterIndex = -1;
      for (let k = 0; k < word.length; k++) {
        if (word.charAt(k) !== otherWord.charAt(k)) {
          differentLetters++;
          differentLetterIndex = k;
        }
        if (differentLetters > 1) break;
      }
      if (differentLetters === 1) {
        return word.substr(0, differentLetterIndex) + word.substr(differentLetterIndex + 1);
      }
    }
  }
}

AnswerPrinter.printAnswerWithTime(findCommonBoxIdLetters, input.split("\n"));