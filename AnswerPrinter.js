class AnswerPrinter {
  static printAnswerWithTime(fn, ...args) {
    console.time("Running time");
    console.log(fn(...args));
    console.timeEnd("Running time");
  }
}

module.exports = AnswerPrinter;