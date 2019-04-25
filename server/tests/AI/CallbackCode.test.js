const assert = require("chai").assert;
const callbackCode = require("../../util/AI/CallbackCode");

describe("CallbackCode", function() {
  describe("newCode()", function() {
    it("returns new code", function() {
      assert.exists(callbackCode.newCode());
    });

    it("returns code that isn't in unusable parameter", function() {
      let unusable = callbackCode.allCodes.filter(code => code != "Z");
      assert.notInclude(unusable, callbackCode.newCode(unusable));
    });
  });

  describe("buildMenuOptions()", function() {
    it("returns array", function() {
      assert.isArray(callbackCode.buildMenuOptions());
    });

    it("returns array of default (8) length, when length isn't passed", function() {
      assert.lengthOf(callbackCode.buildMenuOptions(), 8);
    });

    it("returns array of specified length, when length is passed", function() {
      let length = 12;
      assert.lengthOf(callbackCode.buildMenuOptions(length), length);
    });

    it("returns array without duplicates", function() {
      assert.isFalse(containsDuplicates(callbackCode.buildMenuOptions()));
    });
  });

  describe("buildSequence()", function() {
    let menuOptions = ["A", "B", "C", "D", "E", "F", "G", "H"];

    it("returns array", function() {
      assert.isArray(callbackCode.buildSequence(menuOptions));
    });

    it("returns array of default (3) length, when length isn't passed", function() {
      assert.lengthOf(callbackCode.buildSequence(menuOptions), 3);
    });

    it("returns array of specified length, when length is passed", function() {
      let length = 6;
      assert.lengthOf(callbackCode.buildSequence(menuOptions, length), length);
    });

    it("returns array without duplicates", function() {
      assert.isFalse(
        containsDuplicates(callbackCode.buildSequence(menuOptions))
      );
    });
  });
});

function containsDuplicates(arr) {
  let containsDuplicates = false;
  let found = [];

  containsDuplicates = arr.some(function(item) {
    if (found.includes(item)) {
      // console.log('found includes item')
      return true;
    }
    found.push(item);
  });

  return containsDuplicates;
}
