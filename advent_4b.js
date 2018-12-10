const InputReader = require("./InputReader");
const AnswerPrinter = require("./AnswerPrinter");

const input = InputReader.readFile("inputs/input_4.txt");
//input = "[1518-11-01 00:00] Guard #10 begins shift\n[1518-11-01 00:05] falls asleep\n[1518-11-01 00:25] wakes up\n[1518-11-01 00:30] falls asleep\n[1518-11-01 00:55] wakes up\n[1518-11-01 23:58] Guard #99 begins shift\n[1518-11-02 00:40] falls asleep\n[1518-11-02 00:50] wakes up\n[1518-11-03 00:05] Guard #10 begins shift\n[1518-11-03 00:24] falls asleep\n[1518-11-03 00:29] wakes up\n[1518-11-04 00:02] Guard #99 begins shift\n[1518-11-04 00:36] falls asleep\n[1518-11-04 00:46] wakes up\n[1518-11-05 00:03] Guard #99 begins shift\n[1518-11-05 00:45] falls asleep\n[1518-11-05 00:55] wakes up"

function findMostSleptMinute(registers) {

  const orderedRegisters = [];
  const guardRegisters = {};
  const pattern = /\[([\d-]*) ([\d:]*)\] (G|w|f)((?<=G)uard \#([\d]*))?/g;

  // Parse register and add to array
  for (let register of registers) {
    const regex = new RegExp(pattern);
    const matches = regex.exec(register);
    const newRegister = {
      datetime: new Date(`${matches[1]}T${matches[2]}`),
      type: matches[3],
      id: matches[5]
    }
    orderedRegisters.push(newRegister);
  }

  // Order array by date
  orderedRegisters.sort((register1, register2) => {
    return register1.datetime > register2.datetime 
            ? 1 
            : register1.datetime < register2.datetime 
              ? -1 
              : 0;
  });

  // Fill in guardRegisters with their asleep minutes
  let currentId = "";
  let beginSleepMinute = 0;
  for (let register of orderedRegisters) {
    if (register.type === "G") {
      currentId = register.id;
      guardRegisters[currentId] = guardRegisters[currentId] || {};
    } else if (register.type === "f") {
      beginSleepMinute = register.datetime.getMinutes();
    } else {
      const totalTimeAsleep = register.datetime.getMinutes() - beginSleepMinute;
      Array(totalTimeAsleep)
                      .fill(beginSleepMinute)
                      .map((minute, index) => {
                        guardRegisters[currentId][minute + index] = guardRegisters[currentId][minute + index] ?
                                                                    guardRegisters[currentId][minute + index] + 1 :
                                                                    1;
                      });
    }
  }

  // Find most slept minute
  let timesMinutesWasSlept = 0;
  let chosenMinute = 0;
  let chosenGuard = "";

  for (let guard of Object.keys(guardRegisters)) {
    for (let minute of Object.keys(guardRegisters[guard])) {
      if (guardRegisters[guard][minute] > timesMinutesWasSlept) {
        timesMinutesWasSlept = guardRegisters[guard][minute];
        chosenGuard = guard;
        chosenMinute = minute;
      }
    }
  }
  return chosenGuard * chosenMinute;
}

AnswerPrinter.printAnswerWithTime(findMostSleptMinute, input.split("\n"));