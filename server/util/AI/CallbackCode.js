// Handles individual 'code' creation & full sequence/menu options building
class CallbackCode {
  static newCode(unusable = []) {
    let usableCodes = CallbackCode.allCodes.filter(function(code) {
      return !unusable.includes(code);
    });

    let randomIndex = Math.floor(
      Math.random() * Math.floor(usableCodes.length)
    );

    return usableCodes[randomIndex];
  }

  static buildMenuOptions(length = 8) {
    let options = [];
    let usedCodes = [];

    for (let i = 0; i < length; i++) {
      let code = CallbackCode.newCode(usedCodes);

      options.push(code);
      usedCodes.push(code);
    }

    return options;
  }

  static buildSequence(menuOptions, length = 3) {
    let sequence = [];
    let usedCodes = [];

    for (let i = 0; i < length; i++) {
      let usableCodes = menuOptions.filter(code => !usedCodes.includes(code));
      let randomIndex = Math.floor(
        Math.random() * Math.floor(usableCodes.length)
      );
      let option = usableCodes[randomIndex];

      sequence.push(option);
      usedCodes.push(option);
    }

    return sequence;
  }
}

CallbackCode.allCodes = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

module.exports = CallbackCode;
