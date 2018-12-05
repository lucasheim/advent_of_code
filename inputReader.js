const fs = require("fs");

class InputReader {
  static readFile(fileName) {
    const input = fs.readFileSync(fileName, 'utf8');
    return input;
  }
}

module.exports = InputReader;