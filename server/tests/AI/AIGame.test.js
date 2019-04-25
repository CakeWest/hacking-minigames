const assert = require("chai").assert;
const AIGame = require("../../util/ai/AIGame");

describe("AIGame", function() {
  describe("constructor()", function() {
    it("should have first round populated", function() {
      let game = new AIGame();
      assert.isNotEmpty(game.rounds[0]);
    });
  });

  describe("setState()", function() {
    it("sets game's state to the state parameter", function() {
      let game = new AIGame();
      AIGame.setState(game, "playing");
      assert.equal(game.state, "playing");
    });
  });

  describe("submit()", function() {
    it("should have first round populated", function() {
      let game = new AIGame();
      assert.isNotEmpty(game.rounds[0]);
    });

    it("passes with correct submission", function() {
      let game = new AIGame();
      let correctCode = game.rounds[0].callbackSequence[0];
      let correctMenuIndex = game.rounds[0].menuOptions.findIndex(
        code => code == correctCode
      );
      AIGame.submit(game, correctMenuIndex);
      assert.isAbove(game.score, 0);
    });

    it("fails with incorrect submission", function() {
      let game = new AIGame();
      let correctCode = game.rounds[0].callbackSequence[0];
      let incorrectMenuIndex = game.rounds[0].menuOptions.findIndex(
        code => code !== correctCode
      );
      AIGame.submit(game, incorrectMenuIndex);
      assert.isAbove(game.failCount, 0);
    });
  });

  describe("pass()", function() {
    it("increments score", function() {
      let game = new AIGame();
      AIGame.pass(game);
      assert.isAbove(game.score, 0);
    });

    it("increments callbackIndex", function() {
      let game = new AIGame();
      AIGame.pass(game);
      assert.isAbove(game.callbackIndex, 0);
    });

    it("creates new round if callbackIndex is last in sequence", function() {
      let game = new AIGame();
      game.callbackIndex =
        game.rounds[game.rounds.length - 1].callbackSequence.length - 1;
      AIGame.pass(game);
      assert.isAbove(game.rounds.length, 1);
    });
  });

  describe("fail()", function() {
    it("increments failCount", function() {
      let game = new AIGame();
      AIGame.fail(game);
      assert.isAbove(game.failCount, 0);
    });

    it("creates new target frequency", function() {
      let game = new AIGame();
      let initialTargetFrequency = game.targetFrequency;
      AIGame.fail(game);
      assert.notEqual(game.targetFrequency, initialTargetFrequency);
    });

    it("sets state to game-over if failCount becomes max (3)", function() {
      let game = new AIGame();
      game.failCount = 2;
      AIGame.fail(game);
      assert.equal(game.state, "game-over");
    });

    it("sets state to tuning if failCount isn't max (3)", function() {
      let game = new AIGame();
      AIGame.fail(game);
      assert.equal(game.state, "tuning");
    });
  });

  describe("newRound()", function() {
    it("increments roundIndex", function() {
      let game = new AIGame();
      AIGame.newRound(game);
      assert.isAbove(game.roundIndex, 0);
    });

    it("create new round", function() {
      let game = new AIGame();
      AIGame.newRound(game);
      assert.isAbove(game.rounds.length, 1);
    });

    it("resets callbackIndex", function() {
      let game = new AIGame();
      AIGame.newRound(game);
      assert.equal(game.callbackIndex, 0);
    });

    it("starts countdown", function() {
      let game = new AIGame();
      let initialCountdownStart = game.countdownStart;
      AIGame.newRound(game);
      assert.notEqual(game.countdownStart, initialCountdownStart);
    });
  });

  describe("newTargetFrequency()", function() {
    it("creates new frequency between 0-360", function() {
      let game = new AIGame();
      AIGame.newTargetFrequency(game);
      assert.isAtLeast(game.targetFrequency, 0);
      assert.isAtMost(game.targetFrequency, 360);
    });
  });
});
